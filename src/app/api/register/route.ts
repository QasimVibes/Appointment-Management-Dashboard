import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, username, email, password } = body;
    
    if (!name || !email || !password || !username) {
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
        name,
        email,
        username,
        password: hashedPassword,
      },
    });
    
    user.password = "";
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET=async (request: NextRequest) => {
    const response=await prisma.user.findMany()
  return NextResponse.json(
    { message: "Get request not allowed", response },
    { status: 405 }
  );
}