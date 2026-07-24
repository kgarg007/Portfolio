import { connectToDatabase } from '@/lib/db';
import Certification from '@/models/Certification';
import CertificationManager from './CertificationManager';

export const revalidate = 0;

export default async function AdminCertificationsPage() {
  await connectToDatabase();
  const docs = await Certification.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  const certs = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Certifications CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage licenses, course completion certificates, and credentials.
        </p>
      </div>

      <CertificationManager initialCertifications={certs} />
    </div>
  );
}
