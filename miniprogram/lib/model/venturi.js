/**
 * 绘制文丘里流量计
 * @param {*} ctx
 * @param {*} layout {
 * l1, // 导管1距离最左边的距离
 * l2, // 中间细部分长度
 * w1, // 宽部分的长度
 * w2, // 斜部分的长度
 * d1, // tank水箱主部分高度
 * d2, // tank水箱中间细部分高度
 * ph1, // 导管1流量
 * ph2, // 导管2流量
 * fillColor // 填充颜色
 * strokeColor // 线条颜色
 * start // {x,y}起点坐标
 * strokeWidth // 线宽
 * stepValue // canvas上的每一个像素表示多少流量 (VenturiMaxValue - VenturiMaxValue) / d1
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
    h,
    l1,
    l2,
    w1,
    w2,
    d1,
    d2,
    ph1,
    ph2,
    fillColor,
    strokeColor,
    start: { x: startX, y: startY },
    strokeWidth,
    Q,
    pl1,
    pl2,
    plw,
    pw2,
    pw1,
    qMax
  } = layout;
  const diff = d1 - d2;
  const middleTopY = startY + diff / 2;
  const middleBottomY = middleTopY + d2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 绘制主容器
  ctx.strokeStyle = strokeColor;
  // 通过透明度反映Q
  const rate = Q / qMax > 1? 1: Q / qMax
  ctx.fillStyle = `rgba(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]}, ${rate})`;
  ctx.lineWidth = strokeWidth || 5;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + w1, startY);
  ctx.lineTo(startX + w1 + w2, middleTopY);
  ctx.lineTo(startX + w1 + w2 + l2, middleTopY);
  ctx.lineTo(startX + w1 + w2 * 2 + l2, startY);
  ctx.lineTo(startX + w1 * 2 + w2 * 2 + l2, startY);
  ctx.lineTo(startX + w1 * 2 + w2 * 2 + l2, startY + d1);
  ctx.lineTo(startX + w1 + w2 * 2 + l2, startY + d1);
  ctx.lineTo(startX + w1 + w2 + l2, middleBottomY);
  ctx.lineTo(startX + w1 + w2, middleBottomY);
  ctx.lineTo(startX + w1, startY + d1);
  ctx.lineTo(startX, startY + d1);
  ctx.closePath();
  ctx.fill();
  // 绘制导管1
  ctx.lineWidth = plw;
  ctx.moveTo(startX + l1, startY);
  ctx.lineTo(startX + l1, startY - pl1);
  ctx.moveTo(startX + l1 + pw1, startY);
  ctx.lineTo(startX + l1 + pw1, startY - pl1);
  const pipe1FillPath = new Path2D();
  pipe1FillPath.moveTo(startX + l1, startY);
  pipe1FillPath.lineTo(startX + l1, startY - ph1);
  pipe1FillPath.lineTo(startX + l1 + pw1, startY - ph1);
  pipe1FillPath.lineTo(startX + l1 + pw1, startY);
  pipe1FillPath.closePath();
  ctx.fill(pipe1FillPath);
  // 导管2
  ctx.moveTo(startX + w1 + w2 + l2 / 2 - pw2 / 2, middleTopY);
  ctx.lineTo(startX + w1 + w2 + l2 / 2 - pw2 / 2, middleTopY - pl2);
  ctx.moveTo(startX + w1 + w2 + l2 / 2 + pw2 / 2, middleTopY);
  ctx.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2, middleTopY - pl2);
  const pipe2FillPath = new Path2D();
  pipe2FillPath.moveTo(startX + w1 + w2 + l2 / 2 - pw2 / 2, middleTopY);
  pipe2FillPath.lineTo(startX + w1 + w2 + l2 / 2 - pw2 / 2, startY - ph2);
  pipe2FillPath.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2, startY - ph2);
  pipe2FillPath.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2, middleTopY);
  pipe2FillPath.closePath();
  ctx.fill(pipe2FillPath);
  ctx.stroke();
  // 标注截面
  ctx.beginPath()
  ctx.strokeStyle = "rgb(255, 0, 0)"
  ctx.setLineDash([5,5]);
  ctx.moveTo(startX + l1 + pw1 / 2, startY);
  ctx.lineTo(startX + l1 + pw1 / 2, startY + d1 )
  ctx.moveTo(startX + w1 + w2 + l2 / 2, middleTopY);
  ctx.lineTo(startX + w1 + w2 + l2 / 2, middleTopY + d2);
  ctx.stroke();
  // 绘制截面和流量标注
  ctx.font = "14px serif";
  ctx.fillStyle = "rgb(255, 0, 0)";
  const l1Width = ctx.measureText(`S1`).width;
  const offset_x = ctx.measureText(`S`).width;
  const offset_y = ctx.measureText(`S`).width
  ctx.fillText(`S\u2081`, startX + l1 + pw1 / 2 - l1Width / 2, startY + d1 + 15);
  const l2Info = ctx.measureText("S2");
  ctx.fillText(
    `S\u2082`,
    startX + w1 + w2 + l2 / 2 - l2Info.width / 2,
    middleBottomY  + 15
  );
  ctx.fillStyle = "rgb(0, 0, 0)";
  // ctx.font = "12px serif";
  // ctx.fillText(`Q = ${Q.toFixed(2)}`, startX + 2 * w1 + 2 * w2 + l2 + 10, startY + d1 / 2);
  // 绘制高度差的虚线
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.setLineDash([5,2]);
  ctx.lineWidth = 1;
  ctx.beginPath()
  ctx.moveTo(startX + l1 + pw1, startY - ph1 + 1) // 考虑到线宽+1
  ctx.lineTo(startX + w1 + w2 + l2 / 2 - pw2 / 2, startY - ph1 + 1)
  ctx.moveTo(startX + w1 + w2 + l2 / 2 - pw2 / 2, startY - ph2 + 1)
  ctx.lineTo(startX + l1 + pw1, startY - ph2 + 1)
  ctx.stroke()
  // 绘制高度差的括号
  ctx.beginPath()
  ctx.setLineDash([]);
  ctx.moveTo(startX + w1 + w2 + l2 / 2 + pw2 / 2, startY - ph1 + 1)
  ctx.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2 + 3, startY - ph1 + 1)
  ctx.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2 + 3, 
    (startY - ph1 + 1 + startY - ph2 + 1) / 2 - 2)
  ctx.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2 + 4, 
    (startY - ph1 + 1 + startY - ph2 + 1) / 2)
  ctx.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2 + 3, 
    (startY - ph1 + 1 + startY - ph2 + 1) / 2 + 2)
  ctx.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2 + 3, startY - ph2 + 1)
  ctx.lineTo(startX + w1 + w2 + l2 / 2 + pw2 / 2, startY - ph2 + 1)
  ctx.stroke()

  ctx.font = "14px serif";
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(
    `h`,
    startX + w1 + w2 + l2,
    (middleTopY - ph2 + startY - ph1) / 2 + l1Width / 2 
  );

  // 文字公式
  const text1 = "Q = VS = S S";
  const text1Info = ctx.measureText(text1);
  const text2 = "2gh / (S\u00B2 - S\u00B2)";
  const text2Info = ctx.measureText(text2);
  ctx.beginPath();
  ctx.font = "16px serif";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  const text1StartX = (startX + w1 + w2 + l2 / 2 - text1Info.width / 2 - text2Info.width / 2) - 22;
  const text1StartY = startY + d1 + 50
  ctx.fillText(text1, text1StartX, text1StartY);
  ctx.textBaseline = 'top'
  ctx.font = "8px serif";
  ctx.fillText('1', text1StartX + 38, text1StartY - 7);
  ctx.fillText('1', text1StartX + 49, text1StartY - 7);
  ctx.fillText('1', text1StartX + 75, text1StartY - 7);
  ctx.fillText('2', text1StartX + 86, text1StartY - 7);
  
  ctx.font = "14px serif";
  ctx.textBaseline = 'alphabetic'
  ctx.moveTo(text1StartX + text1Info.width + 12, text1StartY - 7);
  ctx.lineTo(text1StartX + text1Info.width + 15, text1StartY - 12);
  ctx.lineTo(text1StartX + text1Info.width + 20, text1StartY + 3);
  ctx.lineTo(text1StartX + text1Info.width + 25, text1StartY - 17);
  ctx.lineTo(text1StartX + text1Info.width + 18 + text2Info.width + 20, text1StartY - 17);
  ctx.stroke();
  ctx.fillText(text2, text1StartX + text1Info.width + 25, text1StartY);
  ctx.textBaseline = 'top'
  ctx.font = "8px serif";
  ctx.fillText('1', text1StartX + text1Info.width + 25 + 6 * offset_x + 5, text1StartY - 5);
  ctx.fillText('2', text1StartX + text1Info.width + 25 + 9 * offset_x + 6, text1StartY - 5);

  
  // ctx.font = "10px serif";
  // const text3 = `${Number(Q.toFixed(2))}=${s1}×${s2}×`;
  // const text3Info = ctx.measureText(text3);
  // const text4 = `2×9.8×${s1 - s2} / (${s1}² - ${s2}²)`;
  // const text4Info = ctx.measureText(text4);
  // ctx.beginPath();
  // ctx.font = "16px serif";
  // ctx.strokeStyle = "#000";
  // ctx.lineWidth = 1;

  // const text3StartX = startX + w1 + w2 + l2 / 2 - text3Info.width / 2- text4Info.width / 2;
  // const text3StartY = startY + d1 + 100
  // ctx.fillText(text3, text3StartX, text3StartY);
  // ctx.moveTo(text3StartX + text3Info.width - 24, 370);
  // ctx.lineTo(text3StartX + text3Info.width - 24 + 5, 365);
  // ctx.lineTo(text3StartX + text3Info.width - 24 + 10, 380);
  // ctx.lineTo(text3StartX + text3Info.width - 24 + 18, 360);
  // ctx.lineTo(
  //   text3StartX + text3Info.width - 24 + 18 + text4Info.width + 35 - 24,
  //   startY + d1 + 120
  // );
  // ctx.stroke();
  // ctx.fillText(text4, text3StartX + text3Info.width + 20 - 24, startY + d1 + 130);
};
