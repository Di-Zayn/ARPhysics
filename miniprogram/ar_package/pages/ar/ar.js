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
        canvas: null
    },
    stand: {
        camera: null,
        scene: null,
        model: null,
        renderer: null,
        animationId: null,
        canvas: null
    },
    anima: {
      camera: null,
      scene: null,
      model: null,
      renderer: null,
      animationId: null,
      canvas: null
    }
};
var standModel, lieModel;

var ani1, ani2, ani3;
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
            return;

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
                    _this.onResult(result.target);
                }
            }
            else {
                wx.showToast({
                  title: "请重新尝试", //result.message,
                  icon:"none"
                });
                setTimeout(()=>{
                  _this.back();
                }, 500);
                console.log("识别失败", result);
                //_this.onResult(result);
            }
            _this.busy = false;
        }).catch(function (e) {
            _this.busy = false;
            console.log(e);
        }); //小程序iOS端不支持finally，所以在then和catch里分别设置busy = false
    },
    onResult: function (target) {
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
        var query = wx.createSelectorQuery();
        query
            .select(selector)
            .node()
            .exec(function (res) {
              var canvas = null
              if (res[0] && res[0].node) {
                canvas = res[0].node
              } else {
                return
              }
              var gl = canvas.getContext("webgl", {
                  alpha: true
              });
              arContent[type].canvas = canvas;
              that.initTHREE(new THREE.global.registerCanvas(canvas), config, type);
              // if (that.data.showStep == 1) {
              //   canvas.width = 300;
              //   canvas.height = 300;
              // } else if (that.data.showStep == 3) {
              //   canvas.width = 300;
              //   canvas.height = 300;
              // }              

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
        gltfLoader.load(config.src, function (gltf) {

          content.model = gltf.scene;
          track(content.model);
          content.scene.add(content.model);
          
          // traverse本身是一个循环 遍历父物体的所有子物体
          content.model.traverse(function (obj) {
            if (type == "lie") {
              if (_this.data.showStep == 1) {
                if(obj.children[7] != undefined){
                  obj.children[7].translateX(-0.01);
                }
                if(obj.children[5] != undefined){
                  obj.children[5].translateX(-0.005);
                }  
              }
              else if (_this.data.showStep == 3) {
                obj.translateX(1);
              }
            } else if(type == "stand") {
              obj.translateY(-1);
              obj.translateX(0.2);
              obj.children.forEach(function (element) {
                  element.rotateY(Math.PI / 4);
              });
              if(obj.children[2] != undefined){
                obj.children[2].translateZ(0.045); // 裤子
                obj.children[2].translateX(-0.03);
                obj.children[2].translateY(0.02);
              }
              if(obj.children[3] != undefined){
                //qzx 头发
                obj.children[3].translateZ(0.05);
                obj.children[3].translateX(-0.05);
                obj.children[3].translateY(0.01);
              }
              if(obj.children[5] != undefined){
                //qzx 衣服
                console.log('obj.children[5]')
                obj.children[5].translateX(-0.015);
                //obj.children[5].translateY(0.001)
              }
            }
          });
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
        //调用动画
        this.animate(canvas);
    },
    animate: function (canvas) {
      var that = this;
      var aniId = canvas.requestAnimationFrame(function () {
        //  return that.animate(canvas);
      });
      if (this.data.showStep == 1) {
        var _a = arContent["lie"], renderer = _a.renderer, scene = _a.scene, camera = _a.camera;
        console,log(_a)
        renderer && renderer.clear();
        renderer && renderer.render(scene, camera);
        ani1 = aniId;
        console.log(ani1)

      } else if (this.data.showStep == 2) {
        var _b = arContent["stand"], renderer = _b.renderer, scene = _b.scene, camera = _b.camera;
        renderer && renderer.clear();
        renderer && renderer.render(scene, camera);
        ani2 = aniId;
      }else if (this.data.showStep == 3) {
        var _c = arContent["lie"], renderer = _c.renderer, scene = _c.scene, camera = _c.camera;
        var _d = arContent["stand"], renderer2 = _d.renderer, scene2 = _d.scene, camera2 = _d.camera;
        console.log(_c)
        console.log(_d)
        renderer && renderer.clear();
        renderer2 && renderer2.clear();
        renderer && renderer.render(scene, camera);
        renderer2 && renderer2.render(scene2, camera2);
        ani3 = aniId;
        console.log(ani3)
      }
    },
    clear3d: function (type) {
      
      if (type == 1 || type == 2) {
        var _a = type == 1 ? arContent["lie"] : arContent["stand"], canvas = _a.canvas, renderer = _a.renderer, camera = _a.camera, model = _a.model, scene = _a.scene;
        ani1 && canvas.cancelAnimationFrame(ani1);
        if (renderer) {
          if (type == 1) {
            // arContent["lie"].renderer.forceContextLoss();
            // arContent["lie"].renderer.clearDepth();
            // arContent["lie"].renderer.resetGLState();
            // arContent["lie"].renderer.clearStencil();
            arContent["lie"].renderer.clear();
            arContent["lie"].renderer.dispose();
            arContent["lie"].renderer.domElement = null;
            arContent["lie"].renderer = null;
          } else {
            // arContent["stand"].renderer.forceContextLoss();
            // arContent["stand"].renderer.clearDepth();
            // arContent["stand"].renderer.resetGLState();
            // arContent["stand"].renderer.clearStencil();
            arContent["stand"].renderer.clear();
            arContent["stand"].renderer.dispose();
            arContent["stand"].renderer.domElement = null;
            arContent["stand"].renderer = null;
          }
        }
        if (scene) {
          if (type == 1) {
            arContent["lie"].scene.dispose();
            arContent["lie"].scene = null;
          }
          else {
            arContent["stand"].scene.dispose();
            arContent["stand"].scene = null;
          }
        }
        if (model) {
          if (type == 1) {
            arContent["lie"].model.dispose();
            arContent["lie"].model = null;
          } else {
            arContent["stand"].model.dispose();
            arContent["stand"].model = null;
          }
        }
        if (type == 1) {
          arContent["lie"].camera = null;
        } else {
          arContent["stand"].camera = null;
        }
      } else {

        ani1 && arContent["lie"].canvas.cancelAnimationFrame(ani1);
        ani3 && arContent["lie"].canvas.cancelAnimationFrame(ani3);
        wx.showToast({
          title: 'clear3!!!',
        })
        setTimeout(()=>{
        }, 1000)

        if (arContent["lie"].renderer) {
          // arContent["lie"].renderer.forceContextLoss();
          // arContent["lie"].renderer.clearDepth();
          // arContent["lie"].renderer.resetGLState();
          // arContent["lie"].renderer.clearStencil();
          arContent["lie"].renderer.clear();
          arContent["lie"].renderer.dispose();
          arContent["lie"].renderer.domElement = null;
          arContent["lie"].renderer = null;
        }
        if (arContent["lie"].scene) {
          arContent["lie"].scene.dispose();
          arContent["lie"].scene = null;
        }
        if (arContent["lie"].model) {
          arContent["lie"].model.dispose();
          arContent["lie"].model = null;
        }
        arContent["lie"].camera = null;
        ani2 && arContent["stand"].canvas.cancelAnimationFrame(ani2);
        ani3 && arContent["stand"].canvas.cancelAnimationFrame(ani3);
        if (arContent["stand"].renderer) {
          // arContent["stand"].renderer.forceContextLoss();
          // arContent["stand"].renderer.clearDepth();
          // arContent["stand"].renderer.resetGLState();
          // arContent["stand"].renderer.clearStencil();
          arContent["stand"].renderer.clear();
          arContent["stand"].renderer.dispose();
          arContent["stand"].renderer.domElement = null;
          arContent["stand"].renderer = null;
        }
        if (arContent["stand"].scene) {
          arContent["stand"].scene.dispose();
          arContent["stand"].scene = null;
        }
        if (arContent["stand"].model) {
          arContent["stand"].model.dispose();
          arContent["stand"].model = null;
        }
        arContent["stand"].camera = null;
      }
      // THREE.BufferGeometry.dispose();
      // THREE.Material.dispose();
      // THREE.Texture.dispose();
      // THREE.WebGLRenderTarget.dispose();
      // THREE.Scene.dispose();
    },
    // 切换进入不同的交互界面
    changeStep: function (e) {
        var pre_step = this.data.showStep;
        this.setData({
            showStep: e.currentTarget.dataset.value
        }, function () {
            var config = {}, selector = "";
            if (this.data.showStep == 1) {
              // 记得要清除之前界面的模型
              // 目前是只有3界面存在模型
              if (pre_step == 3) {
                console.log(ani1)
                console.log(ani2)
                ani1 && ani2 && this.clear3d(3);
              } else {
                ani2 && this.clear3d(2);
              }
              // selector = "#lie";
              // config = {
              //   camera: [1, 0.1, 1000],
              //   pos: [100, 40, 8],
              //   src: "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914"
              // };
              this.initModel(selector, config, "lie");
            }
            else if (this.data.showStep == 2) {
              if (pre_step == 3) {
                ani1 && ani2 && this.clear3d(3);
              } else {
                ani2 && this.clear3d(1);
              }
              // selector = "#stand";
              // config = {
              //   camera: [0.74, 0.1, 1000],
              //   pos: [150, 100, 120],
              //   src: "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508"
              // };
              this.initModel(selector, config, "stand");
            } else if (this.data.showStep == 3) {
              this.initModel("#lie", {
                  camera: [1.2, 0.1, 1000],
                  pos: [100, 20, 20],
                  src: 
                  "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914"
              }, "lie");
              this.initModel("#stand", {
                  camera: [0.55, 0.1, 1000],
                  pos: [150, 50, 120],
                  src: 
                  "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508"
              }, "stand");
            }
        });
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
      this.setData({
        showPicture: !this.data.showPicture
      });
    },
    playAudio: function () {
        var query = this.createSelectorQuery();
        var me = this;
        query.select("#video4").context(function (res) {
            var audio = wx.createInnerAudioContext();
            if (!me.data.isPlaying) {
                audio.src =
                    "cloud://cloud1-0gwuxkfae8d5a879.636c-cloud1-0gwuxkfae8d5a879-1307053172/ar/audio.mp3";
                audio.onCanplay(function () {
                    audio.play();
                    res.context.play();
                    me.setData({
                        isPlaying: true
                    });
                });
                audio.onStop(function () {
                    me.setData({
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
