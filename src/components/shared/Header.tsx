"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { DropdownMenuDemo } from "../header/HeaderMenu";
import { getUserInfo, isLoggedIn, removeUserInfo } from "@/utils/auth.service";
const Header = () => {
  const isUserLoggedIn = isLoggedIn();
  const { role } = getUserInfo() as any;
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          {/* <Image
            src="/assets/images/newLogos.png"
            width={160}
            height={38}
            alt="iMFS Logo"
          /> */}
          <p className="text-center font-semibold">iMFS</p>
        </Link>
        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          <MobileNav />
          {isUserLoggedIn ? (
            <DropdownMenuDemo />
          ) : (
            <Button asChild className="rounded-full" size="lg">
              <Link href="/auth/signIn">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
