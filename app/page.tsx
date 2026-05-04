import { prisma } from '@/lib/prisma';
import { Nav } from '@/components/Nav';
import Link from 'next/link';

export default async function Home() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true, _count: { select: { likes: true, comments: true } } }
  });

  return (
    <main>
      <Nav />
      <div className="container">
        <h1 style={{ color: '#ff7a00' }}>the more sus the better</h1>
        <p>Fresh feed. No fake stats, no seed content.</p>
        <div className="grid">
          {videos.map((v) => (
            <Link className="card" href={`/videos/${v.id}`} key={v.id}>
              <video src={v.assetUrl} controls style={{ width: '100%', borderRadius: 12 }} />
              <h3>{v.title}</h3>
              <p>by {v.user.name ?? v.user.email}</p>
              <small>{v._count.likes} likes • {v._count.comments} comments</small>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
