import { CrsClient } from "./crsClient";
import ResourceTracker from "./trask3d";
import {
  EASYAR_IMG_ID,
  EASYAR_CLOUD_KEY,
  EASYAR_CLOUD_SECRET,
  EASYAR_CLOUD_URL,
  EASYAR_API_KEY,
  EASYAR_API_SECRET,
  EASYAR_TOKEN,
} from "../../../data/constants";

import * as THREE from "threejs.miniprogram";
import gLTF from "./gltf-loader";
const GLTFLoader = gLTF(THREE);

const resMgr = new ResourceTracker();
const track = resMgr.track.bind(resMgr);

const arContent = {
  lie: {
    camera: null,
    scene: null,
    model: null,
    renderer: null,
    animationId: null,
    canvas: null,
  },
  stand: {
    camera: null,
    scene: null,
    model: null,
    renderer: null,
    animationId: null,
    canvas: null,
  },
};

let standModel, lieModel;

console.log("111");

let ani1, ani2, ani3;

const systemInfo = wx.getSystemInfoSync();

const SELECT_TYPE = {
  NONE: 0,
  IMAGE: 1,
  VIDEO: 2,
};

Page({
  disposing: false,
  frameId: -1,
  data: {
    file: "",
    showOverlay: true,
    showSelect: false,
    SELECT_TYPE: SELECT_TYPE,
    selectType: 0,
    isPlaying: false,
    pageLoading: false,
    //CRS配置
    config: {
      token: EASYAR_TOKEN,
      cloudKey: EASYAR_CLOUD_KEY,
      clientHost: EASYAR_CLOUD_URL, //服务器一般不变
      jpegQuality: 1, //JPEG压缩质量，建议不低于70%
      minInterval: 1000, //最短的两次CRS请求间隔
    },
    //识别到这个数组中的ID就触发内容
    targetIds: EASYAR_IMG_ID,
    showLoading: false,
    showLoadingText: "加载中，请稍后...",
    showStep: 0, // 0入口 1躺下 2站立 3同时 4全屏视频
    isPageLoading: true,
    showAnimate: false,
    showPicture: false,
    showModel1:false,
  },
  listener: null,
  canvas: null,
  runningCrs: null,
  busy: null,
  crsClient: null,
  last: null,
  onLoad: function () {},

  onReady() {
    this.onCameraInit();
    // this.loadAssets();
    // standModel = await this.loadGlb(
    //   "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/zhanli.gltf?sign=9baad86b84d83199daa63bafdc2b0a12&t=1641339879"
    // );
    // standModel = await this.loadGlb(
    //   "http://www.yunrusoft.top:8001/file/fefd4a9e3e8a4daab96a34f3fc5df4a8/6340e1d256a3e56b68a94949b5b086c2d73bbe35/pingtang.glb"
    // );
    // console.log("standModel", standModel);
    // this.loadAssets();
  },
  showLoading(text) {
    this.setData({
      showLoading: true,
      showLoadingText: text,
    });
  },
  hideLoading() {
    this.setData({
      showLoading: false,
    });
  },

  onShow: function () {
    if (this.listener) this.listener.start(); //页面隐藏时相机帧的监听会自动停止，但恢复展示时不会自动启动，这里手动启动
  },

  onCameraInit: function () {
    //找到canvas对象
    const query = wx.createSelectorQuery();
    query
      .select("#capture")
      .fields({ node: true })
      .exec((res) => {
        const canvas = res[0].node;
        //设置canvas内部尺寸为480*640，frame-size="medium"的设置下相机帧大多是480*640
        canvas.width = 480;
        canvas.height = 640;
        this.canvas = canvas;

        this.crsClient = new CrsClient(this.data.config, this.canvas);

        //开始监听相机帧
        let cameraContext = wx.createCameraContext();
        this.listener = cameraContext.onCameraFrame((frame) => {
          if (!this.canvas) return;
          let canvas = this.canvas;
          //如果尺寸不匹配，就修改canvas尺寸以适应相机帧
          if (canvas.width !== frame.width || canvas.height !== frame.height) {
            canvas.width = frame.width;
            canvas.height = frame.height;
          }

          this.queryImage(frame);
        });
        this.listener.start();
      });
  },

  queryImage: function (frame) {
    // wx.showToast({
    //   title: "in query",
    // });

    if (!this.runningCrs || this.busy || !this.crsClient) return;

    //最短的两次CRS请求间隔
    let now = new Date().getTime();
    if (this.last && now - this.last < this.data.config.minInterval) return;
    this.last = now;

    this.busy = true; //如果正在进行CRS请求，就不允许再次请求

    this.crsClient
      .queryImage(frame)
      .then((res) => {
        if (!this.runningCrs) return; //避免在停止后仍然触发
        let result = res && res.result;
        if (!result) return;

        if (result.target) {
          // wx.showToast({
          //   title: "成功1",
          // });
          console.log("识别成功", result.target.targetId);
          //如果待触发的id列表中存在识别到的这个id，就触发
          if (
            this.data.targetIds.find(
              (targetId) => targetId === result.target.targetId
            )
          ) {
            // wx.showToast({
            //   title: "成功2",
            // });
            this.onResult(result.target);
          }
        } else {
          // wx.showToast({
          //   title: result.message,
          // });
          console.log("识别失败", result);
          _this.onResult(result);
        }
        this.busy = false;
      })
      .catch((e) => {
        this.busy = false;
        // wx.showToast({
        //   title: "catch" + e.message,
        // });
        console.log(e);
      }); //小程序iOS端不支持finally，所以在then和catch里分别设置busy = false
  },

  onResult: function (target) {
    this.runningCrs = false;
    this.hideLoading();

    this.setData({
      showOverlay: false,
      showContent: true,
      selectType: SELECT_TYPE.IMAGE,
    });
  },

  back: function () {
    this.runningCrs = false;
    this.setData({
      showOverlay: true,
      showContent: false,
      selectType: SELECT_TYPE.NONE,
    });
    this.hideLoading();
  },

  experience: function () {
    this.setData({
      showOverlay: false,
      showContent: true,
      selectType: SELECT_TYPE.IMAGE,
    });
  },

  scan: function () {
    this.runningCrs = true;
    this.setData({
      showOverlay: false,
      showContent: false,
      selectType: SELECT_TYPE.NONE,
    });
    this.showLoading("识别中");
  },

  selectContent: function (e) {
    this.setData({
      selectType: e.currentTarget.dataset.contenttype,
    });
  },

  initModel: function (selector, config, type) {
    const that = this;
    const query = wx.createSelectorQuery();
    query
      .select(selector)
      .node()
      .exec((res) => {
        var canvas = res[0].node;
        var gl = canvas.getContext("webgl", {
          alpha: true,
        });
        if (canvas != undefined) {
          // if (that.data.showStep == 1) {
          //   canvas.width = 300;
          //   canvas.height = 300;
          // } else if (that.data.showStep == 3) {
          //   canvas.width = 300;
          //   canvas.height = 300;
          // }
          arContent[type].canvas = canvas;
          that.initTHREE(new THREE.global.registerCanvas(canvas), config, type);
        }
      });
  },

  initTHREE(canvas, config, type) {
    const me = this;
    const content = arContent[type];
    content.camera = new THREE.PerspectiveCamera(
      config.camera[0],
      canvas.width / canvas.height,
      config.camera[1],
      config.camera[2]
    );
    content.camera.position.set(config.pos[0], config.pos[1], config.pos[2]);
    content.camera.lookAt(new THREE.Vector3(0, 0, 0));
    content.scene = new THREE.Scene();
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    content.scene.add(light);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    content.scene.add(light);
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      config.src,
      function (gltf) {
        content.model = gltf.scene;
        track(content.model);
        console.log(content.model);

        content.scene.add(content.model);
        content.model.traverse((obj) => {
          if (type == "lie") {
            if (me.data.showStep == 1) {
              obj.children[7].translateX(-0.01);
              obj.children[5].translateX(-0.005);
            } else if (me.data.showStep == 3) {
              // obj.translateX(1);
            }
          } else {
            obj.translateY(-1);
            obj.translateX(0.2);
            obj.children.forEach((element) => {
              element.rotateY(Math.PI / 4);
            });
            obj.children[2].translateZ(0.045); // 裤子
            obj.children[2].translateX(-0.03);
            obj.children[2].translateY(0.02);
            obj.children[3].translateZ(0.05);
            obj.children[3].translateX(0.035);
            obj.children[3].translateY(0.01);
          }
        });
        content.model.updateMatrixWorld();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    // const gltf = type == "lie" ? lieModel : standModel;
    // content.model = gltf.scene;
    // track(content.model);
    // content.scene.add(content.model);
    // content.model.traverse((obj) => {
    //   if (type == "lie") {
    //     if (me.data.showStep == 1) {
    //       console.log("obj", obj);
    //       obj.children[7]?.translateX(-0.01);
    //       obj.children[5]?.translateX(-0.005);
    //     } else if (me.data.showStep == 3) {
    //       // obj.translateX(1);
    //     }
    //   } else {
    //     obj.translateY(-1);
    //     obj.translateX(0.2);
    //     obj.children.forEach((element) => {
    //       element.rotateY(Math.PI / 4);
    //     });
    //     obj.children[2]?.translateZ(0.045); // 裤子
    //     obj.children[2]?.translateX(-0.03);
    //     obj.children[2]?.translateY(0.02);
    //     obj.children[3]?.translateZ(0.05);
    //     obj.children[3]?.translateX(0.035);
    //     obj.children[3]?.translateY(0.01);
    //   }
    // });
    // content.model.updateMatrixWorld();

    content.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    content.renderer.setPixelRatio(systemInfo.devicePixelRatio);
    if (me.data.showStep == 3) {
      if (type == "lie") {
        content.renderer.setSize(
          (systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2 + 120,
          (systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2 + 120
        );
      } else {
        content.renderer.setSize(
          (systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2,
          (systemInfo.screenWidth * systemInfo.devicePixelRatio) / 2
        );
      }
    } else {
      content.renderer.setSize(canvas.width, canvas.height);
    }
    // content.renderer.setSize(canvas.width, canvas.height);
    //调用动画
    this.animate(canvas);
  },

  animate: function (canvas) {
    let that = this;
    const aniId = canvas.requestAnimationFrame(() => that.animate(canvas));
    if (this.data.showStep == 1) {
      const { renderer, scene, camera } = arContent["lie"];
      renderer && renderer.clear();
      renderer && renderer.render(scene, camera);
      ani1 = aniId;
    } else if (this.data.showStep == 2) {
      const { renderer, scene, camera } = arContent["stand"];
      renderer && renderer.clear();
      renderer && renderer.render(scene, camera);
      ani2 = aniId;
    } else if (this.data.showStep == 3) {
      const { renderer, scene, camera } = arContent["lie"];
      const { renderer: renderer2, scene: scene2, camera: camera2 } = arContent[
        "stand"
      ];
      renderer && renderer.clear();
      renderer2 && renderer2.clear();
      renderer && renderer.render(scene, camera);
      renderer2 && renderer2.render(scene2, camera2);
      ani3 = aniId;
    }
  },

  clear3d(type) {
    if (type == 1 || type == 2) {
      const { canvas, renderer, camera, model, scene } =
        type == 1 ? arContent["lie"] : arContent["stand"];
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
        } else {
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

  changeStep(e) {
    const pre_step = this.data.showStep;
    this.setData(
      {
        showStep: e.currentTarget.dataset.value,
      },
      function () {
        let config = {},
          selector = "";
        if (this.data.showStep == 1) {
          selector = "#lie";
          config = {
            camera: [1, 0.1, 1000],
            pos: [100, 40, 8],
            src:
              "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914",
          };
          if (pre_step == 3) {
            ani1 && ani2 && this.clear3d(3);
          } else {
            ani2 && this.clear3d(2);
          }
        } else if (this.data.showStep == 2) {
          selector = "#stand";
          config = {
            camera: [0.74, 0.1, 1000],
            pos: [150, 100, 120],
            src:
              "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508",
          };
          if (pre_step == 3) {
            ani1 && ani2 && this.clear3d(3);
          } else {
            ani1 && this.clear3d(1);
          }
        }
        if (this.data.showStep == 1) {
          this.initModel(selector, config, "lie");
        } else if (this.data.showStep == 2) {
          this.initModel(selector, config, "stand");
        } else if (this.data.showStep == 3) {
          this.initModel(
            "#lie",
            {
              camera: [1.2, 0.1, 1000],
              pos: [100, 20, 20],
              src:
                "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=5d210479bab3ea660e8c2da9d6e30a96&t=1641339914",
            },
            "lie"
          );
          this.initModel(
            "#stand",
            {
              camera: [0.55, 0.1, 1000],
              pos: [150, 50, 120],
              src:
                "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508",
            },
            "stand"
          );
        }
      }
    );
  },
  playAnimate: function(e){
    console.log("555");
    this.setData({
        showAnimate: !this.data.showAnimate
    });
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
  playAudio() {
    const query = this.createSelectorQuery();
    const me = this;
    query.select("#video4").context(function (res) {
      const audio = wx.createInnerAudioContext();
      if (!me.data.isPlaying) {
        audio.src =
          "cloud://cloud1-0gwuxkfae8d5a879.636c-cloud1-0gwuxkfae8d5a879-1307053172/ar/audio.mp3";
        audio.onCanplay(function () {
          audio.play();
          res.context.play();
          me.setData({
            isPlaying: true,
          });
        });
        audio.onStop(function () {
          me.setData({
            isPlaying: false,
          });
        });
      }
    });
    query.exec();
  },

  handleVideo4End() {
    this.setData({
      isPlaying: false,
    });
  },

  goback(e) {
    const { showStep } = this.data;
    let newStep = 0;
    if (showStep == 3) {
      newStep = 1;
    }
    // this.setData({
    //   showStep: newStep,
    // });
    this.changeStep({
      currentTarget: {
        dataset: {
          value: newStep,
        },
      },
    });
  },

  playVideo5() {
    const query = wx.createSelectorQuery();
    query
      .in(this)
      .select("#video5")
      .context(function (res) {
        res.context.requestFullScreen();
        res.context.play();
      })
      .exec();
  },

  onUnload() {},

  onTX(e: any) {
    this.platform.dispatchTouchEvent(e);
  },

  loadAssets() {
    var query = wx.createSelectorQuery();
    query
      .select("#loaderNeed")
      .node()
      .exec((res) => {
        var canvas = res[0].node;
        new THREE.global.registerCanvas(canvas);
        const requests = [];
        [
          "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/small/tang.gltf?sign=66f750ae7eb401e789bfc32c23f31c48&t=1636428963",
          "https://636c-cloud1-0gwuxkfae8d5a879-1307053172.tcb.qcloud.la/ar/new/zhanli.fbx?sign=6998091710ff75e7e37f1de0729ee462&t=1666109508",
        ].forEach((item) => {
          requests.push(this.loadGlb(item));
        });
        Promise.all(requests)
          .then((res) => {
            wx.showToast({
              title: "成功啦",
              icon: "success",
            });
            console.log(res);
            // lieModel = res[0].scene;
            // standModel = res[1].scene;
            lieModel = res[0];
            standModel = res[1];

            this.setData({
              isPageLoading: false,
            });
          })
          .catch((err) => {
            console.log(err);
            wx.showToast({
              title: err.message,
              icon: "error",
              duration: 10000,
            });
          });
      });
  },

  loadGlb(src) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        src,
        function (gltf) {
          // cb && cb(gltf);
          resolve(gltf);
        },
        undefined,
        function (e) {
          wx.showToast({
            title: "失败啦" + e.message,
            icon: "error",
            duration: 10000,
          });
          reject(e);
        }
      );
    });
  },
});
