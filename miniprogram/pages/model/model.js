import { drawVenturi } from "../../lib/model/venturi";
import { drawMercury } from "../../lib/model/mercury";
import { drawOrifice } from "../../lib/model/orifice";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    model: 0,
    ctx: null,
    s1Min: 2400,
    s1Max: 3000,
    s2Min: 400,
    s2Max: 1000,
    hMin: 10,
    hMax: 30,
    dpr: null,
    venturiData: {
      h: 10,
      s1: 2400,
      s2: 400,
      l1: 20, 
      l2: 18,
      d1: 56,
      d2: 23,
      Q: 0.057,
      start: { x: 90, y: 120},
      w1: 60,
      w2: 40,
      fillColor: [15, 90, 125],
      strokeColor: "#073654",
      strokeWidth: 5,
      plw: 2,
      pl1: 100,
      pl2: 100,
      pw1: 6,
      pw2: 6,
      ph1: 80,
      ph2: 70,
      qMax: 0.2,
    },
    orificeData: {
      ha_cm: 10,
      hb_cm: 2,
      ha: 209.47,
      hb: 57.89,
      startX: 150,
      startY: 20,
      width: 140,
      height: 220,
      strokeColor: "#999",
      strokeWidth: 2,
      fillColor: "#0F5A7D",
      v: 10.6,
      v_cm: 12.52,
    },
    mercuryData: {
      p0_cm: 0.5,
      p0: 50000,
      ph: 3,
      p0h: 3,
      h1: 150,
      h2: 150,
      h3: 0,
      p: 50000,
      p_cm: 0.5,
      density: 13600,
      fillColor: "#6A3800",
      strokeColor: "#ccc",
      strokeWidth: 1,
      thickness: 20,
      height: 180,
      space: 120,
      startX: 100,
      startY: 15,
    },
  },

  setModel(event) {
    this.setData(
      {
        model: event.currentTarget.dataset.model,
      },
      () => {
        if (this.data.model == 1) {
          this.draw(this.data.venturiData);
        } else if (this.data.model == 2) {
          this.draw(this.data.orificeData);
        } else if (this.data.model == 3) {
          this.draw(this.data.mercuryData);
        } else {
          this.setData({
            ctx: null,
          });
        }
      }
    );
  },


  /**
   * 计算layout
   * @param {*} config {h, s1, s2}
   */
  execVenturi({ h, s1, s2 }) {
    const gh2 = 2 * 9.8 * h;
    const s1_s2 = Math.pow(s1, 2) - Math.pow(s2, 2);
    const Q = ((s1 * s2 * Math.sqrt(gh2 / s1_s2)) / Math.pow(10, 5)).toFixed(3);
    const { venturiData } = this.data;
    const d1 = Math.sqrt(4 * s1 / Math.PI)
    const d2 = Math.sqrt(4 * s2 / Math.PI)
    return {
      ...venturiData,
      d1: d1, 
      d2: d2,
      ph2: venturiData.ph1 - h,
      Q,
    };
  },

  execMercury(mercuryData) {
    const {
      p0, // 入口压强
      h1,
      h2,
      h3,
      p0_cm,
      p,
      density, // 流体密度
      fillColor,
      strokeColor,
      strokeWidth,
      height,
      space,
      startX,
      startY,
    } = mercuryData;
    // const
    return {
      ...mercuryData,
    };
  },

  handleVenturiDataChange(event) {
    const value = event.detail.value;
    const type = event.currentTarget.dataset.key;
    const venturiData = this.data.venturiData;
    // s2不能大于s1
    if (type == "s2" && value >= venturiData["s1"]) {
      this.setData({
        venturiData: {
          ...venturiData,
          s2: venturiData.s2,
        },
      });
      return;
    }
    if (type == "s1" && value <= venturiData["s2"]) {
      this.setData({
        venturiData: {
          ...venturiData,
          s1: venturiData.s1,
        },
      });
      return;
    }
    venturiData[type] = value;
    const layout = this.execVenturi(venturiData);
    this.setData(
      {
        venturiData: layout,
      },
      () => {
        this.draw(this.data.venturiData);
      }
    );
  },

  execMercuryH(h1, h2, previousH3, nextH3, subKey) {
    const step = 1.876 / 80; // 1.876是高度差的最大值，100是像素表示这个高度差时对应的最大像素，取值出来就是每一像素对应的cm
    const diff = Math.abs(nextH3 - previousH3); //cm 差值
    const diffPixel = diff / step;
    const newH1 = subKey == "h1" ? h1 - diffPixel : h1 + diffPixel;
    const newH2 = subKey == "h2" ? h2 - diffPixel : h2 + diffPixel;
    return {
      newH1,
      newH2,
      newP0h:
        subKey == "h1"
          ? this.data.mercuryData.p0h - diff / 2
          : this.data.mercuryData.p0h + diff / 2,
      newPh:
        subKey == "h2"
          ? this.data.mercuryData.ph - diff / 2
          : this.data.mercuryData.ph + diff / 2,
    };
  },

  handleMercuryDataChange(event) {
    const value = event.detail.value;
    const type = event.currentTarget.dataset.key;
    const mercuryData = this.data.mercuryData;
    let subKey;
    if (type == "p0_cm") {
      subKey = value > mercuryData.p0_cm ? "h1" : "h2";
      mercuryData.p0 = Math.round(value * 100000 * 10) / 10;
      mercuryData.p0_cm = Math.round(value  * 10) / 10 ;
    } else if (type == "p_cm") {
      subKey = value > mercuryData.p_cm ? "h2" : "h1";
      mercuryData.p = Math.round(value * 100000 * 10) / 10;
      mercuryData.p_cm = Math.round(value  * 10) / 10;
    }
    const h3 = Math.abs(
      (mercuryData.p - mercuryData.p0) / (mercuryData.density * 9.8)
    );
    const { newH1, newH2, newP0h, newPh } = this.execMercuryH(
      mercuryData.h1,
      mercuryData.h2,
      mercuryData.h3,
      h3,
      subKey
    );
    mercuryData.h1 = newH1;
    mercuryData.h2 = newH2;
    mercuryData.p0h = Number(newP0h.toFixed(4));
    mercuryData.ph = Number(newPh.toFixed(4));
    try {
      mercuryData.h3 = Math.abs(h3.toFixed(3));
    } catch (err) {
      mercuryData.h3 = Math.abs(h3);
    }
    mercuryData[type] = value;
    mercuryData.p_cm = Number(mercuryData.p_cm.toFixed(1))
    mercuryData.p0_cm = Number(mercuryData.p0_cm.toFixed(1))

    this.setData(
      {
        mercuryData,
      },
      () => {
        this.draw(this.data.mercuryData);
      }
    );
  },

  execOrifice(ha_cm, hb_cm) {
    // ha&hb 20~200
    const step = 9 / (200 - 20); // 每一个pixel表示多少cm
    const ha = ha_cm / step;
    const hb = hb_cm / step;
    const vStep = (186.2 - 9.8) / (20 - 5); // 每1像素表示的cm数 vcm范围9.8~186.2  vpx范围2-10
    const v_cm = Math.round(Math.sqrt(2 * 9.8 * (ha_cm - hb_cm)) * 100) / 100;
    const v = (v_cm / vStep) * 8; // 5是固定系数进行放大
    return {
      ha,
      hb,
      v,
      v_cm,
    };
  },

  handleOrificeDataChange(event) {
    const value = event.detail.value;
    const type = event.currentTarget.dataset.key;
    const orificeData = this.data.orificeData;
    let tmp = {};
    if (type == "ha_cm") {
      if (value <= orificeData.hb_cm) {
        this.setData({
          orificeData: {
            ...orificeData,
            ha_cm: orificeData.ha_cm,
          },
        });
        return;
      }
      tmp = {
        ...this.execOrifice(value, orificeData.hb_cm),
      };
    } else if (type == "hb_cm") {
      if (value >= orificeData.ha_cm) {
        this.setData({
          orificeData: {
            ...orificeData,
            hb_cm: orificeData.hb_cm,
          },
        });
        return;
      }
      tmp = {
        ...this.execOrifice(orificeData.ha_cm, value),
      };
    }
    const result = {
      ...orificeData,
      ...tmp,
    };
    result[type] = value;
    this.setData(
      {
        orificeData: result,
      },
      () => {
        this.draw(this.data.orificeData);
      }
    );
  },

  draw(layout) {
    if (this.data.ctx && this.data.canvas) {
      switch (this.data.model) {
        case 1:
          drawVenturi(this.data.ctx, { ...layout, dpr:this.data.dpr}, this.data.canvas);
          break;
        case 2:
          drawOrifice(this.data.ctx, { ...layout, dpr:this.data.dpr}, this.data.canvas);
          break;
        case 3:
          drawMercury(this.data.ctx, { ...layout, dpr:this.data.dpr}, this.data.canvas);
          break;
      }
    } else {
      const query = wx.createSelectorQuery();
      query
        .select("#main")
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");
          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          ctx.scale(dpr, dpr);
          this.setData(
            {
              ctx,
              canvas,
              dpr
            },
            () => {
              switch (this.data.model) {
                case 1:
                  drawVenturi(ctx, { ...layout, dpr:this.data.dpr}, canvas);
                  break;
                case 2:
                  drawOrifice(ctx, { ...layout, dpr:this.data.dpr}, canvas);
                  break;
                case 3:
                  drawMercury(ctx, { ...layout, dpr:this.data.dpr}, canvas);
                  break;
              }
            }
          );
        });
    }
  },

  onLoad: function (options) {},

  onReady: function () {},
});
