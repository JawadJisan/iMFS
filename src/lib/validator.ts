import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
export const userFormSchema = z.object({
  userName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  role: z.string().optional(),
  address: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
  other: z.string().optional(),
  imageUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userRegistrationSchema = z.object({
  name: z.string().min(3, "User Name must be at least 3 characters"),
  email: z.string(),
  accountType: z.string(),
  nid: z.number(),
  // password: z.number().min(5, "PIN Number must be 5 Digit").max(5),
  password: z.number(),
  mobileNumber: z.number(),
});

export const userLoginSchema = z.object({
  password: z.number(),
  mobileNumber: z.number(),
});
