import { ProjectsFilter } from '@/components/ProjectsFilter';
import { getProjects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-cement">
        <div className="section">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold text-ink">A gallery of planned, supervised, and completed spaces.</h1>
        </div>
      </section>
      <section className="section">
        <ProjectsFilter projects={getProjects()} />
      </section>
    </>
  );
}
