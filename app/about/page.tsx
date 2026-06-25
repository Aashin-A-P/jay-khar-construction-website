import { Award, Clock, ShieldCheck, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const values: Array<[string, LucideIcon, string]> = [
  ['Quality First', ShieldCheck, 'Materials, structure, and finishes are reviewed with care.'],
  ['Experienced Team', Users, 'Engineers, supervisors, and skilled labour work in sync.'],
  ['Timely Delivery', Clock, 'Projects are planned with practical schedules and progress tracking.'],
  ['Trusted Results', Award, 'Every project is treated as a long-term relationship.'],
];

const leaders = [
  {
    name: 'Er. J. S. Jayakhar Rose',
    role: 'Managing Director',
    qualification: 'B.E., M.Tech. (Struct), FIV',
    phone: '9443370985',
    phoneHref: 'tel:+919443370985',
    initials: 'JR',
  },
  {
    name: 'Er. P. Christy Jayakhar',
    role: 'Director',
    qualification: 'B.E., AMICE (Arch), M.Tech, M.B.A',
    phone: '7639844013',
    phoneHref: 'tel:+917639844013',
    initials: 'CJ',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-cement">
        <div className="section grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">About Us</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold text-ink">Professional construction with personal attention.</h1>
          </div>
          <div className="space-y-5 text-lg leading-8 text-steel">
            <p>
              Jay-Khar Construction Pvt. Ltd. is a residential and commercial builder serving clients across South India. The company combines practical engineering, modern architectural thinking,
              and disciplined execution to deliver spaces that feel personal and perform reliably.
            </p>
            <p>
              Led by Er. J. S. Jayakhar Rose and Er. P. Christy Jayakhar, the team brings deep hands-on experience in construction planning, architectural coordination, structural design, supervision,
              and project execution.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-ink">Meet the people behind Jay-Khar Construction.</h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr_0.9fr]">
          {leaders.map((leader, index) => (
            <article
              className={`rounded-[2rem] border border-stone-200 p-7 text-center shadow-sm ${index === 0 ? 'bg-cement' : 'bg-white'}`}
              key={leader.name}
            >
              <div className={`mx-auto grid aspect-square w-40 place-items-center rounded-[2rem] ${index === 0 ? 'bg-white' : 'bg-cement'}`}>
                <span className="font-display text-5xl font-extrabold text-brass">{leader.initials}</span>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brass">{leader.role}</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-ink">{leader.name}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-steel">{leader.qualification}</p>
              <a className="mt-5 inline-block font-bold text-ink transition hover:text-brass" href={leader.phoneHref}>
                Mob: {leader.phone}
              </a>
            </article>
          ))}
          <article className="rounded border border-stone-200 bg-ink p-7 text-white shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brass">Company Details</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">Jay-Khar Construction Pvt. Ltd.</h2>
            <p className="mt-4 leading-7 text-white/75">5/116, Railway Station Road, Marthandam, K.K. Dist - 629 165.</p>
            <div className="mt-5 space-y-2 text-sm font-semibold">
              <p>
                Email:{' '}
                <a className="text-brass transition hover:text-white" href="mailto:jay_khar@yahoo.com">
                  jay_khar@yahoo.com
                </a>
              </p>
              <p>
                Website:{' '}
                <a className="text-brass transition hover:text-white" href="https://www.jaykharconstruction.com">
                  www.jaykharconstruction.com
                </a>
              </p>
            </div>
          </article>
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
              <p>We begin by understanding the client's requirements, budget, and vision. The team then prepares plans, estimates, design options, and construction steps that make the project easier to follow.</p>
              <p>During execution, engineers supervise site progress, review materials, coordinate labour, and keep clients informed with regular updates until handover.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
