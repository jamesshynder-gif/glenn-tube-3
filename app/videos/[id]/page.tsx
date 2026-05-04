import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function VideoPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const video = await prisma.video.findUnique({ where: { id: params.id }, include: { comments: { include: { user: true } }, likes: true } });
  if (!video) notFound();

  return <main className="container">
    <a href="/">← Back</a>
    <h1>{video.title}</h1>
    <video src={video.assetUrl} controls style={{ width: '100%' }} />
    <p>{video.description}</p>
    <form action={`/api/videos/${video.id}/like`} method="post"><button>{video.likes.length} Likes</button></form>
    {session?.user && <form action={`/api/videos/${video.id}/comments`} method="post"><input name="body" placeholder="Add comment" /><button>Post</button></form>}
    {video.comments.map((c) => <p key={c.id}><b>{c.user.name ?? c.user.email}:</b> {c.body}</p>)}
  </main>;
}
