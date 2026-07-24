import { connectToDatabase } from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';
import MessagesManager from './MessagesManager';

export const revalidate = 0;

export default async function AdminMessagesPage() {
  await connectToDatabase();
  const docs = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  const messages = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Contact Messages Inbox
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Read, organize, or delete contact form inquiries submitted by recruiters and clients.
        </p>
      </div>

      <MessagesManager initialMessages={messages} />
    </div>
  );
}
