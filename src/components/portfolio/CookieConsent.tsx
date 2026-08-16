import { useEffect, useState } from "react";
import { getConsent, initAnalyticsIfConsented, setConsent } from "@/lib/analytics";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    initAnalyticsIfConsented();
    if (!getConsent()) setShow(true);
  }, []);

  if (!show) return null;

  const choose = (value: "accepted" | "declined") => {
    setConsent(value);
    setShow(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm rounded-lg border border-border bg-card p-4 shadow-lg max-[420px]:right-4 max-[420px]:left-4">
      <p className="text-sm text-muted-foreground">
        This site uses analytics cookies to understand visitor traffic.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("declined")}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
