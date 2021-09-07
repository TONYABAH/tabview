var TabView=function(){function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var e=function(){function e(){this.tabIndex=-1,this.currentIndex=0,this.links={},this.tabs=new Map,this.buttons={},this.pages={},this.selectedTab={},this.hiddenTabs=[]}var n,i=e.prototype;return i.generateRandomString=function(){return Math.random().toString(36).slice(2)},i.createLinkButton=function(t,e,n){var i=n.pageId,s=n.style,r=n.title,a=document.createElement("button");return a.className="tab-link",a.setAttribute("href","#!"),a.setAttribute("id",t),a.setAttribute("title",r),a.setAttribute("name","tab-link"),a.setAttribute("draggable","true"),a.setAttribute("data-tab",e),a.setAttribute("data-target",i),a.style.outline="none",a.style.height="100%",a.style.width="auto",a.style.border="0 none transparent",a.style.fontSize="12px",a.style.fontWeight="500",a.style.margin="0",a.style.padding="0",a.style.boxShadow="none",a.style.background="inherit",a.style.color="inherit",a.style.cursor="pointer",a.style.transition="background .75s",a.style.borderRadius=s?"8px 1px 0px 0px":"1px 1px 0px 0px",a},i.createCloseButton=function(){var t=document.createElement("a");return t.innerHTML="&times",t.setAttribute("name","close-button"),t.setAttribute("title","close"),t.style.borderRadius="50%",t.style.visibility="hidden",t.style.height=t.style.width="20px",t.style.float="right",t.style.marginRight="2px",t.style.marginLeft="5px",t.style.display="flex",t.style.padding="2px 0px 0px 4px",t.style.alignContent="center",t.style.alignItems="center",t.style.fontSize="18px",t.style.color="#efefef",t.style.fontWeight="700",t.style.background="transparent",t.addEventListener("mouseenter",function(){t.style.background="#555"}),t.addEventListener("mouseleave",function(){t.style.background=""}),t},i.createPage=function(t,e,n,i){var s=document.createElement("div");return s.setAttribute("id",t),s.setAttribute("data-tab",e),s.setAttribute("data-trigger",n),s.innerHTML=i.text||"",s.style.position="absolute",s.style.padding="8px 16px",s.style.visibility="hidden",s.style.overflow="auto",s.style.top=s.style.bottom=s.style.left=s.style.right="0",s.style.background=i.bg||"",s},i.createPagePanel=function(){var t=document.createElement("div");return t.setAttribute("id",this.generateRandomString()),t.style.position="relative",t.className="tab-panel",t.style.width="100%",t.style.height="100%",t.style.overflow="hidden",t.style.margin="0",t.style.top="0",t.style.background="",t},i.createLabel=function(t){var e=document.createElement("label");return e.setAttribute("name","tab-link-label"),e.className="tab-link-label",e.style.margin="0",e.style.paddingRight="2px",e.style.paddingLeft="2px",e.style.verticalAlign="middle",e.style.padding="0",e.style.color="inherit",e.style.maxWidth="80px",e.style.overflow="hidden",e.style.whiteSpace="nowrap",e.style.background="",e.style.cursor="pointer",e.style.fontSize="inherit",e.style.fontWeight="inherit",e.append(document.createTextNode(t)),e},i.createTabBarWraper=function(){var t=document.createElement("div");return t.style.position="relative",t.style.height="100%",t.style.height="100%",t.style.width="100%",t.style.border="none",t.style.padding="none",t.className="tabbar-wrapper",t},i.createBar=function(){var t=document.createElement("div");return t.setAttribute("id",this.generateRandomString()),t.style.position="absolute",t.style.top="0",t.style.bottom="0",t.style.left="60px",t.style.right="30px",t.style.overflow="hidden",t.style.padding="0px",t.style.margin="0px",t.style.paddingRight="7px",t.style.background="inherit",t.className="tab-bar",t},i.createTabButton=function(t,e,n){var i=document.createElement("button");return i.id=this.generateRandomString(),i.setAttribute("name",t),i.style.height="100%",i.style.border="0 none transparent",i.style.background="transparent",i.style.color="white",i.marginRight=i.marginLeft="2px",i.style.padding="2px",i.style.paddingLeft=i.style.paddingRight="7px",i.style.cursor="pointer",i.style.fontWeight="900",i.style.fontSize="14px",i.style.float=n||"none",i.style.outline="none",i.innerHTML=e,i.style.borderRadius="4px 4px",i},i.createImage=function(t){var e=document.createElement("span");return e.style.marginRight="7px",e.style.color="#b00",e.style.fontWeight="bold",e.innerHTML=t.icon||"kb",e.style.float="left",e},i.createLabelContainer=function(t){var e=this,n=document.createElement("label");n.setAttribute("name","tab-link-label-wraper"),n.style.display="flex",n.style.alignContent="center",n.style.alignItems="center",n.style.padding="2px",n.style.height="100%",n.style.width="100%",n.style.color="inherit",n.style.background="transparent",n.style.cursor="pointer";var i=this.createImage(t),s=this.createCloseButton(),r=this.createLabel(t.label,t.title);return t.closable||(s.style.display="none",n.style.paddingRight="7px"),n.append(i),n.append(r),n.append(s),s.addEventListener("click",function(){e.close(s.parentNode.parentElement.getAttribute("data-tab"),e)}),n},i.createTable=function(t,e,n,i){var s=document.createDocumentFragment(),r=document.createElement("table");r.style.width=r.style.height="100%",s.append(r);var a=document.createElement("thead");r.append(a);var l=document.createElement("tr");l.style.minHeight="0px",l.style.maxHeight="80px",a.append(l);var o=document.createElement("th");o.style.textAlign="left",o.style.padding="0",n?o.append(n):l.style.display="none",l.appendChild(o);var d=document.createElement("tbody");r.append(d);var c=document.createElement("tr");c.style.minHeight="24px",c.style.height=this.settings.tab_height+"px",c.style.padding="0",d.append(c);var h=document.createElement("td");h.style.overflow="hidden",h.style.whiteSpace="nowrap",h.style.textAlign="left",h.style.padding="0",h.append(t),c.appendChild(h),r.style.borderCollapse=c.style.borderCollapse=h.style.borderCollapse="collapse",r.style.border=c.style.border=h.style.border="0 none transparent";var u=document.createElement("tr");d.append(u),(h=document.createElement("td")).append(e),h.style.textAlign="left",h.style.padding="0",u.appendChild(h);var g=document.createElement("tr");d.append(g),(h=document.createElement("td")).style.textAlign="left",h.style.padding="0",g.appendChild(h),g.style.minHeight="24px",g.style.height=this.settings.tab_height+"px";var b=document.createElement("tr");return d.append(b),h=document.createElement("td"),b.appendChild(h),b.style.maxHeight="24px",(h=document.createElement("td")).style.padding="0",i?h.append(i||document.createTextNode("")):b.style.display="none",b.appendChild(h),(h=document.createElement("td")).style.padding="0",b.appendChild(h),this.settings.bottom?(g.firstElementChild.nextSibling.appendChild(t),c.style.display="none"):g.style.display="none",s},i.init=function(t,e){var n=this;this.settings=Object.assign({},e);var i=e.loadFromMarkup?this.loadFromMarkup(t):null;i&&(this.settings=Object.assign(this.settings,i)),this.applySettings(this.settings);var s=this.createTabButton("left-nav-button","&lt;","left");this.leftBtn=s,s.addEventListener("click",function(){n.scroll(!1)}),this.leftNavId=s.id;var r=this.createTabButton("add-tab-button","+","left");this.addBtn=r,this.addBtnId=r.id,this.addBtn.style.visibility=this.settings.add?"visible":"hidden",this.addBtn.addEventListener("click",function(){n.Event.fire("add-tab-click",n.generateRandomString())});var a=this.createBar(),l=this.createTabBarWraper();l.append(a),l.appendChild(s),l.appendChild(r),this.tabBarId=a.id,this.tabBar=a;var o=this.createTabButton("right-nav-button","&gt;","right");this.rightBtn=o,l.appendChild(o),o.addEventListener("click",function(){n.scroll(!0)}),this.rightNavId=o.id;var d,c,h=this.createPagePanel();this.pagePanelId=h.id,this.settings.banner&&(d=this.addBanner()),this.settings.footer&&(c=this.addFooter());var u=this.createTable(a.parentElement,h,d,c),g="object"==typeof t?t:document.getElementById(t);return this.containerId=g.id,g.append(u),this.theme=this.settings.theme,this.attachDomEventListeners(this),this.settings.tabs&&this.dynamicLoad(this.settings.tabs),this.toggleNavigator(this.getLeftNavButton(),!1),this.toggleNavigator(this.getRightNavButton(),!1),this},i.applySettings=function(t){var e={limit:void 0,banner:void 0,footer:void 0,close_click:void 0,infinite_scroll:!1,style:"normal",add:!1,theme:"red",tab_height:32,left_tip:"&lt;",right_tip:"&gt;",add_tip:"+",data:null};this.settings=Object.assign({},e,t,arguments[1])},i.dynamicLoad=function(t){var e=this;if(t){var n=null;t.forEach(function(t){t.selected&&(n=t.id);var i=e.add(t),s=e.getPage(i.id);s.innerHTML="function"==typeof t.html?t.html():t.html,s.setAttribute("contenteditable",!0),s.style.overflow="auto",s.style.zIndex="100"}),n&&this.select(n)}},i.loadFromMarkup=function(t,e){if("string"==typeof t&&(t=document.getElementById(t)),!t||!t.children)throw new Error("Invalid element to load markup");var n=t.children;if(!n||0===n.length)return e();var i=t.querySelector(".tab-banner"),s=t.querySelector(".tab-footer"),r=t.querySelector(".tab-links").children,a=t.querySelector(".tab-pages").children,l={banner:i.innerHTML,footer:s.innerHTML,tabs:[]};for(i&&i.remove(),s&&s.remove();r.length>0;){var o=r[0],d=a[0];o&&(l.tabs.push({id:""!==o.id?o.id:null,label:o.textContent,title:o.getAttribute("title"),closable:o.getAttribute("closable"),target:o.getAttribute("data-target"),selected:o.getAttribute("selected"),html:d?d.innerHTML:"",bg:d?d.style.background:"#0bc",style:o.getAttribute("tab-style")}),o.remove(),d.remove())}return l},i.getPage=function(t){var e=this.tabs.get(t);return document.getElementById(e.pageId)},i.getLinkButton=function(t){return document.getElementById(t)},i.getCloswButton=function(t){var e=this.getLinkButton(t);return e?e.lastElementChild():null},i.getTabPagePanel=function(){return document.getElementById(this.pagePanelId)},i.getRightNavButton=function(){return this.rightBtn},i.getLeftNavButton=function(){return this.leftBtn},i.getAddButton=function(){return this.addBtn},i.getFooter=function(){return document.getElementById(this.footerId)},i.getBanner=function(){return document.getElementById(this.bannerId)},i.getTabBar=function(){return document.getElementById(this.tabBarId)},i.getContainer=function(){return document.getElementById(this.containerId)},i.hideExtraTabs=function(){for(var t=Object.values(this.links),e=Math.min(t.length,this.settings.limit),n=0;n<t.length;n++)t[n].style.display="none";for(var i=0;i<e;i++)this.links[i].style.display="inline"},i.getLinkTarget=function(t){try{for(;"tab-link"!==t.name;)t=t.parentElement;return t}catch(t){return this.getTabAtIndex(this.tabs.size-1).linkButton}},i.allowDrop=function(t){t.preventDefault()},i.drag=function(t){t.dataTransfer.setData("text",t.target.id)},i.drop=function(t){t.preventDefault();var e=t.dataTransfer.getData("text"),n=this.getLinkTarget(t.target),i=document.getElementById(e);this.dragStartPoint>this.dragStopPoint?n.before(i):n.after(i)},i.addFooter=function(){var t=document.createElement("span");return t.setAttribute("name","tab-footer"),t.innerHTML=this.settings.footer,t.className="tab-footer",t.style.left="0",t.style.right="0",t.style.bottom="0",t.style.padding="2px",t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t},i.addBanner=function(){var t=document.createElement("span");return t.setAttribute("name","tab-banner"),t.innerHTML="string"==typeof this.settings.banner?this.settings.banner:this.settings.banner.innerHTML,t.style.display="flex",t.style.padding="5px",t.style.justifyContent="center",t.style.alignItems="center",t.className="tab-banner",t.style.background="green",t},i.mountTab=function(t,e,n){var i="object"==typeof t?t:document.getElementById(t);this.containerId=i.id,i.appendChild(n);var s,r,a=e.querySelector("div");this.settings.banner&&(s=this.addBanner(i),i.prepend(s)),this.settings.bottom?i.lastChild.after(e):i.lastChild.before(e),this.settings.footer&&(r=this.addFooter(i),i.lastChild.after(r)),i.style.top=i.style.bottom=i.style.left=i.style.right="0";var l=s?s.getBoundingClientRect():null,o=s?l.bottom-l.top:0,d=r?r.getBoundingClientRect():null;this.settings.bottom?a.style.bottom=(r?d.bottom-d.top:0)+"px":a.style.top=o+"px",a.style.border="0px none transparent",n.style.border="0px none transparent"},i.getTabAtIndex=function(e){for(var n,i=null,s=0,r=function(e,n){var i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(i)return(i=i.call(e)).next.bind(i);if(Array.isArray(e)||(i=function(e,n){if(e){if("string"==typeof e)return t(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?t(e,n):void 0}}(e))){i&&(e=i);var s=0;return function(){return s>=e.length?{done:!0}:{done:!1,value:e[s++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(this.tabs.values());!(n=r()).done;){if(s===e){i=n.value;break}s++}return i},i.unhide=function(){var t=this.getTabAtIndex(this.tabs.size-1).linkButton,e=this.getVisibleTabs()[0];if(e.previousSibling){var n=e.previousSibling||e;n.getBoundingClientRect().width<this.tabBar.getBoundingClientRect().right-t.getBoundingClientRect().right&&this.scrollLinkIntoView(n)}},i.attachDomEventListeners=function(){var t=this,e=this.getTabBar();window.addEventListener("resize",function(){t.debounce(function(){if(!t.tab)return!1;t.isLinkVisible(t.tab.linkButton)?(t.unhide(),t.scrollLinkIntoView(t.tab.linkButton)):t.scrollLinkIntoView(t.tab.linkButton),t.showHideNavButton()},200)()}),e.addEventListener("keyup",function(e){t.handleKeypress(e)},!0),e.addEventListener("drop",function(e){e.preventDefault(),t.dragStopPoint=e.clientX,t.drop(e)},!0),e.addEventListener("dragover",function(t){t.preventDefault()},!0),e.addEventListener("dragstart",function(e){t.dragStartPoint=e.clientX,t.drag(e)})},i.handleKeypress=function(t){var e=this.tab.button;if(e)switch(t.keyCode){case 37:e.previousSibling&&this.select(e.previousSibling);break;case 39:e.nextSibling&&this.select(e.nextSibling);break;case 38:break;case 40:e.blur()}},i.showHideNavButton=function(){if(!this.settings.infinite_scroll){var t=this.getVisibleTabs(),e=t[0],n=t[t.length-1];if(e){var i=this.getRightNavButton(),s=this.getLeftNavButton();e.previousSibling?this.toggleNavButton(i,!0):this.toggleNavButton(s,!1),this.toggleNavButton(i,!!n.nextSibling)}}},i.toggleNavButton=function(t,e){t.style.visibility=e?"visible":"hidden"},i.toggleAddButton=function(t){this.getAddButton().style.visibility=t?"visible":"hidden"},i.showHideNavigator=function(){var t=this.getVisibleTabs(),e=t[0],n=t[t.length-1];e&&(this.toggleNavigator(this.getLeftNavButton(),!!e.previousSibling),this.toggleNavigator(this.getRightNavButton(),!!n.nextSibling))},i.applySelection=function(t){if(t&&t.parentElement){for(var e=t.parentElement.children,n=0;n<e.length;n++)e[n].classList.remove("active"),e[n].style.background="inherit",e[n].style.color="inherit",e[n].firstChild.lastChild.style.visibility="hidden";t.classList.add("active"),t.style.background=this.tab_settings.activeBg,t.style.color=this.tab_settings.activecolor,t.firstChild.lastChild.style.visibility="visible",t.firstChild.style.color=this.tab_settings.activecolor}},i.applyTheme=function(){var t=this.getContainer().querySelector("table");t.style.background=this.tab_settings.bg,t.style.color=this.tab_settings.color,this.leftBtn.style.color=this.rightBtn.style.color=this.addBtn.style.color=this.tab_settings.color},i.toggleNavigator=function(t,e){t.style.visibility=e?"visible":"hidden"},i.getSelectedTab=function(){return this.tab},i.getTab=function(t){return this.tabs.get(t)},i.setContent=function(t,e){var n=this.tabs.get(t).pageId;document.getElementById(n).innerHTML=e},i.setTitle=function(t,e){var n=this.tabs.get(t).linkId;document.getElementById(n).firstElementChild.innerHTML=e},i.add=function(t){var e=this;void 0===t&&(t={});var n=Object.keys(this.buttons).length,i=t.tabId||this.generateRandomString(),s="link-btn-"+this.generateRandomString(),r={buttonId:"link-btn-"+this.generateRandomString(),target:"page-"+i,label:"Tab"+Number(n+1),title:this.label,html:"",closable:!0,data:null,icon:"kb",bg:t.bg||"inherit",color:t.color||"inherit",style:t.style||"fancy"};t.bg="transparent"===t.bg?"":t.bg,null===t.buttonId&&delete t.buttonId,this.settings=Object.assign(r,t);var a=this.createPage(this.settings.target,i,s,this.settings);this.getTabPagePanel().appendChild(a);var l=this.createLinkButton(s,i,this.settings);this.buttons[l.id]=l;var o=this.createLabelContainer(this.settings);return l.append(o),l.addEventListener("click",function(){e.select(l)}),l.addEventListener("mouseenter",function(){e.tab.linkButton.id!==l.id&&(l.firstChild.lastChild.style.visibility="visible")}),l.addEventListener("mouseleave",function(){e.getSelectedTab().linkButton.id!==l.id&&(l.firstChild.lastChild.style.visibility="hidden")}),this.tab?this.tab.linkButton.after(l):this.getTabBar().appendChild(l),this.tabs.set(i,{id:i,label:r.label,text:r.text,title:r.title,linkId:r.buttonId,pageId:r.target,data:r.data,selected:r.selected,linkButton:l,page:a}),this.tab=this.tabs.get(i),this.showHideNavButton(),this.select(l),this.tab},i.select=function(t,e){var n=this,i=t;if(!t)throw new Error("Invalid tab address:");if("string"==typeof t||isFinite(t))i=this.getLinkButton(t);else{if(!t.id)throw new Error("Invalid Button or ID");i=t}return("function"!=typeof e||!1!==e())&&(this.tabs.values.forEach(function(t){t.linkButton.id===i.id?(t.selected=!0,n.tab=t,document.getElementById(t.pageId).style.visibility="visible"):(t.selected=!1,document.getElementById(t.pageId).style.visibility="hidden")}),this.applySelection(i),this.isLinkVisible(i)||this.scrollLinkIntoView(i),this.Event.fire("select",this.tab),this.tab)},i.close=function(t){var e=t;if(!t)throw new Error("Invalid tab address:");"string"==typeof id||t.id&&(e=t.id);var n=this.tabs.get(e),i=n.linkButton,s=i.nextSibling,r=i.previousSibling;return this.Event.fire("before_close",n),i.remove(),document.getElementById(n.pageId).remove(),delete this.tab,this.tabs.delete(e),this.Event.fire("close",n),s&&"BUTTON"===s.tagName?this.select(s):r&&"BUTTON"===r.tagName&&this.select(r),this.showHideNavigator(),this.scroll(!0),e},i.isLinkVisible=function(t){var e=t.getBoundingClientRect(),n=this.getTabBar();if(!n)return!1;var i=n.getBoundingClientRect();return e.left>=i.left&&e.right<=i.right},i.getVisibleTabs=function(){var t=this,e=this.getTabBar();return!!e&&Array.prototype.slice.call(e.querySelectorAll("button")).filter(function(e){return t.isLinkVisible(e)})},i.getHiddenTabs=function(){var t=this;return Array.prototype.slice.call(this.getTabBar().querySelectorAll("button")).filter(function(e){return!t.isLinkVisible(e)})},i.scroll=function(t){this.settings.infinite_scroll?this.infiniteScroll(t):(this.finiteScroll(t),this.showHideNavigator())},i.scrollLinkIntoView=function(t){if(!this.isLinkVisible(t)){for(var e=this.tabs.size,n=0;!(this.isLinkVisible(t)||(this.getRightNavButton().click(),++n>e)););for(n=0;!this.isLinkVisible(t);){if(this.getLeftNavButton().click(),n++,this.isLinkVisible(t))return;if(n>e)break}}},i.finiteScroll=function(t){this.count=this.count?this.count:1,this.count++;var e=this.getVisibleTabs(),n=e[0],i=e[e.length-1];if(t&&i&&i.nextSibling)n.style.display="none";else if(!t&&n&&n.previousSibling)n.previousSibling.style.display="";else{var s=this.getTabBar();if(!s)return;var r=s.querySelectorAll("button");r.length>0&&(r[r.length-1].style.display="")}},i.infiniteScroll=function(t){var e=this.getTabBar();if(e){var n=e.querySelectorAll("button");n.length>1&&(t?n[n.length-1].after(n[0]):n[0].before(n[n.length-1]))}},i.onBeforeClose=function(t,e){this.Event.on("tab_before_close",t,e)},i.onClose=function(t,e){this.Event.on("tab_close",t,e)},i.onSelect=function(t,e){this.Event.on("tab_before_select",t,e)},i.onBeforeSelect=function(t){this.addListener("tab_select",t)},i.onOpen=function(t,e){this.Event.on("tab_open",t,e)},i.onBeforeOpen=function(t,e){this.Event.on("tab_before_open",t,e)},i.destroy=function(){this.removeListeners()},(n=[{key:"theme",get:function(){return this.settings.theme},set:function(t){this.settings.theme=t;var e="#ddd",n="#222",i="#ddd",s="#003355";switch(t){case"dark":n="#002255",s="#003355",e="#fff";break;case"black":n="#111",s="#333",e="#fff";break;case"blue":n="rgba(8, 68, 117, 1)",s="rgba(10, 100, 186, 1)";break;case"green":n="rgba(0, 149, 120, 1)",s="rgba(0, 139, 100, 0.9)";break;case"red":n="rgb(120, 0, 30)",s="rgb(123, 0, 50)";break;case"white":n="#bcd",e="#000",i="#eee";break;default:n="rgba(10, 100, 186, 1)",s="rgba(10, 100, 206, 1)",e="#fff"}this.page_settings={bg:e,color:n},this.tab_settings={bg:n,color:e,activecolor:i,activeBg:s},this.applyTheme()}}])&&function(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(e.prototype,n),e}();return e.prototype.debounce=function(t,e,n){var i;return function(){var s=this,r=arguments,a=function(){i=null,n||t.apply(s,r)},l=n&&!i;clearTimeout(i),i=setTimeout(a,e),l&&t.apply(s,r)}},e.prototype.Emitter={fire:function(t,e,n,i,s){var r=n||document,a=new CustomEvent(t,{detail:e,cancelable:i||!1,bubbles:s||!1});r.dispatchEvent(a)},on:function(t,e,n){(n||document).addEventListener(t,e)},off:function(t,e,n){(n||document).removeEventListener(t,e)}},e.prototype.Event={_listeners:{},addListener:function(t,e){void 0===this._listeners[t]&&(this._listeners[t]=[]),this._listeners[t].push(e)},attach:function(t,e){this.addListener(t,e)},on:function(t,e){this.addListener(t,e)},fire:function(t,e,n){if("string"==typeof t&&(t={type:t,data:e,target:n}),t.target||(t.target=this),!t.type)throw new Error("Type error");if(this._listeners[t.type]instanceof Array)for(var i=this._listeners[t.type],s=0,r=i.length;s<r;s++)i[s].call(this,t)},trigger:function(t,e){this.fire(t,e)},removeListener:function(t,e){if(this._listeners[t]instanceof Array)for(var n=this._listeners[t],i=0,s=n.length;i<s;i++)if(n[i]===e){n.splice(i,1);break}},off:function(t,e){this.removeListener(t,e)}},e}();
//# sourceMappingURL=tabview.js.map
