import mongoose, { Schema, Document } from 'mongoose';
import { IExperience } from '@/types';

export interface IExperienceDoc extends Omit<IExperience, '_id'>, Document {}

const ExperienceSchema = new Schema<IExperienceDoc>(
  {
    organization: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: '' },
    startMonth: { type: String, default: '' },
    startYear: { type: String, default: '' },
    endMonth: { type: String, default: '' },
    endYear: { type: String, default: '' },
    isCurrent: { type: Boolean, default: false },
    description: { type: [String], required: true, default: [] },
    technologies: { type: [String], default: [] },
    logoUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    certificate: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      name: { type: String, default: '' },
    },
    published: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperienceDoc>('Experience', ExperienceSchema);
