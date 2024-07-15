import { NextRequest, NextResponse } from "next/server";
import { signJwtAccessToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
   
    
    if (!email || !password) {
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

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const accessToken = signJwtAccessToken({
      userId: user.id,
      email: user.email,
    });
    user.accessToken = accessToken;    
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
