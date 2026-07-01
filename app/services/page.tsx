import { Building, DraftingCompass, Eye, Home, Paintbrush, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const services: Array<[string, LucideIcon, string]> = [
  ['Residential Construction', Home, 'Independent houses and family residences designed around comfort, budget, and lasting structural quality.'],
  ['Commercial Construction', Building, 'Functional commercial and institutional spaces with practical circulation, durability, and clean finishes.'],
  ['Architectural Planning', DraftingCompass, 'House plans, space planning, design coordination, and execution-ready documentation.'],
  ['3D Design and Rendering', Eye, 'Exterior and interior visualizations that help clients understand the design before construction begins.'],
  ['Interior and Exterior Design', Paintbrush, 'Coordinated finishes, elevations, layouts, and material direction for a complete result.'],
  ['Project Supervision', Shield, 'Site supervision, quality checks, progress coordination, and professional construction management.'],
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-graphite text-ivory">
        <div className="section">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-extrabold">Construction services for dream homes and dependable buildings.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">From design support to complete construction, Jay-Khar Construction helps clients move from idea to handover with confidence.</p>
        </div>
      </section>
      <section className="section grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(([title, Icon, copy]) => (
          <article className="rounded border border-borderdark bg-graphite p-7 shadow-sm" key={title}>
            <Icon className="text-brass" size={32} />
            <h2 className="mt-5 font-display text-2xl font-extrabold text-ivory">{title}</h2>
            <p className="mt-4 leading-7 text-steel">{copy}</p>
          </article>
        ))}
      </section>
    </>
  );
}
