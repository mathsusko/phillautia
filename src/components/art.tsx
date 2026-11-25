/**
 * Peças de desenho compartilhadas: a coluna grega e a geometria da lótus.
 * Usadas na abertura (prévia procedural) e na seção da lótus.
 */

/** Ângulo final de cada pétala, na ordem em que abrem (de fora para dentro). */
export const LOTUS_ANGLES = [-78, 78, -52, 52, -26, 26, 0];
/** Comprimento relativo de cada pétala aberta. */
export const LOTUS_LENGTHS = [0.78, 0.78, 0.9, 0.9, 0.98, 0.98, 1.05];

export const PETAL_PATH = "M0 0 C 46 -38 52 -150 0 -230 C -52 -150 -46 -38 0 0 Z";
export const VEIN_PATH = "M0 -8 C 6 -80 6 -150 0 -214";

/** Coluna dórica em traço fino (viewBox 0 0 120 400): ábaco, equino, fuste canelado e base. */
export function GreekColumn({ className }: { className?: string }) {
  const flutes = [-26, -17, -8.5, 0, 8.5, 17, 26];
  return (
    <g className={className}>
      <rect x="8" y="16" width="104" height="14" rx="1" />
      <path d="M18 30 Q60 50 102 30" />
      <path d="M22 30 C24 44 34 52 60 52 C86 52 96 44 98 30" />
      <rect x="24" y="52" width="72" height="8" />
      <path d="M26 60 L22 356 M94 60 L98 356" />
      {flutes.map((f) => (
        <path key={f} d={`M${60 + f * 0.95} 64 L${60 + f * 1.1} 352`} className="flute" />
      ))}
      <rect x="16" y="356" width="88" height="10" rx="5" />
      <rect x="6" y="366" width="108" height="16" />
    </g>
  );
}
