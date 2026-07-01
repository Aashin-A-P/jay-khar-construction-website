import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/types';

const fallback = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80';

export function ProjectCard({ project }: { project: Project }) {
  const image = project.images[0]?.image_path || fallback;

  return (
    <Link href={`/projects/${project.slug}`} className="group overflow-hidden rounded border border-borderdark bg-graphite shadow-sm transition hover:-translate-y-1 hover:border-brass/70 hover:shadow-lift">
      <div className="aspect-[4/3] overflow-hidden bg-ink">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={image} alt={project.title} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">{project.category}</p>
            <h3 className="mt-2 font-display text-xl font-extrabold text-ivory">{project.title}</h3>
          </div>
          <ArrowUpRight className="shrink-0 text-steel transition group-hover:text-brass" />
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-steel">{project.short_description || project.description}</p>
      </div>
    </Link>
  );
}
