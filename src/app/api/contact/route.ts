import { NextResponse } from 'next/server';
import { submitContactMessageAction } from '@/lib/actions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitContactMessageAction(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
