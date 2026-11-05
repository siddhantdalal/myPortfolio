import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { displayPhone, mailtoUrl, phoneNumber, telUrl, whatsappUrl } from "./contact";

describe("contact links", () => {
  it("assembles the phone number from its parts", () => {
    expect(phoneNumber()).toBe("+917387453882");
    expect(displayPhone()).toBe("+91 73874 53882");
    expect(telUrl()).toBe("tel:+917387453882");
  });

  it("builds a wa.me link with digits only and an encoded greeting", () => {
    const url = new URL(whatsappUrl());
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/917387453882");
    expect(url.searchParams.get("text")).toBe(profile.contact.whatsappGreeting);
  });

  it("builds a mailto link with an encoded subject", () => {
    expect(mailtoUrl()).toBe(`mailto:${profile.contact.email}?subject=Hello%20from%20your%20portfolio`);
  });
});
