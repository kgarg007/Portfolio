import mongoose, { Schema, Document } from 'mongoose';
import { IAchievement } from '@/types';

export interface IAchievementDoc extends Omit<IAchievement, '_id'>, Document {}

const AchievementSchema = new Schema<IAchievementDoc>(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    event: { type: String, default: '' },
    position: { type: String, default: '' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    certificateUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    featured: { type: Boolean, default: true, index: true },
    visible: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model<IAchievementDoc>('Achievement', AchievementSchema);
