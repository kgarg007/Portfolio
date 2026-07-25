import mongoose, { Schema, Document } from 'mongoose';
import { ISiteSettings } from '@/types';

export interface ISiteSettingsDoc extends Omit<ISiteSettings, '_id'>, Document {}

const SiteSettingsSchema = new Schema<ISiteSettingsDoc>(
  {
    sectionVisibility: {
      hero: { type: Boolean, default: true },
      about: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      achievements: { type: Boolean, default: true },
      hackathons: { type: Boolean, default: true },
      education: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: true },
    },
    whatsappNumber: { type: String, default: '+917982874404' },
    whatsappMessage: { type: String, default: 'Hi Krishna, I visited your portfolio!' },
    currentlyBuilding: { type: String, default: '' },
    currentlyBuildingUrl: { type: String, default: '' },
    profilePhoto: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      altText: { type: String, default: '' },
    },
    resume: {
      fileUrl: { type: String, default: '' },
      publicId: { type: String, default: '' },
      label: { type: String, default: 'Download Resume' },
      updatedAt: { type: Date, default: Date.now },
    },
    seo: {
      siteTitle: { type: String, default: 'Krishna Garg — Full Stack Developer & Data Analyst' },
      metaDescription: { type: String, default: 'Personal portfolio and engineering showcase of Krishna Garg, B.Tech CSE student at GGSIPU (MSIT).' },
      keywords: { type: [String], default: ['Krishna Garg', 'Full Stack Developer', 'React', 'Next.js', 'Data Analyst'] },
      ogImage: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettingsDoc>('SiteSettings', SiteSettingsSchema);
