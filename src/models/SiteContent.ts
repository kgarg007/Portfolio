import mongoose, { Schema, Document } from 'mongoose';
import { ISiteContent } from '@/types';

export interface ISiteContentDoc extends Omit<ISiteContent, '_id'>, Document {}

const SiteContentSchema = new Schema<ISiteContentDoc>(
  {
    key: { type: String, required: true, unique: true, index: true },
    group: { type: String, required: true, index: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent || mongoose.model<ISiteContentDoc>('SiteContent', SiteContentSchema);
