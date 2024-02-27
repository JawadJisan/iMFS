// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { userFormSchema } from "@/lib/validator";
// import * as z from "zod";
// import { Textarea } from "@/components/ui/textarea";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useUploadThing } from "@/lib/uploadthing";
// import "react-datepicker/dist/react-datepicker.css";
// import { useRouter } from "next/navigation";
// import { FileUploader } from "@/components/shared/FileUploader";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useUpdateUserMutation, useUserQuery } from "@/redux/api/userAPI";
// import { getUserInfo, isLoggedIn } from "@/utils/auth.service";

// const formSchema = z.object({
//   userName: z.string(),
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string().email(),
//   role: z.string(),
//   address: z.string(),
//   facebook: z.string(),
//   twitter: z.string(),
//   linkedIn: z.string(),
//   other: z.string(),
//   imageUrl: z.string(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// const DetailsForm = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const isUserLoggedIn = isLoggedIn();
//   const { PNumber, accountType, email }: any = getUserInfo();
//   const { data } = useUserQuery(email);
//   console.log(data);

//   const router = useRouter();
//   const { startUpload } = useUploadThing("imageUploader");

//   const userDetailsDefaultValue = {
//     // userName: data?.data?.userName,
//     userName: "name",
//     firstName: "b",
//     lastName: "c",
//     email: "abc@gmail.com",
//     role: "user",
//     imageUrl: "",
//     address: "fas",
//     facebook: "facebook",
//     twitter: "twitter",
//     linkedIn: "linkedIn",
//     other: "other",
//   };

//   const [updateUser] = useUpdateUserMutation();

//   const form = useForm<z.infer<typeof formSchema>>({
//     defaultValues: {
//       // imageUrl: data?.data?.imageUrl,
//       imageUrl: "imgurl",
//     },
//     // resolver: zodResolver(formSchema),
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log("Submitted Values:", values);

//     let uploadedImageUrl = values.imageUrl;
//     if (files.length > 0) {
//       const uploadedImages = await startUpload(files);
//       if (!uploadedImages) {
//         return;
//       }
//       uploadedImageUrl = uploadedImages[0].url;
//     }
//     console.log(uploadedImageUrl, "uploadedImageUrl");
//     console.log(files, "files");
//     try {
//       const res = await updateUser({
//         id: userId,
//         body: values,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // useEffect(() => {
//   //   if (!isLoading && !data?.data) {
//   //     // router.push("/");
//   //   }
//   // }, [data, isLoading, router]);

//   // if (isLoading || !data?.data) {
//   //   // You can render a loading indicator while waiting for data
//   //   return <p>Loading...</p>;
//   // }
//   return (
//     // <div className="wrapper my-8 flex h-screen flex-col ">
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         // onSubmit={form.handleSubmit(handleSubmit)}
//         className="flex flex-col gap-5"
//       >
//         <h3 className="text-lg font-medium leading-6 text-gray-900">
//           Account Details
//         </h3>
//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="firstName"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <Input
//                     // defaultValue={data?.data?.firstName}
//                     placeholder="First Name"
//                     {...field}
//                     className="input-field"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <Input
//                     // defaultValue={data?.data?.lastName}
//                     placeholder="Last Name"
//                     {...field}
//                     className="input-field"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <Input
//                     // defaultValue={data?.data?.role}
//                     placeholder="User Role"
//                     {...field}
//                     className="input-field"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="userName"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <Input
//                     // defaultValue={data?.data?.userName}
//                     placeholder="User Name"
//                     {...field}
//                     className="input-field"
//                     // value={data?.data?.userName}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
//                     {/* <Image
//                       src="/assets/icons/location-grey.svg"
//                       alt="calendar"
//                       width={24}
//                       height={24}
//                     /> */}

//                     <Input
//                       // defaultValue={data?.data?.email}
//                       placeholder="Email"
//                       {...field}
//                       className="input-field"
//                     />
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="address"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl className="h-72">
//                   <Textarea
//                     // defaultValue={data?.data?.address}
//                     placeholder="Address"
//                     {...field}
//                     className="textarea rounded-2xl"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="imageUrl"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl className="">
//                   <FileUploader
//                     onFieldChange={field.onChange}
//                     // imageUrl={field.value}
//                     setFiles={setFiles}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button
//           type="submit"
//           size="lg"
//           disabled={form.formState.isSubmitting}
//           className="button col-span-2 w-full"
//         >
//           {form.formState.isSubmitting ? "Updating..." : "Update Account"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default DetailsForm;

import React from "react";

const Page = () => {
  return <div>page</div>;
};

export default Page;
