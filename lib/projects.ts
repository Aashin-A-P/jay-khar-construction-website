import type { Project, ProjectImage } from './types';

function images(paths: string[], baseAlt: string, startId: number): ProjectImage[] {
  return paths.map((image_path, index) => ({
    id: startId + index,
    image_path,
    alt_text: `${baseAlt} ${index + 1}`,
    sort_order: index,
  }));
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Residential Elevations',
    slug: 'residential-elevations',
    category: 'Residential',
    location: 'South India',
    project_year: 2025,
    short_description: 'A curated gallery of independent home, duplex, and family residence elevation concepts.',
    description:
      'Residential elevation concepts prepared for a range of client briefs, including modern homes, traditional residences, compact frontage studies, duplex-style layouts, balconies, verandahs, parking, and facade variations suited to different site conditions.',
    featured: true,
    status: 'published',
    images: images(
      [
        '/Elevations/Residential/LalView.jpg',
        '/Elevations/Residential/PastorSathiya.jpg',
        '/Elevations/Residential/FinalLuise.jpg',
        '/Elevations/Residential/Friend.jpg',
        '/Elevations/Residential/View-05 (1).jpg',
        '/Elevations/Residential/IMG-20200318-WA0002.jpg',
        '/Elevations/Residential/IMG-20200505-WA0003.jpg',
        '/Elevations/Residential/IMG-20200625-WA0007.jpg',
        '/Elevations/Residential/WhatsApp Image 2020-11-01 at 10.26.26 PM.jpeg',
        '/Elevations/Residential/Perum.jpg',
        '/Elevations/Residential/RessulRaj1.jpg',
        '/Elevations/Residential/ravi1.jpg',
        '/Elevations/Residential/VijayaTutorialElevation.jpg',
        '/Elevations/Residential/VillukuriChiefErNew.jpg',
        '/Elevations/Residential/ShinolaRani.jpg',
        '/Elevations/Residential/Padmakumar.jpg',
        '/Elevations/Residential/WhatsApp Image 2020-10-19 at 7.04.16 AM.jpeg',
        '/Elevations/Residential/1.jpg',
        '/Elevations/Residential/2.jpg',
        '/Elevations/Residential/Alanvilai chandran1.jpg',
        '/Elevations/Residential/anjugramam.jpg',
      ],
      'Residential elevation',
      100,
    ),
  },
  {
    id: 2,
    title: 'Commercial Elevations',
    slug: 'commercial-elevations',
    category: 'Commercial',
    location: 'Kanyakumari District',
    project_year: 2024,
    short_description: 'Office and commercial frontage concepts designed for visibility, circulation, and daily use.',
    description:
      'Commercial and office elevation concepts with practical facade treatment, stronger street presence, and planning suited for repeated everyday use. The gallery includes office-style buildings and multi-level frontage studies.',
    featured: true,
    status: 'published',
    images: images(
      [
        '/Elevations/Commercial/AuditorOffice.jpeg',
        '/Elevations/Commercial/BishopsOffice.jpg',
        '/Elevations/Commercial/Vettuvenni (1).jpg',
        '/Elevations/Commercial/Vettuvenni (2).jpg',
        '/Elevations/Commercial/View.jpg',
        '/Elevations/Commercial/newBishops - Copy.jpg',
        '/Elevations/Commercial/model7.jpg',
      ],
      'Commercial elevation',
      200,
    ),
  },
  {
    id: 3,
    title: 'Church Elevations',
    slug: 'church-elevations',
    category: 'Churches',
    location: 'Tamil Nadu',
    project_year: 2023,
    short_description: 'Church and worship-space elevation concepts with towers, landmark entries, and strong identity.',
    description:
      'Church elevation work exploring tower proportions, central entry treatment, nave frontage, ornamentation, and landmark identity while keeping construction practicality in view.',
    featured: true,
    status: 'published',
    images: images(
      [
        '/Elevations/Churches/KarankadChurch.jpg',
        '/Elevations/Churches/NalloorChruch.jpg',
        '/Elevations/Churches/SalvationArmyValliyur.jpg',
        '/Elevations/Churches/Aanaikulam Church.jpg',
        '/Elevations/Churches/MankuzhiChruch.jpg',
        '/Elevations/Churches/Perunthalaikadu.jpg',
        '/Elevations/Churches/Church2.jpg',
        '/Elevations/Churches/1.jpg',
        '/Elevations/Churches/9.jpg',
        '/Elevations/Churches/33 copy.jpg',
        '/Elevations/Churches/Mar.jpg',
      ],
      'Church elevation',
      300,
    ),
  },
];

export function getProjects() {
  return projects.filter((project) => project.status !== 'draft' && !project.archive);
}

export function getArchivedProjects() {
  return projects.filter((project) => project.status !== 'draft' && project.archive);
}

export function getProject(slug: string) {
  return projects.filter((project) => project.status !== 'draft').find((project) => project.slug === slug || String(project.id) === slug) ?? null;
}
