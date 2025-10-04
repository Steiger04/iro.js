/*!
 * iro.js v5.5.2
 * 2016-2021 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.iro = factory());
}(this, (function () { 'use strict';

  var n,l,u,i,r,o,e,f,c,s,a,h,p={},v=[],y=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,w=Array.isArray;function d(n,l){for(var u in l){ n[u]=l[u]; }return n}function g(n){n&&n.parentNode&&n.parentNode.removeChild(n);}function _(l,u,t){var i,r,o,e={};for(o in u){ "key"==o?i=u[o]:"ref"==o?r=u[o]:e[o]=u[o]; }if(arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps){ for(o in l.defaultProps){ void 0===e[o]&&(e[o]=l.defaultProps[o]); } }return m(l,e,i,r,null)}function m(n,t,i,r,o){var e={type:n,props:t,key:i,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==o?++u:o,__i:-1,__u:0};return null==o&&null!=l.vnode&&l.vnode(e),e}function k(n){return n.children}function x(n,l){this.props=n,this.context=l;}function S(n,l){if(null==l){ return n.__?S(n.__,n.__i+1):null; }for(var u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?S(n):null}function C(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return C(n)}}function M(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!$.__r++||r!=l.debounceRendering)&&((r=l.debounceRendering)||o)($);}function $(){for(var n,u,t,r,o,f,c,s=1;i.length;){ i.length>s&&i.sort(e),n=i.shift(),s=i.length,n.__d&&(t=void 0,r=void 0,o=(r=(u=n).__v).__e,f=[],c=[],u.__P&&((t=d({},r)).__v=r.__v+1,l.vnode&&l.vnode(t),O(u.__P,t,r,u.__n,u.__P.namespaceURI,32&r.__u?[o]:null,f,null==o?S(r):o,!!(32&r.__u),c),t.__v=r.__v,t.__.__k[t.__i]=t,N(f,t,c),r.__e=r.__=null,t.__e!=o&&C(t))); }$.__r=0;}function I(n,l,u,t,i,r,o,e,f,c,s){var a,h,y,w,d,g,_,m=t&&t.__k||v,b=l.length;for(f=P(u,l,m,f,b),a=0;a<b;a++){ null!=(y=u.__k[a])&&(h=-1==y.__i?p:m[y.__i]||p,y.__i=a,g=O(n,y,h,i,r,o,e,f,c,s),w=y.__e,y.ref&&h.ref!=y.ref&&(h.ref&&B(h.ref,null,y),s.push(y.ref,y.__c||w,y)),null==d&&null!=w&&(d=w),(_=!!(4&y.__u))||h.__k===y.__k?f=A(y,f,n,_):"function"==typeof y.type&&void 0!==g?f=g:w&&(f=w.nextSibling),y.__u&=-7); }return u.__e=d,f}function P(n,l,u,t,i){var r,o,e,f,c,s=u.length,a=s,h=0;for(n.__k=new Array(i),r=0;r<i;r++){ null!=(o=l[r])&&"boolean"!=typeof o&&"function"!=typeof o?(f=r+h,(o=n.__k[r]="string"==typeof o||"number"==typeof o||"bigint"==typeof o||o.constructor==String?m(null,o,null,null,null):w(o)?m(k,{children:o},null,null,null):null==o.constructor&&o.__b>0?m(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,e=null,-1!=(c=o.__i=L(o,u,f,a))&&(a--,(e=u[c])&&(e.__u|=2)),null==e||null==e.__v?(-1==c&&(i>s?h--:i<s&&h++),"function"!=typeof o.type&&(o.__u|=4)):c!=f&&(c==f-1?h--:c==f+1?h++:(c>f?h--:h++,o.__u|=4))):n.__k[r]=null; }if(a){ for(r=0;r<s;r++){ null!=(e=u[r])&&0==(2&e.__u)&&(e.__e==t&&(t=S(e)),D(e,e)); } }return t}function A(n,l,u,t){var i,r;if("function"==typeof n.type){for(i=n.__k,r=0;i&&r<i.length;r++){ i[r]&&(i[r].__=n,l=A(i[r],l,u,t)); }return l}n.__e!=l&&(t&&(l&&n.type&&!l.parentNode&&(l=S(n)),u.insertBefore(n.__e,l||null)),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8==l.nodeType);return l}function L(n,l,u,t){var i,r,o,e=n.key,f=n.type,c=l[u],s=null!=c&&0==(2&c.__u);if(null===c&&null==n.key||s&&e==c.key&&f==c.type){ return u; }if(t>(s?1:0)){ for(i=u-1,r=u+1;i>=0||r<l.length;){ if(null!=(c=l[o=i>=0?i--:r++])&&0==(2&c.__u)&&e==c.key&&f==c.type){ return o; } } }return -1}function T(n,l,u){"-"==l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||y.test(l)?u:u+"px";}function j(n,l,u,t,i){var r,o;n:if("style"==l){ if("string"==typeof u){ n.style.cssText=u; }else {if("string"==typeof t&&(n.style.cssText=t=""),t){ for(l in t){ u&&l in u||T(n.style,l,""); } }if(u){ for(l in u){ t&&u[l]==t[l]||T(n.style,l,u[l]); } }} }else if("o"==l[0]&&"n"==l[1]){ r=l!=(l=l.replace(f,"$1")),o=l.toLowerCase(),l=o in n||"onFocusOut"==l||"onFocusIn"==l?o.slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t?u.u=t.u:(u.u=c,n.addEventListener(l,r?a:s,r)):n.removeEventListener(l,r?a:s,r); }else {if("http://www.w3.org/2000/svg"==i){ l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s"); }else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n){ try{n[l]=null==u?"":u;break n}catch(n$1){} }"function"==typeof u||(null==u||!1===u&&"-"!=l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u));}}function F(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t){ u.t=c++; }else if(u.t<t.u){ return; }return t(l.event?l.event(u):u)}}}function O(n,u,t,i,r,o,e,f,c,s){var a,h,p,v,y,_,m,b,S,C,M,$,P,A,H,L,T,j=u.type;if(null!=u.constructor){ return null; }128&t.__u&&(c=!!(32&t.__u),o=[f=u.__e=t.__e]),(a=l.__b)&&a(u);n:if("function"==typeof j){ try{if(b=u.props,S="prototype"in j&&j.prototype.render,C=(a=j.contextType)&&i[a.__c],M=a?C?C.props.value:a.__:i,t.__c?m=(h=u.__c=t.__c).__=h.__E:(S?u.__c=h=new j(b,M):(u.__c=h=new x(b,M),h.constructor=j,h.render=E),C&&C.sub(h),h.props=b,h.state||(h.state={}),h.context=M,h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),S&&null==h.__s&&(h.__s=h.state),S&&null!=j.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d({},h.__s)),d(h.__s,j.getDerivedStateFromProps(b,h.__s))),v=h.props,y=h.state,h.__v=u,p){ S&&null==j.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),S&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount); }else {if(S&&null==j.getDerivedStateFromProps&&b!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(b,M),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(b,h.__s,M)||u.__v==t.__v){for(u.__v!=t.__v&&(h.props=b,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u);}),$=0;$<h._sb.length;$++){ h.__h.push(h._sb[$]); }h._sb=[],h.__h.length&&e.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(b,h.__s,M),S&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,y,_);});}if(h.context=M,h.props=b,h.__P=n,h.__e=!1,P=l.__r,A=0,S){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++){ h.__h.push(h._sb[H]); }h._sb=[];}else { do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++A<25); }h.state=h.__s,null!=h.getChildContext&&(i=d(d({},i),h.getChildContext())),S&&!p&&null!=h.getSnapshotBeforeUpdate&&(_=h.getSnapshotBeforeUpdate(v,y)),L=a,null!=a&&a.type===k&&null==a.key&&(L=V(a.props.children)),f=I(n,w(L)?L:[L],u,t,i,r,o,e,f,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&e.push(h),m&&(h.__E=h.__=null);}catch(n$1){if(u.__v=null,c||null!=o){ if(n$1.then){for(u.__u|=c?160:128;f&&8==f.nodeType&&f.nextSibling;){ f=f.nextSibling; }o[o.indexOf(f)]=null,u.__e=f;}else {for(T=o.length;T--;){ g(o[T]); }z(u);} }else { u.__e=t.__e,u.__k=t.__k,n$1.then||z(u); }l.__e(n$1,u,t);} }else { null==o&&u.__v==t.__v?(u.__k=t.__k,u.__e=t.__e):f=u.__e=q(t.__e,u,t,i,r,o,e,c,s); }return (a=l.diffed)&&a(u),128&u.__u?void 0:f}function z(n){n&&n.__c&&(n.__c.__e=!0),n&&n.__k&&n.__k.forEach(z);}function N(n,u,t){for(var i=0;i<t.length;i++){ B(t[i],t[++i],t[++i]); }l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n$1){l.__e(n$1,u.__v);}});}function V(n){return "object"!=typeof n||null==n||n.__b&&n.__b>0?n:w(n)?n.map(V):d({},n)}function q(u,t,i,r,o,e,f,c,s){var a,h,v,y,d,_,m,b=i.props,k=t.props,x=t.type;if("svg"==x?o="http://www.w3.org/2000/svg":"math"==x?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=e){ for(a=0;a<e.length;a++){ if((d=e[a])&&"setAttribute"in d==!!x&&(x?d.localName==x:3==d.nodeType)){u=d,e[a]=null;break} } }if(null==u){if(null==x){ return document.createTextNode(k); }u=document.createElementNS(o,x,k.is&&k),c&&(l.__m&&l.__m(t,e),c=!1),e=null;}if(null==x){ b===k||c&&u.data==k||(u.data=k); }else {if(e=e&&n.call(u.childNodes),b=i.props||p,!c&&null!=e){ for(b={},a=0;a<u.attributes.length;a++){ b[(d=u.attributes[a]).name]=d.value; } }for(a in b){ if(d=b[a],"children"==a);else if("dangerouslySetInnerHTML"==a){ v=d; }else if(!(a in k)){if("value"==a&&"defaultValue"in k||"checked"==a&&"defaultChecked"in k){ continue; }j(u,a,null,d,o);} }for(a in k){ d=k[a],"children"==a?y=d:"dangerouslySetInnerHTML"==a?h=d:"value"==a?_=d:"checked"==a?m=d:c&&"function"!=typeof d||b[a]===d||j(u,a,d,b[a],o); }if(h){ c||v&&(h.__html==v.__html||h.__html==u.innerHTML)||(u.innerHTML=h.__html),t.__k=[]; }else if(v&&(u.innerHTML=""),I("template"==t.type?u.content:u,w(y)?y:[y],t,i,r,"foreignObject"==x?"http://www.w3.org/1999/xhtml":o,e,f,e?e[0]:i.__k&&S(i,0),c,s),null!=e){ for(a=e.length;a--;){ g(e[a]); } }c||(a="value","progress"==x&&null==_?u.removeAttribute("value"):null!=_&&(_!==u[a]||"progress"==x&&!_||"option"==x&&_!=b[a])&&j(u,a,_,b[a],o),a="checked",null!=m&&m!=u[a]&&j(u,a,m,b[a],o));}return u}function B(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u));}else { n.current=u; }}catch(n$1){l.__e(n$1,t);}}function D(n,u,t){var i,r;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||B(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount){ try{i.componentWillUnmount();}catch(n$1){l.__e(n$1,u);} }i.base=i.__P=null;}if(i=n.__k){ for(r=0;r<i.length;r++){ i[r]&&D(i[r],u,t||"function"!=typeof n.type); } }t||g(n.__e),n.__c=n.__=n.__e=void 0;}function E(n,l,u){return this.constructor(n,u)}function G(u,t,i){var r,o,e,f;t==document&&(t=document.documentElement),l.__&&l.__(u,t),o=(r="function"==typeof i)?null:i&&i.__k||t.__k,e=[],f=[],O(t,u=(!r&&i||t).__k=_(k,null,[u]),o||p,p,t.namespaceURI,!r&&i?[i]:o?null:t.firstChild?n.call(t.childNodes):null,e,!r&&i?i:o?o.__e:t.firstChild,r,f),N(e,u,f);}n=v.slice,l={__e:function(n,l,u,t){for(var i,r,o;l=l.__;){ if((i=l.__c)&&!i.__){ try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o){ return i.__E=i }}catch(l$1){n=l$1;} } }throw n}},u=0,x.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=d({},this.state),"function"==typeof n&&(n=n(d({},u),this.props)),n&&d(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M(this));},x.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),M(this));},x.prototype.render=k,i=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,e=function(n,l){return n.__v.__b-l.__v.__b},$.__r=0,f=/(PointerCapture)$|Capture$/i,c=0,s=F(!1),a=F(!0),h=0;

  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      var arguments$1 = arguments;

      for (var e = 1; e < arguments.length; e++) {
        var t = arguments$1[e];
        for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); }
      }
      return n;
    }, _extends.apply(null, arguments);
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) { return t; }
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) { return i; }
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  /**
   * Philips Hue Gamut Support for iro-core
   *
   * This module provides functionality to convert RGB colors to CIE 1931 xy chromaticity coordinates
   * and clamp them to Philips Hue gamut triangles (A, B, C).
   *
   * Based on the official Philips Hue RGB to xy conversion algorithm.
   */
  /**
   * Philips Hue Gamut A - Older generation bulbs
   * Red, Green, Blue corner points in xy chromaticity space
   */
  var GAMUT_A = [{
    x: 0.704,
    y: 0.296
  }, {
    x: 0.2151,
    y: 0.7106
  }, {
    x: 0.138,
    y: 0.08
  }];
  /**
   * Philips Hue Gamut B - Mid-generation bulbs
   * Red, Green, Blue corner points in xy chromaticity space
   */
  var GAMUT_B = [{
    x: 0.675,
    y: 0.322
  }, {
    x: 0.409,
    y: 0.518
  }, {
    x: 0.167,
    y: 0.04
  }];
  /**
   * Philips Hue Gamut C - Latest generation bulbs (extended gamut)
   * Red, Green, Blue corner points in xy chromaticity space
   */
  var GAMUT_C = [{
    x: 0.692,
    y: 0.308
  }, {
    x: 0.17,
    y: 0.7
  }, {
    x: 0.153,
    y: 0.048
  }];
  /**
   * Maps gamut type names to their corresponding triangle definitions
   */
  var GAMUT_MAP = {
    none: null,
    A: GAMUT_A,
    B: GAMUT_B,
    C: GAMUT_C
  };
  /**
   * Applies gamma correction (linearization) to an sRGB color channel
   *
   * This function converts sRGB values to linear RGB, which is necessary
   * for accurate color space transformations.
   *
   * @param channel - Normalized RGB channel value (0-1)
   * @returns Linearized channel value
   */
  function applyGammaCorrection(channel) {
    if (channel > 0.04045) {
      return Math.pow((channel + 0.055) / 1.055, 2.4);
    } else {
      return channel / 12.92;
    }
  }
  /**
   * Applies inverse gamma correction (display encoding) to a linear RGB channel
   *
   * This function converts linear RGB values back to sRGB, which is the
   * inverse operation of applyGammaCorrection().
   *
   * @param channel - Linear RGB channel value (0-1)
   * @returns Display-encoded sRGB channel value
   */
  function applyInverseGammaCorrection(channel) {
    if (channel <= 0.0031308) {
      return channel * 12.92;
    } else {
      return 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    }
  }
  /**
   * Converts RGB color values to CIE 1931 xy chromaticity coordinates
   *
   * This implementation follows the Philips Hue official algorithm:
   * 1. Normalize RGB from [0-255] to [0-1]
   * 2. Apply gamma correction (linearization)
   * 3. Transform to CIE XYZ color space
   * 4. Convert to xy chromaticity coordinates
   * 5. Optionally clamp to specified gamut
   *
   * @param r - Red channel value (0-255)
   * @param g - Green channel value (0-255)
   * @param b - Blue channel value (0-255)
   * @param gamut - Optional gamut type for clamping ('none', 'A', 'B', 'C')
   * @returns xy chromaticity coordinates
   */
  function rgbToXy(r, g, b, gamut) {
    if (gamut === void 0) {
      gamut = "none";
    }
    // Step 1: Normalize RGB values from [0-255] to [0-1]
    var red = r / 255;
    var green = g / 255;
    var blue = b / 255;
    // Step 2: Apply gamma correction (sRGB to linear RGB)
    red = applyGammaCorrection(red);
    green = applyGammaCorrection(green);
    blue = applyGammaCorrection(blue);
    // Step 3: Convert linear RGB to CIE XYZ using node-hue-api transformation matrix
    var X = red * 0.4360747 + green * 0.3850649 + blue * 0.0930804;
    var Y = red * 0.2225045 + green * 0.7168786 + blue * 0.0406169;
    var Z = red * 0.0139322 + green * 0.0971045 + blue * 0.7141733;
    // Step 4: Convert XYZ to xy chromaticity coordinates
    var sum = X + Y + Z;
    // Handle black point (divide by zero)
    if (sum === 0) {
      return {
        x: 0,
        y: 0
      };
    }
    var x = X / sum;
    var y = Y / sum;
    // Step 5: Apply gamut clamping if requested
    if (gamut !== "none") {
      return clampToGamut({
        x: x,
        y: y
      }, gamut);
    }
    return {
      x: x,
      y: y
    };
  }
  /**
   * Clamps an xy chromaticity point to the specified Philips Hue gamut triangle
   *
   * If the point is outside the gamut, it will be projected to the closest
   * point on the gamut triangle boundary.
   *
   * @param point - xy chromaticity coordinates to clamp
   * @param gamut - Target gamut type ('A', 'B', 'C', or 'none')
   * @returns Clamped xy coordinates within the gamut
   */
  function clampToGamut(point, gamut) {
    // Get the gamut triangle
    var triangle = GAMUT_MAP[gamut];
    // If gamut is 'none' or no triangle found, return unchanged
    if (gamut === "none" || triangle === null) {
      return point;
    }
    // Check if point is already inside the gamut
    if (isPointInTriangle(point, triangle)) {
      return point;
    }
    // Find the closest point on the triangle boundary
    return getClosestPointOnTriangle(point, triangle);
  }
  /**
   * Tests if a point is inside a triangle using barycentric coordinates
   *
   * @param p - Point to test
   * @param triangle - Triangle defined by three corner points
   * @returns true if point is inside or on the triangle, false otherwise
   */
  function isPointInTriangle(p, triangle) {
    var a = triangle[0],
      b = triangle[1],
      c = triangle[2];
    // Calculate vectors
    var v0x = c.x - a.x;
    var v0y = c.y - a.y;
    var v1x = b.x - a.x;
    var v1y = b.y - a.y;
    var v2x = p.x - a.x;
    var v2y = p.y - a.y;
    // Calculate dot products
    var dot00 = v0x * v0x + v0y * v0y;
    var dot01 = v0x * v1x + v0y * v1y;
    var dot02 = v0x * v2x + v0y * v2y;
    var dot11 = v1x * v1x + v1y * v1y;
    var dot12 = v1x * v2x + v1y * v2y;
    // Calculate barycentric coordinates
    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    // Check if point is inside triangle
    return u >= 0 && v >= 0 && u + v <= 1;
  }
  /**
   * Finds the closest point on a triangle to a given point
   *
   * This function projects the point onto each edge of the triangle
   * and returns the closest projection.
   *
   * @param p - Point to project
   * @param triangle - Triangle to project onto
   * @returns Closest point on the triangle
   */
  function getClosestPointOnTriangle(p, triangle) {
    var a = triangle[0],
      b = triangle[1],
      c = triangle[2];
    // Calculate closest point on each edge
    var pointOnAB = getClosestPointOnLine(p, a, b);
    var pointOnBC = getClosestPointOnLine(p, b, c);
    var pointOnCA = getClosestPointOnLine(p, c, a);
    // Calculate distances
    var distanceAB = getDistance(p, pointOnAB);
    var distanceBC = getDistance(p, pointOnBC);
    var distanceCA = getDistance(p, pointOnCA);
    // Return the closest point
    if (distanceAB <= distanceBC && distanceAB <= distanceCA) {
      return pointOnAB;
    } else if (distanceBC <= distanceCA) {
      return pointOnBC;
    } else {
      return pointOnCA;
    }
  }
  /**
   * Projects a point onto a line segment and returns the closest point
   *
   * @param p - Point to project
   * @param a - Start point of line segment
   * @param b - End point of line segment
   * @returns Closest point on the line segment
   */
  function getClosestPointOnLine(p, a, b) {
    // Vector from a to p
    var apx = p.x - a.x;
    var apy = p.y - a.y;
    // Vector from a to b
    var abx = b.x - a.x;
    var aby = b.y - a.y;
    // Calculate projection parameter t
    var ab_dot_ab = abx * abx + aby * aby;
    var ap_dot_ab = apx * abx + apy * aby;
    var t = ap_dot_ab / ab_dot_ab;
    // Clamp t to [0, 1] to stay within line segment
    t = Math.max(0, Math.min(1, t));
    // Return projected point
    return {
      x: a.x + t * abx,
      y: a.y + t * aby
    };
  }
  /**
   * Calculates the Euclidean distance between two points
   *
   * @param p1 - First point
   * @param p2 - Second point
   * @returns Distance between the points
   */
  function getDistance(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  /**
   * Converts CIE 1931 xy chromaticity coordinates to RGB color values
   *
   * This is the inverse operation of rgbToXy() and follows the Philips Hue algorithm:
   * 1. Optionally clamp xy to specified gamut
   * 2. Convert xy + brightness to CIE XYZ color space
   * 3. Transform XYZ to linear RGB using sRGB D65 matrix
   * 4. Apply inverse gamma correction (display encoding)
   * 5. Scale to [0-255] and clamp
   *
   * @param x - x-coordinate in CIE 1931 xy chromaticity space (0-1)
   * @param y - y-coordinate in CIE 1931 xy chromaticity space (0-1)
   * @param brightness - Luminance/brightness value (0-1), corresponds to Y in XYZ. Default: 1
   * @param gamut - Optional gamut type for clamping before conversion
   * @returns RGB color object with r, g, b values (0-255)
   *
   * @example
   * // Convert Hue red (Gamut C) to RGB
   * const rgb = xyToRgb(0.692, 0.308, 1.0, 'C');
   * // Result: {r: 255, g: 0, b: 0} (approximately)
   */
  function xyToRgb(x, y, brightness, gamut) {
    if (brightness === void 0) {
      brightness = 1;
    }
    // Step 1: Gamut clamping (optional)
    if (gamut && gamut !== "none") {
      var clamped = clampToGamut({
        x: x,
        y: y
      }, gamut);
      x = clamped.x;
      y = clamped.y;
    }
    // Step 2: xy + Brightness → XYZ transformation
    var z = 1 - x - y;
    // Handle division by zero (black point)
    if (y < 1e-7) {
      return {
        r: 0,
        g: 0,
        b: 0
      };
    }
    var Y = brightness;
    var X = Y / y * x;
    var Z = Y / y * z;
    // Step 3: XYZ → Linear RGB (node-hue-api inverse transformation matrix)
    var Rlin = X * 1.612 + Y * -0.203 + Z * -0.302;
    var Glin = X * -0.509 + Y * 1.412 + Z * 0.066;
    var Blin = X * 0.026 + Y * -0.072 + Z * 0.962;
    // Clamp negative values (can occur for colors outside sRGB gamut)
    Rlin = Math.max(0, Rlin);
    Glin = Math.max(0, Glin);
    Blin = Math.max(0, Blin);
    // Step 4: Linear RGB → Display RGB (sRGB gamma correction)
    var r = applyInverseGammaCorrection(Rlin);
    var g = applyInverseGammaCorrection(Glin);
    var b = applyInverseGammaCorrection(Blin);
    // Step 5: Scale to [0-255] and clamp
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    // Step 6: Return RGB object
    return {
      r: r,
      g: g,
      b: b
    };
  }

  // https://www.w3.org/TR/css3-values/#integers
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  // http://www.w3.org/TR/css3-values/#number-value
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  // Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
  // Parse function params
  // Parens and commas are optional, and this also allows for whitespace between numbers
  var PERMISSIVE_MATCH_3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH_4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  // Regex patterns for functional color strings
  var REGEX_FUNCTIONAL_RGB = new RegExp("rgb" + PERMISSIVE_MATCH_3);
  var REGEX_FUNCTIONAL_RGBA = new RegExp("rgba" + PERMISSIVE_MATCH_4);
  var REGEX_FUNCTIONAL_HSL = new RegExp("hsl" + PERMISSIVE_MATCH_3);
  var REGEX_FUNCTIONAL_HSLA = new RegExp("hsla" + PERMISSIVE_MATCH_4);
  // Color string parsing regex
  var HEX_START = "^(?:#?|0x?)";
  var HEX_INT_SINGLE = "([0-9a-fA-F]{1})";
  var HEX_INT_DOUBLE = "([0-9a-fA-F]{2})";
  var REGEX_HEX_3 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + "$");
  var REGEX_HEX_4 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + "$");
  var REGEX_HEX_6 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + "$");
  var REGEX_HEX_8 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + "$");
  // Kelvin temperature bounds
  var KELVIN_MIN = 2000;
  var KELVIN_MAX = 40000;
  // Epsilon for numerical stability in divisions
  var EPS = 1e-9;
  // Math shorthands
  var log = Math.log,
    round = Math.round,
    floor = Math.floor;
  /**
   * @desc Clamp a number between a min and max value
   * @param num - input value
   * @param min - min allowed value
   * @param max - max allowed value
   */
  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }
  /**
   * @desc Parse a css unit string - either regular int or a percentage number
   * @param str - css unit string
   * @param max - max unit value, used for calculating percentages
   */
  function parseUnit(str, max) {
    var isPercentage = str.indexOf("%") > -1;
    var num = parseFloat(str);
    return isPercentage ? max / 100 * num : num;
  }
  /**
   * @desc Parse hex str to an int
   * @param str - hex string to parse
   */
  function parseHexInt(str) {
    return parseInt(str, 16);
  }
  /**
   * @desc Convert nunber into to 2-digit hex
   * @param int - number to convert
   */
  function intToHex(_int) {
    return _int.toString(16).padStart(2, "0");
  }
  var IroColor = /*#__PURE__*/function () {
    /**
     * @constructor Color object
     * @param value - initial color value
     */
    function IroColor(value, onChange, gamut) {
      if (gamut === void 0) {
        gamut = "none";
      }
      // The default Color value
      this.$ = {
        h: 0,
        s: 0,
        v: 0,
        a: 1
      };
      this.gamut = gamut;
      if (value) { this.set(value); }
      // The watch callback function for this Color will be stored here
      this.onChange = onChange;
      this.initialValue = _extends({}, this.$); // copy initial value
    }
    /**
     * @desc Set the Color from any valid value
     * @param value - new color value
     */
    var _proto = IroColor.prototype;
    _proto.set = function set(value) {
      if (typeof value === "string") {
        if (/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(value)) {
          this.hexString = value;
        } else if (/^rgba?/.test(value)) {
          this.rgbString = value;
        } else if (/^hsla?/.test(value)) {
          this.hslString = value;
        }
      } else if (typeof value === "object") {
        if (value instanceof IroColor) {
          this.hsva = value.hsva;
        } else if ("r" in value && "g" in value && "b" in value) {
          this.rgb = value;
        } else if ("h" in value && "s" in value && "v" in value) {
          this.hsv = value;
        } else if ("h" in value && "s" in value && "l" in value) {
          this.hsl = value;
        } else if ("kelvin" in value) {
          this.kelvin = value.kelvin;
        } else if ("x" in value && "y" in value) {
          this.xy = value;
        }
      } else {
        throw new Error("Invalid color value");
      }
    }
    /**
     * @desc Shortcut to set a specific channel value
     * @param format - hsv | hsl | rgb
     * @param channel - individual channel to set, for example if model = hsl, chanel = h | s | l
     * @param value - new value for the channel
     */;
    _proto.setChannel = function setChannel(format, channel, value) {
      var _extends2;
      this[format] = _extends({}, this[format], (_extends2 = {}, _extends2[channel] = value, _extends2));
    }
    /**
     * @desc Reset color back to its initial value
     */;
    _proto.reset = function reset() {
      this.hsva = this.initialValue;
    }
    /**
     * @desc make new Color instance with the same value as this one
     */;
    _proto.clone = function clone() {
      return new IroColor(this, undefined, this.gamut);
    }
    /**
     * @desc remove color onChange
     */;
    _proto.unbind = function unbind() {
      this.onChange = undefined;
    }
    /**
     * @desc Convert hsv object to rgb
     * @param hsv - hsv color object
     */;
    IroColor.hsvToRgb = function hsvToRgb(hsv) {
      var h = hsv.h / 60;
      var s = hsv.s / 100;
      var v = hsv.v / 100;
      var i = floor(h);
      var f = h - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var mod = i % 6;
      var r = [v, q, p, p, t, v][mod];
      var g = [t, v, v, q, p, p][mod];
      var b = [p, p, t, v, v, q][mod];
      return {
        r: clamp(r * 255, 0, 255),
        g: clamp(g * 255, 0, 255),
        b: clamp(b * 255, 0, 255)
      };
    }
    /**
     * @desc Convert rgb object to hsv
     * @param rgb - rgb object
     */;
    IroColor.rgbToHsv = function rgbToHsv(rgb) {
      var r = rgb.r / 255;
      var g = rgb.g / 255;
      var b = rgb.b / 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var delta = max - min;
      var hue = 0;
      var value = max;
      var saturation = max === 0 ? 0 : delta / max;
      switch (max) {
        case min:
          hue = 0; // achromatic
          break;
        case r:
          hue = (g - b) / delta + (g < b ? 6 : 0);
          break;
        case g:
          hue = (b - r) / delta + 2;
          break;
        case b:
          hue = (r - g) / delta + 4;
          break;
      }
      return {
        h: hue * 60 % 360,
        s: clamp(saturation * 100, 0, 100),
        v: clamp(value * 100, 0, 100)
      };
    }
    /**
     * @desc Convert hsv object to hsl
     * @param hsv - hsv object
     */;
    IroColor.hsvToHsl = function hsvToHsl(hsv) {
      var s = hsv.s / 100;
      var v = hsv.v / 100;
      var l = (2 - s) * v;
      var divisor = l <= 1 ? l : 2 - l;
      // Avoid division by zero when lightness is close to zero
      var saturation = divisor < EPS ? 0 : s * v / divisor;
      return {
        h: hsv.h,
        s: clamp(saturation * 100, 0, 100),
        l: clamp(l * 50, 0, 100)
      };
    }
    /**
     * @desc Convert hsl object to hsv
     * @param hsl - hsl object
     */;
    IroColor.hslToHsv = function hslToHsv(hsl) {
      var l = hsl.l * 2;
      var s = hsl.s * (l <= 100 ? l : 200 - l) / 100;
      // Avoid division by zero when l + s is near 0
      var saturation = l + s < EPS ? 0 : 2 * s / (l + s);
      return {
        h: hsl.h,
        s: clamp(saturation * 100, 0, 100),
        v: clamp((l + s) / 2, 0, 100)
      };
    }
    /**
     * @desc Convert a kelvin temperature to an approx, RGB value
     * @param kelvin - kelvin temperature
     */;
    IroColor.kelvinToRgb = function kelvinToRgb(kelvin) {
      var temp = kelvin / 100;
      var r, g, b;
      if (temp < 66) {
        r = 255;
        g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
        b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
      } else {
        r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
        g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
        b = 255;
      }
      return {
        r: clamp(floor(r), 0, 255),
        g: clamp(floor(g), 0, 255),
        b: clamp(floor(b), 0, 255)
      };
    }
    /**
     * @desc Convert an RGB color to an approximate kelvin temperature
     * @param kelvin - kelvin temperature
     */;
    IroColor.rgbToKelvin = function rgbToKelvin(rgb) {
      var r = rgb.r,
        b = rgb.b;
      // Clamp inputs to minimal threshold to avoid division by zero
      r = Math.max(r, EPS);
      b = Math.max(b, EPS);
      var eps = 0.4;
      var minTemp = KELVIN_MIN;
      var maxTemp = KELVIN_MAX;
      var temp = KELVIN_MIN;
      var iterations = 0;
      var maxIterations = 50;
      // Binary search with iteration cap
      while (maxTemp - minTemp > eps && iterations < maxIterations) {
        temp = (maxTemp + minTemp) * 0.5;
        var testRgb = IroColor.kelvinToRgb(temp);
        var testR = Math.max(testRgb.r, EPS);
        if (testRgb.b / testR >= b / r) {
          maxTemp = temp;
        } else {
          minTemp = temp;
        }
        iterations++;
      }
      return temp;
    };
    /**
     * @desc Set the gamut type with optional silent mode
     * @param value - new gamut type
     * @param options - options object with silent flag
     */
    _proto.setGamutType = function setGamutType(value, options) {
      var silent = (options == null ? void 0 : options.silent) || false;
      // Guard clause: no change needed if same gamut
      if (value === this.gamut) { return; }
      // Store current xy value with old gamut
      var currentXy = this.xy;
      // Update gamut
      this.gamut = value;
      // Temporarily disable onChange if silent mode
      var originalOnChange = this.onChange;
      if (silent) {
        this.onChange = undefined;
      }
      // Re-apply xy value, which will:
      // - Clamp to new gamut via xyToRgb
      // - Update internal HSV representation
      // - Trigger onChange callback if registered (unless silent)
      this.xy = currentXy;
      // Restore onChange if silent mode
      if (silent) {
        this.onChange = originalOnChange;
      }
    };
    return _createClass(IroColor, [{
      key: "hsv",
      get: function get() {
        // value is cloned to allow changes to be made to the values before passing them back
        var value = this.$;
        return {
          h: value.h,
          s: value.s,
          v: value.v
        };
      },
      set: function set(newValue) {
        var oldValue = this.$;
        newValue = _extends({}, oldValue, newValue);
        // If this Color is being watched for changes we need to compare the new and old values to check the difference
        // Otherwise we can just be lazy
        if (this.onChange) {
          // Compute changed values with epsilon-based comparison to avoid event loops
          var changes = {
            h: false,
            v: false,
            s: false,
            a: false
          };
          for (var key in oldValue) {
            var delta = Math.abs((newValue[key] || 0) - (oldValue[key] || 0));
            changes[key] = delta > EPS;
          }
          // Update the old value
          this.$ = newValue;
          // If the value has changed, call hook callback
          if (changes.h || changes.s || changes.v || changes.a) { this.onChange(this, changes); }
        } else {
          this.$ = newValue;
        }
      }
    }, {
      key: "hsva",
      get: function get() {
        return _extends({}, this.$);
      },
      set: function set(value) {
        this.hsv = value;
      }
    }, {
      key: "hue",
      get: function get() {
        return this.$.h;
      },
      set: function set(value) {
        this.hsv = {
          h: value
        };
      }
    }, {
      key: "saturation",
      get: function get() {
        return this.$.s;
      },
      set: function set(value) {
        this.hsv = {
          s: value
        };
      }
    }, {
      key: "value",
      get: function get() {
        return this.$.v;
      },
      set: function set(value) {
        this.hsv = {
          v: value
        };
      }
    }, {
      key: "alpha",
      get: function get() {
        return this.$.a;
      },
      set: function set(value) {
        this.hsv = _extends({}, this.hsv, {
          a: value
        });
      }
    }, {
      key: "kelvin",
      get: function get() {
        return IroColor.rgbToKelvin(this.rgb);
      },
      set: function set(value) {
        this.rgb = IroColor.kelvinToRgb(value);
      }
    }, {
      key: "xy",
      get: function get() {
        var rgb = this.rgb;
        return rgbToXy(rgb.r, rgb.g, rgb.b, this.gamut);
      },
      set: function set(value) {
        // Preserve previous brightness or use minimal default to avoid losing brightness intention
        var brightness = this.$.v === 0 ? 0.01 : this.$.v / 100;
        var rgb = xyToRgb(value.x, value.y, brightness, this.gamut);
        this.rgb = rgb;
      }
    }, {
      key: "gamutType",
      get: function get() {
        return this.gamut;
      },
      set: function set(value) {
        this.setGamutType(value, {
          silent: false
        });
      }
    }, {
      key: "red",
      get: function get() {
        var rgb = this.rgb;
        return rgb.r;
      },
      set: function set(value) {
        this.rgb = _extends({}, this.rgb, {
          r: value
        });
      }
    }, {
      key: "green",
      get: function get() {
        var rgb = this.rgb;
        return rgb.g;
      },
      set: function set(value) {
        this.rgb = _extends({}, this.rgb, {
          g: value
        });
      }
    }, {
      key: "blue",
      get: function get() {
        var rgb = this.rgb;
        return rgb.b;
      },
      set: function set(value) {
        this.rgb = _extends({}, this.rgb, {
          b: value
        });
      }
    }, {
      key: "rgb",
      get: function get() {
        var _IroColor$hsvToRgb = IroColor.hsvToRgb(this.$),
          r = _IroColor$hsvToRgb.r,
          g = _IroColor$hsvToRgb.g,
          b = _IroColor$hsvToRgb.b;
        return {
          r: r,
          g: g,
          b: b
        };
      },
      set: function set(value) {
        this.hsv = _extends({}, IroColor.rgbToHsv(value), {
          a: value.a === undefined ? 1 : value.a
        });
      }
    }, {
      key: "rgba",
      get: function get() {
        return _extends({}, this.rgb, {
          a: this.alpha
        });
      },
      set: function set(value) {
        this.rgb = value;
      }
    }, {
      key: "hsl",
      get: function get() {
        var _IroColor$hsvToHsl = IroColor.hsvToHsl(this.$),
          h = _IroColor$hsvToHsl.h,
          s = _IroColor$hsvToHsl.s,
          l = _IroColor$hsvToHsl.l;
        return {
          h: h,
          s: s,
          l: l
        };
      },
      set: function set(value) {
        this.hsv = _extends({}, IroColor.hslToHsv(value), {
          a: value.a === undefined ? 1 : value.a
        });
      }
    }, {
      key: "hsla",
      get: function get() {
        return _extends({}, this.hsl, {
          a: this.alpha
        });
      },
      set: function set(value) {
        this.hsl = value;
      }
    }, {
      key: "rgbString",
      get: function get() {
        var rgb = this.rgb;
        return "rgb(" + round(rgb.r) + ", " + round(rgb.g) + ", " + round(rgb.b) + ")";
      },
      set: function set(value) {
        var match;
        var r = 0,
          g = 0,
          b = 0,
          a = 1;
        if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
          r = parseUnit(match[1], 255);
          g = parseUnit(match[2], 255);
          b = parseUnit(match[3], 255);
        } else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
          r = parseUnit(match[1], 255);
          g = parseUnit(match[2], 255);
          b = parseUnit(match[3], 255);
          a = clamp(parseUnit(match[4], 1), 0, 1);
        }
        if (match) {
          this.rgb = {
            r: r,
            g: g,
            b: b,
            a: a
          };
        } else {
          throw new Error("Invalid rgb string");
        }
      }
    }, {
      key: "rgbaString",
      get: function get() {
        var rgba = this.rgba;
        return "rgba(" + round(rgba.r) + ", " + round(rgba.g) + ", " + round(rgba.b) + ", " + rgba.a + ")";
      },
      set: function set(value) {
        this.rgbString = value;
      }
    }, {
      key: "hexString",
      get: function get() {
        var rgb = this.rgb;
        return "#" + intToHex(round(rgb.r)) + intToHex(round(rgb.g)) + intToHex(round(rgb.b));
      },
      set: function set(value) {
        var match;
        var r = 0,
          g = 0,
          b = 0,
          a = 255;
        if (match = REGEX_HEX_3.exec(value)) {
          r = parseHexInt(match[1]) * 17;
          g = parseHexInt(match[2]) * 17;
          b = parseHexInt(match[3]) * 17;
        } else if (match = REGEX_HEX_4.exec(value)) {
          r = parseHexInt(match[1]) * 17;
          g = parseHexInt(match[2]) * 17;
          b = parseHexInt(match[3]) * 17;
          a = parseHexInt(match[4]) * 17;
        } else if (match = REGEX_HEX_6.exec(value)) {
          r = parseHexInt(match[1]);
          g = parseHexInt(match[2]);
          b = parseHexInt(match[3]);
        } else if (match = REGEX_HEX_8.exec(value)) {
          r = parseHexInt(match[1]);
          g = parseHexInt(match[2]);
          b = parseHexInt(match[3]);
          a = parseHexInt(match[4]);
        }
        if (match) {
          this.rgb = {
            r: r,
            g: g,
            b: b,
            a: a / 255
          };
        } else {
          throw new Error("Invalid hex string");
        }
      }
    }, {
      key: "hex8String",
      get: function get() {
        var rgba = this.rgba;
        return "#" + intToHex(round(rgba.r)) + intToHex(round(rgba.g)) + intToHex(round(rgba.b)) + intToHex(round(rgba.a * 255));
      },
      set: function set(value) {
        this.hexString = value;
      }
    }, {
      key: "hslString",
      get: function get() {
        var hsl = this.hsl;
        return "hsl(" + round(hsl.h) + ", " + round(hsl.s) + "%, " + round(hsl.l) + "%)";
      },
      set: function set(value) {
        var match;
        var h = 0,
          s = 0,
          l = 0,
          a = 1;
        if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
          h = parseUnit(match[1], 360);
          s = parseUnit(match[2], 100);
          l = parseUnit(match[3], 100);
        } else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
          h = parseUnit(match[1], 360);
          s = parseUnit(match[2], 100);
          l = parseUnit(match[3], 100);
          a = clamp(parseUnit(match[4], 1), 0, 1);
        }
        if (match) {
          this.hsl = {
            h: h,
            s: s,
            l: l,
            a: a
          };
        } else {
          throw new Error("Invalid hsl string");
        }
      }
    }, {
      key: "hslaString",
      get: function get() {
        var hsla = this.hsla;
        return "hsla(" + round(hsla.h) + ", " + round(hsla.s) + "%, " + round(hsla.l) + "%, " + hsla.a + ")";
      },
      set: function set(value) {
        this.hslString = value;
      }
    }]);
  }();

  var sliderDefaultOptions = {
    sliderShape: "bar",
    sliderType: "value",
    minTemperature: 2200,
    maxTemperature: 11000
  };
  /**
   * @desc Get the bounding dimensions of the slider
   * @param props - slider props
   * Note: sliderSize of null or undefined triggers auto-calculation based on padding, handleRadius, and borderWidth.
   * A value of 0 is not supported as a fixed size.
   */
  function getSliderDimensions(props) {
    var width = props.width,
      sliderSize = props.sliderSize,
      borderWidth = props.borderWidth,
      handleRadius = props.handleRadius,
      padding = props.padding,
      sliderShape = props.sliderShape;
    var ishorizontal = props.layoutDirection === "horizontal";
    // automatically calculate sliderSize if its not defined
    sliderSize = sliderSize != null ? sliderSize : padding * 2 + handleRadius * 2 + (borderWidth || 0) * 2;
    if (sliderShape === "circle") {
      return {
        handleStart: props.padding + props.handleRadius,
        handleRange: width - padding * 2 - handleRadius * 2,
        width: width,
        height: width,
        cx: width / 2,
        cy: width / 2,
        radius: width / 2 - borderWidth / 2
      };
    } else {
      return {
        handleStart: sliderSize / 2,
        handleRange: width - sliderSize,
        radius: sliderSize / 2,
        x: 0,
        y: 0,
        width: ishorizontal ? sliderSize : width,
        height: ishorizontal ? width : sliderSize
      };
    }
  }
  /**
   * @desc Get the current slider value for a given color, as a percentage
   * @param props - slider props
   * @param color
   */
  function getCurrentSliderValue(props, color) {
    var hsva = color.hsva;
    var rgb = color.rgb;
    switch (props.sliderType) {
      case "red":
        return rgb.r / 2.55;
      case "green":
        return rgb.g / 2.55;
      case "blue":
        return rgb.b / 2.55;
      case "alpha":
        return hsva.a * 100;
      case "kelvin":
        var minTemperature = props.minTemperature,
          maxTemperature = props.maxTemperature;
        var temperatureRange = maxTemperature - minTemperature;
        var percent = (color.kelvin - minTemperature) / temperatureRange * 100;
        // clmap percentage
        return Math.max(0, Math.min(percent, 100));
      case "hue":
        return hsva.h / 3.6;
      case "saturation":
        return hsva.s;
      case "value":
      default:
        return hsva.v;
    }
  }
  /**
   * @desc Get the current slider value from user input
   * @param props - slider props
   * @param x - global input x position
   * @param y - global input y position
   */
  function getSliderValueFromInput(props, x, y) {
    var _getSliderDimensions = getSliderDimensions(props),
      handleRange = _getSliderDimensions.handleRange,
      handleStart = _getSliderDimensions.handleStart;
    var handlePos;
    if (props.layoutDirection === "horizontal") {
      handlePos = -1 * y + handleRange + handleStart;
    } else {
      handlePos = x - handleStart;
    }
    // clamp handle position
    handlePos = Math.max(Math.min(handlePos, handleRange), 0);
    var percent = Math.round(100 / handleRange * handlePos);
    switch (props.sliderType) {
      case "kelvin":
        var minTemperature = props.minTemperature,
          maxTemperature = props.maxTemperature;
        var temperatureRange = maxTemperature - minTemperature;
        return minTemperature + temperatureRange * (percent / 100);
      case "alpha":
        return percent / 100;
      case "hue":
        return percent * 3.6;
      case "red":
      case "blue":
      case "green":
        return percent * 2.55;
      default:
        return percent;
    }
  }
  /**
   * @desc Get the current handle position for a given color
   * @param props - slider props
   * @param color
   */
  function getSliderHandlePosition(props, color) {
    var _getSliderDimensions2 = getSliderDimensions(props),
      width = _getSliderDimensions2.width,
      height = _getSliderDimensions2.height,
      handleRange = _getSliderDimensions2.handleRange,
      handleStart = _getSliderDimensions2.handleStart;
    var ishorizontal = props.layoutDirection === "horizontal";
    var sliderValue = getCurrentSliderValue(props, color);
    var midPoint = ishorizontal ? width / 2 : height / 2;
    var handlePos = handleStart + sliderValue / 100 * handleRange;
    if (ishorizontal) {
      handlePos = -1 * handlePos + handleRange + handleStart * 2;
    }
    return {
      x: ishorizontal ? midPoint : handlePos,
      y: ishorizontal ? handlePos : midPoint
    };
  }
  /**
   * @desc Get the gradient stops for a slider
   * @param props - slider props
   * @param color
   */
  function getSliderGradient(props, color) {
    var hsv = color.hsv;
    var rgb = color.rgb;
    switch (props.sliderType) {
      case "red":
        return [[0, "rgb(" + 0 + "," + rgb.g + "," + rgb.b + ")"], [100, "rgb(" + 255 + "," + rgb.g + "," + rgb.b + ")"]];
      case "green":
        return [[0, "rgb(" + rgb.r + "," + 0 + "," + rgb.b + ")"], [100, "rgb(" + rgb.r + "," + 255 + "," + rgb.b + ")"]];
      case "blue":
        return [[0, "rgb(" + rgb.r + "," + rgb.g + "," + 0 + ")"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + 255 + ")"]];
      case "alpha":
        return [[0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0)"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"]];
      case "kelvin":
        var stops = [];
        var min = props.minTemperature;
        var max = props.maxTemperature;
        var numStops = 8;
        var range = max - min;
        // Generate stops including both min and max temperatures
        for (var i = 0; i <= numStops; i++) {
          var percent = 100 / numStops * i;
          var kelvin = min + range / numStops * i;
          var _IroColor$kelvinToRgb = IroColor.kelvinToRgb(kelvin),
            r = _IroColor$kelvinToRgb.r,
            g = _IroColor$kelvinToRgb.g,
            b = _IroColor$kelvinToRgb.b;
          stops.push([percent, "rgb(" + r + "," + g + "," + b + ")"]);
        }
        return stops;
      case "hue":
        return [[0, "#f00"], [16.666, "#ff0"], [33.333, "#0f0"], [50, "#0ff"], [66.666, "#00f"], [83.333, "#f0f"], [100, "#f00"]];
      case "saturation":
        var noSat = IroColor.hsvToHsl({
          h: hsv.h,
          s: 0,
          v: hsv.v
        });
        var fullSat = IroColor.hsvToHsl({
          h: hsv.h,
          s: 100,
          v: hsv.v
        });
        return [[0, "hsl(" + noSat.h + "," + noSat.s + "%," + noSat.l + "%)"], [100, "hsl(" + fullSat.h + "," + fullSat.s + "%," + fullSat.l + "%)"]];
      case "value":
      default:
        var hsl = IroColor.hsvToHsl({
          h: hsv.h,
          s: hsv.s,
          v: 100
        });
        return [[0, "#000"], [100, "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)"]];
    }
  }

  var TAU = Math.PI * 2;
  // javascript's modulo operator doesn't produce positive numbers with negative input
  // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
  var mod = function mod(a, n) {
    return (a % n + n) % n;
  };
  // distance between points (x, y) and (0, 0)
  var dist = function dist(x, y) {
    return Math.sqrt(x * x + y * y);
  };
  /**
   * @param props - wheel props
   * @internal
   */
  function getHandleRange(props) {
    return props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
  }
  /**
   * Returns true if point (x, y) lands inside the wheel
   * @param props - wheel props
   * @param x
   * @param y
   */
  function isInputInsideWheel(props, x, y) {
    var _getWheelDimensions = getWheelDimensions(props),
      cx = _getWheelDimensions.cx,
      cy = _getWheelDimensions.cy;
    var r = props.width / 2;
    return dist(cx - x, cy - y) < r;
  }
  /**
   * @desc Get the point as the center of the wheel
   * @param props - wheel props
   */
  function getWheelDimensions(props) {
    var r = props.width / 2;
    return {
      width: props.width,
      radius: r - props.borderWidth,
      cx: r,
      cy: r
    };
  }
  /**
   * @desc Translate an angle according to wheelAngle and wheelDirection
   * @param props - wheel props
   * @param angle - input angle
   */
  function translateWheelAngle(props, angle, invert) {
    var wheelAngle = props.wheelAngle;
    var wheelDirection = props.wheelDirection;
    // inverted and clockwise
    if (invert && wheelDirection === "clockwise") { angle = wheelAngle + angle; }
    // clockwise (input handling)
    else if (wheelDirection === "clockwise") { angle = 360 - wheelAngle + angle; }
    // inverted and anticlockwise
    else if (invert && wheelDirection === "anticlockwise") { angle = wheelAngle + 180 - angle; }
    // anticlockwise (input handling)
    else if (wheelDirection === "anticlockwise") { angle = wheelAngle + angle; }
    return mod(angle, 360);
  }
  /**
   * @desc Get the current handle position for a given color
   * @param props - wheel props
   * @param color
   */
  function getWheelHandlePosition(props, color) {
    var hsv = color.hsv;
    var _getWheelDimensions2 = getWheelDimensions(props),
      cx = _getWheelDimensions2.cx,
      cy = _getWheelDimensions2.cy;
    var handleRange = getHandleRange(props);
    var handleAngle = (180 + translateWheelAngle(props, hsv.h, true)) * (TAU / 360);
    var handleDist = hsv.s / 100 * handleRange;
    var direction = props.wheelDirection === "clockwise" ? -1 : 1;
    return {
      x: cx + handleDist * Math.cos(handleAngle) * direction,
      y: cy + handleDist * Math.sin(handleAngle) * direction
    };
  }
  /**
   * @desc Get the current wheel value from user input
   * @param props - wheel props
   * @param x - global input x position
   * @param y - global input y position
   */
  function getWheelValueFromInput(props, x, y) {
    var _getWheelDimensions3 = getWheelDimensions(props),
      cx = _getWheelDimensions3.cx,
      cy = _getWheelDimensions3.cy;
    var handleRange = getHandleRange(props);
    x = cx - x;
    y = cy - y;
    // Calculate the hue by converting the angle to radians
    var hue = translateWheelAngle(props, Math.atan2(-y, -x) * (360 / TAU));
    // Find the point's distance from the center of the wheel
    // This is used to show the saturation level
    var handleDist = Math.min(dist(x, y), handleRange);
    return {
      h: Math.round(hue),
      s: Math.round(100 / handleRange * handleDist)
    };
  }
  /**
   * @desc Get the bounding dimensions of the box
   * @param props - box props
   */
  function getBoxDimensions(props) {
    var width = props.width,
      boxHeight = props.boxHeight,
      padding = props.padding,
      handleRadius = props.handleRadius;
    return {
      width: width,
      height: boxHeight != null ? boxHeight : width,
      radius: padding + handleRadius
    };
  }
  /**
   * @desc Get the current box value from user input
   * @param props - box props
   * @param x - global input x position
   * @param y - global input y position
   */
  function getBoxValueFromInput(props, x, y) {
    var _getBoxDimensions = getBoxDimensions(props),
      width = _getBoxDimensions.width,
      height = _getBoxDimensions.height,
      radius = _getBoxDimensions.radius;
    var handleStart = radius;
    var handleRangeX = width - radius * 2;
    var handleRangeY = height - radius * 2;
    var percentX = (x - handleStart) / handleRangeX * 100;
    var percentY = (y - handleStart) / handleRangeY * 100;
    return {
      s: Math.max(0, Math.min(percentX, 100)),
      v: Math.max(0, Math.min(100 - percentY, 100))
    };
  }
  /**
   * @desc Get the current box handle position for a given color
   * @param props - box props
   * @param color
   */
  function getBoxHandlePosition(props, color) {
    var _getBoxDimensions2 = getBoxDimensions(props),
      width = _getBoxDimensions2.width,
      height = _getBoxDimensions2.height,
      radius = _getBoxDimensions2.radius;
    var hsv = color.hsv;
    var handleStart = radius;
    var handleRangeX = width - radius * 2;
    var handleRangeY = height - radius * 2;
    return {
      x: handleStart + hsv.s / 100 * handleRangeX,
      y: handleStart + (handleRangeY - hsv.v / 100 * handleRangeY)
    };
  }
  /**
   * @desc Get the gradient stops for a box
   * @param props - box props
   * @param color
   */
  function getBoxGradients(props, color) {
    var hue = color.hue;
    return [
    // saturation gradient
    [[0, '#fff'], [100, "hsl(" + hue + ",100%,50%)"]],
    // lightness gradient
    [[0, 'rgba(0,0,0,0)'], [100, '#000']]];
  }

  // Keep track of html <base> elements for resolveSvgUrl
  // getElementsByTagName returns a live HTMLCollection, which stays in sync with the DOM tree
  // So it only needs to be called once
  var BASE_ELEMENTS;
  /**
   * @desc Resolve an SVG reference URL
   * This is required to work around how Safari and iOS webviews handle gradient URLS under certain conditions
   * If a page is using a client-side routing library which makes use of the HTML <base> tag,
   * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
   * More info on the problem:
   * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
   * https://github.com/jaames/iro.js/issues/18
   * https://github.com/jaames/iro.js/issues/45
   * https://github.com/jaames/iro.js/pull/89
   * @props url - SVG reference URL
   */
  function resolveSvgUrl(url) {
    if (!BASE_ELEMENTS) { BASE_ELEMENTS = document.getElementsByTagName("base"); }
    // If there's a <base> tag, use URL API to resolve the URL properly
    // This avoids UA sniffing and works with all browsers
    if (BASE_ELEMENTS.length > 0) {
      try {
        // Use URL API with document.baseURI for proper resolution
        return new URL(url, document.baseURI).toString();
      } catch (e) {
        // Fallback if URL API fails
        var location = window.location;
        return location.protocol + "//" + location.host + location.pathname + location.search + url;
      }
    }
    return url;
  }
  /**
   * @desc Given a specifc (x, y) position, test if there's a handle there and return its index, else return null.
   *       This is used for components like the box and wheel which support multiple handles when multicolor is active
   * @props x - point x position
   * @props y - point y position
   * @props handlePositions - array of {x, y} coords for each handle
   */
  function getHandleAtPoint(props, x, y, handlePositions) {
    for (var i = 0; i < handlePositions.length; i++) {
      var dX = handlePositions[i].x - x;
      var dY = handlePositions[i].y - y;
      var dist = Math.sqrt(dX * dX + dY * dY);
      // Use <= to include clicks exactly on the radius edge, with 0.5px fuzz for pixel rounding
      if (dist <= props.handleRadius + 0.5) {
        return i;
      }
    }
    return null;
  }

  function cssBorderStyles(props) {
    return {
      boxSizing: 'border-box',
      border: props.borderWidth + "px solid " + props.borderColor
    };
  }
  function cssGradient(type, direction, stops) {
    return type + "-gradient(" + direction + ", " + stops.map(function (_ref) {
      var o = _ref[0],
        col = _ref[1];
      return col + " " + o + "%";
    }).join(',') + ")";
  }
  function cssValue(value) {
    if (typeof value === 'string') { return value; }
    return value + "px";
  }

  var iroColorPickerOptionDefaults = {
    width: 300,
    height: 300,
    color: "#fff",
    colors: [],
    padding: 6,
    layoutDirection: "vertical",
    borderColor: "#fff",
    borderWidth: 0,
    handleRadius: 8,
    activeHandleRadius: null,
    handleSvg: null,
    handleProps: {
      x: 0,
      y: 0
    },
    wheelLightness: true,
    wheelAngle: 0,
    wheelDirection: "anticlockwise",
    sliderSize: null,
    sliderMargin: 12,
    boxHeight: null,
    gamut: "none"
  };

  var SECONDARY_EVENTS = [
      "mousemove" /* MouseMove */,
      "touchmove" /* TouchMove */,
      "mouseup" /* MouseUp */,
      "touchend" ];
  // Base component class for iro UI components
  // This extends the Preact component class to allow them to react to mouse/touch input events by themselves
  var IroComponentWrapper = /*@__PURE__*/(function (Component) {
      function IroComponentWrapper(props) {
          Component.call(this, props);
          this.isDragging = false;
          // Generate unique ID for the component
          // This can be used to generate unique IDs for gradients, etc
          this.uid = (Math.random() + 1).toString(36).substring(5);
      }

      if ( Component ) IroComponentWrapper.__proto__ = Component;
      IroComponentWrapper.prototype = Object.create( Component && Component.prototype );
      IroComponentWrapper.prototype.constructor = IroComponentWrapper;
      IroComponentWrapper.prototype.render = function render (props) {
          var eventHandler = this.handleEvent.bind(this);
          var rootProps = {
              onMouseDown: eventHandler,
              // https://github.com/jaames/iro.js/issues/126
              // https://github.com/preactjs/preact/issues/2113#issuecomment-553408767
              ontouchstart: eventHandler,
          };
          var isHorizontal = props.layoutDirection === "horizontal";
          var margin = props.margin === null ? props.sliderMargin : props.margin;
          var rootStyles = {
              overflow: "visible",
              display: isHorizontal ? "inline-block" : "block",
              // Set touch-action: none during dragging to prevent browser touch gestures
              touchAction: this.isDragging ? "none" : "auto",
          };
          // first component shouldn't have any margin
          if (props.index > 0) {
              rootStyles[isHorizontal ? "marginLeft" : "marginTop"] = margin;
          }
          return _(k, null, props.children(this.uid, rootProps, rootStyles));
      };
      // More info on handleEvent:
      // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
      // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
      IroComponentWrapper.prototype.handleEvent = function handleEvent (e) {
          var this$1 = this;

          var inputHandler = this.props.onInput;
          // Get the screen position of the component
          var bounds = this.base.getBoundingClientRect();
          // Detect if the event is a touch event by checking if it has the `touches` property
          // If it is a touch event, use the first touch input
          var point = e.touches ? e.changedTouches[0] : e;
          var x = point.clientX - bounds.left;
          var y = point.clientY - bounds.top;
          switch (e.type) {
              case "mousedown" /* MouseDown */:
              case "touchstart" /* TouchStart */:
                  var result = inputHandler(x, y, 0 /* Start */);
                  if (result !== false) {
                      // Prevent default only after drag has been initiated
                      e.preventDefault();
                      this.isDragging = true;
                      SECONDARY_EVENTS.forEach(function (event) {
                          document.addEventListener(event, this$1, { passive: false });
                      });
                  }
                  break;
              case "mousemove" /* MouseMove */:
              case "touchmove" /* TouchMove */:
                  // Prevent default only while dragging
                  if (this.isDragging) {
                      e.preventDefault();
                  }
                  inputHandler(x, y, 1 /* Move */);
                  break;
              case "mouseup" /* MouseUp */:
              case "touchend" /* TouchEnd */:
                  if (this.isDragging) {
                      e.preventDefault();
                      this.isDragging = false;
                  }
                  inputHandler(x, y, 2 /* End */);
                  SECONDARY_EVENTS.forEach(function (event) {
                      document.removeEventListener(event, this$1, {
                          passive: false,
                      });
                  });
                  break;
          }
      };

      return IroComponentWrapper;
  }(x));

  function IroHandle(props) {
      var radius = props.r;
      var url = props.url;
      var cx = radius;
      var cy = radius;
      return (_("svg", { className: ("IroHandle IroHandle--" + (props.index) + " " + (props.isActive ? "IroHandle--isActive" : "")), style: {
              transform: ("translate(" + (cssValue(props.x)) + ", " + (cssValue(props.y)) + ")"),
              willChange: "transform",
              top: cssValue(-radius),
              left: cssValue(-radius),
              width: cssValue(radius * 2),
              height: cssValue(radius * 2),
              position: "absolute",
              overflow: "visible",
          } },
          url && _("use", Object.assign({ xlinkHref: resolveSvgUrl(url) }, props.props)),
          !url && (_("circle", { cx: cx, cy: cy, r: radius, fill: "none", strokeWidth: 2, stroke: "#000" })),
          !url && (_("circle", { cx: cx, cy: cy, r: radius - 2, fill: props.fill, strokeWidth: 2, stroke: "#fff" }))));
  }
  IroHandle.defaultProps = {
      fill: "none",
      x: 0,
      y: 0,
      r: 8,
      url: null,
      props: { x: 0, y: 0 },
  };

  function IroSlider(props) {
      var activeIndex = props.activeIndex;
      var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
      var ref = getSliderDimensions(props);
      var width = ref.width;
      var height = ref.height;
      var radius = ref.radius;
      var handlePos = getSliderHandlePosition(props, activeColor);
      var gradient = getSliderGradient(props, activeColor);
      function handleInput(x, y, type) {
          var value = getSliderValueFromInput(props, x, y);
          props.parent.inputActive = true;
          activeColor[props.sliderType] = value;
          props.onInput(type, props.id);
      }
      return (_(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (_("div", Object.assign({}, rootProps, { className: "IroSlider", style: Object.assign({}, {position: 'relative',
              width: cssValue(width),
              height: cssValue(height),
              borderRadius: cssValue(radius),
              // checkered bg to represent alpha
              background: "conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",
              backgroundSize: '8px 8px'},
              rootStyles) }),
          _("div", { className: "IroSliderGradient", style: Object.assign({}, {position: 'absolute',
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: cssValue(radius),
                  background: cssGradient('linear', props.layoutDirection === 'horizontal' ? 'to top' : 'to right', gradient)},
                  cssBorderStyles(props)) }),
          _(IroHandle, { isActive: true, index: activeColor.index, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePos.x, y: handlePos.y }))); }));
  }
  IroSlider.defaultProps = Object.assign({}, sliderDefaultOptions);

  function IroBox(props) {
      var ref = getBoxDimensions(props);
      var width = ref.width;
      var height = ref.height;
      var radius = ref.radius;
      var colors = props.colors;
      var colorPicker = props.parent;
      var activeIndex = props.activeIndex;
      var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
      var gradients = getBoxGradients(props, activeColor);
      var handlePositions = colors.map(function (color) { return getBoxHandlePosition(props, color); });
      function handleInput(x, y, inputType) {
          if (inputType === 0 /* Start */) {
              // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
              var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
              // If the input hit a handle, set it as the active handle, but don't update the color
              if (activeHandle !== null) {
                  colorPicker.setActiveColor(activeHandle);
              }
              // If the input didn't hit a handle, set the currently active handle to that position
              else {
                  colorPicker.inputActive = true;
                  activeColor.hsv = getBoxValueFromInput(props, x, y);
                  props.onInput(inputType, props.id);
              }
          }
          // move is fired when the user has started dragging
          else if (inputType === 1 /* Move */) {
              colorPicker.inputActive = true;
              activeColor.hsv = getBoxValueFromInput(props, x, y);
          }
          // let the color picker fire input:start, input:move or input:end events
          props.onInput(inputType, props.id);
      }
      return (_(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (_("div", Object.assign({}, rootProps, { className: "IroBox", style: Object.assign({}, {width: cssValue(width),
              height: cssValue(height),
              position: 'relative'},
              rootStyles) }),
          _("div", { className: "IroBox", style: Object.assign({}, {width: '100%',
                  height: '100%',
                  borderRadius: cssValue(radius)},
                  cssBorderStyles(props),
                  {background: cssGradient('linear', 'to bottom', gradients[1])
                      + ',' +
                      cssGradient('linear', 'to right', gradients[0])}) }),
          colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (_(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
          _(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
  }

  var HUE_GRADIENT_CLOCKWISE = 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)';
  var HUE_GRADIENT_ANTICLOCKWISE = 'conic-gradient(red, magenta, blue, aqua, lime, yellow, red)';
  function IroWheel(props) {
      var ref = getWheelDimensions(props);
      var width = ref.width;
      var colors = props.colors;
      var borderWidth = props.borderWidth;
      var colorPicker = props.parent;
      var activeColor = props.color;
      var hsv = activeColor.hsv;
      var handlePositions = colors.map(function (color) { return getWheelHandlePosition(props, color); });
      var circleStyles = {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          boxSizing: 'border-box'
      };
      function handleInput(x, y, inputType) {
          if (inputType === 0 /* Start */) {
              // input hitbox is a square, 
              // so we want to ignore any initial clicks outside the circular shape of the wheel
              if (!isInputInsideWheel(props, x, y)) {
                  // returning false will cease all event handling for this interaction
                  return false;
              }
              // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
              var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
              // If the input hit a handle, set it as the active handle, but don't update the color
              if (activeHandle !== null) {
                  colorPicker.setActiveColor(activeHandle);
              }
              // If the input didn't hit a handle, set the currently active handle to that position
              else {
                  colorPicker.inputActive = true;
                  activeColor.hsv = getWheelValueFromInput(props, x, y);
                  props.onInput(inputType, props.id);
              }
          }
          // move is fired when the user has started dragging
          else if (inputType === 1 /* Move */) {
              colorPicker.inputActive = true;
              activeColor.hsv = getWheelValueFromInput(props, x, y);
          }
          // let the color picker fire input:start, input:move or input:end events
          props.onInput(inputType, props.id);
      }
      return (_(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (_("div", Object.assign({}, rootProps, { className: "IroWheel", style: Object.assign({}, {width: cssValue(width),
              height: cssValue(width),
              position: 'relative'},
              rootStyles) }),
          _("div", { className: "IroWheelHue", style: Object.assign({}, circleStyles,
                  {transform: ("rotateZ(" + (props.wheelAngle + 90) + "deg)"),
                  background: props.wheelDirection === 'clockwise' ? HUE_GRADIENT_CLOCKWISE : HUE_GRADIENT_ANTICLOCKWISE}) }),
          _("div", { className: "IroWheelSaturation", style: Object.assign({}, circleStyles,
                  {background: 'radial-gradient(circle closest-side, #fff, transparent)'}) }),
          props.wheelLightness && (_("div", { className: "IroWheelLightness", style: Object.assign({}, circleStyles,
                  {background: '#000',
                  opacity: 1 - hsv.v / 100}) })),
          _("div", { className: "IroWheelBorder", style: Object.assign({}, circleStyles,
                  cssBorderStyles(props)) }),
          colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (_(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
          _(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
  }

  function createWidget(WidgetComponent) {
      var widgetFactory = function (parent, props) {
          if ( props === void 0 ) props = {};

          var widget = null; // will become an instance of the widget component class
          var widgetRoot = document.createElement("div");
          // Render widget into a temp DOM node
          G(_(WidgetComponent, Object.assign({}, {ref: function (ref) { return (widget = ref); }},
              (props || {}))), widgetRoot);
          function mountWidget() {
              var container = parent instanceof Element ? parent : document.querySelector(parent);
              if (!container) {
                  // Warn if selector not found
                  if (typeof parent === "string") {
                      console.warn(("[iro.js] Selector \"" + parent + "\" not found in document"));
                  }
                  return;
              }
              // Guard against missing widget.base before appending
              if (!widget.base) {
                  console.warn("[iro.js] Widget base element not ready, retrying...");
                  // Retry on next frame
                  requestAnimationFrame(mountWidget);
                  return;
              }
              container.appendChild(widget.base);
              // Only call onMount if container is an HTMLElement (not SVG or other Element types)
              if (container instanceof HTMLElement) {
                  widget.onMount(container);
              }
          }
          // Mount it into the DOM when the page document is ready
          var isElementParent = parent instanceof Element;
          if (isElementParent || document.readyState !== "loading") {
              mountWidget();
          }
          else {
              document.addEventListener("DOMContentLoaded", mountWidget, {
                  once: true,
              });
          }
          return widget;
      };
      // Allow the widget factory to inherit component prototype + static class methods
      // This makes it easier for plugin authors to extend the base widget component
      widgetFactory.prototype = WidgetComponent.prototype;
      Object.assign(widgetFactory, WidgetComponent);
      // Add reference to base component too
      widgetFactory.__component = WidgetComponent;
      return widgetFactory;
  }

  function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
  var IroColorPicker = /*@__PURE__*/(function (Component) {
      function IroColorPicker(props) {
          var this$1 = this;

          Component.call(this, props);
          this.colors = [];
          this.inputActive = false;
          this.events = {};
          this.activeEvents = {};
          this.deferredEvents = {};
          this.id = props.id || "";
          var colors = props.colors && props.colors.length > 0
              ? props.colors
              : [props.color || "#fff"];
          colors.forEach(function (colorValue) { return this$1.addColor(colorValue); });
          this.setActiveColor(0);
          // Pass all the props into the component's state,
          // Except we want to add the color object and make sure that refs aren't passed down to children
          this.state = Object.assign({}, props,
              {color: this.color,
              colors: this.colors,
              layout: props.layout || "default"});
      }

      if ( Component ) IroColorPicker.__proto__ = Component;
      IroColorPicker.prototype = Object.create( Component && Component.prototype );
      IroColorPicker.prototype.constructor = IroColorPicker;
      // Plubic multicolor API
      /**
       * @desc Get the current gamut type from state or props
       * @internal
       */
      IroColorPicker.prototype.getCurrentGamut = function getCurrentGamut () {
          return this.state && this.state.gamut !== undefined
              ? this.state.gamut
              : this.props.gamut !== undefined
                  ? this.props.gamut
                  : iroColorPickerOptionDefaults.gamut;
      };
      /**
       * @desc Add a color to the color picker
       * @param color new color to add
       * @param index optional color index
       */
      IroColorPicker.prototype.addColor = function addColor (color, index) {
          if ( index === void 0 ) index = this.colors.length;

          // Create a new iro.Color
          // Also bind it to onColorChange, so whenever the color changes it updates the color picker
          // Use gamut from state if available, otherwise fall back to props or default
          var gamut = this.getCurrentGamut();
          var newColor = new IroColor(color, this.onColorChange.bind(this), gamut);
          // Insert color @ the given index
          this.colors.splice(index, 0, newColor);
          // Reindex colors
          this.colors.forEach(function (color, index) { return (color.index = index); });
          // Update picker state if necessary
          if (this.state) {
              this.setState({ colors: this.colors });
          }
          // Fire color init event
          this.deferredEmit("color:init", newColor);
      };
      /**
       * @desc Remove a color from the color picker
       * @param index color index
       */
      IroColorPicker.prototype.removeColor = function removeColor (index) {
          var color = this.colors[index];
          var wasActive = color === this.color;
          // Remove the color
          this.colors.splice(index, 1);
          // Destroy the color object -- this unbinds it from the color picker
          color.unbind();
          // Reindex colors
          this.colors.forEach(function (color, index) { return (color.index = index); });
          // Update picker state if necessary
          if (this.state) {
              this.setState({ colors: this.colors });
          }
          // If the active color was removed, set active to the same index (clamped), or 0 if list is empty
          if (wasActive) {
              if (this.colors.length > 0) {
                  this.setActiveColor(Math.min(index, this.colors.length - 1));
              }
              // Handle empty state if needed
          }
          // Fire color remove event
          this.emit("color:remove", color);
      };
      /**
       * @desc Set the currently active color
       * @param index color index
       */
      IroColorPicker.prototype.setActiveColor = function setActiveColor (index) {
          this.color = this.colors[index];
          if (this.state) {
              this.setState({ color: this.color });
          }
          // Fire color switch event
          this.emit("color:setActive", this.color);
      };
      /**
       * @desc Replace all of the current colorPicker colors
       * @param newColorValues list of new colors to add
       */
      IroColorPicker.prototype.setColors = function setColors (newColorValues, activeColorIndex) {
          var this$1 = this;
          if ( activeColorIndex === void 0 ) activeColorIndex = 0;

          // Unbind color events
          this.colors.forEach(function (color) { return color.unbind(); });
          // Destroy old colors
          this.colors = [];
          // Add new colors
          newColorValues.forEach(function (colorValue) { return this$1.addColor(colorValue); });
          // Reset active color
          this.setActiveColor(activeColorIndex);
          this.emit("color:setAll", this.colors);
      };
      // Public ColorPicker events API
      /**
       * @desc Set a callback function for an event
       * @param eventList event(s) to listen to
       * @param callback - Function called when the event is fired
       */
      IroColorPicker.prototype.on = function on (eventList, callback) {
          var this$1 = this;

          var events = this.events;
          // eventList can be an eventType string or an array of eventType strings
          (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
              // Add event callback
              (events[eventType] || (events[eventType] = [])).push(callback);
              // Call deferred events
              // These are events that can be stored until a listener for them is added
              if (this$1.deferredEvents[eventType]) {
                  // Deffered events store an array of arguments from when the event was called
                  this$1.deferredEvents[eventType].forEach(function (args) {
                      callback.apply(null, args);
                  });
                  // Clear deferred events
                  this$1.deferredEvents[eventType] = [];
              }
          });
      };
      /**
       * @desc Remove a callback function for an event added with on()
       * @param eventList - event(s) to listen to
       * @param callback - original callback function to remove
       */
      IroColorPicker.prototype.off = function off (eventList, callback) {
          var this$1 = this;

          (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
              var callbackList = this$1.events[eventType];
              // this.emitHook('event:off', eventType, callback);
              if (callbackList)
                  { callbackList.splice(callbackList.indexOf(callback), 1); }
          });
      };
      /**
       * @desc Emit an event
       * @param eventType event to emit
       */
      IroColorPicker.prototype.emit = function emit (eventType) {
          var this$1 = this;
          var args = [], len = arguments.length - 1;
          while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

          var activeEvents = this.activeEvents;
          var isEventActive = activeEvents.hasOwnProperty(eventType)
              ? activeEvents[eventType]
              : false;
          // Prevent event callbacks from firing if the event is already active
          // This stops infinite loops if something in an event callback causes the same event to be fired again
          // (e.g. setting the color inside a color:change callback)
          if (!isEventActive) {
              activeEvents[eventType] = true;
              var callbackList = this.events[eventType] || [];
              callbackList.forEach(function (fn) { return fn.apply(this$1, args); });
              activeEvents[eventType] = false;
          }
      };
      /**
       * @desc Emit an event now, or save it for when the relevent event listener is added
       * @param eventType - The name of the event to emit
       */
      IroColorPicker.prototype.deferredEmit = function deferredEmit (eventType) {
          var ref;

          var args = [], len = arguments.length - 1;
          while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
          var deferredEvents = this.deferredEvents;
          (ref = this).emit.apply(ref, [ eventType ].concat( args ));
          (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
      };
      // Public utility methods
      IroColorPicker.prototype.setOptions = function setOptions (newOptions) {
          // Step 1: Filter out internal state fields that shouldn't be set from outside
          var color = newOptions.color;
          var colors = newOptions.colors;
          var layout = newOptions.layout;
          var rest$1 = objectWithoutProperties( newOptions, ["color", "colors", "layout"] );
          var safeOptions = rest$1;
          // Step 2: Check if gamut is being changed
          var gamutChanging = safeOptions.gamut !== undefined &&
              safeOptions.gamut !== this.getCurrentGamut();
          // Step 3: Separate gamut from rest of options
          var gamut = safeOptions.gamut;
          var rest$2 = objectWithoutProperties( safeOptions, ["gamut"] );
          var rest = rest$2;
          // Step 4: Early return if only unchanged gamut is provided
          if (gamut !== undefined &&
              !gamutChanging &&
              Object.keys(rest).length === 0) {
              return;
          }
          if (gamutChanging) {
              // Step 5: Call setGamut with rest to batch updates and emit gamut:change once
              this.setGamut(gamut, rest);
          }
          else {
              // Step 6: Apply only non-gamut options to avoid passing unchanged gamut key
              this.setState(rest);
          }
      };
      /**
       * @desc Resize the color picker
       * @param width - new width
       */
      IroColorPicker.prototype.resize = function resize (width) {
          this.setOptions({ width: width });
      };
      /**
       * @desc Reset the color picker to the initial color provided in the color picker options
       */
      IroColorPicker.prototype.reset = function reset () {
          this.colors.forEach(function (color) { return color.reset(); });
          this.setState({ colors: this.colors });
      };
      /**
       * @desc Set the gamut for all colors in the color picker
       * @param newGamut - the new gamut type to apply
       * @param extraState - optional additional state to update in the same batch
       * @emits gamut:change - Fired once after all colors have been updated with the new gamut
       */
      IroColorPicker.prototype.setGamut = function setGamut (newGamut, extraState) {
          // Update all colors with new gamut in silent mode to avoid multiple onChange callbacks
          this.colors.forEach(function (color) {
              color.setGamutType(newGamut, { silent: true });
          });
          // Comment 1 & 3: Update state in single batch with gamut and any extra options
          this.setState(Object.assign({}, {gamut: newGamut, colors: this.colors}, extraState));
          // Emit aggregated gamut:change event once after all colors updated
          this.emit("gamut:change", newGamut);
      };
      /**
       * @desc Called by the createWidget wrapper when the element is mounted into the page
       * @param container - the container element for this ColorPicker instance
       */
      IroColorPicker.prototype.onMount = function onMount (container) {
          this.el = container;
          this.deferredEmit("mount", this);
      };
      // Internal methods
      /**
       * @desc React to a color update
       * @param color - current color
       * @param changes - shows which h,s,v,a color channels changed
       */
      IroColorPicker.prototype.onColorChange = function onColorChange (color, changes) {
          this.setState({ color: this.color });
          if (this.inputActive) {
              this.inputActive = false;
              this.emit("input:change", color, changes);
          }
          this.emit("color:change", color, changes);
      };
      /**
       * @desc Handle input from a UI control element
       * @param type - event type
       */
      IroColorPicker.prototype.emitInputEvent = function emitInputEvent (type, originId) {
          if (type === 0 /* Start */) {
              this.emit("input:start", this.color, originId);
          }
          else if (type === 1 /* Move */) {
              this.emit("input:move", this.color, originId);
          }
          else if (type === 2 /* End */) {
              this.emit("input:end", this.color, originId);
          }
      };
      // Note: render signature uses 'any' to match Preact's Component base class
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IroColorPicker.prototype.render = function render (props, state) {
          var this$1 = this;

          var actualState = state || this.state;
          var layout = actualState.layout;
          // use layout shorthands
          if (!Array.isArray(layout)) {
              switch (layout) {
                  // TODO: implement some?
                  default:
                      layout = [{ component: IroWheel }, { component: IroSlider }];
              }
              // add transparency slider to the layout
              if (actualState.transparency) {
                  layout.push({
                      component: IroSlider,
                      options: {
                          sliderType: "alpha",
                      },
                  });
              }
          }
          return (_("div", { class: "iro__colorPicker", id: actualState.id, style: {
                  display: actualState.display,
              } }, layout.map(function (ref, componentIndex) {
                  var UiComponent = ref.component;
                  var options = ref.options;

                  return (_(UiComponent, Object.assign({}, actualState, options, { ref: undefined, onInput: this$1.emitInputEvent.bind(this$1), parent: this$1, index: componentIndex })));
          })));
      };

      return IroColorPicker;
  }(x));
  IroColorPicker.defaultProps = {
      colors: [],
      display: "block",
      id: undefined,
      layout: "default",
      margin: 0,
  };
  var IroColorPickerWidget = createWidget(IroColorPicker);

  var iro;
  (function (iro) {
      iro.version = "5.5.2"; // replaced by @rollup/plugin-replace; see rollup.config.js
      iro.Color = IroColor;
      iro.ColorPicker = IroColorPickerWidget;
      var ui;
      (function (ui) {
          ui.h = _;
          ui.ComponentBase = IroComponentWrapper;
          ui.Handle = IroHandle;
          ui.Slider = IroSlider;
          ui.Wheel = IroWheel;
          ui.Box = IroBox;
      })(ui = iro.ui || (iro.ui = {}));
  })(iro || (iro = {}));
  var iro$1 = iro;

  return iro$1;

})));
