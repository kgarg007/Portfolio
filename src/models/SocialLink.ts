import mongoose, { Schema, Document } from 'mongoose';
import { ISocialLink } from '@/types';

export interface ISocialLinkDoc extends Omit<ISocialLink, '_id'>, Document {}

const SocialLinkSchema = new Schema<ISocialLinkDoc>(
  {
    platform: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    icon: { type: String, default: '' },
    visible: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.SocialLink || mongoose.model<ISocialLinkDoc>('SocialLink', SocialLinkSchema);
