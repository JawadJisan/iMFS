"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useUserQuery } from "@/redux/api/userAPI";
import { getUserInfo } from "@/utils/auth.service";
import { FaMoneyCheckDollar } from "react-icons/fa6";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useGetNotificationQuery } from "@/redux/api/transactionsAPI";

export default function Component() {
  const { PNumber, accountType, email }: any = getUserInfo();
  const { data } = useUserQuery(email);
  const { data: notificationData } = useGetNotificationQuery({});

  const [number, setNumber] = useState();
  const [amount, setAmount] = useState();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const recivedNotification = notificationData?.data?.filter(
    (noti: any) => noti?.notificationReciver?.reciverNumber == PNumber
  );
  const sendNotification = notificationData?.data?.filter(
    (noti: any) => noti?.notificationReciver?.senderNumber == PNumber
  );

  const allNotification =
    Number(recivedNotification?.length) + Number(sendNotification?.length);

  const handleClick = () => {
    setShowBalance(true);
    setTimeout(() => {
      setShowBalance(false);
    }, 5000); // Reset showBalance to false after 5 seconds
  };
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Avatar>
            <AvatarImage
              alt="abc abc"
              src="/placeholder.svg?height=100&width=100"
            />
            <AvatarFallback>User Details</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{data?.data?.name} </h2>
            <p className="text-sm text-gray-500">Email:{data?.data?.email} </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Badge variant="secondary"> </Badge>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col items-center justify-center p-4 bg-[#E0F7FA] text-center rounded-lg">
          <ListIcon className="text-[#00ACC1] mb-2" />
          <Link href="/dashboard/sendMoney">
            <Button
              className="bg-green-700 text-lg p-5 font-medium"
              variant="outline"
            >
              Send Money
            </Button>
          </Link>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 bg-[#E8F5E9] text-center rounded-lg">
          <MegaphoneIcon className="text-[#43A047] mb-2" />
          <Link href="/dashboard/cashOut">
            <Button
              className="bg-red-400 text-lg p-5 font-medium"
              variant="outline"
            >
              Cash Out
            </Button>
          </Link>{" "}
        </Card>

        <Card className="flex flex-col items-center justify-center p-4 bg-[#FFF3E0] text-center rounded-lg">
          <ClockIcon className="text-[#FB8C00] mb-2" />
          <h3 className="text-lg font-medium">All Notification</h3>
          <p className="text-2xl font-semibold">{allNotification} </p>

          <div className="flex gap-3 mt-5">
            <div className="p-4 border-2 rounded-md shadow-md">
              <h3 className="text-lg font-medium">Recived</h3>
              <p className="text-2xl font-semibold">
                {recivedNotification?.length}{" "}
              </p>
            </div>
            <div className="p-4 border-2 rounded-md shadow-md">
              <h3 className="text-lg font-medium">Send</h3>
              <p className="text-2xl font-semibold">
                {" "}
                {sendNotification?.length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 bg-[#FBE9E7] text-center rounded-lg">
          {/* <FileWarningIcon className="text-[#FF5252] mb-2" /> */}
          <FaMoneyCheckDollar className="w-5 h-5 ml-3 text-[#FF5252] mb-2" />

          <h3 className="text-lg font-medium">Account Balance</h3>
          <p
            className={`text-2xl font-semibold ${showBalance ? "" : "blur"}`}
            onClick={handleClick}
          >
            {showBalance
              ? `${data?.data?.initialBalance.toFixed(2)} Tk`
              : "Click to reveal"}
          </p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 bg-[#E8F5E9] text-center rounded-lg">
          <MegaphoneIcon className="text-[#43A047] mb-2" />
          <Link href={`/dashboard/transaction/${data?.data?._id}`}>
            <Button
              className="bg-red-400 text-lg p-5 font-medium"
              variant="outline"
            >
              See Transactions
            </Button>
          </Link>{" "}
        </Card>
      </div>
    </div>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FileWarningIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function ListIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function MegaphoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}
