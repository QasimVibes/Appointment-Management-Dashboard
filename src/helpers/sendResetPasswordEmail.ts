import { resend } from "@/libs/resend";
import ResetPasswordEmail from "../../emails/resetPasswordEmail";


export const SendResetPasswordEmail = async (
    email: string,
    otpCode: string,
  ) => {
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verification Code",
        react: ResetPasswordEmail({ otpCode }),
        text: `Your verification code is ${otpCode}`,
      });
      
  
      return { success: true, message: "Verification email send successfully" };
    } catch (error) {
      console.log("Error sending verification email", error);
      return { success: false, message: "Failed to send verification email" };
    }
  };