import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function PUT(request: NextRequest) {
  try {
    const { startHour, endHour, days, userId } = await request.json();
    if (!startHour || !endHour || !days || !userId || days.length === 0) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const upsertAvailability = await prisma.availability.upsert({
      where: { userId },
      create: { startHour, endHour, days, userId },
      update: { startHour, endHour, days, userId },
    });

    if (!upsertAvailability) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Availability updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (userId) {
      const availability = await prisma.availability.findUnique({
        where: { userId },
        include: {
          user: true,
        },
      });

      return NextResponse.json(
        {
          availability: availability,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Please provide userId" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
