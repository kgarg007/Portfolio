import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();
    const resumeUrl = settings?.resume?.fileUrl;

    if (!resumeUrl) {
      return new NextResponse('Resume not found', { status: 404 });
    }

    // Fetch the raw PDF binary content from storage
    const response = await fetch(resumeUrl);
    if (!response.ok) {
      return new NextResponse('Failed to fetch resume file', { status: 502 });
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Krishna_Garg_Resume.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving resume PDF download:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
