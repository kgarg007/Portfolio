import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage } from '@/types';

export interface IContactMessageDoc extends Omit<IContactMessage, '_id'>, Document {}

const ContactMessageSchema = new Schema<IContactMessageDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage || mongoose.model<IContactMessageDoc>('ContactMessage', ContactMessageSchema);
