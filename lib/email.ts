import { Resend } from "resend";
import { siteConfig } from "@/site.config";
import {
  ContactFormData,
  PROJECT_TYPE_LABELS,
  BUDGET_RANGE_LABELS,
} from "@/lib/contact-schema";

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface SendEmailResult {
  success: boolean;
  devMode?: boolean;
  messageId?: string;
  error?: string;
  message?: string;
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const isDev = process.env.NODE_ENV !== "production";

  const submissionDate = new Date().toISOString();
  const projectLabel = PROJECT_TYPE_LABELS[data.projectType] || data.projectType;
  const budgetLabel = data.budget
    ? BUDGET_RANGE_LABELS[data.budget] || data.budget
    : "Nie określono";

  // Bez klucza Resend: loguj wiadomość w konsoli i zwróć informację, że wysyłka nie jest skonfigurowana
  if (!apiKey) {
    if (isDev) {
      console.log(
        `[DEV MODE - FORMULARZ] Otrzymano zapytanie od: ${data.name} (brak RESEND_API_KEY).`
      );
      console.log(`[DEV MODE] Typ: ${projectLabel}, Budżet: ${budgetLabel}`);
    } else {
      console.log(
        `[SERVER] Formularz kontaktowy: brak klucza RESEND_API_KEY. Wysyłka nie jest skonfigurowana.`
      );
    }

    return {
      success: true,
      devMode: true,
      message:
        "Wysyłka nie jest skonfigurowana (brak klucza RESEND_API_KEY). Zgłoszenie przyjęte w trybie symulacji.",
    };
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "formularz@studiowzrostu.pl";

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || "Nie podano");
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pl">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; }
          .container { max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .header { border-bottom: 2px solid #111; padding-bottom: 12px; margin-bottom: 20px; }
          .field { margin-bottom: 14px; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; font-weight: 600; }
          .value { font-size: 15px; margin-top: 2px; }
          .message-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin: 16px 0; white-space: pre-wrap; }
          .proof-box { margin-top: 24px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 12px; color: #166534; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; font-size: 20px;">Nowe zapytanie – ${escapeHtml(siteConfig.name)}</h2>
          </div>
          
          <div class="field">
            <div class="label">Nadawca</div>
            <div class="value"><strong>${safeName}</strong> &lt;${safeEmail}&gt;</div>
          </div>

          <div class="field">
            <div class="label">Telefon</div>
            <div class="value">${safePhone}</div>
          </div>

          <div class="field">
            <div class="label">Rodzaj projektu</div>
            <div class="value">${escapeHtml(projectLabel)}</div>
          </div>

          <div class="field">
            <div class="label">Budżet</div>
            <div class="value">${escapeHtml(budgetLabel)}</div>
          </div>

          <div class="field">
            <div class="label">Treść wiadomości</div>
            <div class="message-box">${safeMessage}</div>
          </div>

          <div class="proof-box">
            <strong>DOWÓD ZGODY RODO:</strong><br>
            • Zgoda na przetwarzanie danych: TAK<br>
            • Data i czas zgłoszenia: ${submissionDate}<br>
            • Wersja polityki prywatności: ${siteConfig.policyVersion}<br>
            • Oświadczenie: Użytkownik zaznaczył wymagane pole zgody przed wysłaniem formularza.
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Nowe zapytanie ofertowe – ${siteConfig.name}
----------------------------------------
Nadawca: ${data.name} <${data.email}>
Telefon: ${data.phone || "Nie podano"}
Rodzaj projektu: ${projectLabel}
Budżet: ${budgetLabel}

Wiadomość:
${data.message}

----------------------------------------
DOWÓD ZGODY RODO:
- Zgoda na przetwarzanie danych: TAK
- Data i czas: ${submissionDate}
- Wersja polityki: ${siteConfig.policyVersion}
  `.trim();

  try {
    const { data: resData, error: resError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `[Zapytanie] ${data.name} – ${projectLabel}`,
      html: htmlContent,
      text: textContent,
    });

    if (resError) {
      console.error("Resend API error:", resError.message);
      return {
        success: false,
        error: "Błąd podczas doręczania wiadomości e-mail.",
      };
    }

    return {
      success: true,
      messageId: resData?.id,
      message: "Wiadomość została pomyślnie wysłana.",
    };
  } catch (err) {
    console.error("Nieoczekiwany błąd wysyłki e-mail:", err instanceof Error ? err.message : err);
    return {
      success: false,
      error: "Błąd serwera pocztowego.",
    };
  }
}
