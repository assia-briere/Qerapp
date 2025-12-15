import { Resend } from 'resend';
import { NextResponse } from 'next/server';


// This tells Next.js to only evaluate this at runtime, not during build
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Qera Contact <onboarding@resend.dev>', // Change to your verified domain later
      to: ['contact@qerapp.com'], // YOUR verified Resend account email
      replyTo: email, // User's email for easy reply
      subject: `[Qera Contact Form] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name, email, subject, message } = body;

//     // Pour l'instant, juste logger les données
//     // Plus tard, vous pourrez ajouter l'envoi d'email
//     console.log("Contact form submission:", { name, email, subject, message });

//     // TODO: Intégrer un service d'email (Resend, SendGrid, etc.)
    
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch {
//     return NextResponse.json(
//       { error: "Failed to process request" },
//       { status: 500 }
//     );
//   }
// }