import mongoose, { Schema, Document } from 'mongoose';
import { IAdminUser } from '@/types';

export interface IAdminUserDoc extends Omit<IAdminUser, '_id'>, Document {}

const AdminUserSchema = new Schema<IAdminUserDoc>(
  {
    username: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    email: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser || mongoose.model<IAdminUserDoc>('AdminUser', AdminUserSchema);
