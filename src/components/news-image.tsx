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
  const validSource = typeof src === "string" && src.length > 0;
  const resolvedSource = failed || !validSource
    ? "/images/news-placeholder.svg"
    : src;
  return (
    <Image
      src={resolvedSource}
      alt={alt}
      fill
      sizes={sizes}
      preload={priority}
      unoptimized={resolvedSource.startsWith("http")}
      className="news-image"
      onError={() => setFailed(true)}
    />
  );
}
