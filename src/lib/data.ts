import { connectToDatabase } from './db';
import { seedDatabase } from './seed';
import SiteContent from '@/models/SiteContent';
import SiteSettings from '@/models/SiteSettings';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import Education from '@/models/Education';
import Achievement from '@/models/Achievement';
import Hackathon from '@/models/Hackathon';
import Certification from '@/models/Certification';
import SocialLink from '@/models/SocialLink';
import NavigationItem from '@/models/NavigationItem';
import {
  ISiteSettings,
  IProject,
  IExperience,
  ISkill,
  IEducation,
  IAchievement,
  IHackathon,
  ICertification,
  ISocialLink,
  INavigationItem,
} from '@/types';

// Ensures DB connection & initial seeding if any defaults are missing
async function ensureDbInit() {
  await connectToDatabase();
  await seedDatabase();
}

export async function getPublicPortfolioData() {
  await ensureDbInit();

  const [
    contentsDocs,
    settingsDoc,
    projectsDocs,
    expDocs,
    skillsDocs,
    eduDocs,
    achDocs,
    hackDocs,
    certDocs,
    socialDocs,
    navDocs,
  ] = await Promise.all([
    SiteContent.find().lean(),
    SiteSettings.findOne().lean(),
    Project.find({ published: true }).sort({ displayOrder: 1, createdAt: -1 }).lean(),
    Experience.find({ published: true }).sort({ displayOrder: 1, createdAt: -1 }).lean(),
    Skill.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
    Education.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
    Achievement.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
    Hackathon.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
    Certification.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
    SocialLink.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
    NavigationItem.find({ visible: true }).sort({ displayOrder: 1 }).lean(),
  ]);

  // Convert array of site contents to a key-value dictionary map
  const contentMap: Record<string, string> = {};
  contentsDocs.forEach((c: any) => {
    contentMap[c.key] = c.value;
  });

  return {
    content: contentMap,
    settings: JSON.parse(JSON.stringify(settingsDoc || {})) as ISiteSettings,
    projects: JSON.parse(JSON.stringify(projectsDocs)) as IProject[],
    experiences: JSON.parse(JSON.stringify(expDocs)) as IExperience[],
    skills: JSON.parse(JSON.stringify(skillsDocs)) as ISkill[],
    education: JSON.parse(JSON.stringify(eduDocs)) as IEducation[],
    achievements: JSON.parse(JSON.stringify(achDocs)) as IAchievement[],
    hackathons: JSON.parse(JSON.stringify(hackDocs)) as IHackathon[],
    certifications: JSON.parse(JSON.stringify(certDocs)) as ICertification[],
    socialLinks: JSON.parse(JSON.stringify(socialDocs)) as ISocialLink[],
    navigationItems: JSON.parse(JSON.stringify(navDocs)) as INavigationItem[],
  };
}

export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  await ensureDbInit();
  const project = await Project.findOne({ slug, published: true }).lean();
  if (!project) return null;
  return JSON.parse(JSON.stringify(project)) as IProject;
}

export async function getAllPublishedProjectSlugs(): Promise<string[]> {
  await ensureDbInit();
  const projects = await Project.find({ published: true }, { slug: 1 }).lean();
  return projects.map((p: any) => p.slug);
}
