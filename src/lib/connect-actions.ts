import { profile } from "@/content/profile";
import { type Channel, displayPhone, mailtoUrl, phoneNumber, telUrl, whatsappUrl } from "./contact";
import { showToast } from "./toast";

/**
 * Opens a contact channel and confirms it with a toast styled as the API call it pretends to be.
 * The channel opens straight from the click handler (never after a delay), so pop-up blockers allow it.
 */
export function openChannel(channel: Channel) {
  const request = { text: `$ POST /connect {"channel":"${channel}"}`, tone: "command" } as const;

  switch (channel) {
    case "email":
      window.location.href = mailtoUrl();
      showToast([request, { text: "302 Found → opening your mail app", tone: "success" }]);
      return;

    case "whatsapp":
      window.open(whatsappUrl(), "_blank", "noopener,noreferrer");
      showToast([request, { text: "302 Found → wa.me", tone: "success" }]);
      return;

    case "call":
      // Phones can dial directly; on a laptop a tel: link usually does nothing useful, so copy instead.
      if (window.matchMedia("(pointer: coarse)").matches) {
        window.location.href = telUrl();
        showToast([request, { text: "302 Found → dialling", tone: "success" }]);
      } else {
        copyText(phoneNumber(), [request, { text: `200 OK · copied ${displayPhone()}`, tone: "success" }]);
      }
      return;
  }
}

export function copyEmail() {
  copyText(profile.contact.email, [
    { text: "$ copy email", tone: "command" },
    { text: `200 OK · ${profile.contact.email}`, tone: "success" },
  ]);
}

function copyText(text: string, onSuccess: Parameters<typeof showToast>[0]) {
  const fallback = () => showToast([{ text: `Couldn't copy, here it is: ${text}`, tone: "muted" }], 6000);
  // The Clipboard API is missing on insecure origins and some embedded browsers.
  if (!navigator.clipboard) return fallback();
  navigator.clipboard.writeText(text).then(() => showToast(onSuccess), fallback);
}
