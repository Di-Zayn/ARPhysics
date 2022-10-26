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
    lie: {
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
        pageLoading: false,
        showAnimate: false,
        showPicture: false,
        showModel1:false,
        // 模型可交互参数
        modelData: {
          angle: 0,
          maxDegree: 90,
          minDegree: 0,

        },
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
        isPageLoading: true
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
        // this.loadAssets();
        // standModel = await this.loadGlb(
        //   "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/zhanli.gltf?sign=9baad86b84d83199daa63bafdc2b0a12&t=1641339879"
        // );
        // console.log("standModel", standModel);
        // this.loadAssets();
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
    onShow: function () {
        if (this.listener)
            this.listener.start(); //页面隐藏时相机帧的监听会自动停止，但恢复展示时不会自动启动，这里手动启动
    },
    onCameraInit: function () {
        var _this = this;
        //找到canvas对象
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
            _this.listener.start();
        });
    },
    queryImage: function (frame) {
        var _this = this;
        // 若crs未运行/正在请求/crs客户端初始化则不可继续
        if (!this.runningCrs || this.busy || !this.crsClient)
            return;

        // 设置最短CRS请求间隔
        var now = new Date().getTime();
        if (this.last && now - this.last < this.data.config.minInterval)
            return
        this.last = now;
        this.busy = true; //如果正在进行CRS请求，就不允许再次请求
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
                    _this.onResult();
                }
            } else {
              // 用于快速调试:
              _this.onResult();
              // wx.showToast({
              //   title: "请重新尝试", //result.message,
              //   icon:"none"
              // });
              // setTimeout(()=>{
              //   _this.back();
              // }, 500);
            }
            _this.busy = false;
        }).catch(function (e) {
            _this.busy = false;
            console.log(e);
        }); //小程序iOS端不支持finally，所以在then和catch里分别设置busy = false
    },
    onResult: function () {
        this.runningCrs = false;
        this.hideLoading();
        wx.showToast({
          title: this.data.showContent,
        })
        this.setData({
            showOverlay: false,
            showContent: true,
            selectType: SELECT_TYPE.IMAGE
        });
    },
    back: function () {
        this.runningCrs = false;
        this.setData({
            showOverlay: true,
            showContent: false,
            selectType: SELECT_TYPE.NONE
        });
        this.hideLoading();
    },
    experience: function () {
        this.setData({
            showOverlay: false,
            showContent: true,
            selectType: SELECT_TYPE.IMAGE
        });
    },
    scan: function () {
        this.runningCrs = true;
        this.setData({
            showOverlay: true,
            showContent: false,
            selectType: SELECT_TYPE.NONE
        });
        this.showLoading("识别中");
    },
    selectContent: function (e) {
        this.setData({
            selectType: e.currentTarget.dataset.contenttype
        });
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
              var gl = canvas.getContext("webgl", {
                  alpha: true
              });
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

          // content.model.scale.set(1, 1, 1)
          // content.model.position.set(0, -5, 0)
          
          // traverse本身是一个循环 遍历父物体的所有子物体
          // content.model.traverse(function (obj) {
          // });
          
          // 将人体上的牌子去掉
          content.model.children[1].visible = false 
          content.model.children[2].visible = false 
          content.model.children[3].visible = false 
          // content.model.children[5].translateX(0.01)

          content.model.updateMatrixWorld();
        }, function (e) {
            console.error(e);
        });

        content.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
        content.renderer.setPixelRatio(systemInfo.devicePixelRatio);
        if (_this.data.showStep == 3) {
          if (type == "lie") {
            content.renderer.setSize((systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2 + 120, (systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2 + 120);
          } else if (type == "stand") {
            content.renderer.setSize((systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2, (systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2);
          }
        }
        else {
            content.renderer.setSize(canvas.width, canvas.height);
        }
        content.inited = true
    },

    animate: function (type) {

      // var that = this;
      // var canvas = arContent[type].canvas    
      // 本身是静态的动画 就不用再不停的渲染了
      // var aniId = canvas.requestAnimationFrame(function () {
      //   // 该函数是每次页面刷新前的回调函数
      //   // 不断调用实现渲染
      //   // return that.animate(type);
      // });
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
            if (arContent[type].animationId) {
              this.clear3d(type)
            }
          }
          if (this.data.showStep == 1) {
            selector = "#lie";
            config = {
              camera: [1, 0.1, 1000],
              pos: [130, 40, 0],
              src: "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914"
            };
            this.initModel(selector, config, "lie");
            let id1 = setInterval(()=>{
              if (arContent['lie'].inited) {
                clearInterval(id1)
                this.animate('lie');
              }
            }, 1000)
          } else if (this.data.showStep == 2) {
            selector = "#stand";
            config = {
              camera: [1, 0.1, 1000],//[0.74, 0.1, 1000],
              pos: [150, 0, 8],//[150, 100, 120],
              src: "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914"
              //"https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508"
            };
            this.initModel(selector, config, "stand");
            let id2 = setInterval(()=>{
              if (arContent['stand'].inited) {
                clearInterval(id2)
                this.animate('stand');
              }
            }, 1000)
          } else if (this.data.showStep == 3) {
            this.initModel("#lie", {
                camera: [1.2, 0.1, 1000],
                pos: [100, 20, 20],
                src: "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914"
            }, "lie");
            this.initModel("#stand", {
                camera: [0.55, 0.1, 1000],
                pos: [150, 50, 120],
                src: "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914"
                //"https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508"
            }, "stand");
            // initModel后 需要一定的时间渲染 不能接着执行animate
            // 如果把animate放在initThree中执行会导致id被两个模型抢占
            let id1 = setInterval(()=>{
              if (arContent['lie'].inited) {
                clearInterval(id1)
                this.animate('lie');
              }
            }, 1000)
            let id2 = setInterval(()=>{
              if (arContent['stand'].inited) {
                clearInterval(id2)
                this.animate('stand');
              }
            }, 1000)
          }
        });
    },
    handleRotateDegreeChange: function(event) {
      console.log(event)
      const degree = event.detail.value
      const key = event.currentTarget.dataset.key
      console.log(arContent['lie'].model)
      console.log(arContent['lie'].camera)
      if (arContent['lie'].inited) {
        if (key == 'degree') {
          arContent['lie'].model.rotation.x = degree/180 * Math.PI
        } else if (key == 'x') {
          arContent['lie'].model.children[5].translateX(0.005)
          arContent['lie'].model.children[5].translateZ(0.005)
        }
        // arContent['lie'].model.rotation.x = degree/180 * Math.PI
        this.animate('lie')
      }
    },
    playAnimate: function(e){
      // console.log("555");
      this.setData({
          showAnimate: !this.data.showAnimate
      });
      var query = this.createSelectorQuery();
      const video = query.select("#video6");
      // // const texture = new THREE.VideoTexture(video)//创建视频纹理
      // var texture = new THREE.VideoTexture(video);
      //   texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      //   texture.minFilter = THREE.LinearFilter;
      //   var geometry = new THREE.PlaneGeometry(500, 1000); //矩形平面
      //   var material = new THREE.MeshPhongMaterial({
      //       map: texture, // 设置纹理贴图
      //       side:THREE.DoubleSide
      //   }); //材质对象Material
      //   var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      //   var content = arContent["lie"];
      //   content.scene.add(mesh);
    },
    playModel1:function(e){
        this.setData({
            showModel1: !this.data.showModel1
          });
    },
    playPicture: function(e){
      // console.log("555");
      // 如果用户自己没有关的话 需要在切页面的时候处理一下
      this.setData({
        showPicture: !this.data.showPicture
      });
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
        var showStep = this.data.showStep;
        var newStep = 0;
        if (showStep == 3) {
            newStep = 1;
        }
        // this.setData({
        //   showStep: newStep,
        // });
        this.changeStep({
            currentTarget: {
                dataset: {
                    value: newStep
                }
            }
        });
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
    onTX: function (e) {
        this.platform.dispatchTouchEvent(e);
    },
    loadAssets: function () {
        var _this = this;
        var query = wx.createSelectorQuery();
        query
            .select("#loaderNeed")
            .node()
            .exec(function (res) {
            var canvas = res[0].node;
            new THREE.global.registerCanvas(canvas);
            var requests = [];
            [
                "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=66f750ae7eb401e789bfc32c23f31c48&t=1636428963",
                "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508",
            ].forEach(function (item) {
                requests.push(_this.loadGlb(item));
            });
            Promise.all(requests)
                .then(function (res) {
                wx.showToast({
                    title: "成功啦",
                    icon: "success"
                });
                console.log(res);
                // lieModel = res[0].scene;
                // standModel = res[1].scene;
                lieModel = res[0];
                standModel = res[1];
                _this.setData({
                    isPageLoading: false
                });
            })["catch"](function (err) {
                console.log(err);
                wx.showToast({
                    title: err.message,
                    icon: "error",
                    duration: 10000
                });
            });
        });
    },
    loadGlb: function (src) {
        return new Promise(function (resolve, reject) {
            var loader = new GLTFLoader();
            loader.setCrossOrigin('Anonymous');//跨域问题
            loader.load(src, function (gltf) {
                // cb && cb(gltf);
                resolve(gltf);
            }, undefined, function (e) {
                wx.showToast({
                    title: "失败啦" + e.message,
                    icon: "error",
                    duration: 10000
                });
                reject(e);
            });
        });
    }
});
