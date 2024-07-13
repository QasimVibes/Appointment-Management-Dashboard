import * as handlebars from "handlebars";
import { resetPasswordEmail } from "@/templates/resetPasswordEmail";

export function generateResetPasswordEmail(otp: string): string {
  const template = handlebars.compile(resetPasswordEmail);
  return template({ otpCode: otp });
}

// Add more templates here
