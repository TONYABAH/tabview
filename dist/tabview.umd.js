!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t||self).TabView=e()}(this,function(){function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}return function(){var e=function(){return Math.random().toString(36).slice(2)},n={blue:{contrastColor:"blue",tabBg:"rgb(8, 118, 185)",tabColor:"#eee",tabBorderColor:"#2E4053",tabButtonBg:"rgb(8, 118, 185)",hoverBg:"rgb(8, 181, 250)",hoverColor:"#efefef",activeBg:"rgb(8, 100, 190)",activeColor:"#fff",pageBg:"",pageColor:"",headerBg:"rgb(8, 118, 185)",headerColor:"#eee",footerBg:"rgb(8, 118, 185)",footerColor:"#eee",footerBorderColor:"#2E4055",iconColor:"red"},green:{contrastColor:"green",tabBg:"#1D8348",tabColor:"#eee",tabBorderColor:"#104032",tabButtonBg:"#1D8348",hoverBg:"#2ECC71",hoverColor:"#efefef",activeBg:"#145A32",activeColor:"#fff",pageBg:"",pageColor:"",headerBg:"#1D8348",headerColor:"#eee",footerBg:"#1D8348",footerColor:"#eee",footerBorderColor:"#104032",iconColor:"red"},red:{contrastColor:"#CD4435",tabBg:"#BA4335",tabColor:"#eee",tabBorderColor:"#5A3400",tabButtonBg:"#BA4335",hoverBg:"#CD4435",hoverColor:"#efefef",activeBg:"#CD0935",activeColor:"#fff",pageBg:null,pageColor:null,headerBg:"#BA4335",headerColor:"#eee",footerBg:"#BA4335",footerColor:"#eee",footerBorderColor:"#5A3400",iconColor:"#00ff00"},orange:{contrastColor:"orange",tabBg:"#D68910",tabColor:"#eee",tabBorderColor:"#784212",tabButtonBg:"#D68910",hoverBg:"#FC7633",hoverColor:"#efefef",activeBg:"#FF8910",activeColor:"#fff",pageBg:"",pageColor:"",headerBg:"#D68910",headerColor:"#eee",footerBg:"#D68910",footerColor:"#eee",footerBorderColor:"#784212",iconColor:"#00ff00"},grey:{contrastColor:"#efefef",tabBg:"#D0D3D4",tabColor:"#333",tabBorderColor:"#333",tabButtonBg:"#ECF0F1",hoverBg:"#FFFFFF",hoverColor:"#111",activeBg:"#D0D3D4",activeColor:"#222",pageBg:"",pageColor:"",headerBg:"#D0D3D4",headerColor:"#333",footerBg:"#D0D3D4",footerColor:"#333",footerBorderColor:"#222222",iconColor:"#00ff00"},dark:{contrastColor:"",tabBg:"#34495E",tabColor:"#eee",tabBorderColor:"#233011",tabButtonBg:"#474747",hoverBg:"#2C3E50",hoverColor:"#fff",activeBg:"#566573 ",activeColor:"#eee",pageBg:"",pageColor:"",headerBg:"#34495E ",headerColor:"#eee",footerBg:"#34495E ",footerColor:"#eee",footerBorderColor:"#233011",iconColor:"#00ff00"},black:{contrastColor:"",tabBg:"#1C2833",tabColor:"#eee",tabBorderColor:"#233011",tabButtonBg:"#2C3E50",hoverBg:"#5D6D7E ",hoverColor:"#fff",activeBg:"#1C2833",activeColor:"#eee",pageBg:"",pageColor:"",headerBg:"#1C2833",headerColor:"#eee",footerBg:"#1C2833",footerColor:"#eee",footerBorderColor:"#233011",iconColor:"#00ff00"},light:{contrastColor:"",tabBg:"lavender",tabColor:"#111",tabBorderColor:"#233011",tabButtonBg:"lavender",hoverBg:"#AED6F1",hoverColor:"#000",activeBg:"#AED6F1",activeColor:"#000",pageBg:"",pageColor:"",headerBg:"lavender",headerColor:"#111",footerBg:"lavender",footerColor:"#111",footerBorderColor:"#233011",iconColor:"green"},purple:{contrastColor:"",tabBg:"#9B59B6",tabColor:"#fff",tabBorderColor:"#443974",tabButtonBg:"#8E44AD",hoverBg:"#A569BD",hoverColor:"#fff",activeBg:"#633974",activeColor:"#eee",pageBg:"",pageColor:"",headerBg:"#9B59B6",headerColor:"#fff",footerBg:"#9B59B6",footerColor:"#fff",footerBorderColor:"#443974",iconColor:"#00ff00"}},o={header:!1,footer:!0,alginTab:"top",minTabHeight:"auto",maxTabWidth:225,minTabWidth:"auto",tabWidth:125,tabHeight:52,footerHeight:22,headerHeight:24},r={contrastColor:"#efefef",tabBg:"#efefef",tabColor:"#333",tabBorderColor:"#ababab",tabButtonBg:"#cdcdcd",hoverBg:"#ffffff",hoverColor:"#000000",activeBg:"#777777",activeColor:"#ffffff",pageBg:"#eef",pageColor:"#333",headerBg:"#efefef",headerColor:"#333",footerBg:"#cdcdcd",footerBorderColor:"#777777",footerColor:"#333",iconColor:"green"},a=function(t){t.preventDefault()},i=function(t){t.dataTransfer.setData("text/plain",t.target.id)},l=function(t){t.preventDefault();var e=t.dataTransfer.getData("text"),n="tab-button"===t.target.getAttribute("role")?t.target:t.target.parentNode,o=document.getElementById(e),r=o.getBoundingClientRect(),a=n.getBoundingClientRect();r.x>a.x||r.y>a.y?n.before(o):n.after(o)},b=function(t,e,n){var o;return function(){var r=this,a=arguments,i=function(){o=null,n||t.apply(r,a)},l=n&&!o;clearTimeout(o),o=setTimeout(i,e),l&&t.apply(r,a)}},d=function(t){if(!(t instanceof Element))throw Error("DomUtil: elem is not an element.");var e=getComputedStyle(t);if("none"===e.display)return!1;if("visible"!==e.visibility)return!1;if(e.opacity<.1)return!1;if(t.offsetWidth+t.offsetHeight+t.getBoundingClientRect().height+t.getBoundingClientRect().width===0)return!1;var n={x:t.getBoundingClientRect().left+t.offsetWidth/2,y:t.getBoundingClientRect().top+t.offsetHeight/2};if(n.x<0)return!1;if(n.x>(document.documentElement.clientWidth||window.innerWidth))return!1;if(n.y<0)return!1;if(n.y>(document.documentElement.clientHeight||window.innerHeight))return!1;var o=document.elementFromPoint(n.x,n.y);do{if(o===t)return!0}while(o&&(o=o.parentNode));return!1};function g(e){for(var n,o=[],r=function(e,n){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(o)return(o=o.call(e)).next.bind(o);if(Array.isArray(e)||(o=function(e,n){if(e){if("string"==typeof e)return t(e,n);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,n):void 0}}(e))){o&&(e=o);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(e.children);!(n=r()).done;){var a=n.value;d(a)&&o.push(a)}return o}function c(t,e){var n=document.createElement("div");return n.classList.add("tab-page"),n.setAttribute("id",t),n.append(e||""),n}return{createTabs:function(t,f){void 0===f&&(f={footer:!0,header:!1,headerHeight:32,footerHeight:25,align:"",iconColor:"orange",infiniteScroll:!0});var u=[],h=function(t,e,n,o,r){var a=n||document,i=new CustomEvent(t,{detail:e,cancelable:o||!0,bubbles:r||!1});a.dispatchEvent(i)},s=function(t,e,n){(n||document).addEventListener(t,e)},p="left"===f.align||"right"===f.align,v=f.infiniteScroll||!1,m=null,x=null,C=null,B=document.getElementById(t),y=B.outerHTML;B.classList.contains("infinit-scroll")&&(v=!0),(B.classList.contains("tab-align-right")||B.classList.contains("tab-align-left"))&&(p=!0),f.stylesId="tab_css_"+t,B.classList.add("tab-align-"+f.align);var w=function(t,e){void 0===e&&(e={}),Object.assign(o,e),"string"==typeof e.theme?Object.assign(r,n[e.theme]):"object"==typeof e.theme&&Object.assign(r,e);var a=Object.assign(r,o),i=a.header?a.headerHeight:0,l="\n    #"+t+" {\n        \n    --display-header: "+(a.header?"flex":"none")+";\n    --display-footer: "+(a.footer?"flex":"none")+";\n    --min-tab-height: "+a.minTabHeight+"px;\n    --max-tab-width: "+a.maxTabWidth+"px;\n    --min-tab-width: "+a.minTabWidth+"px;\n    --tab-width: "+a.tabWidth+"px;\n    --tab-height: "+a.tabHeight+"px;\n    --footer-height: "+(a.footer?a.footerHeight:0)+"px;\n    --header-height: "+i+"px;\n    --panel-top: "+(i+a.tabHeight+1)+"px;\n    --panel-bottom: var(--footer-height);\n\n    --tab-bar-bg: "+a.tabBg+";\n    --tab-bar-contrast-bg: "+a.contrastColor+";\n    --tab-color: "+a.tabColor+";\n    --tab-border-color: "+a.tabBorderColor+";\n    --tab-color: "+a.tabColor+";\n    --tab-border-color:  "+a.tabBorderColor+";\n    --tab-button-bg: "+a.tabButtonBg+";\n    --hover-bg: "+a.hoverBg+";\n    --hover-color: "+a.hoverColor+";\n    --active-bg: "+a.activeBg+";\n    --active-color: "+a.activeColor+";\n    --header-bg: "+a.headerBg+";\n    --header-color: "+a.headerColor+";\n    --footer-bg: "+a.footerBg+";\n    --footer-color: "+a.footerColor+";\n    --footer-border-color: "+a.footerBorderColor+";\n    --page-bg: "+a.pageBg+";\n    --page-color: "+a.pageColor+",\n    --icon-color: "+a.iconColor+",\n}\n\n/**Layout CSS **/\n#"+t+" {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    overflow: auto;\n    color: ';\n    background: '';\n    overflow: hidden;\n}\n#"+t+" .tab-panel {\n    position: absolute;\n    display: block;\n    top: var(--panel-top);\n    bottom: var(--footer-height);\n    right: 0;\n    left: 0;\n    z-index: 10;\n    background: #333;\n}\n#"+t+" .tab-panel .tab-page {\n    position: absolute;\n    display: none;\n    top: 5px;\n    bottom: 1px;\n    right: 0px;\n    left: 0px;\n}\n#"+t+" .tab-header {\n    position: absolute;\n    right: 0;\n    left: 0;\n    height: calc(var(--header-height) - 1px );\n    padding-left: 14px;\n    display: var(--display-header);\n    border-bottom: 1px solid var(--tab-border-color);\n}\n\n#"+t+" .tab-footer {\n    position: absolute;\n    height: var(--footer-height);\n    right: 0;\n    bottom: 0;\n    left: 0;\n    border-top: 1px solid var(--footer-border-color);\n    display: var(--display-footer);\n    z-index: 10;\n}\n\n#"+t+" .tab-bar {\n    position: absolute;\n    top: var(--header-height);\n    height: var(--tab-height);\n    min-height: var(--min-tab-height);\n    max-width: 100%;\n    left: 0px;\n    right: 0px;\n    /*box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.15);*/\n    border-bottom: 1px solid var(--tab-border-color);\n    overflow: auto;\n    display: flex;\n    white-space: nowrap;\n    z-index: 1;\n}\n#"+t+" .tabs {\n    position: absolute;\n    left: 24px;\n    right: 24px;\n    height: 100%;\n    overflow: hidden;\n    display: flex;\n    white-space: nowrap;\n    background: var(--tab-bar-contrast-bg);\n}\n#"+t+" .tabs > button {\n    position: relative;\n    display: block;\n    min-height: 100%;\n    max-width: var(--max-tab-width);\n    min-width: var(--min-tab-width);\n    width: auto;\n    padding-left: 20px;\n    padding-right: 24px;\n    background: inherit;\n    border: none;\n    cursor: pointer;\n    align-items: center;\n    margin: 0px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    transition: .4s;\n    border-right: 1px inset;\n    /*box-shadow: 1px 1px 2px 0 #eee;*/\n}\n\n#"+t+" .tabs > button:hover {\n    transform: all 0.2s;\n}\n#"+t+" .tabs > button.active {\n    transform: all 0.2s;\n}\n#"+t+" .tabs > button > .close-button {\n    position: absolute;\n    width: auto;\n    height: 100%;\n    right:0px;\n    top: 0;\n    padding-right: 4px;\n    margin-right: 0px;\n    display: flex;\n    align-items: center;\n    background: inherit;\n}\n#"+t+" .tabs > button > .close-button::after {\n    content: '✖';\n    border-radius: 50%;\n    line-height: 12px;\n    padding: 2px;\n    display: none;\n}\n#"+t+" .tabs > button.active .close-button::after {\n    display: block;\n}\n#"+t+" .tabs > button:hover .close-button::after {\n    display: block;\n}\n#"+t+" .tab-icon {\n    margin-top: -3px;\n    float:left;\n    color: var(--icon-color);\n}\n#"+t+" .tabs > button > .close-button:hover::after {\n    color: red;\n    background: #eee;\n}\n#"+t+" .tabs > button > .tab-label {\n    display: flex;\n    left: 22px;\n    right: 24px;\n    height: 100%;\n    min-width: 45%;\n    margin-top: 50%;\n    transform: translateY(-50%);\n    align-items: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-shadow: transparent;\n    text-overflow: ellipsis;\n    align-items: center;\n    background-color: green;\n    font-size: 11px;\n    letter-spacing: 1px;\n}\n\n#"+t+" .left-nav-button,\n#"+t+" .right-nav-button {\n    position: absolute;\n    width: 24px;\n    min-width: 24px;\n    max-width: 24px;\n    top: 0;\n    bottom: 0;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    /*text-shadow: 1px 1px #333;*/\n    text-align: center;\n    z-index: 0;\n}\n#"+t+" .right-nav-button {\n    right: 0;\n    padding-left: 4px;\n}\n#"+t+" .left-nav-button::after {\n    content: '';\n    min-width: 0;\n    max-width: 0;\n    width: 0;\n    height: 0;\n    min-height: 0;\n    max-height: 0;\n    height: 0;\n    border-right: 8px solid var(--tab-color);\n    border-top: 8px solid transparent;\n    border-bottom: 8px solid transparent;\n}\n#"+t+" .right-nav-button::after {\n    content: '';\n    min-width: 0;\n    max-width: 0;\n    width: 0;\n    height: 0;\n    min-height: 0;\n    max-height: 0;\n    border-left: 8px solid var(--tab-color);\n    border-top: 8px solid transparent;\n    border-bottom: 8px solid transparent;\n}\n#"+t+" .left-nav-button:hover {\n    color: cadetblue;\n}\n#"+t+" .right-nav-button:hover {\n    color: cadetblue;\n}\n\n/** Side tabs (Left or Right) CSS */\n\n#"+t+".tab-align-left .tab-header,\n#"+t+".tab-align-right .tab-header {\n    border-bottom: 1px solid;\n}\n#"+t+".tab-align-right .tab-bar,\n#"+t+".tab-align-left .tab-bar {\n    position: absolute;\n    display: block;\n    min-width: 125px;\n    max-width: 125px;\n    top: calc(var(--header-height) + 0px);\n    bottom: var(--footer-height);\n    overflow: hidden;\n    text-align: center;\n    z-index: 1;\n}\n#"+t+".tab-align-right .tab-bar .tabs,\n#"+t+".tab-align-left .tab-bar .tabs {\n    position: absolute;\n    display: block;\n    height: auto;\n    left: 1px;\n    right: 1px;\n    top: 32px;\n    bottom: 32px;\n}\n#"+t+".tab-align-right .left-nav-button,\n#"+t+".tab-align-right .right-nav-button,\n#"+t+".tab-align-left .left-nav-button,\n#"+t+".tab-align-left .right-nav-button {\n    position: relative;\n    display: block;\n    min-width: 125px;\n    max-height: 32px;\n    float: none;\n    height: var(--tab-height);\n    justify-content: center;\n    align-items: center;\n}\n#"+t+".tab-align-right .tab-bar button,\n#"+t+".tab-align-left .tab-bar button {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    width: var(--tab-width);\n    min-height: auto; \n    max-height: var(--tab-height);\n    height: var(--tab-height);\n    margin-right: 2px;\n    cursor: pointer;\n    border-right: 0 none transparent;\n    /* margin-top: calc(var(--tab-width) / 2 + 10px);\n       transform: rotateZ(-90deg) translateX(24px);\n       box-shadow: 1px 1px 2px 0px #ccc;\n    */\n}\n\n#"+t+".tab-align-right .right-nav-button,\n#"+t+".tab-align-left .right-nav-button {\n    position: absolute;\n    display: flex;\n    bottom: 0;\n    top: auto;\n    justify-content: center;\n    align-items: center;\n    z-index: 1;\n    border: 1px none;\n}\n#"+t+".tab-align-right .left-nav-button,\n#"+t+".tab-align-left .left-nav-button {\n    position: sticky;\n    top: 0;\n    justify-content: center;\n    align-items: center;\n    display: flex;\n    border: 1px none;\n}\n#"+t+".tab-align-right .left-nav-button::after,\n#"+t+".tab-align-left .left-nav-button::after {\n    transform: rotateZ(90deg);\n}\n#"+t+".tab-align-right .right-nav-button::after,\n#"+t+".tab-align-left .right-nav-button::after {\n    transform: rotateZ(90deg);\n}\n#"+t+".tab-align-right > .tab-panel,\n#"+t+".tab-align-left > .tab-panel {\n    top: var(--header-height);\n    z-index: auto;\n}\n\n/** Right tabs CSS */\n\n#"+t+".tab-align-right .tab-bar {\n    right: 0;\n    left: auto;\n    height: auto;\n    border-right: 0;\n}\n#"+t+".tab-align-right > .tab-panel {\n    right: 125px;\n    left: 0;\n}\n#"+t+".tab-align-right .tab-header {\n    margin-right: 0;\n    margin-left: 0;\n    z-index: 1;\n}\n#"+t+".tab-align-right .tab-footer {\n    right: 0;\n    z-index: 1;\n}\n#"+t+".tab-align-right .tabs > button.active {\n    border-radius: 0px 0px 0px 0;\n    right: 0px;\n}\n\n/** Left tabs CSS */\n\n#"+t+".tab-align-left .tab-bar {\n    left: 0;\n    right: auto;\n    height: auto;\n   border-left: 0;\n}\n\n#"+t+".tab-align-left > .tab-panel {\n    left: var(--tab-width);\n    right: 0;\n}\n#"+t+".tab-align-left .tab-header {\n    margin-left: 0;\n    margin-right: 0;\n}\n#"+t+".tab-align-left .tab-footer {\n    left: 0;\n}\n#"+t+".tab-align-left .tabs > button.active {\n    border-radius: 0px 0 0 0px;\n    left: 0px;\n}\n\n/** Bottom tabs CSS */\n\n#"+t+".tab-align-bottom .tab-bar {\n    position: absolute;\n    bottom: var(--footer-height);\n    top: auto;\n}\n#"+t+".tab-align-bottom .tab-bar .tabs > button.active {\n    border-radius: 0px 0px 5px 5px;\n    right: 1px;\n}\n#"+t+".tab-align-bottom > .tab-panel {\n    bottom: var(--panel-bottom);\n    top: var(--header-height);\n}\n\n/**Theme CSS */\n\n#"+t+" {\n    background-color: '';\n}\n\n#"+t+" .tab-bar {\n    background-color: var(--tab-bar-bg);\n    color: var(--tab-color);\n}\n#"+t+" .tab-bar button {\n    background-color: var(--tab-button-bg);\n    color: var(--tab-color);\n    border-right: 1px solid var(--tab-border-color);\n}\n#"+t+" .tab-bar button:hover {\n    background-color: var(--hover-bg);\n    color: var(--hover-color);\n}\n#"+t+" .tab-bar button.active {\n    background-color: var(--active-bg);\n    color: var(--active-color);\n}\n#"+t+" .left-nav-button,\n#"+t+" .right-nav-button {\n    background-color: var(--tab-bar-bg);\n}\n#"+t+" .tab-panel {\n    border: none;\n    background: var(--page-bg);\n    color: var(--page-color);\n    box-shadow: 1px 1px 1px 1px transparent;\n}\n#"+t+" .tab-panel .tab-page {\n    padding: 8px;\n}\n#"+t+" .tab-footer{\n    background-color: var(--footer-bg);\n    color: var(--footer-color);\n    padding-left: 14px;\n   \n}\n#"+t+" .tab-header {\n    background-color: var(--header-bg);\n    color: var(--header-color);\n    padding-left: 14px;\n}\n        ",b=document.createElement("style");return b.id=e.stylesId||"tabviewStyles",b.append(document.createTextNode(l)),document.head.appendChild(b),b.id}(t,f);function E(t,n){var o=t||e(),r=n.text,b=n.title,d=n.closable,g=n.icon,c=n.iconcolor;b=b||r,g=g||"❖";var f=document.createElement("button");f.setAttribute("id",o),f.setAttribute("data-target","page-"+o),f.setAttribute("data-tab",o),f.setAttribute("draggable",!0),f.setAttribute("title",b||r),f.setAttribute("role","tab-button"),f.appendChild(document.createTextNode(r));var u=function(t,e){var n=document.createElement("label");return n.setAttribute("role","tab-icon"),n.classList.add("tab-icon"),n.style.position="absolute",n.style.left="4px",n.style.color=e||"",n.textContent=t||"❖",n}(g,c);if(f.appendChild(u),d){var h=function(){var t=document.createElement("label");return t.setAttribute("role","close-button"),t.classList.add("close-button"),t}();h.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),k(t.target.parentNode.getAttribute("data-tab"))},!0),f.appendChild(h)}return f.addEventListener("click",function(t){return S(f.getAttribute("data-tab"))},!0),B.classList.contains("draggable")&&(f.addEventListener("drop",l,!0),f.addEventListener("dragover",a,!0),f.addEventListener("dragstart",i)),f}var k=b(function(t){var e=u.find(function(e){return e.id===t});if(e){var n=e.linkButton,o=n.getAttribute("data-target"),r=null;n.nextElementSibling?r=n.nextElementSibling.getAttribute("data-tab"):n.previousElementSibling&&(r=n.previousElementSibling.getAttribute("data-tab")),document.getElementById(o).remove(),n.remove(),S(r);var a=u.findIndex(function(e){return e.id===t});u.splice(a,1),h("close",e)}},250,!0),S=b(function(t){var e,n=u.find(function(e){return e.id===t});n||(m&&(m.tabPage.style.display="none",m.linkButton.classList.remove("active"),m.active=!1),n.active=!0,m=n,function(t){var e=document.getElementById(t);if(e){var n="tab-button"===e.getAttribute("role")?e:e.parentNode;n.classList.add("active"),m.linkButton=n,A()}}(n.linkButton.id),(e=document.getElementById(n.tabPage.id)).style.display="block",m.tabPage=e,h("select",n))},250,!0),A=function(){if(m&&!d(m.linkButton)){var t=g(x);t.length>1&&t[t.length-1].nextElementSibling&&(p?t[0].style.marginTop="-"+t[0].clientHeight+"px":t[0].style.marginLeft="-"+t[0].clientWidth+"px")}},D=b(function(){A()},2),T=b(function(){var t=g(x),e=x.children;if(t.length>=1){var n=t[t.length-1];if(v)e[e.length-1].after(e[0]);else{if(!n.nextElementSibling)return;p?t[0].style.marginTop="-"+t[0].clientHeight+"px":t[0].style.marginLeft="-"+t[0].clientWidth+"px"}}},50),L=b(function(t){var e=g(x);if(e.length>=1){var n=e[0];if(v)n.before(e[e.length-1]);else{if(!n.previousElementSibling)return;p?n.previousElementSibling&&(n.previousElementSibling.style.marginTop=0):n.previousElementSibling&&(n.previousElementSibling.style.marginLeft=0)}}},50);return window.addEventListener("resize",D),function(){!function(){var t=document.createElement("div"),e=B.querySelector(".tab-header"),n=B.querySelector(".tab-footer");C=B.querySelector(".tab-panel"),(x=B.querySelector(".tabs"))?t=document.createElement("div"):(x=document.createElement("div")).className="tabs",t.className="tab-bar",t.appendChild(x),B.append(t);var o=t.querySelector(".left-nav-button"),r=t.querySelector(".right-nav-button");o||((o=document.createElement("div")).className="left-nav-button",t.prepend(o)),r||((r=document.createElement("div")).className="right-nav-button",t.appendChild(r)),e||((e=document.createElement("div")).className="tab-header",B.prepend(e)),C||((C=document.createElement("div")).className="tab-panel",B.appendChild(C)),n||((n=document.createElement("div")).className="tab-footer",B.appendChild(n)),n.innerHTML=f.footer||"",e.innerHTML=f.header||""}();for(var t=x.querySelectorAll("[role=tab-button]"),n=function(n){var o=document.getElementById(t[n].id),r=o.id,a=o.innerText,i=o.getAttribute("closable"),l=o.getAttribute("icon"),b=o.getAttributeNames(),d=[],g={id:r,text:a,closable:i,icon:l,content:o.innerHTML};b.forEach(function(t){d.push([t,o.getAttribute(t)]);var e=o.getAttribute(t);"function"!=typeof e&&(g[t]=e)});var f=function(t,n){void 0===n&&(n={attributes:[],iconColor:"red"});var o=E(t,n),r=o.getAttribute("data-target"),a=document.getElementById(r),i=c(r,n.content);a?a.replaceWith(i):C.appendChild(i);var l=Object.create(null);return l.id=t||e(),l.linkButton=o,l.tabPage=i,delete n.attributes,l.options=n,u.push(l),l}(r,g);o.replaceWith(f.linkButton),S(f.id)},o=0;o<t.length;o++)n(o);B.querySelector(".right-nav-button").addEventListener("click",function(t){return T(t)}),B.querySelector(".left-nav-button").addEventListener("click",function(t){return L(t)}),x.addEventListener("keyup",function(t){!function(t){if(m.linkButton)switch(t.keyCode){case 37:case 38:L(t);break;case 39:case 40:T(t)}}(t)},!0)}(),{onOpen:function(t){return s("open",t)},onSelect:function(t){return s("select",t)},onClose:function(t){return s("close",t)},onDestroy:function(t){return s("destroy",t)},addTab:function(t,n){void 0===n&&(n={attributes:[],iconColor:"red"});var o=E(t,n),r=c(o.getAttribute("data-target"),n.content),a=Object.create(null);return a.id=t||e(),a.linkButton=o,a.tabPage=r,a.options=n,u.push(a),C.appendChild(r),m?m.linkButton.after(o):x.appendChild(o),S(t),a},closeTab:k,selectTab:S,getTab:function(t){return u.find(function(e){return e.id===t})},getTabs:function(){return u},setHtml:function(t,e){var n=u.find(function(e){return e.id===t}).linkButton.getAttribute("data-target");document.getElementById(n).innerHTML=e},setTextContent:function(t,e){var n=u.find(function(e){return e.id===t}).linkButton.getAttribute("data-target");document.getElementById(n).textContent=e},setHeader:function(t){B.querySelector(".tab-header").textContent=t},setFooterText:function(t){B.querySelector(".tab-footer").textContent=t},destroy:function(){B.outerHTML=y,document.getElementById(w).remove(),h("destroy",null)}}},debounce:b}}()});
//# sourceMappingURL=tabview.umd.js.map
