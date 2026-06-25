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

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type CareerApplication = {
  id: number;
  name: string;
  phone: string;
  email: string;
  education?: string | null;
  experience_years?: number | null;
  address?: string | null;
  message?: string | null;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  created_at: string;
};
