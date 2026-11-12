import type { Metadata } from 'next';
import { Space_Grotesk, Instrument_Serif } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'codzec Innovations | IT & AI Solutions for everyone',
  description:
    'codzec Innovations is a mission-led IT & AI studio delivering scalable systems, cloud, security, and product builds that drive growth.',
  openGraph: {
    title: 'codzec Innovations | IT & AI Solutions for everyone',
    description:
      'codzec Innovations builds scalable, secure systems and AI agents that move business forward.',
    images: [{ url: 'https://codzec.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'codzec Innovations | IT & AI Solutions for everyone',
    description:
      'codzec Innovations builds scalable, secure systems and AI agents that move business forward.',
    images: ['https://codzec.com/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
