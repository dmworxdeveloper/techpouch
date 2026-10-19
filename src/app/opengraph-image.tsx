import { ImageResponse } from "next/og";

export const alt = "Tech Pouch — tablet covers, mouse pads and custom manufacturing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0a1426",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#1f55f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            TP
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>Tech Pouch</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>Precision-Made Accessories.</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, color: "#7fa4ff" }}>
            Built for Your Brand.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          Tablet Covers • Mouse Pads • Wholesale Supply • Custom Manufacturing
        </div>
      </div>
    ),
    size,
  );
}
