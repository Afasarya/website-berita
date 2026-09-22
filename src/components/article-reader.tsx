"use client";
import { useEffect, useRef, useState } from "react";
import { Share2, Check, Minus, Plus, Clock3 } from "lucide-react";
import type { Article } from "@/lib/news-types";
import { readingMinutes } from "@/lib/news-types";
import { BookmarkButton } from "./saved-news";
export function ArticleReader({
  article,
  html,
}: {
  article: Article;
  html: string;
}) {
  const [fontSize, setFontSize] = useState(18);
  const [shareStatus, setShareStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function update() {
      if (!content.current) return;
      const rect = content.current.getBoundingClientRect();
      setProgress(
        Math.max(
          0,
          Math.min(
            100,
            ((window.innerHeight * 0.35 - rect.top) / rect.height) * 100,
          ),
        ),
      );
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url: location.href });
      } else {
        await navigator.clipboard.writeText(location.href);
        setShareStatus("Tautan disalin");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setShareStatus("Salin tautan dari bilah alamat untuk membagikan.");
    }
  }
  return (
    <>
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div className="reader-toolbar">
        <span className="reading-time">
          <Clock3 size={15} />
          {readingMinutes(article.content)} menit baca
        </span>
        <div>
          <div className="font-controls">
            <button
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              disabled={fontSize <= 16}
              aria-label="Perkecil teks"
            >
              <Minus size={13} />
            </button>
            <span>Aa</span>
            <button
              onClick={() => setFontSize(Math.min(26, fontSize + 2))}
              disabled={fontSize >= 26}
              aria-label="Perbesar teks"
            >
              <Plus size={13} />
            </button>
          </div>
          <BookmarkButton article={article} labeled />
          <button className="share-button" onClick={share}>
            {shareStatus === "Tautan disalin" ? (
              <Check size={16} />
            ) : (
              <Share2 size={16} />
            )}{" "}
            Bagikan
          </button>
        </div>
      </div>
      {shareStatus && (
        <p className="share-status" role="status">
          {shareStatus}
        </p>
      )}
      <div
        ref={content}
        className="article-body"
        style={{ fontSize }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
