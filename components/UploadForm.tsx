'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function UploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const sigRes = await fetch('/api/uploads/signature', { method: 'POST' });
    const sig = await sigRes.json();

    const form = new FormData();
    form.append('file', file);
    form.append('api_key', sig.apiKey);
    form.append('timestamp', String(sig.timestamp));
    form.append('signature', sig.signature);
    form.append('folder', sig.folder);

    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`, { method: 'POST', body: form });
    const uploaded = await cloudRes.json();

    const appForm = new FormData();
    appForm.append('title', title);
    appForm.append('description', description);
    appForm.append('assetUrl', uploaded.secure_url);
    appForm.append('publicId', uploaded.public_id);

    await fetch('/api/videos', { method: 'POST', body: appForm });
    setLoading(false);
    router.push('/');
    router.refresh();
  };

  return <form onSubmit={handleSubmit} className="card" style={{display:'grid', gap:12}}>
    <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required />
    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
    <input type="file" accept="video/*" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} required />
    <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload Video'}</button>
  </form>;
}
