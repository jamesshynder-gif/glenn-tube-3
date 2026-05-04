import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'No user' }, { status: 404 });
  await prisma.like.upsert({
    where: { userId_videoId: { userId: user.id, videoId: params.id } },
    update: {},
    create: { userId: user.id, videoId: params.id }
  });
  return NextResponse.redirect(new URL(`/videos/${params.id}`, req.url));
}
