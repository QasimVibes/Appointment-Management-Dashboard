import Handlebars from "handlebars";
import { resetPasswordEmail } from "@/templates/resetPasswordEmail";
import { emailConfirmationHost } from "@/templates/emailConfirmationHost";
import { emailConfirmationParticipant } from "@/templates/emailConfirmationParticipant";
import {
  ResetPasswordEmailData,
  EmailConfirmationHostData,
  EmailConfirmationParticipantData,
  EmailConfirmationHost,
  EmailConfirmationParticipant,
} from "@/types/types";

export function generateResetPasswordEmail(otp: string): string {
  const template = Handlebars.compile(resetPasswordEmail);
  const data: ResetPasswordEmailData = { otpCode: otp };
  return template(data);
}

export function generateEmailConfirmationHost({
  name,
  email,
  time,
  date,
  timeZone,
  message,
  googleBtnLink,
}: EmailConfirmationHost): string {
  const template = Handlebars.compile(emailConfirmationHost);
  const data: EmailConfirmationHostData = {
    name,
    email,
    time,
    date,
    timeZone,
    message,
    googleBtnLink,
  };
  return template(data);
}

export function generateEmailConfirmationParticipant({
  name,
  hostName,
  time,
  date,
  timezone,
  message,
  buttonLink,
}: EmailConfirmationParticipant): string {
  const template = Handlebars.compile(emailConfirmationParticipant);
  const data: EmailConfirmationParticipantData = {
    name,
    hostName,
    time,
    date,
    timezone,
    message,
    buttonLink,
  };
  return template(data);
}
