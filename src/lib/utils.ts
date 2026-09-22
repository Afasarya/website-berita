import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import slugifyPackage from "slugify";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function slugify(value: string) { return slugifyPackage(value, { lower: true, strict: true, trim: true }); }
export function formatRelativeTime(value: string | Date) { return formatDistanceToNow(new Date(value), { addSuffix: true, locale: id }); }
export function stripHtml(value: string) { return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(); }
export function formatPublishedDate(value: string | null) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return `${new Intl.DateTimeFormat("id-ID", {
		dateStyle: "long",
		timeStyle: "short",
		timeZone: "Asia/Jakarta",
	}).format(date)} WIB`;
}
