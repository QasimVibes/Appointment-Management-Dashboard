import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri:
    process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/auth/callback/google",
});

export async function generateGoogleMeetURL(
  summary: string,
  startDateTime: string,
  endDateTime: string
): Promise<string | null> {
  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: summary,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Karachi",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Karachi",
      },
      conferenceData: {
        createRequest: {
          requestId: "random-request-id",
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });

    if (
      response.status === 200 &&
      response.data &&
      response.data.conferenceData &&
      response.data.conferenceData.entryPoints
    ) {
      return response.data.conferenceData.entryPoints[0]?.uri || null;
    } else {
      throw new Error("Failed to insert event or retrieve conference data");
    }
  } catch (error) {
    console.error("Error generating Google Meet URL:", error);
    return null;
  }
}
