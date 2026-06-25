import { Award, Clock, ShieldCheck, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const values: Array<[string, LucideIcon, string]> = [
  ['Quality First', ShieldCheck, 'Materials, structure, and finishes are reviewed with care.'],
  ['Experienced Team', Users, 'Engineers, supervisors, and skilled labour work in sync.'],
  ['Timely Delivery', Clock, 'Projects are planned with practical schedules and progress tracking.'],
  ['Trusted Results', Award, 'Every project is treated as a long-term relationship.'],
];

export function AboutPage() {
  return (
    <>
      <section className="bg-cement">
        <div className="section grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">About Us</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold text-ink">Professional construction with personal attention.</h1>
          </div>
          <div className="space-y-5 text-lg leading-8 text-steel">
            <p>Jay-Khar Construction Pvt. Ltd. is a residential and commercial builder serving clients across South India. The company combines practical engineering, modern architectural thinking, and disciplined execution to deliver spaces that feel personal and perform reliably.</p>
            <p>Led by Er. J. S. Jayakhar Rose, B.E. Civil, M.Tech Structural, FIV, the team brings deep hands-on experience in construction planning, structural design, supervision, and project execution.</p>
          </div>
        </div>
      </section>
      <section className="section grid gap-6 md:grid-cols-4">
        {values.map(([title, Icon, copy]) => (
          <div className="rounded border border-stone-200 bg-white p-6" key={title}>
            <Icon className="text-brass" size={28} />
            <h2 className="mt-5 font-display text-xl font-extrabold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-steel">{copy}</p>
          </div>
        ))}
      </section>
      <section className="bg-ink text-white">
        <div className="section grid gap-10 lg:grid-cols-2">
          <img className="h-full min-h-[360px] rounded object-cover" src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80" alt="Construction planning" />
          <div className="self-center">
            <p className="eyebrow">How We Work</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold">Clear stages from concept to completion.</h2>
            <div className="mt-8 space-y-5 text-white/75">
              <p>We begin by understanding the client’s requirements, budget, and vision. The team then prepares plans, estimates, design options, and construction steps that make the project easier to follow.</p>
              <p>During execution, engineers supervise site progress, review materials, coordinate labour, and keep clients informed with regular updates until handover.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
