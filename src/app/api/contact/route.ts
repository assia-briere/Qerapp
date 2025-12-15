import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Pour l'instant, juste logger les données
    // Plus tard, vous pourrez ajouter l'envoi d'email
    console.log("Contact form submission:", { name, email, subject, message });

    // TODO: Intégrer un service d'email (Resend, SendGrid, etc.)
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}