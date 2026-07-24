import mongoose, { Schema, Document } from 'mongoose';
import { IMedia } from '@/types';

export interface IMediaDoc extends Omit<IMedia, '_id'>, Document {}

const MediaSchema = new Schema<IMediaDoc>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true, unique: true, index: true },
    resourceType: { type: String, default: 'image' },
    width: { type: Number },
    height: { type: Number },
    altText: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model<IMediaDoc>('Media', MediaSchema);
