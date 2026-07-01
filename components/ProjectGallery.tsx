'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';

const fallback = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80';

export function ProjectGallery({ project }: { project: Project }) {
  const [active, setActive] = useState(project.images[0]?.image_path ?? null);
  const hero = active || fallback;

  return (
    <div>
      <img className="aspect-[4/3] w-full rounded border border-borderdark object-cover" src={hero} alt={project.title} />
      <div className="mt-4 grid grid-cols-4 gap-3">
        {project.images.map((image) => (
          <button key={image.id} onClick={() => setActive(image.image_path)} className="overflow-hidden rounded border border-borderdark transition hover:border-brass">
            <img className="aspect-square w-full object-cover" src={image.image_path} alt={image.alt_text || project.title} />
          </button>
        ))}
      </div>
    </div>
  );
}
