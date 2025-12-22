import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';


// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}
export async function POST(request: Request) {
  try {
    // Import Resend dynamically to avoid build-time evaluation
    const { Resend } = await import('resend');
    
    // Initialize Resend inside the function
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

        // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'CAPTCHA manquant' },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'Vérification CAPTCHA échouée. Veuillez réessayer.' },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Qera Contact <onboarding@resend.dev>',
      to: ['contact@qerapp.com'],
      replyTo: email,
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


// import { Resend } from 'resend';
// import { NextResponse } from 'next/server';


// // This tells Next.js to only evaluate this at runtime, not during build
// export const dynamic = 'force-dynamic';
// export const runtime = 'nodejs';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name, email, subject, message } = body;

//     // Validate input
//     if (!name || !email || !subject || !message) {
//       return NextResponse.json(
//         { error: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     // Send email
//     const { data, error } = await resend.emails.send({
//       from: 'Qera Contact <onboarding@resend.dev>', // Change to your verified domain later
//       to: ['contact@qerapp.com'], // YOUR verified Resend account email
//       replyTo: email, // User's email for easy reply
//       subject: `[Qera Contact Form] ${subject}`,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>From:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <hr />
//         <h3>Message:</h3>
//         <p>${message.replace(/\n/g, '<br>')}</p>
//       `,
//     });

//     if (error) {
//       console.error('Resend error:', error);
//       return NextResponse.json(
//         { error: 'Failed to send email' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'Email sent successfully', data },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
