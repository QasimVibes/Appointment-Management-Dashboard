import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { fullname, username, email, password } = body;

    if (!fullname || !email || !password || !username) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        username,
        password: hashedPassword,
      },
    });

    user.password = "";
    return NextResponse.json(
      { message: "Registration successful", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

