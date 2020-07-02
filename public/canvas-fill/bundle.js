!function(){"use strict";let t,e=0,r=0;const i=()=>t,s=e=>{t=e},n=()=>e,h=t=>{e=t},o=t=>{r=t};let a=0;let u=800,c=600,d=1;function l(){return u}function f(){return c}function x(){return d}const m=[],p=t=>{m.push(t)},g=()=>m,y=()=>{m.length=0};let T;let w,E=0;function v(){return E}function b(t){let e;return t&&("string"==typeof t?e=document.getElementById(t):"object"==typeof t&&1===t.nodeType&&(e=t)),e||(e=document.body),e}function R(){return w}let S=[];let _,A={alpha:!1,antialias:!1,depth:!1,premultipliedAlpha:!1};class F{constructor(t){this.stack=[],this.current=null,this.renderer=t}reset(){this.stack=[],this.current=null;const t=this.renderer,e=t.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,t.width,t.height)}add(t,e=!0,r=0,i=0){this.stack.push({framebuffer:t,width:r,height:i}),this.set(t,e,r,i)}set(t,e=!0,r=0,i=0){const s=this.renderer.gl;s.bindFramebuffer(s.FRAMEBUFFER,t),e&&(s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT)),r>0&&s.viewport(0,0,r,i),this.current=t}pop(){this.stack.pop();const t=this.stack.length;if(t>0){const e=this.stack[t-1];this.set(e.framebuffer,!1,e.width,e.height)}else this.reset()}rebind(){const t=this.renderer.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.current)}destroy(){this.stack=[]}}const C=()=>_,D=t=>{_=t};function U(t){const e=C();if(!e)return;const{parent:r,flipY:i,unpackPremultiplyAlpha:s,minFilter:n,magFilter:h,wrapS:o,wrapT:a,generateMipmap:u,isPOT:c}=t,d=r.image;let l=r.width,f=r.height;const x=e.createTexture();return e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,x),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,i),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s),d?(e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,d),l=d.width,f=d.height):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,l,f,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,a),u&&c&&e.generateMipmap(e.TEXTURE_2D),t.texture=x,x}function B(t){const e=C();e&&e.isTexture(t)&&e.deleteTexture(t)}class L{constructor(t,e={}){this.index=0,this.indexCounter=-1,this.dirtyIndex=!0,this.unpackPremultiplyAlpha=!0,this.flipY=!1,this.isPOT=!1,this.generateMipmap=!1;const r=C();var i,s;this.parent=t,this.isPOT=(i=t.width,s=t.height,!(i<1||s<1)&&0==(i&i-1)&&0==(s&s-1));const{texture:n=null,framebuffer:h=null,unpackPremultiplyAlpha:o=!0,minFilter:a=r.LINEAR,magFilter:u=r.LINEAR,wrapS:c=r.CLAMP_TO_EDGE,wrapT:d=r.CLAMP_TO_EDGE,generateMipmap:l=this.isPOT,flipY:f=!1}=e;this.minFilter=a,this.magFilter=u,this.wrapS=c,this.wrapT=d,this.generateMipmap=l,this.flipY=f,this.unpackPremultiplyAlpha=o,h&&(this.framebuffer=h),n?this.texture=n:U(this)}setFilter(t){this.texture&&function(t,e=!0){const r=C();r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t);const i=e?r.LINEAR:r.NEAREST;r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,i),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,i)}(this.texture,t)}create(){const t=this.texture;return t&&B(t),U(this)}update(){return this.texture?function(t){const e=C(),r=t.parent.image,i=r.width,s=r.height;return i>0&&s>0&&(e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t.texture),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t.flipY),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r)),t.texture}(this):U(this)}setIndex(t){this.dirtyIndex=t!==this.index,this.index=t}destroy(){B(this.texture),function(t){const e=C();e&&e.isFramebuffer(t)&&e.deleteFramebuffer(t)}(this.framebuffer),this.parent=null,this.texture=null,this.framebuffer=null}}class M{constructor(t,e,r,i,s){this.batchSize=t,this.dataSize=e,this.indexSize=r,this.vertexElementSize=i,this.quadIndexSize=s,this.vertexByteSize=i*e,this.quadByteSize=4*this.vertexByteSize,this.quadElementSize=4*i,this.bufferByteSize=t*this.quadByteSize,this.create()}create(){let t=[];for(let e=0;e<this.batchSize*this.indexSize;e+=this.indexSize)t.push(e+0,e+1,e+2,e+2,e+3,e+0);this.data=new ArrayBuffer(this.bufferByteSize),this.index=new Uint16Array(t),this.vertexViewF32=new Float32Array(this.data),this.vertexViewU32=new Uint32Array(this.data);const e=C();this.vertexBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.vertexBuffer),e.bufferData(e.ARRAY_BUFFER,this.data,e.DYNAMIC_DRAW),this.indexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.index,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null),t=[]}destroy(){}}class I{constructor(t,e,r,i,s,n){this.trimmed=!1,this.texture=t,this.key=e,this.x=r,this.y=i,this.width=s,this.height=n,this.sourceSizeWidth=s,this.sourceSizeHeight=n,this.updateUVs()}setPivot(t,e){this.pivot={x:t,y:e}}setSize(t,e){this.width=t,this.height=e,this.sourceSizeWidth=t,this.sourceSizeHeight=e,this.updateUVs()}setSourceSize(t,e){this.sourceSizeWidth=t,this.sourceSizeHeight=e}setTrim(t,e,r,i,s,n){this.trimmed=!0,this.sourceSizeWidth=t,this.sourceSizeHeight=e,this.spriteSourceSizeX=r,this.spriteSourceSizeY=i,this.spriteSourceSizeWidth=s,this.spriteSourceSizeHeight=n}getExtent(t,e){const r=this.sourceSizeWidth,i=this.sourceSizeHeight;let s,n,h,o;return this.trimmed?(s=this.spriteSourceSizeX-t*r,n=s+this.spriteSourceSizeWidth,h=this.spriteSourceSizeY-e*i,o=h+this.spriteSourceSizeHeight):(s=-t*r,n=s+r,h=-e*i,o=h+i),{left:s,right:n,top:h,bottom:o}}setExtent(t){const e=t.transform,r=e.origin.x,i=e.origin.y,s=this.sourceSizeWidth,n=this.sourceSizeHeight;let h,o,a,u;this.trimmed?(h=this.spriteSourceSizeX-r*s,o=this.spriteSourceSizeY-i*n,a=this.spriteSourceSizeWidth,u=this.spriteSourceSizeHeight):(h=-r*s,o=-i*n,a=s,u=n),e.setExtent(h,o,a,u)}updateUVs(){const{x:t,y:e,width:r,height:i}=this,s=this.texture.width,n=this.texture.height;this.u0=t/s,this.v0=e/n,this.u1=(t+r)/s,this.v1=(e+i)/n}}class z{constructor(t,e,r){this.key="",t&&(e=t.width,r=t.height),this.image=t,this.width=e,this.height=r,this.frames=new Map,this.data={},this.addFrame("__BASE",0,0,e,r),p(this)}addFrame(t,e,r,i,s){if(this.frames.has(t))return null;const n=new I(this,t,e,r,i,s);return this.frames.set(t,n),this.firstFrame&&"__BASE"!==this.firstFrame.key||(this.firstFrame=n),n}getFrame(t){if(!t)return this.firstFrame;t instanceof I&&(t=t.key);let e=this.frames.get(t);return e||(console.warn("Frame missing: "+t),e=this.firstFrame),e}setSize(t,e){this.width=t,this.height=e;this.frames.get("__BASE").setSize(t,e)}destroy(){this.binding&&this.binding.destroy(),this.frames.clear(),this.data=null,this.image=null,this.firstFrame=null}}let k;const P=()=>k,N=t=>{k=t},X={fragmentShader:"\n#define SHADER_NAME SINGLE_QUAD_FRAG\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\nvarying float vTextureId;\nvarying vec4 vTintColor;\n\nuniform sampler2D uTexture;\n\nvoid main (void)\n{\n    vec4 color = texture2D(uTexture, vTextureCoord);\n\n    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);\n}",vertexShader:"\n#define SHADER_NAME SINGLE_QUAD_VERT\n\nprecision highp float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute float aTextureId;\nattribute vec4 aTintColor;\n\nuniform mat4 uProjectionMatrix;\nuniform mat4 uCameraMatrix;\n\nvarying vec2 vTextureCoord;\nvarying float vTextureId;\nvarying vec4 vTintColor;\n\nvoid main (void)\n{\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vTintColor = aTintColor;\n\n    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 0.0, 1.0);\n}"};class G{constructor(t={}){this.attribs={aVertexPosition:0,aTextureCoord:0,aTextureId:0,aTintColor:0},this.uniforms={uProjectionMatrix:0,uCameraMatrix:0,uTexture:0,uTime:0,uResolution:0},this.renderToFBO=!1,this.renderer=P();const{batchSize:e=4096,dataSize:r=4,indexSize:i=4,vertexElementSize:s=6,quadIndexSize:n=6,fragmentShader:h=X.fragmentShader,vertexShader:o=X.vertexShader,width:a=l(),height:u=f(),resolution:c=x(),renderToFBO:d=!1}=t;this.buffer=new M(e,r,i,s,n),this.createShaders(h,o),this.count=0,this.renderToFBO=d;const m=new z(null,a*c,u*c),p=new L(m);m.binding=p,p.framebuffer=function(t,e){const r=C();e||(e=r.COLOR_ATTACHMENT0);const i=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,e,r.TEXTURE_2D,t,0),r.bindFramebuffer(r.FRAMEBUFFER,null),i}(p.texture),this.texture=m,this.framebuffer=p.framebuffer}createShaders(t,e){const r=this.renderer.gl,i=r.createShader(r.FRAGMENT_SHADER);r.shaderSource(i,t),r.compileShader(i);let s=!1,n=r.getShaderInfoLog(i);n.length>0&&(s=!0,console.error(n));const h=r.createShader(r.VERTEX_SHADER);if(r.shaderSource(h,e),r.compileShader(h),n=r.getShaderInfoLog(i),n.length>0&&(s=!0,console.error(n)),s)return;const o=r.createProgram();r.attachShader(o,h),r.attachShader(o,i),r.linkProgram(o),r.useProgram(o),this.program=o;for(const t of Object.keys(this.attribs)){const e=r.getAttribLocation(o,t);r.enableVertexAttribArray(e),this.attribs[t]=e}for(const t of Object.keys(this.uniforms))this.uniforms[t]=r.getUniformLocation(o,t)}bind(t,e,r){if(!this.program)return!1;const i=this.renderer,s=i.gl,n=this.uniforms;return s.useProgram(this.program),s.uniformMatrix4fv(n.uProjectionMatrix,!1,t),s.uniformMatrix4fv(n.uCameraMatrix,!1,e),s.uniform1i(n.uTexture,i.textures.textureIndex[r]),s.uniform1f(n.uTime,performance.now()),s.uniform2f(n.uResolution,i.width,i.height),this.bindBuffers(this.buffer.indexBuffer,this.buffer.vertexBuffer),!0}bindBuffers(t,e){const r=this.renderer.gl,i=this.buffer.vertexByteSize,s=this.attribs;r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t),r.bindBuffer(r.ARRAY_BUFFER,e),r.vertexAttribPointer(s.aVertexPosition,2,r.FLOAT,!1,i,0),r.vertexAttribPointer(s.aTextureCoord,2,r.FLOAT,!1,i,8),r.vertexAttribPointer(s.aTextureId,1,r.FLOAT,!1,i,16),r.vertexAttribPointer(s.aTintColor,4,r.UNSIGNED_BYTE,!0,i,20),this.count=0}draw(t){const e=this.renderer,r=e.gl,i=this.buffer;if(t===i.batchSize)r.bufferData(r.ARRAY_BUFFER,i.data,r.DYNAMIC_DRAW);else{const e=i.vertexViewF32.subarray(0,t*i.quadElementSize);r.bufferSubData(r.ARRAY_BUFFER,0,e)}this.renderToFBO&&e.fbo.add(this.framebuffer,!0),r.drawElements(r.TRIANGLES,t*i.quadIndexSize,r.UNSIGNED_SHORT,0),this.renderToFBO&&e.fbo.pop()}flush(){const t=this.count;return 0!==t&&(this.draw(t),this.prevCount=t,this.count=0,!0)}}class O extends G{constructor(t={fragmentShader:"\n#define SHADER_NAME MULTI_QUAD_FRAG\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\nvarying float vTextureId;\nvarying vec4 vTintColor;\n\nuniform sampler2D uTexture[%count%];\n\nvoid main (void)\n{\n    vec4 color;\n\n    %forloop%\n\n    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);\n}"}){super(t)}createShaders(t,e){const r=v();let i="";for(let t=1;t<r;t++)t>1&&(i+="\n\telse "),t<r-1&&(i+=`if (vTextureId < ${t}.5)`),i+="\n\t{",i+=`\n\t\tcolor = texture2D(uTexture[${t}], vTextureCoord);`,i+="\n\t}";t=(t=t.replace(/%count%/gi,""+r)).replace(/%forloop%/gi,i),super.createShaders(t,e)}bind(t,e){if(!this.program)return!1;const r=this.renderer,i=r.gl,s=this.uniforms;return i.useProgram(this.program),i.uniformMatrix4fv(s.uProjectionMatrix,!1,t),i.uniformMatrix4fv(s.uCameraMatrix,!1,e),i.uniform1iv(s.uTexture,r.textures.textureIndex),i.uniform1f(s.uTime,performance.now()),i.uniform2f(s.uResolution,r.width,r.height),this.bindBuffers(this.buffer.indexBuffer,this.buffer.vertexBuffer),!0}}class Y{constructor(t,e){this.renderer=t;const r={shader:new e};this.stack=[r],this.currentEntry=r,this.current=r.shader,this.singleQuadShader=new G}add(t,e){const r={shader:t,textureID:e};return this.stack.push(r),r}set(t,e){this.flush();const r=this.renderer,i=r.projectionMatrix,s=r.currentCamera.matrix,n=t.bind(i,s,e);if(n){const r=this.add(t,e);this.currentEntry=r,this.current=t}return n}setDefault(t){this.set(this.singleQuadShader,t)}pop(){this.flush();const t=this.stack;t.length>1&&t.pop(),this.currentEntry=t[t.length-1],this.current=this.currentEntry.shader}reset(){this.pop(),this.rebind()}flush(){return!!this.current.flush()&&(this.renderer.flushTotal++,!0)}rebind(){const t=this.renderer,e=t.projectionMatrix,r=t.currentCamera.matrix,i=this.currentEntry;i.shader.bind(e,r,i.textureID)}popAndRebind(){this.pop(),this.rebind()}clear(){}destroy(){}}const W=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join("\n");function V(t){let e="";for(let r=0;r<t;++r)r>0&&(e+="\nelse "),r<t-1&&(e+=`if(test == ${r}.0){}`);return e}class H{constructor(t){this.startActiveTexture=0,this.renderer=t,this.tempTextures=[],this.textureIndex=[]}init(){const t=this.renderer.gl;let e=function(t,e){const r=e.createShader(e.FRAGMENT_SHADER);for(;;){const i=W.replace(/%forloop%/gi,V(t));if(e.shaderSource(r,i),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))break;t=t/2|0}return t}(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),t);const r=v();0===r||r>0&&r>e?E=e:r>0&&r<e&&(e=Math.max(8,r));const i=this.tempTextures;i.length&&i.forEach(e=>{t.deleteTexture(e)});const s=[];for(let r=0;r<e;r++){const e=t.createTexture();t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,255,255])),i[r]=e,s.push(r)}this.maxTextures=e,this.textureIndex=s,this.currentActiveTexture=1}update(){const t=g();for(let e=0;e<t.length;e++){const r=t[e];r.binding||(r.binding=new L(r))}y()}reset(){const t=this.renderer.gl,e=this.tempTextures;for(let r=0;r<e.length;r++)t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,e[r]);this.currentActiveTexture=1,this.startActiveTexture++}bind(t,e=0){const r=this.renderer.gl,i=t.binding;i.setIndex(e),r.activeTexture(r.TEXTURE0+e),r.bindTexture(r.TEXTURE_2D,i.texture)}unbind(t=0){const e=this.renderer.gl;e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,this.tempTextures[t]),t>0&&this.startActiveTexture++}request(t){const e=this.renderer.gl,r=t.binding,i=this.currentActiveTexture;return!(r.indexCounter>=this.startActiveTexture)&&(r.indexCounter=this.startActiveTexture,i<this.maxTextures?(r.setIndex(i),e.activeTexture(e.TEXTURE0+i),e.bindTexture(e.TEXTURE_2D,r.texture),this.currentActiveTexture++):(this.renderer.flush(),this.startActiveTexture++,r.indexCounter=this.startActiveTexture,r.setIndex(1),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,r.texture),this.currentActiveTexture=2),!0)}}class j{constructor(){this.clearColor=[0,0,0,1],this.flushTotal=0,this.clearBeforeRender=!0,this.optimizeRedraw=!1,this.autoResize=!0,this.contextLost=!1,this.currentCamera=null,this.width=l(),this.height=f(),this.resolution=x(),this.setBackgroundColor(a);const t=document.createElement("canvas");t.addEventListener("webglcontextlost",t=>this.onContextLost(t),!1),t.addEventListener("webglcontextrestored",()=>this.onContextRestored(),!1),this.canvas=t,this.fbo=new F(this),this.textures=new H(this),this.initContext(),N(this),this.shaders=new Y(this,O)}initContext(){const t=this.canvas.getContext("webgl",A);D(t),this.gl=t,t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),this.resize(this.width,this.height,this.resolution),this.textures.init()}resize(t,e,r=1){this.width=t*r,this.height=e*r,this.resolution=r;const i=this.canvas;i.width=this.width,i.height=this.height,this.autoResize&&(i.style.width=(this.width/r).toString()+"px",i.style.height=(this.height/r).toString()+"px"),this.gl.viewport(0,0,this.width,this.height),this.projectionMatrix=function(t,e,r=-1,i=1){return new Float32Array([1/-t*-2,0,0,0,0,1/e*-2,0,0,0,0,1/(r-i)*2,0,-1,1,0,1])}(t,e)}onContextLost(t){t.preventDefault(),this.contextLost=!0}onContextRestored(){this.contextLost=!1,this.initContext()}setBackgroundColor(t){return function(t,e=[]){const r=t>>16&255,i=t>>8&255,s=255&t,n=t>16777215?t>>>24:255;e[0]=r/255,e[1]=i/255,e[2]=s/255,e[3]=n/255}(t,this.clearColor),this}reset(t=null,e=this.width,r=this.height){const i=this.gl;i.bindFramebuffer(i.FRAMEBUFFER,t),i.viewport(0,0,e,r),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),this.flushTotal=0,this.currentCamera=null,this.textures.update()}render(t){if(this.contextLost)return;if(this.reset(),this.optimizeRedraw&&0===t.numDirtyFrames&&0===t.numDirtyCameras)return;const e=this.gl;if(this.clearBeforeRender){const t=this.clearColor;e.clearColor(t[0],t[1],t[2],t[3]),e.clear(e.COLOR_BUFFER_BIT)}const r=t.worldData;for(let t=0;t<r.length;t++){const{camera:e,renderList:n}=r[t];this.currentCamera&&(i=e.worldTransform,s=this.currentCamera.worldTransform,i.a===s.a&&i.b===s.b&&i.c===s.c&&i.d===s.d&&i.tx===s.tx&&i.ty===s.ty)||(this.flush(),this.currentCamera=e,this.shaders.rebind()),n.forEach(t=>{t.children.length?this.renderNode(t):t.node.renderGL(this)})}var i,s;this.flush()}renderNode(t){t.node.renderGL(this),t.children.forEach(t=>{t.children.length>0?this.renderNode(t):t.node.renderGL(this)}),t.node.postRenderGL(this)}flush(){this.shaders.flush()}destroy(){N(void 0)}}class q{constructor(t=1,e=0,r=0,i=1,s=0,n=0){this.set(t,e,r,i,s,n)}set(t=1,e=0,r=0,i=1,s=0,n=0){return this.a=t,this.b=e,this.c=r,this.d=i,this.tx=s,this.ty=n,this}identity(){return this.set()}toArray(){return[this.a,this.b,this.c,this.d,this.tx,this.ty]}fromArray(t){return this.set(t[0],t[1],t[2],t[3],t[4],t[5])}}class ${constructor(t=0,e=0,r=0,i=0){this.set(t,e,r,i)}set(t=0,e=0,r=0,i=0){return this.x=t,this.y=e,this.width=r,this.height=i,this}contains(t,e){return function(t,e,r){return!(t.width<=0||t.height<=0)&&(t.x<=e&&t.x+t.width>=e&&t.y<=r&&t.y+t.height>=r)}(this,t,e)}set right(t){t<=this.x?this.width=0:this.width=t-this.x}get right(){return this.x+this.width}set bottom(t){t<=this.y?this.height=0:this.height=t-this.y}get bottom(){return this.y+this.height}}function Q(){}class K{constructor(t,e=0,r=0,i=!1){this.compareValue=!1,this._x=e,this._y=r,this.callback=t,this.compareValue=i}set(t=0,e=0){return this._x=t,this._y=e,this.callback(this),this}destroy(){this.callback=Q}set x(t){(!this.compareValue||this.compareValue&&t!==this._x)&&(this._x=t,this.callback(this))}get x(){return this._x}set y(t){(!this.compareValue||this.compareValue&&t!==this._x)&&(this._y=t,this.callback(this))}get y(){return this._y}}class J{constructor(){this.type="StaticCamera",this.dirtyRender=!0;const t=i();this.renderer=t.renderer,this.matrix=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.bounds=new $,this.worldTransform=new q,this.reset()}reset(){const t=this.renderer.width,e=this.renderer.height;this.width=t,this.height=e,this.bounds.set(0,0,t,e)}destroy(){this.world=null,this.worldTransform=null,this.renderer=null,this.matrix=null,this.bounds=null}}function Z(t,e){const r=function(t,e){return t.children.indexOf(e)}(t,e);return r>-1&&function(t,e){const r=t.children;let i;if(e>=0&&e<r.length){const t=r.splice(e,1);t[0]&&(i=t[0],i.parent=null)}}(t,r),e}function tt(t,e,...r){if(0===t.events.size||!t.events.has(e))return!1;const i=t.events.get(e);for(const t of i)t.callback.apply(t.context,r),t.once&&i.delete(t);return 0===i.size&&t.events.delete(e),!0}function et(t,...e){e.forEach(e=>{e.parent&&Z(e.parent,e),e.parent=t});const r=t.world;return r&&function(t,...e){e.forEach(e=>{e.world&&(tt(e.world,"removedfromworld",e,e.world),tt(e,"removedfromworld",e,e.world)),e.world=t,tt(t,"addedtoworld",e,t),tt(e,"addedtoworld",e,t)})}(r,...function(t){const e=[t],r=[];for(;e.length>0;){const t=e.shift();r.push(t);const i=t.numChildren;if(i>0)for(let r=i-1;r>=0;r--)e.unshift(t.children[r])}return r.shift(),r}(t)),e}function rt(t,e){return t.children.push(e),et(t,e),e.transform.updateWorld(),e}const it=1,st=4,nt=16,ht=32,ot=64,at=256,ut=51;function ct(t,e=0,r){const i=t.children;void 0===r&&(r=i.length);const s=r-e;if(s>0&&s<=r){const t=i.splice(e,s);return t.forEach(t=>{t.parent=null}),t}return[]}class dt{constructor(t,e,r=!1){this.callback=t,this.context=e,this.once=r}}function lt(t,e,r,i,s){const n=t.events,h=n.get(e);if(r)if(r instanceof dt)h.delete(r);else{const t=!i,e=void 0!==s;for(const n of h)n.callback===r&&t&&n.context===i&&e&&n.once===s&&h.delete(n)}else n.delete(e);return 0===h.size&&n.delete(e),t}function ft(t,e,r,i=t,s=!1){if("function"!=typeof r)throw new TypeError("Listener not a function");const n=new dt(r,i,s),h=t.events.get(e);return h?h.add(n):t.events.set(e,new Set([n])),n}function xt(t,e,r,i=t){return ft(t,e,r,i,!0)}let mt;const pt=()=>mt,gt=t=>{mt=t};class yt{constructor(){this.scenes=new Map,this.sceneIndex=0,this.flush=!1,this.renderResult={gameFrame:0,numTotalFrames:0,numDirtyFrames:0,numDirtyCameras:0,worldData:[]},this.game=i(),gt(this),xt(this.game,"boot",()=>this.boot())}boot(){S.forEach(t=>new t)}update(t,e){for(const r of this.scenes.values())tt(r,"update",t,e)}render(t){const e=this.renderResult;!function(t,e=0){t.gameFrame=e,t.numTotalFrames=0,t.numDirtyFrames=0,t.numDirtyCameras=0,t.worldData.length=0}(e,t);for(const t of this.scenes.values())tt(t,"render",e);return this.flush&&(e.numDirtyFrames++,this.flush=!1),e}}function Tt(t,e){const r=document.createElement("canvas");return r.width=t,r.height=e,r.getContext("2d")}let wt;const Et=()=>wt,vt=t=>{wt=t};class bt{constructor(){this.textures=new Map,this.createDefaultTextures(),vt(this)}createDefaultTextures(){this.add("__BLANK",new z(Tt(32,32).canvas));const t=Tt(32,32);t.strokeStyle="#0f0",t.moveTo(0,0),t.lineTo(32,32),t.stroke(),t.strokeRect(.5,.5,31,31),this.add("__MISSING",new z(t.canvas))}get(t){const e=this.textures;return e.has(t)?e.get(t):e.get("__MISSING")}has(t){return this.textures.has(t)}add(t,e){let r;const i=this.textures;return i.has(t)||(r=e instanceof z?e:new z(e),r.key=t,i.set(t,r)),r}}function Rt(t){const{a:e,b:r,c:i,d:s,tx:n,ty:h}=t.world,{x:o,y:a,right:u,bottom:c}=t.extent;return{x0:o*e+a*i+n,y0:o*r+a*s+h,x1:o*e+c*i+n,y1:o*r+c*s+h,x2:u*e+c*i+n,y2:u*r+c*s+h,x3:u*e+a*i+n,y3:u*r+a*s+h}}class St{constructor(t){this.fixed=!1,this.includeChildren=!0,this.visibleOnly=!0,this.entity=t,this.area=new $}set(t,e,r,i){this.area.set(t,e,r,i)}get(){return this.entity.isDirty(ht)&&!this.fixed&&this.update(),this.area}updateLocal(){const{x0:t,y0:e,x1:r,y1:i,x2:s,y2:n,x3:h,y3:o}=Rt(this.entity.transform),a=Math.min(t,r,s,h),u=Math.min(e,i,n,o),c=Math.max(t,r,s,h),d=Math.max(e,i,n,o);return this.area.set(a,u,c-a,d-u)}update(){const t=this.updateLocal();if(this.entity.clearDirty(ht),!this.includeChildren||!this.entity.numChildren)return t;const e=this.visibleOnly,r=this.entity.children;let i=t.x,s=t.y,n=t.right,h=t.bottom;for(let t=0;t<r.length;t++){const o=r[t];if(!o||e&&!o.visible)continue;const a=o.bounds.get();a.x<i&&(i=a.x),a.y<s&&(s=a.y),a.right>n&&(n=a.right),a.bottom>h&&(h=a.bottom)}return t.set(i,s,n-i,h-s)}destroy(){this.entity=null,this.area=null}}class _t{constructor(t){this.enabled=!1,this.enabledChildren=!0,this.entity=t}destroy(){this.entity=null,this.hitArea=null}}class At{constructor(t=0,e=0){this.set(t,e)}set(t=0,e=0){return this.x=t,this.y=e,this}getArray(){return[this.x,this.y]}fromArray(t){return this.set(t[0],t[1])}toString(){return`[x=${this.x}, y=${this.y}]`}}function Ft(t,e){return e.set(t.a,t.b,t.c,t.d,t.tx,t.ty)}class Ct{constructor(t,e=0,r=0){this.passthru=!1,this._rotation=0,this.entity=t,this.local=new q,this.world=new q,this.position=new K(()=>this.update(),e,r),this.scale=new K(()=>this.update(),1,1,!0),this.skew=new K(()=>this.update(),0,0,!0),this.origin=new K(()=>this.updateExtent(),.5,.5),this.extent=new $}update(){this.updateLocal(),this.updateWorld()}updateLocal(){this.entity.setDirty(it,ht),function(t){const e=t.local,r=t.position.x,i=t.position.y,s=t.rotation,n=t.scale.x,h=t.scale.y,o=t.skew.x,a=t.skew.y;e.set(Math.cos(s+a)*n,Math.sin(s+a)*n,-Math.sin(s-o)*h,Math.cos(s-o)*h,r,i)}(this)}updateWorld(){const t=this.entity;t.setDirty(it,ht),function(t){const e=t.parent,r=t.transform,i=r.local,s=r.world;if(e)if(r.passthru)Ft(e.transform.world,s);else{const{a:t,b:r,c:n,d:h,tx:o,ty:a}=i,{a:u,b:c,c:d,d:l,tx:f,ty:x}=e.transform.world;s.set(t*u+r*d,t*c+r*l,n*u+h*d,n*c+h*l,o*u+a*d+f,o*c+a*l+x)}else Ft(i,s)}(t),t.numChildren&&this.updateChildren()}updateChildren(){const t=this.entity.children;for(let e=0;e<t.length;e++){t[e].transform.updateWorld()}}globalToLocal(t,e,r=new At){const{a:i,b:s,c:n,d:h,tx:o,ty:a}=this.world,u=1/(i*h+n*-s);return r.x=h*u*t+-n*u*e+(a*n-o*h)*u,r.y=i*u*e+-s*u*t+(-a*i+o*s)*u,r}localToGlobal(t,e,r=new At){const{a:i,b:s,c:n,d:h,tx:o,ty:a}=this.world;return r.x=i*t+n*e+o,r.y=s*t+h*e+a,r}setExtent(t,e,r,i){this.extent.set(t,e,r,i),this.entity.setDirty(it,ht)}updateExtent(t,e){const r=this.extent,i=this.entity;void 0!==t&&(r.width=t),void 0!==e&&(r.height=e),r.x=-this.origin.x*r.width,r.y=-this.origin.y*r.height,i.setDirty(it,ht)}set rotation(t){t!==this._rotation&&(this._rotation=t,this.update())}get rotation(){return this._rotation}destroy(){this.position.destroy(),this.scale.destroy(),this.skew.destroy(),this.origin.destroy(),this.entity=null,this.local=null,this.world=null,this.position=null,this.scale=null,this.skew=null,this.origin=null,this.extent=null}}class Dt{constructor(t=0,e=0){this.type="GameObject",this.name="",this.willUpdate=!0,this.willUpdateChildren=!0,this.willRender=!0,this.willRenderChildren=!0,this.willCacheChildren=!1,this.dirty=0,this.dirtyFrame=0,this.visible=!0,this.children=[],this.events=new Map,this.transform=new Ct(this,t,e),this.bounds=new St(this),this.input=new _t(this),this.dirty=ut,this.transform.update()}isRenderable(){return this.visible&&this.willRender}isDirty(t){return 0!=(this.dirty&t)}clearDirty(t){return this.isDirty(t)&&(this.dirty^=t),this}setDirty(t,e){return this.isDirty(t)||(this.dirty^=t,this.dirtyFrame=n()),this.isDirty(e)||(this.dirty^=e),this}update(t,e){if(this.willUpdateChildren){const r=this.children;for(let i=0;i<r.length;i++){const s=r[i];s&&s.willUpdate&&s.update(t,e)}}this.postUpdate(t,e)}postUpdate(t,e){}renderGL(t){}renderCanvas(t){}postRenderGL(t){}postRenderCanvas(t){}get numChildren(){return this.children.length}destroy(t){t?function(t,e,r=0,i){const s=ct(t,r,i);et(e,...s),s.forEach(t=>{t.transform.updateWorld()})}(this,t):function(t,e=0,r){ct(t,e,r).forEach(t=>{t.destroy()})}(this),tt(this,"destroy",this),this.transform.destroy(),this.bounds.destroy(),this.input.destroy(),this.events.clear(),this.world=null,this.parent=null,this.children=null}}class Ut extends Dt{constructor(t=0,e=0){super(t,e),this._alpha=1,this.type="Container"}setSize(t,e=t){return this.transform.updateExtent(t,e),this}setPosition(t,e){return this.transform.position.set(t,e),this}setOrigin(t,e=t){return this.transform.origin.set(t,e),this}setSkew(t,e=t){return this.transform.skew.set(t,e),this}setScale(t,e=t){return this.transform.scale.set(t,e),this}setRotation(t){return this.transform.rotation=t,this}set width(t){this.transform.updateExtent(t)}get width(){return this.transform.extent.width}set height(t){this.transform.updateExtent(void 0,t)}get height(){return this.transform.extent.height}set x(t){this.transform.position.x=t}get x(){return this.transform.position.x}set y(t){this.transform.position.y=t}get y(){return this.transform.position.y}set originX(t){this.transform.origin.x=t}get originX(){return this.transform.origin.x}set originY(t){this.transform.origin.y=t}get originY(){return this.transform.origin.y}set skewX(t){this.transform.skew.x=t}get skewX(){return this.transform.skew.x}set skewY(t){this.transform.skew.y=t}get skewY(){return this.transform.skew.y}set scaleX(t){this.transform.scale.x=t}get scaleX(){return this.transform.scale.x}set scaleY(t){this.transform.scale.y=t}get scaleY(){return this.transform.scale.y}set rotation(t){this.transform.rotation=t}get rotation(){return this.transform.rotation}get alpha(){return this._alpha}set alpha(t){t!==this._alpha&&(this._alpha=t,this.setDirty(it))}}function Bt(t,e){return((255&(255*e|0))<<24|t)>>>0}function Lt(t,e,...r){const i=t.getFrame(e),{u0:s,u1:n,v0:h,v1:o,pivot:a}=i;return r.forEach(t=>{if(!t||i===t.frame)return;t.frame=i,a&&t.setOrigin(a.x,a.y),t.frame.setExtent(t),t.hasTexture=!0;const e=t.vertexData;e[2]=s,e[3]=h,e[8]=s,e[9]=o,e[14]=n,e[15]=o,e[20]=n,e[21]=h}),r}class Mt extends Ut{constructor(t,e,r,i){super(t,e),this.hasTexture=!1,this._tint=16777215,this.type="Sprite",this.vertexData=new Float32Array(24).fill(0),this.vertexColor=new Uint32Array(4).fill(4294967295),this.vertexAlpha=new Float32Array(4).fill(1),this.vertexTint=new Uint32Array(4).fill(16777215),this.setTexture(r,i)}setTexture(t,e){return function(t,e,...r){if(t){let i;i=t instanceof z?t:Et().get(t),i?(r.forEach(t=>{t.texture=i}),Lt(i,e,...r)):console.warn("Invalid Texture key: "+t)}else r.forEach(t=>{t.texture=null,t.frame=null,t.hasTexture=!1})}(t,e,this),this}setFrame(t){return Lt(this.texture,t,this),this}isRenderable(){return this.visible&&this.willRender&&this.hasTexture&&this.alpha>0}preRender(){this.isDirty(nt)&&(!function(t){const e=t.vertexAlpha,r=t.vertexTint,i=t.vertexColor;i[0]=Bt(r[0],e[0]),i[1]=Bt(r[1],e[1]),i[2]=Bt(r[2],e[2]),i[3]=Bt(r[3],e[3])}(this),this.clearDirty(nt)),this.isDirty(it)&&(!function(t){const e=t.vertexData,{x0:r,y0:i,x1:s,y1:n,x2:h,y2:o,x3:a,y3:u}=Rt(t.transform);e[0]=r,e[1]=i,e[6]=s,e[7]=n,e[12]=h,e[13]=o,e[18]=a,e[19]=u}(this),this.clearDirty(it))}renderGL(t){this.preRender(),function(t,e){const r=t.texture,i=e.shaders.current,s=i.buffer,n=r.binding;i.count===s.batchSize&&e.flush();const h=t.vertexData;e.textures.request(r);const o=n.index;h[4]=o,h[10]=o,h[16]=o,h[22]=o;const a=i.count*s.quadElementSize;s.vertexViewF32.set(h,a);const u=t.vertexColor,c=s.vertexViewU32;c[a+5]=u[0],c[a+11]=u[2],c[a+17]=u[3],c[a+23]=u[1],i.count++}(this,t)}renderCanvas(t){this.preRender(),function(t,e){const r=t.frame;if(!r)return;const i=e.ctx,s=t.transform,{a:n,b:h,c:o,d:a,tx:u,ty:c}=s.world,{x:d,y:l}=s.extent;i.save(),i.setTransform(n,h,o,a,u,c),i.globalAlpha=t.alpha,i.drawImage(r.texture.image,r.x,r.y,r.width,r.height,d,l,r.width,r.height),i.restore()}(this,t)}get alpha(){return this._alpha}set alpha(t){if(t!==this._alpha){this._alpha=t;const e=this.vertexAlpha;e[0]=t,e[1]=t,e[2]=t,e[3]=t,this.setDirty(at)}}get tint(){return this._tint}set tint(t){if(t!==this._tint){this._tint=t;const e=this.vertexTint;e[0]=t,e[1]=t,e[2]=t,e[3]=t,this.setDirty(nt)}}destroy(t){super.destroy(t),this.texture=null,this.frame=null,this.hasTexture=!1,this.vertexData=null,this.vertexColor=null,this.vertexAlpha=null,this.vertexTint=null}}function It(t=32,e=32){const r=Tt(t,e);return new z(r.canvas)}function zt(t,e){t.forEach(t=>{e||function(t){if(t.node.isDirty(st))return!0;const e=[t];for(;e.length>0;){const t=e.pop();if(t.node.isDirty(it))return!0;const r=t.children.length;if(r>0)for(let i=0;i<r;i++)e.push(t.children[i])}return e.length=0,!1}(t)?t.node.setDirty(st):t.children.length=0})}function kt(t){const e=[],r=function t(e,r,i=[]){for(let s=0;s<r.numChildren;s++){const n=r.children[s];if(n.isRenderable()){const r=[],s={node:n,children:r};i.push(s),n.willRenderChildren&&n.numChildren>0&&(n.willCacheChildren&&e.push(s),t(e,n,r))}}return i}(e,t,[]),i=t.renderData;e.length>0&&zt(e,t.camera.dirtyRender),r.forEach(t=>{t.children.length?function t(e,r){r.numRendered++,r.numRenderable++,e.node.dirtyFrame>=r.gameFrame&&r.dirtyFrame++,e.children.forEach(e=>{e.children.length>0&&t(e,r)})}(t,i):(i.numRendered++,i.numRenderable++,t.node.dirtyFrame>=i.gameFrame&&i.dirtyFrame++)}),i.renderList=r,t.forceRefresh&&(i.dirtyFrame++,t.forceRefresh=!1)}function Pt(t,e){t.gameFrame=e,t.dirtyFrame=0,t.numRendered=0,t.numRenderable=0,t.renderList.length=0}class Nt extends Dt{constructor(t){super(),this.forceRefresh=!1,this.type="BaseWorld",this.scene=t,this.world=this,this.events=new Map,this._updateListener=ft(t,"update",(t,e)=>this.update(t,e)),this._renderListener=ft(t,"render",t=>this.render(t)),this._shutdownListener=ft(t,"shutdown",()=>this.shutdown()),xt(t,"destroy",()=>this.destroy())}update(t,e){this.willUpdate&&(tt(this,"update",t,e,this),super.update(t,e))}postUpdate(t,e){tt(this,"postupdate",t,e,this)}render(t){const e=this.renderData;Pt(e,t.gameFrame),this.willRender&&this.visible&&(kt(this),tt(this,"worldrender",e,this),function(t,e){t.numDirtyFrames+=e.dirtyFrame,t.numTotalFrames+=e.numRendered,e.camera.dirtyRender&&t.numDirtyCameras++,t.worldData.push(e)}(t,e),this.camera&&(this.camera.dirtyRender=!1))}shutdown(){const t=this.scene;lt(t,"update",this._updateListener),lt(t,"render",this._renderListener),lt(t,"shutdown",this._shutdownListener),function(t,...e){e.forEach(e=>{Z(t,e)})}(this),tt(this,"worldshutdown",this),Pt(this.renderData,0),this.camera&&this.camera.reset()}destroy(t){super.destroy(t),tt(this,"destroy",this),Pt(this.renderData,0),this.camera&&this.camera.destroy(),this.events.clear(),this.camera=null,this.renderData=null,this.events=null}}class Xt extends Nt{constructor(t){super(t),this.type="StaticWorld",this.camera=new J,this.renderData={camera:this.camera,gameFrame:0,dirtyFrame:0,numRendered:0,numRenderable:0,renderList:[]}}}function Gt(t,e={}){const r=pt(),i=r.scenes.size,s=r.sceneIndex,n=0===i;"string"==typeof e?t.key=e:(e||!e&&n)&&(t.key=function(t,e,r){return Object.prototype.hasOwnProperty.call(t,e)?t[e]:r}(e,"key","scene"+s.toString())),r.scenes.has(t.key)?console.warn("Scene key already in use: "+t.key):(r.scenes.set(t.key,t),r.flush=!0,r.sceneIndex++)}let Ot=function(t){t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.updateTexture()};class Yt extends Mt{constructor(t=0,e=0,r=32,s=32){super(t,e,It()),this.type="rexCanvas";const n=i();this.resolution=n.renderer.resolution,this.canvas=this.texture.image,this.context=this.canvas.getContext("2d"),this.resize(r,s)}updateTexture(){return this.texture.binding&&this.texture.binding.update(),this.setDirty(ot),this}destroy(t){this.texture.destroy(),this.canvas=null,this.context=null,super.destroy(t)}resize(t,e){return function(t,e,r){let i=Math.ceil(e*t.resolution),s=Math.ceil(r*t.resolution),n=t.canvas;n.width!==i&&n.height!==s?(n.width=i,n.height=s,t.texture.setSize(e,r),t.setSize(e,r),t.updateTexture()):Ot(t)}(this,t,e),this}clear(){return Ot(this),this}}var Wt;!function(t){t[t.right=0]="right",t[t.down=1]="down",t[t.left=2]="left",t[t.up=3]="up"}(Wt||(Wt={}));let Vt=function(t,e,r=0,i=0,s=t.width,n=t.height){let h=t.resolution,o=t.canvas,a=Math.ceil(s*h),u=Math.ceil(n*h);!function(t,e,r,i=1){let s;if("string"==typeof t){let e=Et();e.has(t)||e.add(t,It()),s=e.get(t)}else s=t;let n=s.image,h=n.getContext("2d");r?e.call(r,n,h):e(n,h),s.setSize(n.width/i,n.height/i),s.binding&&s.binding.update()}(e,(function(t,e){t.width!==a&&(t.width=a),t.height!==u&&(t.height=u),e.clearRect(0,0,a,u),e.drawImage(o,r,i,a,u)}),void 0,t.resolution)};var Ht,jt;new class extends class{constructor(){this.events=new Map}}{constructor(...t){super(),this.VERSION="4.0.0-beta1",this.isBooted=!1,this.isPaused=!1,this.willUpdate=!0,this.willRender=!0,this.lastTick=0,this.elapsed=0,this.frame=0,s(this),function(t){const e=document.readyState;if("complete"===e||"interactive"===e)return void t();const r=()=>{document.removeEventListener("deviceready",r,!0),document.removeEventListener("DOMContentLoaded",r,!0),window.removeEventListener("load",r,!0),t()};document.body?window.hasOwnProperty("cordova")?document.addEventListener("deviceready",r,!0):(document.addEventListener("DOMContentLoaded",r,!0),window.addEventListener("load",r,!0)):window.setTimeout(r,20)}(()=>this.boot(t))}boot(t){t.forEach(t=>t());const e=T;this.renderer=new e,this.textureManager=new bt,this.sceneManager=new yt;const r=R();r&&function(t,e){b(e).appendChild(t)}(this.renderer.canvas,r),this.isBooted=!0,function(){{const t=" v"+i().VERSION;console.log(`%cPhaser${t}%c https://phaser4.io`,"padding: 4px 16px; color: #fff; background: linear-gradient(#3e0081 40%, #00bcc3)","")}}(),tt(this,"boot"),this.lastTick=performance.now(),this.step(this.lastTick)}pause(){this.isPaused=!0}resume(){this.isPaused=!1,this.lastTick=performance.now()}step(t){const e=t-this.lastTick;this.lastTick=t,this.elapsed+=e,this.isPaused||(this.willUpdate&&(this.sceneManager.update(e,t),tt(this,"update",e,t)),this.willRender&&this.renderer.render(this.sceneManager.render(this.frame))),this.frame++,h(this.frame),o(this.elapsed),requestAnimationFrame(t=>this.step(t))}destroy(){}}(()=>{T=j},function(t=800,e=600,r=1){return 0===r&&(r=window.devicePixelRatio),()=>{u=t,c=e,d=r}}(800,600),(jt="game",()=>{jt&&(w=b(jt))}),function(t=0){return()=>{a=t}}(2960685),(Ht=class extends class{constructor(t){this.game=i(),this.events=new Map,Gt(this,t)}}{constructor(){super();const t=new Xt(this),e=new Yt(400,300,200,100);rt(t,e);const r=e.context.createLinearGradient(0,50,200,50);r.addColorStop(0,"blue"),r.addColorStop(1,"red"),function(t,e="#fff"){let r=t.context;r.fillStyle=e,r.fillRect(0,0,t.canvas.width,t.canvas.height),t.updateTexture()}(e,r),Vt(e,"rect");const i=new Mt(0,0,"rect");i.setOrigin(0),rt(t,i)}},()=>{S=[].concat(Ht)}))}();
//# sourceMappingURL=bundle.js.map
