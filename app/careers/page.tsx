'use client';

import { ArrowRight, Upload } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import { FormStatus } from '@/components/FormStatus';

function Field({ label, children, span = false }: { label: string; children: ReactNode; span?: boolean }) {
  return (
    <label className={span ? 'sm:col-span-2' : ''}>
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      {children}
    </label>
  );
}

export default function CareersPage() {
  const [status, setStatus] = useState<{ message?: string; error?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({});
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: form,
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.message ?? 'Unable to submit application.');
      formElement.reset();
      setStatus({ message: 'Your application has been submitted.' });
    } catch (error) {
      setStatus({ error: error instanceof Error ? error.message : 'Unable to submit application.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-ink text-white">
        <div className="section">
          <p className="eyebrow">Careers</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-extrabold">Build your career with a hands-on construction team.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">Jay-Khar Construction welcomes fresh graduates and experienced professionals in construction, supervision, planning, and site execution.</p>
        </div>
      </section>
      <section className="section">
        <form onSubmit={submit} encType="multipart/form-data" className="mx-auto max-w-5xl overflow-hidden rounded border border-stone-200 bg-white shadow-lift">
          <div className="border-b border-stone-200 bg-cement px-6 py-6">
            <p className="eyebrow">Application form</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink">Share your work profile.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">Tell us your background, preferred area of work, and construction-site experience.</p>
          </div>
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <Field label="Full name">
              <input className="input" name="name" placeholder="Your full name" required />
            </Field>
            <Field label="Phone number">
              <input className="input" name="phone" placeholder="Mobile number" required />
            </Field>
            <Field label="Email address">
              <input className="input" name="email" type="email" placeholder="name@example.com" required />
            </Field>
            <Field label="Preferred area">
              <select className="input" name="preferred_area" defaultValue="">
                <option value="">Select area</option>
                <option>Site supervision</option>
                <option>Civil engineering</option>
                <option>Drafting and planning</option>
                <option>3D design/rendering</option>
                <option>Skilled labour</option>
                <option>Administration</option>
              </select>
            </Field>
            <Field label="Course completed">
              <input className="input" name="education" placeholder="Example: B.E Civil" />
            </Field>
            <Field label="Experience in years">
              <input className="input" name="experience_years" type="number" min="0" step="0.5" placeholder="0" />
            </Field>
            <Field label="Address" span>
              <textarea className="input" name="address" rows={4} placeholder="Current address" />
            </Field>
            <Field label="Experience details" span>
              <textarea className="input" name="message" rows={6} placeholder="Mention previous projects, site responsibilities, software skills, or availability." />
            </Field>
            <Field label="Resume" span>
              <div className="rounded border border-dashed border-stone-300 bg-stone-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <Upload className="mt-1 shrink-0 text-brass" size={22} />
                    <div>
                      <p className="font-bold text-ink">Attach your resume</p>
                      <p className="mt-1 text-sm leading-6 text-steel">Accepted formats: PDF, DOC, or DOCX. Maximum size: 5 MB.</p>
                    </div>
                  </div>
                  <input
                    className="block w-full text-sm text-steel file:mr-4 file:rounded file:border-0 file:bg-ink file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-white hover:file:bg-forest sm:max-w-sm"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                </div>
              </div>
            </Field>
          </div>
          <div className="border-t border-stone-200 bg-stone-50 p-6">
            <FormStatus {...status} />
            <button className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'} <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
