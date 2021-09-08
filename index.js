/* jshint esversion: 8 */
const TabView = (function () {
    function randomId() {
        return Math.random().toString(36).slice(2);
    }
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
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
    }

    const Emitter = (function () {
        return {
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
            },
            off(event, listener, context) {
                var cntx = context || document;
                cntx.removeEventListener(event, listener);
            },
        };
    })();

    const Event = (function () {
        const _listeners = {};
        return {
            addListener: function (type, listener) {
                if (typeof _listeners[type] === "undefined") {
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
                if (_listeners[event.type] instanceof Array) {
                    const listeners = _listeners[event.type];
                    for (var i = 0, len = listeners.length; i < len; i++) {
                        listeners[i].call(this, event);
                    }
                }
            },
            trigger: function (type, listener) {
                this.fire(type, listener);
            },

            removeListener: function (type, listener) {
                if (_listeners[type] instanceof Array) {
                    const listeners = _listeners[type];
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
    })();

    function createLinkButton(
        linkId,
        tabId,
        { target, style, title, bg, data }
    ) {
        var linkButton = document.createElement("button");
        linkButton.className = "tab-link";
        linkButton.setAttribute("href", "#!");
        linkButton.setAttribute("id", linkId);
        linkButton.setAttribute("title", title);
        linkButton.setAttribute("name", "tab-link");
        linkButton.setAttribute("draggable", "true");
        linkButton.setAttribute("data-tab", tabId);
        linkButton.setAttribute("data-target", target);
        linkButton.style.position = "relative";
        linkButton.style.outline = "none";
        linkButton.style.height = "100%";
        linkButton.style.width = "auto";
        linkButton.style.border = "0 none transparent";
        linkButton.style.fontSize = "12px";
        linkButton.style.fontWeight = "500";
        linkButton.style.margin = "0";
        linkButton.style.padding = "0";
        linkButton.style.boxShadow = "none";
        linkButton.style.background = bg || "inherit";
        linkButton.style.color = "inherit";
        linkButton.style.cursor = "pointer";
        linkButton.style.display = "block";
        linkButton.style.transition = "background .4s";
        if (style) {
            linkButton.style.borderRadius = "8px 1px 0px 0px";
        } else {
            linkButton.style.borderRadius = "1px 1px 0px 0px";
        }

        return linkButton;
    }
    function createCloseButton() {
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

    function createLabel(text, title) {
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
        label.setAttribute("title", title || text);
        return label;
    }
    function createTabBarWraper() {
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
    function createBar() {
        var tabBar = document.createElement("div");
        tabBar.setAttribute("id", randomId());
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
        tabBar.style.display = "flex";
        tabBar.className = "tab-bar";
        return tabBar;
    }
    function createButton(name, text, float) {
        const btn = document.createElement("button");
        btn.id = randomId();
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
    function createImage(options) {
        const img = document.createElement("span");
        img.style.marginRight = "7px";
        img.style.color = "#b00";
        img.style.fontWeight = "bold";
        img.innerHTML = options.icon || "kb";
        img.style.float = "left";
        return img;
    }
    function createLabelContainer(options) {
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

        return labelContainer;
    }
    function createTable(tabBarWrapper, pagePanel, settings = {}) {
        let banner, footer;
        if (settings.banner) {
            banner = addBanner();
        }
        if (settings.footer) {
            footer = addFooter();
        }
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
        linkRow.style.height = settings.tab_height + "px";
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
        linkRow2.style.height = settings.tab_height + "px";

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
        if (settings.bottom) {
            linkRow2.firstElementChild.nextSibling.appendChild(tabBarWrapper);
            linkRow.style.display = "none";
        } else {
            linkRow2.style.display = "none";
        }
        return doc;
    }
    function createPage(pageId, tabId, linkId, options) {
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
    function createPagePanel() {
        var panel = document.createElement("div");
        panel.setAttribute("id", randomId());
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
    function loadFromMarkup(el, fn) {
        if (typeof el === "string") {
            el = document.getElementById(el);
        }
        if (!el || !el.children)
            throw new Error("Invalid element to load markup");
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
    function addFooter() {
        var footer = document.createElement("span");
        footer.setAttribute("name", "tab-footer");
        footer.innerHTML = settings.footer;
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
    function addBanner() {
        var banner = document.createElement("span");
        banner.setAttribute("name", "tab-banner");
        banner.innerHTML =
            typeof settings.banner === "string"
                ? settings.banner
                : settings.banner.innerHTML;
        banner.style.display = "flex";
        banner.style.padding = "5px";
        banner.style.justifyContent = "center";
        banner.style.alignItems = "center";
        banner.className = "tab-banner";
        banner.style.background = "green";

        return banner;
    }
    function mountTab(el, doc, tabPagePanel) {
        const container =
            typeof el === "object" ? el : document.getElementById(el);
        containerId = container.id;

        container.appendChild(tabPagePanel);

        const tabbar = doc.querySelector("div");
        let banner, footer;
        if (settings.banner) {
            banner = addBanner(container);
            container.prepend(banner);
        }
        if (settings.bottom) {
            container.lastChild.after(doc);
        } else {
            container.lastChild.before(doc);
        }
        if (settings.footer) {
            footer = addFooter(container);
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

        if (settings.bottom) {
            // tab bar is at bottom oftab window
            tabbar.style.bottom = footerTop + "px";
        } else {
            tabbar.style.top = bannerBottom + "px";
        }
        tabbar.style.border = "0px none transparent";
        tabPagePanel.style.border = "0px none transparent";
    }
    function applySelection(el, options) {
        if (!el || !el.parentElement) {
            return;
        }
        var tablinks = el.parentElement.children;
        // console.log(el.parentElement.parentElement);
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
            tablinks[i].style.background = options.bg;
            tablinks[i].style.color = options.color;
            // tablinks[i].lastChild.lastChild.style.visibility = "hidden";
        }

        el.classList.add("active");
        el.style.background = options.activeBg;
        el.style.color = options.activecolor;
        // el.lastChild.lastChild.style.visibility = "visible";
    }
    const createTabs = function (el, options) {
        var tabIndex = -1;
        var currentIndex = 0;
        var selectedTab,
            tabBar,
            rightBtn,
            leftBtn,
            addBtn,
            leftNavId,
            rightNavId,
            pagePanelId,
            addBtnId,
            tabBarId,
            themeOptions,
            tabSettings,
            containerId,
            tabButtonsCount,
            dragStartPoint,
            dragStopPoint;
        const links = {};
        const tabs = new Map();
        const buttons = {};
        const pages = {};
        const hiddenTabs = [];

        init(el, options);
        /**
         * Initialize tab container
         * @param {HTMLElement} el HTMLElement to attach tabs
         * @param {Object} options Additional settings
         * @returns void
         */
        function init(el, options) {
            themeOptions = Object.assign({}, options);
            const data = options.loadFromMarkup ? loadFromMarkup(el) : null;
            if (data) {
                themeOptions = Object.assign(themeOptions, data);
            }
            applySettings(themeOptions);
            leftBtn = createButton("left-nav-button", "&lt;", "left");
            leftBtn.addEventListener("click", () => {
                scroll(false);
            });

            leftNavId = leftBtn.id;
            addBtn = createButton("add-tab-button", "+", "left");
            addBtnId = addBtn.id;
            if (themeOptions.add) {
                addBtn.style.visibility = "visible";
            } else {
                addBtn.style.visibility = "hidden";
            }
            addBtn.addEventListener("click", () => {
                Event.fire("add-tab-click", randomId());
            });
            tabBar = createBar();
            const tabBarWraper = createTabBarWraper();
            tabBarWraper.append(tabBar);
            tabBarWraper.appendChild(leftBtn);
            tabBarWraper.appendChild(addBtn);
            tabBarId = tabBar.id;

            rightBtn = createButton("right-nav-button", "&gt;", "right");
            // rightBtn = rightBtn;
            tabBarWraper.appendChild(rightBtn);
            rightBtn.addEventListener("click", () => {
                scroll(true);
            });
            // tabBarWraper.appendChild(rightBtn);
            rightNavId = rightBtn.id;
            const pagePanel = createPagePanel();
            pagePanelId = pagePanel.id;
            // let tabbar= doc.querySelector('div');
            const doc = createTable(
                tabBar.parentElement,
                pagePanel,
                themeOptions
            );
            const container =
                typeof el === "object" ? el : document.getElementById(el);
            containerId = container.id;
            container.append(doc);
            setTheme(themeOptions.theme);
            attachDomEventListeners(this);
            if (themeOptions.tabs) {
                dynamicLoad(themeOptions.tabs);
            }
            toggleNavigator(getLeftNavButton(), false);
            toggleNavigator(getRightNavButton(), false);
        }

        function getTabAtIndex(index) {
            let tab = null;
            let i = 0;
            for (const value of tabs.values()) {
                if (i === index) {
                    tab = value;
                    break;
                }
                i++;
            }
            return tab;
        }

        function unhide() {
            // const tabs = tabs.entries()
            const last = getTabAtIndex(tabs.size - 1).linkButton;
            const visibles = getVisibleTabs();
            const firstVisible = visibles[0];
            if (!firstVisible.previousSibling) return;
            // let lastVisible=visibles[visibles.length-1];
            const lastHidden = firstVisible.previousSibling || firstVisible;
            const width = lastHidden.getBoundingClientRect().width;
            const gap =
                tabBar.getBoundingClientRect().right -
                last.getBoundingClientRect().right;
            if (width < gap) {
                scrollLinkIntoView(lastHidden);
            }
        }

        function attachDomEventListeners() {
            // let self = this
            const tabBar = getTabBar();
            window.addEventListener("resize", () => {
                debounce(() => {
                    if (!selectedTab) return false;
                    if (!isLinkVisible(selectedTab.linkButton)) {
                        scrollLinkIntoView(selectedTab.linkButton);
                    } else {
                        unhide();
                        scrollLinkIntoView(selectedTab.linkButton);
                    }
                    showHideNavButton();
                }, 200)();
            });

            tabBar.addEventListener(
                "keyup",
                (event) => {
                    handleKeypress(event);
                },
                true
            );

            tabBar.addEventListener(
                "drop",
                (event) => {
                    event.preventDefault();

                    dragStopPoint = event.clientX;
                    drop(event);
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
                dragStartPoint = event.clientX;
                drag(event);
            });
        }

        function handleKeypress(e) {
            const code = e.keyCode;
            const link = selectedTab.button;
            // eslint-disable-next-line default-case
            if (!link) return;
            switch (code) {
                case 37:
                    if (link.previousSibling) {
                        select(link.previousSibling);
                    }
                    break; // left key
                case 39:
                    if (link.nextSibling) {
                        select(link.nextSibling);
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

        function showHideNavButton() {
            // console.log(settings);
            if (themeOptions.infinite_scroll) {
                return;
            }
            const visibleButtons = getVisibleTabs();
            var firstVisibleButton = visibleButtons[0];
            var lastVisibleButton = visibleButtons[visibleButtons.length - 1];

            if (!firstVisibleButton) return;
            const rBtn = getRightNavButton();
            const lBtn = getLeftNavButton();
            if (firstVisibleButton.previousSibling) {
                toggleNavButton(rBtn, true);
            } else {
                toggleNavButton(lBtn, false);
            }
            if (lastVisibleButton.nextSibling) {
                toggleNavButton(rBtn, true);
            } else {
                toggleNavButton(rBtn, false);
            }
        }

        function toggleNavButton(el, show) {
            if (show) {
                el.style.visibility = "visible";
            } else {
                el.style.visibility = "hidden";
            }
        }

        function toggleAddButton(show) {
            if (show) {
                getAddButton().style.visibility = "visible";
            } else {
                getAddButton().style.visibility = "hidden";
            }
        }

        function showHideNavigator() {
            const visibleButtons = getVisibleTabs();
            var firstVisibleButton = visibleButtons[0];
            var lastVisibleButton = visibleButtons[visibleButtons.length - 1];

            if (!firstVisibleButton) return;
            if (firstVisibleButton.previousSibling) {
                toggleNavigator(getLeftNavButton(), true);
            } else {
                toggleNavigator(getLeftNavButton(), false);
            }
            if (lastVisibleButton.nextSibling) {
                toggleNavigator(getRightNavButton(), true);
            } else {
                toggleNavigator(getRightNavButton(), false);
            }
        }

        function applyTheme(options) {
            const table = getContainer().querySelector("table");
            table.style.background = options.bg;
            table.style.color = options.color;
            leftBtn.style.color =
                rightBtn.style.color =
                addBtn.style.color =
                    options.color;
        }

        // Public API
        /***
         * @param theme String
         * @returns null
         */
        function setTheme(theme) {
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
            tabSettings = {
                bg: bg,
                color: color,
                activecolor: activecolor,
                activeBg: activeBg,
            };
            applyTheme(tabSettings);
        }

        function getTheme() {
            return themeOptions.theme;
        }

        function toggleNavigator(el, show) {
            if (show) {
                el.style.visibility = "visible";
            } else {
                el.style.visibility = "hidden";
            }
        }

        function getSelectedTab() {
            return selectedTab;
        }

        function getTab(tabId) {
            return tabs.get(tabId);
        }

        function setContent(id, content) {
            const page = tabs.get(id).pageId;
            document.getElementById(page).innerHTML = content;
        }

        function setTitle(id, title) {
            const link = tabs.get(id).linkId;
            document.getElementById(link).firstElementChild.innerHTML = title;
        }
        function applySettings(options) {
            const mySettings = {
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

            themeOptions = Object.assign({}, mySettings, options, arguments[1]);
        }
        function dynamicLoad(tabs) {
            if (!tabs) return;
            let selected = null;
            tabs.forEach((d) => {
                if (d.selected) {
                    selected = d.id;
                }
                const tab = add(d);
                const page = getPage(tab.id);
                // page.parentElement.style.top='80px';
                // page.background='#054';
                page.innerHTML =
                    typeof d.html === "function" ? d.html() : d.html;
                page.setAttribute("contenteditable", true);
                page.style.overflow = "auto";
                page.style.zIndex = "100";
            });
            if (selected) {
                select(selected);
            }
        }

        function getPage(tabId) {
            const tab = tabs.get(tabId);
            return document.getElementById(tab.pageId);
        }

        function getLinkButton(linkId) {
            return document.getElementById(linkId);
        }

        function getCloswButton(id) {
            const linkButton = getLinkButton(id);
            return linkButton ? linkButton.lastElementChild() : null;
        }

        function getTabPagePanel() {
            return document.getElementById(pagePanelId);
        }

        function getRightNavButton() {
            return rightBtn;
        }

        function getLeftNavButton() {
            return leftBtn;
        }

        function getAddButton() {
            return addBtn;
        }

        function getFooter() {
            return document.getElementById(footerId);
        }

        function getBanner() {
            return document.getElementById(bannerId);
        }

        function getTabBar() {
            return document.getElementById(tabBarId);
        }

        function getContainer() {
            return document.getElementById(containerId);
        }
        function hideExtraTabs() {
            const links = Object.values(links);
            const numTotal = links.length;
            const numVisible = Math.min(numTotal, themeOptions.limit);
            for (var i = 0; i < links.length; i++) {
                links[i].style.display = "none"; // hide xo tabs.
            }
            for (var j = 0; j < numVisible; j++) {
                links[j].style.display = "inline"; // Show visible tabs.
            }
        }

        function getLinkTarget(el) {
            try {
                while (el.name !== "tab-link") {
                    el = el.parentElement;
                }
                return el;
            } catch (e) {
                // const length = tabs.size - 1
                return getTabAtIndex(tabs.size - 1).linkButton;
                // Object.values(tabs)[length].linkButton
            }
        }

        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            // do not drop on label wrappers or close button
            var target = getLinkTarget(ev.target);
            var dataEl = document.getElementById(data);

            if (dragStartPoint > dragStopPoint) {
                target.before(dataEl);
            } else {
                target.after(dataEl);
            }
            // target.parentNode.insertBefore(dataEl,dragStartPoint>dragStopPoint?target:target.nextSibling);
        }
        function add(options = {}) {
            const length = Object.keys(buttons).length;
            const tabId = options.tabId || randomId();
            const buttonId = "link-btn-" + randomId(); // tabId,
            let settings = {
                buttonId: "link-btn-" + randomId(), // tabId,
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

            const tabSettings = Object.assign(settings, options);

            var page = createPage(
                tabSettings.target,
                tabId,
                buttonId,
                tabSettings
            );

            getTabPagePanel().appendChild(page);
            var linkButton = createLinkButton(buttonId, tabId, tabSettings);
            // buttons[linkButton.id] = linkButton;

            const labelContainer = createLabelContainer(tabSettings);
            const img = createImage(tabSettings);
            const label = createLabel(tabSettings.label, tabSettings.title);
            const closeBtn = createCloseButton();

            if (!tabSettings.closable) {
                closeBtn.style.display = "none";
                labelContainer.style.paddingRight = "7px";
            }
            labelContainer.append(img);
            labelContainer.append(label);
            labelContainer.append(closeBtn);
            linkButton.append(labelContainer);

            closeBtn.addEventListener("click", (e) => {
                close(tabId); // linkButton.getAttribute("data-tab"));
                e.stopImmediatePropagation();
            });
            // linkButton.append(labelContainer);
            linkButton.addEventListener("click", () => {
                select(linkButton);
            });

            linkButton.addEventListener("mouseenter", () => {
                if (selectedTab.linkButton.id === linkButton.id) return;
                closeBtn.style.visibility = "visible";
            });

            linkButton.addEventListener("mouseleave", () => {
                // const _tab = getSelectedTab();
                if (selectedTab.linkButton.id === linkButton.id) return;
                closeBtn.style.visibility = "hidden";
            });

            buttons[linkButton.id] = linkButton;
            // If there was a selected button already, insert after it
            // otherwise append at the end of tab list
            if ((selectedTab = getSelectedTab())) {
                // tab.selected=false;
                selectedTab.linkButton.after(linkButton);
                // getLinkButton(tab.linkId).after(linkButton);
            } else {
                getTabBar().appendChild(linkButton);
            }
            tabs.set(tabId, {
                id: tabId,
                label: tabSettings.label,
                text: tabSettings.text,
                title: tabSettings.title,
                linkId: tabSettings.buttonId,
                pageId: tabSettings.target,
                data: tabSettings.data,
                selected: tabSettings.selected,
                linkButton: linkButton,
                page: page,
            });
            selectedTab = tabs.get(tabId);
            showHideNavButton();
            select(linkButton);
            if (tabSettings.selected) {
                return selectedTab;
            }
            return selectedTab;
        }

        function select(el, before) {
            let linkButton = el;
            if (!el) {
                throw new Error("Invalid tab address:");
            } else if (typeof el === "string" || isFinite(el)) {
                linkButton = getLinkButton(el);
            } else if (el.id) {
                linkButton = el;
            } else {
                throw new Error("Invalid Button or ID");
            }

            if (typeof before === "function") {
                const result = before();
                if (result === false) return false;
            }
            for (const tab of tabs.values()) {
                if (tab.linkButton.id === linkButton.id) {
                    tab.selected = true;
                    selectedTab = tab;
                    document.getElementById(tab.pageId).style.visibility =
                        "visible";
                    tab.linkButton.lastChild.lastChild.style.visibility =
                        "visible";
                    // console.log(tab.linkButton.lastChild.lastChild);
                } else {
                    tab.selected = false;
                    document.getElementById(tab.pageId).style.visibility =
                        "hidden";
                    tab.linkButton.lastChild.lastChild.style.visibility =
                        "hidden";
                }
            }
            applySelection(linkButton, tabSettings);
            if (!isLinkVisible(linkButton)) {
                scrollLinkIntoView(linkButton);
            }
            Event.fire("select", selectedTab);

            return selectedTab;
        }

        function close(el) {
            let tabId = el;
            if (!el) {
                throw new Error("Invalid tab address:");
            } else if (typeof id === "string") {
                // tab id
            } else if (el.id) {
                tabId = el.id; // .substr(5);//button Element
            }
            const tab = tabs.get(tabId);
            // console.log(el, tab, tabs);
            if (!tab) return;
            const link = tab.linkButton; // getLinkButton(tab.linkId);
            const next = link.nextSibling;
            const prev = link.previousSibling;
            Event.fire("before_close", tab);
            link.remove();
            document.getElementById(tab.pageId).remove();
            selectedTab = null; // delete selectedTab;
            tabs.delete(tabId);

            Event.fire("close", tab);
            if (next && next.tagName === "BUTTON") {
                select(next);
            } else if (prev && prev.tagName === "BUTTON") {
                select(prev);
            }
            showHideNavigator();
            scroll(true);
            return tabId;
        }

        function isLinkVisible(link) {
            const box = link.getBoundingClientRect();
            const tabbar = getTabBar();
            if (!tabbar) return false;
            const box1 = tabbar.getBoundingClientRect();
            return box.left >= box1.left && box.right <= box1.right;
        }

        function getVisibleTabs() {
            const tabbar = getTabBar();
            if (!tabbar) return false;
            var links = Array.prototype.slice.call(
                tabbar.querySelectorAll("button")
            );
            return links.filter((link) => {
                return isLinkVisible(link);
            });
        }

        function getHiddenTabs() {
            var links = Array.prototype.slice.call(
                getTabBar().querySelectorAll("button")
            );
            return links.filter((link) => {
                return !isLinkVisible(link);
            });
        }

        function scroll(right) {
            if (themeOptions.infinite_scroll) {
                infiniteScroll(right);
            } else {
                finiteScroll(right);
                showHideNavigator();
            }
        }

        function scrollLinkIntoView(el) {
            if (isLinkVisible(el)) return;
            const max = tabs.size;
            let count = 0;
            while (!isLinkVisible(el)) {
                getRightNavButton().click();
                count++;
                if (count > max) break;
            }
            count = 0;
            while (!isLinkVisible(el)) {
                getLeftNavButton().click();
                count++;
                if (isLinkVisible(el)) return;
                if (count > max) break;
            }
        }

        function finiteScroll(right) {
            tabButtonsCount = tabButtonsCount ? tabButtonsCount : 1;
            tabButtonsCount++;
            const visibleButtons = getVisibleTabs();
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
                const tabbar = getTabBar();
                if (!tabbar) return;
                const bts = tabbar.querySelectorAll("button");
                if (bts.length > 0) {
                    bts[bts.length - 1].style.display = "";
                }
            }
        }

        function infiniteScroll(right) {
            const tabbar = getTabBar();
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

        function destroy() {
            // destroy
            removeListeners();
        }
        return {
            init,
            add,
            close,
            setTheme,
            getTheme,
            destroy,
        };
    };
    return {
        createTabs,
        randomId,
        Emitter,
        Event,
        debounce,
    };
})();

export default TabView;
