"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdBrowserUpdated } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  useDeleteListingProductMutation,
  useGetListingProductQuery,
} from "@/redux/api/listingProductAPI";
import { getUserInfo } from "@/utils/auth.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUserMutation, useUsersQuery } from "@/redux/api/userAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAllTnxQuery } from "@/redux/api/transactionsAPI";
interface TableDemoProps {
  params: any;
}

interface ITransaction {
  reciverNumber: number;
  amountToRecive: number;
  sender?: number; // Optional property
  reciver?: number; // Optional property
  charged?: number; // Optional property
  transactionType?: string; // Optional property
  transactionID?: string; // Optional property
}

export default function TableDemo({
  params: { id },
}: {
  params: { id: string };
}) {
  // const { id } = params;
  const { accountType } = getUserInfo() as any;
  console.log(accountType);

  const router = useRouter();
  const { toast } = useToast();
  const { data: tnxData, isLoading } = useGetAllTnxQuery({});
  const [myTnx, setMyTnx] = useState<ITransaction[]>([]);

  console.log(myTnx);

  let href = "";
  // Determine the href based on the accountType
  if (accountType === "user") {
    href = "/dashboard/user";
  } else if (accountType === "agent") {
    href = "/dashboard/agent";
  } else if (accountType === "admin") {
    href = "/dashboard/admin";
  } else {
    // Handle other cases if needed
  }

  useEffect(() => {
    if (tnxData && tnxData.data) {
      const recivedTnx = tnxData?.data?.filter(
        (tnx: any) => tnx.reciver._id == id
      );
      const sendTnx = tnxData?.data?.filter((tnx: any) => tnx.sender._id == id);

      const mergedTnx = [...recivedTnx, ...sendTnx];
      if (accountType == "agent" || accountType == "user") {
        setMyTnx(mergedTnx?.slice(-100));
      } else {
        setMyTnx(mergedTnx);
      }
    }
  }, [tnxData, id, accountType]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
      <Link href={href}>
        {/* <p className="p-5 items-end bg-green-400">Return Dashboard</p> */}
        <button className="p-5 flex items-center justify-end rounded-2xl font-bold bg-green-400">
          Return Dashboard
        </button>
      </Link>
      <Table className="wrapper">
        <TableCaption>All Transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tnx ID</TableHead>
            <TableHead>Recived Amount</TableHead>

            <TableHead className="text-right"> Transaction Type </TableHead>
            <TableHead>From</TableHead>
            <TableHead className="text-right"> To </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myTnx?.length > 0 &&
            myTnx?.map((myData: any) => (
              <TableRow key={myData._id}>
                <TableCell className="font-medium">{myData._id}</TableCell>
                <TableCell>{myData.amountToRecive} </TableCell>
                <TableCell className="text-right">
                  {myData.transactionType}{" "}
                </TableCell>
                <TableCell>{myData.sender.mobileNumber}</TableCell>
                <TableCell>{myData.reciver.mobileNumber}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!myTnx?.length && (
        <p className="text-center font-bold text-2xl p-7 text-red-500">
          No Transaction Found
        </p>
      )}
    </div>
  );
}
