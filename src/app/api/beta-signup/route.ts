import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { firstName, email, os, country, source } = await request.json();

    // Validate input
    if (!firstName || !email || !os || !country || !source) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
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

    // Send notification email to admin
    await resend.emails.send({
      from: 'Qera Beta <noreply@qerapp.com>',
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
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Prénom:</td>
                  <td style="padding: 8px 0; color: #1f2937;">
                    ${firstName}
                  </td>
                </tr>
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
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Pays:</td>
                  <td style="padding: 8px 0; color: #1f2937;">
                    ${country}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Source:</td>
                  <td style="padding: 8px 0; color: #1f2937;">
                    ${source}
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
                <strong>💡 Action requise:</strong> L'email de bienvenue a été automatiquement envoyé à ${firstName}.
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

    // Send welcome email to user (using the template from Model email)
    // <div style="font-size: 48px; font-weight: bold; color: white; margin-bottom: 10px;">QERA</div>
    await resend.emails.send({
      from: 'Contact Qera <contact@qerapp.com>',
      to: [email],
      subject: 'Bienvenue dans le bêta-test QERA 🚀',
      html: `
        <div dir="ltr">
          <div style="background:linear-gradient(135deg,rgb(0,60,128),rgb(0,152,217));padding:20px 20px 15px;text-align:center;color:rgb(255,255,255)">
            <!-- QERA Logo placeholder - you can add your logo here -->
            <img 
              src="https://qerapp.com/images/logo-no-bg.png" 
              alt="QERA Logo" 
              style="max-width: 180px; height: auto; display: block; margin: 0 auto;"
            />
          </div>
          
          <div style="padding:40px 30px;line-height:1.6">
            <h2 style="margin:10px 0px 0px">
              <font face="arial, sans-serif" color="#000000">
                <span style="font-size:22px;letter-spacing:0.2px">Bonjour ${firstName}</span>
              </font>
              <span style="font-size:22px;letter-spacing:0.2px;color:rgb(0,0,0);font-family:arial,sans-serif;font-weight:normal">,</span>
            </h2>
            
            <div>
              <p>
                <font face="arial, sans-serif" color="#000000">
                  Merci d'avoir rejoint notre programme de bêta-test ! Vous faites maintenant partie de la communauté QERA et votre participation nous aidera à améliorer l'application.
                </font>
              </p>
              
              <p><b><font face="arial, sans-serif" color="#000000">Commencez dès maintenant :</font></b></p>
              
              <ul>
                <li style="margin-left:15px">
                     Télécharger l'application QERA sur :<br><br>
                  <a href="https://play.google.com/store/apps/details?id=com.qera.app" target="_blank">
                     <img 
                      src="https://qerapp.com/images/android.png"
                      alt="Télécharger sur Google Play" 
                      width="150"
                      style="display:block;border:0;outline:none;text-decoration:none;"
                      />      
                   </a>
                  <br><br>
                  <a href="https://testflight.apple.com/join/tzvz8UXU" target="_blank">
                      <img 
                      src="https://qerapp.com/images/social.png"
                      alt="Télécharger sur l'App Store" 
                      width="150"
                      style="display:block;border:0;outline:none;text-decoration:none;"
                      />    
                   </a>
                </li>
                <li style="margin-left:15px">
                  Testez les fonctionnalités : scan des produits et comparaisons selon vos critères (prix, nutrition, écologie, allergies)
                </li>
                <li style="margin-left:15px">
                  <p>
                    <font face="arial, sans-serif" color="#000000">
                      Partagez vos retours dans notre communauté WhatsApp : 
                      <a rel="noopener" href="https://chat.whatsapp.com/DC99hSnCFbLIKo187P6XjC" target="_blank">Rejoindre le groupe</a>
                    </font>
                  </p>
                </li>
              </ul>
              
              <p><b><font face="arial, sans-serif" color="#000000">Ce que vous trouverez dans ce mail :</font></b></p>
              <ul>
                <li style="margin-left:15px">
                  <p><font face="arial, sans-serif" color="#000000">Guide QERA pour découvrir l'application et ses fonctionnalités :</font>
                  <a href="https://drive.google.com/file/d/1RxlyTGJu7jdzqco7wCKNL2J-LSTtg36s/view?usp=sharing" target="_blank">Voir le guide</a>
                  </p>
                </li>
                <li style="margin-left:15px">
                  <p><font face="arial, sans-serif" color="#000000">Image test pour scanner et tester depuis chez vous</font></p>
                </li>
              </ul>
              
              <p><b><font face="arial, sans-serif" color="#000000">À savoir :</font></b></p>
              <ul>
                <li style="margin-left:15px">
                  <p><font face="arial, sans-serif" color="#000000">L'application fonctionne tous les jours de 10h à 22h</font></p>
                </li>
                <li style="margin-left:15px">
                  <p><span style="color:rgb(0,0,0);font-family:arial,sans-serif">Vérifiez la présence de Wi-Fi si vous n'avez pas de réseau au supermarché</span></p>
                </li>
              </ul>
              
              <span style="color:rgb(0,0,0);font-family:arial,sans-serif">
                Votre avis est essentiel pour corriger les bugs, améliorer l'expérience et construire une application qui vous ressemble.
              </span>
              
              <p style="margin-top: 20px;">
                <font face="arial, sans-serif" color="#000000">
                  Merci pour votre contribution !<br>
                  <b>L'équipe QERA</b>
                </font>
              </p>
            </div>
          </div>
          
          <div style="background-color:#f3f4f6;padding:20px;text-align:center;border-top:1px solid #e5e7eb">
            <p style="margin:0 0 10px 0">
              <a href="https://www.qerapp.com/" style="color:#2563eb;text-decoration:none">Visitez notre site</a>
            </p>
            <p style="margin:0;color:#6b7280;font-size:12px">
              qerapp.com © ${new Date().getFullYear()} QERA - All rights reserved
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

