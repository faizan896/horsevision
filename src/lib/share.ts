export interface ShareCardData {
  breedName: string;
  confidence: number;
  type: string;
  origin: string;
  imageUrl: string | null;
}

/**
 * Renders a high-resolution, on-brand share card to a PNG data URL using canvas.
 * No external dependency required.
 */
export async function generateShareCard(data: ShareCardData): Promise<string> {
  const W = 1200;
  const H = 630;
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.scale(scale, scale);

  // background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#140d09");
  bg.addColorStop(1, "#241b16");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ember glow
  const glow = ctx.createRadialGradient(W - 200, 120, 0, W - 200, 120, 420);
  glow.addColorStop(0, "rgba(217,98,43,0.35)");
  glow.addColorStop(1, "rgba(217,98,43,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // optional photo on the right with rounded clip
  if (data.imageUrl) {
    try {
      const img = await loadImage(data.imageUrl);
      const pw = 440;
      const px = W - pw - 48;
      const py = 48;
      const ph = H - 96;
      roundRect(ctx, px, py, pw, ph, 28);
      ctx.save();
      ctx.clip();
      const ratio = Math.max(pw / img.width, ph / img.height);
      const dw = img.width * ratio;
      const dh = img.height * ratio;
      ctx.drawImage(img, px + (pw - dw) / 2, py + (ph - dh) / 2, dw, dh);
      ctx.restore();
    } catch {
      /* ignore image errors */
    }
  }

  // brand
  ctx.fillStyle = "#e9a23b";
  ctx.font = "600 28px Inter, system-ui, sans-serif";
  ctx.fillText("HorseVision", 64, 92);

  ctx.fillStyle = "#b7a697";
  ctx.font = "400 22px Inter, system-ui, sans-serif";
  ctx.fillText("AI breed identification", 64, 124);

  // verdict
  ctx.fillStyle = "#f5ede6";
  ctx.font = "700 84px Sora, Inter, sans-serif";
  ctx.fillText(data.breedName, 60, 330);

  ctx.fillStyle = "#b7a697";
  ctx.font = "400 26px Inter, system-ui, sans-serif";
  ctx.fillText(`${data.type} · ${data.origin}`, 64, 372);

  // confidence pill
  ctx.fillStyle = "#e9a23b";
  ctx.font = "700 120px Sora, Inter, sans-serif";
  ctx.fillText(`${Math.round(data.confidence)}%`, 60, 510);
  ctx.fillStyle = "#b7a697";
  ctx.font = "400 24px Inter, system-ui, sans-serif";
  ctx.fillText("confidence", 64, 546);

  return canvas.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function downloadDataUrl(dataUrl: string, fileName: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = fileName;
  a.click();
}
