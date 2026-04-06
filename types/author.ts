export type AuthorSocial = {
  twitter?: string;
  linkedin?: string;
  github?: string;
};

export type AuthorCredentials = {
  title?: string;
  company?: string;
  experience?: string;
  education?: string[];
  certifications?: string[];
  achievements?: string[];
};

export type Author = {
  id: string; // The slug/filename identifier
  name: string;
  avatar: string;
  bio: string;
  email?: string;
  website?: string;
  social?: AuthorSocial;
  credentials?: AuthorCredentials;
  expertise: string[];
  location?: string;
  joinDate?: string;
};
