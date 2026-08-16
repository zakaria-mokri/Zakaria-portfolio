import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Download, FileText, X } from "lucide-react";

const CV_URL = "/zakaria-al-mokri-cv.pdf";

export function CvViewer() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

        const doc = await pdfjs.getDocument({ url: CV_URL }).promise;
        const host = containerRef.current;
        if (cancelled || !host) return;
        host.innerHTML = "";

        const width = Math.min(host.clientWidth - 32, 900);
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          const scale = width / base.width;
          const viewport = page.getViewport({ scale: scale * (window.devicePixelRatio || 1) });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${viewport.height / (window.devicePixelRatio || 1)}px`;
          canvas.className = "mx-auto mb-4 rounded-md border border-border bg-white shadow-sm";
          host.appendChild(canvas);
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport }).promise;
        }
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <FileText className="h-4 w-4" /> View CV
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground/60 p-3 sm:p-6"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="CV preview"
          >
            <div
              className="flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  Curriculum Vitae
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={CV_URL}
                    download="Zakaria-Al-Mokri-CV.pdf"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Download className="h-4 w-4" /> Download
                  </a>
                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-secondary sm:inline-flex"
                  >
                    Open in new tab
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close CV preview"
                    className="inline-flex items-center justify-center rounded-md border border-border p-2 transition-colors hover:bg-secondary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto bg-secondary p-4">
                {status === "loading" && (
                  <p className="py-10 text-center text-sm text-muted-foreground">Loading CV…</p>
                )}
                {status === "error" && (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    Couldn't render the preview.{" "}
                    <a href={CV_URL} target="_blank" rel="noreferrer" className="underline">
                      Open the PDF
                    </a>
                  </p>
                )}
                <div ref={containerRef} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
