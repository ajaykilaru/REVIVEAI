"use client";

import Link from 'next/link';
import ParticleText from '@/components/ui/ParticleText';
import StarBorder from '@/components/ui/StarBorder';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#07080C] text-white">
      <div style={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center' }}>
        <ParticleText
          text="REVIVEAI"
          particleSize={3}
          density={4}
          color="#ffffff"
          highlightColor="#8b5cf6"
          scatter={120}
          gatherDuration={2000}
          fontSize="8rem"
          fontWeight={800}
        />
      </div>
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">YOUR REVENUE IS ALREADY TRYING TO COME BACK.</h2>
      <p className="mt-4 text-lg text-[#8B93A7] text-center max-w-2xl">
        AI-powered payment recovery that detects, decides and acts.
      </p>
      <div className="mt-12">
        <StarBorder as="div" color="#8B5CF6" speed="4s" backgroundColor="#07080C">
          <Link href="/dashboard" className="px-8 py-3 block font-medium">
            Launch Recovery Command Center
          </Link>
        </StarBorder>
      </div>
    </main>
  );
}
