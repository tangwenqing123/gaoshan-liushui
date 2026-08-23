/* ============================================================
   高山流水 · 六维雷达图绘制
   纯 Canvas 绘制，无外部依赖
   ============================================================ */

/**
 * 绘制六维雷达图
 * @param {HTMLCanvasElement} canvas - canvas 元素
 * @param {Object} dims - 六维得分 { 才情: 85, 旷达: 95, ... }
 * @param {Object} colors - 人格颜色 { c1: "#6b8f71", c2: "#a3c585" }
 * @param {Array} names - 维度名称数组（可选，默认六维）
 */
function drawRadar(canvas, dims, colors, names) {
  if (!canvas || !dims) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.clientWidth || 240;
  const H = canvas.clientHeight || 240;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W, H) / 2 - 28;
  const dimNames = names || ["才情", "旷达", "深情", "孤高", "谋略", "通透"];
  const n = dimNames.length;
  const c1 = (colors && colors.c1) || "#6b8f71";
  const c2 = (colors && colors.c2) || "#a3c585";

  ctx.clearRect(0, 0, W, H);

  // 1. 画网格（4层）
  for (let level = 1; level <= 4; level++) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      const r = R * level / 4;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "#e8e4de";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 2. 画轴线
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
    ctx.strokeStyle = "#e8e4de";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 3. 画数据区域
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const score = dims[dimNames[i]] || 0;
    const r = R * Math.min(100, score) / 100;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();

  // 渐变填充
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  grad.addColorStop(0, hexToRgba(c1, 0.35));
  grad.addColorStop(1, hexToRgba(c2, 0.15));
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = c1;
  ctx.lineWidth = 2;
  ctx.stroke();

  // 4. 画数据点
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const score = dims[dimNames[i]] || 0;
    const r = R * Math.min(100, score) / 100;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = c1;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  // 5. 画标签（维度名 + 分数）
  ctx.font = "14px -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const labelR = R + 22;
    const x = cx + labelR * Math.cos(angle);
    const y = cy + labelR * Math.sin(angle);
    const score = dims[dimNames[i]] || 0;
    ctx.fillStyle = "#555";
    ctx.fillText(dimNames[i] + " " + score, x, y);
  }
}

/** hex 颜色转 rgba */
function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
}

if (typeof module !== "undefined") module.exports = { drawRadar };