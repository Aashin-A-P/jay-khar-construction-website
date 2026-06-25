import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import type { Project } from '../types';

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    api.project(slug).then((data) => {
      setProject(data);
      setActive(data.images[0]?.image_path ?? null);
    }).catch(() => setProject(null));
  }, [slug]);

  if (!project) return <section className="section"><p>Project not found.</p></section>;
  const hero = active || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80';

  return (
    <section className="section">
      <Link className="text-sm font-bold text-brass" to="/projects">Back to projects</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <img className="aspect-[4/3] w-full rounded object-cover" src={hero} alt={project.title} />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {project.images.map((image) => (
              <button key={image.id} onClick={() => setActive(image.image_path)} className="overflow-hidden rounded border border-stone-200">
                <img className="aspect-square w-full object-cover" src={image.image_path} alt={image.alt_text || project.title} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">{project.category}</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold text-ink">{project.title}</h1>
          <p className="mt-5 text-lg leading-8 text-steel">{project.description}</p>
          <dl className="mt-8 grid gap-4 rounded border border-stone-200 bg-white p-6">
            <div><dt className="text-xs font-bold uppercase tracking-[0.16em] text-steel">Location</dt><dd className="mt-1 font-semibold">{project.location || 'Available on request'}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-[0.16em] text-steel">Year</dt><dd className="mt-1 font-semibold">{project.project_year || 'Recent'}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
