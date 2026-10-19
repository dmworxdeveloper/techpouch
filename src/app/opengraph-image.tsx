import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Tech Pouch — tech accessories manufacturer for retail and wholesale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/brand/tech-pouch-logo-light.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

/** Default social-sharing image for pages without their own. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b1f3f",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} width={466} height={84} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>Tech Accessories Manufacturer</div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: "#5b8dff" }}>for Retail &amp; Wholesale</div>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          Tablet Covers • Mouse Pads • Wholesale Supply • Custom Manufacturing
        </div>
      </div>
    ),
    size,
  );
}
