!function(t){function n(n){for(var r,u,c=n[0],a=n[1],s=n[2],l=0,d=[];l<c.length;l++)u=c[l],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&d.push(o[u][0]),o[u]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);for(f&&f(n);d.length;)d.shift()();return i.push.apply(i,s||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],r=!0,c=1;c<e.length;c++){var a=e[c];0!==o[a]&&(r=!1)}r&&(i.splice(n--,1),t=u(u.s=e[0]))}return t}var r={},o={0:0},i=[];function u(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,u),e.l=!0,e.exports}u.m=t,u.c=r,u.d=function(t,n,e){u.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,n){if(1&n&&(t=u(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(u.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)u.d(e,r,function(n){return t[n]}.bind(null,r));return e},u.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(n,"a",n),n},u.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},u.p="";var c=window.webpackJsonp=window.webpackJsonp||[],a=c.push.bind(c);c.push=n,c=c.slice();for(var s=0;s<c.length;s++)n(c[s]);var f=a;i.push([119,1]),e()}({119:function(t,n,e){"use strict";e.r(n);e(80);function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e(46),e(86),e(87),e(90),e(63),e(91),e(92),e(93),e(98),e(65),e(66),e(68),e(69),e(70);var o=function(t,n,e,r){return Math.sqrt(Math.pow(t-e,2)+Math.pow(n-r,2))},i=function(t,n,e,r){return Math.atan2(r-n,e-t)},u=function(){var t=i.apply(void 0,arguments);return{x:Math.cos(t),y:Math.sin(t)}},c=function(t){return{x:Math.cos(t),y:Math.sin(t)}};e(103),e(72);function a(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function s(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var f={id:-1,paths:[],r:30,color:"black"},l=function t(){var n=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f.id,r=arguments.length>1?arguments[1]:void 0,o=arguments.length>2?arguments[2]:void 0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f.r,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:f.color,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:f.paths;a(this,t),s(this,"printDot",(function(t){t.gDot(n.x,n.y,n.r,n.color,n.id)})),s(this,"printPaths",(function(t){n.paths.forEach((function(e){e.id;var r=e.x,o=e.y;t.gArrow(n.x,n.y,r,o,n.r)}))})),s(this,"addPath",(function(t){return n.paths.push(t)})),s(this,"setPos",(function(t,e){n.x=t,n.y=e})),this.id=e,this.x=r,this.y=o,this.paths=Array.from(c),this.r=i,this.color=u};function d(t,n,e){return(d=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,e){var r=[null];r.push.apply(r,n);var o=new(Function.bind.apply(t,r));return e&&h(o,e.prototype),o}).apply(null,arguments)}function h(t,n){return(h=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function p(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e(111),e(113),e(114),e(115),e(78),e(117),e(118);function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,n){return!n||"object"!==y(n)&&"function"!=typeof n?g(t):n}function g(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,n){return(m=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function x(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var P=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&m(t,n)}(r,t);var n,e=(n=r,function(){var t,e=w(n);if(b()){var r=w(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return v(this,t)});function r(){var t;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return x(g(t=e.call.apply(e,[this].concat(o))),"gArrow",(function(n,e,r,o){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:f.r,s=20,l=u(n,e,r,o),d=r-l.x*a,h=o-l.y*a,p=r-2*l.x*s,y=o-2*l.y*s,v=c(i(d,h,p,y)-30*Math.PI/180),g=c(i(d,h,p,y)+30*Math.PI/180);return t.gLine(n,e,r,o).gLine(d,h,d+v.x*s,h+v.y*s).gLine(d,h,d+g.x*s,h+g.y*s)})),x(g(t),"gLine",(function(n,e,r,o){return t.beginPath().line(n,e,r,o).closePath().stroke()})),x(g(t),"gDot",(function(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:f.r,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f.color,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return t.save().beginPath().set({fillStyle:"white",strokeStyle:o,font:"30px Arial",textAlign:"center"}).circle(n,e,r).stroke().fill().set("fillStyle",o).fillText(i,n,e+r/4).closePath().restore()})),t}return r}(e(79).CanvasCM),O=function(t){return new P(t)}(document.getElementById("canvas")).setSize(),j=new function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),r(this,"set",(function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e[t]={status:n,obj:r}})),r(this,"statusIs",(function(t,n){var r;return n===(null===(r=e[t])||void 0===r?void 0:r.status)})),r(this,"getObj",(function(t){return void 0!==e[t]?e[t].obj:void 0})),this.x=0,this.y=0,this.mouseDown={status:!1,obj:{}},this.drag={status:!1,obj:{}},this.click={status:!1,obj:{}};var o=n.getBoundingClientRect();n.addEventListener("mousemove",(function(t){e.x=t.clientX-o.left,e.y=t.clientY-o.top}))}(O.get("canvas")),I=new function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),p(this,"dots",[]),p(this,"getById",(function(t){return e.dots.findIndex((function(n){return n.id===t}))})),p(this,"getByCoordinates",(function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:f.r;return e.dots.find((function(e){return o(t,n,e.x,e.y)<=e.r+r}))})),p(this,"getLastId",(function(){var t;return(null===(t=e.dots[e.dots.length-1])||void 0===t?void 0:t.id)||0})),p(this,"add",(function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=d(l,[e.getLastId()+1].concat(n));return e.dots.push(o),o})),p(this,"addPath",(function(t,n){Number.isInteger(t)&&(t=e.dots[e.getById(t)]),Number.isInteger(n)&&(n=e.dots[e.getById(n)]),t.id!==n.id&&t.paths.every((function(t){return t.id!==n.id}))&&t.addPath(n)})),p(this,"removeByCoordinates",(function(t,n){e.dots.some((function(r){return o(t,n,r.x,r.y)<=r.r&&(e.remove(r.id),!0)}))})),p(this,"remove",(function(t){e.dots.splice(e.getById(t),1)})),p(this,"print",(function(){e.dots.forEach((function(t){return t.printPaths(e.$gcanvas)})),e.dots.forEach((function(t){return t.printDot(e.$gcanvas)}))})),p(this,"maximal_independent_set",(function(){var t=[];e.dots.forEach((function(n){return n.paths.forEach((function(e){return t.push([n.id,e.id])}))})),t.forEach((function(n){var e=t.findIndex((function(t){return t[0]===n[1]&&t[1]===n[0]}));e>=0&&t.splice(e,1)})),console.log(t)})),this.$gcanvas=n}(O);function k(){requestAnimationFrame(k),O.clear(),I.print(),j.statusIs("click","dot")&&O.gArrow(j.getObj("click").x,j.getObj("click").y,j.x,j.y,0)}I.add(300,300),I.add(600,300),I.add(600,600),I.add(450,450),I.addPath(1,2),I.addPath(2,3),I.addPath(3,2),I.addPath(2,4),O.on("mousedown",(function(){var t=I.getByCoordinates(j.x,j.y,0);t&&j.set("mousedown","dot",t)})).on("mousemove",(function(){if(j.statusIs("mousedown","dot")&&!j.statusIs("click","dot")){var t=j.getObj("mousedown");j.set("mousedown",!1),j.set("drag","dot",t)}if(j.statusIs("drag","dot")){var n=I.getByCoordinates(j.x,j.y);n&&n.id!==j.getObj("drag").id||j.getObj("drag").setPos(j.x,j.y)}})).on("click",(function(){if(j.statusIs("drag","dot"))j.set("drag",!1);else{j.statusIs("mousedown","dot")&&j.set("mousedown",!1);var t=I.getByCoordinates(j.x,j.y);if(t){I.getByCoordinates(j.x,j.y,0)&&!j.statusIs("click","dot")?j.set("click","dot",t):j.statusIs("click","dot")&&t&&(I.addPath(j.getObj("click"),t),j.set("click",!1))}else{var n=I.add(j.x,j.y);j.statusIs("click","dot")&&(I.addPath(j.getObj("click"),n),j.set("click",!1))}}})).on("contextmenu",(function(t){j.statusIs("click","dot")&&j.set("click",!1),t.preventDefault()})),k(),window.addEventListener("resize",(function(){O.setSize(),k()}))},80:function(t,n,e){}});
//# sourceMappingURL=app.d0c1d08d.js.map