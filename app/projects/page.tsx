import { ProjectsFilter } from '@/components/ProjectsFilter';
import { getProjects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-cement">
        <div className="section">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-extrabold text-ink">Elevation concepts and completed design studies from Jay-Khar Construction.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-steel">
            Browse residential, commercial, and institutional elevation work prepared for clients across South India.
          </p>
        </div>
      </section>
      <section className="section">
        <ProjectsFilter projects={getProjects()} />
      </section>
    </>
  );
}
