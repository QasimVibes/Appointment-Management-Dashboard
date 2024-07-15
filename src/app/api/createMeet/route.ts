import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createGoogleMeetEvent } from "@/libs/googleMeet";
import { nanoid } from "nanoid";

async function getSessionToken(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token;
}

export async function POST(req: NextRequest) {
  const session = await getSessionToken(req);
  console.log(session);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const accessToken = session.accessToken as string;

  try {
    const eventDetails = {
      summary: "Google Meet",
      description: "This is a sample meeting",
      start: {
        dateTime: "2024-07-20T19:00:00",
        timeZone: "Asia/Karachi",
      },
      end: {
        dateTime: "2024-07-20T20:00:00",
        timeZone: "Asia/Karachi",
      },
      conferenceRequestId: nanoid(),
      attendees: [{ email: "qasimrazzaq500@gmail.com" }],
      reminders: {
        useDefault: true,
      },
    };

    const response = await createGoogleMeetEvent(accessToken, eventDetails);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating meeting:", error);
    return NextResponse.json(
      { error: "Error creating meeting" },
      { status: 500 }
    );
  }
}
