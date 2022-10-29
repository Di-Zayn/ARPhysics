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
        inited: false
    },
    stand: {
        camera: null,
        scene: null,
        model: null,
        renderer: null,
        animationId: null,
        canvas: null,
        inited: false
    },
    anima: {
      camera: null,
      scene: null,
      model: null,
      renderer: null,
      animationId: null,
      canvas: null,
      inited: false
    }
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
            console.log("识别成功", result.target.targetId);
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
      // this.listener.stop() // 不加也可以 页面切换会自动调用
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
    initModel: function (selector, config, type) {
        var that = this;
        var query = wx.createSelectorQuery()
        query
            .select(selector).fields({node: true}).exec(function (res) {
              let canvas = null
              if (res[0] && res[0].node) {
                canvas = res[0].node
              } else {
                console.log("canvas is null")
                return
              }
              arContent[type].canvas = canvas;
              that.initTHREE(new THREE.global.registerCanvas(canvas), config, type);
        });
    },
    initTHREE: function (canvas, config, type) {
        var _this = this;
        var content = arContent[type];

        // 创建相机及设置位置和朝向
        content.camera = new THREE.PerspectiveCamera(config.camera[0], canvas.width / canvas.height, config.camera[1], config.camera[2]);
        content.camera.position.set(config.pos[0], config.pos[1], config.pos[2]);
        content.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // 创建环境
        content.scene = new THREE.Scene();
        // content.scene.background = new THREE.Color(0xeef4fd)

        // 创建光源
        var light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        content.scene.add(light);

        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 10);
        content.scene.add(light);

        // 创建gltf加载器 用于载入http请求返回的gltf文件
        var gltfLoader = new GLTFLoader();
        // var loader = new THREE.FBXLoader();
        gltfLoader.load(config.src, function (gltf) {
          content.model = gltf.scene;
          track(content.model);
          content.scene.add(content.model);

          // 由于已经存在指标且牌子是静态的，将人体上的牌子去掉 注意模型传过来的时候顺序是不一定的 需要检查name
          let deleteList = ['tang-zubu', 'tang-xingzhang', 'tang-toubu']
          for (let i = 0; i < content.model.children.length; i++) {
            if (deleteList.indexOf(content.model.children[i].name) != -1) {
              content.model.children[i].visible = false
            }
            if (content.model.children[i].name == 'maofa002') {
              content.model.children[i].translateX(-0.005)
            }
            if (content.model.children[i].name == 'renti002') {
              content.model.children[i].translateX(-0.01)
            }
          }

          content.model.updateMatrixWorld();
          
          // 该函数是异步的 所以最终的渲染和inited加在这里
          content.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true });
          content.renderer.setPixelRatio(systemInfo.devicePixelRatio);
          // 设置背景色与小程序背景色一致
          content.renderer.setClearColor(0xeef4fd, 1)
          // 设置背景为透明 这样销毁模型后对应canvas不会再有颜色
          content.renderer.setClearAlpha(0.1)
          content.renderer.setSize(canvas.width, canvas.height);
          content.inited = true
          _this.setData({
            showModel: true
          })
        }, function (e) {
            console.error(e);
        });
    },

    animate: function (type) {

      // var that = this;
      // var canvas = arContent[type].canvas    
      // // 本身是静态的动画 就不用再不停的渲染了
      // var aniId = canvas.requestAnimationFrame(function () {
      //   // 该函数是每次页面刷新前的回调函数
      //   // 不断调用实现渲染
      //   return that.animate(type);
      // });
      // // 只要是用的同一个canvas 就可以共用一个aniId
      // arContent[type].animationId = aniId

      const { renderer, scene, camera } = arContent[type]
      renderer && renderer.clear();
      renderer && renderer.render(scene, camera);

    },

    clear3d: function (type) {
      
      const { canvas, renderer, model , scene, animationId } = arContent[type]

      // animationId && canvas.cancelAnimationFrame(animationId)
      arContent[type].camera = null
      arContent[type].inited = false

      if (renderer) {
        // arContent[type].renderer.forceContextLoss();
        // arContent[type].renderer.clearDepth();
        // arContent[type].renderer.resetGLState();
        // arContent[type].renderer.clearStencil();
        arContent[type].renderer.clear();
        arContent[type].renderer.dispose();
        arContent[type].renderer.domElement = null;
        arContent[type].renderer = null;
      }

      if (scene) {
        arContent[type].scene.dispose();
        arContent[type].scene = null;
      }

      if (model) {
        arContent[type].model.dispose();
        arContent[type].model = null;
      }
      
      this.setData({
        showModel: false
      })
      // THREE.BufferGeometry.dispose();
      // THREE.Material.dispose();
      // THREE.Texture.dispose();
      // THREE.WebGLRenderTarget.dispose();
      // THREE.Scene.dispose();
    },

    // 切换进入不同的交互界面
    changeStep: function (e) {
        this.setData({
            showStep: e.currentTarget.dataset.value
        }, 
        function () {
          var config = {}, selector = "";
          for (let type in arContent) {
            if (arContent[type].inited) {
              this.clear3d(type)
            }
          }
          if (this.data.showStep == 1) {
            this.calPreessure(0)
            selector = "#body";
            config = {
              camera: [1, 0.1, 1000],
              pos: [130, 40, 0],
              src: "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914"
            };
            this.initModel(selector, config, "body");
            // initModel后 需要一定的时间渲染 不能接着执行animate
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
      const degree = event.detail.value / 180 * Math.PI
      this.calPreessure(event.detail.value)

      if (arContent['body'].inited) {
        arContent['body'].model.rotation.x = degree
        this.animate('body')
      }

    },
    playAudio: function () {
      var query = this.createSelectorQuery();
      var _this = this;
      query.select("#video4").context(function (res) {
        var audio = wx.createInnerAudioContext();
        if (!_this.data.isPlaying) {
          audio.src = "cloud://cloud1-1g6gf2io118b9a8f.636c-cloud1-1g6gf2io118b9a8f-1314507429/audio/Oasis - Don't Look Back In Anger.ncm"
              //"cloud://cloud1-0gwuxkfae8d5a879.636c-cloud1-0gwuxkfae8d5a879-1307053172/ar/audio.mp3";
          audio.onCanplay(function () {
            audio.play();
            res.context.play();
            _this.setData({
              isPlaying: true
            });
          });
          audio.onStop(function () {
            _this.setData({
              isPlaying: false
            });
          });
        }
      });
      query.exec();
    },
    handleVideo4End: function () {
      this.setData({
          isPlaying: false
      });
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
        var query = wx.createSelectorQuery();
        query["in"](this)
            .select("#video5")
            .context(function (res) {
            // full函数只在真机上才会生效
            res.context.requestFullScreen();
            res.context.play();
        }).exec();
    },
    onUnload: function () { },
});
