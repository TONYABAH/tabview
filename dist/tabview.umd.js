!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).TabView=t()}(this,function(){function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function t(t,n){var i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(i)return(i=i.call(t)).next.bind(i);if(Array.isArray(t)||(i=function(t,n){if(t){if("string"==typeof t)return e(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){i&&(t=i);var r=0;return function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return function(){function e(){return Math.random().toString(36).slice(2)}function n(e,t,n){var i;return function(){var r=this,l=arguments,a=function(){i=null,n||e.apply(r,l)},o=n&&!i;clearTimeout(i),i=setTimeout(a,t),o&&e.apply(r,l)}}var i,r=(i={},{addListener:function(e,t){void 0===i[e]&&(this._listeners[e]=[]),this._listeners[e].push(t)},attach:function(e,t){this.addListener(e,t)},on:function(e,t){this.addListener(e,t)},fire:function(e,t,n){if("string"==typeof e&&(e={type:e,data:t,target:n}),e.target||(e.target=this),!e.type)throw new Error("Type error");if(i[e.type]instanceof Array)for(var r=i[e.type],l=0,a=r.length;l<a;l++)r[l].call(this,e)},trigger:function(e,t){this.fire(e,t)},removeListener:function(e,t){if(i[e]instanceof Array)for(var n=i[e],r=0,l=n.length;r<l;r++)if(n[r]===t){n.splice(r,1);break}},off:function(e,t){this.removeListener(e,t)}});function l(t,n,i){var r=document.createElement("button");return r.id=e(),r.setAttribute("name",t),r.style.height="100%",r.style.border="0 none transparent",r.style.background="transparent",r.style.color="white",r.marginRight=r.marginLeft="2px",r.style.padding="2px",r.style.paddingLeft=r.style.paddingRight="7px",r.style.cursor="pointer",r.style.fontWeight="900",r.style.fontSize="14px",r.style.float=i||"none",r.style.outline="none",r.innerHTML=n,r.style.borderRadius="4px 4px",r}function a(){var e=document.createElement("span");return e.setAttribute("name","tab-footer"),e.innerHTML=settings.footer,e.className="tab-footer",e.style.left="0",e.style.right="0",e.style.bottom="0",e.style.padding="2px",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e}function o(){var e=document.createElement("span");return e.setAttribute("name","tab-banner"),e.innerHTML="string"==typeof settings.banner?settings.banner:settings.banner.innerHTML,e.style.display="flex",e.style.padding="5px",e.style.justifyContent="center",e.style.alignItems="center",e.className="tab-banner",e.style.background="green",e}return{createTabs:function(i,s){var d,c,u,y,p,b,f,g,m,v,h,x,k=new Map,E={};function A(t,i){g=Object.assign({},i);var s=i.loadFromMarkup?function(e,t){if("string"==typeof e&&(e=document.getElementById(e)),!e||!e.children)throw new Error("Invalid element to load markup");var n=e.children;if(!n||0===n.length)return(void 0)();var i=e.querySelector(".tab-banner"),r=e.querySelector(".tab-footer"),l=e.querySelector(".tab-links").children,a=e.querySelector(".tab-pages").children,o={banner:i.innerHTML,footer:r.innerHTML,tabs:[]};for(i&&i.remove(),r&&r.remove();l.length>0;){var s=l[0],d=a[0];s&&(o.tabs.push({id:""!==s.id?s.id:null,label:s.textContent,title:s.getAttribute("title"),closable:s.getAttribute("closable"),target:s.getAttribute("data-target"),selected:s.getAttribute("selected"),html:d?d.innerHTML:"",bg:d?d.style.background:"#0bc",style:s.getAttribute("tab-style")}),s.remove(),d.remove())}return o}(t):null;s&&(g=Object.assign(g,s)),function(e){var t={limit:void 0,banner:void 0,footer:void 0,close_click:void 0,infinite_scroll:!1,style:"normal",add:!1,theme:"red",tab_height:32,left_tip:"&lt;",right_tip:"&gt;",add_tip:"+",data:null};g=Object.assign({},t,e,arguments[1])}(g),(y=l("left-nav-button","&lt;","left")).addEventListener("click",function(){D(!1)}),(p=l("add-tab-button","+","left")).style.visibility=g.add?"visible":"hidden",p.addEventListener("click",function(){r.fire("add-tab-click",e())}),c=function(){var t=document.createElement("div");return t.setAttribute("id",e()),t.style.position="absolute",t.style.top="0",t.style.bottom="0",t.style.left="60px",t.style.right="30px",t.style.overflow="hidden",t.style.padding="0px",t.style.margin="0px",t.style.paddingRight="7px",t.style.background="inherit",t.style.display="flex",t.className="tab-bar",t}();var m,E=((m=document.createElement("div")).style.position="relative",m.style.height="100%",m.style.height="100%",m.style.width="100%",m.style.border="none",m.style.padding="none",m.className="tabbar-wrapper",m);E.append(c),E.appendChild(y),E.appendChild(p),f=c.id,u=l("right-nav-button","&gt;","right"),E.appendChild(u),u.addEventListener("click",function(){D(!0)});var A,S=((A=document.createElement("div")).setAttribute("id",e()),A.style.position="relative",A.className="tab-panel",A.style.width="100%",A.style.height="100%",A.style.overflow="hidden",A.style.margin="0",A.style.top="0",A.style.background="",A);b=S.id;var B=function(e,t,n){var i,r;void 0===n&&(n={}),n.banner&&(i=o()),n.footer&&(r=a());var l=document.createDocumentFragment(),s=document.createElement("table");s.style.width=s.style.height="100%",l.append(s);var d=document.createElement("thead");s.append(d);var c=document.createElement("tr");c.style.minHeight="0px",c.style.maxHeight="80px",d.append(c);var u=document.createElement("th");u.style.textAlign="left",u.style.padding="0",i?u.append(i):c.style.display="none",c.appendChild(u);var y=document.createElement("tbody");s.append(y);var p=document.createElement("tr");p.style.minHeight="24px",p.style.height=n.tab_height+"px",p.style.padding="0",y.append(p);var b=document.createElement("td");b.style.overflow="hidden",b.style.whiteSpace="nowrap",b.style.textAlign="left",b.style.padding="0",b.append(e),p.appendChild(b),s.style.borderCollapse=p.style.borderCollapse=b.style.borderCollapse="collapse",s.style.border=p.style.border=b.style.border="0 none transparent";var f=document.createElement("tr");y.append(f),(b=document.createElement("td")).append(t),b.style.textAlign="left",b.style.padding="0",f.appendChild(b);var g=document.createElement("tr");y.append(g),(b=document.createElement("td")).style.textAlign="left",b.style.padding="0",g.appendChild(b),g.style.minHeight="24px",g.style.height=n.tab_height+"px";var m=document.createElement("tr");return y.append(m),b=document.createElement("td"),m.appendChild(b),m.style.maxHeight="24px",(b=document.createElement("td")).style.padding="0",r?b.append(r||document.createTextNode("")):m.style.display="none",m.appendChild(b),(b=document.createElement("td")).style.padding="0",m.appendChild(b),n.bottom?(g.firstElementChild.nextSibling.appendChild(e),p.style.display="none"):g.style.display="none",l}(c.parentElement,S,g),z="object"==typeof t?t:document.getElementById(t);v=z.id,z.append(B),C(g.theme),function(){var e=N();window.addEventListener("resize",function(){n(function(){if(!d)return!1;O(d.linkButton)?(L(),W(d.linkButton)):W(d.linkButton),I()},200)()}),e.addEventListener("keyup",function(e){!function(e){var t=d.button;if(t)switch(e.keyCode){case 37:t.previousSibling&&j(t.previousSibling);break;case 39:t.nextSibling&&j(t.nextSibling);break;case 38:break;case 40:t.blur()}}(e)},!0),e.addEventListener("drop",function(e){e.preventDefault(),x=e.clientX,function(e){e.preventDefault();var t=e.dataTransfer.getData("text"),n=function(e){try{for(;"tab-link"!==e.name;)e=e.parentElement;return e}catch(e){return w(k.size-1).linkButton}}(e.target),i=document.getElementById(t);h>x?n.before(i):n.after(i)}(e)},!0),e.addEventListener("dragover",function(e){e.preventDefault()},!0),e.addEventListener("dragstart",function(e){var t;h=e.clientX,(t=e).dataTransfer.setData("text",t.target.id)})}(),g.tabs&&function(e){if(e){var t=null;e.forEach(function(e){e.selected&&(t=e.id);var n=H(_(e).id);n.innerHTML="function"==typeof e.html?e.html():e.html,n.setAttribute("contenteditable",!0),n.style.overflow="auto",n.style.zIndex="100"}),t&&j(t)}}(g.tabs),T(R(),!1),T(M(),!1)}function w(e){for(var n,i=null,r=0,l=t(k.values());!(n=l()).done;){if(r===e){i=n.value;break}r++}return i}function L(){var e=w(k.size-1).linkButton,t=q()[0];if(t.previousSibling){var n=t.previousSibling||t;n.getBoundingClientRect().width<c.getBoundingClientRect().right-e.getBoundingClientRect().right&&W(n)}}function I(){if(!g.infinite_scroll){var e=q(),t=e[0],n=e[e.length-1];if(t){var i=M(),r=R();t.previousSibling?S(i,!0):S(r,!1),S(i,!!n.nextSibling)}}}function S(e,t){e.style.visibility=t?"visible":"hidden"}function B(){var e=q(),t=e[0],n=e[e.length-1];t&&(T(R(),!!t.previousSibling),T(M(),!!n.nextSibling))}function C(e){var t="#ddd",n="#222",i="#ddd",r="#003355";switch(e){case"dark":n="#002255",r="#003355",t="#fff";break;case"black":n="#111",r="#333",t="#fff";break;case"blue":n="rgba(8, 68, 117, 1)",r="rgba(10, 100, 186, 1)";break;case"green":n="rgba(0, 149, 120, 1)",r="rgba(0, 139, 100, 0.9)";break;case"red":n="rgb(120, 0, 30)",r="rgb(123, 0, 50)";break;case"white":n="#bcd",t="#000",i="#eee";break;default:n="rgba(10, 100, 186, 1)",r="rgba(10, 100, 206, 1)",t="#fff"}!function(e){var t=document.getElementById(v).querySelector("table");t.style.background=e.bg,t.style.color=e.color,y.style.color=u.style.color=p.style.color=e.color}(m={bg:n,color:t,activecolor:i,activeBg:r})}function T(e,t){e.style.visibility=t?"visible":"hidden"}function H(e){var t=k.get(e);return document.getElementById(t.pageId)}function M(){return u}function R(){return y}function N(){return document.getElementById(f)}function _(t){void 0===t&&(t={});var n=Object.keys(E).length,i=t.tabId||e(),r="link-btn-"+e(),l={buttonId:"link-btn-"+e(),target:"page-"+i,label:"Tab"+Number(n+1),title:this.label,html:"",closable:!0,data:null,icon:"kb",bg:t.bg||"inherit",color:t.color||"inherit",style:t.style||"fancy"};t.bg="transparent"===t.bg?"":t.bg,null===t.buttonId&&delete t.buttonId;var a=Object.assign(l,t),o=function(e,t,n,i){var r=document.createElement("div");return r.setAttribute("id",e),r.setAttribute("data-tab",t),r.setAttribute("data-trigger",n),r.innerHTML=i.text||"",r.style.position="absolute",r.style.padding="8px 16px",r.style.visibility="hidden",r.style.overflow="auto",r.style.top=r.style.bottom=r.style.left=r.style.right="0",r.style.background=i.bg||"",r}(a.target,i,r,a);document.getElementById(b).appendChild(o);var s,c=function(e,t,n){var i=n.target,r=n.style,l=n.title,a=n.bg,o=document.createElement("button");return o.className="tab-link",o.setAttribute("href","#!"),o.setAttribute("id",e),o.setAttribute("title",l),o.setAttribute("name","tab-link"),o.setAttribute("draggable","true"),o.setAttribute("data-tab",t),o.setAttribute("data-target",i),o.style.position="relative",o.style.outline="none",o.style.height="100%",o.style.width="auto",o.style.border="0 none transparent",o.style.fontSize="12px",o.style.fontWeight="500",o.style.margin="0",o.style.padding="0",o.style.boxShadow="none",o.style.background=a||"inherit",o.style.color="inherit",o.style.cursor="pointer",o.style.display="block",o.style.transition="background .4s",o.style.borderRadius=r?"8px 1px 0px 0px":"1px 1px 0px 0px",o}(r,i,a),u=function(e){var t=document.createElement("label");return t.setAttribute("name","tab-link-label-wraper"),t.style.display="flex",t.style.alignContent="center",t.style.alignItems="center",t.style.padding="2px",t.style.height="100%",t.style.width="100%",t.style.color="inherit",t.style.background="transparent",t.style.cursor="pointer",t}(),y=function(e){var t=document.createElement("span");return t.style.marginRight="7px",t.style.color="#b00",t.style.fontWeight="bold",t.innerHTML=e.icon||"kb",t.style.float="left",t}(a),p=function(e,t){var n=document.createElement("label");return n.setAttribute("name","tab-link-label"),n.className="tab-link-label",n.style.margin="0",n.style.paddingRight="2px",n.style.paddingLeft="2px",n.style.verticalAlign="middle",n.style.padding="0",n.style.color="inherit",n.style.maxWidth="80px",n.style.overflow="hidden",n.style.whiteSpace="nowrap",n.style.background="",n.style.cursor="pointer",n.style.fontSize="inherit",n.style.fontWeight="inherit",n.append(document.createTextNode(e)),n.setAttribute("title",t||e),n}(a.label,a.title),f=((s=document.createElement("a")).innerHTML="&times",s.setAttribute("name","close-button"),s.setAttribute("title","close"),s.style.borderRadius="50%",s.style.visibility="hidden",s.style.height=s.style.width="20px",s.style.float="right",s.style.marginRight="2px",s.style.marginLeft="5px",s.style.display="flex",s.style.padding="2px 0px 0px 4px",s.style.alignContent="center",s.style.alignItems="center",s.style.fontSize="18px",s.style.color="#efefef",s.style.fontWeight="700",s.style.background="transparent",s.addEventListener("mouseenter",function(){s.style.background="#555"}),s.addEventListener("mouseleave",function(){s.style.background=""}),s);return a.closable||(f.style.display="none",u.style.paddingRight="7px"),u.append(y),u.append(p),u.append(f),c.append(u),f.addEventListener("click",function(e){z(i),e.stopImmediatePropagation()}),c.addEventListener("click",function(){j(c)}),c.addEventListener("mouseenter",function(){d.linkButton.id!==c.id&&(f.style.visibility="visible")}),c.addEventListener("mouseleave",function(){d.linkButton.id!==c.id&&(f.style.visibility="hidden")}),E[c.id]=c,(d=d)?d.linkButton.after(c):N().appendChild(c),k.set(i,{id:i,label:a.label,text:a.text,title:a.title,linkId:a.buttonId,pageId:a.target,data:a.data,selected:a.selected,linkButton:c,page:o}),d=k.get(i),I(),j(c),d}function j(e,n){var i=e;if(!e)throw new Error("Invalid tab address:");if("string"==typeof e||isFinite(e))i=document.getElementById(e);else{if(!e.id)throw new Error("Invalid Button or ID");i=e}if("function"==typeof n&&!1===n())return!1;for(var l,a=t(k.values());!(l=a()).done;){var o=l.value;o.linkButton.id===i.id?(o.selected=!0,d=o,document.getElementById(o.pageId).style.visibility="visible",o.linkButton.lastChild.lastChild.style.visibility="visible"):(o.selected=!1,document.getElementById(o.pageId).style.visibility="hidden",o.linkButton.lastChild.lastChild.style.visibility="hidden")}return function(e,t){if(e&&e.parentElement){for(var n=e.parentElement.children,i=0;i<n.length;i++)n[i].classList.remove("active"),n[i].style.background=t.bg,n[i].style.color=t.color;e.classList.add("active"),e.style.background=t.activeBg,e.style.color=t.activecolor}}(i,m),O(i)||W(i),r.fire("select",d),d}function z(e){var t=e;if(!e)throw new Error("Invalid tab address:");"string"==typeof id||e.id&&(t=e.id);var n=k.get(t);if(n){var i=n.linkButton,l=i.nextSibling,a=i.previousSibling;return r.fire("before_close",n),i.remove(),document.getElementById(n.pageId).remove(),d=null,k.delete(t),r.fire("close",n),l&&"BUTTON"===l.tagName?j(l):a&&"BUTTON"===a.tagName&&j(a),B(),D(!0),t}}function O(e){var t=e.getBoundingClientRect(),n=N();if(!n)return!1;var i=n.getBoundingClientRect();return t.left>=i.left&&t.right<=i.right}function q(){var e=N();return!!e&&Array.prototype.slice.call(e.querySelectorAll("button")).filter(function(e){return O(e)})}function D(e){g.infinite_scroll?function(e){var t=N();if(t){var n=t.querySelectorAll("button");n.length>1&&(e?n[n.length-1].after(n[0]):n[0].before(n[n.length-1]))}}(e):(function(e){var t=q(),n=t[0],i=t[t.length-1];if(e&&i&&i.nextSibling)n.style.display="none";else if(!e&&n&&n.previousSibling)n.previousSibling.style.display="";else{var r=N();if(!r)return;var l=r.querySelectorAll("button");l.length>0&&(l[l.length-1].style.display="")}}(e),B())}function W(e){if(!O(e)){for(var t=k.size,n=0;!(O(e)||(M().click(),++n>t)););for(n=0;!O(e);){if(R().click(),n++,O(e))return;if(n>t)break}}}return A(i,s),{init:A,add:_,close:z,setTheme:C,getTheme:function(){return g.theme},destroy:function(){removeListeners()}}},randomId:e,Emitter:{fire:function(e,t,n,i,r){var l=n||document,a=new CustomEvent(e,{detail:t,cancelable:i||!1,bubbles:r||!1});l.dispatchEvent(a)},on:function(e,t,n){(n||document).addEventListener(e,t)},off:function(e,t,n){(n||document).removeEventListener(e,t)}},Event:r,debounce:n}}()});
//# sourceMappingURL=tabview.umd.js.map
