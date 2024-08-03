import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { generateResetPasswordEmail } from "@/libs/email/emailTemplates";
import { sendMail } from "@/libs/email/nodemailer";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.otp = String(Math.floor(1000 + Math.random() * 9000)); // Generate OTP (4 digits);
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otp: user.otp,
        otpExpires: user.otpExpires,
      },
    });

    const html = generateResetPasswordEmail(user.otp);
    await sendMail({ to: user.email, subject: "Reset Password", html });

    return NextResponse.json(
      { message: "OTP sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
