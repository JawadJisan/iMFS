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
import { Input } from "@/components/ui/input";
import { useApprovedRequestCashMutation } from "@/redux/api/transactionsAPI";

export default function TableDemo() {
  const router = useRouter();
  const { toast } = useToast();
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useUsersQuery({});

  const [
    approvedRequestCash,
    { isError, isLoading: isUpdateLoading, isSuccess, status },
  ] = useApprovedRequestCashMutation();
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [detailsinfo, setDetailsInfo] = useState<any>(null);

  const [searchNumber, setSearchNumber] = useState("");
  const [searchUser, setSearchUser] = useState(null);

  const cahsRequestUser = data?.users?.filter(
    (user: any) =>
      user.accountType === "agent" && user?.cashRequest === "requested"
  );

  const handleAccept = (datas) => {
    console.log(datas);
    approvedRequestCash({
      agentNumber: datas?.mobileNumber,
    });
  };

  useEffect(() => {
    if (status == "fulfilled") {
      router.push("/dashboard/admin");
      toast({
        title: "Cash Request Successfull",
      });
    } else if (status == "rejected") {
      toast({
        variant: "destructive",
        title: "Something Went Wrong",
      });
    }
    const searchData = data?.users?.filter(
      (d: any) => d?.mobileNumber == searchNumber
    );
    setSearchUser(searchData);
  }, [status, data, searchNumber]);

  if (isLoading || isUpdateLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
      <div className="flex justify-between gap-5 items-center">
        <Link href="/dashboard/admin">
          <button className="p-5 rounded-2xl font-bold bg-green-400">
            Return Dashboard
          </button>
        </Link>
        <Input
          id="search by Number"
          required
          value={searchNumber}
          onChange={(e) => {
            setSearchNumber(e.target.value);
          }}
          placeholder="Search By Number"
          className="w-3/4 p-3"
          type="number"
        />
      </div>
      <Table className="wrapper">
        <TableCaption>All iMFS Listed Users & Agents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Thumbnail</TableHead>
            <TableHead>Name</TableHead>

            <TableHead className="text-right"> Account Type </TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right"> Total Balance </TableHead>
            <TableHead>Request</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cahsRequestUser?.length
            ? cahsRequestUser?.map((myData: any) => (
                <TableRow key={myData.id}>
                  <TableCell className="font-medium">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{myData.name} </TableCell>
                  <TableCell className="text-right">
                    {myData.accountType}{" "}
                  </TableCell>
                  <TableCell>{myData.email}</TableCell>
                  <TableCell>{myData.initialBalance.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAccept(myData)}
                      variant="outline"
                    >
                      <span className="text-[11px]">
                        Accept Cash
                        <br /> Request
                      </span>
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))
            : "No Agent Found For Approval"}
        </TableBody>
      </Table>
    </div>
  );
}
