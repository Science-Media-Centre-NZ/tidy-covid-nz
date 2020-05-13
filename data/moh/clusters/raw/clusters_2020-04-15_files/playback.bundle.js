// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
!function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return l}));var s=["January","February","March","April","May","June","July","August","September","October","November","December"],i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],o={Y:function(e){return e.getUTCFullYear()},m:function(e){return e.getUTCMonth()+1},b:function(e){return i[e.getUTCMonth()]},B:function(e){return s[e.getUTCMonth()]},d:function(e){return e.getUTCDate()},H:function(e){return("0"+e.getUTCHours()).slice(-2)},M:function(e){return("0"+e.getUTCMinutes()).slice(-2)},S:function(e){return("0"+e.getUTCSeconds()).slice(-2)},"%":function(){return"%"}};function r(e){var t=function(e){return"number"==typeof e&&(e=e.toString()),[e.slice(-14,-10),e.slice(-10,-8),e.slice(-8,-6),e.slice(-6,-4),e.slice(-4,-2),e.slice(-2)]}(e);return new Date(Date.UTC(t[0],t[1]-1,t[2],t[3],t[4],t[5]))}function a(e){return i[e]}function l(e,t){return t.replace(/%./g,(function(t){var n=o[t[1]];return n?n(r(e)):t}))}},function(e,t,n){"use strict";n.r(t);var s=n(0);function i(e,t){return(e=e.toString()).length>=t?e:"00000000".substring(0,t-e.length)+e}function o(e){for(var t=0,n=0;n<e.length;n++)t=Math.max(t,Math.max.apply(null,e[n][1]));if(function(e){for(var t=0,n=1e3,s=0;s<e.length;s++){var i=e[s];t=Math.max(t,Math.max.apply(null,i[1])),n=Math.min(n,Math.min.apply(null,i[1].filter(Boolean)))}return Math.log1p(t)-Math.log1p(n)>3}(e)){var s=[];for(n=0;n<e.length;n++){var i=e[n];s.push([i[0],i[1].map(Math.log1p)])}e=s,t=Math.log1p(t)}return[e,t]}function r(e,t,n,s,i){var o;if((o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange=function(){4==this.readyState&&n(o)},o.open(e,t,!0),s)for(var r in s)s.hasOwnProperty(r)&&o.setRequestHeader(r,s[r]);o.withCredentials=!0,o.send(i)}function a(e,t,n){var i=n("wm-capresources");i.innerHTML="";var o=n("wm-capresources-loading");o.style.display="block";var a=s.c(e).getTime(),l=0;t=window.location.origin+t;for(var c=[],p=d(window,"img"),f=0,m=p.length;f<m;f++)p[f].src&&!p[f].src.startsWith(t)&&p[f].src.startsWith(window.location.origin)&&!p[f].src.startsWith("data:")&&c.push(p[f].src);var g=d(window,"frame");for(f=0,m=g.length;f<m;f++)g[f].src&&c.push(g[f].src);var v=d(window,"iframe");for(f=0,m=v.length;f<m;f++)!v[f].src||v[f].id&&"playback"===v[f].id||c.push(v[f].src);var y=d(window,"script");for(f=0,m=y.length;f<m;f++)y[f].src&&!y[f].src.startsWith(t)&&y[f].src.startsWith(window.location.origin)&&c.push(y[f].src);var w=d(window,"link");for(f=0,m=w.length;f<m;f++)w[f].href&&!w[f].href.startsWith(t)&&w[f].href.startsWith(window.location.origin)&&w[f].rel&&"stylesheet"==w[f].rel&&c.push(w[f].href);var b=c.filter((function(e,t,n){return n.indexOf(e)===t}));b.length>0?(l=0,b.map((function(e){e.match("^https?://")&&(l++,r("HEAD",e,(function(e){if(200==e.status){var t=e.getResponseHeader("Memento-Datetime");if(null==t)console.log("%s: no Memento-Datetime",d);else{var n=document.createElement("span"),s=function(e,t){var n=new Date(e).getTime()-t,s="";n<0?(s+="-",n=Math.abs(n)):s+="+";var i=!1;if(n<1e3)return{delta:n,text:"",highlight:i};var o=n,r=Math.floor(n/1e3/60/60/24/30/12);n-=1e3*r*60*60*24*30*12;var a=Math.floor(n/1e3/60/60/24/30);n-=1e3*a*60*60*24*30;var l=Math.floor(n/1e3/60/60/24);n-=1e3*l*60*60*24;var c=Math.floor(n/1e3/60/60);n-=1e3*c*60*60;var u=Math.floor(n/1e3/60);n-=1e3*u*60;var h=Math.floor(n/1e3),d=[];r>1?(d.push(r+" years"),i=!0):1==r&&(d.push(r+" year"),i=!0);a>1?(d.push(a+" months"),i=!0):1==a&&(d.push(a+" month"),i=!0);l>1?d.push(l+" days"):1==l&&d.push(l+" day");c>1?d.push(c+" hours"):1==c&&d.push(c+" hour");u>1?d.push(u+" minutes"):1==u&&d.push(u+" minute");h>1?d.push(h+" seconds"):1==h&&d.push(h+" second");d.length>2&&(d=d.slice(0,2));return{delta:o,text:s+d.join(" "),highlight:i}}(t,a),r=s.highlight?"color:red;":"";n.innerHTML=" "+s.text,n.title=t,n.setAttribute("style",r);var c=e.getResponseHeader("Content-Type"),d=e.responseURL.replace(window.location.origin,""),p=document.createElement("a");p.innerHTML=d.split("/").splice(3).join("/"),p.href=d,p.title=c,p.onmouseover=u,p.onmouseout=h;var f=document.createElement("div");f.setAttribute("data-delta",s.delta),f.appendChild(p),f.append(n),i.appendChild(f);var m=Array.prototype.slice.call(i.childNodes,0);m.sort((function(e,t){return t.getAttribute("data-delta")-e.getAttribute("data-delta")})),i.innerHTML="";for(var g=0,v=m.length;g<v;g++)i.appendChild(m[g])}}0==--l&&(o.style.display="none")})))}))):(i.innerHTML="There are no sub-resources in the page.",o.style.display="none")}function l(e,t){for(var n=t.split("/").splice(6).join("/"),s=e.document.querySelectorAll("img[src$='"+n+"'], iframe[src$='"+n+"'], frame[src$='"+n+"']"),i=Array.prototype.slice.call(s),o=0;o<e.frames.length;o++)try{var r=l(e.frames[o].window,t);i=i.concat(r)}catch(e){}return i}function c(e){return"FRAME"==e.tagName||"IFRAME"==e.tagName?e.contentWindow.document.documentElement:e}function u(e){var t=l(window,e.target.href);if(t.length>0)for(var n=0;n<t.length;n++)c(t[n]).classList.add("wb-highlight")}function h(e){var t=l(window,e.target.href);if(t.length>0)for(var n=0;n<t.length;n++)c(t[n]).classList.remove("wb-highlight")}function d(e,t){for(var n=e.document.getElementsByTagName(t),s=Array.prototype.slice.call(n),i=0;i<e.frames.length;i++)try{var o=d(e.frames[i].window,t);s=s.concat(o)}catch(e){}return s}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function g(e,t,n){return t&&m(e.prototype,t),n&&m(e,n),e}function v(e,t){return e.classList?e.classList.contains(t):new RegExp("\\b"+t+"\\b").test(e.className)}function y(e,t,n){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n)}function w(e,t,n){e.detachEvent?e.detachEvent("on"+t,n):e.removeEventListener(t,n)}function b(e,t,n,s){y(s||document,t,(function(t){for(var s,i=t.target||t.srcElement;i&&!(s=v(i,e));)i=i.parentElement;s&&n.call(i,t)}))}var M,C,T=function(){function e(t,n){f(this,e),this.input=t,this.source=0,this.minChars=3,this.delay=150,this.offsetLeft=0,this.offsetTop=0,this.cache=!0,this.menuClass="",Object.assign(this,n),this.root=this.input.getRootNode(),this.cache&&(this.cache={}),this.sc=document.createElement("div"),this.sc.className="wb-autocomplete-suggestions "+this.menuClass,this.root.appendChild(this.sc);this.selector;this.autocompleteAttr=t.getAttribute("autocomplete"),t.setAttribute("autocomplete","off"),this.last_val="",this.updateSC=this.updateSC.bind(this),this.blurHandler=this.blurHandler.bind(this),this.keydownHandler=this.keydownHandler.bind(this),this.keyupHandler=this.keyupHandler.bind(this),this.focusHandler=this.focusHandler.bind(this),y(window,"resize",this.updateSC),y(t,"blur",this.blurHandler),y(t,"keydown",this.keydownHandler),y(t,"keyup",this.keyupHandler),this.minChars||y(t,"focus",this.focusHandler);var s=this;b("wb-autocomplete-suggestion","mouseleave",(function(e){var t=s.sc.querySelector(".autocomplete-suggestion.selected");t&&setTimeout((function(){t.className=t.className.replace("selected","")}),20)}),this.sc),b("wb-autocomplete-suggestion","mouseover",(function(e){var t=s.sc.querySelector(".wb-autocomplete-suggestion.selected");t&&(t.className=t.className.replace("selected","")),this.className+=" selected"}),this.sc),b("wb-autocomplete-suggestion","mousedown",(function(e){if(v(this,"wb-autocomplete-suggestion")){var t=this.getAttribute("data-val");s.input.value=t,s.onSelect(e,t,this),s.sc.style.display="none"}}),this.sc)}return g(e,[{key:"unload",value:function(){w(window,"resize",this.updateSC),w(this.input,"blur",this.blurHandler),w(this.input,"focus",this.focusHandler),w(this.input,"keydown",this.keydownHandler),w(this.input,"keyup",this.keyupHandler),this.autocompleteAttr?this.setAttribute("autocomplete",this.autocompleteAttr):this.removeAttribute("autocomplete"),this.root.removeChild(this.sc)}},{key:"updateSC",value:function(e,t){var n=this.input.getBoundingClientRect();if(this.sc.style.left=Math.round(n.left+(window.pageXOffset||document.documentElement.scrollLeft)+this.offsetLeft)+"px",this.sc.style.top=Math.round(n.bottom+(window.pageYOffset||document.documentElement.scrollTop)+this.offsetTop)+"px",this.sc.style.width=Math.round(n.right-n.left)+"px",!e)if(this.sc.style.display="block",this.sc.maxHeight||(this.sc.maxHeight=parseInt((window.getComputedStyle?getComputedStyle(this.sc,null):this.sc.currentStyle).maxHeight)),this.sc.suggestionHeight||(this.sc.suggestionHeight=this.sc.querySelector(".wb-autocomplete-suggestion").offsetHeight),this.sc.suggestionHeight)t||(this.sc.scrollTop=0);else{var s=this.sc.scrollTop,i=t.getBoundingClientRect().top-this.sc.getBoundingClientRect().top;i+this.sc.suggestionHeight-this.sc.maxHeight>0?this.sc.scrollTop=i+this.sc.suggestionHeight+s-this.sc.maxHeight:i<0&&(this.sc.scrollTop=i+s)}}},{key:"blurHandler",value:function(){var e=this;try{var t=this.root.querySelector(".wb-autocomplete-suggestions:hover")}catch(e){t=null}t?this.input!==document.activeElement&&setTimeout((function(){return e.focus()}),20):(this.last_val=this.input.value,this.sc.style.display="none",setTimeout((function(){return e.sc.style.display="none"}),350))}},{key:"suggest",value:function(e){var t=this.input.value;if(this.cache[t]=e,e.length&&t.length>=this.minChars){for(var n="",s=0;s<e.length;s++)n+=this.renderItem(e[s],t);this.sc.innerHTML=n,this.updateSC(0)}else this.sc.style.display="none"}},{key:"keydownHandler",value:function(e){var t,n=this,s=window.event?e.keyCode:e.which;if((40==s||38==s)&&this.sc.innerHTML)return(i=this.sc.querySelector(".wb-autocomplete-suggestion.selected"))?(t=40==s?i.nextSibling:i.previousSibling)?(i.className=i.className.replace("selected",""),t.className+=" selected",this.input.value=t.getAttribute("data-val")):(i.className=i.className.replace("selected",""),this.input.value=this.last_val,t=0):((t=40==s?this.sc.querySelector(".wb-autocomplete-suggestion"):this.sc.childNodes[this.sc.childNodes.length-1]).className+=" selected",this.input.value=t.getAttribute("data-val")),this.updateSC(0,t),!1;if(27==s)this.value=this.last_val,this.sc.style.display="none";else if(13==s||9==s){var i;(i=this.sc.querySelector(".wb-autocomplete-suggestion.selected"))&&"none"!=this.sc.style.display&&(this.onSelect(e,i.getAttribute("data-val"),i),setTimeout((function(){n.sc.style.display="none"}),20))}}},{key:"keyupHandler",value:function(e){var t=this,n=window.event?e.keyCode:e.which;if(!n||(n<35||n>40)&&13!=n&&27!=n){var s=this.input.value;if(s.length>=this.minChars){if(s!=this.last_val){if(this.last_val=s,clearTimeout(this.timer),this.cache){if(s in this.cache)return void this.suggest(this.cache[s]);for(var i=1;i<s.length-this.minChars;i++){var o=s.slice(0,s.length-i);if(o in this.cache&&!this.cache[o].length)return void this.suggest([])}}this.timer=setTimeout((function(){t.source(s,t.suggest.bind(t))}),this.delay)}}else this.last_val=s,this.sc.style.display="none"}}},{key:"focusHandler",value:function(e){this.last_val="\n",this.keyupHandler(e)}},{key:"renderItem",value:function(e,t){t=t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");var n=new RegExp("("+t.split(" ").join("|")+")","gi");return'<div class="wb-autocomplete-suggestion" data-val="'+e+'">'+e.replace(n,"<b>$1</b>")+"</div>"}},{key:"onSelect",value:function(e,t,n){}}]),e}(),H=function(){function e(t,n){f(this,e);var s=t.getRootNode();if(s.querySelector){var i="object"==p(t)?[t]:s.querySelectorAll(t);this.elems=i.map((function(e){return new T(e,n)}))}}return g(e,[{key:"destroy",value:function(){for(;this.elems.length>0;)this.elems.pop().unload()}}]),e}(),S="undefined"!=typeof __wbhack?__wbhack.JSON:JSON,x=document,k=document,L=function(e){return k.getElementById(e)};var E,_="/static/";function A(e){M.classList.contains("wm-closed")?(e&&C.classList.add("notice-only"),M.classList.replace("wm-closed","wm-open"),C.style.display="block",a(E,_,L)):(M.classList.replace("wm-open","wm-closed"),C.style.display="none",C.classList.remove("notice-only"))}function N(e){return void 0!==e&&e&&e.constructor===Array}function R(e,t){var n=L(e);n&&(n.style.visibility=t?"visible":"hidden")}function U(e,t){var n=L(e);n&&(n.style.display=t)}function O(e){N(e)||(e=[e]);for(var t=0;t<e.length;t++)U(e[t],"inline-block")}function j(e){N(e)||(e=[e]);for(var t=0;t<e.length;t++)U(e[t],"none")}function D(e,t){N(e)||(e=[e]);for(var n=0;n<e.length;n++)R(e[n],t)}function I(){j(["wm-save-snapshot-open","wm-save-snapshot-in-progress"]),O("wm-sign-in")}var q=/web\/(\d*)\/http:\/\/web\.archive\.org\/screenshot/g;function F(e){return document.cookie.search(e)>=0}document.addEventListener("DOMContentLoaded",(function(){F("logged-in-user")&&F("logged-in-sig")?(O("wm-save-snapshot-open"),j("wm-sign-in")):I()})),window.__wm={bt:function(e,t,n,a,l,c,u,h,d,p){_=d||"/static/",E=u;var f,m,g,v="/"+(l||"web")+"/",y=s.c(E),w=y.getUTCFullYear(),b=y.getUTCMonth()+1,T=y.getUTCDate(),N=-1,R=-1,U=L("wm-ipp-base");if(U.attachShadow){var O=U.attachShadow({mode:"closed"});for(k=O;U.children.length>0;)O.appendChild(U.children[0]);if(p)for(var j=0;j<p.length;j++){var I=x.createElement("link");I.setAttribute("rel","stylesheet"),I.setAttribute("type","text/css"),I.setAttribute("href",p[j]),O.appendChild(I)}}window.top==window.self&&(U.style.display="block");var F=!1,B=!0,P=document.getElementById("donato");if(P)if(window.top!=window.self)P.style.display="none";else{var Y=document.getElementById("donato-base");window.addEventListener("message",(function(e){if(-1!==e.origin.indexOf("archive.org")){var t="string"==typeof e.data?S.parse(e.data):e.data;if(console.log("got message %o",t),"set height"==t.event){var n=t.value,s=t.bannerHeight;if("number"!=typeof n||n<=0)return;if(!B)return;if(prevHeight=t.value,F)return;P.style.height=s+"px",Y.style.height=n+"px"}else if("open modal"==t.event)Y.style.height="",document.body.classList.add("wm-modal"),window.scrollTo(0,0),F=!0;else if("close modal"==t.event)P.style.marginBottom="0px",document.body.classList.remove("wm-modal"),F=!1;else if("hide banner"==t.event){P.style.height=0;var i=new Date(Date.now()+24*t.value*3600*1e3);document.cookie="donation=x; domain=archive.org; path=/; expires="+i.toUTCString(),B=!1,F=!1,prevHeight=0}}}),!1)}var X=L("wm-ipp-sparkline");function W(e){var t="mouseenter"==e.type?1:0;if(t!==f){var n=L("wm-ipp"),o=L("displayYearEl"),r=L("displayMonthEl"),a=L("displayDayEl");t?n.className="hi":(n.className="",o.innerHTML=w,r.innerHTML=s.b(b-1),a.innerHTML=i(T,2)),m.style.display=t?"inline":"none",g.style.display=t?"inline":"none",f=t}}M=L("wm-expand"),C=L("wm-capinfo"),(m=x.createElement("div")).className="yt",m.style.display="none",m.style.width=n+"px",m.style.height=t+"px",(g=x.createElement("div")).className="mt",g.style.display="none",g.style.width=a+"px",g.style.height=t+"px",X.appendChild(m),X.appendChild(g);var J=L("wm-sparkline-canvas");X.onmouseenter=W,X.onmouseleave=W,X.onmousemove=function(t){var o,r,l=X,u=function(e){var t=0;return e.pageX||e.pageY?t=e.pageX:(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft),t}(t),d=(o=l,r=x.documentElement,("undefied"!=typeof o.getBoundingClientRect?o.getBoundingClientRect():{top:0,left:0}).left+(window.pageXOffset||r.scrollLeft)-(r.clientLeft||0)),p=Math.min(Math.max(0,u-d),e),f=p%n,y=Math.floor(p/n),w=Math.min(11,Math.floor(f/a)),b=12*y+w,M=f%2==1?15:1,C=i(y+h)+i(w+1,2)+i(M,2)+"000000";L("displayYearEl").innerHTML=y+h,L("displayMonthEl").innerHTML=s.b(w);var T=v+C+"/"+c;if(L("wm-graph-anchor").href=T,N!=y){var H=y*n;m.style.left=H+"px",N=y}if(R!=b){var S=y+b*a+1;g.style.left=S+"px",R=b}};var $=L("wm-sparkline-canvas");if($.getContext&&$.getContext("2d")){r("GET","/__wb/sparkline?output=json&url="+encodeURIComponent(c)+(l&&"&collection="+l||""),(function(n){if(200==n.status){for(var i=S.parse(n.responseText),r=i.years,a=Object.getOwnPropertyNames(r),l=i.years=[],u=0;u<a.length;u++){var d=a[u];r[d]&&l.push([d,r[d]])}!function(e){for(var t=L("wm-nav-captures"),n=0,i=e.years,o=e.first_ts,r=e.last_ts,a=0;a<i.length;a++)for(var l=i[a][1],u=0;u<l.length;u++)n+=l[u];var h='<a class="t" href="'+v+"*/"+c+'" title="See a list of every capture for this URL">'+((""+n).replace(/\B(?=(\d{3})+$)/g,",")+" ")+(n>1?"captures":"capture")+"</a>",d=s.a(o,"%d %b %Y");r!=o&&(d+=" - "+s.a(r,"%d %b %Y")),h+='<div class="r" title="Timespan for captures of this URL">'+d+"</div>",t.innerHTML=h}(i),function(e,t,n,s,i,r,a){var l=s.getContext("2d");if(l){l.fillStyle="#FFF";var c=(new Date).getUTCFullYear(),u=t/(c-i+1),h=o(e.years),d=h[0],p=n/h[1];if(r>=i){var f=T(r);l.fillStyle="#FFFFA5",l.fillRect(f,0,u,n)}for(var m=i;m<=c;m++){f=T(m);l.beginPath(),l.moveTo(f,0),l.lineTo(f,n),l.lineWidth=1,l.strokeStyle="#CCC",l.stroke()}a=parseInt(a)-1;for(var g=(u-1)/12,v=0;v<d.length;v++){m=d[v][0];for(var y=d[v][1],w=T(m)+1,b=0;b<12;b++){var M=y[b];if(M>0){var C=Math.ceil(M*p);l.fillStyle=m==r&&b==a?"#EC008C":"#000",l.fillRect(Math.round(w),Math.ceil(n-C),Math.ceil(g),Math.round(C))}w+=g}}}function T(e){return Math.ceil((e-i)*u)+.5}}(i,e,t,$,h,w,b)}}))}else{var z=new Image;z.src="/__wb/sparkline?url="+encodeURIComponent(c)+"&width="+e+"&height="+t+"&selected_year="+w+"&selected_month="+b+(l&&"&collection="+l||""),z.alt="sparkline",z.width=e,z.height=t,z.id="sparklineImgId",z.border="0",J.parentNode.replaceChild(z,J)}function G(e){for(var t=[],n=e.length,s=0;s<n;s++)void 0===e[s].excluded&&t.push(e[s].display_name);return t}new H(L("wmtbURL"),{delay:400,source:function(e,t){r("GET","/__wb/search/host?q="+encodeURIComponent(e),(function(n){if(void 0!==(n=S.parse(n.response)).hosts&&n.hosts.length>0){var s=G(n.hosts);t(s)}else void 0!==n.isUrl&&!0===n.isUrl&&void 0===n.excluded?t([e]):r("GET","/__wb/search/anchor?q="+encodeURIComponent(e),(function(e){if(void 0!==(e=S.parse(e.response))&&e.length>0){var n=G(e.slice(0,5));t(n)}}))}))},onSelect:function(e,t,n){L("wmtb").submit()}}),L("wmtb").onsubmit=function(e){var t=L("wmtbURL").value;if(0!==t.indexOf("http://")&&0!==t.indexOf("https://")&&!t.match(/[\w\.]{2,256}\.[a-z]{2,4}/gi))return document.location.href="/web/*/"+L("wmtbURL").value,e.preventDefault(),!1},function(e,t,n){!function(e,t){r("HEAD",e,(function(e){t(e.status<300,e.responseURL)}))}("/web/"+t+"/http://web.archive.org/screenshot/"+e,(function(e,i){if(!e)return n(!1);var o=function(e){var t=q.exec(e);return t&&t[1]?t[1]:null}(i),r=(s.c(o).getTime()-s.c(t).getTime())/1e3;console.log("screen shot delta: "+r+"s"),n(r>0&&r<60,r)}))}(c,E,(function(e,t){e?(L("wm-screenshot").title="screen shot (delta: "+t+"s)",D("wm-screenshot",!0)):D("wm-screenshot",!1)})),L("wm-capinfo-notice")&&A(!0)},h:function(e){L("wm-ipp").style.display="none",e.stopPropagation()},ex:function(e){e.stopPropagation(),A(!1)},saveSnapshot:function(e,t,n){return j(["wm-save-snapshot-fail","wm-save-snapshot-open","wm-save-snapshot-success"]),O(["wm-save-snapshot-in-progress"]),r("POST","/__wb/web-archive/",(function(e){401===e.status?I():e.status>=400?(e.responseText,j(["wm-save-snapshot-in-progress","wm-save-snapshot-success"]),O(["wm-save-snapshot-fail","wm-save-snapshot-open"]),console.log("You have got an error."),console.log("If you think something wrong here please send it to support."),console.log('Response: "'+e.responseText+'"'),console.log('status: "'+e.status+'"')):(j(["wm-save-snapshot-fail","wm-save-snapshot-in-progress"]),O(["wm-save-snapshot-open","wm-save-snapshot-success"]))}),{"Content-Type":"application/json"},S.stringify({url:e,snapshot:t,tags:n||[]})),!1}}}]);
// @license-end
