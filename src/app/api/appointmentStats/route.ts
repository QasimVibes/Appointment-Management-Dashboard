import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }
    const data = await prisma.appointmentStats.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { userId, url, durationInMinutes } = await request.json();
    if (!userId || !url || !durationInMinutes) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const existingData = await prisma.appointmentStats.findUnique({
      where: {
        userId,
        url: {
          has: url,
        },
      },
      select: {
        peakHours: true,
      },
    });

    if (!existingData) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }

    const updatedPeakHours = [...existingData.peakHours, durationInMinutes];

    await prisma.appointmentStats.update({
      where: {
        userId,
        url: {
          has: url,
        },
      },
      data: {
        peakHours: updatedPeakHours,
      },
    });

    return NextResponse.json(
      { message: "Peak hours updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
