import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { FormEvent, useState } from 'react';
import { api } from '../api';
import { FormStatus } from '../components/FormStatus';

const contactItems = [
  { Icon: MapPin, label: 'Office', value: 'Railway Station Road, Marthandam' },
  { Icon: Phone, label: 'Phone', value: '9443370985', href: 'tel:+919443370985' },
  { Icon: Mail, label: 'Email', value: 'jay_khar@yahoo.com', href: 'mailto:jay_khar@yahoo.com' },
];

function Field({ label, children, span = false }: { label: string; children: ReactNode; span?: boolean }) {
  return (
    <label className={span ? 'sm:col-span-2' : ''}>
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      {children}
    </label>
  );
}

export function ContactPage() {
  const [status, setStatus] = useState<{ message?: string; error?: string }>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({});
    const formElement = event.currentTarget;
    const form = Object.fromEntries(new FormData(formElement));
    try {
      await api.contact(form);
      formElement.reset();
      setStatus({ message: 'Your message has been sent. Our team will contact you soon.' });
    } catch (error) {
      setStatus({ error: error instanceof Error ? error.message : 'Unable to send message.' });
    }
  }

  return (
    <>
      <section className="bg-cement">
        <div className="section">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold text-ink">Start your construction conversation.</h1>
        </div>
      </section>
      <section className="section grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          {contactItems.map(({ Icon, label, value, href }) => (
            <div className="flex gap-4 rounded border border-stone-200 bg-white p-5" key={label}>
              <Icon className="text-brass" size={24} />
              <div>
                <p className="text-sm font-bold text-steel">{label}</p>
                {href ? (
                  <a className="mt-1 block break-all font-semibold text-ink transition hover:text-brass" href={href}>
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 font-semibold">{value}</p>
                )}
              </div>
            </div>
          ))}
          <iframe className="h-72 w-full rounded border-0" title="Jay-Khar office map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.0019363763176!2d77.22071974055389!3d8.302604497924813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04557bc5517fc3%3A0x285433fcbdd78835!2sJay-khar%20Construction%20Private%20Limited!5e0!3m2!1sen!2sin!4v1588430586621!5m2!1sen!2sin" loading="lazy" />
        </div>
        <form onSubmit={submit} className="overflow-hidden rounded border border-stone-200 bg-white shadow-lift">
          <div className="border-b border-stone-200 bg-ink px-6 py-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brass">Project enquiry</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">Tell us what you want to build.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">Share the basics and our team will get back with the right next step.</p>
          </div>
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <Field label="Your name">
              <input className="input" name="name" placeholder="Example: Arun Kumar" required />
            </Field>
            <Field label="Email address">
              <input className="input" name="email" type="email" placeholder="name@example.com" required />
            </Field>
            <Field label="Phone number">
              <input className="input" name="phone" placeholder="Mobile number" />
            </Field>
            <Field label="Project type">
              <select className="input" name="project_type" defaultValue="">
                <option value="" disabled>Select type</option>
                <option>Residential construction</option>
                <option>Commercial construction</option>
                <option>Renovation or extension</option>
                <option>Design and planning</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Subject">
              <input className="input" name="subject" placeholder="Short project title" required />
            </Field>
            <Field label="Approximate budget">
              <select className="input" name="budget" defaultValue="">
                <option value="">Not decided yet</option>
                <option>Below Rs. 10 lakhs</option>
                <option>Rs. 10 lakhs - Rs. 25 lakhs</option>
                <option>Rs. 25 lakhs - Rs. 50 lakhs</option>
                <option>Above Rs. 50 lakhs</option>
              </select>
            </Field>
            <Field label="Project details" span>
              <textarea className="input" name="message" rows={7} placeholder="Location, plot size, expected timeline, and anything important for us to know." required />
            </Field>
          </div>
          <div className="border-t border-stone-200 bg-cement/60 p-6">
            <FormStatus {...status} />
            <button className="btn-primary mt-4 w-full sm:w-auto" type="submit">
              Send Enquiry <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
