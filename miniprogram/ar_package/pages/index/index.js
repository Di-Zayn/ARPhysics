// "use strict";
// var e = require("../../chunks/three-platformize.js");
// class t {
//   constructor(e, t) {
//     this.parts = e, this.options = t
//   }
// }
// for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = new Uint8Array(256), o = 0; o < n.length; o++) s[n.charCodeAt(o)] = o;
// class r {
//   createObjectURL(e) {
//     if (e instanceof t) {
//       const t = function (e) {
//         for (var t, s = "", o = new Uint8Array(e), r = o.byteLength, i = r % 3, a = r - i, c = 0; c < a; c += 3) t = o[c] << 16 | o[c + 1] << 8 | o[c + 2], s += n[(16515072 & t) >> 18] + n[(258048 & t) >> 12] + n[(4032 & t) >> 6] + n[63 & t];
//         return 1 == i ? (t = o[a], s += n[(252 & t) >> 2] + n[(3 & t) << 4] + "==") : 2 == i && (t = o[a] << 8 | o[a + 1], s += n[(64512 & t) >> 10] + n[(1008 & t) >> 4] + n[(15 & t) << 2] + "="), s
//       }(e.parts[0]);
//       return `data:${e.options.type};base64,${t}`
//     }
//     return ""
//   }
//   revokeObjectURL() {}
// }

// function i(e) {
//   if ((e = (e = `${e}`).replace(/[ \t\n\f\r]/g, "")).length % 4 == 0 && (e = e.replace(/==?$/, "")), e.length % 4 == 1 || /[^+/0-9A-Za-z]/.test(e)) return null;
//   let t = "",
//     n = 0,
//     s = 0;
//   for (let o = 0; o < e.length; o++) n <<= 6, n |= a(e[o]), s += 6, 24 === s && (t += String.fromCharCode((16711680 & n) >> 16), t += String.fromCharCode((65280 & n) >> 8), t += String.fromCharCode(255 & n), n = s = 0);
//   return 12 === s ? (n >>= 4, t += String.fromCharCode(n)) : 18 === s && (n >>= 2, t += String.fromCharCode((65280 & n) >> 8), t += String.fromCharCode(255 & n)), t
// }

// function a(e) {
//   const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e);
//   return t < 0 ? void 0 : t
// }
// const c = new WeakMap;
// class l {
//   constructor(e) {
//     this.identifier = e.identifier, this.force = void 0 === e.force ? 1 : e.force, this.pageX = void 0 === e.pageX ? e.x : e.pageX, this.pageY = void 0 === e.pageY ? e.y : e.pageY, this.clientX = void 0 === e.clientX ? e.x : e.clientX, this.clientY = void 0 === e.clientY ? e.y : e.clientY, this.screenX = this.pageX, this.screenY = this.pageY
//   }
// }
// class u {
//   constructor() {
//     c.set(this, {})
//   }
//   addEventListener(e, t, n = {}) {
//     let s = c.get(this);
//     s || (s = {}, c.set(this, s)), s[e] || (s[e] = []), s[e].push(t), n.capture, n.once, n.passive
//   }
//   removeEventListener(e, t) {
//     const n = c.get(this);
//     if (n) {
//       const s = n[e];
//       if (s && s.length > 0)
//         for (let e = s.length; e--; e > 0)
//           if (s[e] === t) {
//             s.splice(e, 1);
//             break
//           }
//     }
//   }
//   dispatchEvent(e = {}) {
//     "function" != typeof e.preventDefault && (e.preventDefault = () => {}), "function" != typeof e.stopPropagation && (e.stopPropagation = () => {});
//     const t = c.get(this);
//     if (t) {
//       const n = t[e.type];
//       if (n)
//         for (let t = 0; t < n.length; t++) n[t](e)
//     }
//   }
//   releasePointerCapture() {}
//   setPointerCapture() {}
// }
// const h = new WeakMap,
//   p = new WeakMap,
//   d = new WeakMap;

// function m(e, t = {}) {
//   t.target = t.target || this, "function" == typeof this[`on${e}`] && this[`on${e}`].call(this, t)
// }

// function f(e, t = {}) {
//   this.readyState = e, t.readyState = e, m.call(this, "readystatechange", t)
// }
// const {
//   platform: g
// } = wx.getSystemInfoSync();
// class T extends u {
//   constructor() {
//     super(), this.onabort = null, this.onerror = null, this.onload = null, this.onloadstart = null, this.onprogress = null, this.ontimeout = null, this.onloadend = null, this.onreadystatechange = null, this.readyState = 0, this.response = null, this.responseText = null, this.responseType = "text", this.dataType = "string", this.responseXML = null, this.status = 0, this.statusText = "", this.upload = {}, this.withCredentials = !1, h.set(this, {
//       "content-type": "application/x-www-form-urlencoded"
//     }), p.set(this, {})
//   }
//   abort() {
//     const e = d.get(this);
//     e && e.abort()
//   }
//   getAllResponseHeaders() {
//     const e = p.get(this);
//     return Object.keys(e).map((t => `${t}: ${e[t]}`)).join("\n")
//   }
//   getResponseHeader(e) {
//     return p.get(this)[e]
//   }
//   open(e, t) {
//     this._method = e, this._url = t, f.call(this, T.OPENED)
//   }
//   overrideMimeType() {}
//   send(e = "") {
//     if (this.readyState !== T.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED."); {
//       const n = this._url,
//         s = h.get(this),
//         o = this.responseType,
//         r = this.dataType,
//         i = function (e) {
//           return !/^(http|https|ftp|wxfile):\/\/.*/i.test(e)
//         }(n);
//       let a;
//       "arraybuffer" === o || (a = "utf8"), delete this.response, this.response = null;
//       let c = !1;
//       const l = ({
//           data: e,
//           statusCode: t,
//           header: n
//         }) => {
//           if (!c) {
//             if (c = !0, t = void 0 === t ? 200 : t, "string" != typeof e && !(e instanceof ArrayBuffer)) try {
//               e = JSON.stringify(e)
//             } catch (e) {}
//             this.status = t, n && p.set(this, n), m.call(this, "loadstart"), f.call(this, T.HEADERS_RECEIVED), f.call(this, T.LOADING), this.response = e, e instanceof ArrayBuffer ? Object.defineProperty(this, "responseText", {
//               enumerable: !0,
//               configurable: !0,
//               get: function () {
//                 throw "InvalidStateError : responseType is " + this.responseType
//               }
//             }) : this.responseText = e, f.call(this, T.DONE), m.call(this, "load"), m.call(this, "loadend")
//           }
//         },
//         u = ({
//           errMsg: e
//         }) => {
//           c || (c = !0, -1 !== e.indexOf("abort") ? m.call(this, "abort") : m.call(this, "error", {
//             message: e
//           }), m.call(this, "loadend"), i && console.warn(e))
//         };
//       if (i) {
//         const e = wx.getFileSystemManager();
//         var t = {
//           filePath: n,
//           success: l,
//           fail: u
//         };
//         return a && (t.encoding = a), void e.readFile(t)
//       }
//       const d = "arraybuffer" === o && "ios" === g && T.useFetchPatch;
//       wx.request({
//         data: e,
//         url: n,
//         method: this._method,
//         header: s,
//         dataType: r,
//         responseType: o,
//         enableCache: !1,
//         success: l,
//         fail: u
//       }), d && setTimeout((function () {
//         wx.request({
//           data: e,
//           url: n,
//           method: this._method,
//           header: s,
//           dataType: r,
//           responseType: o,
//           enableCache: !0,
//           success: l,
//           fail: u
//         })
//       }), T.fetchPatchDelay)
//     }
//   }
//   setRequestHeader(e, t) {
//     const n = h.get(this);
//     n[e] = t, h.set(this, n)
//   }
//   addEventListener(e, t) {
//     "function" == typeof t && (this["on" + e] = (e = {}) => {
//       e.target = e.target || this, t.call(this, e)
//     })
//   }
//   removeEventListener(e, t) {
//     this["on" + e] === t && (this["on" + e] = null)
//   }
// }

// function v(e) {
//   return e = (e = e.trim()).replace(/<!--[\s\S]*?-->/g, ""), {
//     declaration: t(),
//     root: n()
//   };

//   function t() {
//     if (!o(/^<\?xml\s*/)) return;
//     const e = {
//       attributes: {}
//     };
//     for (; !r() && !i("?>");) {
//       const t = s();
//       if (!t) return e;
//       e.attributes[t.name] = t.value
//     }
//     return o(/\?>\s*/), o(/<!DOCTYPE[^>]*>\s/), e
//   }

//   function n() {
//     const e = o(/^<([\w-:.]+)\s*/);
//     if (!e) return;
//     const t = {
//       name: e[1],
//       attributes: {},
//       children: []
//     };
//     for (; !(r() || i(">") || i("?>") || i("/>"));) {
//       const e = s();
//       if (!e) return t;
//       t.attributes[e.name] = e.value
//     }
//     if (o(/^\s*\/>\s*/)) return t;
//     let a;
//     for (o(/\??>\s*/), t.content = function () {
//         const e = o(/^([^<]*)/);
//         return e ? e[1] : ""
//       }(); a = n();) t.children.push(a);
//     return o(/^<\/[\w-:.]+>\s*/), t
//   }

//   function s() {
//     const e = o(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
//     var t;
//     if (e) return {
//       name: e[1],
//       value: (t = e[2], t.replace(/^['"]|['"]$/g, ""))
//     }
//   }

//   function o(t) {
//     const n = e.match(t);
//     if (n) return e = e.slice(n[0].length), n
//   }

//   function r() {
//     return 0 == e.length
//   }

//   function i(t) {
//     return 0 == e.indexOf(t)
//   }
// }

// function y(e, t) {
//   t(e), e.children.forEach((e => y(e, t)))
// }
// T.UNSEND = 0, T.OPENED = 1, T.HEADERS_RECEIVED = 2, T.LOADING = 3, T.DONE = 4, T.useFetchPatch = !1, T.fetchPatchDelay = 200;
// class x {
//   parseFromString(e) {
//     const t = v(e),
//       n = {
//         hasAttribute(e) {
//           return void 0 !== this.attributes[e]
//         },
//         getAttribute(e) {
//           return this.attributes[e]
//         },
//         getElementsByTagName(e) {
//           const t = [];
//           return this.childNodes.forEach((n => y(n, (n => e === n.name && t.push(n))))), t
//         }
//       };
//     y(t.root, (e => {
//       e.nodeType = 1, e.nodeName = e.name, e.style = new Proxy((e.attributes.style || "").split(";").reduce(((e, t) => {
//         if (t) {
//           let [n, s] = t.split(":");
//           e[n.trim()] = s.trim()
//         }
//         return e
//       }), {}), {
//         get: (e, t) => e[t] || ""
//       }), e.textContent = e.content, e.childNodes = e.children, e.__proto__ = n
//     }));
//     const s = {
//       documentElement: t.root,
//       childNodes: [t.root]
//     };
//     return s.__proto__ = n, s
//   }
// }
// class b {
//   decode(e) {
//     e instanceof ArrayBuffer && (e = new Uint8Array(e));
//     let t = "";
//     for (let n = 0, s = e.length; n < s; n++) t += String.fromCharCode(e[n]);
//     try {
//       return decodeURIComponent(escape(t))
//     } catch (e) {
//       return t
//     }
//   }
// }

// function E() {
//   return wx.createOffscreenCanvas()
// }
// class M {
//   constructor(e, t, n) {
//     const s = wx.getSystemInfoSync(),
//       o = "android" === s.platform;
//     this.canvas = e, this.canvasW = void 0 === t ? e.width : t, this.canvasH = void 0 === n ? e.height : n, this.document = {
//       createElementNS: (t, n) => "canvas" === n ? e : "img" === n ? e.createImage() : void 0
//     }, this.window = {
//       innerWidth: s.windowWidth,
//       innerHeight: s.windowHeight,
//       devicePixelRatio: s.pixelRatio,
//       URL: new r,
//       AudioContext: function () {},
//       requestAnimationFrame: this.canvas.requestAnimationFrame,
//       cancelAnimationFrame: this.canvas.cancelAnimationFrame,
//       DeviceOrientationEvent: {
//         requestPermission: () => Promise.resolve("granted")
//       },
//       DOMParser: x,
//       TextDecoder: b
//     }, [this.canvas, this.document, this.window].forEach((e => {
//       const t = e.__proto__;
//       e.__proto__ = {}, e.__proto__.__proto__ = t,
//         function (e, t) {
//           for (let n of Object.getOwnPropertyNames(t))
//             if ("constructor" !== n && "prototype" !== n && "name" !== n) {
//               let s = Object.getOwnPropertyDescriptor(t, n);
//               Object.defineProperty(e, n, s)
//             }
//         }(e.__proto__, u.prototype)
//     })), this.patchCanvas(), this.onDeviceMotionChange = e => {
//       e.type = "deviceorientation", o && (e.alpha *= -1, e.beta *= -1, e.gamma *= -1), this.window.dispatchEvent(e)
//     }
//   }
//   patchCanvas() {
//     const {
//       canvasH: e,
//       canvasW: t
//     } = this;
//     Object.defineProperty(this.canvas, "style", {
//       get() {
//         return {
//           width: this.width + "px",
//           height: this.height + "px"
//         }
//       }
//     }), Object.defineProperty(this.canvas, "clientHeight", {
//       get() {
//         return e || this.height
//       }
//     }), Object.defineProperty(this.canvas, "clientWidth", {
//       get() {
//         return t || this.width
//       }
//     }), this.canvas.ownerDocument = this.document
//   }
//   patchXHR() {
//     return T.useFetchPatch = !0, this
//   }
//   getGlobals() {
//     return {
//       atob: i,
//       Blob: t,
//       window: this.window,
//       document: this.document,
//       HTMLCanvasElement: void 0,
//       XMLHttpRequest: T,
//       OffscreenCanvas: E,
//       createImageBitmap: void 0
//     }
//   }
//   enableDeviceOrientation(e) {
//     return new Promise(((t, n) => {
//       wx.onDeviceMotionChange(this.onDeviceMotionChange), wx.startDeviceMotionListening({
//         interval: e,
//         success: e => {
//           t(e), this.enabledDeviceMotion = !0
//         },
//         fail: n
//       })
//     }))
//   }
//   disableDeviceOrientation() {
//     return new Promise(((e, t) => {
//       wx.offDeviceMotionChange(this.onDeviceMotionChange), this.enabledDeviceMotion && wx.stopDeviceMotionListening({
//         success: () => {
//           e(), this.enabledDeviceMotion = !1
//         },
//         fail: t
//       })
//     }))
//   }
//   dispatchTouchEvent(e = {}) {
//     const t = {
//         ...this
//       },
//       n = e.changedTouches.map((e => new l(e))),
//       s = {
//         changedTouches: n,
//         touches: e.touches.map((e => new l(e))),
//         targetTouches: Array.prototype.slice.call(e.touches.map((e => new l(e)))),
//         timeStamp: e.timeStamp,
//         target: t,
//         currentTarget: t,
//         type: e.type,
//         cancelBubble: !1,
//         cancelable: !1
//       };
//     if (this.canvas.dispatchEvent(s), n.length) {
//       const t = n[0],
//         s = {
//           pageX: t.pageX,
//           pageY: t.pageY,
//           pointerId: t.identifier,
//           type: {
//             touchstart: "pointerdown",
//             touchmove: "pointermove",
//             touchend: "pointerup"
//           } [e.type],
//           pointerType: "touch"
//         };
//       this.canvas.dispatchEvent(s)
//     }
//   }
//   dispose() {
//     this.disableDeviceOrientation(), this.canvas.width = 0, this.canvas.height = 0, this.canvas && (this.canvas.ownerDocument = null), this.onDeviceMotionChange = null, this.document = null, this.window = null, this.canvas = null
//   }
// }
// class w extends e.Loader {
//   constructor(e) {
//     super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register((function (e) {
//       return new L(e)
//     })), this.register((function (e) {
//       return new N(e)
//     })), this.register((function (e) {
//       return new H(e)
//     })), this.register((function (e) {
//       return new O(e)
//     })), this.register((function (e) {
//       return new P(e)
//     })), this.register((function (e) {
//       return new C(e)
//     })), this.register((function (e) {
//       return new I(e)
//     })), this.register((function (e) {
//       return new S(e)
//     })), this.register((function (e) {
//       return new D(e)
//     }))
//   }
//   load(t, n, s, o) {
//     const r = this;
//     let i;
//     i = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : e.LoaderUtils.extractUrlBase(t), this.manager.itemStart(t);
//     const a = function (e) {
//         o ? o(e) : console.error(e), r.manager.itemError(t), r.manager.itemEnd(t)
//       },
//       c = new e.FileLoader(this.manager);
//     c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(t, (function (e) {
//       try {
//         r.parse(e, i, (function (e) {
//           n(e), r.manager.itemEnd(t)
//         }), a)
//       } catch (e) {
//         a(e)
//       }
//     }), s, a)
//   }
//   setDRACOLoader(e) {
//     return this.dracoLoader = e, this
//   }
//   setDDSLoader() {
//     throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
//   }
//   setKTX2Loader(e) {
//     return this.ktx2Loader = e, this
//   }
//   setMeshoptDecoder(e) {
//     return this.meshoptDecoder = e, this
//   }
//   register(e) {
//     return -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e), this
//   }
//   unregister(e) {
//     return -1 !== this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this
//   }
//   parse(t, n, s, o) {
//     let r;
//     const i = {},
//       a = {};
//     if ("string" == typeof t) r = t;
//     else {
//       if (e.LoaderUtils.decodeText(new Uint8Array(t, 0, 4)) === U) {
//         try {
//           i[A.KHR_BINARY_GLTF] = new j(t)
//         } catch (e) {
//           return void(o && o(e))
//         }
//         r = i[A.KHR_BINARY_GLTF].content
//       } else r = e.LoaderUtils.decodeText(new Uint8Array(t))
//     }
//     const c = JSON.parse(r);
//     if (void 0 === c.asset || c.asset.version[0] < 2) return void(o && o(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")));
//     const l = new ye(c, {
//       path: n || this.resourcePath || "",
//       crossOrigin: this.crossOrigin,
//       requestHeader: this.requestHeader,
//       manager: this.manager,
//       ktx2Loader: this.ktx2Loader,
//       meshoptDecoder: this.meshoptDecoder
//     });
//     l.fileLoader.setRequestHeader(this.requestHeader);
//     for (let e = 0; e < this.pluginCallbacks.length; e++) {
//       const t = this.pluginCallbacks[e](l);
//       a[t.name] = t, i[t.name] = !0
//     }
//     if (c.extensionsUsed)
//       for (let e = 0; e < c.extensionsUsed.length; ++e) {
//         const t = c.extensionsUsed[e],
//           n = c.extensionsRequired || [];
//         switch (t) {
//           case A.KHR_MATERIALS_UNLIT:
//             i[t] = new _;
//             break;
//           case A.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
//             i[t] = new K;
//             break;
//           case A.KHR_DRACO_MESH_COMPRESSION:
//             i[t] = new B(c, this.dracoLoader);
//             break;
//           case A.KHR_TEXTURE_TRANSFORM:
//             i[t] = new G;
//             break;
//           case A.KHR_MESH_QUANTIZATION:
//             i[t] = new X;
//             break;
//           default:
//             n.indexOf(t) >= 0 && void 0 === a[t] && console.warn('THREE.GLTFLoader: Unknown extension "' + t + '".')
//         }
//       }
//     l.setExtensions(i), l.setPlugins(a), l.parse(s, o)
//   }
// }

// function R() {
//   let e = {};
//   return {
//     get: function (t) {
//       return e[t]
//     },
//     add: function (t, n) {
//       e[t] = n
//     },
//     remove: function (t) {
//       delete e[t]
//     },
//     removeAll: function () {
//       e = {}
//     }
//   }
// }
// const A = {
//   KHR_BINARY_GLTF: "KHR_binary_glTF",
//   KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
//   KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
//   KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
//   KHR_MATERIALS_IOR: "KHR_materials_ior",
//   KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
//   KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
//   KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
//   KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
//   KHR_MATERIALS_VOLUME: "KHR_materials_volume",
//   KHR_TEXTURE_BASISU: "KHR_texture_basisu",
//   KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
//   KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
//   EXT_TEXTURE_WEBP: "EXT_texture_webp",
//   EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
// };
// class S {
//   constructor(e) {
//     this.parser = e, this.name = A.KHR_LIGHTS_PUNCTUAL, this.cache = {
//       refs: {},
//       uses: {}
//     }
//   }
//   _markDefs() {
//     const e = this.parser,
//       t = this.parser.json.nodes || [];
//     for (let n = 0, s = t.length; n < s; n++) {
//       const s = t[n];
//       s.extensions && s.extensions[this.name] && void 0 !== s.extensions[this.name].light && e._addNodeRef(this.cache, s.extensions[this.name].light)
//     }
//   }
//   _loadLight(t) {
//     const n = this.parser,
//       s = "light:" + t;
//     let o = n.cache.get(s);
//     if (o) return o;
//     const r = n.json,
//       i = ((r.extensions && r.extensions[this.name] || {}).lights || [])[t];
//     let a;
//     const c = new e.Color(16777215);
//     void 0 !== i.color && c.fromArray(i.color);
//     const l = void 0 !== i.range ? i.range : 0;
//     switch (i.type) {
//       case "directional":
//         a = new e.DirectionalLight(c), a.target.position.set(0, 0, -1), a.add(a.target);
//         break;
//       case "point":
//         a = new e.PointLight(c), a.distance = l;
//         break;
//       case "spot":
//         a = new e.SpotLight(c), a.distance = l, i.spot = i.spot || {}, i.spot.innerConeAngle = void 0 !== i.spot.innerConeAngle ? i.spot.innerConeAngle : 0, i.spot.outerConeAngle = void 0 !== i.spot.outerConeAngle ? i.spot.outerConeAngle : Math.PI / 4, a.angle = i.spot.outerConeAngle, a.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle, a.target.position.set(0, 0, -1), a.add(a.target);
//         break;
//       default:
//         throw new Error("THREE.GLTFLoader: Unexpected light type: " + i.type)
//     }
//     return a.position.set(0, 0, 0), a.decay = 2, void 0 !== i.intensity && (a.intensity = i.intensity), a.name = n.createUniqueName(i.name || "light_" + t), o = Promise.resolve(a), n.cache.add(s, o), o
//   }
//   createNodeAttachment(e) {
//     const t = this,
//       n = this.parser,
//       s = n.json.nodes[e],
//       o = (s.extensions && s.extensions[this.name] || {}).light;
//     return void 0 === o ? null : this._loadLight(o).then((function (e) {
//       return n._getNodeRef(t.cache, o, e)
//     }))
//   }
// }
// class _ {
//   constructor() {
//     this.name = A.KHR_MATERIALS_UNLIT
//   }
//   getMaterialType() {
//     return e.MeshBasicMaterial
//   }
//   extendParams(t, n, s) {
//     const o = [];
//     t.color = new e.Color(1, 1, 1), t.opacity = 1;
//     const r = n.pbrMetallicRoughness;
//     if (r) {
//       if (Array.isArray(r.baseColorFactor)) {
//         const e = r.baseColorFactor;
//         t.color.fromArray(e), t.opacity = e[3]
//       }
//       void 0 !== r.baseColorTexture && o.push(s.assignTexture(t, "map", r.baseColorTexture))
//     }
//     return Promise.all(o)
//   }
// }
// class L {
//   constructor(e) {
//     this.parser = e, this.name = A.KHR_MATERIALS_CLEARCOAT
//   }
//   getMaterialType(t) {
//     const n = this.parser.json.materials[t];
//     return n.extensions && n.extensions[this.name] ? e.MeshPhysicalMaterial : null
//   }
//   extendMaterialParams(t, n) {
//     const s = this.parser,
//       o = s.json.materials[t];
//     if (!o.extensions || !o.extensions[this.name]) return Promise.resolve();
//     const r = [],
//       i = o.extensions[this.name];
//     if (void 0 !== i.clearcoatFactor && (n.clearcoat = i.clearcoatFactor), void 0 !== i.clearcoatTexture && r.push(s.assignTexture(n, "clearcoatMap", i.clearcoatTexture)), void 0 !== i.clearcoatRoughnessFactor && (n.clearcoatRoughness = i.clearcoatRoughnessFactor), void 0 !== i.clearcoatRoughnessTexture && r.push(s.assignTexture(n, "clearcoatRoughnessMap", i.clearcoatRoughnessTexture)), void 0 !== i.clearcoatNormalTexture && (r.push(s.assignTexture(n, "clearcoatNormalMap", i.clearcoatNormalTexture)), void 0 !== i.clearcoatNormalTexture.scale)) {
//       const t = i.clearcoatNormalTexture.scale;
//       n.clearcoatNormalScale = new e.Vector2(t, t)
//     }
//     return Promise.all(r)
//   }
// }
// class O {
//   constructor(e) {
//     this.parser = e, this.name = A.KHR_MATERIALS_TRANSMISSION
//   }
//   getMaterialType(t) {
//     const n = this.parser.json.materials[t];
//     return n.extensions && n.extensions[this.name] ? e.MeshPhysicalMaterial : null
//   }
//   extendMaterialParams(e, t) {
//     const n = this.parser,
//       s = n.json.materials[e];
//     if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
//     const o = [],
//       r = s.extensions[this.name];
//     return void 0 !== r.transmissionFactor && (t.transmission = r.transmissionFactor), void 0 !== r.transmissionTexture && o.push(n.assignTexture(t, "transmissionMap", r.transmissionTexture)), Promise.all(o)
//   }
// }
// class P {
//   constructor(e) {
//     this.parser = e, this.name = A.KHR_MATERIALS_VOLUME
//   }
//   getMaterialType(t) {
//     const n = this.parser.json.materials[t];
//     return n.extensions && n.extensions[this.name] ? e.MeshPhysicalMaterial : null
//   }
//   extendMaterialParams(t, n) {
//     const s = this.parser,
//       o = s.json.materials[t];
//     if (!o.extensions || !o.extensions[this.name]) return Promise.resolve();
//     const r = [],
//       i = o.extensions[this.name];
//     n.thickness = void 0 !== i.thicknessFactor ? i.thicknessFactor : 0, void 0 !== i.thicknessTexture && r.push(s.assignTexture(n, "thicknessMap", i.thicknessTexture)), n.attenuationDistance = i.attenuationDistance || 0;
//     const a = i.attenuationColor || [1, 1, 1];
//     return n.attenuationTint = new e.Color(a[0], a[1], a[2]), Promise.all(r)
//   }
// }
// class C {
//   constructor(e) {
//     this.parser = e, this.name = A.KHR_MATERIALS_IOR
//   }
//   getMaterialType(t) {
//     const n = this.parser.json.materials[t];
//     return n.extensions && n.extensions[this.name] ? e.MeshPhysicalMaterial : null
//   }
//   extendMaterialParams(e, t) {
//     const n = this.parser.json.materials[e];
//     if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
//     const s = n.extensions[this.name];
//     return t.ior = void 0 !== s.ior ? s.ior : 1.5, Promise.resolve()
//   }
// }
// class I {
//   constructor(e) {
//     this.parser = e, this.name = A.KHR_MATERIALS_SPECULAR
//   }
//   getMaterialType(t) {
//     const n = this.parser.json.materials[t];
//     return n.extensions && n.extensions[this.name] ? e.MeshPhysicalMaterial : null
//   }
//   extendMaterialParams(t, n) {
//     const s = this.parser,
//       o = s.json.materials[t];
//     if (!o.extensions || !o.extensions[this.name]) return Promise.resolve();
//     const r = [],
//       i = o.extensions[this.name];
//     n.specularIntensity = void 0 !== i.specularFactor ? i.specularFactor : 1, void 0 !== i.specularTexture && r.push(s.assignTexture(n, "specularIntensityMap", i.specularTexture));
//     const a = i.specularColorFactor || [1, 1, 1];
//     return n.specularTint = new e.Color(a[0], a[1], a[2]), void 0 !== i.specularColorTexture && r.push(s.assignTexture(n, "specularTintMap", i.specularColorTexture).then((function (t) {
//       t.encoding = e.sRGBEncoding
//     }))), Promise.all(r)
//   }
// }
// class N {
//   constructor(e) {
//     this.parser = e, this.name = A.KHR_TEXTURE_BASISU
//   }
//   loadTexture(e) {
//     const t = this.parser,
//       n = t.json,
//       s = n.textures[e];
//     if (!s.extensions || !s.extensions[this.name]) return null;
//     const o = s.extensions[this.name],
//       r = n.images[o.source],
//       i = t.options.ktx2Loader;
//     if (!i) {
//       if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
//       return null
//     }
//     return t.loadTextureImage(e, r, i)
//   }
// }
// class H {
//   constructor(e) {
//     this.parser = e, this.name = A.EXT_TEXTURE_WEBP, this.isSupported = null
//   }
//   loadTexture(e) {
//     const t = this.name,
//       n = this.parser,
//       s = n.json,
//       o = s.textures[e];
//     if (!o.extensions || !o.extensions[t]) return null;
//     const r = o.extensions[t],
//       i = s.images[r.source];
//     let a = n.textureLoader;
//     if (i.uri) {
//       const e = n.options.manager.getHandler(i.uri);
//       null !== e && (a = e)
//     }
//     return this.detectSupport().then((function (o) {
//       if (o) return n.loadTextureImage(e, i, a);
//       if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0) throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
//       return n.loadTexture(e)
//     }))
//   }
//   detectSupport() {
//     return this.isSupported || (this.isSupported = new Promise((function (e) {
//       const t = new Image;
//       t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function () {
//         e(1 === t.height)
//       }
//     }))), this.isSupported
//   }
// }
// class D {
//   constructor(e) {
//     this.name = A.EXT_MESHOPT_COMPRESSION, this.parser = e
//   }
//   loadBufferView(e) {
//     const t = this.parser.json,
//       n = t.bufferViews[e];
//     if (n.extensions && n.extensions[this.name]) {
//       const e = n.extensions[this.name],
//         s = this.parser.getDependency("buffer", e.buffer),
//         o = this.parser.options.meshoptDecoder;
//       if (!o || !o.supported) {
//         if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
//         return null
//       }
//       return Promise.all([s, o.ready]).then((function (t) {
//         const n = e.byteOffset || 0,
//           s = e.byteLength || 0,
//           r = e.count,
//           i = e.byteStride,
//           a = new ArrayBuffer(r * i),
//           c = new Uint8Array(t[0], n, s);
//         return o.decodeGltfBuffer(new Uint8Array(a), r, i, c, e.mode, e.filter), a
//       }))
//     }
//     return null
//   }
// }
// const U = "glTF",
//   F = 1313821514,
//   k = 5130562;
// class j {
//   constructor(t) {
//     this.name = A.KHR_BINARY_GLTF, this.content = null, this.body = null;
//     const n = new DataView(t, 0, 12);
//     if (this.header = {
//         magic: e.LoaderUtils.decodeText(new Uint8Array(t.slice(0, 4))),
//         version: n.getUint32(4, !0),
//         length: n.getUint32(8, !0)
//       }, this.header.magic !== U) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
//     if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
//     const s = this.header.length - 12,
//       o = new DataView(t, 12);
//     let r = 0;
//     for (; r < s;) {
//       const n = o.getUint32(r, !0);
//       r += 4;
//       const s = o.getUint32(r, !0);
//       if (r += 4, s === F) {
//         const s = new Uint8Array(t, 12 + r, n);
//         this.content = e.LoaderUtils.decodeText(s)
//       } else if (s === k) {
//         const e = 12 + r;
//         this.body = t.slice(e, e + n)
//       }
//       r += n
//     }
//     if (null === this.content) throw new Error("THREE.GLTFLoader: JSON content not found.")
//   }
// }
// class B {
//   constructor(e, t) {
//     if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
//     this.name = A.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload()
//   }
//   decodePrimitive(e, t) {
//     const n = this.json,
//       s = this.dracoLoader,
//       o = e.extensions[this.name].bufferView,
//       r = e.extensions[this.name].attributes,
//       i = {},
//       a = {},
//       c = {};
//     for (const e in r) {
//       const t = ie[e] || e.toLowerCase();
//       i[t] = r[e]
//     }
//     for (const t in e.attributes) {
//       const s = ie[t] || t.toLowerCase();
//       if (void 0 !== r[t]) {
//         const o = n.accessors[e.attributes[t]],
//           r = ne[o.componentType];
//         c[s] = r, a[s] = !0 === o.normalized
//       }
//     }
//     return t.getDependency("bufferView", o).then((function (e) {
//       return new Promise((function (t) {
//         s.decodeDracoFile(e, (function (e) {
//           for (const t in e.attributes) {
//             const n = e.attributes[t],
//               s = a[t];
//             void 0 !== s && (n.normalized = s)
//           }
//           t(e)
//         }), i, c)
//       }))
//     }))
//   }
// }
// class G {
//   constructor() {
//     this.name = A.KHR_TEXTURE_TRANSFORM
//   }
//   extendTexture(e, t) {
//     return void 0 !== t.texCoord && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), void 0 === t.offset && void 0 === t.rotation && void 0 === t.scale || (e = e.clone(), void 0 !== t.offset && e.offset.fromArray(t.offset), void 0 !== t.rotation && (e.rotation = t.rotation), void 0 !== t.scale && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e
//   }
// }
// class V extends e.MeshStandardMaterial {
//   constructor(t) {
//     super(), this.isGLTFSpecularGlossinessMaterial = !0;
//     const n = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n"),
//       s = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n"),
//       o = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\ttexelSpecular = sRGBToLinear( texelSpecular );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n"),
//       r = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n"),
//       i = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.roughness += geometryRoughness;", "material.roughness = min( material.roughness, 1.0 );", "material.specularColor = specularFactor;"].join("\n"),
//       a = {
//         specular: {
//           value: (new e.Color).setHex(16777215)
//         },
//         glossiness: {
//           value: 1
//         },
//         specularMap: {
//           value: null
//         },
//         glossinessMap: {
//           value: null
//         }
//       };
//     this._extraUniforms = a, this.onBeforeCompile = function (e) {
//       for (const t in a) e.uniforms[t] = a[t];
//       e.fragmentShader = e.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", n).replace("#include <metalnessmap_pars_fragment>", s).replace("#include <roughnessmap_fragment>", o).replace("#include <metalnessmap_fragment>", r).replace("#include <lights_physical_fragment>", i)
//     }, Object.defineProperties(this, {
//       specular: {
//         get: function () {
//           return a.specular.value
//         },
//         set: function (e) {
//           a.specular.value = e
//         }
//       },
//       specularMap: {
//         get: function () {
//           return a.specularMap.value
//         },
//         set: function (e) {
//           a.specularMap.value = e, e ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP
//         }
//       },
//       glossiness: {
//         get: function () {
//           return a.glossiness.value
//         },
//         set: function (e) {
//           a.glossiness.value = e
//         }
//       },
//       glossinessMap: {
//         get: function () {
//           return a.glossinessMap.value
//         },
//         set: function (e) {
//           a.glossinessMap.value = e, e ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP, delete this.defines.USE_UV)
//         }
//       }
//     }), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(t)
//   }
//   copy(e) {
//     return super.copy(e), this.specularMap = e.specularMap, this.specular.copy(e.specular), this.glossinessMap = e.glossinessMap, this.glossiness = e.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this
//   }
// }
// class K {
//   constructor() {
//     this.name = A.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS, this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"]
//   }
//   getMaterialType() {
//     return V
//   }
//   extendParams(t, n, s) {
//     const o = n.extensions[this.name];
//     t.color = new e.Color(1, 1, 1), t.opacity = 1;
//     const r = [];
//     if (Array.isArray(o.diffuseFactor)) {
//       const e = o.diffuseFactor;
//       t.color.fromArray(e), t.opacity = e[3]
//     }
//     if (void 0 !== o.diffuseTexture && r.push(s.assignTexture(t, "map", o.diffuseTexture)), t.emissive = new e.Color(0, 0, 0), t.glossiness = void 0 !== o.glossinessFactor ? o.glossinessFactor : 1, t.specular = new e.Color(1, 1, 1), Array.isArray(o.specularFactor) && t.specular.fromArray(o.specularFactor), void 0 !== o.specularGlossinessTexture) {
//       const e = o.specularGlossinessTexture;
//       r.push(s.assignTexture(t, "glossinessMap", e)), r.push(s.assignTexture(t, "specularMap", e))
//     }
//     return Promise.all(r)
//   }
//   createMaterial(t) {
//     const n = new V(t);
//     return n.fog = !0, n.color = t.color, n.map = void 0 === t.map ? null : t.map, n.lightMap = null, n.lightMapIntensity = 1, n.aoMap = void 0 === t.aoMap ? null : t.aoMap, n.aoMapIntensity = 1, n.emissive = t.emissive, n.emissiveIntensity = 1, n.emissiveMap = void 0 === t.emissiveMap ? null : t.emissiveMap, n.bumpMap = void 0 === t.bumpMap ? null : t.bumpMap, n.bumpScale = 1, n.normalMap = void 0 === t.normalMap ? null : t.normalMap, n.normalMapType = e.TangentSpaceNormalMap, t.normalScale && (n.normalScale = t.normalScale), n.displacementMap = null, n.displacementScale = 1, n.displacementBias = 0, n.specularMap = void 0 === t.specularMap ? null : t.specularMap, n.specular = t.specular, n.glossinessMap = void 0 === t.glossinessMap ? null : t.glossinessMap, n.glossiness = t.glossiness, n.alphaMap = null, n.envMap = void 0 === t.envMap ? null : t.envMap, n.envMapIntensity = 1, n.refractionRatio = .98, n
//   }
// }
// class X {
//   constructor() {
//     this.name = A.KHR_MESH_QUANTIZATION
//   }
// }
// class Y extends e.Interpolant {
//   constructor(e, t, n, s) {
//     super(e, t, n, s)
//   }
//   copySampleValue_(e) {
//     const t = this.resultBuffer,
//       n = this.sampleValues,
//       s = this.valueSize,
//       o = e * s * 3 + s;
//     for (let e = 0; e !== s; e++) t[e] = n[o + e];
//     return t
//   }
// }
// Y.prototype.beforeStart_ = Y.prototype.copySampleValue_, Y.prototype.afterEnd_ = Y.prototype.copySampleValue_, Y.prototype.interpolate_ = function (e, t, n, s) {
//   const o = this.resultBuffer,
//     r = this.sampleValues,
//     i = this.valueSize,
//     a = 2 * i,
//     c = 3 * i,
//     l = s - t,
//     u = (n - t) / l,
//     h = u * u,
//     p = h * u,
//     d = e * c,
//     m = d - c,
//     f = -2 * p + 3 * h,
//     g = p - h,
//     T = 1 - f,
//     v = g - h + u;
//   for (let e = 0; e !== i; e++) {
//     const t = r[m + e + i],
//       n = r[m + e + a] * l,
//       s = r[d + e + i],
//       c = r[d + e] * l;
//     o[e] = T * t + v * n + f * s + g * c
//   }
//   return o
// };
// const z = new e.Quaternion;
// class q extends Y {
//   interpolate_(e, t, n, s) {
//     const o = super.interpolate_(e, t, n, s);
//     return z.fromArray(o).normalize().toArray(o), o
//   }
// }
// const W = 0,
//   Z = 1,
//   $ = 2,
//   Q = 3,
//   J = 4,
//   ee = 5,
//   te = 6,
//   ne = {
//     5120: Int8Array,
//     5121: Uint8Array,
//     5122: Int16Array,
//     5123: Uint16Array,
//     5125: Uint32Array,
//     5126: Float32Array
//   },
//   se = {
//     9728: e.NearestFilter,
//     9729: e.LinearFilter,
//     9984: e.NearestMipmapNearestFilter,
//     9985: e.LinearMipmapNearestFilter,
//     9986: e.NearestMipmapLinearFilter,
//     9987: e.LinearMipmapLinearFilter
//   },
//   oe = {
//     33071: e.ClampToEdgeWrapping,
//     33648: e.MirroredRepeatWrapping,
//     10497: e.RepeatWrapping
//   },
//   re = {
//     SCALAR: 1,
//     VEC2: 2,
//     VEC3: 3,
//     VEC4: 4,
//     MAT2: 4,
//     MAT3: 9,
//     MAT4: 16
//   },
//   ie = {
//     POSITION: "position",
//     NORMAL: "normal",
//     TANGENT: "tangent",
//     TEXCOORD_0: "uv",
//     TEXCOORD_1: "uv2",
//     COLOR_0: "color",
//     WEIGHTS_0: "skinWeight",
//     JOINTS_0: "skinIndex"
//   },
//   ae = {
//     scale: "scale",
//     translation: "position",
//     rotation: "quaternion",
//     weights: "morphTargetInfluences"
//   },
//   ce = {
//     CUBICSPLINE: void 0,
//     LINEAR: e.InterpolateLinear,
//     STEP: e.InterpolateDiscrete
//   },
//   le = "OPAQUE",
//   ue = "MASK",
//   he = "BLEND";

// function pe(e, t) {
//   return "string" != typeof e || "" === e ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e)
// }

// function de(e, t, n) {
//   for (const s in n.extensions) void 0 === e[s] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[s] = n.extensions[s])
// }

// function me(e, t) {
//   void 0 !== t.extras && ("object" == typeof t.extras ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras))
// }

// function fe(e, t) {
//   if (e.updateMorphTargets(), void 0 !== t.weights)
//     for (let n = 0, s = t.weights.length; n < s; n++) e.morphTargetInfluences[n] = t.weights[n];
//   if (t.extras && Array.isArray(t.extras.targetNames)) {
//     const n = t.extras.targetNames;
//     if (e.morphTargetInfluences.length === n.length) {
//       e.morphTargetDictionary = {};
//       for (let t = 0, s = n.length; t < s; t++) e.morphTargetDictionary[n[t]] = t
//     } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
//   }
// }

// function ge(e) {
//   const t = e.extensions && e.extensions[A.KHR_DRACO_MESH_COMPRESSION];
//   let n;
//   return n = t ? "draco:" + t.bufferView + ":" + t.indices + ":" + Te(t.attributes) : e.indices + ":" + Te(e.attributes) + ":" + e.mode, n
// }

// function Te(e) {
//   let t = "";
//   const n = Object.keys(e).sort();
//   for (let s = 0, o = n.length; s < o; s++) t += n[s] + ":" + e[n[s]] + ";";
//   return t
// }

// function ve(e) {
//   switch (e) {
//     case Int8Array:
//       return 1 / 127;
//     case Uint8Array:
//       return 1 / 255;
//     case Int16Array:
//       return 1 / 32767;
//     case Uint16Array:
//       return 1 / 65535;
//     default:
//       throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
//   }
// }
// class ye {
//   constructor(t = {}, n = {}) {
//     this.json = t, this.extensions = {}, this.plugins = {}, this.options = n, this.cache = new R, this.associations = new Map, this.primitiveCache = {}, this.meshCache = {
//       refs: {},
//       uses: {}
//     }, this.cameraCache = {
//       refs: {},
//       uses: {}
//     }, this.lightCache = {
//       refs: {},
//       uses: {}
//     }, this.textureCache = {}, this.nodeNamesUsed = {}, void 0 !== e.$createImageBitmap && !1 === /Firefox/.test(navigator.userAgent) ? this.textureLoader = new e.ImageBitmapLoader(this.options.manager) : this.textureLoader = new e.TextureLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new e.FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0)
//   }
//   setExtensions(e) {
//     this.extensions = e
//   }
//   setPlugins(e) {
//     this.plugins = e
//   }
//   parse(e, t) {
//     const n = this,
//       s = this.json,
//       o = this.extensions;
//     this.cache.removeAll(), this._invokeAll((function (e) {
//       return e._markDefs && e._markDefs()
//     })), Promise.all(this._invokeAll((function (e) {
//       return e.beforeRoot && e.beforeRoot()
//     }))).then((function () {
//       return Promise.all([n.getDependencies("scene"), n.getDependencies("animation"), n.getDependencies("camera")])
//     })).then((function (t) {
//       const r = {
//         scene: t[0][s.scene || 0],
//         scenes: t[0],
//         animations: t[1],
//         cameras: t[2],
//         asset: s.asset,
//         parser: n,
//         userData: {}
//       };
//       de(o, r, s), me(r, s), Promise.all(n._invokeAll((function (e) {
//         return e.afterRoot && e.afterRoot(r)
//       }))).then((function () {
//         e(r)
//       }))
//     })).catch(t)
//   }
//   _markDefs() {
//     const e = this.json.nodes || [],
//       t = this.json.skins || [],
//       n = this.json.meshes || [];
//     for (let n = 0, s = t.length; n < s; n++) {
//       const s = t[n].joints;
//       for (let t = 0, n = s.length; t < n; t++) e[s[t]].isBone = !0
//     }
//     for (let t = 0, s = e.length; t < s; t++) {
//       const s = e[t];
//       void 0 !== s.mesh && (this._addNodeRef(this.meshCache, s.mesh), void 0 !== s.skin && (n[s.mesh].isSkinnedMesh = !0)), void 0 !== s.camera && this._addNodeRef(this.cameraCache, s.camera)
//     }
//   }
//   _addNodeRef(e, t) {
//     void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++)
//   }
//   _getNodeRef(e, t, n) {
//     if (e.refs[t] <= 1) return n;
//     const s = n.clone(),
//       o = (e, t) => {
//         const n = this.associations.get(e);
//         null != n && this.associations.set(t, n);
//         for (const [n, s] of e.children.entries()) o(s, t.children[n])
//       };
//     return o(n, s), s.name += "_instance_" + e.uses[t]++, s
//   }
//   _invokeOne(e) {
//     const t = Object.values(this.plugins);
//     t.push(this);
//     for (let n = 0; n < t.length; n++) {
//       const s = e(t[n]);
//       if (s) return s
//     }
//     return null
//   }
//   _invokeAll(e) {
//     const t = Object.values(this.plugins);
//     t.unshift(this);
//     const n = [];
//     for (let s = 0; s < t.length; s++) {
//       const o = e(t[s]);
//       o && n.push(o)
//     }
//     return n
//   }
//   getDependency(e, t) {
//     const n = e + ":" + t;
//     let s = this.cache.get(n);
//     if (!s) {
//       switch (e) {
//         case "scene":
//           s = this.loadScene(t);
//           break;
//         case "node":
//           s = this.loadNode(t);
//           break;
//         case "mesh":
//           s = this._invokeOne((function (e) {
//             return e.loadMesh && e.loadMesh(t)
//           }));
//           break;
//         case "accessor":
//           s = this.loadAccessor(t);
//           break;
//         case "bufferView":
//           s = this._invokeOne((function (e) {
//             return e.loadBufferView && e.loadBufferView(t)
//           }));
//           break;
//         case "buffer":
//           s = this.loadBuffer(t);
//           break;
//         case "material":
//           s = this._invokeOne((function (e) {
//             return e.loadMaterial && e.loadMaterial(t)
//           }));
//           break;
//         case "texture":
//           s = this._invokeOne((function (e) {
//             return e.loadTexture && e.loadTexture(t)
//           }));
//           break;
//         case "skin":
//           s = this.loadSkin(t);
//           break;
//         case "animation":
//           s = this.loadAnimation(t);
//           break;
//         case "camera":
//           s = this.loadCamera(t);
//           break;
//         default:
//           throw new Error("Unknown type: " + e)
//       }
//       this.cache.add(n, s)
//     }
//     return s
//   }
//   getDependencies(e) {
//     let t = this.cache.get(e);
//     if (!t) {
//       const n = this,
//         s = this.json[e + ("mesh" === e ? "es" : "s")] || [];
//       t = Promise.all(s.map((function (t, s) {
//         return n.getDependency(e, s)
//       }))), this.cache.add(e, t)
//     }
//     return t
//   }
//   loadBuffer(e) {
//     const t = this.json.buffers[e],
//       n = this.fileLoader;
//     if (t.type && "arraybuffer" !== t.type) throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
//     if (void 0 === t.uri && 0 === e) return Promise.resolve(this.extensions[A.KHR_BINARY_GLTF].body);
//     const s = this.options;
//     return new Promise((function (e, o) {
//       n.load(pe(t.uri, s.path), e, void 0, (function () {
//         o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'))
//       }))
//     }))
//   }
//   loadBufferView(e) {
//     const t = this.json.bufferViews[e];
//     return this.getDependency("buffer", t.buffer).then((function (e) {
//       const n = t.byteLength || 0,
//         s = t.byteOffset || 0;
//       return e.slice(s, s + n)
//     }))
//   }
//   loadAccessor(t) {
//     const n = this,
//       s = this.json,
//       o = this.json.accessors[t];
//     if (void 0 === o.bufferView && void 0 === o.sparse) return Promise.resolve(null);
//     const r = [];
//     return void 0 !== o.bufferView ? r.push(this.getDependency("bufferView", o.bufferView)) : r.push(null), void 0 !== o.sparse && (r.push(this.getDependency("bufferView", o.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", o.sparse.values.bufferView))), Promise.all(r).then((function (t) {
//       const r = t[0],
//         i = re[o.type],
//         a = ne[o.componentType],
//         c = a.BYTES_PER_ELEMENT,
//         l = c * i,
//         u = o.byteOffset || 0,
//         h = void 0 !== o.bufferView ? s.bufferViews[o.bufferView].byteStride : void 0,
//         p = !0 === o.normalized;
//       let d, m;
//       if (h && h !== l) {
//         const t = Math.floor(u / h),
//           s = "InterleavedBuffer:" + o.bufferView + ":" + o.componentType + ":" + t + ":" + o.count;
//         let l = n.cache.get(s);
//         l || (d = new a(r, t * h, o.count * h / c), l = new e.InterleavedBuffer(d, h / c), n.cache.add(s, l)), m = new e.InterleavedBufferAttribute(l, i, u % h / c, p)
//       } else d = null === r ? new a(o.count * i) : new a(r, u, o.count * i), m = new e.BufferAttribute(d, i, p);
//       if (void 0 !== o.sparse) {
//         const n = re.SCALAR,
//           s = ne[o.sparse.indices.componentType],
//           c = o.sparse.indices.byteOffset || 0,
//           l = o.sparse.values.byteOffset || 0,
//           u = new s(t[1], c, o.sparse.count * n),
//           h = new a(t[2], l, o.sparse.count * i);
//         null !== r && (m = new e.BufferAttribute(m.array.slice(), m.itemSize, m.normalized));
//         for (let e = 0, t = u.length; e < t; e++) {
//           const t = u[e];
//           if (m.setX(t, h[e * i]), i >= 2 && m.setY(t, h[e * i + 1]), i >= 3 && m.setZ(t, h[e * i + 2]), i >= 4 && m.setW(t, h[e * i + 3]), i >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
//         }
//       }
//       return m
//     }))
//   }
//   loadTexture(e) {
//     const t = this.json,
//       n = this.options,
//       s = t.textures[e],
//       o = t.images[s.source];
//     let r = this.textureLoader;
//     if (o.uri) {
//       const e = n.manager.getHandler(o.uri);
//       null !== e && (r = e)
//     }
//     return this.loadTextureImage(e, o, r)
//   }
//   loadTextureImage(t, n, s) {
//     const o = this,
//       r = this.json,
//       i = this.options,
//       a = r.textures[t],
//       c = (n.uri || n.bufferView) + ":" + a.sampler;
//     if (this.textureCache[c]) return this.textureCache[c];
//     const l = e.$URL || self.webkitURL;
//     let u = n.uri || "",
//       h = !1;
//     if (void 0 !== n.bufferView) u = o.getDependency("bufferView", n.bufferView).then((function (t) {
//       h = !0;
//       const s = new e.$Blob([t], {
//         type: n.mimeType
//       });
//       return u = l.createObjectURL(s), u
//     }));
//     else if (void 0 === n.uri) throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
//     const p = Promise.resolve(u).then((function (t) {
//       return new Promise((function (n, o) {
//         let r = n;
//         !0 === s.isImageBitmapLoader && (r = function (t) {
//           const s = new e.Texture(t);
//           s.needsUpdate = !0, n(s)
//         }), s.load(pe(t, i.path), r, void 0, o)
//       }))
//     })).then((function (n) {
//       !0 === h && l.revokeObjectURL(u), n.flipY = !1, a.name && (n.name = a.name);
//       const s = (r.samplers || {})[a.sampler] || {};
//       return n.magFilter = se[s.magFilter] || e.LinearFilter, n.minFilter = se[s.minFilter] || e.LinearMipmapLinearFilter, n.wrapS = oe[s.wrapS] || e.RepeatWrapping, n.wrapT = oe[s.wrapT] || e.RepeatWrapping, o.associations.set(n, {
//         textures: t
//       }), n
//     })).catch((function () {
//       return console.error("THREE.GLTFLoader: Couldn't load texture", u), null
//     }));
//     return this.textureCache[c] = p, p
//   }
//   assignTexture(e, t, n) {
//     const s = this;
//     return this.getDependency("texture", n.index).then((function (o) {
//       if (void 0 === n.texCoord || 0 == n.texCoord || "aoMap" === t && 1 == n.texCoord || console.warn("THREE.GLTFLoader: Custom UV set " + n.texCoord + " for texture " + t + " not yet supported."), s.extensions[A.KHR_TEXTURE_TRANSFORM]) {
//         const e = void 0 !== n.extensions ? n.extensions[A.KHR_TEXTURE_TRANSFORM] : void 0;
//         if (e) {
//           const t = s.associations.get(o);
//           o = s.extensions[A.KHR_TEXTURE_TRANSFORM].extendTexture(o, e), s.associations.set(o, t)
//         }
//       }
//       return e[t] = o, o
//     }))
//   }
//   assignFinalMaterial(t) {
//     const n = t.geometry;
//     let s = t.material;
//     const o = void 0 === n.attributes.tangent,
//       r = void 0 !== n.attributes.color,
//       i = void 0 === n.attributes.normal;
//     if (t.isPoints) {
//       const t = "PointsMaterial:" + s.uuid;
//       let n = this.cache.get(t);
//       n || (n = new e.PointsMaterial, e.Material.prototype.copy.call(n, s), n.color.copy(s.color), n.map = s.map, n.sizeAttenuation = !1, this.cache.add(t, n)), s = n
//     } else if (t.isLine) {
//       const t = "LineBasicMaterial:" + s.uuid;
//       let n = this.cache.get(t);
//       n || (n = new e.LineBasicMaterial, e.Material.prototype.copy.call(n, s), n.color.copy(s.color), this.cache.add(t, n)), s = n
//     }
//     if (o || r || i) {
//       let e = "ClonedMaterial:" + s.uuid + ":";
//       s.isGLTFSpecularGlossinessMaterial && (e += "specular-glossiness:"), o && (e += "derivative-tangents:"), r && (e += "vertex-colors:"), i && (e += "flat-shading:");
//       let t = this.cache.get(e);
//       t || (t = s.clone(), r && (t.vertexColors = !0), i && (t.flatShading = !0), o && (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)), this.cache.add(e, t), this.associations.set(t, this.associations.get(s))), s = t
//     }
//     s.aoMap && void 0 === n.attributes.uv2 && void 0 !== n.attributes.uv && n.setAttribute("uv2", n.attributes.uv), t.material = s
//   }
//   getMaterialType() {
//     return e.MeshStandardMaterial
//   }
//   loadMaterial(t) {
//     const n = this,
//       s = this.json,
//       o = this.extensions,
//       r = s.materials[t];
//     let i;
//     const a = {},
//       c = r.extensions || {},
//       l = [];
//     if (c[A.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
//       const e = o[A.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
//       i = e.getMaterialType(), l.push(e.extendParams(a, r, n))
//     } else if (c[A.KHR_MATERIALS_UNLIT]) {
//       const e = o[A.KHR_MATERIALS_UNLIT];
//       i = e.getMaterialType(), l.push(e.extendParams(a, r, n))
//     } else {
//       const s = r.pbrMetallicRoughness || {};
//       if (a.color = new e.Color(1, 1, 1), a.opacity = 1, Array.isArray(s.baseColorFactor)) {
//         const e = s.baseColorFactor;
//         a.color.fromArray(e), a.opacity = e[3]
//       }
//       void 0 !== s.baseColorTexture && l.push(n.assignTexture(a, "map", s.baseColorTexture)), a.metalness = void 0 !== s.metallicFactor ? s.metallicFactor : 1, a.roughness = void 0 !== s.roughnessFactor ? s.roughnessFactor : 1, void 0 !== s.metallicRoughnessTexture && (l.push(n.assignTexture(a, "metalnessMap", s.metallicRoughnessTexture)), l.push(n.assignTexture(a, "roughnessMap", s.metallicRoughnessTexture))), i = this._invokeOne((function (e) {
//         return e.getMaterialType && e.getMaterialType(t)
//       })), l.push(Promise.all(this._invokeAll((function (e) {
//         return e.extendMaterialParams && e.extendMaterialParams(t, a)
//       }))))
//     }!0 === r.doubleSided && (a.side = e.DoubleSide);
//     const u = r.alphaMode || le;
//     if (u === he ? (a.transparent = !0, a.depthWrite = !1) : (a.format = e.RGBFormat, a.transparent = !1, u === ue && (a.alphaTest = void 0 !== r.alphaCutoff ? r.alphaCutoff : .5)), void 0 !== r.normalTexture && i !== e.MeshBasicMaterial && (l.push(n.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new e.Vector2(1, 1), void 0 !== r.normalTexture.scale)) {
//       const e = r.normalTexture.scale;
//       a.normalScale.set(e, e)
//     }
//     return void 0 !== r.occlusionTexture && i !== e.MeshBasicMaterial && (l.push(n.assignTexture(a, "aoMap", r.occlusionTexture)), void 0 !== r.occlusionTexture.strength && (a.aoMapIntensity = r.occlusionTexture.strength)), void 0 !== r.emissiveFactor && i !== e.MeshBasicMaterial && (a.emissive = (new e.Color).fromArray(r.emissiveFactor)), void 0 !== r.emissiveTexture && i !== e.MeshBasicMaterial && l.push(n.assignTexture(a, "emissiveMap", r.emissiveTexture)), Promise.all(l).then((function () {
//       let s;
//       return s = i === V ? o[A.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(a) : new i(a), r.name && (s.name = r.name), s.map && (s.map.encoding = e.sRGBEncoding), s.emissiveMap && (s.emissiveMap.encoding = e.sRGBEncoding), me(s, r), n.associations.set(s, {
//         materials: t
//       }), r.extensions && de(o, s, r), s
//     }))
//   }
//   createUniqueName(t) {
//     const n = e.PropertyBinding.sanitizeNodeName(t || "");
//     let s = n;
//     for (let e = 1; this.nodeNamesUsed[s]; ++e) s = n + "_" + e;
//     return this.nodeNamesUsed[s] = !0, s
//   }
//   loadGeometries(t) {
//     const n = this,
//       s = this.extensions,
//       o = this.primitiveCache;

//     function r(e) {
//       return s[A.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, n).then((function (t) {
//         return be(t, e, n)
//       }))
//     }
//     const i = [];
//     for (let s = 0, a = t.length; s < a; s++) {
//       const a = t[s],
//         c = ge(a),
//         l = o[c];
//       if (l) i.push(l.promise);
//       else {
//         let t;
//         t = a.extensions && a.extensions[A.KHR_DRACO_MESH_COMPRESSION] ? r(a) : be(new e.BufferGeometry, a, n), o[c] = {
//           primitive: a,
//           promise: t
//         }, i.push(t)
//       }
//     }
//     return Promise.all(i)
//   }
//   loadMesh(t) {
//     const n = this,
//       s = this.json,
//       o = this.extensions,
//       r = s.meshes[t],
//       i = r.primitives,
//       a = [];
//     for (let t = 0, n = i.length; t < n; t++) {
//       const n = void 0 === i[t].material ? (void 0 === (c = this.cache).DefaultMaterial && (c.DefaultMaterial = new e.MeshStandardMaterial({
//         color: 16777215,
//         emissive: 0,
//         metalness: 1,
//         roughness: 1,
//         transparent: !1,
//         depthTest: !0,
//         side: e.FrontSide
//       })), c.DefaultMaterial) : this.getDependency("material", i[t].material);
//       a.push(n)
//     }
//     var c;
//     return a.push(n.loadGeometries(i)), Promise.all(a).then((function (s) {
//       const a = s.slice(0, s.length - 1),
//         c = s[s.length - 1],
//         l = [];
//       for (let s = 0, u = c.length; s < u; s++) {
//         const u = c[s],
//           h = i[s];
//         let p;
//         const d = a[s];
//         if (h.mode === J || h.mode === ee || h.mode === te || void 0 === h.mode) p = !0 === r.isSkinnedMesh ? new e.SkinnedMesh(u, d) : new e.Mesh(u, d), !0 !== p.isSkinnedMesh || p.geometry.attributes.skinWeight.normalized || p.normalizeSkinWeights(), h.mode === ee ? p.geometry = Ee(p.geometry, e.TriangleStripDrawMode) : h.mode === te && (p.geometry = Ee(p.geometry, e.TriangleFanDrawMode));
//         else if (h.mode === Z) p = new e.LineSegments(u, d);
//         else if (h.mode === Q) p = new e.Line(u, d);
//         else if (h.mode === $) p = new e.LineLoop(u, d);
//         else {
//           if (h.mode !== W) throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + h.mode);
//           p = new e.Points(u, d)
//         }
//         Object.keys(p.geometry.morphAttributes).length > 0 && fe(p, r), p.name = n.createUniqueName(r.name || "mesh_" + t), me(p, r), h.extensions && de(o, p, h), n.assignFinalMaterial(p), l.push(p)
//       }
//       for (let e = 0, s = l.length; e < s; e++) n.associations.set(l[e], {
//         meshes: t,
//         primitives: e
//       });
//       if (1 === l.length) return l[0];
//       const u = new e.Group;
//       n.associations.set(u, {
//         meshes: t
//       });
//       for (let e = 0, t = l.length; e < t; e++) u.add(l[e]);
//       return u
//     }))
//   }
//   loadCamera(t) {
//     let n;
//     const s = this.json.cameras[t],
//       o = s[s.type];
//     if (o) return "perspective" === s.type ? n = new e.PerspectiveCamera(e.MathUtils.radToDeg(o.yfov), o.aspectRatio || 1, o.znear || 1, o.zfar || 2e6) : "orthographic" === s.type && (n = new e.OrthographicCamera(-o.xmag, o.xmag, o.ymag, -o.ymag, o.znear, o.zfar)), s.name && (n.name = this.createUniqueName(s.name)), me(n, s), Promise.resolve(n);
//     console.warn("THREE.GLTFLoader: Missing camera parameters.")
//   }
//   loadSkin(e) {
//     const t = this.json.skins[e],
//       n = {
//         joints: t.joints
//       };
//     return void 0 === t.inverseBindMatrices ? Promise.resolve(n) : this.getDependency("accessor", t.inverseBindMatrices).then((function (e) {
//       return n.inverseBindMatrices = e, n
//     }))
//   }
//   loadAnimation(t) {
//     const n = this.json.animations[t],
//       s = [],
//       o = [],
//       r = [],
//       i = [],
//       a = [];
//     for (let e = 0, t = n.channels.length; e < t; e++) {
//       const t = n.channels[e],
//         c = n.samplers[t.sampler],
//         l = t.target,
//         u = void 0 !== l.node ? l.node : l.id,
//         h = void 0 !== n.parameters ? n.parameters[c.input] : c.input,
//         p = void 0 !== n.parameters ? n.parameters[c.output] : c.output;
//       s.push(this.getDependency("node", u)), o.push(this.getDependency("accessor", h)), r.push(this.getDependency("accessor", p)), i.push(c), a.push(l)
//     }
//     return Promise.all([Promise.all(s), Promise.all(o), Promise.all(r), Promise.all(i), Promise.all(a)]).then((function (s) {
//       const o = s[0],
//         r = s[1],
//         i = s[2],
//         a = s[3],
//         c = s[4],
//         l = [];
//       for (let t = 0, n = o.length; t < n; t++) {
//         const n = o[t],
//           s = r[t],
//           u = i[t],
//           h = a[t],
//           p = c[t];
//         if (void 0 === n) continue;
//         let d;
//         switch (n.updateMatrix(), n.matrixAutoUpdate = !0, ae[p.path]) {
//           case ae.weights:
//             d = e.NumberKeyframeTrack;
//             break;
//           case ae.rotation:
//             d = e.QuaternionKeyframeTrack;
//             break;
//           default:
//             d = e.VectorKeyframeTrack
//         }
//         const m = n.name ? n.name : n.uuid,
//           f = void 0 !== h.interpolation ? ce[h.interpolation] : e.InterpolateLinear,
//           g = [];
//         ae[p.path] === ae.weights ? n.traverse((function (e) {
//           !0 === e.isMesh && e.morphTargetInfluences && g.push(e.name ? e.name : e.uuid)
//         })) : g.push(m);
//         let T = u.array;
//         if (u.normalized) {
//           const e = ve(T.constructor),
//             t = new Float32Array(T.length);
//           for (let n = 0, s = T.length; n < s; n++) t[n] = T[n] * e;
//           T = t
//         }
//         for (let t = 0, n = g.length; t < n; t++) {
//           const n = new d(g[t] + "." + ae[p.path], s.array, T, f);
//           "CUBICSPLINE" === h.interpolation && (n.createInterpolant = function (t) {
//             return new(this instanceof e.QuaternionKeyframeTrack ? q : Y)(this.times, this.values, this.getValueSize() / 3, t)
//           }, n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), l.push(n)
//         }
//       }
//       const u = n.name ? n.name : "animation_" + t;
//       return new e.AnimationClip(u, void 0, l)
//     }))
//   }
//   createNodeMesh(e) {
//     const t = this.json,
//       n = this,
//       s = t.nodes[e];
//     return void 0 === s.mesh ? null : n.getDependency("mesh", s.mesh).then((function (e) {
//       const t = n._getNodeRef(n.meshCache, s.mesh, e);
//       return void 0 !== s.weights && t.traverse((function (e) {
//         if (e.isMesh)
//           for (let t = 0, n = s.weights.length; t < n; t++) e.morphTargetInfluences[t] = s.weights[t]
//       })), t
//     }))
//   }
//   loadNode(t) {
//     const n = this.json,
//       s = this.extensions,
//       o = this,
//       r = n.nodes[t],
//       i = r.name ? o.createUniqueName(r.name) : "";
//     return function () {
//       const e = [],
//         n = o._invokeOne((function (e) {
//           return e.createNodeMesh && e.createNodeMesh(t)
//         }));
//       return n && e.push(n), void 0 !== r.camera && e.push(o.getDependency("camera", r.camera).then((function (e) {
//         return o._getNodeRef(o.cameraCache, r.camera, e)
//       }))), o._invokeAll((function (e) {
//         return e.createNodeAttachment && e.createNodeAttachment(t)
//       })).forEach((function (t) {
//         e.push(t)
//       })), Promise.all(e)
//     }().then((function (n) {
//       let a;
//       if (a = !0 === r.isBone ? new e.Bone : n.length > 1 ? new e.Group : 1 === n.length ? n[0] : new e.Object3D, a !== n[0])
//         for (let e = 0, t = n.length; e < t; e++) a.add(n[e]);
//       if (r.name && (a.userData.name = r.name, a.name = i), me(a, r), r.extensions && de(s, a, r), void 0 !== r.matrix) {
//         const t = new e.Matrix4;
//         t.fromArray(r.matrix), a.applyMatrix4(t)
//       } else void 0 !== r.translation && a.position.fromArray(r.translation), void 0 !== r.rotation && a.quaternion.fromArray(r.rotation), void 0 !== r.scale && a.scale.fromArray(r.scale);
//       return o.associations.has(a) || o.associations.set(a, {}), o.associations.get(a).nodes = t, a
//     }))
//   }
//   loadScene(t) {
//     const n = this.json,
//       s = this.extensions,
//       o = this.json.scenes[t],
//       r = this,
//       i = new e.Group;
//     o.name && (i.name = r.createUniqueName(o.name)), me(i, o), o.extensions && de(s, i, o);
//     const a = o.nodes || [],
//       c = [];
//     for (let e = 0, t = a.length; e < t; e++) c.push(xe(a[e], i, n, r));
//     return Promise.all(c).then((function () {
//       return r.associations = (t => {
//         const n = new Map;
//         for (const [t, s] of r.associations)(t instanceof e.Material || t instanceof e.Texture) && n.set(t, s);
//         return t.traverse((e => {
//           const t = r.associations.get(e);
//           null != t && n.set(e, t)
//         })), n
//       })(i), i
//     }))
//   }
// }

// function xe(t, n, s, o) {
//   const r = s.nodes[t];
//   return o.getDependency("node", t).then((function (t) {
//     if (void 0 === r.skin) return t;
//     let n;
//     return o.getDependency("skin", r.skin).then((function (e) {
//       n = e;
//       const t = [];
//       for (let e = 0, s = n.joints.length; e < s; e++) t.push(o.getDependency("node", n.joints[e]));
//       return Promise.all(t)
//     })).then((function (s) {
//       return t.traverse((function (t) {
//         if (!t.isMesh) return;
//         const o = [],
//           r = [];
//         for (let t = 0, i = s.length; t < i; t++) {
//           const i = s[t];
//           if (i) {
//             o.push(i);
//             const s = new e.Matrix4;
//             void 0 !== n.inverseBindMatrices && s.fromArray(n.inverseBindMatrices.array, 16 * t), r.push(s)
//           } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', n.joints[t])
//         }
//         t.bind(new e.Skeleton(o, r), t.matrixWorld)
//       })), t
//     }))
//   })).then((function (e) {
//     n.add(e);
//     const t = [];
//     if (r.children) {
//       const n = r.children;
//       for (let r = 0, i = n.length; r < i; r++) {
//         const i = n[r];
//         t.push(xe(i, e, s, o))
//       }
//     }
//     return Promise.all(t)
//   }))
// }

// function be(t, n, s) {
//   const o = n.attributes,
//     r = [];

//   function i(e, n) {
//     return s.getDependency("accessor", e).then((function (e) {
//       t.setAttribute(n, e)
//     }))
//   }
//   for (const e in o) {
//     const n = ie[e] || e.toLowerCase();
//     n in t.attributes || r.push(i(o[e], n))
//   }
//   if (void 0 !== n.indices && !t.index) {
//     const e = s.getDependency("accessor", n.indices).then((function (e) {
//       t.setIndex(e)
//     }));
//     r.push(e)
//   }
//   return me(t, n),
//     function (t, n, s) {
//       const o = n.attributes,
//         r = new e.Box3;
//       if (void 0 === o.POSITION) return; {
//         const t = s.json.accessors[o.POSITION],
//           n = t.min,
//           i = t.max;
//         if (void 0 === n || void 0 === i) return void console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
//         if (r.set(new e.Vector3(n[0], n[1], n[2]), new e.Vector3(i[0], i[1], i[2])), t.normalized) {
//           const e = ve(ne[t.componentType]);
//           r.min.multiplyScalar(e), r.max.multiplyScalar(e)
//         }
//       }
//       const i = n.targets;
//       if (void 0 !== i) {
//         const t = new e.Vector3,
//           n = new e.Vector3;
//         for (let e = 0, o = i.length; e < o; e++) {
//           const o = i[e];
//           if (void 0 !== o.POSITION) {
//             const e = s.json.accessors[o.POSITION],
//               r = e.min,
//               i = e.max;
//             if (void 0 !== r && void 0 !== i) {
//               if (n.setX(Math.max(Math.abs(r[0]), Math.abs(i[0]))), n.setY(Math.max(Math.abs(r[1]), Math.abs(i[1]))), n.setZ(Math.max(Math.abs(r[2]), Math.abs(i[2]))), e.normalized) {
//                 const t = ve(ne[e.componentType]);
//                 n.multiplyScalar(t)
//               }
//               t.max(n)
//             } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
//           }
//         }
//         r.expandByVector(t)
//       }
//       t.boundingBox = r;
//       const a = new e.Sphere;
//       r.getCenter(a.center), a.radius = r.min.distanceTo(r.max) / 2, t.boundingSphere = a
//     }(t, n, s), Promise.all(r).then((function () {
//       return void 0 !== n.targets ? function (e, t, n) {
//         let s = !1,
//           o = !1;
//         for (let e = 0, n = t.length; e < n; e++) {
//           const n = t[e];
//           if (void 0 !== n.POSITION && (s = !0), void 0 !== n.NORMAL && (o = !0), s && o) break
//         }
//         if (!s && !o) return Promise.resolve(e);
//         const r = [],
//           i = [];
//         for (let a = 0, c = t.length; a < c; a++) {
//           const c = t[a];
//           if (s) {
//             const t = void 0 !== c.POSITION ? n.getDependency("accessor", c.POSITION) : e.attributes.position;
//             r.push(t)
//           }
//           if (o) {
//             const t = void 0 !== c.NORMAL ? n.getDependency("accessor", c.NORMAL) : e.attributes.normal;
//             i.push(t)
//           }
//         }
//         return Promise.all([Promise.all(r), Promise.all(i)]).then((function (t) {
//           const n = t[0],
//             r = t[1];
//           return s && (e.morphAttributes.position = n), o && (e.morphAttributes.normal = r), e.morphTargetsRelative = !0, e
//         }))
//       }(t, n.targets, s) : t
//     }))
// }

// function Ee(t, n) {
//   let s = t.getIndex();
//   if (null === s) {
//     const e = [],
//       n = t.getAttribute("position");
//     if (void 0 === n) return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), t;
//     for (let t = 0; t < n.count; t++) e.push(t);
//     t.setIndex(e), s = t.getIndex()
//   }
//   const o = s.count - 2,
//     r = [];
//   if (n === e.TriangleFanDrawMode)
//     for (let e = 1; e <= o; e++) r.push(s.getX(0)), r.push(s.getX(e)), r.push(s.getX(e + 1));
//   else
//     for (let e = 0; e < o; e++) e % 2 == 0 ? (r.push(s.getX(e)), r.push(s.getX(e + 1)), r.push(s.getX(e + 2))) : (r.push(s.getX(e + 2)), r.push(s.getX(e + 1)), r.push(s.getX(e)));
//   r.length / 3 !== o && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
//   const i = t.clone();
//   return i.setIndex(r), i
// }
// const Me = {
//     type: "change"
//   },
//   we = {
//     type: "start"
//   },
//   Re = {
//     type: "end"
//   };
// class Ae extends e.EventDispatcher {
//   constructor(t, n) {
//     super(), void 0 === n && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'), n === e.$document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.object = t, this.domElement = n, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new e.Vector3, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
//       LEFT: "ArrowLeft",
//       UP: "ArrowUp",
//       RIGHT: "ArrowRight",
//       BOTTOM: "ArrowDown"
//     }, this.mouseButtons = {
//       LEFT: e.MOUSE.ROTATE,
//       MIDDLE: e.MOUSE.DOLLY,
//       RIGHT: e.MOUSE.PAN
//     }, this.touches = {
//       ONE: e.TOUCH.ROTATE,
//       TWO: e.TOUCH.DOLLY_PAN
//     }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function () {
//       return a.phi
//     }, this.getAzimuthalAngle = function () {
//       return a.theta
//     }, this.getDistance = function () {
//       return this.object.position.distanceTo(this.target)
//     }, this.listenToKeyEvents = function (e) {
//       e.addEventListener("keydown", K), this._domElementKeyEvents = e
//     }, this.saveState = function () {
//       s.target0.copy(s.target), s.position0.copy(s.object.position), s.zoom0 = s.object.zoom
//     }, this.reset = function () {
//       s.target.copy(s.target0), s.object.position.copy(s.position0), s.object.zoom = s.zoom0, s.object.updateProjectionMatrix(), s.dispatchEvent(Me), s.update(), r = o.NONE
//     }, this.update = function () {
//       const n = new e.Vector3,
//         p = (new e.Quaternion).setFromUnitVectors(t.up, new e.Vector3(0, 1, 0)),
//         d = p.clone().invert(),
//         m = new e.Vector3,
//         f = new e.Quaternion,
//         g = 2 * Math.PI;
//       return function () {
//         const e = s.object.position;
//         n.copy(e).sub(s.target), n.applyQuaternion(p), a.setFromVector3(n), s.autoRotate && r === o.NONE && w(2 * Math.PI / 60 / 60 * s.autoRotateSpeed), s.enableDamping ? (a.theta += c.theta * s.dampingFactor, a.phi += c.phi * s.dampingFactor) : (a.theta += c.theta, a.phi += c.phi);
//         let t = s.minAzimuthAngle,
//           T = s.maxAzimuthAngle;
//         return isFinite(t) && isFinite(T) && (t < -Math.PI ? t += g : t > Math.PI && (t -= g), T < -Math.PI ? T += g : T > Math.PI && (T -= g), a.theta = t <= T ? Math.max(t, Math.min(T, a.theta)) : a.theta > (t + T) / 2 ? Math.max(t, a.theta) : Math.min(T, a.theta)), a.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, a.phi)), a.makeSafe(), a.radius *= l, a.radius = Math.max(s.minDistance, Math.min(s.maxDistance, a.radius)), !0 === s.enableDamping ? s.target.addScaledVector(u, s.dampingFactor) : s.target.add(u), n.setFromSpherical(a), n.applyQuaternion(d), e.copy(s.target).add(n), s.object.lookAt(s.target), !0 === s.enableDamping ? (c.theta *= 1 - s.dampingFactor, c.phi *= 1 - s.dampingFactor, u.multiplyScalar(1 - s.dampingFactor)) : (c.set(0, 0, 0), u.set(0, 0, 0)), l = 1, !!(h || m.distanceToSquared(s.object.position) > i || 8 * (1 - f.dot(s.object.quaternion)) > i) && (s.dispatchEvent(Me), m.copy(s.object.position), f.copy(s.object.quaternion), h = !1, !0)
//       }
//     }(), this.dispose = function () {
//       s.domElement.removeEventListener("contextmenu", X), s.domElement.removeEventListener("pointerdown", k), s.domElement.removeEventListener("pointercancel", G), s.domElement.removeEventListener("wheel", V), s.domElement.removeEventListener("pointermove", j), s.domElement.removeEventListener("pointerup", B), null !== s._domElementKeyEvents && s._domElementKeyEvents.removeEventListener("keydown", K)
//     };
//     const s = this,
//       o = {
//         NONE: -1,
//         ROTATE: 0,
//         DOLLY: 1,
//         PAN: 2,
//         TOUCH_ROTATE: 3,
//         TOUCH_PAN: 4,
//         TOUCH_DOLLY_PAN: 5,
//         TOUCH_DOLLY_ROTATE: 6
//       };
//     let r = o.NONE;
//     const i = 1e-6,
//       a = new e.Spherical,
//       c = new e.Spherical;
//     let l = 1;
//     const u = new e.Vector3;
//     let h = !1;
//     const p = new e.Vector2,
//       d = new e.Vector2,
//       m = new e.Vector2,
//       f = new e.Vector2,
//       g = new e.Vector2,
//       T = new e.Vector2,
//       v = new e.Vector2,
//       y = new e.Vector2,
//       x = new e.Vector2,
//       b = [],
//       E = {};

//     function M() {
//       return Math.pow(.95, s.zoomSpeed)
//     }

//     function w(e) {
//       c.theta -= e
//     }

//     function R(e) {
//       c.phi -= e
//     }
//     const A = function () {
//         const t = new e.Vector3;
//         return function (e, n) {
//           t.setFromMatrixColumn(n, 0), t.multiplyScalar(-e), u.add(t)
//         }
//       }(),
//       S = function () {
//         const t = new e.Vector3;
//         return function (e, n) {
//           !0 === s.screenSpacePanning ? t.setFromMatrixColumn(n, 1) : (t.setFromMatrixColumn(n, 0), t.crossVectors(s.object.up, t)), t.multiplyScalar(e), u.add(t)
//         }
//       }(),
//       _ = function () {
//         const t = new e.Vector3;
//         return function (e, n) {
//           const o = s.domElement;
//           if (s.object.isPerspectiveCamera) {
//             const r = s.object.position;
//             t.copy(r).sub(s.target);
//             let i = t.length();
//             i *= Math.tan(s.object.fov / 2 * Math.PI / 180), A(2 * e * i / o.clientHeight, s.object.matrix), S(2 * n * i / o.clientHeight, s.object.matrix)
//           } else s.object.isOrthographicCamera ? (A(e * (s.object.right - s.object.left) / s.object.zoom / o.clientWidth, s.object.matrix), S(n * (s.object.top - s.object.bottom) / s.object.zoom / o.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), s.enablePan = !1)
//         }
//       }();

//     function L(e) {
//       s.object.isPerspectiveCamera ? l /= e : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * e)), s.object.updateProjectionMatrix(), h = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1)
//     }

//     function O(e) {
//       s.object.isPerspectiveCamera ? l *= e : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / e)), s.object.updateProjectionMatrix(), h = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1)
//     }

//     function P(e) {
//       p.set(e.clientX, e.clientY)
//     }

//     function C(e) {
//       f.set(e.clientX, e.clientY)
//     }

//     function I() {
//       if (1 === b.length) p.set(b[0].pageX, b[0].pageY);
//       else {
//         const e = .5 * (b[0].pageX + b[1].pageX),
//           t = .5 * (b[0].pageY + b[1].pageY);
//         p.set(e, t)
//       }
//     }

//     function N() {
//       if (1 === b.length) f.set(b[0].pageX, b[0].pageY);
//       else {
//         const e = .5 * (b[0].pageX + b[1].pageX),
//           t = .5 * (b[0].pageY + b[1].pageY);
//         f.set(e, t)
//       }
//     }

//     function H() {
//       const e = b[0].pageX - b[1].pageX,
//         t = b[0].pageY - b[1].pageY,
//         n = Math.sqrt(e * e + t * t);
//       v.set(0, n)
//     }

//     function D(e) {
//       if (1 == b.length) d.set(e.pageX, e.pageY);
//       else {
//         const t = q(e),
//           n = .5 * (e.pageX + t.x),
//           s = .5 * (e.pageY + t.y);
//         d.set(n, s)
//       }
//       m.subVectors(d, p).multiplyScalar(s.rotateSpeed);
//       const t = s.domElement;
//       w(2 * Math.PI * m.x / t.clientHeight), R(2 * Math.PI * m.y / t.clientHeight), p.copy(d)
//     }

//     function U(e) {
//       if (1 === b.length) g.set(e.pageX, e.pageY);
//       else {
//         const t = q(e),
//           n = .5 * (e.pageX + t.x),
//           s = .5 * (e.pageY + t.y);
//         g.set(n, s)
//       }
//       T.subVectors(g, f).multiplyScalar(s.panSpeed), _(T.x, T.y), f.copy(g)
//     }

//     function F(e) {
//       const t = q(e),
//         n = e.pageX - t.x,
//         o = e.pageY - t.y,
//         r = Math.sqrt(n * n + o * o);
//       y.set(0, r), x.set(0, Math.pow(y.y / v.y, s.zoomSpeed)), L(x.y), v.copy(y)
//     }

//     function k(t) {
//       !1 !== s.enabled && (0 === b.length && (s.domElement.setPointerCapture(t.pointerId), s.domElement.addEventListener("pointermove", j), s.domElement.addEventListener("pointerup", B)), function (e) {
//         b.push(e)
//       }(t), "touch" === t.pointerType ? function (t) {
//         switch (z(t), b.length) {
//           case 1:
//             switch (s.touches.ONE) {
//               case e.TOUCH.ROTATE:
//                 if (!1 === s.enableRotate) return;
//                 I(), r = o.TOUCH_ROTATE;
//                 break;
//               case e.TOUCH.PAN:
//                 if (!1 === s.enablePan) return;
//                 N(), r = o.TOUCH_PAN;
//                 break;
//               default:
//                 r = o.NONE
//             }
//             break;
//           case 2:
//             switch (s.touches.TWO) {
//               case e.TOUCH.DOLLY_PAN:
//                 if (!1 === s.enableZoom && !1 === s.enablePan) return;
//                 s.enableZoom && H(), s.enablePan && N(), r = o.TOUCH_DOLLY_PAN;
//                 break;
//               case e.TOUCH.DOLLY_ROTATE:
//                 if (!1 === s.enableZoom && !1 === s.enableRotate) return;
//                 s.enableZoom && H(), s.enableRotate && I(), r = o.TOUCH_DOLLY_ROTATE;
//                 break;
//               default:
//                 r = o.NONE
//             }
//             break;
//           default:
//             r = o.NONE
//         }
//         r !== o.NONE && s.dispatchEvent(we)
//       }(t) : function (t) {
//         let n;
//         switch (t.button) {
//           case 0:
//             n = s.mouseButtons.LEFT;
//             break;
//           case 1:
//             n = s.mouseButtons.MIDDLE;
//             break;
//           case 2:
//             n = s.mouseButtons.RIGHT;
//             break;
//           default:
//             n = -1
//         }
//         switch (n) {
//           case e.MOUSE.DOLLY:
//             if (!1 === s.enableZoom) return;
//             ! function (e) {
//               v.set(e.clientX, e.clientY)
//             }(t), r = o.DOLLY;
//             break;
//           case e.MOUSE.ROTATE:
//             if (t.ctrlKey || t.metaKey || t.shiftKey) {
//               if (!1 === s.enablePan) return;
//               C(t), r = o.PAN
//             } else {
//               if (!1 === s.enableRotate) return;
//               P(t), r = o.ROTATE
//             }
//             break;
//           case e.MOUSE.PAN:
//             if (t.ctrlKey || t.metaKey || t.shiftKey) {
//               if (!1 === s.enableRotate) return;
//               P(t), r = o.ROTATE
//             } else {
//               if (!1 === s.enablePan) return;
//               C(t), r = o.PAN
//             }
//             break;
//           default:
//             r = o.NONE
//         }
//         r !== o.NONE && s.dispatchEvent(we)
//       }(t))
//     }

//     function j(e) {
//       !1 !== s.enabled && ("touch" === e.pointerType ? function (e) {
//         switch (z(e), r) {
//           case o.TOUCH_ROTATE:
//             if (!1 === s.enableRotate) return;
//             D(e), s.update();
//             break;
//           case o.TOUCH_PAN:
//             if (!1 === s.enablePan) return;
//             U(e), s.update();
//             break;
//           case o.TOUCH_DOLLY_PAN:
//             if (!1 === s.enableZoom && !1 === s.enablePan) return;
//             ! function (e) {
//               s.enableZoom && F(e), s.enablePan && U(e)
//             }(e), s.update();
//             break;
//           case o.TOUCH_DOLLY_ROTATE:
//             if (!1 === s.enableZoom && !1 === s.enableRotate) return;
//             ! function (e) {
//               s.enableZoom && F(e), s.enableRotate && D(e)
//             }(e), s.update();
//             break;
//           default:
//             r = o.NONE
//         }
//       }(e) : function (e) {
//         if (!1 === s.enabled) return;
//         switch (r) {
//           case o.ROTATE:
//             if (!1 === s.enableRotate) return;
//             ! function (e) {
//               d.set(e.clientX, e.clientY), m.subVectors(d, p).multiplyScalar(s.rotateSpeed);
//               const t = s.domElement;
//               w(2 * Math.PI * m.x / t.clientHeight), R(2 * Math.PI * m.y / t.clientHeight), p.copy(d), s.update()
//             }(e);
//             break;
//           case o.DOLLY:
//             if (!1 === s.enableZoom) return;
//             ! function (e) {
//               y.set(e.clientX, e.clientY), x.subVectors(y, v), x.y > 0 ? L(M()) : x.y < 0 && O(M()), v.copy(y), s.update()
//             }(e);
//             break;
//           case o.PAN:
//             if (!1 === s.enablePan) return;
//             ! function (e) {
//               g.set(e.clientX, e.clientY), T.subVectors(g, f).multiplyScalar(s.panSpeed), _(T.x, T.y), f.copy(g), s.update()
//             }(e)
//         }
//       }(e))
//     }

//     function B(e) {
//       !1 !== s.enabled && (e.pointerType, s.dispatchEvent(Re), r = o.NONE, Y(e), 0 === b.length && (s.domElement.releasePointerCapture(e.pointerId), s.domElement.removeEventListener("pointermove", j), s.domElement.removeEventListener("pointerup", B)))
//     }

//     function G(e) {
//       Y(e)
//     }

//     function V(e) {
//       !1 === s.enabled || !1 === s.enableZoom || r !== o.NONE && r !== o.ROTATE || (e.preventDefault(), s.dispatchEvent(we), function (e) {
//         e.deltaY < 0 ? O(M()) : e.deltaY > 0 && L(M()), s.update()
//       }(e), s.dispatchEvent(Re))
//     }

//     function K(e) {
//       !1 !== s.enabled && !1 !== s.enablePan && function (e) {
//         let t = !1;
//         switch (e.code) {
//           case s.keys.UP:
//             _(0, s.keyPanSpeed), t = !0;
//             break;
//           case s.keys.BOTTOM:
//             _(0, -s.keyPanSpeed), t = !0;
//             break;
//           case s.keys.LEFT:
//             _(s.keyPanSpeed, 0), t = !0;
//             break;
//           case s.keys.RIGHT:
//             _(-s.keyPanSpeed, 0), t = !0
//         }
//         t && (e.preventDefault(), s.update())
//       }(e)
//     }

//     function X(e) {
//       !1 !== s.enabled && e.preventDefault()
//     }

//     function Y(e) {
//       delete E[e.pointerId];
//       for (let t = 0; t < b.length; t++)
//         if (b[t].pointerId == e.pointerId) return void b.splice(t, 1)
//     }

//     function z(t) {
//       let n = E[t.pointerId];
//       void 0 === n && (n = new e.Vector2, E[t.pointerId] = n), n.set(t.pageX, t.pageY)
//     }

//     function q(e) {
//       const t = e.pointerId === b[0].pointerId ? b[1] : b[0];
//       return E[t.pointerId]
//     }
//     s.domElement.addEventListener("contextmenu", X), s.domElement.addEventListener("pointerdown", k), s.domElement.addEventListener("pointercancel", G), s.domElement.addEventListener("wheel", V, {
//       passive: !1
//     }), this.update()
//   }
// }
// Page({
//   disposing: !1,
//   platform: null,
//   frameId: -1,
//   onReady() {
//     wx.createSelectorQuery().select("#gl").node().exec((t => {
//       const n = t[0].node;
//       this.platform = new M(n), e.PLATFORM.set(this.platform);
//       const s = new e.WebGL1Renderer({
//           canvas: n,
//           antialias: !0,
//           alpha: !0
//         }),
//         o = new e.PerspectiveCamera(75, n.width / n.height, .1, 1e3),
//         r = new e.Scene,
//         i = new w,
//         a = new Ae(o, n);
//       a.enableDamping = !0, i.loadAsync("https://dtmall-tel.alicdn.com/edgeComputingConfig/upload_models/1591673169101/RobotExpressive.glb").then((e => {
//         e.parser = null, e.scene.position.y = -2, r.add(e.scene)
//       })), o.position.z = 10, s.outputEncoding = e.sRGBEncoding, r.add(new e.AmbientLight(16777215, 1)), r.add(new e.DirectionalLight(16777215, 1)), s.setSize(n.width, n.height), s.setPixelRatio(e.$window.devicePixelRatio);
//       const c = () => {
//         this.disposing || (this.frameId = e.$requestAnimationFrame(c)), a.update(), s.render(r, o)
//       };
//       c()
//     }))
//   },
//   onUnload() {
//     this.disposing = !0, e.$cancelAnimationFrame(this.frameId), e.PLATFORM.dispose()
//   },
//   onTX(e) {
//     this.platform.dispatchTouchEvent(e)
//   }
// });