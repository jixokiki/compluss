import { google } from "googleapis";

export async function createGoogleCalendarEvent(accessToken: string, data: {
  summary: string;
  description: string;
  start: string;
  end: string;
}) {
  const calendar = google.calendar({ version: "v3" });
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  await calendar.events.insert({
    auth,
    calendarId: "primary",
    requestBody: {
      summary: data.summary,
      description: data.description,
      start: { dateTime: data.start, timeZone: "Asia/Jakarta" },
      end: { dateTime: data.end, timeZone: "Asia/Jakarta" },
    },
  });
}
