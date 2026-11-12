import type { Metadata } from 'next';
import { User } from 'lucide-react';
import { Header } from '@/components/ui/header-2';
import { Footer } from '@/components/ui/footer-section';

export const metadata: Metadata = {
  title: 'Founders | codzec Innovations',
  description:
    'Meet the founders and team behind codzec Innovations — the leadership and people driving delivery.',
};

type Person = {
  name: string;
  role: string;
  tag: string;
};

const founders: Person[] = [
  { name: 'Subhdeep', role: 'CEO & CFO', tag: 'Founder' },
  { name: 'Ankit Chaudhary', role: 'CTO & COO', tag: 'Founder' },
];

const team: Person[] = [
  { name: 'Saksham Chaudhary', role: 'Team Member', tag: 'Team' },
  { name: 'Devwrat Chaudhary', role: 'Team Member', tag: 'Team' },
];

function AvatarPlaceholder() {
  return (
    <div className="relative mb-6 flex size-32 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-white/15 bg-white/[0.03]">
      <User className="size-12 text-[#c8c9d5]/40" strokeWidth={1.5} />
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0c0f18] px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-[#c8c9d5]/70">
        Photo soon
      </span>
    </div>
  );
}

function PersonCard({ person, accent = 'mint' }: { person: Person; accent?: 'mint' | 'orange' }) {
  const accentColor = accent === 'mint' ? '#50d5b7' : '#ff9f43';
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#0e1220] p-8 sm:p-10 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
      <AvatarPlaceholder />
      <h3 className="text-xl font-bold text-[#f7f8fb] leading-snug">{person.name}</h3>
      <span
        className="mt-3 inline-flex items-center rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: accentColor, borderColor: `${accentColor}4D`, backgroundColor: `${accentColor}0D` }}
      >
        {person.role}
      </span>
    </div>
  );
}

export default function FoundersPage() {
  return (
    <>
      <Header />

      <main id="main">
        {/* ── HERO ── */}
        <section className="relative mx-auto max-w-[1320px] px-4 sm:px-8 xl:px-16 pt-20 pb-10">
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#50d5b7] mb-3">
            Leadership
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#f7f8fb] leading-[1.06] tracking-tight mb-5">
            Meet the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50d5b7] to-[#74f2d6]">
              Founders
            </span>
            .
          </h1>
          <p className="text-[#c8c9d5] text-lg leading-relaxed max-w-2xl">
            The people behind codzec Innovations — founding leadership setting direction, and the
            team turning it into delivery.
          </p>
        </section>

        {/* ── FOUNDING TEAM ── */}
        <section className="mx-auto max-w-[1320px] px-4 sm:px-8 xl:px-16 py-10">
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#50d5b7] mb-2">
              Founding Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f7f8fb] tracking-tight">
              Leadership
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            {founders.map((person) => (
              <PersonCard key={person.name} person={person} accent="mint" />
            ))}
          </div>
        </section>

        {/* ── TEAM MEMBERS ── */}
        <section className="mx-auto max-w-[1320px] px-4 sm:px-8 xl:px-16 py-10 pb-24">
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#ff9f43] mb-2">
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f7f8fb] tracking-tight">
              Team Members
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            {team.map((person) => (
              <PersonCard key={person.name} person={person} accent="orange" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
