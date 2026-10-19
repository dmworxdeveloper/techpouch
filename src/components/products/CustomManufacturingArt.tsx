import { Layers, PenTool, Ruler } from "lucide-react";

/**
 * Illustrated "blueprint" tile for the custom manufacturing card. Used instead of a
 * photo so the site doesn't imply specific custom work that hasn't been shown yet.
 */
export function CustomManufacturingArt() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] overflow-hidden bg-navy-800 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:18px_18px]"
    >
      <div className="absolute inset-[16%] rounded-lg border-2 border-dashed border-brand-300/70" />
      <div className="absolute top-[9%] left-[16%] right-[16%] flex items-center gap-1 text-[10px] font-medium text-brand-200">
        <span className="h-px flex-1 bg-brand-300/60" />
        W
        <span className="h-px flex-1 bg-brand-300/60" />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex gap-3">
          {[Ruler, PenTool, Layers].map((Icon, i) => (
            <span
              key={i}
              className="grid size-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Icon className="size-5" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
