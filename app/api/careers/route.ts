import { NextResponse } from 'next/server';
import { notify } from '@/lib/mailer';
import { requireFields, validateEmail } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, unknown>;
    const missing = requireFields(data, ['name', 'phone', 'email']);

    if (missing) {
      return NextResponse.json({ message: missing }, { status: 422 });
    }

    if (!validateEmail(data.email)) {
      return NextResponse.json({ message: 'A valid email address is required.' }, { status: 422 });
    }

    await notify(
      'New Career Application',
      {
        Name: data.name,
        Phone: data.phone,
        Email: data.email,
        'Preferred Area': data.preferred_area,
        Education: data.education,
        Experience: data.experience_years,
        Address: data.address,
        Message: data.message,
      },
      'A candidate submitted a new career application through the website careers form.',
    );

    return NextResponse.json({ message: 'Application received.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unable to submit application.' }, { status: 500 });
  }
}
