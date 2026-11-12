'use client';
import { motion, useInView } from 'framer-motion';
import React, { type ElementType, type ReactNode, type RefObject } from 'react';

const motionMap: Record<string, React.ElementType> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  li: motion.li,
};

interface TimelineContentProps {
  as?: ElementType;
  className?: string;
  animationNum: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customVariants: any;
  timelineRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}

export function TimelineContent({
  as: Tag = 'div',
  className,
  animationNum,
  customVariants,
  timelineRef,
  children,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef as RefObject<Element>, {
    once: true,
    amount: 0.1,
  });

  const MotionTag = motionMap[Tag as string] ?? motion.div;

  return (
    <MotionTag
      className={className}
      custom={animationNum}
      variants={customVariants}
      animate={isInView ? 'visible' : 'hidden'}
      initial="hidden"
    >
      {children}
    </MotionTag>
  );
}
