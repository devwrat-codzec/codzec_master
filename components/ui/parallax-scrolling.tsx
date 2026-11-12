'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ParallaxMission() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          { yPercent: layerObj.yPercent, ease: 'none' },
          idx === 0 ? undefined : '<',
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={parallaxRef} className="relative overflow-hidden rounded-3xl">
      <div className="relative h-[500px] overflow-hidden">
        <div data-parallax-layers className="absolute inset-0">
          {/* Layer 1 - deep background gradient */}
          <div
            data-parallax-layer="1"
            className="absolute inset-0 bg-gradient-to-br from-[rgba(80,213,183,0.08)] via-[rgba(12,15,24,0.9)] to-[rgba(255,159,67,0.08)]"
          />

          {/* Layer 2 - mint blob */}
          <div
            data-parallax-layer="2"
            className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(80,213,183,0.15),transparent_70%)] blur-3xl"
          />

          {/* Layer 3 - headline text */}
          <div
            data-parallax-layer="3"
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="text-center px-8">
              <p className="text-[#50d5b7] text-sm uppercase tracking-[0.2em] font-semibold mb-4">Our Mission</p>
              <h2 className="text-5xl md:text-7xl font-bold text-[#f7f8fb] leading-none">
                Built for
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50d5b7] to-[#74f2d6]">
                  Outcomes
                </span>
              </h2>
              <p className="mt-6 text-[#c8c9d5] text-lg max-w-md mx-auto">
                Practical technologists with enterprise discipline, delivering scalable systems that compound value.
              </p>
            </div>
          </div>

          {/* Layer 4 - orange blob foreground */}
          <div
            data-parallax-layer="4"
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,159,67,0.12),transparent_70%)] blur-3xl"
          />
        </div>

        {/* Fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0f18] to-transparent z-20" />
      </div>
    </div>
  );
}
