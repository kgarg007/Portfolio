import mongoose, { Schema, Document } from 'mongoose';
import { IHackathon } from '@/types';

export interface IHackathonDoc extends Omit<IHackathon, '_id'>, Document {}

const HackathonSchema = new Schema<IHackathonDoc>(
  {
    title: { type: String, required: true, trim: true },
    event: { type: String, required: true, trim: true },
    organization: { type: String, default: '' },
    date: { type: String, default: '' },
    result: { type: String, default: '' },
    teamName: { type: String, default: '' },
    projectName: { type: String, default: '' },
    description: { type: String, default: '' },
    technologies: { type: [String], default: [] },
    certificateUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    externalUrl: { type: String, default: '' },
    featured: { type: Boolean, default: true, index: true },
    visible: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Hackathon || mongoose.model<IHackathonDoc>('Hackathon', HackathonSchema);
