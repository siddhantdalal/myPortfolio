import { profile } from "@/content/profile";

export type Channel = "email" | "call" | "whatsapp";

const { email, phoneParts, whatsappGreeting, emailSubject, emailBody } = profile.contact;

/** Assembled on demand so the full number is never written into the page. */
export function phoneNumber(): string {
  return phoneParts.join("");
}

/** Human-readable form, e.g. "+91 73874 53882". */
export function displayPhone(): string {
  return phoneParts.join(" ");
}

export function mailtoUrl(): string {
  return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}

export function telUrl(): string {
  return `tel:${phoneNumber()}`;
}

/** wa.me expects the number as digits only, with the country code and no "+". */
export function whatsappUrl(): string {
  return `https://wa.me/${phoneNumber().replace(/\D/g, "")}?text=${encodeURIComponent(whatsappGreeting)}`;
}
