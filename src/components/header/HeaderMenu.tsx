"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInfo, removeUserInfo } from "@/utils/auth.service";
import { authKey } from "@/constants/global";
import Link from "next/link";

export function DropdownMenuDemo() {
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("accessToken");
    removeUserInfo(authKey);
    router.push("/auth/signIn");
  };
  const userinfo = getUserInfo() as any;
  // console.log(userinfo, "userRole");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/dashboard/accountDetails"
              className="cursor-pointer flex justify-between items-center"
            >
              <p>Profile</p>
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>GitHub</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center">
          <Button
            onClick={logOut}
            variant="destructive"
            className="buttonSM w-2/3"
          >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
