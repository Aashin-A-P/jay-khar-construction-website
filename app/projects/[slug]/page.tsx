import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProjectGallery } from '@/components/ProjectGallery';
import { getProject, getProjects } from '@/lib/projects';

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="section">
      <Link className="text-sm font-bold text-brass" href="/projects">
        Back to projects
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <ProjectGallery project={project} />
        <div>
          <p className="eyebrow">{project.category}</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold text-ivory">{project.title}</h1>
          <p className="mt-5 text-lg leading-8 text-steel">{project.description}</p>
          <dl className="mt-8 grid gap-4 rounded border border-borderdark bg-graphite p-6 text-ivory">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-steel">Location</dt>
              <dd className="mt-1 font-semibold">{project.location || 'Available on request'}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-steel">Year</dt>
              <dd className="mt-1 font-semibold">{project.project_year || 'Recent'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
