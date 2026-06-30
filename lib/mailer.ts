import nodemailer from 'nodemailer';

type FieldMap = Record<string, unknown>;
type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

function stringValue(value: unknown) {
  const text = String(value ?? '').trim();
  return text === '' ? 'Not provided' : text;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function htmlMessage(subject: string, intro: string, fields: FieldMap) {
  const rows = Object.entries(fields)
    .map(([label, value]) => {
      const safeValue = escapeHtml(stringValue(value)).replaceAll('\n', '<br />');
      return `<tr><td style="padding:12px 16px;border-bottom:1px solid #e7e2d8;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;width:34%;">${escapeHtml(label)}</td><td style="padding:12px 16px;border-bottom:1px solid #e7e2d8;color:#17202a;font-size:15px;line-height:1.6;">${safeValue}</td></tr>`;
    })
    .join('');

  return `<!doctype html><html><body style="margin:0;background:#f4f1eb;font-family:Arial,Helvetica,sans-serif;color:#17202a;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:28px 12px;"><tr><td align="center"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid #e7e2d8;border-radius:10px;overflow:hidden;"><tr><td style="background:#17202a;padding:28px 32px;color:#ffffff;"><div style="color:#b8833a;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.16em;">Jay-Khar Construction</div><h1 style="margin:10px 0 0;font-size:26px;line-height:1.25;">${escapeHtml(subject)}</h1></td></tr><tr><td style="padding:26px 32px 10px;"><p style="margin:0;color:#53616f;font-size:16px;line-height:1.7;">${escapeHtml(intro)}</p></td></tr><tr><td style="padding:14px 32px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e2d8;border-radius:8px;border-collapse:separate;border-spacing:0;overflow:hidden;">${rows}</table></td></tr><tr><td style="background:#fbfaf7;padding:18px 32px;color:#6b7280;font-size:12px;line-height:1.6;">This email was sent from the Jay-Khar Construction website enquiry form.</td></tr></table></td></tr></table></body></html>`;
}

function textMessage(intro: string, fields: FieldMap) {
  return [intro, '', ...Object.entries(fields).map(([label, value]) => `${label}: ${stringValue(value)}`)].join('\n');
}

export async function notify(subject: string, fields: FieldMap, intro: string, attachments: MailAttachment[] = []) {
  if (process.env.MAIL_ENABLED !== 'true') {
    return;
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USERNAME;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM;

  if (!host || !user || !pass || !to || !from) {
    throw new Error('SMTP is not fully configured.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'ssl',
    auth: { user, pass },
    connectionTimeout: Number(process.env.SMTP_TIMEOUT ?? 20) * 1000,
  });

  await transporter.sendMail({
    to,
    from: `Jay-Khar Website <${from}>`,
    subject,
    text: textMessage(intro, fields),
    html: htmlMessage(subject, intro, fields),
    attachments,
  });
}
