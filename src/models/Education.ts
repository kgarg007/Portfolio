import mongoose, { Schema, Document } from 'mongoose';
import { IEducation } from '@/types';

export interface IEducationDoc extends Omit<IEducation, '_id'>, Document {}

const EducationSchema = new Schema<IEducationDoc>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    field: { type: String, required: true, default: 'Computer Science' },
    startYear: { type: String, required: true },
    endYear: { type: String, default: '' },
    isCurrent: { type: Boolean, default: true },
    grade: { type: String, default: '' },
    description: { type: String, default: '' },
    courses: { type: [String], default: [] },
    displayOrder: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model<IEducationDoc>('Education', EducationSchema);
