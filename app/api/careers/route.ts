import { NextResponse } from 'next/server';
import { notify } from '@/lib/mailer';
import { requireFields, validateEmail } from '@/lib/validation';

const maxResumeSize = 5 * 1024 * 1024;
const allowedResumeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function formDataToObject(formData: FormData) {
  const data: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (!(value instanceof File)) {
      data[key] = value;
    }
  });

  return data;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = formDataToObject(formData);
    const resume = formData.get('resume');
    const missing = requireFields(data, ['name', 'phone', 'email']);

    if (missing) {
      return NextResponse.json({ message: missing }, { status: 422 });
    }

    if (!validateEmail(data.email)) {
      return NextResponse.json({ message: 'A valid email address is required.' }, { status: 422 });
    }

    const attachments = [];
    let resumeLabel = 'Not provided';

    if (resume instanceof File && resume.size > 0) {
      if (resume.size > maxResumeSize) {
        return NextResponse.json({ message: 'Resume file must be 5 MB or smaller.' }, { status: 422 });
      }

      if (!allowedResumeTypes.has(resume.type)) {
        return NextResponse.json({ message: 'Resume must be a PDF, DOC, or DOCX file.' }, { status: 422 });
      }

      attachments.push({
        filename: resume.name,
        content: Buffer.from(await resume.arrayBuffer()),
        contentType: resume.type,
      });
      resumeLabel = resume.name;
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
        Resume: resumeLabel,
      },
      'A candidate submitted a new career application through the website careers form.',
      attachments,
    );

    return NextResponse.json({ message: 'Application received.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unable to submit application.' }, { status: 500 });
  }
}
