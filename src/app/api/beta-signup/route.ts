import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, os } = await request.json();

    // Validate input
    if (!email || !os) {
      return NextResponse.json(
        { error: "Email et OS requis" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Import Resend dynamically
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send notification email to you
    await resend.emails.send({
      from: 'Qera Beta <onboarding@resend.dev>',
      to: ['contact@qerapp.com'],
      replyTo: email,
      subject: `[Qera Beta] Nouvelle inscription - ${os.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">🎉 Nouvelle inscription Beta</h2>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin-top: 0; color: #2563eb;">Informations de l'utilisateur</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Système:</td>
                  <td style="padding: 8px 0;">
                    <span style="background-color: ${os === 'ios' ? '#e0e7ff' : '#dcfce7'}; 
                                 color: ${os === 'ios' ? '#3730a3' : '#166534'}; 
                                 padding: 4px 12px; 
                                 border-radius: 12px; 
                                 font-weight: 600; 
                                 font-size: 14px;">
                      ${os === 'ios' ? '🍎 iOS' : '🤖 Android'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Date:</td>
                  <td style="padding: 8px 0; color: #1f2937;">
                    ${new Date().toLocaleString('fr-FR', { 
                      dateStyle: 'full', 
                      timeStyle: 'short' 
                    })}
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>💡 Action requise:</strong> Envoyez un email d'accès beta à cet utilisateur dans les 48h.
              </p>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              Cette notification a été envoyée automatiquement depuis le formulaire beta de Qera
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Qera Beta <onboarding@resend.dev>',
      to: [email],
      subject: 'Bienvenue dans la beta Qera ! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2563eb; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">🎉 Bienvenue !</h1>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px;">
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-top: 0;">Merci de votre inscription à la beta Qera</h2>
              <p style="color: #4b5563; line-height: 1.6;">
                Nous sommes ravis de vous compter parmi nos premiers utilisateurs ! Vous recevrez vos accès anticipés d'ici <strong>48 heures</strong>.
              </p>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #2563eb; margin-top: 0;">📧 Prochaines étapes</h3>
              <ol style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
                <li>Surveillez votre boîte email (vérifiez vos spams)</li>
                <li>Téléchargez l'app via le lien que nous vous enverrons</li>
                <li>Profitez de Qera en avant-première !</li>
              </ol>
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af;">
                <strong>💡 Astuce:</strong> Invitez vos amis pour passer en priorité dans la file d'attente !
              </p>
            </div>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              Des questions ? Contactez-nous à <a href="mailto:contact@qerapp.com" style="color: #2563eb;">contact@qerapp.com</a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Qera. Tous droits réservés.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Inscription réussie' 
    });

  } catch (error) {
    console.error('Error processing beta signup:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { promises as fs } from 'fs';
// import path from 'path';

// export const dynamic = 'force-dynamic';

// interface BetaSignup {
//   email: string;
//   os: string;
//   signupDate: string;
//   id: string;
// }

// // File to store beta signups
// const SIGNUPS_FILE = path.join(process.cwd(), 'data', 'beta-signups.json');

// // Ensure data directory exists
// async function ensureDataDir() {
//   const dataDir = path.join(process.cwd(), 'data');
//   try {
//     await fs.access(dataDir);
//   } catch {
//     await fs.mkdir(dataDir, { recursive: true });
//   }
// }

// // Load existing signups
// async function loadSignups(): Promise<BetaSignup[]> {
//   try {
//     await ensureDataDir();
//     const data = await fs.readFile(SIGNUPS_FILE, 'utf-8');
//     return JSON.parse(data) as BetaSignup[];
//   } catch {
//     return [];
//   }
// }

// // Save signups
// async function saveSignups(signups: BetaSignup[]): Promise<void> {
//   await ensureDataDir();
//   await fs.writeFile(SIGNUPS_FILE, JSON.stringify(signups, null, 2));
// }

// export async function POST(request: Request) {
//   try {
//     const { email, os } = await request.json();

//     // Validate input
//     if (!email || !os) {
//       return NextResponse.json(
//         { error: "Email et OS requis" },
//         { status: 400 }
//       );
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { error: "Adresse email invalide" },
//         { status: 400 }
//       );
//     }

//     // Check if email already exists
//     const existingSignups = await loadSignups();
//     const emailExists = existingSignups.some(
//       (signup: BetaSignup) => signup.email.toLowerCase() === email.toLowerCase()
//     );

//     if (emailExists) {
//       return NextResponse.json(
//         { error: "Cet email est déjà inscrit à la beta" },
//         { status: 409 } // 409 Conflict
//       );
//     }

//     // Add new signup
//     const newSignup: BetaSignup = {
//       email,
//       os,
//       signupDate: new Date().toISOString(),
//       id: Date.now().toString(),
//     };

//     existingSignups.push(newSignup);
//     await saveSignups(existingSignups);

//     // Import Resend dynamically
//     const { Resend } = await import('resend');
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     // Send notification email to you
//     await resend.emails.send({
//       from: 'Qera Beta <onboarding@resend.dev>',
//       to: ['contact@qerapp.com'],
//       replyTo: email,
//       subject: `[Qera Beta] Nouvelle inscription #${existingSignups.length} - ${os.toUpperCase()}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
//             <h2 style="margin: 0;">🎉 Nouvelle inscription Beta #${existingSignups.length}</h2>
//           </div>
          
//           <div style="background-color: #f3f4f6; padding: 20px;">
//             <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
//               <h3 style="margin-top: 0; color: #2563eb;">Informations de l'utilisateur</h3>
//               <table style="width: 100%; border-collapse: collapse;">
//                 <tr>
//                   <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
//                   <td style="padding: 8px 0;">
//                     <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
//                       ${email}
//                     </a>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Système:</td>
//                   <td style="padding: 8px 0;">
//                     <span style="background-color: ${os === 'ios' ? '#e0e7ff' : '#dcfce7'}; 
//                                  color: ${os === 'ios' ? '#3730a3' : '#166534'}; 
//                                  padding: 4px 12px; 
//                                  border-radius: 12px; 
//                                  font-weight: 600; 
//                                  font-size: 14px;">
//                       ${os === 'ios' ? '🍎 iOS' : '🤖 Android'}
//                     </span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Date:</td>
//                   <td style="padding: 8px 0; color: #1f2937;">
//                     ${new Date().toLocaleString('fr-FR', { 
//                       dateStyle: 'full', 
//                       timeStyle: 'short' 
//                     })}
//                   </td>
//                 </tr>

//               </table>
//             </div>
            
//             <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
//               <p style="margin: 0; color: #1e40af; font-size: 14px;">
//                 <strong>💡 Action requise:</strong> Envoyez un email d'accès beta à cet utilisateur dans les 48h.
//               </p>
//             </div>
//           </div>
          
//           <div style="margin-top: 20px; padding: 15px; text-align: center;">
//             <p style="color: #6b7280; font-size: 12px; margin: 0;">
//               Cette notification a été envoyée automatiquement depuis le formulaire beta de Qera
//             </p>
//           </div>
//         </div>
//       `,
//     });

//     // Send confirmation email to the user
//     await resend.emails.send({
//       from: 'Qera Beta <onboarding@resend.dev>',
//       to: [email],
//       subject: 'Bienvenue dans la beta Qera ! 🎉',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background-color: #2563eb; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
//             <h1 style="margin: 0; font-size: 32px;">🎉 Bienvenue !</h1>
//           </div>
          
//           <div style="background-color: #f9fafb; padding: 30px;">
//             <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
//               <h2 style="color: #1f2937; margin-top: 0;">Merci de votre inscription à la beta Qera</h2>
//               <p style="color: #4b5563; line-height: 1.6;">
//                 Nous sommes ravis de vous compter parmi nos premiers utilisateurs ! Vous recevrez vos accès anticipés d'ici <strong>48 heures</strong>.
//               </p>
//             </div>
            
//             <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
//               <h3 style="color: #2563eb; margin-top: 0;">📧 Prochaines étapes</h3>
//               <ol style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
//                 <li>Surveillez votre boîte email (vérifiez vos spams)</li>
//                 <li>Téléchargez l'app via le lien que nous vous enverrons</li>
//                 <li>Profitez de Qera en avant-première !</li>
//               </ol>
//             </div>
            
//             <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
//               <p style="margin: 0; color: #1e40af;">
//                 <strong>💡 Astuce:</strong> Invitez vos amis pour passer en priorité dans la file d'attente !
//               </p>
//             </div>
//           </div>
          
//           <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
//             <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
//               Des questions ? Contactez-nous à <a href="mailto:contact@qerapp.com" style="color: #2563eb;">contact@qerapp.com</a>
//             </p>
//             <p style="color: #9ca3af; font-size: 12px; margin: 0;">
//               © ${new Date().getFullYear()} Qera. Tous droits réservés.
//             </p>
//           </div>
//         </div>
//       `,
//     });

//     return NextResponse.json({ 
//       success: true,
//       message: 'Inscription réussie' 
//     });

//   } catch (error) {
//     console.error('Error processing beta signup:', error);
//     return NextResponse.json(
//       { error: 'Erreur serveur' },
//       { status: 500 }
//     );
//   }
// }

