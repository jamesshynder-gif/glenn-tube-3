import { auth } from '@/lib/auth';
import { cloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = 'glenn-tube';
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder, resource_type: 'video' }, process.env.CLOUDINARY_API_SECRET!);

  return NextResponse.json({
    timestamp,
    folder,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY
  });
}
