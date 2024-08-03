import { createEvent, EventAttributes } from "ics";
import { Appointment } from "@/types/types";

export const generateICS = async (
  appointment: Appointment
): Promise<string> => {
  const { name, email, description, hostName, start, end } = appointment;

  const eventAttributes: EventAttributes = {
    start: [
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate(),
      start.getHours(),
      start.getMinutes(),
    ],
    end: [
      end.getFullYear(),
      end.getMonth() + 1,
      end.getDate(),
      end.getHours(),
      end.getMinutes(),
    ],
    title: `${name}'s Appointment`,
    description: description,
    status: "CONFIRMED",
    location: "Google Meet",
    organizer: { name: hostName },
    attendees: [{ name: name, email: email }],
  };

  const { error, value } = createEvent(eventAttributes);
  if (error) {
    throw new Error(`Error generating ICS: ${error}`);
  }

  return value ?? "";
};
