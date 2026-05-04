import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'No user' }, { status: 404 });
  const data = await req.formData();
  const body = String(data.get('body') ?? '').trim();
  if (!body) return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  await prisma.comment.create({ data: { body, userId: user.id, videoId: params.id } });
  return NextResponse.redirect(new URL(`/videos/${params.id}`, req.url));
}
