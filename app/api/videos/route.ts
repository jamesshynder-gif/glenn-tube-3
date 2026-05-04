import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.formData();
  const title = String(data.get('title') ?? '');
  const description = String(data.get('description') ?? '');
  const assetUrl = String(data.get('assetUrl') ?? '');
  const publicId = String(data.get('publicId') ?? '');
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'No user' }, { status: 404 });
  const video = await prisma.video.create({ data: { title, description, assetUrl, publicId, userId: user.id } });
  return NextResponse.redirect(new URL(`/videos/${video.id}`, req.url));
}
