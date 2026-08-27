export interface Concert {
  date: string;
  venue: string;
  location: string;
  time: string;
  ticketed: boolean;
  label?: string;
  tickets?: string;
}

export interface BandMember {
  name: string;
  role: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type SectionKey = 'home' | 'shows' | 'about' | 'contact';
