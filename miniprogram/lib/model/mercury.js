export const drawMercury = (ctx, layout, canvas) => {
  const {
    p0, // 入口压强
    p0h,
    ph,
    h1,
    h2,
    h3,
    p,
    density, // 流体密度
    fillColor,
    strokeColor,
    strokeWidth,
    height,
    space,
    startX,
    startY,
    thickness, // 管厚度
  } = layout;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;

  // draw outline
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, startY + height);
  ctx.arc(
    startX + space / 2,
    startY + height,
    space / 2,
    Math.PI,
    Math.PI * 2,
    true
  );
  ctx.lineTo(startX + space, startY);
  ctx.lineTo(startX + space - thickness, startY);
  ctx.lineTo(startX + space - thickness, startY + height);
  ctx.moveTo(startX + thickness, startY + height);
  ctx.arc(
    startX + space / 2,
    startY + height,
    (space - thickness * 2) / 2,
    Math.PI,
    Math.PI * 2,
    true
  );
  ctx.moveTo(startX + thickness, startY + height);
  ctx.lineTo(startX + thickness, startY);
  ctx.lineTo(startX, startY);
  // ctx.moveTo(startX, startY);

  ctx.stroke();

  ctx.beginPath();
  ctx.arc(startX - 10, startY, 30, Math.PI, Math.PI * 2);
  ctx.arc(startX - 10, startY, 30 - thickness, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX - 20, startY);
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + thickness, startY);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.moveTo(startX - thickness, startY);
  ctx.lineTo(startX - thickness, startY + 50);
  ctx.lineTo(startX - thickness * 2, startY + 50);
  ctx.lineTo(startX - thickness * 2, startY);

  // ctx.beginPath();
  // ctx.strokeStyle = strokeColor;
  // ctx.moveTo(startX - thickness, startY);
  // ctx.lineTo(startX - thickness * 2, startY);
  ctx.stroke();
  
  // draw fluid
  const fillLeftArea = new Path2D();
  const bottomY = startY + height + space / 2;
  fillLeftArea.moveTo(startX, bottomY - h2);
  fillLeftArea.lineTo(startX, startY + height);
  fillLeftArea.lineTo(startX + thickness, startY + height);
  fillLeftArea.lineTo(startX + thickness, bottomY - h2);
  const fillRightArea = new Path2D();
  fillRightArea.moveTo(startX + space - thickness, bottomY - h1);
  fillRightArea.lineTo(startX + space, bottomY - h1);
  fillRightArea.lineTo(startX + space, startY + height);
  fillRightArea.lineTo(startX + space - thickness, startY + height);
  fillRightArea.closePath();
  const fillBottom1Area = new Path2D();
  fillBottom1Area.arc(
    startX + space / 2,
    startY + height,
    space / 2,
    Math.PI,
    Math.PI * 2,
    true
  );
  const fillBottom2Area = new Path2D();
  fillBottom2Area.arc(
    startX + space / 2,
    startY + height,
    (space - 2 * thickness) / 2,
    Math.PI,
    Math.PI * 2,
    true
  );
  ctx.fill(fillLeftArea);
  ctx.fill(fillRightArea);
  ctx.fill(fillBottom1Area);
  ctx.fillStyle = "#fff";
  ctx.fill(fillBottom2Area);
  ctx.font = "16px serif";
  ctx.fillStyle = "#000";
  const p0_text = "P\u2080:" + p0 / 100000 + "×10";
  const p0_info = ctx.measureText(p0_text);
  const p_text = "P:" + p / 100000 + "×10";
  const p_info = ctx.measureText(p_text);
  ctx.fillText(p0_text, startX + space + 10, startY + 20);
  ctx.fillText(p_text, startX + thickness + 10, startY + 20);
  const h3Text = `Δh: ${h3}`;
  const h3Info = ctx.measureText(h3Text);
  ctx.fillText(
    h3Text,
    startX + space / 2 - h3Info.width / 2,
    bottomY - h1 + h3 / 2 + (h3Info.emHeightAscent + h3Info.emHeightDescent) / 2
  );
  const phText = `h:${ph}cm`;
  const phTextInfo = ctx.measureText(phText);
  ctx.fillText(phText, startX - phTextInfo.width - 5, bottomY - h2 + 10);
  const p0hText = `h\u2080:${p0h}cm`;
  ctx.fillText(p0hText, startX + space + 5, bottomY - h1 + 10);

  ctx.beginPath();
  ctx.font = "10px serif";
  ctx.fillText("5", startX + space + 12 + p0_info.width, startY + 12);
  ctx.fillText("5", startX + thickness + 10 + p_info.width, startY + 12);

  ctx.beginPath();
  ctx.font = "16px serif";
  // const text = `p(${p})=p0(${p0})+ρ(${density})*g*Δh(${h3})`;
  const text1 = `${p}=${p0}+${density}×9.8×${h3}`;
  const text2 = "P = P\u2080+ ρgΔh";
  const text1Info = ctx.measureText(text1);
  const text2Info = ctx.measureText(text2);
  // ctx.fillText(text1, (300 - text1Info.width) / 2, 400);
  ctx.fillText(text2, (300 - text2Info.width) / 2, bottomY + 15);
};
