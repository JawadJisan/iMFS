"use client";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import GridCards from "@/components/shared/GridCards";
import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ListingProduct from "@/components/shared/ListingProduct";
import BestReviews from "@/components/shared/BestReviews";
import Blogs from "@/components/shared/Blogs";
import logos from "../../../public/assets/images/a.jpg";
import { getUserInfo } from "@/utils/auth.service";
import { useEffect, useState } from "react";

export default function Home({ searchParams }: SearchParamProps) {
  const { accountType } = getUserInfo() as any;
  const [href, setHref] = useState("");

  console.log(accountType);

  useEffect(() => {
    let href = "";

    if (accountType === "user") {
      href = "/dashboard/user";
      setHref(href);
    } else if (accountType === "agent") {
      href = "/dashboard/agent";
      setHref(href);
    } else if (accountType === "admin") {
      href = "/dashboard/admin";
      setHref(href);
    } else {
      href = "/auth/signUp";
      setHref(href);
    }
  }, [accountType]);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          {/* <ListingProduct /> */}
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h2-bold">iMFS</h1>
            <p className="p-regular-20 md:p-regular-24">
              First Ever Bangladesh Internet Mobile Financial Services (IMFS)
              Platform.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href={href}>Access Your Account</Link>
            </Button>
          </div>

          <Image
            src={logos}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
    </>
  );
}
