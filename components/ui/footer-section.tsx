'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

const companyLinks = [
  { title: 'Mission', href: '/#about' },
  { title: 'Services', href: '/#services' },
  { title: 'Case Studies', href: '/#work' },
  { title: 'Strategy', href: '/#strategy' },
  { title: 'Founders', href: '/founders' },
];

const contactInfo = [
  { title: 'info@codzecinnovations.com', href: 'mailto:info@codzecinnovations.com' },
  { title: '+1-604-561-3864', href: 'tel:+16045613864' },
];

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[rgba(12,15,24,0.95)] px-4 sm:px-8 xl:px-16 py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand block */}
          <AnimatedContainer className="lg:col-span-2 space-y-4">
            <Link href="/#main" className="inline-block">
              <span className="font-bold text-xl tracking-wide text-[#f7f8fb]">
                codzec<span className="text-[#50d5b7]"> Innovations</span>
              </span>
            </Link>
            <p className="text-[#c8c9d5] text-sm max-w-xs leading-relaxed">
              Independent IT and AI studio delivering infrastructure, products, and support with enterprise discipline.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#50d5b7] to-[#74f2d6] text-[#041013] font-semibold text-sm px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              Book a discovery call
            </Link>
          </AnimatedContainer>

          {/* Company links */}
          <AnimatedContainer delay={0.15} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f7f8fb]">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-[#c8c9d5] hover:text-[#50d5b7] text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          {/* Contact */}
          <AnimatedContainer delay={0.25} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f7f8fb]">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="text-[#c8c9d5] hover:text-[#50d5b7] text-sm transition-colors duration-200 break-all"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        </div>

        {/* Legal row */}
        <AnimatedContainer delay={0.35} className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#c8c9d5] text-xs">© 2026 codzec Innovations</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#c8c9d5] hover:text-[#f7f8fb] text-xs transition-colors">Privacy</a>
            <span className="text-white/20">•</span>
            <a href="#" className="text-[#c8c9d5] hover:text-[#f7f8fb] text-xs transition-colors">Terms</a>
          </div>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: 16, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
