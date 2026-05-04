import { signIn } from '@/lib/auth';

export default function SignInPage() {
  return <main className="container"><h1>Sign in to Glenn Tube</h1><form action={async()=>{'use server'; await signIn('google')}}><button>Continue with Google</button></form></main>;
}
