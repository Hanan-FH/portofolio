const MIDDLE_CAR_STARTS = [234, 458, 682, 906, 1130, 1354] as const;
const GANGWAY_STARTS = [230, 454, 678, 902, 1126, 1350, 1574] as const;
const MIDDLE_WINDOW_OFFSETS = [18, 40, 62, 84, 106, 128, 150, 172, 194] as const;
const TAIL_WINDOW_XS = [116, 138, 160, 182, 204] as const;
const LEAD_WINDOW_XS = [1594, 1616, 1638, 1660] as const;

/**
 * Full 8-Car N700S / E5-inspired High-Speed Shinkansen Silhouette
 * riding flush along the slanted black diagonal border separating CH.00 (Hero) from CH.01 (About).
 * Pure CSS 10-second linear cycle (~1.4s high-speed flyby from 86% to 100%).
 */
export function ShinkansenPass() {
  return (
    <div aria-hidden="true" className="shinkansen-ridge-stage pointer-events-none">
      <div className="shinkansen-slope">
        <div className="shinkansen-runner">
          <svg
            className="shinkansen-svg"
            viewBox="0 0 1840 64"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            focusable="false"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="shinkansen-headlight" x1="1792" y1="55" x2="1840" y2="55" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 3 Razor-Thin Horizontal Wind-Shear Speedlines Trailing Behind Car 8 */}
            <rect x="0" y="30" width="48" height="1.5" fill="#060608" opacity="0.58" />
            <rect x="8" y="38.5" width="42" height="1.8" fill="#584CE6" opacity="0.9" />
            <rect x="2" y="47" width="36" height="1.4" fill="#060608" opacity="0.44" />

            {/* Car 8 (Tail Car, x: 0..230 — Tapered Aerodynamic Rear Nose) */}
            <path
              d="M28 64 L28 61.5 C42 54.5 64 43.5 88 33.5 C104 27 118 25 136 25 L230 25 L230 64 Z"
              fill="#060608"
            />

            {/* 7 Dark Articulated Gangway Connectors (4px–6px dark bellows) */}
            <g fill="#121218">
              {GANGWAY_STARTS.map((gx) => (
                <rect key={gx} x={gx} y="27.5" width={gx === 1574 ? 6 : 4} height="36.5" />
              ))}
            </g>
            {/* Solid bottom track skirt seam so zero light ever leaks through gangway bases */}
            <rect x="228" y="58" width="1354" height="6" fill="#060608" />

            {/* Cars 7 to 2 (6 Middle Cars, 220px each) */}
            <g fill="#060608">
              {MIDDLE_CAR_STARTS.map((cx) => (
                <rect key={cx} x={cx} y="25" width="220" height="39" />
              ))}
            </g>

            {/* Single-Arm Pantographs on Roofs of Car 6 (index 1, x: 460) and Car 2 (index 5, x: 1356) */}
            {/* Car 6 Aerodynamic Pantograph Shroud + Single-Arm Collector + #584CE6 Contact Sparks */}
            <g>
              <path d="M568 25 L576 21.2 L616 21.2 L624 25 Z" fill="#060608" />
              <path
                d="M598 21.5 L585 14 L601 8.2 M593 8.2 L609 8.2"
                stroke="#060608"
                strokeWidth="2.1"
                strokeLinecap="butt"
                strokeLinejoin="bevel"
              />
              <polygon points="601,3.5 604.5,6.8 601,10.1 597.5,6.8" fill="#584CE6" />
              <rect x="606.5" y="4.5" width="5.5" height="1.5" transform="rotate(-18 606.5 4.5)" fill="#584CE6" />
              <rect x="591.5" y="5.2" width="4.8" height="1.4" transform="rotate(20 591.5 5.2)" fill="#584CE6" />
              <circle cx="601" cy="6.8" r="1.1" fill="#FFFFFF" />
            </g>

            {/* Car 2 Aerodynamic Pantograph Shroud + Single-Arm Collector + #584CE6 Contact Sparks */}
            <g>
              <path d="M1432 25 L1440 21.2 L1480 21.2 L1488 25 Z" fill="#060608" />
              <path
                d="M1454 21.5 L1467 14 L1451 8.2 M1443 8.2 L1459 8.2"
                stroke="#060608"
                strokeWidth="2.1"
                strokeLinecap="butt"
                strokeLinejoin="bevel"
              />
              <polygon points="1451,3.5 1454.5,6.8 1451,10.1 1447.5,6.8" fill="#584CE6" />
              <rect x="1456.5" y="4.5" width="5.5" height="1.5" transform="rotate(-18 1456.5 4.5)" fill="#584CE6" />
              <rect x="1441.5" y="5.2" width="4.8" height="1.4" transform="rotate(20 1441.5 5.2)" fill="#584CE6" />
              <circle cx="1451" cy="6.8" r="1.1" fill="#FFFFFF" />
            </g>

            {/* Car 1 (Lead Nose Car, x: 1580..1840 — Long Aerodynamic Duckbill Nose + Headlight Flare) */}
            <path
              d="M1580 25 L1676 25 C1694 25 1708 28.5 1724 34.5 C1750 44 1778 51.5 1800 59.5 L1804 62 L1804 64 L1580 64 Z"
              fill="#060608"
            />

            {/* Subtle White Headlight Beam Flare Projecting Ahead (linear-gradient triangle, opacity 0.25) */}
            <polygon
              points="1791,56.2 1840,45.5 1840,63.5"
              fill="url(#shinkansen-headlight)"
              opacity="0.25"
            />
            <path d="M1782 54.2 L1794 56.6 L1791 58.2 L1780 56.1 Z" fill="#FFFFFF" opacity="0.92" />

            {/* Continuous Razor-Thin #584CE6 Livery Stripe Below the Windows + Tail Marker Dot */}
            <circle cx="58" cy="50" r="2.3" fill="#584CE6" />
            <path
              d="M68 44.2 L1750 44.2 L1784 54.8 L1748 46.2 L66 46.2 Z"
              fill="#584CE6"
            />

            {/* Crisp #ECECF0 Passenger Windows (height: 7px) + Rear & Lead Cockpit Slits */}
            <g fill="#ECECF0">
              {/* Car 8 rear canopy slit + passenger window strip */}
              <path d="M90 33.8 L108 30.2 L110 34.8 L93 37.5 Z" />
              {TAIL_WINDOW_XS.map((wx) => (
                <rect key={wx} x={wx} y="33" width="13" height="7" rx="1" />
              ))}

              {/* Cars 7 to 2 uniform passenger windows (height: 7px) */}
              {MIDDLE_CAR_STARTS.map((cx) =>
                MIDDLE_WINDOW_OFFSETS.map((off) => (
                  <rect key={`${cx}-${off}`} x={cx + off} y="33" width="13" height="7" rx="1" />
                ))
              )}

              {/* Car 1 passenger windows + angled Shinkansen cockpit windshield slit */}
              {LEAD_WINDOW_XS.map((wx) => (
                <rect key={wx} x={wx} y="33" width="13" height="7" rx="1" />
              ))}
              <path d="M1686 28.5 L1714 33.5 L1709 38.2 L1683 33.8 Z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ShinkansenPass;
