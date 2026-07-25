import { z } from 'zod';

export const AdminLoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const ContactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().max(150, 'Subject is too long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000, 'Message is too long'),
  honeypot: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export const ProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().default('Web App'),
  shortDescription: z.string().default(''),
  fullDescription: z.string().default(''),
  problem: z.string().optional().default(''),
  solution: z.string().optional().default(''),
  role: z.string().optional().default('Full Stack Developer'),
  features: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  challenges: z.string().optional().default(''),
  outcome: z.string().optional().default(''),
  technicalDecisions: z.string().optional().default(''),
  coverImage: z
    .union([
      z.string(),
      z.object({
        url: z.string().optional().default(''),
        publicId: z.string().optional().default(''),
        altText: z.string().optional().default(''),
      }),
    ])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') return { url: val, publicId: '', altText: '' };
      if (val && typeof val === 'object') return { url: val.url || '', publicId: val.publicId || '', altText: val.altText || '' };
      return { url: '', publicId: '', altText: '' };
    }),
  githubUrl: z.string().or(z.literal('')).optional().default(''),
  liveUrl: z.string().or(z.literal('')).optional().default(''),
  startDate: z.string().optional().default(''),
  endDate: z.string().optional().default(''),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  displayOrder: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) || 0 : val))
    .default(0),
});

export const ExperienceSchema = z.object({
  organization: z.string().min(2, 'Organization is required'),
  role: z.string().min(2, 'Role is required'),
  location: z.string().optional(),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().optional(),
  startMonth: z.string().optional(),
  startYear: z.string().optional(),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
  isCurrent: z.boolean().default(false),
  description: z.array(z.string()).min(1, 'At least one responsibility or achievement bullet is required'),
  technologies: z.array(z.string()).default([]),
  websiteUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  certificate: z.object({
    url: z.string(),
    publicId: z.string().optional(),
    name: z.string().optional(),
  }).optional(),
  published: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.string().optional(),
  icon: z.string().optional(),
  visible: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const EducationSchema = z.object({
  institution: z.string().min(2, 'Institution is required'),
  degree: z.string().min(2, 'Degree is required'),
  field: z.string().min(2, 'Field of study is required'),
  startYear: z.string().min(2, 'Start year is required'),
  endYear: z.string().optional(),
  isCurrent: z.boolean().default(false),
  grade: z.string().optional(),
  description: z.string().optional(),
  courses: z.array(z.string()).default([]),
  displayOrder: z.number().default(0),
  visible: z.boolean().default(true),
});

export const AchievementSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  organization: z.string().min(2, 'Organization is required'),
  event: z.string().optional(),
  position: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  certificateUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  imageUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  certificate: z.object({
    url: z.string(),
    publicId: z.string().optional(),
    name: z.string().optional(),
  }).optional(),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const HackathonSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  event: z.string().min(2, 'Event name is required'),
  organization: z.string().optional(),
  date: z.string().optional(),
  result: z.string().optional(),
  teamName: z.string().optional(),
  projectName: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  certificateUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  imageUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  externalUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const CertificationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  issuer: z.string().min(2, 'Issuer is required'),
  issueDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  description: z.string().optional(),
  visible: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const SocialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Invalid URL'),
  icon: z.string().optional(),
  visible: z.boolean().default(true),
  displayOrder: z.number().default(0),
});
