import { useMemo } from 'react';
import type { Variants } from 'framer-motion';

const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeSmooth } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeSmooth } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeSmooth } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeSmooth } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: easeSmooth } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeSmooth },
  },
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.01,
    y: -2,
    transition: { duration: 0.25, ease: easeSmooth },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeSmooth } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export const sidebarTransition: Variants = {
  open: { x: 0, transition: { duration: 0.35, ease: easeSmooth } },
  closed: { x: '-100%', transition: { duration: 0.3, ease: easeSmooth } },
};

export const dropdownMenu: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: easeSmooth },
  },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } },
};

export const notificationSlide: Variants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.35, ease: easeSmooth } },
  exit: { opacity: 0, x: 100, scale: 0.95, transition: { duration: 0.25 } },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
};

export function useAnimationConfig() {
  return useMemo(() => ({
    easing: easeSmooth,
    duration: { fast: 0.2, normal: 0.35, slow: 0.5 },
    stagger: 0.06,
  }), []);
}
