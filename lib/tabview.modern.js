function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/* jshint esversion: 8 */
var TabView = /*#__PURE__*/function () {
  //  tabs = new Map()
  function TabView() {
    this.tabIndex = -1;
    this.currentIndex = 0;
    this.links = {};
    this.tabs = new Map();
    this.buttons = {};
    this.pages = {};
    this.selectedTab = {};
    this.hiddenTabs = [];
  }

  var _proto = TabView.prototype;

  _proto.generateRandomString = function generateRandomString() {
    return Math.random().toString(36).slice(2);
  };

  _proto.createLinkButton = function createLinkButton(linkId, tabId, _ref) {
    var pageId = _ref.pageId,
        style = _ref.style,
        title = _ref.title;
    var linkButton = document.createElement("button");
    linkButton.className = "tab-link";
    linkButton.setAttribute("href", "#!");
    linkButton.setAttribute("id", linkId);
    linkButton.setAttribute("title", title);
    linkButton.setAttribute("name", "tab-link");
    linkButton.setAttribute("draggable", "true");
    linkButton.setAttribute("data-tab", tabId);
    linkButton.setAttribute("data-target", pageId);
    linkButton.style.outline = "none";
    linkButton.style.height = "100%";
    linkButton.style.width = "auto";
    linkButton.style.border = "0 none transparent";
    linkButton.style.fontSize = "12px";
    linkButton.style.fontWeight = "500";
    linkButton.style.margin = "0";
    linkButton.style.padding = "0";
    linkButton.style.boxShadow = "none";
    linkButton.style.background = "inherit";
    linkButton.style.color = "inherit";
    linkButton.style.cursor = "pointer";
    linkButton.style.transition = "background .75s";

    if (style) {
      linkButton.style.borderRadius = "8px 1px 0px 0px";
    } else {
      linkButton.style.borderRadius = "1px 1px 0px 0px";
    }

    return linkButton;
  };

  _proto.createCloseButton = function createCloseButton() {
    var button = document.createElement("a");
    button.innerHTML = "&times";
    button.setAttribute("name", "close-button");
    button.setAttribute("title", "close");
    button.style.borderRadius = "50%";
    button.style.visibility = "hidden";
    button.style.height = button.style.width = "20px";
    button.style["float"] = "right";
    button.style.marginRight = "2px";
    button.style.marginLeft = "5px";
    button.style.display = "flex";
    button.style.padding = "2px 0px 0px 4px";
    button.style.alignContent = "center";
    button.style.alignItems = "center";
    button.style.fontSize = "18px";
    button.style.color = "#efefef";
    button.style.fontWeight = "700";
    button.style.background = "transparent";
    button.addEventListener("mouseenter", function () {
      button.style.background = "#555";
    });
    button.addEventListener("mouseleave", function () {
      button.style.background = "";
    });
    return button;
  };

  _proto.createPage = function createPage(pageId, tabId, linkId, options) {
    var page = document.createElement("div");
    page.setAttribute("id", pageId);
    page.setAttribute("data-tab", tabId);
    page.setAttribute("data-trigger", linkId);
    page.innerHTML = options.text || "";
    page.style.position = "absolute";
    page.style.padding = "8px 16px";
    page.style.visibility = "hidden";
    page.style.overflow = "auto";
    page.style.top = page.style.bottom = page.style.left = page.style.right = "0"; // page.style.top='0'; do not specify top!!!

    page.style.background = options.bg || "";
    return page;
  };

  _proto.createPagePanel = function createPagePanel() {
    var panel = document.createElement("div");
    panel.setAttribute("id", this.generateRandomString());
    panel.style.position = "relative";
    panel.className = "tab-panel";
    panel.style.width = "100%";
    panel.style.height = "100%";
    panel.style.overflow = "hidden";
    panel.style.margin = "0";
    panel.style.top = "0";
    panel.style.background = "";
    return panel;
  };

  _proto.createLabel = function createLabel(text) {
    var label = document.createElement("label");
    label.setAttribute("name", "tab-link-label");
    label.className = "tab-link-label";
    label.style.margin = "0";
    label.style.paddingRight = "2px";
    label.style.paddingLeft = "2px";
    label.style.verticalAlign = "middle";
    label.style.padding = "0";
    label.style.color = "inherit";
    label.style.maxWidth = "80px";
    label.style.overflow = "hidden";
    label.style.whiteSpace = "nowrap";
    label.style.background = "";
    label.style.cursor = "pointer";
    label.style.fontSize = "inherit";
    label.style.fontWeight = "inherit";
    label.append(document.createTextNode(text)); // label.setAttribute('title', title || text)

    return label;
  };

  _proto.createTabBarWraper = function createTabBarWraper() {
    var tabbarContainer = document.createElement("div");
    tabbarContainer.style.position = "relative";
    tabbarContainer.style.height = "100%";
    tabbarContainer.style.height = "100%";
    tabbarContainer.style.width = "100%";
    tabbarContainer.style.border = "none";
    tabbarContainer.style.padding = "none";
    tabbarContainer.className = "tabbar-wrapper";
    return tabbarContainer;
  };

  _proto.createBar = function createBar() {
    var tabBar = document.createElement("div");
    tabBar.setAttribute("id", this.generateRandomString());
    tabBar.style.position = "absolute";
    tabBar.style.top = "0";
    tabBar.style.bottom = "0";
    tabBar.style.left = "60px";
    tabBar.style.right = "30px";
    tabBar.style.overflow = "hidden";
    tabBar.style.padding = "0px";
    tabBar.style.margin = "0px";
    tabBar.style.paddingRight = "7px";
    tabBar.style.background = "inherit";
    tabBar.className = "tab-bar";
    return tabBar;
  };

  _proto.createTabButton = function createTabButton(name, text, _float) {
    var btn = document.createElement("button");
    btn.id = this.generateRandomString();
    btn.setAttribute("name", name);
    btn.style.height = "100%";
    btn.style.border = "0 none transparent";
    btn.style.background = "transparent";
    btn.style.color = "white";
    btn.marginRight = btn.marginLeft = "2px";
    btn.style.padding = "2px";
    btn.style.paddingLeft = btn.style.paddingRight = "7px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "900";
    btn.style.fontSize = "14px";
    btn.style["float"] = _float || "none";
    btn.style.outline = "none";
    btn.innerHTML = text;
    btn.style.borderRadius = "4px 4px";
    return btn;
  };

  _proto.createImage = function createImage(options) {
    var img = document.createElement("span");
    img.style.marginRight = "7px";
    img.style.color = "#b00";
    img.style.fontWeight = "bold";
    img.innerHTML = options.icon || "kb";
    img.style["float"] = "left";
    return img;
  };

  _proto.createLabelContainer = function createLabelContainer(options) {
    var _this = this;

    var labelContainer = document.createElement("label");
    labelContainer.setAttribute("name", "tab-link-label-wraper");
    labelContainer.style.display = "flex";
    labelContainer.style.alignContent = "center";
    labelContainer.style.alignItems = "center";
    labelContainer.style.padding = "2px";
    labelContainer.style.height = "100%";
    labelContainer.style.width = "100%";
    labelContainer.style.color = "inherit";
    labelContainer.style.background = "transparent";
    labelContainer.style.cursor = "pointer";
    var img = this.createImage(options);
    var closeBtn = this.createCloseButton();
    var label = this.createLabel(options.label, options.title);

    if (!options.closable) {
      closeBtn.style.display = "none";
      labelContainer.style.paddingRight = "7px";
    }

    labelContainer.append(img);
    labelContainer.append(label);
    labelContainer.append(closeBtn);
    closeBtn.addEventListener("click", function () {
      _this.close(closeBtn.parentNode.parentElement.getAttribute("data-tab"), _this);
    });
    return labelContainer;
  };

  _proto.createTable = function createTable(tabBarWrapper, pagePanel, banner, footer) {
    var doc = document.createDocumentFragment();
    var table = document.createElement("table");
    table.style.width = table.style.height = "100%";
    doc.append(table);
    var thead = document.createElement("thead");
    table.append(thead);
    var bannerRow = document.createElement("tr");
    bannerRow.style.minHeight = "0px";
    bannerRow.style.maxHeight = "80px";
    thead.append(bannerRow);
    var th = document.createElement("th"); // th.setAttribute('colspan',3);

    th.style.textAlign = "left";
    th.style.padding = "0";

    if (banner) {
      th.append(banner);
    } else {
      bannerRow.style.display = "none";
    }

    bannerRow.appendChild(th);
    var tbody = document.createElement("tbody");
    table.append(tbody);
    var linkRow = document.createElement("tr");
    linkRow.style.minHeight = "24px";
    linkRow.style.height = this.settings.tab_height + "px";
    linkRow.style.padding = "0";
    tbody.append(linkRow);
    var td = document.createElement("td");
    td.style.overflow = "hidden";
    td.style.whiteSpace = "nowrap";
    td.style.textAlign = "left";
    td.style.padding = "0";
    td.append(tabBarWrapper);
    linkRow.appendChild(td);
    table.style.borderCollapse = linkRow.style.borderCollapse = td.style.borderCollapse = "collapse";
    table.style.border = linkRow.style.border = td.style.border = "0 none transparent";
    var pageRow = document.createElement("tr");
    tbody.append(pageRow);
    td = document.createElement("td");
    td.append(pagePanel);
    td.style.textAlign = "left";
    td.style.padding = "0";
    pageRow.appendChild(td);
    var linkRow2 = document.createElement("tr");
    tbody.append(linkRow2);
    td = document.createElement("td");
    td.style.textAlign = "left";
    td.style.padding = "0";
    linkRow2.appendChild(td);
    linkRow2.style.minHeight = "24px";
    linkRow2.style.height = this.settings.tab_height + "px";
    var footerRow = document.createElement("tr");
    tbody.append(footerRow);
    td = document.createElement("td");
    footerRow.appendChild(td);
    footerRow.style.maxHeight = "24px";
    td = document.createElement("td");
    td.style.padding = "0";

    if (footer) {
      td.append(footer || document.createTextNode(""));
    } else {
      footerRow.style.display = "none";
    }

    footerRow.appendChild(td);
    td = document.createElement("td");
    td.style.padding = "0";
    footerRow.appendChild(td);

    if (this.settings.bottom) {
      linkRow2.firstElementChild.nextSibling.appendChild(tabBarWrapper);
      linkRow.style.display = "none";
    } else {
      linkRow2.style.display = "none";
    }

    return doc;
  };

  _proto.init = function init(el, options) {
    var _this2 = this;

    this.settings = Object.assign({}, options);
    var data = options.loadFromMarkup ? this.loadFromMarkup(el) : null;

    if (data) {
      this.settings = Object.assign(this.settings, data);
    }

    this.applySettings(this.settings);
    var leftBtn = this.createTabButton("left-nav-button", "&lt;", "left");
    this.leftBtn = leftBtn;
    leftBtn.addEventListener("click", function () {
      _this2.scroll(false);
    });
    this.leftNavId = leftBtn.id;
    var addBtn = this.createTabButton("add-tab-button", "+", "left");
    this.addBtn = addBtn;
    this.addBtnId = addBtn.id;

    if (this.settings.add) {
      this.addBtn.style.visibility = "visible";
    } else {
      this.addBtn.style.visibility = "hidden";
    }

    this.addBtn.addEventListener("click", function () {
      _this2.Event.fire("add-tab-click", _this2.generateRandomString());
    });
    var tabBar = this.createBar();
    var tabBarWraper = this.createTabBarWraper();
    tabBarWraper.append(tabBar);
    tabBarWraper.appendChild(leftBtn);
    tabBarWraper.appendChild(addBtn);
    this.tabBarId = tabBar.id;
    this.tabBar = tabBar;
    var rtBtn = this.createTabButton("right-nav-button", "&gt;", "right");
    this.rightBtn = rtBtn;
    tabBarWraper.appendChild(rtBtn);
    rtBtn.addEventListener("click", function () {
      _this2.scroll(true);
    }); // tabBarWraper.appendChild(rtBtn);

    this.rightNavId = rtBtn.id;
    var pagePanel = this.createPagePanel();
    this.pagePanelId = pagePanel.id; // let tabbar= doc.querySelector('div');

    var banner, footer;

    if (this.settings.banner) {
      banner = this.addBanner();
    }

    if (this.settings.footer) {
      footer = this.addFooter();
    }

    var doc = this.createTable(tabBar.parentElement, pagePanel, banner, footer);
    var container = typeof el === "object" ? el : document.getElementById(el);
    this.containerId = container.id;
    container.append(doc); // The tabBarWraper and tabPagePanel will be appended to tab container
    // this.mountTab(el, doc, tabPagePanel);

    this.theme = this.settings.theme;
    this.attachDomEventListeners(this);

    if (this.settings.tabs) {
      this.dynamicLoad(this.settings.tabs);
    }

    this.toggleNavigator(this.getLeftNavButton(), false);
    this.toggleNavigator(this.getRightNavButton(), false);
    return this;
  };

  _proto.applySettings = function applySettings(options) {
    var settings = {
      limit: undefined,
      banner: undefined,
      footer: undefined,
      close_click: undefined,
      infinite_scroll: false,
      style: "normal",
      // navigation : true,
      add: false,
      // width   : '100%',
      // height  : '100%',
      theme: "red",
      tab_height: 32,
      left_tip: "&lt;",
      right_tip: "&gt;",
      add_tip: "+",
      data: null
    };
    this.settings = Object.assign({}, settings, options, arguments[1]);
  };

  _proto.dynamicLoad = function dynamicLoad(tabs) {
    var _this3 = this;

    if (!tabs) return;
    var selected = null;
    tabs.forEach(function (d) {
      if (d.selected) {
        selected = d.id;
      }

      var tab = _this3.add(d);

      var page = _this3.getPage(tab.id); // page.parentElement.style.top='80px';
      // page.background='#054';


      page.innerHTML = typeof d.html === "function" ? d.html() : d.html;
      page.setAttribute("contenteditable", true);
      page.style.overflow = "auto";
      page.style.zIndex = "100";
    });

    if (selected) {
      this.select(selected);
    }
  };

  _proto.loadFromMarkup = function loadFromMarkup(el, fn) {
    if (typeof el === "string") {
      el = document.getElementById(el);
    }

    if (!el || !el.children) throw new Error("Invalid element to load markup");
    var markup = el.children; // let doc=document.createDocumentFragment();

    if (!markup || markup.length === 0) return fn();
    var banner = el.querySelector(".tab-banner");
    var footer = el.querySelector(".tab-footer");
    var links = el.querySelector(".tab-links").children;
    var pages = el.querySelector(".tab-pages").children;
    var data = {
      banner: banner.innerHTML,
      footer: footer.innerHTML,
      tabs: []
    };
    if (banner) banner.remove();
    if (footer) footer.remove();

    while (links.length > 0) {
      var node = links[0];
      var page = pages[0];
      if (!node) continue;
      data.tabs.push({
        id: node.id !== "" ? node.id : null,
        label: node.textContent,
        title: node.getAttribute("title"),
        closable: node.getAttribute("closable"),
        target: node.getAttribute("data-target"),
        selected: node.getAttribute("selected"),
        html: page ? page.innerHTML : "",
        bg: page ? page.style.background : "#0bc",
        style: node.getAttribute("tab-style")
      });
      node.remove();
      page.remove();
    }

    return data;
  };

  _proto.getPage = function getPage(id) {
    var tab = this.tabs.get(id);
    return document.getElementById(tab.pageId);
  };

  _proto.getLinkButton = function getLinkButton(linkId) {
    return document.getElementById(linkId);
  };

  _proto.getCloswButton = function getCloswButton(id) {
    var linkButton = this.getLinkButton(id);
    return linkButton ? linkButton.lastElementChild() : null;
  };

  _proto.getTabPagePanel = function getTabPagePanel() {
    return document.getElementById(this.pagePanelId);
  };

  _proto.getRightNavButton = function getRightNavButton() {
    return this.rightBtn;
  };

  _proto.getLeftNavButton = function getLeftNavButton() {
    return this.leftBtn;
  };

  _proto.getAddButton = function getAddButton() {
    return this.addBtn;
  };

  _proto.getFooter = function getFooter() {
    return document.getElementById(this.footerId);
  };

  _proto.getBanner = function getBanner() {
    return document.getElementById(this.bannerId);
  };

  _proto.getTabBar = function getTabBar() {
    return document.getElementById(this.tabBarId);
  };

  _proto.getContainer = function getContainer() {
    return document.getElementById(this.containerId);
  };

  _proto.hideExtraTabs = function hideExtraTabs() {
    var links = Object.values(this.links);
    var numTotal = links.length;
    var numVisible = Math.min(numTotal, this.settings.limit);

    for (var i = 0; i < links.length; i++) {
      links[i].style.display = "none"; // hide xo tabs.
    }

    for (var j = 0; j < numVisible; j++) {
      this.links[j].style.display = "inline"; // Show visible tabs.
    }
  };

  _proto.getLinkTarget = function getLinkTarget(el) {
    try {
      while (el.name !== "tab-link") {
        el = el.parentElement;
      }

      return el;
    } catch (e) {
      // const length = this.tabs.size - 1
      return this.getTabAtIndex(this.tabs.size - 1).linkButton; // Object.values(this.tabs)[length].linkButton
    }
  };

  _proto.allowDrop = function allowDrop(ev) {
    ev.preventDefault();
  };

  _proto.drag = function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  _proto.drop = function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text"); // do not drop on label wrappers or close button

    var target = this.getLinkTarget(ev.target);
    var dataEl = document.getElementById(data);

    if (this.dragStartPoint > this.dragStopPoint) {
      target.before(dataEl);
    } else {
      target.after(dataEl);
    } // target.parentNode.insertBefore(dataEl,this.dragStartPoint>this.dragStopPoint?target:target.nextSibling);

  };

  _proto.addFooter = function addFooter() {
    var footer = document.createElement("span");
    footer.setAttribute("name", "tab-footer");
    footer.innerHTML = this.settings.footer;
    footer.className = "tab-footer";
    footer.style.left = "0";
    footer.style.right = "0";
    footer.style.bottom = "0";
    footer.style.padding = "2px";
    footer.style.display = "flex";
    footer.style.justifyContent = "center";
    footer.style.alignItems = "center"; // footer.style.background='#030';
    // footer.style.borderTop='1px solid #020';

    return footer;
  };

  _proto.addBanner = function addBanner() {
    var banner = document.createElement("span");
    banner.setAttribute("name", "tab-banner");
    banner.innerHTML = typeof this.settings.banner === "string" ? this.settings.banner : this.settings.banner.innerHTML;
    banner.style.display = "flex";
    banner.style.padding = "5px";
    banner.style.justifyContent = "center";
    banner.style.alignItems = "center";
    banner.className = "tab-banner";
    banner.style.background = "green";
    return banner;
  };

  _proto.mountTab = function mountTab(el, doc, tabPagePanel) {
    var container = typeof el === "object" ? el : document.getElementById(el);
    this.containerId = container.id;
    container.appendChild(tabPagePanel);
    var tabbar = doc.querySelector("div");
    var banner, footer;

    if (this.settings.banner) {
      banner = this.addBanner(container);
      container.prepend(banner);
    }

    if (this.settings.bottom) {
      container.lastChild.after(doc);
    } else {
      container.lastChild.before(doc);
    }

    if (this.settings.footer) {
      footer = this.addFooter(container);
      container.lastChild.after(footer);
    } // container.style.height='100%';
    // container.style.width='100%';


    container.style.top = container.style.bottom = container.style.left = container.style.right = "0";
    var bannerBox = banner ? banner.getBoundingClientRect() : null;
    var bannerBottom = banner ? bannerBox.bottom - bannerBox.top : 0;
    var footerBox = footer ? footer.getBoundingClientRect() : null;
    var footerTop = footer ? footerBox.bottom - footerBox.top : 0;

    if (this.settings.bottom) {
      // tab bar is at bottom oftab window
      tabbar.style.bottom = footerTop + "px";
    } else {
      tabbar.style.top = bannerBottom + "px";
    }

    tabbar.style.border = "0px none transparent";
    tabPagePanel.style.border = "0px none transparent";
  };

  _proto.getTabAtIndex = function getTabAtIndex(index) {
    var tab = null;
    var i = 0;

    for (var _iterator = _createForOfIteratorHelperLoose(this.tabs.values()), _step; !(_step = _iterator()).done;) {
      var value = _step.value;

      if (i === index) {
        tab = value;
        break;
      }

      i++;
    }

    return tab;
  };

  _proto.unhide = function unhide() {
    // const tabs = this.tabs.entries()
    var last = this.getTabAtIndex(this.tabs.size - 1).linkButton;
    var visibles = this.getVisibleTabs();
    var firstVisible = visibles[0];
    if (!firstVisible.previousSibling) return; // let lastVisible=visibles[visibles.length-1];

    var lastHidden = firstVisible.previousSibling || firstVisible;
    var width = lastHidden.getBoundingClientRect().width;
    var gap = this.tabBar.getBoundingClientRect().right - last.getBoundingClientRect().right;

    if (width < gap) {
      this.scrollLinkIntoView(lastHidden);
    }
  };

  _proto.attachDomEventListeners = function attachDomEventListeners() {
    var _this4 = this;

    // let self = this
    var tabBar = this.getTabBar();
    window.addEventListener("resize", function () {
      _this4.debounce(function () {
        if (!_this4.tab) return false;

        if (!_this4.isLinkVisible(_this4.tab.linkButton)) {
          _this4.scrollLinkIntoView(_this4.tab.linkButton);
        } else {
          _this4.unhide();

          _this4.scrollLinkIntoView(_this4.tab.linkButton);
        }

        _this4.showHideNavButton();
      }, 200)();
    });
    tabBar.addEventListener("keyup", function (event) {
      _this4.handleKeypress(event);
    }, true);
    tabBar.addEventListener("drop", function (event) {
      event.preventDefault();
      _this4.dragStopPoint = event.clientX;

      _this4.drop(event);
    }, true);
    tabBar.addEventListener("dragover", function (event) {
      event.preventDefault();
    }, true);
    tabBar.addEventListener("dragstart", function (event) {
      _this4.dragStartPoint = event.clientX;

      _this4.drag(event);
    });
  };

  _proto.handleKeypress = function handleKeypress(e) {
    var code = e.keyCode;
    var link = this.tab.button; // eslint-disable-next-line default-case

    if (!link) return;

    switch (code) {
      case 37:
        if (link.previousSibling) {
          this.select(link.previousSibling);
        }

        break;
      // left key

      case 39:
        if (link.nextSibling) {
          this.select(link.nextSibling);
        }

        break;
      // right key

      case 38:
        break;
      // up key

      case 40:
        link.blur();
        break;
    }
  };

  _proto.showHideNavButton = function showHideNavButton() {
    // console.log(this.settings);
    if (this.settings.infinite_scroll) {
      return;
    }

    var visibleButtons = this.getVisibleTabs();
    var firstVisibleButton = visibleButtons[0];
    var lastVisibleButton = visibleButtons[visibleButtons.length - 1];
    if (!firstVisibleButton) return;
    var rBtn = this.getRightNavButton();
    var lBtn = this.getLeftNavButton();

    if (firstVisibleButton.previousSibling) {
      this.toggleNavButton(rBtn, true);
    } else {
      this.toggleNavButton(lBtn, false);
    }

    if (lastVisibleButton.nextSibling) {
      this.toggleNavButton(rBtn, true);
    } else {
      this.toggleNavButton(rBtn, false);
    }
  };

  _proto.toggleNavButton = function toggleNavButton(el, show) {
    if (show) {
      el.style.visibility = "visible";
    } else {
      el.style.visibility = "hidden";
    }
  };

  _proto.toggleAddButton = function toggleAddButton(show) {
    if (show) {
      this.getAddButton().style.visibility = "visible";
    } else {
      this.getAddButton().style.visibility = "hidden";
    }
  };

  _proto.showHideNavigator = function showHideNavigator() {
    var visibleButtons = this.getVisibleTabs();
    var firstVisibleButton = visibleButtons[0];
    var lastVisibleButton = visibleButtons[visibleButtons.length - 1];
    if (!firstVisibleButton) return;

    if (firstVisibleButton.previousSibling) {
      this.toggleNavigator(this.getLeftNavButton(), true);
    } else {
      this.toggleNavigator(this.getLeftNavButton(), false);
    }

    if (lastVisibleButton.nextSibling) {
      this.toggleNavigator(this.getRightNavButton(), true);
    } else {
      this.toggleNavigator(this.getRightNavButton(), false);
    }
  };

  _proto.applySelection = function applySelection(el) {
    if (!el || !el.parentElement) {
      return;
    }

    var tablinks = el.parentElement.children;

    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
      tablinks[i].style.background = "inherit";
      tablinks[i].style.color = "inherit";
      tablinks[i].firstChild.lastChild.style.visibility = "hidden";
    }

    el.classList.add("active");
    el.style.background = this.tab_settings.activeBg;
    el.style.color = this.tab_settings.activecolor;
    el.firstChild.lastChild.style.visibility = "visible";
    el.firstChild.style.color = this.tab_settings.activecolor;
  };

  _proto.applyTheme = function applyTheme() {
    var table = this.getContainer().querySelector("table");
    table.style.background = this.tab_settings.bg;
    table.style.color = this.tab_settings.color;
    this.leftBtn.style.color = this.rightBtn.style.color = this.addBtn.style.color = this.tab_settings.color;
  } // Public API

  /***
   * @param theme String
   * @returns null
   */
  ;

  _proto.toggleNavigator = function toggleNavigator(el, show) {
    if (show) {
      el.style.visibility = "visible";
    } else {
      el.style.visibility = "hidden";
    }
  }
  /* toggleAddButton (show) {
    if (show) { this.addButton.style.visibility = 'visible' } else { this.addButton.style.visibility = 'hidden' }
  } */
  ;

  _proto.getSelectedTab = function getSelectedTab() {
    return this.tab;
  };

  _proto.getTab = function getTab(tabId) {
    return this.tabs.get(tabId);
  };

  _proto.setContent = function setContent(id, content) {
    var page = this.tabs.get(id).pageId;
    document.getElementById(page).innerHTML = content;
  };

  _proto.setTitle = function setTitle(id, title) {
    var link = this.tabs.get(id).linkId;
    document.getElementById(link).firstElementChild.innerHTML = title;
  };

  _proto.add = function add(options) {
    var _this5 = this;

    if (options === void 0) {
      options = {};
    }

    var length = Object.keys(this.buttons).length;
    var tabId = options.tabId || this.generateRandomString();
    var buttonId = "link-btn-" + this.generateRandomString(); // tabId,

    var settings = {
      buttonId: "link-btn-" + this.generateRandomString(),
      // tabId,
      target: "page-" + tabId,
      label: "Tab" + Number(length + 1),
      title: this.label,
      html: "",
      closable: true,
      data: null,
      icon: "kb",
      bg: options.bg || "inherit",
      color: options.color || "inherit",
      style: options.style || "fancy"
    };
    options.bg = options.bg === "transparent" ? "" : options.bg;

    if (options.buttonId === null) {
      delete options.buttonId;
    }

    this.settings = Object.assign(settings, options);
    var page = this.createPage(this.settings.target, tabId, buttonId, this.settings);
    this.getTabPagePanel().appendChild(page);
    var linkButton = this.createLinkButton(buttonId, tabId, this.settings);
    this.buttons[linkButton.id] = linkButton;
    var labelContainer = this.createLabelContainer(this.settings);
    linkButton.append(labelContainer);
    linkButton.addEventListener("click", function () {
      _this5.select(linkButton);
    });
    linkButton.addEventListener("mouseenter", function () {
      if (_this5.tab.linkButton.id === linkButton.id) return;
      linkButton.firstChild.lastChild.style.visibility = "visible";
    });
    linkButton.addEventListener("mouseleave", function () {
      var tab = _this5.getSelectedTab();

      if (tab.linkButton.id === linkButton.id) return;
      linkButton.firstChild.lastChild.style.visibility = "hidden";
    }); // If there was a selected button already, insert after it
    // otherwise append at the end of tab list

    if (this.tab) {
      // this.tab.selected=false;
      this.tab.linkButton.after(linkButton); // this.getLinkButton(this.tab.linkId).after(linkButton);
    } else {
      this.getTabBar().appendChild(linkButton);
    }

    this.tabs.set(tabId, {
      id: tabId,
      label: settings.label,
      text: settings.text,
      title: settings.title,
      linkId: settings.buttonId,
      pageId: settings.target,
      data: settings.data,
      selected: settings.selected,
      linkButton: linkButton,
      page: page
    });
    this.tab = this.tabs.get(tabId);
    this.showHideNavButton();
    this.select(linkButton);

    if (settings.selected) {
      return this.tab;
    }

    return this.tab;
  };

  _proto.select = function select(el, before) {
    var linkButton = el;

    if (!el) {
      throw new Error("Invalid tab address:");
    } else if (typeof el === "string" || isFinite(el)) {
      linkButton = this.getLinkButton(el);
    } else if (el.id) {
      linkButton = el;
    } else {
      throw new Error("Invalid Button or ID");
    }

    if (typeof before === "function") {
      var result = before();
      if (result === false) return false;
    } // this.tabs.values().forEach((tab) => {


    for (var _iterator2 = _createForOfIteratorHelperLoose(this.tabs.values()), _step2; !(_step2 = _iterator2()).done;) {
      var tab = _step2.value;

      if (tab.linkButton.id === linkButton.id) {
        tab.selected = true;
        this.tab = tab;
        document.getElementById(tab.pageId).style.visibility = "visible";
      } else {
        tab.selected = false;
        document.getElementById(tab.pageId).style.visibility = "hidden";
      }
    }

    this.applySelection(linkButton);

    if (!this.isLinkVisible(linkButton)) {
      this.scrollLinkIntoView(linkButton);
    }

    this.Event.fire("select", this.tab);
    return this.tab;
  };

  _proto.close = function close(el) {
    var tabId = el;

    if (!el) {
      throw new Error("Invalid tab address:");
    } else if (typeof id === "string") ; else if (el.id) {
      tabId = el.id; // .substr(5);//button Element
    }

    var tab = this.tabs.get(tabId);
    var link = tab.linkButton; // this.getLinkButton(tab.linkId);

    var next = link.nextSibling;
    var prev = link.previousSibling;
    this.Event.fire("before_close", tab);
    link.remove();
    document.getElementById(tab.pageId).remove(); // delete this.links[id];

    delete this.tab;
    this.tabs["delete"](tabId);
    this.Event.fire("close", tab);

    if (next && next.tagName === "BUTTON") {
      this.select(next);
    } else if (prev && prev.tagName === "BUTTON") {
      this.select(prev);
    }

    this.showHideNavigator();
    this.scroll(true);
    return tabId;
  };

  _proto.isLinkVisible = function isLinkVisible(link) {
    var box = link.getBoundingClientRect();
    var tabbar = this.getTabBar();
    if (!tabbar) return false;
    var box1 = tabbar.getBoundingClientRect();
    return box.left >= box1.left && box.right <= box1.right;
  };

  _proto.getVisibleTabs = function getVisibleTabs() {
    var _this6 = this;

    var tabbar = this.getTabBar();
    if (!tabbar) return false;
    var links = Array.prototype.slice.call(tabbar.querySelectorAll("button"));
    return links.filter(function (link) {
      return _this6.isLinkVisible(link);
    });
  };

  _proto.getHiddenTabs = function getHiddenTabs() {
    var _this7 = this;

    var links = Array.prototype.slice.call(this.getTabBar().querySelectorAll("button"));
    return links.filter(function (link) {
      return !_this7.isLinkVisible(link);
    });
  };

  _proto.scroll = function scroll(right) {
    if (this.settings.infinite_scroll) {
      this.infiniteScroll(right);
    } else {
      this.finiteScroll(right);
      this.showHideNavigator();
    }
  };

  _proto.scrollLinkIntoView = function scrollLinkIntoView(el) {
    if (this.isLinkVisible(el)) return;
    var max = this.tabs.size;
    var count = 0;

    while (!this.isLinkVisible(el)) {
      this.getRightNavButton().click();
      count++;
      if (count > max) break;
    }

    count = 0;

    while (!this.isLinkVisible(el)) {
      this.getLeftNavButton().click();
      count++;
      if (this.isLinkVisible(el)) return;
      if (count > max) break;
    }
  };

  _proto.finiteScroll = function finiteScroll(right) {
    this.count = this.count ? this.count : 1;
    this.count++;
    var visibleButtons = this.getVisibleTabs();
    var firstVisibleButton = visibleButtons[0];
    var lastVisibleButton = visibleButtons[visibleButtons.length - 1];

    if (right && lastVisibleButton && lastVisibleButton.nextSibling) {
      firstVisibleButton.style.display = "none";
    } else if (!right && firstVisibleButton && firstVisibleButton.previousSibling) {
      firstVisibleButton.previousSibling.style.display = "";
    } else {
      var tabbar = this.getTabBar();
      if (!tabbar) return;
      var bts = tabbar.querySelectorAll("button");

      if (bts.length > 0) {
        bts[bts.length - 1].style.display = "";
      }
    }
  };

  _proto.infiniteScroll = function infiniteScroll(right) {
    var tabbar = this.getTabBar();
    if (!tabbar) return;
    var links = tabbar.querySelectorAll("button");

    if (links.length > 1) {
      if (right) {
        links[links.length - 1].after(links[0]);
      } else {
        links[0].before(links[links.length - 1]);
      }
    }
  }
  /* TabView.prototype.fire = function (event, data, cancelable, bubbles){
    let myEvent = new CustomEvent(event, {detail:data, cancelable:cancelable, bubbles:bubbles});
    document.dispatchEvent(myEvent);
  }  ; */
  ;

  _proto.onBeforeClose = function onBeforeClose(fn, ctx) {
    this.Event.on("tab_before_close", fn, ctx);
  };

  _proto.onClose = function onClose(fn, ctx) {
    this.Event.on("tab_close", fn, ctx);
  };

  _proto.onSelect = function onSelect(fn, ctx) {
    this.Event.on("tab_before_select", fn, ctx);
  };

  _proto.onBeforeSelect = function onBeforeSelect(fn) {
    this.addListener("tab_select", fn);
  };

  _proto.onOpen = function onOpen(fn, ctx) {
    this.Event.on("tab_open", fn, ctx);
  };

  _proto.onBeforeOpen = function onBeforeOpen(fn, ctx) {
    this.Event.on("tab_before_open", fn, ctx);
  };

  _proto.destroy = function destroy() {
    // destroy
    this.removeListeners();
  };

  _createClass(TabView, [{
    key: "theme",
    get: function get() {
      return this.settings.theme;
    },
    set: function set(theme) {
      this.settings.theme = theme;
      var color = "#ddd";
      var bg = "#222";
      var activecolor = "#ddd";
      var activeBg = "#003355";

      switch (theme) {
        case "dark":
          bg = "#002255";
          activeBg = "#003355";
          color = "#fff";
          break;

        case "black":
          bg = "#111";
          activeBg = "#333";
          color = "#fff";
          break;

        case "blue":
          bg = "rgba(8, 68, 117, 1)";
          activeBg = "rgba(10, 100, 186, 1)";
          break;

        case "green":
          bg = "rgba(0, 149, 120, 1)";
          activeBg = "rgba(0, 139, 100, 0.9)";
          break;

        case "red":
          bg = "rgb(120, 0, 30)";
          activeBg = "rgb(123, 0, 50)";
          break;

        case "white":
          bg = "#bcd";
          color = "#000";
          activecolor = "#eee";
          break;

        default:
          bg = "rgba(10, 100, 186, 1)";
          activeBg = "rgba(10, 100, 206, 1)";
          color = "#fff";
          break;
      }

      this.page_settings = {
        bg: color,
        color: bg
      };
      this.tab_settings = {
        bg: bg,
        color: color,
        activecolor: activecolor,
        activeBg: activeBg
      };
      this.applyTheme();
    }
  }]);

  return TabView;
}(); // Returns a function, that, as long as it continues to be invoked, will not

TabView.prototype.debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

TabView.prototype.Emitter = {
  fire: function fire(event, data, context, cancelable, bubbles) {
    var cntx = context || document;
    var myEvent = new CustomEvent(event, {
      detail: data,
      cancelable: cancelable || false,
      bubbles: bubbles || false
    });
    cntx.dispatchEvent(myEvent);
  },
  on: function on(event, listener, context) {
    var cntx = context || document;
    cntx.addEventListener(event, listener); // this.off(event, listener, context);
  },
  off: function off(event, listener, context) {
    var cntx = context || document;
    cntx.removeEventListener(event, listener);
  }
};
TabView.prototype.Event = {
  _listeners: {},
  addListener: function addListener(type, listener) {
    if (typeof this._listeners[type] === "undefined") {
      this._listeners[type] = [];
    }

    this._listeners[type].push(listener);
  },
  attach: function attach(type, listener) {
    this.addListener(type, listener);
  },
  on: function on(type, listener) {
    this.addListener(type, listener);
  },
  fire: function fire(event, data, target) {
    if (typeof event === "string") {
      event = {
        type: event,
        data: data,
        target: target
      };
    }

    if (!event.target) {
      event.target = this;
    }

    if (!event.type) {
      // falsy
      throw new Error("Type error");
    }

    if (this._listeners[event.type] instanceof Array) {
      var listeners = this._listeners[event.type];

      for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].call(this, event);
      }
    }
  },
  trigger: function trigger(type, listener) {
    this.fire(type, listener);
  },
  removeListener: function removeListener(type, listener) {
    if (this._listeners[type] instanceof Array) {
      var listeners = this._listeners[type];

      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  },
  off: function off(type, listener) {
    this.removeListener(type, listener);
  }
};

export { TabView as default };
//# sourceMappingURL=tabview.modern.js.map
