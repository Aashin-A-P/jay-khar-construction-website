import { ArrowRight, CheckCircle2, Hammer, HardHat, Home, Ruler } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects';

const services: Array<[string, LucideIcon, string]> = [
  ['Residential Construction', Home, 'Custom homes planned around lifestyle, budget, structure, and long-term comfort.'],
  ['Commercial Projects', HardHat, 'Practical, durable spaces for offices, institutions, and community facilities.'],
  ['Architectural Planning', Ruler, 'Plans, 3D views, space planning, and execution-ready documentation.'],
  ['Project Supervision', Hammer, 'Engineer-led progress tracking, material quality checks, and disciplined site coordination.'],
];

export default function HomePage() {
  const projects = getProjects()
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover opacity-40" src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=80" alt="Construction site" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        </div>
        <div className="section relative grid min-h-[680px] items-center pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <p className="eyebrow">Builders with professional touch</p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">Thoughtfully built homes and spaces across South India.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Jay-Khar Construction Pvt. Ltd. brings architectural planning, engineering supervision, and dependable execution together for residential, commercial, and institutional projects.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link className="btn-primary" href="/contact">
                Start a Project <ArrowRight size={18} />
              </Link>
              <Link className="btn-secondary border-ivory/25 bg-ivory/10 text-ivory hover:border-brass hover:bg-brass hover:text-ink" href="/projects">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Why Jay-Khar</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-ivory">A construction partner built around clarity, quality, and accountability.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {['Personalized planning for every client', 'Experienced civil and structural leadership', 'Transparent progress updates', 'No compromise on material and finish quality'].map((item) => (
            <div className="flex gap-3 rounded border border-borderdark bg-graphite p-5" key={item}>
              <CheckCircle2 className="mt-0.5 shrink-0 text-brass" size={20} />
              <p className="font-semibold text-ivory">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest">
        <div className="section">
          <p className="eyebrow">Services</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-display text-4xl font-extrabold text-ivory">From first sketch to final handover.</h2>
            <Link className="btn-secondary" href="/services">
              Explore Services
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, Icon, copy]) => (
              <div className="rounded border border-borderdark bg-ink/80 p-6" key={title}>
                <Icon className="text-brass" size={28} />
                <h3 className="mt-5 font-display text-xl font-extrabold text-ivory">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Featured Work</p>
        <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-extrabold text-ivory">Projects shaped with care.</h2>
          <Link className="btn-primary" href="/projects">
            View All Projects
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
