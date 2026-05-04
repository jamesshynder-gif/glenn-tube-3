import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UploadForm } from '@/components/UploadForm';

export default async function UploadPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/signin');

  return <main className="container">
    <h1>Upload a video</h1>
    <UploadForm />
  </main>;
}
