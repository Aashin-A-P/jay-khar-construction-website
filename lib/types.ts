export type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  location?: string | null;
  project_year?: number | null;
  short_description?: string | null;
  description: string;
  featured: boolean;
  status?: 'draft' | 'published';
  images: ProjectImage[];
};

export type ProjectImage = {
  id: number;
  image_path: string;
  alt_text?: string | null;
  sort_order: number;
};
