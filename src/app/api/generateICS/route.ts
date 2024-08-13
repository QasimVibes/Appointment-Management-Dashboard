import { NextRequest, NextResponse } from "next/server";
import { generateICS } from "../../../libs/icsGenerator";
import prisma from "../../../libs/prisma";
import { parseSelectedDateTime } from "@/hooks/parseSelectedDateTimeHook";
import { Meeting } from "@/types/types";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const meetings: Meeting[] = await prisma.meeting.findMany({
      where: { userId: userId },
    });

    if (!meetings || meetings.length === 0) {
      return NextResponse.json(
        { message: "No meetings found" },
        { status: 404 }
      );
    }

    const icsPromises = meetings.map(async (meeting: Meeting) => {
      try {
        const { start, end } = parseSelectedDateTime(
          meeting.selectedDate,
          meeting.selectedTime
        );

        const dateOfStart = new Date(start);
        const dateOfEnd = new Date(end);
        const appointment = {
          email: meeting?.schedulerEmail || "",
          name: meeting?.schedulerName || "",
          description: meeting?.description || "",
          start: dateOfStart,
          end: dateOfEnd,
          hostName: meeting?.hostName || "",
        };
        return await generateICS(appointment);
      } catch (error) {
        console.error(
          `Error generating ICS for meeting ID ${meeting?.id}: ${error}`
        );
        return "";
      }
    });

    const icsContents = await Promise.all(icsPromises);
    const headers = new Headers();
    headers.set("Content-Type", "text/calendar; charset=utf-8");
    headers.set("Cache-Control", "no-store");
    headers.set(
      "Content-Disposition",
      'attachment; filename="appointments.ics"'
    );

    return new Response(icsContents.join("\n"), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Failed to handle POST request" },
      { status: 500 }
    );
  }
};
