!function(t){function n(n){for(var r,a,u=n[0],c=n[1],s=n[2],l=0,d=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(f&&f(n);d.length;)d.shift()();return i.push.apply(i,s||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],r=!0,u=1;u<e.length;u++){var c=e[u];0!==o[c]&&(r=!1)}r&&(i.splice(n--,1),t=a(a.s=e[0]))}return t}var r={},o={0:0},i=[];function a(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=t,a.c=r,a.d=function(t,n,e){a.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,n){if(1&n&&(t=a(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)a.d(e,r,function(n){return t[n]}.bind(null,r));return e},a.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(n,"a",n),n},a.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},a.p="";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=n,u=u.slice();for(var s=0;s<u.length;s++)n(u[s]);var f=c;i.push([154,1]),e()}({122:function(t,n,e){},154:function(t,n,e){"use strict";e.r(n);e(16),e(40),e(72),e(83),e(117),e(20),e(121),e(122);var r=function(t,n,e,r){return Math.sqrt(Math.pow(t-e,2)+Math.pow(n-r,2))},o=function(t,n,e,r){return Math.atan2(r-n,e-t)},i=function(){var t=o.apply(void 0,arguments);return{x:Math.cos(t),y:Math.sin(t)}},a=function(t){return{x:Math.cos(t),y:Math.sin(t)}};function u(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e(57);function c(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var f=function(){function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),s(this,"status",void 0),s(this,"set",(function(t){return e.status=t})),s(this,"clear",(function(){e.status="",e.field.innerText=""})),this.field=n}var n,e,r;return n=t,(e=[{key:"print",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];!1!==t&&this.set(t);var n="";0===t.length?n="Пустое множество":Array.isArray(t)?(t.map((function(t){return t.sort((function(t,n){return t-n}))})).sort((function(t,n){return t.length-n.length||t[0]-n[0]})).map((function(t){var e="",r="";t.forEach((function(t){e+=t+", ",r+=t+","})),e=e.substring(0,e.length-2),r=r.substring(0,r.length-1),n+="<li data-array='"+r+"'>"+e+";</li>"})),n="<ul>"+n+"</ul>"):n=t,this.field.innerHTML=n}}])&&c(n.prototype,e),r&&c(n,r),t}();e(88),e(91),e(92),e(93),e(125),e(126),e(127),e(128),e(94),e(130),e(59),e(133),e(135),e(136),e(137),e(138),e(139),e(143),e(145),e(98),e(99),e(100),e(148),e(62),e(101);function l(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function d(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var h={id:-1,paths:[],r:30,color:"black"},p=function t(){var n=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h.id,r=arguments.length>1?arguments[1]:void 0,o=arguments.length>2?arguments[2]:void 0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:h.r,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:h.color,u=arguments.length>5&&void 0!==arguments[5]?arguments[5]:h.paths;l(this,t),d(this,"printDot",(function(t){t.gDot(n.x,n.y,n.r,n.color,n.id)})),d(this,"printPaths",(function(t){n.paths.forEach((function(e){e.id;var r=e.x,o=e.y;t.gArrow(n.x,n.y,r,o,n.r)}))})),d(this,"addPath",(function(t){return n.paths.push(t)})),d(this,"setPos",(function(t,e){n.x=t,n.y=e})),this.id=e,this.x=r,this.y=o,this.paths=Array.from(u),this.r=i,this.color=a};function v(t){return function(t){if(Array.isArray(t))return y(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return y(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return y(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function g(t,n,e){return(g=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,e){var r=[null];r.push.apply(r,n);var o=new(Function.bind.apply(t,r));return e&&b(o,e.prototype),o}).apply(null,arguments)}function b(t,n){return(b=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function m(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function w(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function x(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function P(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function E(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e(151),e(153);function O(t){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function I(t,n){return!n||"object"!==O(n)&&"function"!=typeof n?j(t):n}function j(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function _(t){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function S(t,n){return(S=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function A(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var B=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&S(t,n)}(r,t);var n,e=(n=r,function(){var t,e=_(n);if(k()){var r=_(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return I(this,t)});function r(){var t;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,r);for(var n=arguments.length,u=new Array(n),c=0;c<n;c++)u[c]=arguments[c];return A(j(t=e.call.apply(e,[this].concat(u))),"gArrow",(function(n,e,r,u){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:h.r,s=20,f=i(n,e,r,u),l=r-f.x*c,d=u-f.y*c,p=r-2*f.x*s,v=u-2*f.y*s,y=a(o(l,d,p,v)-30*Math.PI/180),g=a(o(l,d,p,v)+30*Math.PI/180);return t.gLine(n,e,r,u).gLine(l,d,l+y.x*s,d+y.y*s).gLine(l,d,l+g.x*s,d+g.y*s)})),A(j(t),"gLine",(function(n,e,r,o){return t.beginPath().line(n,e,r,o).closePath().stroke()})),A(j(t),"gDot",(function(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h.r,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:h.color,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return t.save().beginPath().set({fillStyle:"white",strokeStyle:o,font:"30px Arial",textAlign:"center"}).circle(n,e,r).stroke().fill().set("fillStyle",o).fillText(i,n,e+r/4).closePath().restore()})),t}return r}(e(102).CanvasCM);function L(t,n,e,r,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void e(t)}u.done?n(c):Promise.resolve(c).then(r,o)}var T=function(t){return new B(t)}(document.getElementById("canvas")).setSize(),C=new function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,"set",(function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e[t]={status:n,obj:r}})),u(this,"statusIs",(function(t,n){var r;return n===(null===(r=e[t])||void 0===r?void 0:r.status)})),u(this,"getObj",(function(t){return void 0!==e[t]?e[t].obj:void 0})),this.x=0,this.y=0;var r=n.getBoundingClientRect();n.addEventListener("mousemove",(function(t){e.x=t.clientX-r.left,e.y=t.clientY-r.top}))}(T.get("canvas")),D=new function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),m(this,"dots",[]),m(this,"getIndexById",(function(t){return e.dots.findIndex((function(n){return n.id===t}))})),m(this,"getDotById",(function(t){return e.dots[e.getIndexById(t)]})),m(this,"getByCoordinates",(function(t,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return o=Object.assign({r:h.r,except:[]},o),e.dots.find((function(e){return r(t,n,e.x,e.y)<=e.r+o.r&&!o.except.includes(e.id)}))})),m(this,"getLastId",(function(){var t;return(null===(t=e.dots[e.dots.length-1])||void 0===t?void 0:t.id)||0})),m(this,"add",(function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=g(p,[e.getLastId()+1].concat(n));return e.dots.push(o),o})),m(this,"addDots",(function(t){return t.forEach((function(t){return e.add.apply(e,v(t))}))})),m(this,"addPath",(function(t,n){Number.isInteger(t)&&(t=e.getDotById(t)),Number.isInteger(n)&&(n=e.getDotById(n)),void 0!==t&&void 0!==n?t.id!==n.id&&t.paths.every((function(t){return t.id!==n.id}))&&t.addPath(n):console.warn("Dots::addPath",t,n)})),m(this,"addPaths",(function(t){return t.forEach((function(t){return e.addPath.apply(e,v(t))}))})),m(this,"remove",(function(t){e.dots.splice(e.getIndexById(t),1)})),m(this,"clear",(function(){return e.dots=[]})),m(this,"print",(function(){e.dots.forEach((function(t){return t.printPaths(e.$gcanvas)})),e.dots.forEach((function(t){return t.printDot(e.$gcanvas)}))})),m(this,"internal_stability",(function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(t=!t,0===e.dots.length)return[];var n=[],r=[],o=[],i=e.dots.map((function(t){return t.id}));if(e.dots.forEach((function(t){return t.paths.forEach((function(e){return n.push([t.id,e.id])}))})),0===n.length)return[i.map((function(t){return t}))];n.forEach((function(t){var e=n.findIndex((function(n){return n[0]===t[1]&&n[1]===t[0]}));e>=0&&n.splice(e,1)}));var a=e.dots.length,u=function n(e){var i,u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;e.length-1===u?e[u].forEach((function(n){if(i=o.includes(n),t||o.length+!i<=a){!t&&o.length+!i<a&&(a=o.length+!i,r=[]);var e=i?[].concat(o):[].concat(o,[n]);!r.some((function(t){return t.every((function(t){return e.includes(t)}))}))&&r.push(e)}})):e[u].forEach((function(r){i=o.includes(r),(t||o.length+!i<=a)&&(i||o.push(r),n(e,u+1),i||o.pop())}))};return u(n),r.map((function(t){return i.filter((function(n){return-1===t.findIndex((function(t){return t===n}))}))})).reverse()})),m(this,"external_stability",(function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(0===e.dots.length)return[];var n=[],r=[],o=[],i=e.dots.map((function(t){return t.id}));if(e.dots.forEach((function(t){return n.push([t.id].concat(v(t.paths.map((function(t){return t.id})))))})),0===n.length)return[i.map((function(t){return t}))];n.forEach((function(t,n,e){for(var r=n+1;r<e.length;r++)e[r].length===t.length&&e[r].every((function(n){return t.includes(n)}))&&e.splice(r,1)}));var a=function t(n){var e,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;n.length-1===i?n[i].forEach((function(t){var n=(e=o.includes(t))?[].concat(o):[].concat(o,[t]);!r.some((function(t){return n.length>=t.length&&t.every((function(t){return n.includes(t)}))}))&&(r=r.filter((function(t){return t.length<=n.length||!n.every((function(n){return t.includes(n)}))}))).push(n)})):n[i].forEach((function(r){(e=o.includes(r))||o.push(r),t(n,i+1),e||o.pop()}))};if(a(n),t){var u=r.reduce((function(t,n){return n.length<t?n.length:t}),r[0].length);return r.filter((function(t){return t.length===u}))}return r})),m(this,"cores",(function(){var t=e.internal_stability(),n=e.external_stability();if(t.reduce((function(t,n){return n.length<t?n.length:t}),t[0].length)<t.reduce((function(t,n){return n.length<t?n.length:t}),t[0].length))return[];var r=[];return t.forEach((function(t){n.some((function(n){return n.length===t.length&&n.every((function(n){return t.includes(n)}))}))&&r.push(t)})),r})),this.$gcanvas=n}(T),M=new f(document.getElementById("status"));new function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),E(this,"demo1",(function(){e.dots.clear(),e.dots.addDots([[50,150],[200,150],[200,300],[75,350],[300,350],[300,50],[300,150],[350,200],[300,250],[100,250]]),e.dots.addPaths([[1,2],[1,10],[1,4],[2,3],[3,2],[3,5],[3,4],[2,4],[5,2],[5,4],[6,2],[6,7],[7,8],[8,5],[8,9],[9,5],[10,4]])})),E(this,"demo2",(function(){e.dots.clear(),e.dots.addDots([[300,300],[600,300],[600,600],[300,600]]),e.dots.addPaths([[1,2],[1,3],[1,4],[2,1],[3,1],[4,3]])})),this.dots=n}(D).demo1();var R,N,U,J,$=new function t(n){var e=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),w(this,"save",(function(t){e.store[t]=e.dots.dots.map((function(t){return{id:t.id,x:t.x,y:t.y,paths:t.paths.map((function(t){return t.id}))}})),e.update()})),w(this,"load",(function(t){var n=e.store[t];return!!n&&(e.dots.clear(),n.forEach((function(t){var n=t.x,r=t.y;return e.dots.add(n,r)})),n.forEach((function(t){var n=t.id;return t.paths.forEach((function(t){return e.dots.addPath(n,t)}))})),!0)})),w(this,"canLoad",(function(t){return!!e.store[t]})),w(this,"update",(function(){window.localStorage.setItem("graphs",JSON.stringify(e.store))})),w(this,"delete",(function(t){delete e.store[t]})),w(this,"clear",(function(){e.store=[],e.update()})),this.dots=n,this.store=window.localStorage.getItem("graphs"),this.store||(this.store=[]);try{this.store=JSON.parse(this.store)}catch(t){this.store=[]}this.update()}(D),z=new function t(){var n=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"askPopUp";x(this,t),P(this,"ask",(function(t){return n.buttons_container.innerHTML="",t.forEach((function(t){var e=t.value,r=t.text,o=document.createElement("button");o.classList.add(".ask-button"),o.value=e,o.innerText=r,n.buttons_container.appendChild(o)})),n.container.classList.remove("hidden"),new Promise((function(t,e){n.buttons_container.addEventListener("click",(function(r){var o=r.target;try{"BUTTON"===o.tagName&&(n.container.classList.add("hidden"),t(o.value))}catch(t){e(t)}}),{once:!0})}))})),this.container=document.getElementById(e),this.buttons_container=this.container.getElementsByClassName("js-askPopUp-container")[0]};T.on("mousedown",(function(){var t=D.getByCoordinates(C.x,C.y,{r:0});t&&C.set("mousedown","dot",t)})).on("mousemove",(function(){if(C.statusIs("mousedown","dot")&&!C.statusIs("click","dot")){var t=C.getObj("mousedown");C.set("mousedown",!1),C.set("drag","dot",t)}if(C.statusIs("drag","dot")){var n=C.getObj("drag").id,e=D.getByCoordinates(C.x,C.y,{except:[n]});e&&e.id!==n||C.getObj("drag").setPos(C.x,C.y)}})).on("click",(function(){if(C.statusIs("drag","dot"))C.set("drag",!1);else{C.statusIs("mousedown","dot")&&C.set("mousedown",!1);var t=D.getByCoordinates(C.x,C.y);if(t){D.getByCoordinates(C.x,C.y,{r:0})&&!C.statusIs("click","dot")?C.set("click","dot",t):C.statusIs("click","dot")&&t&&(D.addPath(C.getObj("click"),t),C.set("click",!1))}else{var n=D.add(C.x,C.y);C.statusIs("click","dot")&&(D.addPath(C.getObj("click"),n),C.set("click",!1))}}})).on("contextmenu",(function(t){C.statusIs("click","dot")&&C.set("click",!1),t.preventDefault()})),R=[{id:"canvas-storage",func:(J=document.getElementById("canvas-saves"),function(){return J.classList.toggle("hidden")})},{id:"canvas-saves",func:(N=regeneratorRuntime.mark((function t(n){var e,r,o,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("BUTTON"!==(e=n.target).tagName){t.next=14;break}if(r=e.getAttribute("data-save"),o={save:function(){$.save(r)},rewrite:function(){$.save(r)},load:function(){$.load(r)},delete:function(){$.delete(r)},close:function(){}},$.canLoad(r)){t.next=10;break}return t.next=7,z.ask([{value:"save",text:"Сохранить"},{value:"close",text:"Закрыть"}]);case 7:i=t.sent,t.next=13;break;case 10:return t.next=12,z.ask([{value:"rewrite",text:"Перезаписать"},{value:"load",text:"Загрузить"},{value:"delete",text:"Удалить"},{value:"close",text:"Закрыть"}]);case 12:i=t.sent;case 13:o[i]();case 14:case"end":return t.stop()}}),t)})),U=function(){var t=this,n=arguments;return new Promise((function(e,r){var o=N.apply(t,n);function i(t){L(o,e,r,i,a,"next",t)}function a(t){L(o,e,r,i,a,"throw",t)}i(void 0)}))},function(t){return U.apply(this,arguments)})},{id:"canvas-clear",func:function(){D.clear(),M.clear()}},{id:"canvas-internal_stability",func:function(){return M.print(D.internal_stability())}},{id:"canvas-maximal_internal_stability",func:function(){return M.print(D.internal_stability(!0))}},{id:"canvas-external_stability",func:function(){return M.print(D.external_stability())}},{id:"canvas-minimal_external_stability",func:function(){return M.print(D.external_stability(!0))}},{id:"canvas-cores",func:function(){return M.print(D.cores())}}],Array.isArray(R)||(R=[R]),R.forEach((function(t){var n=t.id,e=t.func;return document.getElementById(n).addEventListener("click",e)})),M.field.addEventListener("mouseover",(function(t){var n=t.target;if("LI"===n.tagName){var e=n.getAttribute("data-array").split(",");e.forEach((function(t){return D.getDotById(parseInt(t)).color="#DD1C1A"})),n.addEventListener("mouseleave",(function(){return e.forEach((function(t){return D.getDotById(parseInt(t)).color="black"}),{once:!0})}))}})),function t(){requestAnimationFrame(t),T.clear(),D.print(),C.statusIs("click","dot")&&T.gArrow(C.getObj("click").x,C.getObj("click").y,C.x,C.y,0)}(),window.addEventListener("resize",(function(){return T.setSize()}))}});
//# sourceMappingURL=app.bb5d11e0.js.map