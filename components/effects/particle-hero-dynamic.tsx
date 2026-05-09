'use client';

import dynamic from "next/dynamic";

export const ParticleHeroDynamic = dynamic(
  () => import("@/components/effects/particle-hero").then((module) => module.ParticleHero),
  {
    ssr: false,
  }
);
