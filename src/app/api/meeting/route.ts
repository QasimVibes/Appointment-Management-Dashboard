import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      schedulerEmail,
      schedulerName,
      description,
      selectedTime,
      selectedDate,
      hostName,
      userId,
    } = body;

    if (
      !schedulerEmail ||
      !schedulerName ||
      !description ||
      !selectedTime ||
      !selectedDate ||
      !hostName ||
      !userId
    ) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const newMeeting = await prisma.meeting.create({
      data: {
        schedulerEmail,
        schedulerName,
        description,
        selectedTime,
        selectedDate,
        hostName,
        userId,
      },
    });

    if (!newMeeting) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Meeting scheduled successfully" },
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
    if (!userId) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const meetings = await prisma.meeting.findMany({
      where: { userId },
    });

    if (!meetings) {
      return NextResponse.json(
        { message: "Meetings not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Meetings found", meetings },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
