import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  const cleanEmail = String(email ?? '').toLowerCase().trim();
  const cleanPassword = String(password ?? '');

  if (!cleanEmail || cleanPassword.length < 8) {
    return NextResponse.json({ error: 'Invalid email or password too short' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
  if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });

  const passwordHash = await bcrypt.hash(cleanPassword, 12);
  await prisma.user.create({
    data: { email: cleanEmail, passwordHash, name: String(name ?? '').trim() || null }
  });

  return NextResponse.json({ ok: true });
}
