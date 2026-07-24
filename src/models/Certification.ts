import mongoose, { Schema, Document } from 'mongoose';
import { ICertification } from '@/types';

export interface ICertificationDoc extends Omit<ICertification, '_id'>, Document {}

const CertificationSchema = new Schema<ICertificationDoc>(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: String, default: '' },
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    certificateMedia: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    description: { type: String, default: '' },
    visible: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Certification || mongoose.model<ICertificationDoc>('Certification', CertificationSchema);
