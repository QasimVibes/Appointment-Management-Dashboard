import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const { startHour, endHour, days, userId } = await request.json();
    if (!startHour || !endHour || !days || !userId || days.length === 0) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const availability = await prisma.availability.create({
      data: {
        startHour,
        endHour,
        days,
        userId,
      },
    });

    if (!availability) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Availability created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
