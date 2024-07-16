import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { nanoid } from "nanoid";
import {
  generateEmailConfirmationHost,
  generateEmailConfirmationParticipant,
} from "@/libs/email/emailTemplates";
import { sendMail } from "@/libs/email/nodemailer";
import { getToken } from "next-auth/jwt";
import { parseSelectedDateTime } from "@/constants/parseSelectedDateTime";
import { createGoogleMeetEvent } from "@/libs/googleMeet";

async function getSessionToken(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token;
}

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
      hostEmail,
      timezone,
      userId,
    } = body;

    console.log(request);
    
    const session = await getSessionToken(request);
    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const accessToken = session.accessToken as string;

    if (
      !schedulerEmail ||
      !schedulerName ||
      !selectedTime ||
      !selectedDate ||
      !hostName ||
      !hostEmail ||
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

    const { start, end } = parseSelectedDateTime(
      newMeeting.selectedDate,
      newMeeting.selectedTime
    );

    const eventDetails = {
      summary: "Google Meet",
      description: `${newMeeting.schedulerName}'s Meeting`,
      start: {
        dateTime: start,
        timeZone: "Asia/Karachi",
      },
      end: {
        dateTime: end,
        timeZone: "Asia/Karachi",
      },
      conferenceRequestId: nanoid(),
      attendees: [{ email: `${newMeeting.schedulerEmail}` }],
      reminders: {
        useDefault: true,
      },
    };

    const response = await createGoogleMeetEvent(accessToken, eventDetails);

    if (!response.htmlLink) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    const { htmlLink } = response;

    // add Google Calendar event

    const htmlHost = generateEmailConfirmationHost(
      newMeeting.hostName,
      newMeeting.schedulerEmail,
      newMeeting.selectedTime,
      newMeeting.selectedDate,
      newMeeting.timezone,
      newMeeting.description,
      htmlLink
    );
    const htmlParticipant = generateEmailConfirmationParticipant(
      newMeeting.schedulerName,
      newMeeting.hostName,
      newMeeting.selectedTime,
      newMeeting.selectedDate,
      newMeeting.timezone,
      newMeeting.description,
      htmlLink
    );
    await sendMail({
      to: hostEmail,
      subject: `New Event:${newMeeting.schedulerName} - ${newMeeting.selectedTime} ${newMeeting.selectedDate} - 30 Minutes Meeting`,
      html: htmlHost,
    });
    await sendMail({
      to: newMeeting.schedulerEmail,
      subject: `New Event:${newMeeting.hostName} - ${newMeeting.selectedTime} ${newMeeting.selectedDate} - 30 Minutes Meeting`,
      html: htmlParticipant,
    });

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
