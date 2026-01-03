import React, { useEffect, useMemo, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

/** Loads Instagram embed.js once and lets you re-process embeds. */
function useInstagramEmbed() {
  useEffect(() => {
    const SCRIPT_ID = "instagram-embed-script";
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    const process = () => window.instgrm?.Embeds?.process?.();

    if (existing) {
      // Script already present — just process current embeds
      process();
      return;
    }

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.defer = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = () => process();
    document.body.appendChild(s);
  }, []);
}

/** One post embed (permalink only). */
const InstagramPost: React.FC<{ permalink: string }> = ({ permalink }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-process when this component mounts/updates
    window.instgrm?.Embeds?.process?.();
  }, [permalink]);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-sky-100 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,132,199,0.14)] overflow-hidden"
    >
      <div className="p-4 sm:p-5">
        {/* IMPORTANT: blockquote is required; script turns it into the real embed */}
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={permalink}
          data-instgrm-version="14"
          style={{
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            background: "transparent",
            border: 0,
          }}
        />
      </div>
    </div>
  );
};

const SocialSection: React.FC = () => {
  useInstagramEmbed();

  // Put 1–6 permalinks here (these are real posts, NOT the handle)
  const posts = useMemo(
    () => [
      "https://www.instagram.com/p/DFiJkwPtJ7U/",
      // add more if you want a grid:
      // "https://www.instagram.com/p/XXXXXXXXXXX/",
      // "https://www.instagram.com/p/YYYYYYYYYYY/",
    ],
    []
  );

  return (
    <section className="relative w-full py-20 sm:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sky-200/40 blur-[120px]" />
        <div className="absolute -bottom-44 right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-200/30 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 6.838c-2.84 0-5.162 2.322-5.162 5.162S9.16 17.162 12 17.162 17.162 14.84 17.162 12 14.84 6.838 12 6.838zm0 8.324A3.166 3.166 0 1 1 15.166 12 3.17 3.17 0 0 1 12 15.162z" />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                Live from <span className="bg-gradient-to-r from-sky-600 to-fuchsia-600 bg-clip-text text-transparent">Instagram</span>
              </h2>
            </div>

            <p className="mt-3 text-slate-600">
              Follow{" "}
              <a
                href="https://www.instagram.com/fesolaint.school/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky-600 hover:text-sky-700"
              >
                @fesolaint.school
              </a>{" "}
              for real moments from our school community.
            </p>
          </div>

          <a
            href="https://www.instagram.com/fesolaint.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-7 py-3 text-sm font-bold tracking-wide
                       border border-sky-200 bg-white/70 backdrop-blur-xl text-sky-700
                       shadow-[0_12px_30px_rgba(2,132,199,0.15)]
                       hover:bg-sky-600 hover:text-white hover:border-sky-600 transition active:scale-[0.98]"
          >
            FOLLOW US
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((permalink) => (
            <InstagramPost key={permalink} permalink={permalink} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
