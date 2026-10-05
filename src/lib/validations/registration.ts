import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Full name contains invalid characters"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(150, "Email must not exceed 150 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must not exceed 20 characters")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Please enter a valid phone number"),
  courseSlug: z.enum(["cyber-security", "english", "artificial-intelligence"], {
    errorMap: () => ({ message: "Please select a valid course" }),
  }),
  couponCode: z
    .string()
    .max(30, "Coupon code is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(1000, "Message must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and privacy policy to register"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
