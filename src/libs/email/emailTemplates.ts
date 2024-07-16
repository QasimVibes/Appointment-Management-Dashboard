import * as handlebars from "handlebars";
import { resetPasswordEmail } from "@/templates/resetPasswordEmail";
import { emailConfirmationHost } from "@/templates/emailConfirmationHost";
import { emailConfirmationParticipant } from "@/templates/emailConfirmationParticipant";

export function generateResetPasswordEmail(otp: string): string {
  const template = handlebars.compile(resetPasswordEmail);
  return template({ otpCode: otp });
}

export function generateEmailConfirmationHost(
  name: string,
  email: string,
  time: string,
  date: string,
  timeZone: string,
  message: string,
  googleBtnLink: string
): string {
  const template = handlebars.compile(emailConfirmationHost);
  return template({
    name,
    email,
    time,
    date,
    timeZone,
    message,
    googleBtnLink,
  });
}

export function generateEmailConfirmationParticipant(
  name: string,
  hostName: string,
  time: string,
  date: string,
  timezone: string,
  message: string,
  buttonLink: string
): string {
  const template = handlebars.compile(emailConfirmationParticipant);
  return template({
    name,
    hostName,
    time,
    date,
    timezone,
    message,
    buttonLink,
  });
}
