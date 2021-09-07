/* jshint esversion: 8 */
export default class TabView {
  //  tabs = new Map()
  constructor() {
    this.tabIndex = -1;
    this.currentIndex = 0;
    this.links = {};
    this.tabs = new Map();
    this.buttons = {};
    this.pages = {};
    this.selectedTab = {};
    this.hiddenTabs = [];
  }

  generateRandomString() {
    return Math.random().toString(36).slice(2);
  }

  createLinkButton(linkId, tabId, { pageId, style, title }) {
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
  }

  createCloseButton() {
    var button = document.createElement("a");
    button.innerHTML = "&times";
    button.setAttribute("name", "close-button");
    button.setAttribute("title", "close");
    button.style.borderRadius = "50%";
    button.style.visibility = "hidden";
    button.style.height = button.style.width = "20px";
    button.style.float = "right";
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
  }

  createPage(pageId, tabId, linkId, options) {
    var page = document.createElement("div");
    page.setAttribute("id", pageId);
    page.setAttribute("data-tab", tabId);
    page.setAttribute("data-trigger", linkId);
    page.innerHTML = options.text || "";
    page.style.position = "absolute";
    page.style.padding = "8px 16px";
    page.style.visibility = "hidden";
    page.style.overflow = "auto";
    page.style.top =
      page.style.bottom =
      page.style.left =
      page.style.right =
        "0";
    // page.style.top='0'; do not specify top!!!
    page.style.background = options.bg || "";
    return page;
  }

  createPagePanel() {
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
  }

  createLabel(text) {
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
    label.append(document.createTextNode(text));
    // label.setAttribute('title', title || text)
    return label;
  }

  createTabBarWraper() {
    var tabbarContainer = document.createElement("div");
    tabbarContainer.style.position = "relative";
    tabbarContainer.style.height = "100%";
    tabbarContainer.style.height = "100%";
    tabbarContainer.style.width = "100%";
    tabbarContainer.style.border = "none";
    tabbarContainer.style.padding = "none";
    tabbarContainer.className = "tabbar-wrapper";
    return tabbarContainer;
  }

  createBar() {
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
  }

  createTabButton(name, text, float) {
    const btn = document.createElement("button");
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
    btn.style.float = float || "none";
    btn.style.outline = "none";
    btn.innerHTML = text;
    btn.style.borderRadius = "4px 4px";
    return btn;
  }

  createImage(options) {
    const img = document.createElement("span");
    img.style.marginRight = "7px";
    img.style.color = "#b00";
    img.style.fontWeight = "bold";
    img.innerHTML = options.icon || "kb";
    img.style.float = "left";
    return img;
  }

  createLabelContainer(options) {
    const labelContainer = document.createElement("label");
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
    const img = this.createImage(options);
    var closeBtn = this.createCloseButton();
    var label = this.createLabel(options.label, options.title);
    if (!options.closable) {
      closeBtn.style.display = "none";
      labelContainer.style.paddingRight = "7px";
    }
    labelContainer.append(img);
    labelContainer.append(label);
    labelContainer.append(closeBtn);
    closeBtn.addEventListener("click", () => {
      this.close(
        closeBtn.parentNode.parentElement.getAttribute("data-tab"),
        this
      );
    });

    return labelContainer;
  }

  createTable(tabBarWrapper, pagePanel, banner, footer) {
    const doc = document.createDocumentFragment();
    const table = document.createElement("table");
    table.style.width = table.style.height = "100%";
    doc.append(table);

    const thead = document.createElement("thead");
    table.append(thead);

    const bannerRow = document.createElement("tr");
    bannerRow.style.minHeight = "0px";
    bannerRow.style.maxHeight = "80px";
    thead.append(bannerRow);
    const th = document.createElement("th");
    // th.setAttribute('colspan',3);
    th.style.textAlign = "left";
    th.style.padding = "0";
    if (banner) {
      th.append(banner);
    } else {
      bannerRow.style.display = "none";
    }
    bannerRow.appendChild(th);

    const tbody = document.createElement("tbody");
    table.append(tbody);

    const linkRow = document.createElement("tr");
    linkRow.style.minHeight = "24px";
    linkRow.style.height = this.settings.tab_height + "px";
    linkRow.style.padding = "0";
    tbody.append(linkRow);

    let td = document.createElement("td");
    td.style.overflow = "hidden";
    td.style.whiteSpace = "nowrap";
    td.style.textAlign = "left";
    td.style.padding = "0";
    td.append(tabBarWrapper);
    linkRow.appendChild(td);
    table.style.borderCollapse =
      linkRow.style.borderCollapse =
      td.style.borderCollapse =
        "collapse";
    table.style.border =
      linkRow.style.border =
      td.style.border =
        "0 none transparent";

    const pageRow = document.createElement("tr");
    tbody.append(pageRow);
    td = document.createElement("td");
    td.append(pagePanel);
    td.style.textAlign = "left";
    td.style.padding = "0";
    pageRow.appendChild(td);

    const linkRow2 = document.createElement("tr");
    tbody.append(linkRow2);
    td = document.createElement("td");
    td.style.textAlign = "left";
    td.style.padding = "0";
    linkRow2.appendChild(td);
    linkRow2.style.minHeight = "24px";
    linkRow2.style.height = this.settings.tab_height + "px";

    const footerRow = document.createElement("tr");
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
  }

  init(el, options) {
    this.settings = Object.assign({}, options);
    const data = options.loadFromMarkup ? this.loadFromMarkup(el) : null;
    if (data) {
      this.settings = Object.assign(this.settings, data);
    }
    this.applySettings(this.settings);
    const leftBtn = this.createTabButton("left-nav-button", "&lt;", "left");
    this.leftBtn = leftBtn;
    leftBtn.addEventListener("click", () => {
      this.scroll(false);
    });

    this.leftNavId = leftBtn.id;
    const addBtn = this.createTabButton("add-tab-button", "+", "left");
    this.addBtn = addBtn;
    this.addBtnId = addBtn.id;
    if (this.settings.add) {
      this.addBtn.style.visibility = "visible";
    } else {
      this.addBtn.style.visibility = "hidden";
    }
    this.addBtn.addEventListener("click", () => {
      this.Event.fire("add-tab-click", this.generateRandomString());
    });
    const tabBar = this.createBar();
    const tabBarWraper = this.createTabBarWraper();
    tabBarWraper.append(tabBar);

    tabBarWraper.appendChild(leftBtn);
    tabBarWraper.appendChild(addBtn);

    this.tabBarId = tabBar.id;
    this.tabBar = tabBar;

    const rtBtn = this.createTabButton("right-nav-button", "&gt;", "right");
    this.rightBtn = rtBtn;
    tabBarWraper.appendChild(rtBtn);
    rtBtn.addEventListener("click", () => {
      this.scroll(true);
    });
    // tabBarWraper.appendChild(rtBtn);
    this.rightNavId = rtBtn.id;
    const pagePanel = this.createPagePanel();
    this.pagePanelId = pagePanel.id;

    // let tabbar= doc.querySelector('div');

    let banner, footer;
    if (this.settings.banner) {
      banner = this.addBanner();
    }
    if (this.settings.footer) {
      footer = this.addFooter();
    }

    const doc = this.createTable(
      tabBar.parentElement,
      pagePanel,
      banner,
      footer
    );
    const container = typeof el === "object" ? el : document.getElementById(el);
    this.containerId = container.id;
    container.append(doc);
    // The tabBarWraper and tabPagePanel will be appended to tab container
    // this.mountTab(el, doc, tabPagePanel);
    this.theme = this.settings.theme;
    this.attachDomEventListeners(this);
    if (this.settings.tabs) {
      this.dynamicLoad(this.settings.tabs);
    }
    this.toggleNavigator(this.getLeftNavButton(), false);
    this.toggleNavigator(this.getRightNavButton(), false);

    return this;
  }

  applySettings(options) {
    const settings = {
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
      data: null,
    };

    this.settings = Object.assign({}, settings, options, arguments[1]);
  }

  dynamicLoad(tabs) {
    if (!tabs) return;
    let selected = null;
    tabs.forEach((d) => {
      if (d.selected) {
        selected = d.id;
      }
      const tab = this.add(d);
      const page = this.getPage(tab.id);
      // page.parentElement.style.top='80px';
      // page.background='#054';
      page.innerHTML = typeof d.html === "function" ? d.html() : d.html;
      page.setAttribute("contenteditable", true);
      page.style.overflow = "auto";
      page.style.zIndex = "100";
    });
    if (selected) {
      this.select(selected);
    }
  }

  loadFromMarkup(el, fn) {
    if (typeof el === "string") {
      el = document.getElementById(el);
    }
    if (!el || !el.children) throw new Error("Invalid element to load markup");
    const markup = el.children;
    // let doc=document.createDocumentFragment();
    if (!markup || markup.length === 0) return fn();
    const banner = el.querySelector(".tab-banner");
    const footer = el.querySelector(".tab-footer");
    const links = el.querySelector(".tab-links").children;
    const pages = el.querySelector(".tab-pages").children;
    const data = {
      banner: banner.innerHTML,
      footer: footer.innerHTML,
      tabs: [],
    };
    if (banner) banner.remove();
    if (footer) footer.remove();

    while (links.length > 0) {
      const node = links[0];
      const page = pages[0];
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
        style: node.getAttribute("tab-style"),
      });
      node.remove();
      page.remove();
    }
    return data;
  }

  getPage(id) {
    const tab = this.tabs.get(id);
    return document.getElementById(tab.pageId);
  }

  getLinkButton(linkId) {
    return document.getElementById(linkId);
  }

  getCloswButton(id) {
    const linkButton = this.getLinkButton(id);
    return linkButton ? linkButton.lastElementChild() : null;
  }

  getTabPagePanel() {
    return document.getElementById(this.pagePanelId);
  }

  getRightNavButton() {
    return this.rightBtn;
  }

  getLeftNavButton() {
    return this.leftBtn;
  }

  getAddButton() {
    return this.addBtn;
  }

  getFooter() {
    return document.getElementById(this.footerId);
  }

  getBanner() {
    return document.getElementById(this.bannerId);
  }

  getTabBar() {
    return document.getElementById(this.tabBarId);
  }

  getContainer() {
    return document.getElementById(this.containerId);
  }

  hideExtraTabs() {
    const links = Object.values(this.links);
    const numTotal = links.length;
    const numVisible = Math.min(numTotal, this.settings.limit);
    for (var i = 0; i < links.length; i++) {
      links[i].style.display = "none"; // hide xo tabs.
    }
    for (var j = 0; j < numVisible; j++) {
      this.links[j].style.display = "inline"; // Show visible tabs.
    }
  }

  getLinkTarget(el) {
    try {
      while (el.name !== "tab-link") {
        el = el.parentElement;
      }
      return el;
    } catch (e) {
      // const length = this.tabs.size - 1
      return this.getTabAtIndex(this.tabs.size - 1).linkButton;
      // Object.values(this.tabs)[length].linkButton
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // do not drop on label wrappers or close button
    var target = this.getLinkTarget(ev.target);
    var dataEl = document.getElementById(data);

    if (this.dragStartPoint > this.dragStopPoint) {
      target.before(dataEl);
    } else {
      target.after(dataEl);
    }
    // target.parentNode.insertBefore(dataEl,this.dragStartPoint>this.dragStopPoint?target:target.nextSibling);
  }

  addFooter() {
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
    footer.style.alignItems = "center";
    // footer.style.background='#030';
    // footer.style.borderTop='1px solid #020';

    return footer;
  }

  addBanner() {
    var banner = document.createElement("span");
    banner.setAttribute("name", "tab-banner");
    banner.innerHTML =
      typeof this.settings.banner === "string"
        ? this.settings.banner
        : this.settings.banner.innerHTML;
    banner.style.display = "flex";
    banner.style.padding = "5px";
    banner.style.justifyContent = "center";
    banner.style.alignItems = "center";
    banner.className = "tab-banner";
    banner.style.background = "green";

    return banner;
  }

  mountTab(el, doc, tabPagePanel) {
    const container = typeof el === "object" ? el : document.getElementById(el);
    this.containerId = container.id;
    container.appendChild(tabPagePanel);

    const tabbar = doc.querySelector("div");
    let banner, footer;
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
    }
    // container.style.height='100%';
    // container.style.width='100%';
    container.style.top =
      container.style.bottom =
      container.style.left =
      container.style.right =
        "0";
    const bannerBox = banner ? banner.getBoundingClientRect() : null;
    const bannerBottom = banner ? bannerBox.bottom - bannerBox.top : 0;

    const footerBox = footer ? footer.getBoundingClientRect() : null;
    const footerTop = footer ? footerBox.bottom - footerBox.top : 0;

    if (this.settings.bottom) {
      // tab bar is at bottom oftab window
      tabbar.style.bottom = footerTop + "px";
    } else {
      tabbar.style.top = bannerBottom + "px";
    }
    tabbar.style.border = "0px none transparent";
    tabPagePanel.style.border = "0px none transparent";
  }

  getTabAtIndex(index) {
    let tab = null;
    let i = 0;
    for (const value of this.tabs.values()) {
      if (i === index) {
        tab = value;
        break;
      }
      i++;
    }
    return tab;
  }

  unhide() {
    // const tabs = this.tabs.entries()
    const last = this.getTabAtIndex(this.tabs.size - 1).linkButton;
    const visibles = this.getVisibleTabs();
    const firstVisible = visibles[0];
    if (!firstVisible.previousSibling) return;
    // let lastVisible=visibles[visibles.length-1];
    const lastHidden = firstVisible.previousSibling || firstVisible;
    const width = lastHidden.getBoundingClientRect().width;
    const gap =
      this.tabBar.getBoundingClientRect().right -
      last.getBoundingClientRect().right;
    if (width < gap) {
      this.scrollLinkIntoView(lastHidden);
    }
  }

  attachDomEventListeners() {
    // let self = this
    const tabBar = this.getTabBar();
    window.addEventListener("resize", () => {
      this.debounce(() => {
        if (!this.tab) return false;
        if (!this.isLinkVisible(this.tab.linkButton)) {
          this.scrollLinkIntoView(this.tab.linkButton);
        } else {
          this.unhide();
          this.scrollLinkIntoView(this.tab.linkButton);
        }
        this.showHideNavButton();
      }, 200)();
    });

    tabBar.addEventListener(
      "keyup",
      (event) => {
        this.handleKeypress(event);
      },
      true
    );

    tabBar.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();

        this.dragStopPoint = event.clientX;
        this.drop(event);
      },
      true
    );

    tabBar.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();
      },
      true
    );

    tabBar.addEventListener("dragstart", (event) => {
      this.dragStartPoint = event.clientX;
      this.drag(event);
    });
  }

  handleKeypress(e) {
    const code = e.keyCode;
    const link = this.tab.button;
    // eslint-disable-next-line default-case
    if (!link) return;
    switch (code) {
      case 37:
        if (link.previousSibling) {
          this.select(link.previousSibling);
        }
        break; // left key
      case 39:
        if (link.nextSibling) {
          this.select(link.nextSibling);
        }
        break; // right key
      case 38:
        break; // up key
      case 40:
        link.blur();
        break; // down key
      case 13:
        break; // enter key
      default:
        break;
    }
  }

  showHideNavButton() {
    // console.log(this.settings);
    if (this.settings.infinite_scroll) {
      return;
    }
    const visibleButtons = this.getVisibleTabs();
    var firstVisibleButton = visibleButtons[0];
    var lastVisibleButton = visibleButtons[visibleButtons.length - 1];

    if (!firstVisibleButton) return;
    const rBtn = this.getRightNavButton();
    const lBtn = this.getLeftNavButton();
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
  }

  toggleNavButton(el, show) {
    if (show) {
      el.style.visibility = "visible";
    } else {
      el.style.visibility = "hidden";
    }
  }

  toggleAddButton(show) {
    if (show) {
      this.getAddButton().style.visibility = "visible";
    } else {
      this.getAddButton().style.visibility = "hidden";
    }
  }

  showHideNavigator() {
    const visibleButtons = this.getVisibleTabs();
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
  }

  applySelection(el) {
    if (!el || !el.parentElement) {
      return;
    }
    var tablinks = el.parentElement.children;
    for (let i = 0; i < tablinks.length; i++) {
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
  }

  applyTheme() {
    const table = this.getContainer().querySelector("table");
    table.style.background = this.tab_settings.bg;
    table.style.color = this.tab_settings.color;
    this.leftBtn.style.color =
      this.rightBtn.style.color =
      this.addBtn.style.color =
        this.tab_settings.color;
  }

  // Public API
  /***
   * @param theme String
   * @returns null
   */
  set theme(theme) {
    this.settings.theme = theme;
    let color = "#ddd";
    let bg = "#222";
    let activecolor = "#ddd";
    let activeBg = "#003355";
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
      color: bg,
    };
    this.tab_settings = {
      bg: bg,
      color: color,
      activecolor: activecolor,
      activeBg: activeBg,
    };
    this.applyTheme();
  }

  get theme() {
    return this.settings.theme;
  }

  toggleNavigator(el, show) {
    if (show) {
      el.style.visibility = "visible";
    } else {
      el.style.visibility = "hidden";
    }
  }

  /* toggleAddButton (show) {
    if (show) { this.addButton.style.visibility = 'visible' } else { this.addButton.style.visibility = 'hidden' }
  } */

  getSelectedTab() {
    return this.tab;
  }

  getTab(tabId) {
    return this.tabs.get(tabId);
  }

  setContent(id, content) {
    const page = this.tabs.get(id).pageId;
    document.getElementById(page).innerHTML = content;
  }

  setTitle(id, title) {
    const link = this.tabs.get(id).linkId;
    document.getElementById(link).firstElementChild.innerHTML = title;
  }

  add(options = {}) {
    const length = Object.keys(this.buttons).length;
    const tabId = options.tabId || this.generateRandomString();
    const buttonId = "link-btn-" + this.generateRandomString(); // tabId,
    let settings = {
      buttonId: "link-btn-" + this.generateRandomString(), // tabId,
      target: "page-" + tabId,
      label: "Tab" + Number(length + 1),
      title: this.label,
      html: "",
      closable: true,
      data: null,
      icon: "kb",
      bg: options.bg || "inherit",
      color: options.color || "inherit",
      style: options.style || "fancy",
    };
    options.bg = options.bg === "transparent" ? "" : options.bg;
    if (options.buttonId === null) {
      delete options.buttonId;
    }

    this.settings = Object.assign(settings, options);

    var page = this.createPage(
      this.settings.target,
      tabId,
      buttonId,
      this.settings
    );

    this.getTabPagePanel().appendChild(page);

    var linkButton = this.createLinkButton(buttonId, tabId, this.settings);
    this.buttons[linkButton.id] = linkButton;

    const labelContainer = this.createLabelContainer(this.settings);
    linkButton.append(labelContainer);
    linkButton.addEventListener("click", () => {
      this.select(linkButton);
    });

    linkButton.addEventListener("mouseenter", () => {
      if (this.tab.linkButton.id === linkButton.id) return;
      linkButton.firstChild.lastChild.style.visibility = "visible";
    });

    linkButton.addEventListener("mouseleave", () => {
      const tab = this.getSelectedTab();
      if (tab.linkButton.id === linkButton.id) return;
      linkButton.firstChild.lastChild.style.visibility = "hidden";
    });
    // If there was a selected button already, insert after it
    // otherwise append at the end of tab list
    if (this.tab) {
      // this.tab.selected=false;
      this.tab.linkButton.after(linkButton);
      // this.getLinkButton(this.tab.linkId).after(linkButton);
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
      page: page,
    });
    this.tab = this.tabs.get(tabId);

    this.showHideNavButton();
    this.select(linkButton);
    if (settings.selected) {
      return this.tab;
    }
    return this.tab;
  }

  select(el, before) {
    let linkButton = el;
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
      const result = before();
      if (result === false) return false;
    }
    // this.tabs.values().forEach((tab) => {
    for (const tab of this.tabs.values()) {
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
  }

  close(el) {
    let tabId = el;
    if (!el) {
      throw new Error("Invalid tab address:");
    } else if (typeof id === "string") {
      // tab id
    } else if (el.id) {
      tabId = el.id; // .substr(5);//button Element
    }
    const tab = this.tabs.get(tabId);
    const link = tab.linkButton; // this.getLinkButton(tab.linkId);
    const next = link.nextSibling;
    const prev = link.previousSibling;
    this.Event.fire("before_close", tab);
    link.remove();
    document.getElementById(tab.pageId).remove();
    // delete this.links[id];
    delete this.tab;
    this.tabs.delete(tabId);

    this.Event.fire("close", tab);
    if (next && next.tagName === "BUTTON") {
      this.select(next);
    } else if (prev && prev.tagName === "BUTTON") {
      this.select(prev);
    }
    this.showHideNavigator();
    this.scroll(true);
    return tabId;
  }

  isLinkVisible(link) {
    const box = link.getBoundingClientRect();
    const tabbar = this.getTabBar();
    if (!tabbar) return false;
    const box1 = tabbar.getBoundingClientRect();
    return box.left >= box1.left && box.right <= box1.right;
  }

  getVisibleTabs() {
    const tabbar = this.getTabBar();
    if (!tabbar) return false;
    var links = Array.prototype.slice.call(tabbar.querySelectorAll("button"));
    return links.filter((link) => {
      return this.isLinkVisible(link);
    });
  }

  getHiddenTabs() {
    var links = Array.prototype.slice.call(
      this.getTabBar().querySelectorAll("button")
    );
    return links.filter((link) => {
      return !this.isLinkVisible(link);
    });
  }

  scroll(right) {
    if (this.settings.infinite_scroll) {
      this.infiniteScroll(right);
    } else {
      this.finiteScroll(right);
      this.showHideNavigator();
    }
  }

  scrollLinkIntoView(el) {
    if (this.isLinkVisible(el)) return;
    const max = this.tabs.size;
    let count = 0;
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
  }

  finiteScroll(right) {
    this.count = this.count ? this.count : 1;
    this.count++;
    const visibleButtons = this.getVisibleTabs();
    var firstVisibleButton = visibleButtons[0];
    var lastVisibleButton = visibleButtons[visibleButtons.length - 1];
    if (right && lastVisibleButton && lastVisibleButton.nextSibling) {
      firstVisibleButton.style.display = "none";
    } else if (
      !right &&
      firstVisibleButton &&
      firstVisibleButton.previousSibling
    ) {
      firstVisibleButton.previousSibling.style.display = "";
    } else {
      const tabbar = this.getTabBar();
      if (!tabbar) return;
      const bts = tabbar.querySelectorAll("button");
      if (bts.length > 0) {
        bts[bts.length - 1].style.display = "";
      }
    }
  }

  infiniteScroll(right) {
    const tabbar = this.getTabBar();
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
  onBeforeClose(fn, ctx) {
    this.Event.on("tab_before_close", fn, ctx);
  }

  onClose(fn, ctx) {
    this.Event.on("tab_close", fn, ctx);
  }

  onSelect(fn, ctx) {
    this.Event.on("tab_before_select", fn, ctx);
  }

  onBeforeSelect(fn) {
    this.addListener("tab_select", fn);
  }

  onOpen(fn, ctx) {
    this.Event.on("tab_open", fn, ctx);
  }

  onBeforeOpen(fn, ctx) {
    this.Event.on("tab_before_open", fn, ctx);
  }

  destroy() {
    // destroy
    this.removeListeners();
  }
}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
TabView.prototype.debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
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
  fire(event, data, context, cancelable, bubbles) {
    var cntx = context || document;
    var myEvent = new CustomEvent(event, {
      detail: data,
      cancelable: cancelable || false,
      bubbles: bubbles || false,
    });
    cntx.dispatchEvent(myEvent);
  },
  on(event, listener, context) {
    var cntx = context || document;
    cntx.addEventListener(event, listener);
    // this.off(event, listener, context);
  },
  off(event, listener, context) {
    var cntx = context || document;
    cntx.removeEventListener(event, listener);
  },
};

TabView.prototype.Event = {
  _listeners: {},
  addListener: function (type, listener) {
    if (typeof this._listeners[type] === "undefined") {
      this._listeners[type] = [];
    }
    this._listeners[type].push(listener);
  },
  attach: function (type, listener) {
    this.addListener(type, listener);
  },
  on: function (type, listener) {
    this.addListener(type, listener);
  },

  fire: function (event, data, target) {
    if (typeof event === "string") {
      event = {
        type: event,
        data: data,
        target: target,
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
      const listeners = this._listeners[event.type];
      for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].call(this, event);
      }
    }
  },
  trigger: function (type, listener) {
    this.fire(type, listener);
  },

  removeListener: function (type, listener) {
    if (this._listeners[type] instanceof Array) {
      const listeners = this._listeners[type];
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  },
  off: function (type, listener) {
    this.removeListener(type, listener);
  },
};
