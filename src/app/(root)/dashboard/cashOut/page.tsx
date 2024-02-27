"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  useCashOutMutation,
  useSendMoneyMutation,
} from "@/redux/api/transactionsAPI";
import { getUserInfo } from "@/utils/auth.service";
import { useUserQuery } from "@/redux/api/userAPI";

const SendMoney = () => {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { PNumber, accountType, email }: any = getUserInfo();
  const { data } = useUserQuery(email);
  const [sendMoney] = useSendMoneyMutation();
  const [cashOut, { isLoading, isSuccess, data: resData, status }] =
    useCashOutMutation();

  console.log(resData, isSuccess, status);

  const handleSendMoney = (e: any) => {
    e.preventDefault();

    if (number == data?.data?.mobileNumber) {
      toast({
        title: "You cash out Money to your  mobile number",
        variant: "destructive",
        description: "You can only cash out through Agent Number ",
      });
    }
    if (amount > data?.data?.initialBalance) {
      toast({
        title: "Cannot Cash Out More Then Your Total Balance",
        variant: "destructive",
        description: "Insufficient Balance",
      });
    }
    if (!amount || !number || !password) {
      return toast({
        title: "Input Field Can't be Empty",
        variant: "destructive",
        description:
          "Please Enter the Agent Mobile Number || Amount to Cash Out || Your 5 Digit Pin Number",
      });
    }
    try {
      cashOut({
        agentNumber: number,
        amountToRecive: amount,
        pinCode: password,
        senderInfo: {
          number: data?.data?.mobileNumber,
          email: data?.data?.email,
        },
      });
      setNumber("");
      setAmount("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Coudnt Compleate  The Transaction.",
        variant: "destructive",
        description: "something went worng",
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      <p>Loading...</p>;
    }
    if (resData?.statusCode == 200 && status == "fulfilled") {
      router.push("/dashboard/user");
      toast({
        title: "Cash Out Successfull",
        variant: "default",
        description: `Tk-${amount} cash out to ${number} this number`,
      });
    } else if (status == "rejected") {
      toast({
        title: "Something Went Wrong",
        variant: "destructive",
        description: `Something Went Wrong`,
      });
    }
  }, [isLoading, resData?.statusCode, router]);

  return (
    <>
      <div className="grid gap-4 py-4 bg-slate-200 p-5 rounded">
        <form onSubmit={handleSendMoney}>
          <p className="text-center font-semibold p-5">
            Enter The Authorized Agent Mobile Number & Amount
          </p>
          <div className="grid grid-cols-4 py-5 items-center gap-4">
            <Label htmlFor="reciverNumber" className="text-right">
              Agent Number
            </Label>
            <Input
              id="reciverNumber"
              required
              value={number}
              onChange={(e) => {
                setError(" ");
                setNumber(e.target.value);
              }}
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 py-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              5 Digit Pin
            </Label>
            <Input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </form>
        <Button onClick={handleSendMoney} type="submit" variant="destructive">
          Cash Out
        </Button>
      </div>
    </>
  );
};

export default SendMoney;
