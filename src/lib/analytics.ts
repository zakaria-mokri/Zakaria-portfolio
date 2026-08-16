/**
 * GDPR-compliant analytics helper.
 *
 * Nothing is loaded or sent until the visitor clicks "Accept" in the cookie
 * banner. The choice is stored in localStorage under CONSENT_KEY.
 *
 * MANUAL STEP: set VITE_GA_MEASUREMENT_ID (G-XXXXXXXXXX) in your env.
 */

export const CONSENT_KEY = "za-analytics-consent";
export type ConsentValue = "accepted" | "declined";

const GA_ID = "G-GZW5SLFMD6";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function setConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
  if (value === "accepted") initAnalytics();
}

/** One-line-ish device/OS/browser detection from the user agent. */
export function detectDevice() {
  const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
  const device = /iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)
    ? "Tablet"
    : /Mobi|Android|iPhone|iPod/i.test(ua)
      ? "Mobile"
      : "Desktop";
  const os = /iPhone|iPad|iPod/i.test(ua)
    ? "iOS"
    : /Android/i.test(ua)
      ? "Android"
      : /Mac OS X/i.test(ua)
        ? "macOS"
        : /Windows/i.test(ua)
          ? "Windows"
          : /Linux/i.test(ua)
            ? "Linux"
            : "Unknown";
  const browser = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\//i.test(ua)
      ? "Opera"
      : /Chrome\//i.test(ua)
        ? "Chrome"
        : /Firefox\//i.test(ua)
          ? "Firefox"
          : /Safari\//i.test(ua)
            ? "Safari"
            : "Unknown";
  return { device, os, browser };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Injects gtag.js and sends the device event. Only call after consent. */
export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  if (getConsent() !== "accepted") return;
  if (!GA_ID) {
    console.info("[analytics] VITE_GA_MEASUREMENT_ID is not set — skipping GA4.");
    return;
  }
  initialized = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });

  const { device, os, browser } = detectDevice();
  window.gtag("event", "device_info", {
    device_type: device,
    user_os: os,
    browser,
  });
}

/** Re-initialise on load if consent was already granted in a past visit. */
export function initAnalyticsIfConsented() {
  if (getConsent() === "accepted") initAnalytics();
}
