import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";


export const GET = async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
      if (!userId) {
        return NextResponse.json(
          { message: "Please provide all the fields" },
          { status: 400 }
        );
      }
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 400 });
      }
  
      user.password = "";
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };