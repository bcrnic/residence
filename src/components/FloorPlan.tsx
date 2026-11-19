import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface FloorPlanProps {
  rooms: number;
  size: number;
  className?: string;
  /** Hide room labels (for small previews). */
  compact?: boolean;
}

type Room = { key: string; sr: string; en: string; weight: number };

const W = 480;
const H = 300;
const PAD = 14;
const TERRACE_H = 44;

const room = (key: string, sr: string, en: string, weight: number): Room => ({ key, sr, en, weight });

/** Schematic layout per apartment type: a sleeping row on top, day zone on the bottom. */
const layoutFor = (rooms: number) => {
  const bedrooms = Math.max(1, Math.floor(rooms) - 1);
  const top: Room[] = [];
  for (let i = 0; i < bedrooms; i++) {
    top.push(room(`bed${i}`, i === 0 && bedrooms > 1 ? "Master soba" : "Soba", i === 0 && bedrooms > 1 ? "Master bedroom" : "Bedroom", i === 0 ? 1.15 : 1));
  }
  if (rooms % 1 !== 0) top.push(room("study", "Kabinet", "Study", 0.62));
  top.push(room("bath", "Kupatilo", "Bathroom", 0.55));

  const bottom: Room[] = [room("hall", "Hodnik", "Hall", 0.42)];
  if (rooms >= 4) bottom.push(room("wc", "Toalet", "WC", 0.3));
  bottom.push(room("living", "Dnevna soba s kuhinjom", "Living & kitchen", rooms >= 4 ? 2.2 : 1.7));
  return { top, bottom };
};

const fmt = (n: number) => n.toFixed(1).replace(".", ",");

/** Clean schematic floor plan generated from the apartment's room count and size. */
const FloorPlan = ({ rooms, size, className, compact = false }: FloorPlanProps) => {
  const { lang } = useLanguage();
  const { top, bottom } = layoutFor(rooms);

  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2 - TERRACE_H;
  const topH = innerH * 0.52;
  const botH = innerH - topH;

  // Terrace counts roughly at half value in the quoted area, so keep it out of the split
  const terraceArea = size * 0.09;
  const interior = size - terraceArea;
  const totalArea = innerW * innerH;

  const place = (row: Room[], y: number, h: number) => {
    const sum = row.reduce((s, r) => s + r.weight, 0);
    let x = PAD;
    return row.map((r) => {
      const w = (innerW * r.weight) / sum;
      const rect = { ...r, x, y, w, h, area: (interior * (w * h)) / totalArea };
      x += w;
      return rect;
    });
  };

  const rects = [...place(top, PAD, topH), ...place(bottom, PAD + topH, botH)];
  const label = (r: Room) => (lang === "sr" ? r.sr : r.en);
  const wall = "currentColor";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("w-full h-auto text-foreground", className)}
      role="img"
      aria-label={lang === "sr" ? `Šematska osnova stana, ${size} m²` : `Schematic floor plan, ${size} m²`}
    >
      {/* Terrace */}
      <rect
        x={PAD + innerW * 0.3}
        y={PAD + innerH}
        width={innerW * 0.7}
        height={TERRACE_H - 6}
        fill="none"
        stroke={wall}
        strokeOpacity={0.45}
        strokeDasharray="4 4"
      />
      {!compact && (
        <text x={PAD + innerW * 0.65} y={PAD + innerH + TERRACE_H / 2 + 1} textAnchor="middle" className="fill-current" fontSize="10" letterSpacing="1.5" opacity={0.6}>
          {(lang === "sr" ? "TERASA " : "TERRACE ") + fmt(terraceArea)} m²
        </text>
      )}

      {/* Rooms */}
      {rects.map((r) => (
        <g key={r.key}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke={wall} strokeWidth={2} />
          {!compact && (
            <>
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 - 2} textAnchor="middle" className="fill-current" fontSize={r.w < 70 ? 8 : 10} letterSpacing="1" style={{ textTransform: "uppercase" }}>
                {r.w < 70 && label(r).length > 8 ? label(r).slice(0, 7) + "." : label(r)}
              </text>
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 12} textAnchor="middle" className="fill-current" fontSize="9" opacity={0.55}>
                {fmt(r.area)} m²
              </text>
            </>
          )}
        </g>
      ))}

      {/* Doors from the sleeping row into the hall/day zone */}
      {rects
        .filter((r) => r.y === PAD && r.w > 40)
        .map((r) => {
          const dx = r.x + 10;
          const dy = PAD + topH;
          return (
            <g key={`door-${r.key}`} stroke={wall} strokeWidth={1} fill="none" opacity={0.7}>
              <line x1={dx} y1={dy} x2={dx + 22} y2={dy} stroke="hsl(var(--background))" strokeWidth={3} />
              <path d={`M ${dx} ${dy} L ${dx} ${dy - 22} A 22 22 0 0 1 ${dx + 22} ${dy}`} />
            </g>
          );
        })}

      {/* Outer walls */}
      <rect x={PAD} y={PAD} width={innerW} height={innerH} fill="none" stroke={wall} strokeWidth={5} />

      {/* Windows on the outer wall of each room */}
      {rects
        .filter((r) => r.y === PAD)
        .map((r) => (
          <g key={`win-${r.key}`} stroke="hsl(var(--background))" strokeWidth={5}>
            <line x1={r.x + r.w * 0.3} y1={PAD} x2={r.x + r.w * 0.7} y2={PAD} />
            <line x1={r.x + r.w * 0.3} y1={PAD} x2={r.x + r.w * 0.7} y2={PAD} stroke={wall} strokeWidth={1} />
          </g>
        ))}
    </svg>
  );
};

export default FloorPlan;
