import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { ProjectCard } from '../components/ProjectCard';
import type { Project } from '../types';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    api.projects().then(setProjects).catch(() => setProjects([]));
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const filtered = category === 'All' ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <section className="bg-cement">
        <div className="section">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold text-ink">A gallery of planned, supervised, and completed spaces.</h1>
        </div>
      </section>
      <section className="section">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button className={`rounded border px-4 py-2 text-sm font-bold ${category === item ? 'border-ink bg-ink text-white' : 'border-stone-200 bg-white text-ink'}`} key={item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>
    </>
  );
}
