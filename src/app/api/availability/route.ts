import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";

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
      { message: "Availability updated"},
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

export async function GET() {
  try {
    const availability = await prisma.availability.findMany({
      include: {
        user: true,
      },
    });

    if (availability.length === 0) {
      return NextResponse.json(
        { message: "Availability not found" },
        { status: 404 }
      );
    }

    const availabilityWithPasswordNull = availability.map((availability) => {
      return {
        ...availability,
        user: {
          ...availability.user,
          password: "",
        },
      };
    });
    return NextResponse.json(
      { availability: availabilityWithPasswordNull },
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
