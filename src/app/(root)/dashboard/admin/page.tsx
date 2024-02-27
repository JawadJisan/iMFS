"use client";
import React, { PureComponent } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FaMoneyCheckDollar } from "react-icons/fa6";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getUserInfo } from "@/utils/auth.service";
import { useUserQuery, useUsersQuery } from "@/redux/api/userAPI";
import Link from "next/link";

const data = [
  {
    name: "Admin",
    userCount: 1,
  },
  {
    name: "Moderator",
    userCount: 2,
  },
  {
    name: "User",
    userCount: 5,
  },
  {
    name: "Editor",
    userCount: 2,
  },
];

const Page = () => {
  const { PNumber, accountType, email }: any = getUserInfo();
  const { data } = useUserQuery(email);
  const { data: users } = useUsersQuery({});

  const totalBalance = users?.users?.reduce(
    (total: number, user: any) => Number(total) + Number(user.initialBalance),
    0
  );

  const pendingAgentUsers = users?.users?.filter(
    (user: any) => user.accountType === "agent" && user.status === "pending"
  );

  return (
    <>
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="flex flex-col items-center justify-center p-4 bg-[#E8F5E9] text-center rounded-lg">
            <FaMoneyCheckDollar className="w-5 h-5 ml-3 text-[#FF5252] mb-2" />
            <h3 className="text-lg font-medium">Current Income</h3>
            <p className="text-2xl font-semibold">
              <b>{data?.data?.initialBalance} </b>
            </p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 bg-[#E0F7FA] text-center rounded-lg">
            <ListIcon className="text-[#00ACC1] mb-2" />
            <h3 className="text-lg font-medium">Total Money</h3>
            <p className="text-2xl font-semibold">{totalBalance} </p>
          </Card>
          <Link href="/dashboard/approvalRequests">
            <Card className="flex flex-col items-center justify-center p-4 bg-[#FFF3E0] text-center rounded-lg">
              <ClockIcon className="text-[#FB8C00] mb-2" />
              <h3 className="text-lg font-medium">Aproval Request </h3>
              <p className="text-2xl font-semibold">
                {pendingAgentUsers?.length}
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/users">
            <Card className="flex flex-col items-center justify-center p-4 bg-[#FBE9E7] text-center rounded-lg">
              <FileWarningIcon className="text-[#FF5252] mb-2" />
              <h3 className="text-lg font-medium">Total Users</h3>
              <p className="text-2xl font-semibold">{users?.users?.length} </p>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;

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
