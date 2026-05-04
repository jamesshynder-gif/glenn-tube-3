import Link from 'next/link';
import { auth, signIn, signOut } from '@/lib/auth';

export async function Nav() {
  const session = await auth();
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/" style={{ fontWeight: 900, color: '#ff7a00' }}>GLENN TUBE</Link>
      <div style={{ display: 'flex', gap: 8 }}>
        {session?.user ? (
          <>
            <Link href="/upload"><button>Upload</button></Link>
            <form action={async () => { 'use server'; await signOut(); }}><button>Sign out</button></form>
          </>
        ) : (
          <form action={async () => { 'use server'; await signIn('google'); }}><button>Sign in with Google</button></form>
        )}
      </div>
    </div>
  );
}
