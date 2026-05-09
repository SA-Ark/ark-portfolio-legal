'use client';

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: false,
  background: {
    color: "transparent",
  },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        width: 1200,
        height: 800,
      },
    },
    color: {
      value: "#00d4ff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.12, max: 0.32 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      color: "#00d4ff",
      opacity: 0.26,
      distance: 145,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.55,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.45,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
};

export function ParticleHero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0 opacity-70"
      options={options}
    />
  );
}
