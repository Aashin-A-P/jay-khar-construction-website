import { NextResponse } from 'next/server';
import { notify } from '@/lib/mailer';
import { requireFields, validateEmail } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, unknown>;
    const missing = requireFields(data, ['name', 'email', 'subject', 'message']);

    if (missing) {
      return NextResponse.json({ message: missing }, { status: 422 });
    }

    if (!validateEmail(data.email)) {
      return NextResponse.json({ message: 'A valid email address is required.' }, { status: 422 });
    }

    await notify(
      'New Contact Enquiry',
      {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        'Project Type': data.project_type,
        'Approximate Budget': data.budget,
        Subject: data.subject,
        Message: data.message,
      },
      'A visitor submitted a new project enquiry through the website contact form.',
    );

    return NextResponse.json({ message: 'Message received.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unable to send message.' }, { status: 500 });
  }
}
