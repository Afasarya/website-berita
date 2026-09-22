import DOMPurify from "isomorphic-dompurify";
import { stripHtml } from "@/lib/utils";

export const ARTICLE_MIN_TITLE = 15;
export const ARTICLE_MAX_TITLE = 120;
export const ARTICLE_MIN_CONTENT = 200;
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export function sanitizeArticleHtml(value: string) { return DOMPurify.sanitize(value, { ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "blockquote", "a"], ALLOWED_ATTR: ["href", "target", "rel"] }); }
export function validateArticleInput(input: { title?: unknown; content?: unknown; categoryId?: unknown; originality?: unknown }) { const title = typeof input.title === "string" ? input.title.trim() : ""; const content = typeof input.content === "string" ? input.content : ""; const categoryId = typeof input.categoryId === "string" ? input.categoryId : ""; const errors: Record<string, string> = {}; if (title.length < ARTICLE_MIN_TITLE || title.length > ARTICLE_MAX_TITLE) errors.title = "Judul harus 15–120 karakter."; if (stripHtml(content).length < ARTICLE_MIN_CONTENT) errors.content = "Konten minimal 200 karakter."; if (!categoryId) errors.categoryId = "Kategori wajib dipilih."; if (input.originality !== true) errors.originality = "Pernyataan orisinalitas wajib disetujui."; return { valid: Object.keys(errors).length === 0, errors, title, content: sanitizeArticleHtml(content), categoryId }; }
export function validateImage(file: File) { return IMAGE_TYPES.includes(file.type as typeof IMAGE_TYPES[number]) && file.size <= MAX_IMAGE_BYTES && /^[-a-zA-Z0-9_. ]+$/.test(file.name); }
