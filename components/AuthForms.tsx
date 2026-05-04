'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AuthForms() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      if (!res.ok) return setError('Could not create account.');
    }

    const result = await signIn('credentials', { email, password, redirect: false });
    if (result?.error) return setError('Invalid credentials');
    router.push('/');
    router.refresh();
  };

  return <div className="card" style={{display:'grid', gap:12}}>
    <form onSubmit={submit} style={{display:'grid', gap:12}}>
      {isRegister && <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />}
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password (8+ chars)" value={password} onChange={(e)=>setPassword(e.target.value)} required />
      {error && <p style={{color:'#ff8b8b'}}>{error}</p>}
      <button type="submit">{isRegister ? 'Create account' : 'Sign in'}</button>
    </form>
    <button onClick={() => signIn('google')} style={{background:'#fff'}}>Sign in with Google</button>
    <button onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Have an account? Sign in' : 'Need an account? Register'}</button>
  </div>;
}
