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
    title: 'Modern Residential Elevations',
    slug: 'modern-residential-elevations',
    category: 'Residential',
    location: 'South India',
    project_year: 2025,
    short_description: 'Contemporary home elevations with clean massing, balconies, parking, and practical family-focused layouts.',
    description:
      'A curated set of modern residential elevation concepts prepared for independent homes. The designs focus on balanced frontage, usable balconies, shaded openings, car parking, and a contemporary exterior language that can be adapted to different plot sizes.',
    featured: true,
    status: 'published',
    images: images(
      [
        '/Elevations/LalView.jpg',
        '/Elevations/PastorSathiya.jpg',
        '/Elevations/FinalLuise.jpg',
        '/Elevations/Friend.jpg',
        '/Elevations/View-05 (1).jpg',
        '/Elevations/IMG-20200318-WA0002.jpg',
        '/Elevations/IMG-20200505-WA0003.jpg',
        '/Elevations/IMG-20200625-WA0007.jpg',
        '/Elevations/WhatsApp Image 2020-11-01 at 10.26.26 PM.jpeg',
      ],
      'Modern residential elevation',
      100,
    ),
  },
  {
    id: 2,
    title: 'Traditional and Spacious Homes',
    slug: 'traditional-spacious-homes',
    category: 'Residential',
    location: 'Tamil Nadu',
    project_year: 2024,
    short_description: 'Larger residences with classic rooflines, verandahs, strong entry features, and warm exterior detailing.',
    description:
      'Residential elevation studies for clients looking for a more traditional or expansive home expression. These concepts combine prominent entries, sloped roof forms, terraces, verandahs, and layered facade details suited to family residences.',
    featured: true,
    status: 'published',
    images: images(
      [
        '/Elevations/Perum.jpg',
        '/Elevations/RessulRaj1.jpg',
        '/Elevations/ravi1.jpg',
        '/Elevations/VijayaTutorialElevation.jpg',
        '/Elevations/VillukuriChiefErNew.jpg',
        '/Elevations/ShinolaRani.jpg',
        '/Elevations/Padmakumar.jpg',
        '/Elevations/WhatsApp Image 2020-10-19 at 7.04.16 AM.jpeg',
      ],
      'Traditional residential elevation',
      200,
    ),
  },
  {
    id: 3,
    title: 'Commercial and Office Elevations',
    slug: 'commercial-office-elevations',
    category: 'Commercial',
    location: 'Kanyakumari District',
    project_year: 2024,
    short_description: 'Office and commercial frontage concepts designed for visibility, circulation, and everyday utility.',
    description:
      'Commercial and office elevation concepts with practical facade treatment, stronger street presence, and planning suited for repeated daily use. The gallery includes office-style buildings and multi-level frontage studies.',
    featured: true,
    status: 'published',
    images: images(
      [
        '/Elevations/AuditorOffice.jpeg',
        '/Elevations/BishopsOffice.jpg',
        '/Elevations/Vettuvenni (1).jpg',
        '/Elevations/Vettuvenni (2).jpg',
        '/Elevations/View.jpg',
        '/Elevations/newBishops - Copy.jpg',
        '/Elevations/model7.jpg',
      ],
      'Commercial office elevation',
      300,
    ),
  },
  {
    id: 4,
    title: 'Church Elevation Concepts',
    slug: 'church-elevation-concepts',
    category: 'Institutional',
    location: 'Tamil Nadu',
    project_year: 2023,
    short_description: 'Church elevations and worship-space concepts with towers, central entries, and landmark facade forms.',
    description:
      'Institutional elevation work for churches and worship spaces. These concepts explore tower proportions, central entry treatment, nave frontage, ornamentation, and landmark identity while keeping construction practicality in view.',
    featured: false,
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
      'Church elevation concept',
      400,
    ),
  },
  {
    id: 5,
    title: 'Client Elevation Studies',
    slug: 'client-elevation-studies',
    category: 'Residential',
    location: 'South India',
    project_year: 2023,
    short_description: 'Additional client-specific elevation options covering compact homes, duplexes, and facade studies.',
    description:
      'A collection of client-specific elevation studies prepared for different site conditions and design preferences. The gallery shows compact frontage options, duplex-style studies, and facade variations across multiple residential briefs.',
    featured: false,
    status: 'published',
    images: images(
      [
        '/Elevations/1.jpg',
        '/Elevations/2.jpg',
        '/Elevations/Alanvilai chandran1.jpg',
        '/Elevations/anjugramam.jpg',
      ],
      'Client elevation study',
      500,
    ),
  },
];

export function getProjects() {
  return projects.filter((project) => project.status !== 'draft');
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug || String(project.id) === slug) ?? null;
}
