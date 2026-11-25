/**
 * Minimalist N700S / E5-inspired Shinkansen silhouette riding flush along the
 * slanted black diagonal border separating CH.00 (Hero) from CH.01 (About).
 * Pure CSS 10-second linear cycle (parked 0%–82%, ~1.8s bullet pass 82.1%–100%).
 */
export function ShinkansenPass() {
  return (
    <div aria-hidden="true" className="shinkansen-ridge-stage pointer-events-none">
      <div className="shinkansen-slope">
        <div className="shinkansen-runner">
          <svg
            className="shinkansen-svg"
            viewBox="0 0 420 26"
            fill="none"
            focusable="false"
            aria-hidden="true"
          >
            {/* 3 Thin Horizontal Manga Speed-Streaks Trailing Behind the Tail Car */}
            <rect x="2" y="10" width="48" height="1.2" fill="#060608" opacity="0.55" />
            <rect x="16" y="14.5" width="38" height="1.4" fill="#584CE6" opacity="0.8" />
            <rect x="8" y="19" width="44" height="1.1" fill="#060608" opacity="0.4" />

            {/* Car 1 (Streamlined Tail Car) */}
            <path d="M58 26 L68 12 Q78 7 94 7 L134 7 L134 26 Z" fill="#060608" />
            {/* Car 2 (Middle Coach) */}
            <rect x="136" y="7" width="76" height="19" fill="#060608" />
            {/* Low-profile high-speed pantograph shield on Car 2 roof */}
            <path d="M162 7 L168 4.2 L182 4.2 L186 7 Z" fill="#060608" />
            {/* Car 3 (Middle Coach) */}
            <rect x="214" y="7" width="76" height="19" fill="#060608" />
            <path d="M242 7 L247 4.4 L260 4.4 L264 7 Z" fill="#060608" />

            {/* Car 4 (Aerodynamic N700S / E5 Long Duckbill Lead Nose Car, traveling right) */}
            <path
              d="M292 7 L348 7 C368 7 382 12.5 398 16.5 C409 19.2 416 21.8 419 24.2 L419 26 L292 26 Z"
              fill="#060608"
            />

            {/* Subtle #584CE6 Electric-Violet Livery Waistline Sweeping Into the Nose */}
            <path
              d="M66 17.2 L396 17.2 L411 21.2 L394 18.6 L65 18.6 Z"
              fill="#584CE6"
            />

            {/* Crisp Horizontal Passenger Window Slits (#ECECF0) */}
            <g fill="#ECECF0">
              {/* Car 1 windows */}
              <rect x="86" y="11.5" width="7" height="2.2" />
              <rect x="97" y="11.5" width="7" height="2.2" />
              <rect x="108" y="11.5" width="7" height="2.2" />
              <rect x="119" y="11.5" width="7" height="2.2" />

              {/* Car 2 windows */}
              <rect x="143" y="11.5" width="7" height="2.2" />
              <rect x="154" y="11.5" width="7" height="2.2" />
              <rect x="165" y="11.5" width="7" height="2.2" />
              <rect x="176" y="11.5" width="7" height="2.2" />
              <rect x="187" y="11.5" width="7" height="2.2" />
              <rect x="198" y="11.5" width="7" height="2.2" />

              {/* Car 3 windows */}
              <rect x="221" y="11.5" width="7" height="2.2" />
              <rect x="232" y="11.5" width="7" height="2.2" />
              <rect x="243" y="11.5" width="7" height="2.2" />
              <rect x="254" y="11.5" width="7" height="2.2" />
              <rect x="265" y="11.5" width="7" height="2.2" />
              <rect x="276" y="11.5" width="7" height="2.2" />

              {/* Car 4 passenger windows + sleek driver cockpit canopy slit */}
              <rect x="299" y="11.5" width="7" height="2.2" />
              <rect x="310" y="11.5" width="7" height="2.2" />
              <rect x="321" y="11.5" width="7" height="2.2" />
              <rect x="332" y="11.5" width="7" height="2.2" />
              <path d="M352 9.8 L368 11.4 L365 13.4 L350 12.1 Z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ShinkansenPass;
