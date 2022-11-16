"use strict";
exports.__esModule = true;
var crsClient_1 = require("./crsClient");
var trask3d_1 = require("./trask3d");
var constants_1 = require("../../../data/constants");
var THREE = require("threejs.miniprogram");
var gltf_loader_1 = require("./gltf-loader");
var GLTFLoader = (0, gltf_loader_1["default"])(THREE);
var resMgr = new trask3d_1["default"]();
var track = resMgr.track.bind(resMgr);
var arContent = {
    body: {
        camera: null,
        scene: null,
        model: null,
        renderer: null,
        animationId: null,
        canvas: null,
        inited: false,
        ctx: null,
        src: 'https://636c-cloud1-1g6gf2io118b9a8f-1314507429.tcb.qcloud.la/arModel/static-model.png?sign=ee60de11052ed0a12018baa7073b2f8a&t=1668497869',
        width: null,
        height: null
    },
};

var systemInfo = wx.getSystemInfoSync();
var SELECT_TYPE = {
    NONE: 0,
    IMAGE: 1,
    VIDEO: 2
};
Page({
    disposing: false,
    frameId: -1,
    data: {
        file: "",
        showOverlay: true,
        showContent: false,
        showSelect: false,
        showPicture: false,
        SELECT_TYPE: SELECT_TYPE,
        selectType: 0,
        isPlaying: false,
        // 人体模型可交互参数
        modelData: {
          // 模型旋转相关
          angle: 0,
          maxDegree: 90,
          minDegree: 0,
          //压强公式的参数
          arteryConst: 13.33, //kPa 心脏动脉血压
          venaConst: 0.27, //kPa 心脏静脉血压
          density: 1, // k-kg/m3 血液密度
          g: 9.8, 
          deltaHead: 0.5, // 心脏离头的距离
          deltaFoot: 1.2,
          heightHead: null, //高度差, 
          heightFoot: null,
          // 血压
          arteryPressure: {
            head: "13.33",
            foot: "0.27"
          },
          venaPressure: {
            head: '13.33',
            foot: "0.27"
          }
        },
        showModel: false,
        //CRS配置
        config: {
            token: constants_1.EASYAR_TOKEN,
            cloudKey: constants_1.EASYAR_CLOUD_KEY,
            clientHost: constants_1.EASYAR_CLOUD_URL,
            jpegQuality: 1,
            minInterval: 1000
        },
        //识别到这个数组中的ID就触发内容
        targetIds: constants_1.EASYAR_IMG_ID,
        showLoading: false,
        showLoadingText: "加载中，请稍后...",
        showStep: 0,
        audioCtx: null,
        isAudioPlaying: false,
        videoCtx: null,
        isVideoPlaying: false
    },
    listener: null,
    canvas: null,
    runningCrs: false, //null
    busy: false, // null
    crsClient: null,
    last: null,
    tang_first:false,
    onLoad: function () { },
    onReady: async function () {
      this.onCameraInit();
    },
    showLoading: function (text) {
      this.setData({
          showLoading: true,
          showLoadingText: text
      });
    },
    hideLoading: function () {
        this.setData({
            showLoading: false
        });
    },
    onCameraInit: function () {
        var _this = this;
        var query = wx.createSelectorQuery();
        query
            .select("#capture")
            .fields({ node: true })
            .exec(function (res) {
            var canvas = res[0].node;
            //设置canvas内部尺寸为480*640，frame-size="medium"的设置下相机帧大多是480*640
            canvas.width = 480;
            canvas.height = 640;
            _this.canvas = canvas;
            _this.crsClient = new crsClient_1.CrsClient(_this.data.config, _this.canvas);
            //开始监听相机帧
            var cameraContext = wx.createCameraContext();
            _this.listener = cameraContext.onCameraFrame(function (frame) {
                if (!_this.canvas)
                    return;
                var canvas = _this.canvas;
                //如果尺寸不匹配，就修改canvas尺寸以适应相机帧
                if (canvas.width !== frame.width || canvas.height !== frame.height) {
                    canvas.width = frame.width;
                    canvas.height = frame.height;
                }
                _this.queryImage(frame);
            });
        });
    },
    queryImage: function (frame) {
      var _this = this;
      // 若crs客户端初始化/crs未运行/正在请求则不可继续
      if (!this.crsClient || !this.runningCrs || this.busy)
          return;
      
      // 设置最短CRS请求间隔
      var now = new Date().getTime();
      if (this.last && now - this.last < this.data.config.minInterval)
          return
      this.last = now
      this.busy = true //如果正在进行CRS请求，就不允许再次请求
      this.crsClient
          .queryImage(frame)
          .then(function (res) {
          if (!_this.runningCrs)
              return; //避免在停止后仍然触发
          var result = res && res.result;
          if (!result)
              return;
          if (result.target) {
            //如果待触发的id列表中存在识别到的这个id，就触发
            if (_this.data.targetIds.find(function (targetId) { return targetId === result.target.targetId; })) {
                _this.onResult(_this.data.targetIds.indexOf(result.target.targetId));
            }
          } else {
            wx.showToast({
              title: "请重新尝试", //result.message,
              icon:"none"
            });
            _this.back();
          }
          _this.busy = false
      }).catch(function (e) {
        wx.showToast({
          title: "客户端错误,请重试",
          icon:"none"
        });
        _this.busy = false
        _this.back();
        console.log(e);
      }); //小程序iOS端不支持finally，所以在then和catch里分别设置busy = false
    },
    onResult: function (id) {
      this.runningCrs = false;
      this.listener.stop()
      this.hideLoading();
      wx.showToast({
        title: this.data.showContent,
      })
      let showStep = 0
      if (id == 0 || id == 1) {
        showStep = 0
      } else if (id == 2) {
        showStep = 4
      } else if (id == 3) {
        showStep = 5
      } else if (id == 4) {
        showStep = 6
      }
      this.setData({
          showOverlay: false,
          showContent: true,
          selectType: SELECT_TYPE.IMAGE,
          showStep: showStep
      });
    },
    back: function () {
      // 返回摄像头界面 用户可以重新点击识别按钮
      this.runningCrs = false;
      this.listener.stop()
      this.hideLoading();
    },
    scan: function () {
      this.runningCrs = true;
      if (this.listener) {
        //页面隐藏时相机帧的监听会自动停止，但恢复展示时不会自动启动，这里手动启动
        this.listener.start()
      } else {
        wx.showToast({
          title: '相机初始化失败',
        })
        return 
      }
      this.showLoading("识别中");
    },
    initModel: function (selector, type) {
      let _this = this
      var query = wx.createSelectorQuery()
      query.select(selector).fields({node: true}).exec(function (res) {
        let canvas = null
        if (res[0] && res[0].node) {
          canvas = res[0].node
          canvas.width = 600
          canvas.height = 480
        } else {
          console.log("canvas is null")
          return
        }
        arContent[type].canvas = canvas;
        
        let ctx = arContent[type].canvas.getContext("2d")
        ctx.translate(canvas.width / 2, canvas.height / 2)
        arContent[type].ctx = ctx
        const img = canvas.createImage()
        img.src = arContent[type].src

        arContent[type].width = canvas.width * 0.8
        arContent[type].height = canvas.height * 0.3
        img.onload = function(){
            arContent[type].model = img
            arContent[type].ctx.drawImage(img, 
              -arContent[type].width / 2, 
              -arContent[type].height / 2, 
              arContent[type].width,
              arContent[type].height);
            arContent[type].inited = true
            _this.setData({
              showModel: true
            })
        }
      });
    },

    // 切换进入不同的交互界面
    changeStep: function (e) {
      if (this.data.howStep == 1) {
        this.setData({
          showModel: false
        })
      }
      if (this.data.showStep == 2) {
        this.handleAudioCancel()
      }
      if (this.data.showStep == 7 || this.data.showStep == 8 || this.data.showStep == 3) {
        this.handleVideoCancel()
      }
      this.setData({
          showStep: e.currentTarget.dataset.value
      }, 
      function () {
        var selector = "";
        if (this.data.showStep == 1) {
          this.calPreessure(0)
          selector = "#body";
          this.initModel(selector, "body");
          let id = setInterval(()=>{
            if (arContent['body'].inited) {
              clearInterval(id)
              this.animate('body');
            }
          }, 1000)
        } 
      });
    },
    calPreessure: function(angle) {
      const degree = angle / 180 * Math.PI
      const heightHead = this.data.modelData.deltaHead * Math.sin(degree)
      const heightFoot = this.data.modelData.deltaFoot * Math.sin(degree)
      const arteryPress = this.data.modelData.arteryConst 
      const venaPress = this.data.modelData.venaConst
      const { density, g } = this.data.modelData

      const headArteryPressure = arteryPress - density * g * heightHead
      
      const headVenaPressure = venaPress - density * g * heightHead
      
      const footArteryPressure = arteryPress + density * g * heightFoot
      
      const footVenaPressure = venaPress + density * g * heightFoot
      
      const temp = { ...this.data.modelData }
      temp.arteryPressure = {
        head: headArteryPressure.toFixed(2),
        foot: footArteryPressure.toFixed(2)
      }
      temp.venaPressure = {
        head: headVenaPressure.toFixed(2),
        foot: footVenaPressure.toFixed(2)
      }
      temp.angle = angle
      temp.heightHead = heightHead.toFixed(2)
      temp.heightFoot = heightFoot.toFixed(2)
      this.setData({
        modelData: temp
      })

    },

    handleRotateDegreeChange: function(event) {
      const pre_angle = this.data.modelData.angle
      const delta = event.detail.value - pre_angle
      const degree =  - delta / 180 * Math.PI // 加负号是因为默认旋转方向是顺时针 而希望能逆时针转
      this.calPreessure(event.detail.value)
      const { inited, ctx, model, width, height, canvas} = arContent['body']
      if (inited) {
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
        ctx.rotate(degree)
        ctx.drawImage(model, -width / 2, - height / 2, width, height);
      }

    },
    playPicture: function() {
      this.setData({
        showPicture: !this.data.showPicture
      })
    },
    playAudio: function () {
      var query = this.createSelectorQuery();
      var _this = this;
      query.select("#video4").context(function (res) {
        if (!_this.data.audioCtx) {
          let audio = wx.createInnerAudioContext();
          audio.src = "cloud://cloud1-1g6gf2io118b9a8f.636c-cloud1-1g6gf2io118b9a8f-1314507429/audio/audio.mp3"
          audio.onCanplay(function () {
            res.context.play();
            _this.setData({
              isPlaying: true,
              isAudioPlaying: true
            });
          });
          _this.data.audioCtx = audio
        }
        if (_this.data.isAudioPlaying) {
          _this.data.audioCtx.pause()
          res.context.pause();
          _this.setData({
            isAudioPlaying: false,
            isPlaying: false
          })
        } else {
          _this.data.audioCtx.play()
          res.context.play();
          _this.setData({
            isAudioPlaying: true,
            isPlaying: true
          })
        }

      });
      query.exec();
    },
    handleVideo4End: function () {
      this.setData({
          isPlaying: false
      });
    },
    handleAudioCancel: function() {
      if (this.data.audioCtx) {
        this.data.audioCtx.pause()
        this.setData({
          audioCtx: null,
          isPlaying: false,
          isAudioPlaying: false
        })
      } else {
        this.setData({
          isPlaying: false,
          isAudioPlaying: false
        })
      }
    },
    goback: function (e) {
      var newStep = 0;
      this.changeStep({
        currentTarget: {
          dataset: {
              value: newStep
          }
        }
      });
    },
    goToCamera: function () {
      this.setData({
        showContent: false,
        showOverlay: true
      })
    },
    playVideo5: function () {
      let _this = this
        var query = wx.createSelectorQuery();
        query["in"](this)
            .select("#video5")
            .context(function (res) {
            // full函数只在真机上才会生效
            if (!_this.data.videoCtx) {
              _this.data.videoCtx = res.context
            }
            if (!_this.data.isVideoPlaying) {
              res
              _this.data.videoCtx.requestFullScreen()
              _this.data.videoCtx.play()
              _this.setData({
                isVideoPlaying: true
              })
            } else {
              _this.data.videoCtx.stop()
              _this.setData({
                isVideoPlaying: false
              })
            }
        }).exec();
    },
    handleVideoCancel: function () {
      if (this.data.videoCtx) {
        this.data.videoCtx.stop()
        this.setData({
          videoCtx: null,
          isVideoPlaying: false,
        })
      } else {
        this.setData({
          isVideoPlaying: false
        })
      }
    },
    handleFullScreen: function (e) {
      let fullScreen = e.detail.fullScreen //值true为进入全屏，false为退出全屏
      if (!fullScreen ){ //退出全屏
        this.handleVideoCancel()
      }
    }

});
