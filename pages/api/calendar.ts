import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const token = await getToken({ req });
  if (!token || !token.accessToken) return res.status(401).json({ error: "Unauthorized" });

  const { summary, description, start, end } = req.body;

  try {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: token.accessToken as string });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end },
      },
    });

    res.status(200).json({ success: true, eventId: response.data.id });
  } catch (error) {
    console.error("Google Calendar Error:", error);
    res.status(500).json({ error: "Failed to create calendar event" });
  }
}
