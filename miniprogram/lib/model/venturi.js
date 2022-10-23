/**
 * 绘制文丘里流量计
 * @param {*} ctx
 * @param {*} layout {
 * s1, // 导管1距离最左边的距离
 * s2, // 中间细部分长度
 * w1, // 宽部分的长度
 * w2, // 斜部分的长度
 * th1, // tank水箱主部分高度
 * th2, // tank水箱中间细部分高度
 * ph1, // 导管1流量
 * ph2, // 导管2流量
 * fillColor // 填充颜色
 * strokeColor // 线条颜色
 * start // {x,y}起点坐标
 * strokeWidth // 线宽
 * stepValue // canvas上的每一个像素表示多少流量 (VenturiMaxValue - VenturiMaxValue) / th1
 * pl1 // 导管1长度
 * pl2 // 导管2长度
 * pw1, // 导管1宽度
 * pw2 // 导管2宽度
 * plw // 导管壁宽度
 * }
 * canvas 操作的canvas实例
 */

export const drawVenturi = (ctx, layout, canvas) => {
  const {
    s1,
    s2,
    w1,
    w2,
    th1,
    th2,
    ph1,
    ph2,
    fillColor,
    strokeColor,
    start: { x: startX, y: startY },
    strokeWidth,
    stepValue,
    Q,
    pl1,
    pl2,
    plw,
    pw2,
    pw1,
  } = layout;
  const diff = th1 - th2;
  const middleTopY = startY + diff / 2;
  const middleBottomY = middleTopY + th2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 绘制主容器
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth || 5;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + w1, startY);
  ctx.lineTo(startX + w1 + w2, middleTopY);
  ctx.lineTo(startX + w1 + w2 + s2, middleTopY);
  ctx.lineTo(startX + w1 + w2 * 2 + s2, startY);
  ctx.lineTo(startX + w1 * 2 + w2 * 2 + s2, startY);
  ctx.moveTo(startX, startY + th1);
  ctx.lineTo(startX + w1, startY + th1);
  ctx.lineTo(startX + w1 + w2, middleBottomY);
  ctx.lineTo(startX + w1 + w2 + s2, middleBottomY);
  ctx.lineTo(startX + w1 + w2 * 2 + s2, startY + th1);
  ctx.lineTo(startX + w1 * 2 + w2 * 2 + s2, startY + th1);
  const step = Math.ceil(Q / stepValue);
  const y = startY + th1 - step < startY ? startY : startY + th1 - step;
  const mainFillPath = new Path2D();
  mainFillPath.moveTo(startX, startY + th1);
  mainFillPath.lineTo(startX + w1, startY + th1);
  if (y >= middleBottomY) {
    const x = Math.ceil(
      startX + w1 + (startY + th1 - y) * (w2 / ((th1 - th2) / 2))
    );
    mainFillPath.lineTo(x, y);
    mainFillPath.lineTo(startX, y);
    mainFillPath.lineTo(startX, startY + th1);
  } else if (y >= middleTopY) {
    mainFillPath.lineTo(startX + w1 + w2, middleBottomY);
    mainFillPath.lineTo(startX + w1 + w2 + s2, middleBottomY);
    mainFillPath.lineTo(startX + w1 + w2 * 2 + s2, startY + th1);
    mainFillPath.lineTo(startX + w1 * 2 + w2 * 2 + s2, startY + th1);
    mainFillPath.lineTo(startX + w1 * 2 + w2 * 2 + s2, y);
    mainFillPath.lineTo(startX, y);
    mainFillPath.lineTo(startX, startY + th1);
  } else {
    const offset = Math.ceil((y - startY) * (w2 / ((th1 - th2) / 2)));
    const rightX = startX + w1 + s2 + w2 * 2 - offset;
    const leftX = startX + w1 + offset;
    mainFillPath.lineTo(startX + w1 + w2, middleBottomY);
    mainFillPath.lineTo(startX + w1 + w2 + s2, middleBottomY);
    mainFillPath.lineTo(startX + w1 + w2 * 2 + s2, startY + th1);
    mainFillPath.lineTo(startX + w1 * 2 + w2 * 2 + s2, startY + th1);
    mainFillPath.lineTo(startX + w1 * 2 + w2 * 2 + s2, y);
    mainFillPath.lineTo(rightX, y);
    mainFillPath.lineTo(startX + w1 + w2 + s2, middleTopY);
    mainFillPath.lineTo(startX + w1 + w2, middleTopY);
    mainFillPath.lineTo(leftX, y);
    mainFillPath.lineTo(startX, y);
    mainFillPath.lineTo(startX, startY + th1);
  }
  mainFillPath.closePath();
  ctx.fill(mainFillPath);
  // 绘制导管
  ctx.lineWidth = plw;
  ctx.moveTo(startX + s1, startY);
  ctx.lineTo(startX + s1, startY - pl1);
  ctx.moveTo(startX + s1 + pw1, startY);
  ctx.lineTo(startX + s1 + pw1, startY - pl1);
  const pipe1FillPath = new Path2D();
  pipe1FillPath.moveTo(startX + s1, startY);
  pipe1FillPath.lineTo(startX + s1, startY - ph1);
  pipe1FillPath.lineTo(startX + s1 + pw1, startY - ph1);
  pipe1FillPath.lineTo(startX + s1 + pw1, startY);
  pipe1FillPath.closePath();
  ctx.fill(pipe1FillPath);
  ctx.moveTo(startX + w1 + w2 + s2 / 2 - pw2 / 2, middleTopY);
  ctx.lineTo(startX + w1 + w2 + s2 / 2 - pw2 / 2, middleTopY - pl2);
  ctx.moveTo(startX + w1 + w2 + s2 / 2 + pw2 / 2, middleTopY);
  ctx.lineTo(startX + w1 + w2 + s2 / 2 + pw2 / 2, middleTopY - pl2);
  const pipe2FillPath = new Path2D();
  pipe2FillPath.moveTo(startX + w1 + w2 + s2 / 2 - pw2 / 2, middleTopY);
  pipe2FillPath.lineTo(startX + w1 + w2 + s2 / 2 - pw2 / 2, middleTopY - ph2);
  pipe2FillPath.lineTo(startX + w1 + w2 + s2 / 2 + pw2 / 2, middleTopY - ph2);
  pipe2FillPath.lineTo(startX + w1 + w2 + s2 / 2 + pw2 / 2, middleTopY);
  pipe2FillPath.closePath();
  ctx.fill(pipe2FillPath);
  ctx.stroke();
  // 绘制文字
  ctx.font = "12px serif";
  ctx.fillStyle = "#000";
  const s1Width = ctx.measureText(`S1`).width;
  ctx.fillText(`Q:${Q.toFixed(2)}`, startX + 10, startY + th1 / 2);
  ctx.fillText(`S1`, startX + s1 / 2 - s1Width / 2, startY - 10);
  ctx.moveTo(startX, startY - 2);
  ctx.lineTo(startX + 2, startY - 5);
  ctx.lineTo(startX + s1 - 2, startY - 5);
  ctx.lineTo(startX + s1, startY - 2);
  ctx.stroke();
  const s2Info = ctx.measureText("S2");
  ctx.fillText(
    `S2`,
    startX + w1 + w2 + s2 / 2 - s2Info.width / 2,
    middleBottomY + s2Info.emHeightAscent + s2Info.emHeightDescent + 5
  );
  ctx.moveTo(startX + w1 + w2, startY + th1 - (th1 - th2) / 2 + 2);
  ctx.lineTo(startX + w1 + w2 + 2, startY + th1 - (th1 - th2) / 2 + 5);
  ctx.lineTo(startX + w1 + w2 + s2 - 2, startY + th1 - (th1 - th2) / 2 + 5);
  ctx.lineTo(startX + w1 + w2 + s2, startY + th1 - (th1 - th2) / 2 + 2);
  ctx.stroke();
  ctx.fillText(
    "h",
    Math.abs(startX + s1 - (startX + w1 + w2 + s2 / 2 - plw / 2)) / 2 +
      s1 +
      startX,
    startY - 20
  );

  // const text1 = `Q(${Number(Q.toFixed(2))})=v1S1=S1(${s1})*S2(${s2})`;
  // const text1Info = ctx.measureText(text1);
  // const text = `2gh(${s1 - s2}) / (s1(${s1})² - s2(${s2})²) `;
  // const textInfo = ctx.measureText(text);
  // ctx.beginPath();
  // ctx.font = "16px serif";
  // ctx.fillText(text1, (300 - text1Info.width) / 2 - 20, 268);
  // ctx.moveTo(150 - textInfo.width / 2 - 20, 290);
  // ctx.lineTo(150 - textInfo.width / 2 + 5 - 20, 285);
  // ctx.lineTo(150 - textInfo.width / 2 + 12 - 20, 300);
  // ctx.lineTo(150 - textInfo.width / 2 + 23 - 20, 280);
  // ctx.lineTo(150 - textInfo.width / 2 + 23 + textInfo.width + 30 - 20, 280);
  // ctx.stroke();
  // ctx.fillText("×", 150 - textInfo.width / 2 - 15 - 20, 298);
  // ctx.fillText(text, 150 - textInfo.width / 2 + 26 - 20, 298);

  const text1 = "Q=v1S1=S1S2";
  const text1Info = ctx.measureText(text1);
  const text2 = "2gh / (s1² - s2²)";
  const text2Info = ctx.measureText(text2);
  ctx.beginPath();
  ctx.font = "16px serif";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.fillText(text1, (300 - text1Info.width - text2Info.width - 80) / 2, 338);
  const text1StartX = (300 - text1Info.width - text2Info.width - 80) / 2 + 24;
  ctx.moveTo(text1StartX + text1Info.width, 330);
  ctx.lineTo(text1StartX + text1Info.width + 5, 325);
  ctx.lineTo(text1StartX + text1Info.width + 10, 340);
  ctx.lineTo(text1StartX + text1Info.width + 18, 320);
  ctx.lineTo(text1StartX + text1Info.width + 18 + text2Info.width + 35, 320);
  ctx.stroke();
  ctx.fillText(text2, text1StartX + text1Info.width + 20, 338);

  const text3 = `${Number(Q.toFixed(2))}=${s1}×${s2}×`;
  const text3Info = ctx.measureText(text3);
  const text4 = `2×9.8×${s1 - s2} / (${s1}² - ${s2}²)`;
  const text4Info = ctx.measureText(text4);
  ctx.beginPath();
  ctx.font = "16px serif";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.fillText(text3, (300 - text3Info.width - text4Info.width - 25) / 2, 378);
  const text3StartX = (300 - text3Info.width - text4Info.width - 25) / 2 + 24;
  ctx.moveTo(text3StartX + text3Info.width - 24, 370);
  ctx.lineTo(text3StartX + text3Info.width - 24 + 5, 365);
  ctx.lineTo(text3StartX + text3Info.width - 24 + 10, 380);
  ctx.lineTo(text3StartX + text3Info.width - 24 + 18, 360);
  ctx.lineTo(
    text3StartX + text3Info.width - 24 + 18 + text4Info.width + 35 - 24,
    360
  );
  ctx.stroke();
  ctx.fillText(text4, text3StartX + text3Info.width + 20 - 24, 378);
};
