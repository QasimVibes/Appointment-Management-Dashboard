import { google } from "googleapis";

export async function createGoogleMeetEvent(
  accessToken: string,
  eventDetails: any
) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  try {
    const response = await google.calendar("v3").events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      requestBody: {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.start.dateTime,
          timeZone: eventDetails.start.timeZone,
        },
        end: {
          dateTime: eventDetails.end.dateTime,
          timeZone: eventDetails.end.timeZone,
        },
        conferenceData: {
          createRequest: {
            requestId: eventDetails.conferenceRequestId,
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
        attendees: eventDetails.attendees,
        reminders: eventDetails.reminders,
      },
      sendNotifications: true,
      sendUpdates: "all",
      conferenceDataVersion: 1,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw new Error("Error creating meeting");
  }
}
