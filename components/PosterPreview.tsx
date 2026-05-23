"use client";

type PosterPreviewProps = {
  svg: string;
  title?: string;
  className?: string;
};

export function PosterPreview({ svg, title = "龙潭祈愿海报预览", className = "" }: PosterPreviewProps) {
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/78 p-3 shadow-glow sm:p-4 ${className}`}>
      <img src={src} alt={title} className="h-auto w-full rounded-[1.25rem]" />
    </div>
  );
}
