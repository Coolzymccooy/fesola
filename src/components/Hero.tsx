import React, { useEffect, useMemo, useState } from "react";

interface Props {
  onApplyClick: () => void;
  onContactClick: () => void;
  onGalleryClick: () => void;
}

/**
 * ✅ Vite/React image rules:
 * - If images live in /public/images -> use "/images/xxx.jpg"
 * - If images live in /src/assets -> import them instead of string paths
 */
type HeroImage = { src: string; alt: string };

const Hero: React.FC<Props> = ({ onApplyClick, onContactClick, onGalleryClick }) => {
  const HERO_IMAGES: HeroImage[] = useMemo(
    () => [
      { src: "/images/landing-1.jpg", alt: "Fesola International Students" },
      { src: "/images/landing-2.jpg", alt: "Community & Leadership" },
      { src: "/images/landing-3.jpg", alt: "Traditional Classroom Life" },
      { src: "/images/landing-4.jpg", alt: "Celebrations & Joy" },
      // add more if you want (thumbnails uses first 4)
    ],
    []
  );

  const [active, setActive] = useState(0);

  // optional: auto-rotate images gently (comment out if you don’t want it)
  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [HERO_IMAGES.length]);

  const activeImg = HERO_IMAGES[active];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[90px]" />
        <div className="absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-sky-400/10 blur-[110px]" />
      </div>

      {/* container */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14 pt-10 md:pt-14 pb-16 md:pb-20">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-7 md:space-y-9 text-center lg:text-left">
            <div className="mx-auto lg:mx-0 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-blue-50/40 px-4 py-2 text-blue-950 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-[10px] md:text-[11px] font-black tracking-[0.28em] uppercase">
                Academic Excellence & Uprightness
              </span>
            </div>

            <div className="space-y-3">
              {/* reduced sizes so it isn’t “too enlarged” */}
              <h1 className="serif font-black tracking-tight leading-[0.95] text-blue-950 text-[2.6rem] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[4.4rem]">
                Nurturing{" "}
                <span className="text-blue-700 italic">Global Leaders.</span>
              </h1>
              <p className="mx-auto lg:mx-0 max-w-xl text-slate-500 text-base md:text-lg leading-relaxed font-semibold italic">
                Building a good start in the formative years. We empower children to cope
                with subsequent school life with ease and advantage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 pt-2">
              <button
                onClick={onApplyClick}
                className="rounded-2xl bg-blue-700 px-7 md:px-9 py-4 md:py-4.5 text-white font-black text-[11px] tracking-[0.28em] uppercase shadow-xl hover:bg-blue-900 active:scale-[0.98] transition"
              >
                Apply for Admission
              </button>

              <button
                onClick={onContactClick}
                className="rounded-2xl bg-white/80 border border-slate-200 px-7 md:px-9 py-4 md:py-4.5 text-slate-900 font-black text-[11px] tracking-[0.28em] uppercase shadow-sm hover:bg-white hover:border-blue-200 active:scale-[0.98] transition"
              >
                Contact Admissions
              </button>

              <button
                onClick={onGalleryClick}
                className="rounded-2xl bg-white/80 border border-blue-200 px-7 md:px-9 py-4 md:py-4.5 text-blue-900 font-black text-[11px] tracking-[0.28em] uppercase shadow-sm hover:bg-white hover:border-blue-300 active:scale-[0.98] transition"
              >
                View Gallery
              </button>
            </div>
          </div>

          {/* RIGHT (smaller + multiple images) */}
          <div className="relative">
            {/* main “card” */}
            <div className="relative mx-auto lg:ml-auto w-full max-w-[380px] sm:max-w-[420px] md:max-w-[480px]">
              <div className="relative overflow-hidden rounded-[2.2rem] md:rounded-[2.8rem] border border-white/70 bg-white/50 shadow-2xl backdrop-blur-xl">
                {/* main image */}
              {/* main image */}
<div className="relative aspect-[16/10] md:aspect-[16/9] bg-slate-100">
  <img
    key={activeImg?.src}
    src={activeImg?.src}
    alt={activeImg?.alt}
    className="absolute inset-0 h-full w-full object-cover object-center"
    loading="eager"
    decoding="async"
    onError={(e) => {
      (e.target as HTMLImageElement).src =
        "https://images.unsplash.com/photo-1577891772447-b335b8ff3bc2?q=80&w=1600&auto=format&fit=crop";
    }}
  />
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-white/20" />
</div>
{/* bottom tag — compact & elegant */}
<div className="absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-4 z-30 w-[78%] md:w-[68%] max-w-[420px]">
  
  {/* subtle scrim (lighter than before) */}
  <div className="absolute inset-x-0 -top-8 h-16 rounded-[1.5rem] bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

  <div className="relative rounded-[1.4rem] md:rounded-[2rem]
                  bg-white/88 backdrop-blur-lg
                  px-6 md:px-8 py-3 md:py-4
                  text-center
                  border border-white/70
                  shadow-[0_12px_30px_rgba(0,0,0,0.18)]">

    <div className="text-[8px] md:text-[9px]
                    text-blue-700 font-black
                    tracking-[0.4em]
                    uppercase opacity-75">
      FOUNDATION
    </div>

    <div
      className="mt-1
                 text-[1.4rem] md:text-[2rem]
                 font-black text-blue-950
                 serif uppercase italic
                 tracking-tight leading-none"
      style={{
        textShadow: "0 6px 18px rgba(0,0,0,.25)",
      }}
    >
      UPRIGHTNESS
    </div>
  </div>
</div>
              </div>

              {/* mini image strip */}
              <div className="mt-4 md:mt-5 grid grid-cols-4 gap-3">
                {HERO_IMAGES.slice(0, 4).map((img, idx) => {
                  const isActive = idx === active;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={[
                        "group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-blue-300",
                        isActive
                          ? "border-blue-300 ring-2 ring-blue-200"
                          : "border-slate-200 hover:border-blue-200",
                      ].join(" ")}
                      aria-label={`Show image ${idx + 1}`}
                    >
                      <div className="aspect-square bg-slate-100">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1577891772447-b335b8ff3bc2?q=80&w=800&auto=format&fit=crop";
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* tiny hint */}
              <div className="mt-3 text-center lg:text-right text-[11px] font-semibold text-slate-400">
                Tap thumbnails to switch images
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
