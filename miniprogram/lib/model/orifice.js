export const drawOrifice = (ctx, layout, canvas) => {
  const {
    startX,
    startY,
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
  } = layout;
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
  ctx.quadraticCurveTo(
    startX - endLen / 2 - 30,
    startY + height - hb / 2 - 30,
    // startX - endLen / 2 + 3000 / (startY + height),
    // startY + height - hb - (ha - hb) / 2 + 5000 / (startY + height),
    // startX - 20,
    // startY + height - hb - 20,
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
  // const text1 = `Vb(${v_cm.toFixed(2)}) = `;
  // const text1Info = ctx.measureText(text1);
  // const text2 = `2×g×Δh(${ha_cm - hb_cm})`;
  // const text2Info = ctx.measureText(text2);
  // const start = (300 - text2Info.width - text1Info.width - 20) / 2;
  // const genStart = start + text1Info.width + 5;
  // ctx.beginPath();
  // ctx.strokeStyle = "#333";
  // ctx.moveTo(genStart, 290);
  // ctx.lineTo(genStart + 5, 285);
  // ctx.lineTo(genStart + 12, 300);
  // ctx.lineTo(genStart + 23, 280);
  // ctx.lineTo(genStart + 23 + text2Info.width + 10, 280);
  // ctx.stroke();
  // ctx.fillText(text1, start, 298);
  // ctx.fillText(text2, genStart + 28, 298);
  ctx.font = '16px serif'
  const text1 = "V=";
  const text1Info = ctx.measureText(text1);
  const text2 = "2gΔh";
  const text2Info = ctx.measureText(text2);
  const genStart = startX - 10
  ctx.beginPath();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.moveTo(genStart, startY + height + 16);
  ctx.lineTo(genStart + 5, startY + height + 11);
  ctx.lineTo(genStart + 8, startY + height + 26);
  ctx.lineTo(genStart + 15, startY + height + 11);
  ctx.lineTo(genStart + 15 + text2Info.width + 10, startY + height + 11);
  ctx.stroke();
  ctx.fillText(text1, startX - text1Info.width / 2 - 20, startY + height + 25);
  ctx.fillText(text2, genStart + 20, startY + height + 27);
  ctx.font = '8px serif'
  ctx.fillText('b', startX - text1Info.width / 2 - 12, startY + height + 25);

  // const text3 = `${v_cm.toFixed(2)}=`;
  // const text3Info = ctx.measureText(text3);
  // const text4 = `2×9.8×(${ha_cm} - ${hb_cm})`;
  // const text4Info = ctx.measureText(text4);
  // const start2 = (300 - text4Info.width - text3Info.width - 20) / 2;
  // const genStart2 = start2 + text3Info.width + 5;
  // ctx.beginPath();
  // ctx.strokeStyle = "#333";
  // ctx.lineWidth = 1;
  // ctx.moveTo(genStart2, 370);
  // ctx.lineTo(genStart2 + 5, 365);
  // ctx.lineTo(genStart2 + 12, 380);
  // ctx.lineTo(genStart2 + 23, 360);
  // ctx.lineTo(genStart2 + 23 + text4Info.width + 10, 360);
  // ctx.stroke();
  // ctx.fillText(text3, start2, 378);
  // ctx.fillText(text4, genStart2 + 28, 378);
};
