'use strict';
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
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    const Emitter = (function () {
        return {
            fire(event, data, context, cancelable, bubbles) {
                const cntx = context || document;
                const myEvent = new CustomEvent(event, {
                    detail: data,
                    cancelable: cancelable || false,
                    bubbles: bubbles || false,
                });
                cntx.dispatchEvent(myEvent);
            },
            on(event, listener, context) {
                const cntx = context || document;
                cntx.addEventListener(event, listener);
            },
            off(event, listener, context) {
                const cntx = context || document;
                cntx.removeEventListener(event, listener);
            },
        };
    })();

    const Event = function () {
        const _listeners = {};
        return {
            addListener(type, listener) {
                if (typeof _listeners[type] === 'undefined') {
                    _listeners[type] = [];
                }
                _listeners[type].push(listener);
            },
            attach(type, listener) {
                this.addListener(type, listener);
            },
            on(type, listener) {
                this.addListener(type, listener);
            },

            fire(event, data, target) {
                if (typeof event === 'string') {
                    event = {
                        type: event,
                        data,
                        target,
                    };
                }
                if (!event.target) {
                    event.target = this;
                }
                if (!event.type) {
                    // falsy
                    throw new Error('Type error');
                }
                if (_listeners[event.type] instanceof Array) {
                    const listeners = _listeners[event.type];
                    for (let i = 0, len = listeners.length; i < len; i++) {
                        listeners[i].call(this, event);
                    }
                }
            },
            trigger(type, listener) {
                this.fire(type, listener);
            },

            removeListener(type, listener) {
                if (_listeners[type] instanceof Array) {
                    const listeners = _listeners[type];
                    for (let i = 0, len = listeners.length; i < len; i++) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            off(type, listener) {
                this.removeListener(type, listener);
            },
        };
    };

    function createTabButton(linkId, tabId, { target, fancy, title, bg }) {
        const tabBtn = document.createElement('button');
        tabBtn.className = 'tab-link';
        tabBtn.setAttribute('href', '#!');
        tabBtn.setAttribute('id', linkId);
        tabBtn.setAttribute('title', title);
        tabBtn.setAttribute('name', 'tab-link');
        tabBtn.setAttribute('draggable', 'true');
        tabBtn.setAttribute('data-tab', tabId);
        tabBtn.setAttribute('data-target', target);
        tabBtn.style.position = 'relative';
        tabBtn.style.outline = 'none';
        tabBtn.style.height = '100%';
        tabBtn.style.width = 'auto';
        tabBtn.style.border = '0 none transparent';
        tabBtn.style.fontSize = '12px';
        tabBtn.style.fontWeight = '500';
        tabBtn.style.margin = '0';
        tabBtn.style.padding = '0';
        tabBtn.style.boxShadow = 'none';
        tabBtn.style.background = bg || 'inherit';
        tabBtn.style.color = 'inherit';
        tabBtn.style.cursor = 'pointer';
        tabBtn.style.display = 'block';
        // tabBtn.style.transform = 'rotate(-5deg)';
        tabBtn.style.transition = 'background .1s';
        if (fancy) {
            tabBtn.style.borderRadius = '8px 1px 0px 0px';
        } else {
            tabBtn.style.borderRadius = '1px 1px 0px 0px';
        }

        return tabBtn;
    }
    function createCloseButton() {
        const closeBtn = document.createElement('a');
        closeBtn.innerHTML = '&times';
        closeBtn.setAttribute('name', 'close-button');
        closeBtn.setAttribute('title', 'close');
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.visibility = 'hidden';
        closeBtn.style.height = closeBtn.style.width = '16px';
        closeBtn.style.float = 'right';
        closeBtn.style.marginRight = '2px';
        closeBtn.style.marginLeft = '5px';
        closeBtn.style.display = 'flex';
        closeBtn.style.padding = '2px 0px 0px 4px';
        closeBtn.style.alignContent = 'center';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.fontSize = '18px';
        closeBtn.style.color = '#efefef';
        closeBtn.style.fontWeight = '700';
        closeBtn.style.background = 'transparent';
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = 'red';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '';
        });

        return closeBtn;
    }
    function createLabel(text, title) {
        const label = document.createElement('label');
        label.setAttribute('name', 'tab-link-label');
        label.className = 'tab-link-label';
        label.style.margin = '0';
        label.style.paddingRight = '4px';
        label.style.paddingLeft = '2px';
        label.style.verticalAlign = 'middle';
        // label.style.padding = '0';
        label.style.color = 'inherit';
        label.style.maxWidth = '125px';
        label.style.overflow = 'hidden';
        label.style.textOverflow = 'ellipse';
        label.style.whiteSpace = 'nowrap';
        label.style.background = '';
        label.style.cursor = 'pointer';
        label.style.fontSize = 'inherit';
        label.style.fontWeight = 'inherit';
        label.append(document.createTextNode(text));
        label.setAttribute('title', title || text);
        return label;
    }
    function createTabBarWraper() {
        const tabbarContainer = document.createElement('div');
        tabbarContainer.style.position = 'relative';
        tabbarContainer.style.height = '100%';
        // tabbarContainer.style.height = '100%';
        tabbarContainer.style.width = '100%';
        tabbarContainer.style.border = 'none';
        tabbarContainer.style.padding = '0';
        tabbarContainer.style.background = 'red';
        tabbarContainer.className = 'tabbar-wrapper';
        return tabbarContainer;
    }
    function createTabBar() {
        const tabBar = document.createElement('div');
        tabBar.setAttribute('id', randomId());
        tabBar.style.position = 'absolute';
        // tabBar.style.width = '100%';
        tabBar.style.top = '0';
        tabBar.style.bottom = '0';
        tabBar.style.left = '16px';
        tabBar.style.right = '16px';
        tabBar.style.overflow = 'hidden';
        tabBar.style.padding = '1px';
        tabBar.style.margin = '0px';
        tabBar.style.paddingRight = '7px';
        tabBar.style.background = 'inherit';
        tabBar.style.display = 'flex';
        tabBar.className = 'tab-bar';
        return tabBar;
    }
    function createButton(name, text, float) {
        const btn = document.createElement('button');
        btn.id = randomId();
        btn.setAttribute('name', name);
        btn.style.position = 'relative';
        btn.style.height = '100%';
        btn.style.border = '0 none transparent';
        btn.style.background = 'transparent';
        btn.style.color = 'white';
        btn.style.marginRight = btn.style.marginLeft = '1px';
        btn.style.padding = '2px';
        // btn.style.paddingLeft = btn.style.paddingRight = '2px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '900';
        btn.style.fontSize = '14px';
        btn.style.float = float || 'none';
        btn.style.outline = 'none';
        btn.style.borderRadius = '4px 4px';
        btn.innerHTML = text;
        return btn;
    }
    function createImage(options) {
        const img = document.createElement('span');
        img.style.marginRight = '2px';
        // img.style.color = '#b00';
        img.style.fontWeight = 'bold';
        img.innerHTML = options.icon || 'kb';
        img.style.float = 'left';
        img.style.paddingLeft = '4px';
        return img;
    }
    function createLabelContainer(options) {
        const labelContainer = document.createElement('label');
        labelContainer.setAttribute('name', 'tab-link-label-wraper');
        labelContainer.style.display = 'flex';
        labelContainer.style.alignContent = 'center';
        labelContainer.style.alignItems = 'center';
        labelContainer.style.padding = '2px';
        labelContainer.style.height = '100%';
        labelContainer.style.width = '100%';
        labelContainer.style.color = 'inherit';
        labelContainer.style.background = 'transparent';
        labelContainer.style.cursor = 'pointer';

        return labelContainer;
    }
    function createTable(tabBarWrapper, pagePanel, settings = {}) {
        let banner;
        let footer;
        if (settings.banner) {
            banner = addBanner();
        }
        if (settings.footer) {
            footer = addFooter();
        }
        const doc = document.createDocumentFragment();
        const table = document.createElement('table');
        table.style.width = table.style.height = '100%';
        doc.append(table);

        const thead = document.createElement('thead');
        table.append(thead);

        const bannerRow = document.createElement('tr');
        bannerRow.style.minHeight = '0px';
        bannerRow.style.maxHeight = '80px';
        thead.append(bannerRow);
        const th = document.createElement('th');
        // th.setAttribute('colspan',3);
        th.style.textAlign = 'left';
        th.style.padding = '0';
        if (banner) {
            th.append(banner);
        } else {
            bannerRow.style.display = 'none';
        }
        bannerRow.appendChild(th);

        const tbody = document.createElement('tbody');
        table.append(tbody);

        const linkRow = document.createElement('tr');
        linkRow.style.minHeight = '24px';
        linkRow.style.height = `${settings.tabHeight}px`;
        linkRow.style.padding = '0';
        tbody.append(linkRow);

        let td = document.createElement('td');
        td.style.overflow = 'hidden';
        td.style.whiteSpace = 'nowrap';
        td.style.textAlign = 'left';
        td.style.padding = '0';
        td.append(tabBarWrapper);
        linkRow.appendChild(td);
        table.style.borderCollapse =
            linkRow.style.borderCollapse =
            td.style.borderCollapse =
                'collapse';
        table.style.border =
            linkRow.style.border =
            td.style.border =
                '0 none transparent';

        const pageRow = document.createElement('tr');
        tbody.append(pageRow);
        td = document.createElement('td');
        td.append(pagePanel);
        td.style.textAlign = 'left';
        td.style.padding = '0';
        pageRow.appendChild(td);

        const linkRow2 = document.createElement('tr');
        tbody.append(linkRow2);
        td = document.createElement('td');
        td.style.textAlign = 'left';
        td.style.padding = '0';
        linkRow2.appendChild(td);
        linkRow2.style.minHeight = '24px';
        linkRow2.style.height = `${settings.tabHeight}px`;

        const footerRow = document.createElement('tr');
        tbody.append(footerRow);
        td = document.createElement('td');
        footerRow.appendChild(td);
        footerRow.style.maxHeight = '24px';
        td = document.createElement('td');
        td.style.padding = '0';
        if (footer) {
            td.append(footer || document.createTextNode(''));
        } else {
            footerRow.style.display = 'none';
        }
        footerRow.appendChild(td);
        td = document.createElement('td');
        td.style.padding = '0';
        footerRow.appendChild(td);
        if (settings.bottom) {
            linkRow2.firstElementChild.nextSibling.appendChild(tabBarWrapper);
            linkRow.style.display = 'none';
        } else {
            linkRow2.style.display = 'none';
        }
        return doc;
    }
    function createPage(pageId, tabId, linkId, options) {
        const page = document.createElement('div');
        page.setAttribute('id', pageId);
        page.setAttribute('data-tab', tabId);
        page.setAttribute('data-trigger', linkId);
        page.innerHTML = options.text || '';
        page.style.position = 'absolute';
        page.style.padding = '8px 16px';
        page.style.visibility = 'hidden';
        page.style.overflow = 'hidden';
        page.style.top =
            page.style.bottom =
            page.style.left =
            page.style.right =
                '0';
        // page.style.top='0'; do not specify top!!!
        page.style.background = options.bg || '';
        return page;
    }
    function createPagePanel() {
        const panel = document.createElement('div');
        panel.setAttribute('id', randomId());
        panel.style.position = 'relative';
        panel.className = 'tab-panel';
        panel.style.width = '100%';
        panel.style.height = '100%';
        panel.style.overflow = 'hidden';
        panel.style.margin = '0';
        panel.style.top = '0';
        panel.style.background = '';
        return panel;
    }
    function loadFromMarkup(el, fn) {
        if (typeof el === 'string') {
            el = document.getElementById(el);
        }
        if (!el || !el.children) {
            throw new Error('Invalid element to load markup');
        }
        const markup = el.children;
        // let doc=document.createDocumentFragment();
        if (!markup || markup.length === 0) return fn();
        const banner = el.querySelector('.tab-banner');
        const footer = el.querySelector('.tab-footer');
        const links = el.querySelector('.tab-links').children;
        const pages = el.querySelector('.tab-pages').children;
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
                id: node.id !== '' ? node.id : null,
                label: node.textContent,
                title: node.getAttribute('title'),
                closable: node.getAttribute('closable'),
                target: node.getAttribute('data-target'),
                selected: node.getAttribute('selected'),
                html: page ? page.innerHTML : '',
                bg: page ? page.style.background : '#0bc',
                style: node.getAttribute('tab-style'),
            });
            node.remove();
            page.remove();
        }
        return data;
    }
    function addFooter() {
        const footer = document.createElement('span');
        footer.setAttribute('name', 'tab-footer');
        footer.innerHTML = settings.footer;
        footer.className = 'tab-footer';
        footer.style.left = '0';
        footer.style.right = '0';
        footer.style.bottom = '0';
        footer.style.padding = '2px';
        footer.style.display = 'flex';
        footer.style.justifyContent = 'center';
        footer.style.alignItems = 'center';
        // footer.style.background='#030';
        // footer.style.borderTop='1px solid #020';

        return footer;
    }
    function addBanner() {
        const banner = document.createElement('span');
        banner.setAttribute('name', 'tab-banner');
        banner.innerHTML =
            typeof settings.banner === 'string'
                ? settings.banner
                : settings.banner.innerHTML;
        banner.style.display = 'flex';
        banner.style.padding = '5px';
        banner.style.justifyContent = 'center';
        banner.style.alignItems = 'center';
        banner.className = 'tab-banner';
        banner.style.background = 'green';

        return banner;
    }
    function mountTab(el, doc, tabPagePanel) {
        // const container = typeof el === 'object' ? el : document.getElementById(el);
        container.appendChild(tabPagePanel);
        const tabbar = doc.querySelector('div');
        let banner;
        let footer;
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
                '0';
        const bannerBox = banner ? banner.getBoundingClientRect() : null;
        const bannerBottom = banner ? bannerBox.bottom - bannerBox.top : 0;

        const footerBox = footer ? footer.getBoundingClientRect() : null;
        const footerTop = footer ? footerBox.bottom - footerBox.top : 0;

        if (settings.bottom) {
            // tab bar is at bottom oftab window
            tabbar.style.bottom = `${footerTop}px`;
        } else {
            tabbar.style.top = `${bannerBottom}px`;
        }
        tabbar.style.border = '0px none transparent';
        tabPagePanel.style.border = '0px none transparent';
    }
    function applySelection(el, options) {
        if (!el || !el.parentElement) {
            return;
        }
        const tablinks = el.parentElement.children;
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove('active');
            tablinks[i].style.background = options.bg;
            tablinks[i].style.color = options.color;
            // tablinks[i].lastChild.lastChild.style.visibility = "hidden";
            tablinks[i].style.boxShadow = '1px 1px 2px 1px #333';
            // tablinks[i].style.margin = '';
        }

        el.classList.add('active');
        el.style.background = options.activeBg;
        el.style.color = options.activecolor;
        el.style.boxShadow = '4px 4px 16px 2px #333';
        // el.style.marginRight = '1px';
    }
    const createTabs = function (el, options) {
        const tabIndex = -1;
        const currentIndex = 0;
        const customEvent = new Event();
        let selectedTab;
        let tabBar;
        let tabBarWraper;
        let rightBtn;
        let leftBtn;
        let addBtn;
        let pagePanelId;
        let tabBarId;
        let themeOptions;
        let tabSettings;
        let container;
        let tabButtonsCount;
        let dragStartPoint;
        let dragStopPoint;
        const tabs = new Map();
        const buttons = {};
        const links = {};
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
            container =
                typeof el === 'object' && el instanceof HTMLElement
                    ? el
                    : document.getElementById(el);
            themeOptions = options;
            const data = options.loadFromMarkup ? loadFromMarkup(el) : null;
            if (data) {
                themeOptions = Object.assign(themeOptions, data);
            }
            applySettings(themeOptions);
            leftBtn = createButton('left-nav-button', '&lt;', 'left');
            // leftNavId = leftBtn.id;
            leftBtn.addEventListener('mousedown', () => {
                scroll(false);
            });

            addBtn = createButton('add-tab-button', '+', 'left');
            // addBtnId = addBtn.id;
            if (themeOptions.add) {
                addBtn.style.visibility = 'visible';
            } else {
                addBtn.style.visibility = 'hidden';
            }
            addBtn.addEventListener('mousedown', () => {
                customEvent.fire('add-tab-click', randomId());
            });
            tabBar = createTabBar();
            tabBarId = tabBar.id;

            tabBarWraper = createTabBarWraper();
            tabBarWraper.appendChild(leftBtn);
            tabBarWraper.append(tabBar);
            // tabBarWraper.appendChild(addBtn);
            /////tabBarWraper.style.background = 'purple';
            rightBtn = createButton('right-nav-button', '&gt;', 'right');
            rightBtn.addEventListener('mousedown', () => {
                scroll(true);
            });
            tabBarWraper.appendChild(rightBtn);
            const pagePanel = createPagePanel();
            pagePanelId = pagePanel.id;
            const layout = createTable(tabBarWraper, pagePanel, themeOptions);

            container.append(layout);
            setTheme(themeOptions.theme);
            attachDomEventListeners(this);
            if (themeOptions.tabs) {
                dynamicLoad(themeOptions.tabs);
            }
            toggleNavigator(getLeftNavButton(), false);
            toggleNavigator(getRightNavButton(), false);
            ///////rightBtn.style.visibility = 'visible';
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
            const { width } = lastHidden.getBoundingClientRect();
            const gap =
                tabBar.getBoundingClientRect().right -
                last.getBoundingClientRect().right;
            if (width < gap) {
                scrollLinkIntoView(lastHidden);
            }
        }

        function attachDomEventListeners() {
            const tabBar = getTabBar();
            window.addEventListener('resize', () => {
                debounce(() => {
                    if (!selectedTab) return false;
                    if (!isLinkVisible(selectedTab.linkButton)) {
                        scrollLinkIntoView(selectedTab.linkButton);
                    } else {
                        unhide();
                        scrollLinkIntoView(selectedTab.linkButton);
                    }
                    // showHideNavButton();
                    showHideNavigator();
                }, 200);
            });

            tabBar.addEventListener(
                'keyup',
                (event) => {
                    handleKeypress(event);
                },
                true
            );

            tabBar.addEventListener(
                'drop',
                (event) => {
                    event.preventDefault();

                    dragStopPoint = event.clientX;
                    drop(event);
                },
                true
            );

            tabBar.addEventListener(
                'dragover',
                (event) => {
                    event.preventDefault();
                },
                true
            );

            tabBar.addEventListener('dragstart', (event) => {
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
                        select(link.previousSibling.getAttribute('data-tab'));
                    }
                    break; // left key
                case 39:
                    if (link.nextSibling) {
                        select(link.nextSibling.getAttribute('data-tab'));
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
        function showHideNavigator() {
            const visibleButtons = getVisibleTabs();
            const firstVisibleButton = visibleButtons[0];
            const lastVisibleButton = visibleButtons[visibleButtons.length - 1];

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
        function showHideNavButton() {
            // console.log(settings);
            if (themeOptions.infiniteScroll) {
                // return;
            }
            const visibleButtons = getVisibleTabs();
            const firstVisibleButton = visibleButtons[0];
            const lastVisibleButton = visibleButtons[visibleButtons.length - 1];

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
                // el.style.visibility = 'visible';
                el.style.display = 'block';
            } else {
                // el.style.visibility = 'hidden';
                el.style.display = 'none';
            }
        }

        function toggleAddButton(show) {
            if (show) {
                getAddButton().style.display = 'block';
            } else {
                getAddButton().style.display = 'none';
            }
        }

        function applyTheme(options) {
            const table = getContainer().querySelector('table');
            table.style.background = '';
            table.style.color = options.color;
            leftBtn.style.color =
                rightBtn.style.color =
                addBtn.style.color =
                    options.color;
            tabBarWraper.style.background = options.activeBg;
        }

        // Public API
        /** *
         * @param theme String
         * @returns null
         */
        function setTheme(theme) {
            let color = '#ddd';
            let bg = '#4486a3';
            let activecolor = '#ddd';
            let activeBg = '#4476a3';
            switch (theme) {
                case 'dark':
                    // bg = '#002255';
                    // activeBg = '#003355';
                    // color = '#fff';
                    break;
                case 'black':
                    // bg = '#111';
                    // activeBg = '#333';
                    // color = '#fff';
                    break;
                case 'blue':
                    bg = 'rgba(8, 68, 117, 1)';
                    activeBg = 'rgba(10, 100, 186, 1)';
                    break;
                case 'green':
                    bg = 'rgba(0, 149, 120, 1)';
                    activeBg = '#054';
                    break;
                case 'red':
                    bg = 'rgb(120, 0, 30)';
                    activeBg = 'rgb(123, 0, 50)';
                    break;
                case 'white':
                    bg = '#bcd';
                    color = '#000';
                    activecolor = '#eee';
                    break;
                default:
                    bg = 'rgba(10, 100, 186, 1)';
                    activeBg = 'rgba(10, 100, 206, 1)';
                    color = '#fff';
                    break;
            }
            tabSettings = {
                bg,
                color,
                activecolor,
                activeBg,
            };
            applyTheme(tabSettings);
        }

        function getTheme() {
            return themeOptions.theme;
        }

        function toggleNavigator(el, show) {
            if (show) {
                //el.style.visibility = 'visible';
                el.style.display = 'block';
            } else {
                // el.style.visibility = 'hidden';
                el.style.display = 'none';
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
                closeOnClick: undefined,
                infiniteScroll: false,
                fancy: false,
                add: false,
                theme: '',
                tabHeight: 32,
                leftTooltip: '&lt;',
                rightTooltip: '&gt;',
                addTooltip: '+',
                data: null,
            };

            themeOptions = Object.assign(mySettings, options);
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
                    typeof d.html === 'function' ? d.html() : d.html;
                page.setAttribute('contenteditable', true);
                page.style.overflow = 'auto';
                page.style.zIndex = '100';
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
            return container; // document.getElementById(containerId);
        }
        function hideExtraTabs() {
            const links = Object.values(links);
            const numTotal = links.length;
            const numVisible = Math.min(numTotal, themeOptions.limit);
            for (let i = 0; i < links.length; i++) {
                links[i].style.display = 'none'; // hide xo tabs.
            }
            for (let j = 0; j < numVisible; j++) {
                links[j].style.display = 'inline'; // Show visible tabs.
            }
        }

        function getLinkTarget(el) {
            try {
                while (el.name !== 'tab-link') {
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
            ev.dataTransfer.setData('text', ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData('text');
            // do not drop on label wrappers or close button
            const target = getLinkTarget(ev.target);
            const dataEl = document.getElementById(data);

            if (dragStartPoint > dragStopPoint) {
                target.before(dataEl);
            } else {
                target.after(dataEl);
            }
            // target.parentNode.insertBefore(dataEl,dragStartPoint>dragStopPoint?target:target.nextSibling);
        }
        function getSettings(options) {
            const { length } = Object.keys(buttons);
            const tabId = options.tabId || randomId();
            const buttonId = `tab-btn-${tabId}`;
            const target = `tab-page-${tabId}`;
            const tabLabel = options.label || `Tab${Number(length + 1)}`;
            const title = options.title || tabLabel;

            const settings = {
                tabId,
                buttonId,
                target,
                label: tabLabel,
                title,
                html: options.html || '',
                closable: options.close || true,
                data: options.data || null,
                icon: options.icon || '',
                bg: options.bg || 'inherit',
                color: options.color || 'inherit',
                fancy: themeOptions.fancy,
            };
            return Object.assign(settings, options);
        }
        function handleTabClick(e) {
            e.stopImmediatePropagation();
            select(this.getAttribute('data-tab'));
        }
        function add(options = {}) {
            const tabSettings = getSettings(options); // Object.assign(getSettings(options), options);
            const page = createPage(
                tabSettings.target,
                tabSettings.tabId,
                tabSettings.buttonId,
                tabSettings
            );

            getTabPagePanel().appendChild(page);
            const tabBtn = createTabButton(
                tabSettings.buttonId,
                tabSettings.tabId,
                tabSettings
            );
            const labelContainer = createLabelContainer(tabSettings);
            const img = createImage(tabSettings);
            const label = createLabel(tabSettings.label, tabSettings.title);
            const closeBtn = createCloseButton(tabSettings.tabId);

            if (!tabSettings.closable) {
                closeBtn.style.display = 'none';
                labelContainer.style.paddingRight = '7px';
            }
            labelContainer.append(img);
            labelContainer.append(label);
            labelContainer.append(closeBtn);
            tabBtn.append(labelContainer);
            tabBtn.addEventListener('mouseup', handleTabClick);
            tabBtn.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                if (selectedTab.linkButton.id === tabBtn.id) return;
                closeBtn.style.visibility = 'visible';
            });
            tabBtn.addEventListener('mouseleave', (e) => {
                e.stopPropagation();
                if (selectedTab.linkButton.id === tabBtn.id) return;
                closeBtn.style.visibility = 'hidden';
            });
            closeBtn.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                close(tabSettings.tabId); // linkButton.getAttribute("data-tab"));
            });
            buttons[tabBtn.id] = tabBtn;
            // If there was a selected button already, insert after it
            // otherwise append at the end of tab list
            if ((selectedTab = getSelectedTab())) {
                // tab.selected=false;
                selectedTab.linkButton.after(tabBtn);
                // getLinkButton(tab.linkId).after(linkButton);
            } else {
                getTabBar().appendChild(tabBtn);
            }
            tabs.set(tabSettings.tabId, {
                id: tabSettings.tabId,
                label: tabSettings.label,
                text: tabSettings.text,
                title: tabSettings.title,
                linkId: tabSettings.buttonId,
                pageId: tabSettings.target,
                data: tabSettings.data,
                selected: tabSettings.buttonId,
                linkButton: tabBtn,
                page,
            });
            selectedTab = tabs.get(tabSettings.tabId);
            showHideNavButton();
            select(tabBtn.getAttribute('data-tab'));
            if (tabSettings.selected) {
                return selectedTab;
            }
            return selectedTab;
        }

        function select(tabId) {
            if (!tabId) {
                throw new Error('Invalid tab address:');
            }

            if (selectedTab) {
                document.getElementById(selectedTab.pageId).style.visibility =
                    'hidden';
                selectedTab.linkButton.lastChild.lastChild.style.visibility =
                    'hidden';
                selectedTab.selected = false;
            }

            let tab = tabs.get(tabId);
            // let tabPage = selectedTab.getAttribute('data-target');
            document.getElementById(tab.pageId).style.visibility = 'visible';
            tab.linkButton.lastChild.lastChild.style.visibility = 'visible';
            tab.selected = true;
            applySelection(tab.linkButton, tabSettings);
            if (!isLinkVisible(tab.linkButton)) {
                scrollLinkIntoView(tab.linkButton);
            }
            selectedTab = tab;
            customEvent.fire('select', selectedTab);

            return selectedTab;
        }

        function close(tabId) {
            if (!tabId) {
                throw new Error('Invalid tab address:');
            }
            const tab = tabs.get(tabId);
            // console.log(el, tab, tabs);
            if (!tab) return;
            const link = tab.linkButton; // getLinkButton(tab.linkId);
            const next = link.nextSibling;
            const prev = link.previousSibling;
            customEvent.fire('before_close', tab);
            link.remove();
            document.getElementById(tab.pageId).remove();
            selectedTab = null; // delete selectedTab;
            tabs.delete(tabId);

            customEvent.fire('close', tab);
            if (next && next.getAttribute('data-tab')) {
                select(next.getAttribute('data-tab'));
            } else if (prev && prev.getAttribute('data-tab')) {
                select(prev.getAttribute('data-tab'));
            }
            // showHideNavButton();
            showHideNavigator();
            scroll();
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
            const links = Array.prototype.slice.call(
                tabbar.querySelectorAll('button')
            );
            return links.filter((link) => isLinkVisible(link));
        }

        function getHiddenTabs() {
            const links = Array.prototype.slice.call(
                getTabBar().querySelectorAll('button')
            );
            return links.filter((link) => !isLinkVisible(link));
        }

        function scroll(right) {
            if (themeOptions.infiniteScroll) {
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
            tabButtonsCount = tabButtonsCount || 1;
            tabButtonsCount++;
            const visibleButtons = getVisibleTabs();
            const firstVisibleButton = visibleButtons[0];
            const lastVisibleButton = visibleButtons[visibleButtons.length - 1];
            if (right && lastVisibleButton && lastVisibleButton.nextSibling) {
                firstVisibleButton.style.display = 'none';
            } else if (
                !right &&
                firstVisibleButton &&
                firstVisibleButton.previousSibling
            ) {
                firstVisibleButton.previousSibling.style.display = '';
            } else {
                const tabbar = getTabBar();
                if (!tabbar) return;
                const bts = tabbar.querySelectorAll('button');
                if (bts.length > 0) {
                    bts[bts.length - 1].style.display = '';
                }
            }
        }

        function infiniteScroll(right) {
            const tabbar = getTabBar();
            if (!tabbar) return;
            const links = tabbar.querySelectorAll('button');
            if (links.length > 1) {
                if (right) {
                    links[links.length - 1].after(links[0]);
                } else {
                    links[0].before(links[links.length - 1]);
                }
            }
        }
        function onSelect(fn) {
            customEvent.addListener('select', fn);
        }
        function onClose(fn) {
            customEvent.addListener('close', fn);
        }
        function destroy() {
            // removeListeners();
            console.log('Tabs Destroyed');
        }
        return {
            add,
            close,
            select,
            getTab,
            getTabAtIndex,
            getSelectedTab,
            getTabs: () => selectedTab,
            setTheme,
            getTheme,
            onSelect,
            onClose,
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
