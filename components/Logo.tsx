"use client";

import Image from "next/image";
import { useState } from "react";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

type LogoWordmarkProps = {
  className?: string;
  subtitle?: string;
};

const sizeMap = {
  sm: 48,
  md: 96,
  lg: 156
} as const;

export function Logo({ size = "md", className = "" }: LogoProps) {
  const [failed, setFailed] = useState(false);
  const dimension = sizeMap[size];

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-full border border-black/10 bg-transparent font-serif text-ink ${className}`}
        style={{ width: dimension, height: dimension }}
      >
        <span className={size === "sm" ? "text-xs" : size === "md" ? "text-lg" : "text-2xl"}>龙潭祈愿</span>
      </div>
    );
  }

  return (
    <Image
      src="/logo-longtan-prayer-source.svg"
      alt="龙潭祈愿 Logo"
      width={dimension}
      height={dimension}
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
      priority={size === "lg"}
    />
  );
}

export function LogoWordmark({
  className = "",
  subtitle = "LONGTAN PRAYER"
}: LogoWordmarkProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="font-serif text-[2.5rem] font-semibold tracking-[0.12em] text-[#111111] sm:text-[2.95rem]">龙潭祈愿</div>
        <div className="mt-3 text-[11px] tracking-[0.34em] text-[#111111]/42">{subtitle}</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <Image
        src="/logo-longtan-prayer-source.svg"
        alt="龙潭祈愿品牌标识"
        width={320}
        height={320}
        className="h-auto w-[168px] object-contain sm:w-[220px]"
        onError={() => setFailed(true)}
        priority
      />
    </div>
  );
}
