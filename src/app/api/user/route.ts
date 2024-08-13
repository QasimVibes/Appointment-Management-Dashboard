import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { message: "UserId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      const userToSend = {
        id: user?.id,
        fullname: user?.fullname,
        welcomeMessage: user?.welcomeMessage,
        language: user?.language,
        dateFormat: user?.dateFormat,
        timeFormat: user?.timeFormat,
        country: user?.country,
        timezone: user?.timezone,
      };

      return NextResponse.json({ user: userToSend }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const {
      id,
      fullname,
      welcomeMessage,
      language,
      dateFormat,
      timeFormat,
      country,
      timezone,
    } = body;

    if (!id || !fullname) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        fullname,
        welcomeMessage,
        language,
        dateFormat,
        timeFormat,
        country,
        timezone,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
