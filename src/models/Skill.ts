import mongoose, { Schema, Document } from 'mongoose';
import { ISkill } from '@/types';

export interface ISkillDoc extends Omit<ISkill, '_id'>, Document {}

const SkillSchema = new Schema<ISkillDoc>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true, default: 'Frontend' },
    icon: { type: String, default: '' },
    visible: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkillDoc>('Skill', SkillSchema);
