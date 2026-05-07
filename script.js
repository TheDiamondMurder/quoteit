const form = document.querySelector("#quote-form");
const quoteInput = document.querySelector("#quote");
const personInput = document.querySelector("#person");
const yearInput = document.querySelector("#year");
const canvas = document.querySelector("#quote-canvas");
const download = document.querySelector("#download");
const ctx = canvas.getContext("2d");

function wrapText(text, maxWidth, font) {
  ctx.font = font;
  const words = text.trim().split(/\s+/);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;

    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
      return;
    }

    if (line) {
      lines.push(line);
    }

    line = word;
  });

  if (line) {
    lines.push(line);
  }

  return lines;
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#111113");
  gradient.addColorStop(0.45, "#030303");
  gradient.addColorStop(1, "#17180e");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
  ctx.lineWidth = 1;

  for (let position = 0; position <= canvas.width; position += 72) {
    ctx.beginPath();
    ctx.moveTo(position, 0);
    ctx.lineTo(position, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, position);
    ctx.lineTo(canvas.width, position);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(233, 255, 112, 0.38)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(130, 930);
  ctx.lineTo(520, 930);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.strokeRect(82, 82, canvas.width - 164, canvas.height - 164);
}

function drawQuoteMark() {
  ctx.fillStyle = "rgba(233, 255, 112, 0.95)";
  ctx.font = "900 180px Georgia, serif";
  ctx.fillText("\u201c", 116, 244);
  ctx.fillText("\u201d", 940, 790);
}

function drawWrappedQuote(quote) {
  const maxWidth = 900;
  const fontSize = quote.length > 135 ? 58 : quote.length > 80 ? 68 : 78;
  const lineHeight = fontSize * 1.14;
  const font = `820 ${fontSize}px Inter, Arial, sans-serif`;
  const lines = wrapText(quote, maxWidth, font).slice(0, 8);
  const startY = 362 - Math.max(0, lines.length - 3) * 32;

  ctx.fillStyle = "#f5f5f0";
  ctx.font = font;
  ctx.textBaseline = "top";

  lines.forEach((line, index) => {
    ctx.fillText(line, 150, startY + index * lineHeight);
  });
}

function drawAttribution(person, year) {
  ctx.fillStyle = "#a6a6a0";
  ctx.font = "650 42px Inter, Arial, sans-serif";
  ctx.fillText(`- ${person} ${year}`, 150, 850);
}

function drawWatermark() {
  ctx.fillStyle = "rgba(245, 245, 240, 0.9)";
  ctx.font = "850 64px Inter, Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("jakublabs.xyz", 1090, 1086);
  ctx.textAlign = "left";
}

function generateGraphic() {
  const quote = quoteInput.value || "Your quote goes here";
  const person = personInput.value || "Unknown";
  const year = yearInput.value || new Date().getFullYear();

  drawBackground();
  drawQuoteMark();
  drawWrappedQuote(quote);
  drawAttribution(person, year);
  drawWatermark();

  download.href = canvas.toDataURL("image/png");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generateGraphic();
});

generateGraphic();
