import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Residence at Marthandam',
    slug: 'modern-residence-marthandam',
    category: 'Residential',
    location: 'Marthandam',
    project_year: 2025,
    short_description: 'A contemporary family residence planned for comfort, ventilation, and long-term value.',
    description:
      'A complete residential construction project shaped around the client family lifestyle, with careful attention to space planning, structure, natural light, and finish quality.',
    featured: true,
    status: 'published',
    images: [
      {
        id: 1,
        image_path: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Modern residence',
        sort_order: 0,
      },
    ],
  },
  {
    id: 2,
    title: 'Community Auditorium',
    slug: 'community-auditorium',
    category: 'Commercial',
    location: 'Kanyakumari District',
    project_year: 2024,
    short_description: 'A durable public-use structure designed for gatherings and community events.',
    description:
      'This project focuses on practical circulation, robust structural planning, and a clean architectural expression suitable for high-usage community functions.',
    featured: true,
    status: 'published',
    images: [
      {
        id: 2,
        image_path: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Commercial building',
        sort_order: 0,
      },
    ],
  },
  {
    id: 3,
    title: 'Church Renovation and Extension',
    slug: 'church-renovation-extension',
    category: 'Institutional',
    location: 'Tamil Nadu',
    project_year: 2023,
    short_description: 'Renovation and extension work combining existing character with stronger facilities.',
    description:
      'The scope included planning, supervision, and execution support to improve usability while respecting the identity of the existing structure.',
    featured: false,
    status: 'published',
    images: [
      {
        id: 3,
        image_path: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Institutional project',
        sort_order: 0,
      },
    ],
  },
];

export function getProjects() {
  return projects.filter((project) => project.status !== 'draft');
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug || String(project.id) === slug) ?? null;
}
