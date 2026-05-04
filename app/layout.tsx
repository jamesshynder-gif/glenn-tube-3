import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glenn Tube',
  description: 'The more sus the better.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
