'use client';

import { useMemo, useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/lib/types';

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const filtered = category === 'All' ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            className={`rounded border px-4 py-2 text-sm font-bold ${category === item ? 'border-ink bg-ink text-white' : 'border-stone-200 bg-white text-ink'}`}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
