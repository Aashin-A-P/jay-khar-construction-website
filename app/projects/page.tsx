import { ArchiveProjects } from '@/components/ArchiveProjects';
import { ProjectsFilter } from '@/components/ProjectsFilter';
import { getArchivedProjects, getProjects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-graphite">
        <div className="section">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-extrabold text-ivory">Explore our project portfolio.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-steel">
            A growing collection of our residential, commercial, church, interior, elevation, and archive works shaped through practical planning, design clarity, and site-focused execution.
          </p>
        </div>
      </section>
      <section className="section">
        <ProjectsFilter projects={getProjects()} />
      </section>
      <section className="section pt-0">
        <div className="mb-8">
          <p className="eyebrow">Archive</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ivory">Earlier project records.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-steel">A separate place for older work, first projects, and reference images that should stay apart from the main elevation groups.</p>
        </div>
        <ArchiveProjects projects={getArchivedProjects()} />
      </section>
    </>
  );
}
