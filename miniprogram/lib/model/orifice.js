export const drawOrifice = (ctx, layout, canvas) => {
  const {
    // startX,
    // startY,
    width,
    height,
    ha,
    hb,
    ha_cm,
    hb_cm,
    strokeColor,
    strokeWidth,
    fillColor,
    v,
    v_cm,
    dpr
  } = layout;
  ctx.font = '16px serif'
  const startX = canvas.width / dpr / 2
  const startY = canvas.height / dpr - height - 28 - ctx.measureText('V').width * 2 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;

  // draw beaker
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, startY + height - hb);
  ctx.moveTo(startX, startY + height - hb + 3);
  ctx.lineTo(startX, startY + height);
  ctx.lineTo(startX + width, startY + height);
  ctx.lineTo(startX + width, startY);
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(startX - 10, startY - 26, startX - 14, startY - 20);
  ctx.moveTo(startX + width, startY);
  ctx.quadraticCurveTo(
    startX + width + 10,
    startY - 26,
    startX + width + 14,
    startY - 20
  );
  ctx.stroke();

  // fill beaker
  const fillPath = new Path2D();
  fillPath.moveTo(startX, startY + height - ha);
  fillPath.lineTo(startX, startY + height);
  fillPath.lineTo(startX + width, startY + height);
  fillPath.lineTo(startX + width, startY + height - ha);
  ctx.fill(fillPath);
  // 落地点X坐标
  ctx.beginPath();
  ctx.setLineDash([]);
  const endLen = 2 * Math.sqrt(hb * (ha - hb));
  ctx.lineWidth = v;
  ctx.strokeStyle = fillColor;
  ctx.moveTo(startX, startY + height - hb);
  let delta = endLen - hb * v_cm / Math.sqrt(2 * hb * 9.8)
  ctx.quadraticCurveTo(
    startX - delta,
    startY + height - hb,
    startX - endLen,
    startY + height
  );
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.font = "16px serif";
  const offset_x = ctx.measureText('h').width
  const offset_y = ctx.measureText('h').width
  const hbTextInfo = ctx.measureText(`h`);
  // 防止重叠
  if (ha_cm > hb_cm + 2) {
    ctx.fillText(
      `h`,
      startX - 25,
      startY + height - ha
    );
    ctx.fillText(
      `h`,
      startX - 25,
      startY + height - hb
    );
    ctx.font = '10px serif'
    ctx.textBaseline = 'bottom'
    ctx.fillText(`a`, startX - 25 + offset_x, startY + height - ha + (offset_y / 2));
    ctx.fillText(`b`, startX - 25 + offset_x, startY + height - hb + (offset_y / 2));
    ctx.fillText(
      `Δh:${ha_cm-hb_cm}cm`,
      startX - 45,
      startY + height - hb - (ha - hb) / 2 + 8
    );
  } else {
    ctx.font = '10px serif'
    ctx.textBaseline = 'bottom'
    ctx.fillText(
      `Δh:${ha_cm-hb_cm}cm`,
      startX - 45,
      startY + height - hb - (ha - hb) / 2 + 8
    );
  }
  
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.setLineDash([5,2]);
  ctx.lineWidth = 1;
  ctx.beginPath()
  ctx.moveTo(startX, startY + height - ha + 1)
  ctx.lineTo(startX - 4, startY + height - ha + 1)
  ctx.lineTo(startX - 4, (2 * startY + 2 * height - ha - hb + 2) / 2 - 2)
  ctx.lineTo(startX - 8, (2 * startY + 2 * height - ha - hb + 2) / 2)
  ctx.lineTo(startX - 4, (2 * startY + 2 * height - ha - hb + 2) / 2 + 2)
  ctx.lineTo(startX - 4, startY + height - hb + 1)
  ctx.lineTo(startX, startY + height - hb + 1)
  ctx.stroke()
  
  ctx.setLineDash([]);
  ctx.font = '16px serif'
  const text1 = "V=";
  const text1Info = ctx.measureText(text1);
  const text2 = "2gΔh";
  const text2Info = ctx.measureText(text2);
  const genStart = startX + width / 2 - (text2Info.width) / 2 - text1Info.width
  ctx.beginPath();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.moveTo(genStart + text1Info.width, startY + height + 16);
  ctx.lineTo(genStart + text1Info.width + 5, startY + height + 11);
  ctx.lineTo(genStart + text1Info.width + 8, startY + height + 24);
  ctx.lineTo(genStart + text1Info.width + 15, startY + height + 11);
  ctx.lineTo(genStart + text1Info.width + 15 + text2Info.width + 10, startY + height + 11);
  ctx.stroke();
  ctx.fillText(text1, genStart, startY + height + 25);
  ctx.fillText(text2, genStart + text1Info.width + 15, startY + height + 25);
  ctx.font = '8px serif'
  ctx.fillText('b', genStart + ctx.measureText('V').width + 1.5, startY + height + 25);
};
