import { portfolioData } from '../../data/portfolio';
import { OptimizedPicture } from '../ui/OptimizedPicture';
import { MangaThunder } from '../manga/MangaThunder';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { personal } = portfolioData;

  const navigate = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.(id);
  };

  return (
    <section
      id="hero"
      className="manga-chapter relative z-[11] flex min-h-[100svh] items-center overflow-x-clip bg-[#ECECF0] pb-[calc(var(--cut)+4.75rem)] pt-20 text-[#060608]"
    >
      {/* Back Layer: Subtle radial speedlines + oversized CH.00 & 零 formal Kanji watermarks */}
      <div aria-hidden="true" className="parallax-back pointer-events-none absolute inset-0 overflow-hidden">
        <div className="manga-speedlines absolute inset-0 text-[#060608]" />
        <span className="absolute -bottom-8 left-4 select-none font-display text-[clamp(9rem,21vw,19rem)] leading-none text-[#060608]/[0.04] sm:left-10 lg:left-14">
          00
        </span>
        <span className="kanji-watermark absolute -top-8 right-4 select-none font-kanji text-[clamp(9.5rem,22vw,21rem)] font-black leading-none text-[#060608] sm:right-10 lg:right-14">
          零
        </span>
      </div>

      {/* Architectural Vertical Kanji Stamp (領域 // 覚醒 — Domain / Awakening) near Hero outer margin */}
      <div
        aria-hidden="true"
        className="parallax-front pointer-events-none absolute right-5 top-[4.5rem] z-30 hidden items-start gap-2 md:flex lg:right-14 lg:top-[4.5rem]"
      >
        <span className="vertical-stamp pt-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.22em] text-[#4E4E57]">
          DOMAIN // AWAKENING
        </span>
        <span className="vertical-stamp border-r-2 border-[#584CE6] pr-2 font-kanji text-[clamp(1.3rem,1.85vw,1.9rem)] font-black leading-none tracking-[0.16em] text-[#584CE6]">
          領域覚醒
        </span>
      </div>

      <div className="container-site relative z-20 w-full">
        <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-6">
          {/* Left Cover Zone: Pure Oversized Display Name + Minimal Chapter Index */}
          <div className="parallax-mid relative z-20 lg:col-span-6">
            <div
              className="hero-cut-fade mb-5 flex items-center gap-3"
              style={{ '--d': '40ms' } as React.CSSProperties}
            >
              <span className="inline-block -rotate-2 bg-[#584CE6] px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                CH.00 // OPENING
              </span>
              <span
                aria-hidden="true"
                className="kanji-stamp font-kanji text-[#060608]"
              >
                零
              </span>
              <span
                aria-hidden="true"
                className="font-kanji text-xs font-black tracking-[0.18em] text-[#584CE6] md:hidden"
              >
                領域 // 覚醒
              </span>
            </div>

            <h1 aria-label={personal.name} className="uppercase tracking-[-0.035em] text-[#060608]">
              <span className="hero-line-mask">
                <span
                  style={{ '--d': '60ms' } as React.CSSProperties}
                  className="hero-line-rise text-[clamp(3.15rem,7.4vw,6.5rem)] leading-[0.9]"
                >
                  HANAN
                </span>
              </span>
              <span className="hero-line-mask">
                <span
                  style={{ '--d': '120ms' } as React.CSSProperties}
                  className="hero-line-rise text-[clamp(1.95rem,4.45vw,4rem)] leading-[0.92]"
                >
                  FATHURROZAQ
                </span>
              </span>
              <span className="hero-line-mask">
                <span
                  style={{ '--d': '180ms' } as React.CSSProperties}
                  className="hero-line-rise flex items-baseline gap-3 text-[clamp(1.8rem,4.1vw,3.65rem)] leading-[0.92]"
                >
                  <span>HIDAYATULLAH</span>
                  <span
                    aria-hidden="true"
                    className="-rotate-6 font-mono text-xs font-semibold tracking-[0.08em] text-[#584CE6] sm:text-sm"
                  >
                    //26
                  </span>
                </span>
              </span>
            </h1>
          </div>

          {/* Right Cover Zone: addo.jpg Centerpiece Enveloped in 3-Layer Manga Pressure Aura */}
          <div className="relative z-10 lg:col-span-6">
            <figure className="relative mx-auto max-w-2xl lg:mx-0 lg:-ml-8 lg:max-w-none lg:w-[calc(100%+2.5rem)]">
              {/* Layer 1 & 2: Breathing Halftone/Speedline Pressure Field + 6 Perimeter Ink Shards */}
              <div aria-hidden="true" className="manga-aura pointer-events-none">
                <div className="aura-pressure">
                  <div className="manga-halftone aura-halftone absolute inset-0 text-[#060608]" />
                  <div className="manga-speedlines aura-speedlines absolute inset-0 text-[#060608]" />
                </div>

                {/* 6 razor-sharp rising ink/violet shards around the outer silhouette (3 on mobile) */}
                <span className="aura-wisp aura-wisp-1" />
                <span className="aura-wisp aura-wisp-2" />
                <span className="aura-wisp aura-wisp-3" />
                <span className="aura-wisp aura-wisp-4" />
                <span className="aura-wisp aura-wisp-5" />
                <span className="aura-wisp aura-wisp-6" />
              </div>

              {/* Seamlessly Blended addo.jpg Centerpiece */}
              <div className="hero-opening-slice hero-art-mask relative z-10 aspect-[16/9.4] w-full overflow-hidden bg-[#ECECF0]">
                <OptimizedPicture
                  src={personal.profileImage}
                  alt={`${personal.name} — Opening manga illustration`}
                  width={736}
                  height={414}
                  eager
                  fetchPriority="high"
                  className="hero-opening-punch h-full w-full object-cover [object-position:55%_35%] contrast-[1.06]"
                />
              </div>

              {/* Layer 3: Intermittent Asymmetrical Manga Lightning Crackle Along Silhouette Edge */}
              <MangaThunder
                variant="bolt"
                tone="ink"
                delay={1.1}
                className="hero-aura-thunder hero-aura-thunder-a"
              />
              <MangaThunder
                variant="arc"
                tone="ink"
                delay={3.7}
                className="hero-aura-thunder hero-aura-thunder-b"
              />
            </figure>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator at Bottom Edge (Hairline + SCROLL + ↓) */}
      <a
        href="#about"
        onClick={navigate('about')}
        aria-label="Scroll down to About chapter"
        className="hero-scroll-cue absolute bottom-[calc(var(--cut)+1.15rem)] left-1/2 z-30 flex min-h-11 min-w-14 -translate-x-1/2 flex-col items-center justify-end gap-1.5 px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4E4E57] hover:text-[#584CE6]"
      >
        <span aria-hidden="true" className="hero-scroll-hairline" />
        <span>SCROLL</span>
        <span aria-hidden="true" className="hero-scroll-arrow leading-none">↓</span>
      </a>
    </section>
  );
}

export default Hero;
