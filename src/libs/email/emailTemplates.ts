import Handlebars from 'handlebars';
import { resetPasswordEmail } from '@/templates/resetPasswordEmail';
import { emailConfirmationHost } from '@/templates/emailConfirmationHost';
import { emailConfirmationParticipant } from '@/templates/emailConfirmationParticipant';

interface ResetPasswordEmailData {
  otpCode: string;
}

interface EmailConfirmationHostData {
  name: string;
  email: string;
  time: string;
  date: string;
  timeZone: string;
  message: string;
  googleBtnLink: string;
}

interface EmailConfirmationParticipantData {
  name: string;
  hostName: string;
  time: string;
  date: string;
  timezone: string;
  message: string;
  buttonLink: string;
}

export function generateResetPasswordEmail(otp: string): string {
  const template = Handlebars.compile(resetPasswordEmail);
  const data: ResetPasswordEmailData = { otpCode: otp };
  return template(data);
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

export function generateEmailConfirmationParticipant(
  name: string,
  hostName: string,
  time: string,
  date: string,
  timezone: string,
  message: string,
  buttonLink: string
): string {
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
