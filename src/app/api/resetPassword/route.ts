import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, newPassword, otp } = body;

    if (!email || !newPassword || !otp) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (
      !user ||
      user?.otp !== otp ||
      !user?.otpExpires ||
      user?.otpExpires < new Date()
    ) {
      return NextResponse.json(
        { message: "Invalid or expired Token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpires: null,
      },
    });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
