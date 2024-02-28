"use client";
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userLoginSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiGithub, FiFacebook } from "react-icons/fi";
import { SlSocialGoogle } from "react-icons/sl";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSignInMutation } from "@/redux/api/authAPI";
import { getUserInfo, storeUserInfo } from "@/utils/auth.service";

export default function Component() {
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>();
  const [password, setpassword] = useState("");
  const [signIn, { isLoading, isSuccess, data, status }] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof userLoginSchema>>({
    // resolver: zodResolver(userLoginSchema),
  });

  const router = useRouter();

  // const isLo = localStorage?.getItem("accessToken");
  // if (!isLo == null) {
  //   console.log("user logedIn");
  // }
  // console.log(isLo);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn({
      password: password,
      mobileNumber: phoneNumber,
    }).unwrap();
    storeUserInfo({ accessToken: res?.data?.accessToken });
  };

  const { accountType } = getUserInfo() as any;

  useEffect(() => {
    if (status == "rejected") {
      toast({
        title: "Error",
        description: "Something Went Wrong.",
        variant: "destructive",
      });
      setErrorMessage("something went wrong");
    }

    if (accountType === "admin" && status == "fulfilled") {
      router.push("/dashboard/admin");
    } else if (accountType === "agent" && status == "fulfilled") {
      router.push("/dashboard/agent");
    } else if (accountType === "user" && status == "fulfilled") {
      router.push("/dashboard/user");
    }

    if (isLoading) {
      <p>Loading...</p>;
    }
  }, [data, status, accountType, isLoading]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="flex items-center mb-5">
          <IoArrowBackCircleOutline className="mr-2 h-5 w-5" />
          <Link href="/">
            <p className="text-sm">Back</p>
          </Link>
        </div>
        <h2 className="text-xl font-semibold">Log into your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          to continue to <b>iMFS</b>
        </p>
        <div className="mt-6">
          <Button disabled className="mb-3 w-full" variant="outline">
            Continue with Phone Number{"\n                  "}
          </Button>
          <Button disabled className="w-full" variant="outline">
            Continue with Email{"\n                  "}
          </Button>
        </div>
        <div className="my-6 flex items-center justify-center">
          <div className="h-px w-full bg-gray-300" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="h-px w-full bg-gray-300" />
        </div>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Mobile Number"
                      {...field}
                      type="number"
                      value={phoneNumber || ""}
                      onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      // pattern="^\d{5}$"
                      placeholder="Enter Your 5 Digit Pin Number"
                      {...field}
                      type="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      // disabled={password.length === 5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && (
              <div className="mt-4 text-center">
                <span className="text-sm text-destructive">{errorMessage}</span>
              </div>
            )}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Login..." : "LOG IN"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">Don't have an account?</span>
          <Link
            className="text-sm text-blue-600 hover:underline"
            href="/auth/signUp"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
