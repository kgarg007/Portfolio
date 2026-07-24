import mongoose, { Schema, Document } from 'mongoose';
import { INavigationItem } from '@/types';

export interface INavigationItemDoc extends Omit<INavigationItem, '_id'>, Document {}

const NavigationItemSchema = new Schema<INavigationItemDoc>(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    visible: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.NavigationItem || mongoose.model<INavigationItemDoc>('NavigationItem', NavigationItemSchema);
