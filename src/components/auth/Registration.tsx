"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userRegistrationSchema } from "@/lib/validator";
import * as z from "zod";
import { useState } from "react";
import { FiGithub, FiFacebook } from "react-icons/fi";
import { SlSocialGoogle } from "react-icons/sl";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { useSignUpMutation } from "../../redux/api/authAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Component() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signUp, { isLoading }] = useSignUpMutation();

  const form = useForm<z.infer<typeof userRegistrationSchema>>({
    // resolver: zodResolver(userRegistrationSchema),
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof userRegistrationSchema>) {
    console.log(values, "Form Values");

    let approvalStatus;
    if (values.accountType === "agent") {
      approvalStatus = "pending";
    } else if (values.accountType === "user") {
      approvalStatus = "normal";
    }

    const newValues = {
      name: values.name,
      email: values.email,
      nid: Number(values.nid),
      mobileNumber: Number(values.mobileNumber),
      password: Number(values.password),
      accountType: values.accountType,
      status: approvalStatus,
    };

    console.log(newValues);

    try {
      const res = await signUp(newValues).unwrap();
      console.log(res, "signUp response");
      router.push("/auth/signIn");
    } catch (error) {
      setErrorMessage("something went wrong");
    }
  }

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
        <h2 className="text-xl font-semibold">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          to continue to <b>iMFS</b>
        </p>
        <div className="mt-6 ">
          <Button disabled className="mb-3 w-full disabled" variant="outline">
            {/* <FiFacebook className="mr-2 h-5 w-5" /> */}
            Continue with Mobile Number{"\n              "}
          </Button>
          <Button disabled className="w-full" variant="outline">
            Continue with NID(User){"\n              "}
          </Button>
        </div>
        <div className="my-6 flex items-center justify-center">
          <div className="h-px w-full bg-gray-300" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="h-px w-full bg-gray-300" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nid"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="NID Number" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Mobile Number"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Account Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative flex items-center justify-center">
                  <Input
                    placeholder="Set 5 digit PIN"
                    {...field}
                    type={showPassword ? "password" : "number"}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2/4 transform -translate-y-2/4"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <BiHide className="mr-2 h-5 w-5 " />
                    ) : (
                      <BiShowAlt className="mr-2 h-5 w-5" />
                    )}
                  </button>
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
              {form.formState.isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">Have an account?</span>{" "}
          <Link
            className="text-sm text-blue-600 hover:underline"
            href="/auth/signIn"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
