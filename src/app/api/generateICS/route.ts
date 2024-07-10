import { NextRequest, NextResponse } from "next/server";
import { generateICS } from "../../../helpers/icsGenerator";
import prisma from "../../../libs/prisma";

const parseSelectedDateTime = (selectedDate: string, selectedTime: string) => {
  const [startTime, endTime] = selectedTime.split(" - ");
  const [startHours12, startMinutes, startPeriod] = startTime.split(/[: ]/);
  const [endHours12, endMinutes, endPeriod] = endTime.split(/[: ]/);

  let startHours = parseInt(startHours12, 10);
  let endHours = parseInt(endHours12, 10);

  if (startPeriod === "PM" && startHours !== 12) {
    startHours += 12;
  } else if (startPeriod === "AM" && startHours === 12) {
    startHours = 0;
  }

  if (endPeriod === "PM" && endHours !== 12) {
    endHours += 12;
  } else if (endPeriod === "AM" && endHours === 12) {
    endHours = 0;
  }

  const [weekday, month, day, year] = selectedDate.split(" ");
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

  const startDateUTC = new Date(
    Date.UTC(
      parseInt(year, 10),
      monthIndex,
      parseInt(day, 10),
      startHours,
      parseInt(startMinutes, 10)
    )
  );
  const endDateUTC = new Date(
    Date.UTC(
      parseInt(year, 10),
      monthIndex,
      parseInt(day, 10),
      endHours,
      parseInt(endMinutes, 10)
    )
  );
  const fiveHoursInMilliseconds = 5 * 60 * 60 * 1000;
  const startDate = new Date(startDateUTC.getTime() - fiveHoursInMilliseconds);
  const endDate = new Date(endDateUTC.getTime() - fiveHoursInMilliseconds);

  return { start: startDate, end: endDate };
};

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

    const meetings = await prisma.meeting.findMany({
      where: { userId: userId },
    });

    if (!meetings || meetings.length === 0) {
      return NextResponse.json(
        { message: "No meetings found for the userId" },
        { status: 404 }
      );
    }

    const icsPromises = meetings.map(async (meeting) => {
      try {
        const { start, end } = parseSelectedDateTime(
          meeting.selectedDate,
          meeting.selectedTime
        );

        const appointment = {
          email: meeting?.schedulerEmail || "",
          name: meeting.schedulerName || "",
          description: meeting?.description || "",
          start: start,
          end: end,
          hostName: meeting?.hostName || "",
        };
        return await generateICS(appointment);
      } catch (error) {
        console.error(
          `Error generating ICS for meeting ID ${meeting.id}: ${error}`
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
