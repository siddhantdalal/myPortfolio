import Image from "next/image";
import photo from "@/assets/siddhant.jpg";
import { profile } from "@/content/profile";

/**
 * Round headshot. `openToWork` adds a green ring, the cue recruiters already know from LinkedIn.
 * Imported statically, so Next.js fingerprints it and adds the Pages base path itself.
 */
export function Portrait({
  size,
  openToWork = false,
  priority = false,
  className = "",
}: {
  /** Largest size it is shown at, in CSS px. */
  size: number;
  openToWork?: boolean;
  priority?: boolean;
  /** Sizing classes for the image, e.g. to shrink it on phones; defaults to `size`. */
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 rounded-full ${
        openToWork ? "p-[3px] ring-2 ring-ok ring-offset-2 ring-offset-bg" : ""
      }`}
    >
      <Image
        src={photo}
        alt={`Photo of ${profile.name}`}
        width={size}
        height={size}
        priority={priority}
        sizes={`${size}px`}
        className={`rounded-full object-cover ${className}`}
        style={className ? undefined : { width: size, height: size }}
      />
    </span>
  );
}
