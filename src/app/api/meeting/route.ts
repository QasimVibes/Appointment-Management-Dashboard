import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { nanoid } from "nanoid";

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
      timezone,
      userId,
    } = body;

    if (
      !schedulerEmail ||
      !schedulerName ||
      !selectedTime ||
      !selectedDate ||
      !hostName ||
      !timezone ||
      !userId
    ) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const existingMeeting = await prisma.meeting.findFirst({
      where: {
        AND: [{ schedulerEmail }, { selectedTime }, { selectedDate }],
      },
    });

    if (existingMeeting) {
      return NextResponse.json(
        { message: "Meeting already scheduled" },
        { status: 400 }
      );
    }

    const url = nanoid();

    const newMeeting = await prisma.meeting.create({
      data: {
        schedulerEmail,
        schedulerName,
        description,
        selectedTime,
        selectedDate,
        hostName,
        timezone,
        url,
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
      { message: "Meeting Scheduled successfully", meeting: newMeeting },
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
    const url = searchParams.get("url");

    if (userId) {
      const meetings = await prisma.meeting.findMany({
        where: { userId },
      });

      if (!meetings || meetings.length === 0) {
        return NextResponse.json(null);
      }

      return NextResponse.json(
        { message: "Meetings found", meetings },
        { status: 200 }
      );
    } else if (url) {
      const meeting = await prisma.meeting.findUnique({
        where: { url },
      });

      if (!meeting) {
        return NextResponse.json(
          { message: "Meeting not found for the provided url" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Meeting found", meeting },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Please provide either userId or url in query parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
