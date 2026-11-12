'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/ui/header-2';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import NeuralBackground from '@/components/ui/flow-field-background';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { TimelineContent } from '@/components/ui/timeline-animation';
import { Footer } from '@/components/ui/footer-section';
import dynamic from 'next/dynamic';

const RadialOrbitalTimeline = dynamic(
  () => import('@/components/ui/radial-orbital-timeline'),
  { ssr: false },
);
import {
  Code, Cloud, Settings, Shield, Palette, TrendingUp,
  BarChart2, PieChart, Link2, Users, Bot,
} from 'lucide-react';

/* ─── Services data for orbital timeline ─── */
const services = [
  {
    id: 1, title: 'Software Dev', date: 'Core', content: 'Design and ship web/mobile apps and backend APIs that scale cleanly.',
    category: 'Product builds', icon: Code, relatedIds: [2, 9, 10], status: 'completed' as const, energy: 95,
  },
  {
    id: 2, title: 'Cloud & DevOps', date: 'Core', content: 'Cloud migration, IaC, and CI/CD to keep shipping fast and safe. AWS, GCP, Azure.',
    category: 'Reliable delivery', icon: Cloud, relatedIds: [1, 4, 9], status: 'completed' as const, energy: 92,
  },
  {
    id: 3, title: 'IT Consulting', date: 'Core', content: 'Technical audits, stack recommendations, and on-call coverage.',
    category: 'Guidance', icon: Settings, relatedIds: [2, 4], status: 'completed' as const, energy: 88,
  },
  {
    id: 4, title: 'Pen Testing', date: 'Core', content: 'Offensive testing and hardening for cloud, apps, and APIs. SOC2/ISO readiness.',
    category: 'Security-first', icon: Shield, relatedIds: [2, 3], status: 'completed' as const, energy: 90,
  },
  {
    id: 5, title: 'UI/UX Design', date: 'Core', content: 'From wireframes to responsive systems with accessibility in mind.',
    category: 'Design that converts', icon: Palette, relatedIds: [1, 6], status: 'completed' as const, energy: 85,
  },
  {
    id: 6, title: 'Marketing', date: 'Growth', content: 'Strategy, campaigns, and performance ops to fuel launches and scale.',
    category: 'Growth', icon: TrendingUp, relatedIds: [5, 7], status: 'in-progress' as const, energy: 78,
  },
  {
    id: 7, title: 'Data & Analytics', date: 'Insights', content: 'Dashboards, ML, and predictive analytics wired into your ops.',
    category: 'Decision intelligence', icon: BarChart2, relatedIds: [6, 8], status: 'completed' as const, energy: 87,
  },
  {
    id: 8, title: 'Power BI', date: 'Insights', content: 'Enterprise-grade reporting, semantic models, DAX optimization, and governance.',
    category: 'Analytics ops', icon: PieChart, relatedIds: [7], status: 'completed' as const, energy: 91,
  },
  {
    id: 9, title: 'API & Integrations', date: 'Core', content: 'REST/GraphQL APIs and integrations across payments, ERP, and data.',
    category: 'Connected systems', icon: Link2, relatedIds: [1, 2], status: 'completed' as const, energy: 89,
  },
  {
    id: 10, title: 'Staff Augmentation', date: 'Scale', content: 'Engineers, designers, and QA embedded with your squad on-demand.',
    category: 'Elastic teams', icon: Users, relatedIds: [1, 5], status: 'in-progress' as const, energy: 80,
  },
  {
    id: 11, title: 'AI Agents', date: 'Frontier', content: 'AI agents and copilots to accelerate workflows. RAG, LLMs, human-in-the-loop.',
    category: 'Automation', icon: Bot, relatedIds: [1, 7, 9], status: 'in-progress' as const, energy: 94,
  },
];

/* ─── Portfolio data ─── */
const portfolio = [
  {
    sector: 'Construction', type: 'Website rebuild', client: 'Gavinpreet Constructions Ltd',
    desc: 'Responsive portfolio and lead-gen site showcasing commercial builds, services, and safety credentials.',
    metrics: ['Project gallery with RFQ handoff', 'Performance-tuned, secure hosting'],
  },
  {
    sector: 'Automotive', type: 'Booking site', client: 'Shubh Car Detailing & Customization Ltd',
    desc: 'Services and booking site with clear packages, before/after gallery, and routed inquiries.',
    metrics: ['Online booking with service menus', 'CRM-ready lead routing'],
  },
  {
    sector: 'Infrastructure', type: 'Field ops', client: 'North America Construction Ltd',
    desc: 'Services site highlighting commercial capabilities, compliance, and project highlights.',
    metrics: ['Bid pack downloads and contact routing', 'Map-based service regions'],
  },
  {
    sector: 'Events', type: 'Brand & site', client: 'The Browntales',
    desc: 'Event organizer site with packages, past events, and streamlined inquiries.',
    metrics: ['Story-led landing pages', 'Calendar-friendly lead capture'],
  },
];

/* ─── Values ─── */
const values = [
  'Customer-centricity and clear communication.',
  'Innovation with integrity and transparency.',
  'Quality-driven development with security by default.',
  'Agile and adaptive delivery with measurable milestones.',
];

/* ─── Process steps ─── */
const steps = [
  {
    num: '01', title: 'Discovery & Blueprint',
    desc: 'We map objectives, architecture options, and risk upfront so delivery is predictable.',
  },
  {
    num: '02', title: 'Build & Iterate',
    desc: 'Engineering sprints with weekly demos, performance gates, and security checks.',
  },
  {
    num: '03', title: 'Launch & Support',
    desc: 'Handover, training, and on-call coverage so your team stays confident post-launch.',
  },
];

/* ─── Strategy packages ─── */
const strategyPackages = [
  {
    label: 'Checklist', title: 'Branding Assets',
    items: ['Logo and brand palette', 'Website and case-study portfolio', 'Slide deck for sales and pitches', 'Social media presence'],
  },
  {
    label: 'Launch plan', title: 'Go-to-Market',
    items: ['Launch website and SEO-ready content', 'Freelance platforms and cold outreach', 'Tech events, partnerships, and blogging', 'Continuous optimization with analytics'],
  },
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0, opacity: 1, filter: 'blur(0px)',
    transition: { delay: i * 0.15, duration: 0.55, ease: 'easeOut' },
  }),
  hidden: { y: -20, opacity: 0, filter: 'blur(8px)' },
};

/* ─── Portfolio section ─── */
const selectedWork = [
  {
    category: 'Construction',
    service: 'Website rebuild',
    company: 'Gavinpreet Constructions Ltd',
    description: 'Responsive portfolio and lead-gen site showcasing commercial builds, services, and safety credentials.',
    highlights: ['Project gallery with RFQ handoff', 'Performance-tuned, secure hosting'],
  },
  {
    category: 'Automotive',
    service: 'Booking site',
    company: 'Shubh Car Detailing & Customization Ltd',
    description: 'Services and booking site with clear packages, before/after gallery, and routed inquiries.',
    highlights: ['Online booking with service menus', 'CRM-ready lead routing'],
  },
  {
    category: 'Infrastructure',
    service: 'Field ops',
    company: 'North America Construction Ltd',
    description: 'Services site highlighting commercial capabilities, compliance, and project highlights.',
    highlights: ['Bid pack downloads and contact routing', 'Map-based service regions'],
  },
  {
    category: 'Events',
    service: 'Brand & site',
    company: 'The Browntales',
    description: 'Event organizer site with packages, past events, and streamlined inquiries.',
    highlights: ['Story-led landing pages', 'Calendar-friendly lead capture'],
  },
];

function PortfolioSection() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section id="work" className="mx-auto max-w-[1320px] px-4 sm:px-8 xl:px-16 py-20" ref={ref as React.RefObject<HTMLElement>}>
      {/* Header */}
      <div className="mb-10">
        <TimelineContent as="p" animationNum={0} customVariants={revealVariants} timelineRef={ref}
          className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#50d5b7] mb-3">
          Selected Work
        </TimelineContent>
        <TimelineContent as="h2" animationNum={1} customVariants={revealVariants} timelineRef={ref}
          className="text-4xl md:text-5xl font-bold text-[#f7f8fb] tracking-tight">
          Recent projects that moved the needle.
        </TimelineContent>
      </div>

      {/* 4 cards — single row on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedWork.map((item, i) => (
          <TimelineContent
            key={item.company}
            animationNum={i + 2}
            customVariants={revealVariants}
            timelineRef={ref}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0e1220] overflow-hidden hover:border-[#50d5b7]/30 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300 group min-h-[280px]"
          >
            {/* Top: badges */}
            <div className="p-5 pb-0 flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#50d5b7] border border-[#50d5b7]/30 bg-[#50d5b7]/05 rounded-full px-2.5 py-1">
                {item.category}
              </span>
              <span className="text-[10px] text-[#c8c9d5]">
                {item.service}
              </span>
            </div>

            {/* Middle: company + description */}
            <div className="p-5 flex-1">
              <h3 className="text-base font-bold text-[#f7f8fb] mb-2 leading-snug">
                {item.company}
              </h3>
              <p className="text-xs text-[#c8c9d5] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom: highlights */}
            <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-2">
              {item.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <span className="text-[#50d5b7] text-xs mt-0.5 shrink-0">→</span>
                  <span className="text-[10px] text-[#c8c9d5] leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </TimelineContent>
        ))}
      </div>
    </section>
  );
}

/* ─── Strategy section (How we work + Launch ready) ─── */
function StrategySection({
  steps,
  strategyPackages,
}: {
  steps: { num: string; title: string; desc: string }[];
  strategyPackages: { label: string; title: string; items: string[] }[];
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section id="strategy" className="mx-auto max-w-[1320px] px-4 sm:px-8 xl:px-16 py-20" ref={ref as React.RefObject<HTMLElement>}>

      {/* ── How we work ── */}
      <div className="mb-12">
        <TimelineContent as="p" className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#50d5b7] mb-3" animationNum={0} customVariants={revealVariants} timelineRef={ref}>
          How we work
        </TimelineContent>
        <TimelineContent as="h2" className="text-4xl md:text-5xl font-bold text-[#f7f8fb] tracking-tight" animationNum={1} customVariants={revealVariants} timelineRef={ref}>
          Structured to ship{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f43] to-[#ffd47f]">value fast</span>.
        </TimelineContent>
      </div>

      <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col mb-14">
        {steps.map((step, i) => (
          <TimelineContent key={step.num} animationNum={i + 2} customVariants={revealVariants} timelineRef={ref}
            className={`flex flex-col justify-between relative overflow-hidden rounded-2xl border p-10 min-h-[240px] ${i === 1 ? 'bg-[#50d5b7]/10 border-[#50d5b7]/20' : 'bg-[#0e1220] border-white/10'}`}>
            {i !== 1 && (
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(80,213,183,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(80,213,183,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            )}
            <article className="relative z-10">
              <div className="step-num mb-5">{step.num}</div>
              <h3 className="text-xl font-bold text-[#f7f8fb] mb-3">{step.title}</h3>
              <p className="text-sm text-[#c8c9d5] leading-relaxed">{step.desc}</p>
            </article>
          </TimelineContent>
        ))}
      </div>

      {/* ── Launch ready ── */}
      <div className="mb-10">
        <TimelineContent as="p" className="text-xs uppercase tracking-[0.2em] font-semibold text-[#50d5b7] mb-2" animationNum={5} customVariants={revealVariants} timelineRef={ref}>
          Launch ready
        </TimelineContent>
        <TimelineContent as="h3" className="text-2xl font-bold text-[#f7f8fb]" animationNum={6} customVariants={revealVariants} timelineRef={ref}>
          Everything you need to show up credibly on day one.
        </TimelineContent>
      </div>

      <div className="lg:grid lg:grid-cols-3 gap-3 flex flex-col">
        {/* Package 1 — tall dark grid */}
        <TimelineContent animationNum={7} customVariants={revealVariants} timelineRef={ref}
          className="lg:col-span-1 flex flex-col justify-between relative bg-[#0e1220] overflow-hidden rounded-2xl border border-white/10 p-8">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(80,213,183,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(80,213,183,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <article className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#50d5b7] border border-[#50d5b7]/30 rounded-full px-3 py-1">
              {strategyPackages[0].label}
            </span>
            <h4 className="text-xl font-bold text-[#f7f8fb] mt-5 mb-5">{strategyPackages[0].title}</h4>
            <ul className="space-y-3">
              {strategyPackages[0].items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#c8c9d5]">
                  <span className="text-[#50d5b7] mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </TimelineContent>

        {/* Package 2 — tall mint accent */}
        <TimelineContent animationNum={8} customVariants={revealVariants} timelineRef={ref}
          className="lg:col-span-1 flex flex-col justify-between bg-[#50d5b7]/10 border border-[#50d5b7]/20 overflow-hidden rounded-2xl p-8">
          <article>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#ff9f43] border border-[#ff9f43]/30 rounded-full px-3 py-1">
              {strategyPackages[1].label}
            </span>
            <h4 className="text-xl font-bold text-[#f7f8fb] mt-5 mb-5">{strategyPackages[1].title}</h4>
            <ul className="space-y-3">
              {strategyPackages[1].items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#c8c9d5]">
                  <span className="text-[#ff9f43] mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </TimelineContent>

        {/* CTA card */}
        <TimelineContent animationNum={9} customVariants={revealVariants} timelineRef={ref}
          className="lg:col-span-1 flex flex-col justify-between relative bg-[#0e1220] overflow-hidden rounded-2xl border border-white/10 p-8">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,159,67,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,159,67,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <article className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#ff9f43] mb-4">6-Week Accelerator</p>
              <h4 className="text-xl font-bold text-[#f7f8fb] mb-3">Ready to ship in 6 weeks?</h4>
              <p className="text-sm text-[#c8c9d5] leading-relaxed">
                Fixed-scope, fixed-timeline package. We blueprint, build, and hand off a production-ready product with full documentation.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#50d5b7] to-[#74f2d6] text-[#041013] font-bold text-sm px-7 py-3 hover:opacity-90 transition-opacity"
            >
              Ask about it →
            </a>
          </article>
        </TimelineContent>
      </div>
    </section>
  );
}

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const mainRef = useReveal() as React.RefObject<HTMLElement>;
  const splineContainerRef = useRef<HTMLDivElement>(null);

  const dispatchGlobalCursor = useCallback((clientX: number, clientY: number) => {
    const canvas = splineContainerRef.current?.querySelector('canvas');
    if (!canvas) return;
    const opts = { clientX, clientY, bubbles: true, cancelable: true, view: window };
    canvas.dispatchEvent(new MouseEvent('mousemove', opts));
    canvas.dispatchEvent(new PointerEvent('pointermove', { ...opts, pointerId: 1, pointerType: 'mouse' }));
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0, lastY = 0;
    const onMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        dispatchGlobalCursor(lastX, lastY);
        rafId = null;
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [dispatchGlobalCursor]);

  return (
    <>
      {/* Skip link */}
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Grain overlay */}
      <div className="grain" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="1" />
        </svg>
      </div>

      {/* Sticky navigation */}
      <Header />

      <main id="main" ref={mainRef as React.RefObject<HTMLElement>}>

        {/* ── HERO ── */}
        <section
          id="main"
          className="relative w-full px-4 sm:px-8 xl:px-16 pt-20 pb-28 overflow-hidden"
          style={{
            borderRadius: '0 0 40px 40px',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Flow field background */}
          <div className="absolute inset-0">
            <NeuralBackground color="#50d5b7" trailOpacity={0.12} particleCount={700} speed={0.9} />
          </div>
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#50d5b7" />

          <div className="relative z-10 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-center min-h-[600px] max-w-[1320px] mx-auto">

            {/* Left — text */}
            <div className="flex flex-col gap-6 lg:gap-7">
              <p className="reveal inline-flex w-fit text-[11px] uppercase tracking-[0.22em] font-semibold text-[#50d5b7] border border-[#50d5b7]/25 rounded-full px-4 py-1.5 bg-[#50d5b7]/[0.07]">
                Mission-led IT &amp; AI studio
              </p>
              <h1 className="reveal delay-1 text-5xl md:text-6xl lg:text-7xl font-bold text-[#f7f8fb] leading-[1.06] tracking-tight">
                Scalable, secure systems and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50d5b7] to-[#74f2d6]">
                  AI agents
                </span>{' '}
                that move business forward.
              </h1>
              <p className="reveal delay-2 text-[#c8c9d5] text-xl leading-relaxed max-w-lg">
                We deliver cutting-edge, resilient solutions that streamline operations, enhance customer experiences, and drive sustainable growth.
              </p>
              <div className="reveal delay-3 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#50d5b7] to-[#74f2d6] text-[#041013] font-bold text-sm px-8 py-3.5 hover:opacity-90 transition-opacity shadow-[0_8px_40px_rgba(80,213,183,0.3)]">
                  Book a discovery call
                </a>
                <a href="#work" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[#f7f8fb] font-semibold text-sm px-8 py-3.5 hover:bg-white/10 transition-colors">
                  View portfolio
                </a>
              </div>

              {/* Stats */}
              <div className="reveal delay-3 flex flex-wrap gap-10 pt-2 border-t border-white/[0.08] mt-1">
                {[
                  { value: '4+', label: 'Projects delivered' },
                  { value: '99.95%', label: 'Uptime managed' },
                  { value: '4', label: 'Industries served' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-[#50d5b7] tracking-tight">{stat.value}</p>
                    <p className="text-xs text-[#c8c9d5] mt-1 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Spline + Mission card */}
            <div className="flex flex-col gap-4">
              <div ref={splineContainerRef} className="w-full h-[520px] overflow-hidden">
                <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
              </div>
              <div className="float rounded-2xl border border-white/10 bg-[rgba(12,15,24,0.88)] backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-[#50d5b7] border border-[#50d5b7]/30 rounded-full px-3 py-1 mb-3">Mission</span>
                <h3 className="text-base font-bold text-[#f7f8fb] mb-2 leading-snug">Deliver scalable, secure solutions that compound value.</h3>
                <ul className="space-y-1.5 mb-3">
                  {['Customer-centric, quality-driven delivery', 'Transparent, integrity-first collaboration', 'Agile execution with measurable milestones'].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-[#c8c9d5]">
                      <span className="text-[#50d5b7] mt-0.5 shrink-0">✓</span>{b}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="text-xs text-[#50d5b7] font-semibold hover:underline">Ask about our 6-week accelerator →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="mx-auto max-w-[1320px] px-4 sm:px-8 xl:px-16 py-20">
          <div className="text-center mb-6 reveal">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#50d5b7] mb-3">What we do</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f7f8fb] tracking-tight">
              Full-stack services and AI capabilities,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50d5b7] to-[#74f2d6]">built for outcomes</span>.
            </h2>
            <p className="mt-4 text-[#c8c9d5] text-lg max-w-2xl mx-auto">
              Architecture, delivery, and support blended with security and automation so you launch fast and stay resilient.
            </p>
            <p className="mt-2 text-xs text-[#c8c9d5]/50">Click a node to explore</p>
          </div>

          <div className="reveal">
            <RadialOrbitalTimeline timelineData={services} />
          </div>

          {/* Credential band */}
          <div className="reveal mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: '6 months', label: 'In industry' },
              { stat: 'Pods', label: 'PM + Eng + Design' },
              { stat: '24/7', label: 'Support & on-call' },
              { stat: 'Certified', label: 'AWS · GCP · Azure · K8s' },
            ].map((item) => (
              <div key={item.stat} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center hover:bg-white/[0.06] transition-colors">
                <p className="text-3xl font-bold text-[#50d5b7] tracking-tight">{item.stat}</p>
                <p className="text-xs text-[#c8c9d5] mt-2 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WORK ── */}
        <PortfolioSection />

        {/* ── ABOUT / MISSION ── */}
        <section id="about" className="w-full overflow-hidden">
          <ContainerScroll
            titleComponent={
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#50d5b7] mb-3">
                  Our Mission
                </p>
                <h2 className="text-5xl md:text-7xl font-bold text-[#f7f8fb] leading-tight tracking-tight">
                  Built for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50d5b7] to-[#74f2d6]">
                    Outcomes
                  </span>
                  .
                </h2>
                <p className="mt-5 text-[#c8c9d5] text-xl max-w-2xl mx-auto">
                  Practical technologists with enterprise discipline — delivering scalable systems that compound value.
                </p>
              </div>
            }
          >
            {/* Card interior — values + accelerator CTA */}
            <div className="h-full grid md:grid-cols-2 gap-0 divide-x divide-white/[0.06]">
              {/* Left: Core values */}
              <div className="p-8 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#50d5b7] mb-5">Core Values</p>
                <ul className="space-y-4">
                  {values.map((v) => (
                    <li key={v} className="flex items-start gap-3 text-sm text-[#c8c9d5]">
                      <span className="text-[#50d5b7] mt-0.5 shrink-0">✦</span>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Accelerator CTA */}
              <div className="p-8 flex flex-col justify-between bg-gradient-to-br from-[rgba(80,213,183,0.05)] to-[rgba(255,159,67,0.03)]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#ff9f43] mb-4">6-Week Accelerator</p>
                  <h3 className="text-2xl font-bold text-[#f7f8fb] mb-3 leading-snug">
                    Ready for a calmer IT roadmap?
                  </h3>
                  <p className="text-[#c8c9d5] text-sm leading-relaxed">
                    We deliver predictable outcomes and ship value fast — without the drama.
                  </p>

                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { stat: '24/7', label: 'On-call support' },
                      { stat: 'Certified', label: 'AWS · GCP · Azure' },
                      { stat: 'Pods', label: 'PM + Eng + Design' },
                      { stat: '6 months', label: 'In industry' },
                    ].map((item) => (
                      <div key={item.stat} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                        <p className="text-sm font-bold text-[#50d5b7]">{item.stat}</p>
                        <p className="text-[10px] text-[#c8c9d5] mt-0.5">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#50d5b7] to-[#74f2d6] text-[#041013] font-bold text-sm px-7 py-3 hover:opacity-90 transition-opacity self-start"
                >
                  Schedule a session →
                </a>
              </div>
            </div>
          </ContainerScroll>
        </section>

        {/* ── STRATEGY ── */}
        <StrategySection steps={steps} strategyPackages={strategyPackages} />

        {/* ── CONTACT ── */}
        <section id="contact" className="mx-auto max-w-[1320px] px-4 sm:px-8 xl:px-16 py-20">
          <div
            className="rounded-3xl relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #50d5b7, #74f2d6, #ff9f43)' }}
          >
            <div className="absolute inset-0 bg-[rgba(12,15,24,0.12)]" />
            <div className="relative z-10 grid md:grid-cols-2 gap-0">

              {/* Left — headline + info */}
              <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#041013]/60 mb-4">Let&apos;s talk</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#041013] leading-tight mb-5">
                    Ready for a calmer IT roadmap?
                  </h2>
                  <p className="text-[#041013]/75 text-lg leading-relaxed max-w-sm">
                    Tell us what you&apos;re building. We&apos;ll propose a practical plan within 48 hours.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  {[
                    { label: 'Email', value: 'info@codzecinnovations.com', href: 'mailto:info@codzecinnovations.com' },
                    { label: 'Phone', value: '+1-604-561-3864', href: 'tel:+16045613864' },
                  ].map((c) => (
                    <div key={c.label}>
                      <p className="text-[10px] uppercase tracking-widest text-[#041013]/50 mb-0.5">{c.label}</p>
                      <a href={c.href} className="text-[#041013] font-semibold text-sm hover:opacity-70 transition-opacity">{c.value}</a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — form */}
              <div className="bg-[rgba(4,16,19,0.18)] backdrop-blur-sm p-10 md:p-14 lg:p-16 flex flex-col justify-center">
                <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" method="POST" className="space-y-4">
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden"><input name="bot-field" /></p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Your name" required
                      className="w-full rounded-xl px-5 py-3.5 text-sm bg-[rgba(255,255,255,0.2)] border border-white/40 text-[#041013] placeholder-[#041013]/50 focus:outline-none focus:border-[#041013]/60 focus:ring-2 focus:ring-[#041013]/20" />
                    <input type="email" name="email" placeholder="Work email" required
                      className="w-full rounded-xl px-5 py-3.5 text-sm bg-[rgba(255,255,255,0.2)] border border-white/40 text-[#041013] placeholder-[#041013]/50 focus:outline-none focus:border-[#041013]/60 focus:ring-2 focus:ring-[#041013]/20" />
                  </div>
                  <textarea name="message" placeholder="Project summary — what are you building?" required rows={5}
                    className="w-full rounded-xl px-5 py-3.5 text-sm bg-[rgba(255,255,255,0.2)] border border-white/40 text-[#041013] placeholder-[#041013]/50 focus:outline-none focus:border-[#041013]/60 focus:ring-2 focus:ring-[#041013]/20 resize-none" />
                  <button type="submit"
                    className="w-full rounded-full bg-[#041013] text-[#50d5b7] font-bold text-base py-4 hover:bg-[#0a2028] transition-colors shadow-lg">
                    Send message
                  </button>
                  <p className="text-[10px] text-[#041013]/50 text-center">By submitting you agree to be contacted about your project. No spam.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </>
  );
}
