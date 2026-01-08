import "server-only";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("GoogleSheet body:", body);

    const { firstName, email, os, country, source } = body || {};

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({ error: "Champs requis manquants" }),
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Ligne à insérer (ordre = colonnes Google Sheet)
    const row = [
      firstName,
      email,
      os,
      country,
      source,
      new Date().toISOString(), // date
    ];

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: "'Feuille 1'!A:F",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    return new Response(
      JSON.stringify({ success: true, result: res.data }),
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Google Sheet error:", err);
    let message = "Erreur serveur";
    if (err instanceof Error) {
      message = err.message;
    }
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500 }
    );
  }
}
