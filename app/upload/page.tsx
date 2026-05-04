import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function UploadPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/');

  return <main className="container">
    <h1>Upload a video</h1>
    <form action="/api/videos" method="post">
      <input name="title" placeholder="Title" required />
      <textarea name="description" placeholder="Description" />
      <input name="assetUrl" placeholder="Cloudinary secure URL" required />
      <input name="publicId" placeholder="Cloudinary public ID" required />
      <button type="submit">Publish</button>
    </form>
  </main>;
}
