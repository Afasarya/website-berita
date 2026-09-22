"use client";
import Image from "next/image";
import { useState } from "react";
export function NewsImage({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, 33vw",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed || !src ? "/images/news-placeholder.svg" : src}
      alt={alt}
      fill
      sizes={sizes}
      preload={priority}
      unoptimized={src.startsWith("http")}
      className="news-image"
      onError={() => setFailed(true)}
    />
  );
}
