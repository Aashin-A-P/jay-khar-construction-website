import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/lib/types';

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
