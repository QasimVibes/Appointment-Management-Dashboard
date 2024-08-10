import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { nanoid } from "nanoid";
import {
  generateEmailConfirmationHost,
  generateEmailConfirmationParticipant,
} from "@/libs/email/emailTemplates";
import { sendMail } from "@/libs/email/nodemailer";
import { getToken } from "next-auth/jwt";
import { parseSelectedDateTime } from "@/hooks/parseSelectedDateTimeHook";
import { createGoogleMeetEvent } from "@/libs/googleMeet";

async function getSessionToken(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token;
}

const getWeekStartDate = (isoDate: string): Date => {
  const weekStartDate = new Date(isoDate);
  const day = weekStartDate.getUTCDay();
  const diff = weekStartDate.getUTCDate() - day + (day === 0 ? -6 : 1);
  weekStartDate.setUTCDate(diff);
  weekStartDate.setUTCHours(0, 0, 0, 0);
  return weekStartDate;
};

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

    const { start, end } = parseSelectedDateTime(selectedDate, selectedTime);

    const eventDetails = {
      summary: "Google Meet",
      description: `${schedulerName}'s Meeting`,
      start: {
        dateTime: start,
        timeZone: "Asia/Karachi",
      },
      end: {
        dateTime: end,
        timeZone: "Asia/Karachi",
      },
      conferenceRequestId: nanoid(),
      attendees: [{ email: `${schedulerEmail}` }],
      reminders: {
        useDefault: true,
      },
    };

    const response = await createGoogleMeetEvent(accessToken, eventDetails);

    if (
      !response.htmlLink ||
      !response.start?.dateTime ||
      !(response.attendees?.length ?? 0) ||
      !response.hangoutLink
    ) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
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
        meetingLink: response.hangoutLink,
      },
    });

    if (!newMeeting) {
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

    const weekStartDate = getWeekStartDate(response.start.dateTime);
    const visits = response.attendees ? response.attendees.length : 0;

    const existingAppointmentStatus = await prisma.appointmentStats.findFirst({
      where: {
        userId: newMeeting.userId,
        date: weekStartDate,
      },
    });

    if (existingAppointmentStatus) {
      const urlArray = [...existingAppointmentStatus.url, url];
      await prisma.appointmentStats.update({
        where: {
          id: existingAppointmentStatus.id,
          date: weekStartDate,
        },
        data: {
          visits: visits,
          scheduledCount: { increment: 1 },
          url: {
            set: urlArray,
          },
        },
      });
    }

    if (!existingAppointmentStatus) {
      await prisma.appointmentStats.create({
        data: {
          userId: newMeeting.userId,
          date: weekStartDate,
          visits: visits,
          scheduledCount: 1,
          url: [url],
        },
      });
    }

    return NextResponse.json(
      { message: "Meeting Scheduled successfully", meeting: newMeeting },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error scheduling meeting:", error);
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

      return NextResponse.json({ meetings }, { status: 200 });
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

      return NextResponse.json({ meeting }, { status: 200 });
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
