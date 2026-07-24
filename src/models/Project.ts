import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from '@/types';

export interface IProjectDoc extends Omit<IProject, '_id'>, Document {}

const ProjectSchema = new Schema<IProjectDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    category: { type: String, required: true, default: 'Web App' },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    role: { type: String, default: 'Full Stack Developer' },
    features: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    coverImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      altText: { type: String, default: '' },
    },
    gallery: [
      {
        url: { type: String },
        publicId: { type: String },
        altText: { type: String },
      },
    ],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProjectDoc>('Project', ProjectSchema);
