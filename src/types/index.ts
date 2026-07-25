export interface IAdminUser {
  _id?: any;
  username: string;
  passwordHash: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISiteContent {
  _id?: any;
  key: string;
  group: string;
  value: string;
  updatedAt?: Date;
}

export interface IProfilePhoto {
  url: string;
  publicId: string;
  altText?: string;
}

export interface IResume {
  fileUrl: string;
  publicId?: string;
  label: string;
  updatedAt?: Date;
}

export interface ISectionVisibility {
  hero: boolean;
  about: boolean;
  projects: boolean;
  experience: boolean;
  skills: boolean;
  achievements: boolean;
  hackathons: boolean;
  education: boolean;
  contact: boolean;
  whatsapp: boolean;
}

export interface ISiteSettings {
  _id?: any;
  sectionVisibility: ISectionVisibility;
  whatsappNumber?: string;
  whatsappMessage?: string;
  currentlyBuilding?: string;
  currentlyBuildingUrl?: string;
  profilePhoto?: IProfilePhoto;
  resume?: IResume;
  seo?: {
    siteTitle: string;
    metaDescription: string;
    keywords?: string[];
    ogImage?: string;
  };
  updatedAt?: Date;
}

export interface IProject {
  _id?: any;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem?: string;
  solution?: string;
  role?: string;
  features?: string[];
  techStack: string[];
  challenges?: string;
  outcome?: string;
  technicalDecisions?: string;
  coverImage?: {
    url: string;
    publicId?: string;
    altText?: string;
  };
  gallery?: {
    url: string;
    publicId?: string;
    altText?: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  startDate?: string;
  endDate?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExperience {
  _id?: any;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  isCurrent: boolean;
  description: string[];
  technologies?: string[];
  logoUrl?: string;
  websiteUrl?: string;
  certificate?: {
    url: string;
    publicId?: string;
    name?: string;
  };
  published: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISkill {
  _id?: any;
  name: string;
  category: 'Frontend' | 'Backend' | 'Languages' | 'Data Analysis' | 'Tools & Soft Skills' | string;
  level?: 'Core' | 'Intermediate' | 'Familiar' | 'Learning' | string;
  icon?: string;
  visible: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEducation {
  _id?: any;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  isCurrent: boolean;
  grade?: string;
  description?: string;
  courses?: string[];
  displayOrder: number;
  visible: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAchievement {
  _id?: any;
  title: string;
  organization: string;
  event?: string;
  position?: string;
  date?: string;
  description?: string;
  certificateUrl?: string;
  imageUrl?: string;
  certificate?: {
    url: string;
    publicId?: string;
    name?: string;
  };
  featured: boolean;
  visible: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHackathon {
  _id?: any;
  title: string;
  event: string;
  organization?: string;
  date?: string;
  result?: string;
  teamName?: string;
  projectName?: string;
  description?: string;
  technologies?: string[];
  certificateUrl?: string;
  imageUrl?: string;
  externalUrl?: string;
  featured: boolean;
  visible: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICertification {
  _id?: any;
  name: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateMedia?: {
    url: string;
    publicId?: string;
  };
  description?: string;
  visible: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISocialLink {
  _id?: any;
  platform: string;
  label: string;
  url: string;
  icon?: string;
  visible: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INavigationItem {
  _id?: any;
  label: string;
  url: string;
  visible: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMedia {
  _id?: any;
  url: string;
  publicId: string;
  resourceType: string;
  width?: number;
  height?: number;
  altText?: string;
  createdAt?: Date;
}

export interface IContactMessage {
  _id?: any;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt?: Date;
}
