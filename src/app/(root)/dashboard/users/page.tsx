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

export default function TableDemo() {
  const router = useRouter();
  const { toast } = useToast();
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useUsersQuery({});

  const [
    updateUser,
    { isError, isLoading: isUpdateLoading, isSuccess, status },
  ] = useUpdateUserMutation();
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [detailsinfo, setDetailsInfo] = useState<any>(null);

  const [searchNumber, setSearchNumber] = useState("");
  const [searchUser, setSearchUser] = useState<any>(null);

  const form = useForm<z.infer<typeof FormSchema>>({});
  const FormSchema = z.object({
    status: z.string({
      required_error: "Please Select a Status for Update",
    }),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await updateUser({
      id: accountInfo._id,
      data: JSON.stringify(data),
    });
  }

  const handleDetail = (data: any) => {
    router.push(`/dashboard/transaction/${data?._id}`);
  };

  useEffect(() => {
    if (status == "fulfilled") {
      toast({
        title: "Account Status Updated Successfull",
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
            <TableHead>
              Approved <br /> Status
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchNumber?.length && searchUser?.length
            ? searchUser?.map((myData: any) => (
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
                  <TableCell> {myData.status} </TableCell>

                  <TableCell>
                    {/* <Dialog> */}
                    <Dialog onOpenChange={() => setAccountInfo(myData)}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <span className="text-[11px]">
                            Update <br /> status
                          </span>
                          <MdBrowserUpdated className="h-4 ml-2 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-primary-50">
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            Update Account Status
                          </DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-2/3 space-y-6"
                          >
                            <FormField
                              control={form.control}
                              name="status"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Status</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    // defaultValue={field.value}
                                    defaultValue={myData.role}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select user role" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="blocked">
                                          Blocked
                                        </SelectItem>
                                        <SelectItem value="approved">
                                          Approved
                                        </SelectItem>
                                        <SelectItem value="pending">
                                          Pending
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogClose asChild>
                              <Button type="submit">Update Status</Button>
                            </DialogClose>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell className="flex items-center ">
                    {/* <Link href={`dashboard/transaction/${accountInfo?._id}`}> */}
                    <Button onClick={() => handleDetail(myData)}>
                      See Transactions
                    </Button>
                    {/* </Link> */}
                  </TableCell>
                </TableRow>
              ))
            : "No User Found"}
          {!searchNumber?.length &&
            !searchUser?.length &&
            data?.users?.map((myData: any) => (
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
                <TableCell> {myData.status} </TableCell>

                <TableCell>
                  {/* <Dialog> */}
                  <Dialog onOpenChange={() => setAccountInfo(myData)}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <span className="text-[11px]">
                          Update <br /> status
                        </span>
                        <MdBrowserUpdated className="h-4 ml-2 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-primary-50">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Update Account Status
                        </DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="w-2/3 space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Status</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  // defaultValue={field.value}
                                  defaultValue={myData.role}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select user role" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="blocked">
                                        Blocked
                                      </SelectItem>
                                      <SelectItem value="approved">
                                        Approved
                                      </SelectItem>
                                      <SelectItem value="pending">
                                        Pending
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogClose asChild>
                            <Button type="submit">Update Status</Button>
                          </DialogClose>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="flex items-center ">
                  {/* <Link href={`dashboard/transaction/${accountInfo?._id}`}> */}
                  <Button onClick={() => handleDetail(myData)}>
                    See Transactions
                  </Button>
                  {/* </Link> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
