import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/lib/types';

export function ArchiveProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="rounded border border-dashed border-borderdark bg-graphite p-6">
        <p className="text-sm font-semibold leading-6 text-steel">
          Archive space is ready. Add older project images under <span className="font-bold text-ivory">public/Archives</span> and list them in the archive project data when needed.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
