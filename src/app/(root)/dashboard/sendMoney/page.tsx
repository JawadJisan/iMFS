"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSendMoneyMutation } from "@/redux/api/transactionsAPI";
import { getUserInfo } from "@/utils/auth.service";
import { useUserQuery } from "@/redux/api/userAPI";

const SendMoney = () => {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { PNumber, accountType, email }: any = getUserInfo();
  const { data } = useUserQuery(email);
  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const handleSendMoney = (e: any) => {
    e.preventDefault();
    if (Number(amount) < 50) {
      toast({
        title: "Cannot Sent less then 50Tk",
        variant: "destructive",
        description:
          "You can only send money to other users of the platform.  ",
      });
    }
    if (number == data?.data?.mobileNumber) {
      toast({
        title: "You cannot send money to  yourself.",
        variant: "destructive",
        description: "You can only send money to to yourself or same account",
      });
    }
    if (Number(amount) >= 50 && amount > data?.data?.initialBalance) {
      toast({
        title: "Cannot Sent More then Your Total Balance",
        variant: "destructive",
        description: "Please  Check your total balance.",
      });
    }
    if (!amount || !number) {
      return toast({
        title: "Input Field Can't be Empty",
        variant: "destructive",
        description: "Please Enter the recipient Contact  Number and Amount.",
      });
    }
    try {
      sendMoney({
        reciverNumber: number,
        amountToRecive: amount,
        senderInfo: {
          number: data?.data?.mobileNumber,
          email: data?.data?.email,
        },
      });
      setNumber("");
      setAmount("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Cannot Sent less then 50Tk",
        variant: "destructive",
        description: "something went worng",
        //   {error?.message},
      });
    }
    router.push("/dashboard/user");
  };

  useEffect(() => {
    if (isLoading) {
      <p>Loading...</p>;
    }
  }, [isLoading]);

  return (
    <>
      <div className="grid gap-4 py-4 bg-slate-200 p-5 rounded">
        <form onSubmit={handleSendMoney}>
          <p className="text-center font-semibold p-5">
            Please enter recivers mobile number & amount you want to send them.
          </p>
          <div className="grid grid-cols-4 pb-10 items-center gap-4">
            <Label htmlFor="reciverNumber" className="text-right">
              Recipient Number
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
        </form>
        <Button onClick={handleSendMoney} type="submit" variant="destructive">
          Send Money
        </Button>
      </div>
    </>
  );
};

export default SendMoney;
