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

var TabView = function () {
  function randomId() {
    return Math.random().toString(36).slice(2);
  } // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.


  function debounce(func, wait, immediate) {
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
  }

  var Emitter = function () {
    return {
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
        cntx.addEventListener(event, listener);
      },
      off: function off(event, listener, context) {
        var cntx = context || document;
        cntx.removeEventListener(event, listener);
      }
    };
  }();

  var Event = function () {
    var _listeners = {};
    return {
      addListener: function addListener(type, listener) {
        if (typeof _listeners[type] === 'undefined') {
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
        if (typeof event === 'string') {
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
          throw new Error('Type error');
        }

        if (_listeners[event.type] instanceof Array) {
          var listeners = _listeners[event.type];

          for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i].call(this, event);
          }
        }
      },
      trigger: function trigger(type, listener) {
        this.fire(type, listener);
      },
      removeListener: function removeListener(type, listener) {
        if (_listeners[type] instanceof Array) {
          var listeners = _listeners[type];

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
  }();

  function createTabButton(linkId, tabId, _ref) {
    var target = _ref.target,
        title = _ref.title,
        bg = _ref.bg;
    var tabBtn = document.createElement('button');
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
    tabBtn.style.transition = 'background .4s';

    if (style) {
      tabBtn.style.borderRadius = '8px 1px 0px 0px';
    } else {
      tabBtn.style.borderRadius = '1px 1px 0px 0px';
    }

    tabBtn.addEventListener('click', function () {
      select(tabId);
    });
    return tabBtn;
  }

  function createCloseButton(tabId) {
    var closeBtn = document.createElement('a');
    closeBtn.innerHTML = '&times';
    closeBtn.setAttribute('name', 'close-button');
    closeBtn.setAttribute('title', 'close');
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.visibility = 'hidden';
    closeBtn.style.height = closeBtn.style.width = '20px';
    closeBtn.style["float"] = 'right';
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
    closeBtn.addEventListener('mouseenter', function () {
      closeBtn.style.background = '#555';
    });
    closeBtn.addEventListener('mouseleave', function () {
      closeBtn.style.background = '';
    });
    closeBtn.addEventListener('click', function (e) {
      close(tabId); // linkButton.getAttribute("data-tab"));

      e.stopImmediatePropagation();
    });
    return closeBtn;
  }

  function createLabel(text, title) {
    var label = document.createElement('label');
    label.setAttribute('name', 'tab-link-label');
    label.className = 'tab-link-label';
    label.style.margin = '0';
    label.style.paddingRight = '2px';
    label.style.paddingLeft = '2px';
    label.style.verticalAlign = 'middle';
    label.style.padding = '0';
    label.style.color = 'inherit';
    label.style.maxWidth = '80px';
    label.style.overflow = 'hidden';
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
    var tabbarContainer = document.createElement('div');
    tabbarContainer.style.position = 'relative';
    tabbarContainer.style.height = '100%';
    tabbarContainer.style.height = '100%';
    tabbarContainer.style.width = '100%';
    tabbarContainer.style.border = 'none';
    tabbarContainer.style.padding = 'none';
    tabbarContainer.className = 'tabbar-wrapper';
    return tabbarContainer;
  }

  function createBar() {
    var tabBar = document.createElement('div');
    tabBar.setAttribute('id', randomId());
    tabBar.style.position = 'absolute';
    tabBar.style.top = '0';
    tabBar.style.bottom = '0';
    tabBar.style.left = '60px';
    tabBar.style.right = '30px';
    tabBar.style.overflow = 'hidden';
    tabBar.style.padding = '0px';
    tabBar.style.margin = '0px';
    tabBar.style.paddingRight = '7px';
    tabBar.style.background = 'inherit';
    tabBar.style.display = 'flex';
    tabBar.className = 'tab-bar';
    return tabBar;
  }

  function createButton(name, text, _float) {
    var btn = document.createElement('button');
    btn.id = randomId();
    btn.setAttribute('name', name);
    btn.style.height = '100%';
    btn.style.border = '0 none transparent';
    btn.style.background = 'transparent';
    btn.style.color = 'white';
    btn.marginRight = btn.marginLeft = '2px';
    btn.style.padding = '2px';
    btn.style.paddingLeft = btn.style.paddingRight = '7px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = '900';
    btn.style.fontSize = '14px';
    btn.style["float"] = _float || 'none';
    btn.style.outline = 'none';
    btn.innerHTML = text;
    btn.style.borderRadius = '4px 4px';
    return btn;
  }

  function createImage(options) {
    var img = document.createElement('span');
    img.style.marginRight = '7px';
    img.style.color = '#b00';
    img.style.fontWeight = 'bold';
    img.innerHTML = options.icon || 'kb';
    img.style["float"] = 'left';
    return img;
  }

  function createLabelContainer(options) {
    var labelContainer = document.createElement('label');
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

  function createTable(tabBarWrapper, pagePanel, settings) {
    if (settings === void 0) {
      settings = {};
    }

    var banner;
    var footer;

    if (settings.banner) {
      banner = addBanner();
    }

    if (settings.footer) {
      footer = addFooter();
    }

    var doc = document.createDocumentFragment();
    var table = document.createElement('table');
    table.style.width = table.style.height = '100%';
    doc.append(table);
    var thead = document.createElement('thead');
    table.append(thead);
    var bannerRow = document.createElement('tr');
    bannerRow.style.minHeight = '0px';
    bannerRow.style.maxHeight = '80px';
    thead.append(bannerRow);
    var th = document.createElement('th'); // th.setAttribute('colspan',3);

    th.style.textAlign = 'left';
    th.style.padding = '0';

    if (banner) {
      th.append(banner);
    } else {
      bannerRow.style.display = 'none';
    }

    bannerRow.appendChild(th);
    var tbody = document.createElement('tbody');
    table.append(tbody);
    var linkRow = document.createElement('tr');
    linkRow.style.minHeight = '24px';
    linkRow.style.height = settings.tabHeight + "px";
    linkRow.style.padding = '0';
    tbody.append(linkRow);
    var td = document.createElement('td');
    td.style.overflow = 'hidden';
    td.style.whiteSpace = 'nowrap';
    td.style.textAlign = 'left';
    td.style.padding = '0';
    td.append(tabBarWrapper);
    linkRow.appendChild(td);
    table.style.borderCollapse = linkRow.style.borderCollapse = td.style.borderCollapse = 'collapse';
    table.style.border = linkRow.style.border = td.style.border = '0 none transparent';
    var pageRow = document.createElement('tr');
    tbody.append(pageRow);
    td = document.createElement('td');
    td.append(pagePanel);
    td.style.textAlign = 'left';
    td.style.padding = '0';
    pageRow.appendChild(td);
    var linkRow2 = document.createElement('tr');
    tbody.append(linkRow2);
    td = document.createElement('td');
    td.style.textAlign = 'left';
    td.style.padding = '0';
    linkRow2.appendChild(td);
    linkRow2.style.minHeight = '24px';
    linkRow2.style.height = settings.tabHeight + "px";
    var footerRow = document.createElement('tr');
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
    var page = document.createElement('div');
    page.setAttribute('id', pageId);
    page.setAttribute('data-tab', tabId);
    page.setAttribute('data-trigger', linkId);
    page.innerHTML = options.text || '';
    page.style.position = 'absolute';
    page.style.padding = '8px 16px';
    page.style.visibility = 'hidden';
    page.style.overflow = 'auto';
    page.style.top = page.style.bottom = page.style.left = page.style.right = '0'; // page.style.top='0'; do not specify top!!!

    page.style.background = options.bg || '';
    return page;
  }

  function createPagePanel() {
    var panel = document.createElement('div');
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

    var markup = el.children; // let doc=document.createDocumentFragment();

    if (!markup || markup.length === 0) return fn();
    var banner = el.querySelector('.tab-banner');
    var footer = el.querySelector('.tab-footer');
    var links = el.querySelector('.tab-links').children;
    var pages = el.querySelector('.tab-pages').children;
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
        id: node.id !== '' ? node.id : null,
        label: node.textContent,
        title: node.getAttribute('title'),
        closable: node.getAttribute('closable'),
        target: node.getAttribute('data-target'),
        selected: node.getAttribute('selected'),
        html: page ? page.innerHTML : '',
        bg: page ? page.style.background : '#0bc',
        style: node.getAttribute('tab-style')
      });
      node.remove();
      page.remove();
    }

    return data;
  }

  function addFooter() {
    var footer = document.createElement('span');
    footer.setAttribute('name', 'tab-footer');
    footer.innerHTML = settings.footer;
    footer.className = 'tab-footer';
    footer.style.left = '0';
    footer.style.right = '0';
    footer.style.bottom = '0';
    footer.style.padding = '2px';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'center';
    footer.style.alignItems = 'center'; // footer.style.background='#030';
    // footer.style.borderTop='1px solid #020';

    return footer;
  }

  function addBanner() {
    var banner = document.createElement('span');
    banner.setAttribute('name', 'tab-banner');
    banner.innerHTML = typeof settings.banner === 'string' ? settings.banner : settings.banner.innerHTML;
    banner.style.display = 'flex';
    banner.style.padding = '5px';
    banner.style.justifyContent = 'center';
    banner.style.alignItems = 'center';
    banner.className = 'tab-banner';
    banner.style.background = 'green';
    return banner;
  }

  function applySelection(el, options) {
    if (!el || !el.parentElement) {
      return;
    }

    var tablinks = el.parentElement.children; // console.log(el.parentElement.parentElement);

    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
      tablinks[i].style.background = options.bg;
      tablinks[i].style.color = options.color; // tablinks[i].lastChild.lastChild.style.visibility = "hidden";
    }

    el.classList.add('active');
    el.style.background = options.activeBg;
    el.style.color = options.activecolor; // el.lastChild.lastChild.style.visibility = "visible";
  }

  var createTabs = function createTabs(el, options) {
    var selectedTab;
    var tabBar;
    var rightBtn;
    var leftBtn;
    var addBtn;
    var pagePanelId;
    var tabBarId;
    var themeOptions;
    var tabSettings;
    var containerId;
    var dragStartPoint;
    var dragStopPoint;
    var tabs = new Map();
    var buttons = {};
    init(el, options);
    /**
     * Initialize tab container
     * @param {HTMLElement} el HTMLElement to attach tabs
     * @param {Object} options Additional settings
     * @returns void
     */

    function init(el, options) {
      themeOptions = options;
      var data = options.loadFromMarkup ? loadFromMarkup(el) : null;

      if (data) {
        themeOptions = Object.assign(themeOptions, data);
      }

      applySettings(themeOptions);
      leftBtn = createButton('left-nav-button', '&lt;', 'left');
      leftBtn.addEventListener('click', function () {
        scroll(false);
      });
      addBtn = createButton('add-tab-button', '+', 'left');

      if (themeOptions.add) {
        addBtn.style.visibility = 'visible';
      } else {
        addBtn.style.visibility = 'hidden';
      }

      addBtn.addEventListener('click', function () {
        Event.fire('add-tab-click', randomId());
      });
      tabBar = createBar();
      var tabBarWraper = createTabBarWraper();
      tabBarWraper.append(tabBar);
      tabBarWraper.appendChild(leftBtn);
      tabBarWraper.appendChild(addBtn);
      tabBarId = tabBar.id;
      rightBtn = createButton('right-nav-button', '&gt;', 'right'); // rightBtn = rightBtn;

      tabBarWraper.appendChild(rightBtn);
      rightBtn.addEventListener('click', function () {
        scroll(true);
      }); // tabBarWraper.appendChild(rightBtn);
      var pagePanel = createPagePanel();
      pagePanelId = pagePanel.id; // let tabbar= doc.querySelector('div');

      var doc = createTable(tabBar.parentElement, pagePanel, themeOptions);
      var container = typeof el === 'object' ? el : document.getElementById(el);
      containerId = container.id;
      container.append(doc);
      setTheme(themeOptions.theme);
      attachDomEventListeners();

      if (themeOptions.tabs) {
        dynamicLoad(themeOptions.tabs);
      }

      toggleNavigator(getLeftNavButton(), false);
      toggleNavigator(getRightNavButton(), false);
    }

    function getTabAtIndex(index) {
      var tab = null;
      var i = 0;

      for (var _iterator = _createForOfIteratorHelperLoose(tabs.values()), _step; !(_step = _iterator()).done;) {
        var value = _step.value;

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
      var last = getTabAtIndex(tabs.size - 1).linkButton;
      var visibles = getVisibleTabs();
      var firstVisible = visibles[0];
      if (!firstVisible.previousSibling) return; // let lastVisible=visibles[visibles.length-1];

      var lastHidden = firstVisible.previousSibling || firstVisible;

      var _lastHidden$getBoundi = lastHidden.getBoundingClientRect(),
          width = _lastHidden$getBoundi.width;

      var gap = tabBar.getBoundingClientRect().right - last.getBoundingClientRect().right;

      if (width < gap) {
        scrollLinkIntoView(lastHidden);
      }
    }

    function attachDomEventListeners() {
      // let self = this
      var tabBar = getTabBar();
      window.addEventListener('resize', function () {
        debounce(function () {
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
      tabBar.addEventListener('keyup', function (event) {
        handleKeypress(event);
      }, true);
      tabBar.addEventListener('drop', function (event) {
        event.preventDefault();
        dragStopPoint = event.clientX;
        drop(event);
      }, true);
      tabBar.addEventListener('dragover', function (event) {
        event.preventDefault();
      }, true);
      tabBar.addEventListener('dragstart', function (event) {
        dragStartPoint = event.clientX;
        drag(event);
      });
    }

    function handleKeypress(e) {
      var code = e.keyCode;
      var link = selectedTab.button; // eslint-disable-next-line default-case

      if (!link) return;

      switch (code) {
        case 37:
          if (link.previousSibling) {
            select(link.previousSibling);
          }

          break;
        // left key

        case 39:
          if (link.nextSibling) {
            select(link.nextSibling);
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
    }

    function showHideNavButton() {
      // console.log(settings);
      if (themeOptions.infiniteScroll) {
        return;
      }

      var visibleButtons = getVisibleTabs();
      var firstVisibleButton = visibleButtons[0];
      var lastVisibleButton = visibleButtons[visibleButtons.length - 1];
      if (!firstVisibleButton) return;
      var rBtn = getRightNavButton();
      var lBtn = getLeftNavButton();

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
        el.style.visibility = 'visible';
      } else {
        el.style.visibility = 'hidden';
      }
    }

    function showHideNavigator() {
      var visibleButtons = getVisibleTabs();
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
      var table = getContainer().querySelector('table');
      table.style.background = options.bg;
      table.style.color = options.color;
      leftBtn.style.color = rightBtn.style.color = addBtn.style.color = options.color;
    } // Public API

    /** *
     * @param theme String
     * @returns null
     */


    function setTheme(theme) {
      var color = '#ddd';
      var bg = '#222';
      var activecolor = '#ddd';
      var activeBg = '#003355';

      switch (theme) {
        case 'dark':
          bg = '#002255';
          activeBg = '#003355';
          color = '#fff';
          break;

        case 'black':
          bg = '#111';
          activeBg = '#333';
          color = '#fff';
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
        bg: bg,
        color: color,
        activecolor: activecolor,
        activeBg: activeBg
      };
      applyTheme(tabSettings);
    }

    function getTheme() {
      return themeOptions.theme;
    }

    function toggleNavigator(el, show) {
      if (show) {
        el.style.visibility = 'visible';
      } else {
        el.style.visibility = 'hidden';
      }
    }

    function getSelectedTab() {
      return selectedTab;
    }

    function applySettings(options) {
      var mySettings = {
        limit: undefined,
        banner: undefined,
        footer: undefined,
        closeOnClick: undefined,
        infiniteScroll: false,
        fancy: false,
        add: false,
        // width   : '100%',
        // height  : '100%',
        theme: '',
        tabHeight: 32,
        leftTooltip: '&lt;',
        rightTooltip: '&gt;',
        addTooltip: '+',
        data: null
      };
      themeOptions = Object.assign(mySettings, options);
    }

    function dynamicLoad(tabs) {
      if (!tabs) return;
      var selected = null;
      tabs.forEach(function (d) {
        if (d.selected) {
          selected = d.id;
        }

        var tab = add(d);
        var page = getPage(tab.id); // page.parentElement.style.top='80px';
        // page.background='#054';

        page.innerHTML = typeof d.html === 'function' ? d.html() : d.html;
        page.setAttribute('contenteditable', true);
        page.style.overflow = 'auto';
        page.style.zIndex = '100';
      });

      if (selected) {
        select(selected);
      }
    }

    function getPage(tabId) {
      var tab = tabs.get(tabId);
      return document.getElementById(tab.pageId);
    }

    function getLinkButton(linkId) {
      return document.getElementById(linkId);
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

    function getTabBar() {
      return document.getElementById(tabBarId);
    }

    function getContainer() {
      return document.getElementById(containerId);
    }

    function getLinkTarget(el) {
      try {
        while (el.name !== 'tab-link') {
          el = el.parentElement;
        }

        return el;
      } catch (e) {
        // const length = tabs.size - 1
        return getTabAtIndex(tabs.size - 1).linkButton; // Object.values(tabs)[length].linkButton
      }
    }

    function drag(ev) {
      ev.dataTransfer.setData('text', ev.target.id);
    }

    function drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData('text'); // do not drop on label wrappers or close button

      var target = getLinkTarget(ev.target);
      var dataEl = document.getElementById(data);

      if (dragStartPoint > dragStopPoint) {
        target.before(dataEl);
      } else {
        target.after(dataEl);
      } // target.parentNode.insertBefore(dataEl,dragStartPoint>dragStopPoint?target:target.nextSibling);

    }

    function add(options) {
      if (options === void 0) {
        options = {};
      }

      var _Object$keys = Object.keys(buttons),
          length = _Object$keys.length;

      var tabId = options.tabId || randomId();
      var buttonId = "tab-btn-" + tabId;
      var target = "tab-page-" + tabId;
      var tabLabel = options.label || "Tab" + Number(length + 1);
      var title = options.title || tabLabel;
      var settings = {
        buttonId: buttonId,
        target: target,
        label: tabLabel,
        title: title,
        html: options.html || '',
        closable: options.close || true,
        data: options.data || null,
        icon: options.icon || '',
        bg: options.bg || 'inherit',
        color: options.color || 'inherit',
        fancy: themeOptions.fancy
      }; // options.bg = options.bg === "transparent" ? "" : options.bg;
      // if (options.buttonId === null) {
      // delete options.buttonId;
      // }

      var tabSettings = Object.assign(settings, options);
      var page = createPage(tabSettings.target, tabId, buttonId, tabSettings);
      getTabPagePanel().appendChild(page);
      var tabBtn = createTabButton(buttonId, tabId, tabSettings);
      var labelContainer = createLabelContainer();
      var img = createImage(tabSettings);
      var label = createLabel(tabSettings.label, tabSettings.title);
      var closeBtn = createCloseButton(tabId);

      if (!tabSettings.closable) {
        closeBtn.style.display = 'none';
        labelContainer.style.paddingRight = '7px';
      }

      labelContainer.append(img);
      labelContainer.append(label);
      labelContainer.append(closeBtn);
      tabBtn.append(labelContainer);
      tabBtn.addEventListener('mouseenter', function () {
        if (selectedTab.linkButton.id === tabBtn.id) return;
        closeBtn.style.visibility = 'visible';
      });
      tabBtn.addEventListener('mouseleave', function () {
        if (selectedTab.linkButton.id === tabBtn.id) return;
        closeBtn.style.visibility = 'hidden';
      });
      buttons[tabBtn.id] = tabBtn; // If there was a selected button already, insert after it
      // otherwise append at the end of tab list

      if (selectedTab = getSelectedTab()) {
        // tab.selected=false;
        selectedTab.linkButton.after(tabBtn); // getLinkButton(tab.linkId).after(linkButton);
      } else {
        getTabBar().appendChild(tabBtn);
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
        linkButton: tabBtn,
        page: page
      });
      selectedTab = tabs.get(tabId);
      showHideNavButton();
      select(tabBtn);

      if (tabSettings.selected) {
        return selectedTab;
      }

      return selectedTab;
    }

    function select(ref, before) {
      var linkButton = null;
      console.log(typeof ref);
      console.log(ref instanceof HTMLElement);

      if (!ref) {
        throw new Error('Invalid tab address:');
      } else if (typeof ref === 'string') {
        var _id = ref;
        linkButton = getLinkButton(_id);
      } else if (ref.id) {
        var _el = ref;
        linkButton = _el;
      } else {
        throw new Error('Invalid Button or ID');
      }

      if (typeof before === 'function') {
        var result = before();
        if (result === false) return false;
      }

      for (var _iterator2 = _createForOfIteratorHelperLoose(tabs.values()), _step2; !(_step2 = _iterator2()).done;) {
        var tab = _step2.value;

        if (tab.linkButton.id === linkButton.id) {
          tab.selected = true;
          selectedTab = tab;
          document.getElementById(tab.pageId).style.visibility = 'visible';
          tab.linkButton.lastChild.lastChild.style.visibility = 'visible'; // console.log(tab.linkButton.lastChild.lastChild);
        } else {
          tab.selected = false;
          document.getElementById(tab.pageId).style.visibility = 'hidden';
          tab.linkButton.lastChild.lastChild.style.visibility = 'hidden';
        }
      }

      applySelection(linkButton, tabSettings);

      if (!isLinkVisible(linkButton)) {
        scrollLinkIntoView(linkButton);
      }

      Event.fire('select', selectedTab);
      return selectedTab;
    }

    function close(el) {
      var tabId = el;

      if (!el) {
        throw new Error('Invalid tab address:');
      } else if (typeof id === 'string') ; else if (el.id) {
        tabId = el.id; // .substr(5);//button Element
      }

      var tab = tabs.get(tabId); // console.log(el, tab, tabs);

      if (!tab) return;
      var link = tab.linkButton; // getLinkButton(tab.linkId);

      var next = link.nextSibling;
      var prev = link.previousSibling;
      Event.fire('before_close', tab);
      link.remove();
      document.getElementById(tab.pageId).remove();
      selectedTab = null; // delete selectedTab;

      tabs["delete"](tabId);
      Event.fire('close', tab);

      if (next && next.tagName === 'BUTTON') {
        select(next);
      } else if (prev && prev.tagName === 'BUTTON') {
        select(prev);
      }

      showHideNavigator();
      scroll(true);
      return tabId;
    }

    function isLinkVisible(link) {
      var box = link.getBoundingClientRect();
      var tabbar = getTabBar();
      if (!tabbar) return false;
      var box1 = tabbar.getBoundingClientRect();
      return box.left >= box1.left && box.right <= box1.right;
    }

    function getVisibleTabs() {
      var tabbar = getTabBar();
      if (!tabbar) return false;
      var links = Array.prototype.slice.call(tabbar.querySelectorAll('button'));
      return links.filter(function (link) {
        return isLinkVisible(link);
      });
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
      var max = tabs.size;
      var count = 0;

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
      var visibleButtons = getVisibleTabs();
      var firstVisibleButton = visibleButtons[0];
      var lastVisibleButton = visibleButtons[visibleButtons.length - 1];

      if (right && lastVisibleButton && lastVisibleButton.nextSibling) {
        firstVisibleButton.style.display = 'none';
      } else if (!right && firstVisibleButton && firstVisibleButton.previousSibling) {
        firstVisibleButton.previousSibling.style.display = '';
      } else {
        var tabbar = getTabBar();
        if (!tabbar) return;
        var bts = tabbar.querySelectorAll('button');

        if (bts.length > 0) {
          bts[bts.length - 1].style.display = '';
        }
      }
    }

    function infiniteScroll(right) {
      var tabbar = getTabBar();
      if (!tabbar) return;
      var links = tabbar.querySelectorAll('button');

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
      init: init,
      add: add,
      close: close,
      setTheme: setTheme,
      getTheme: getTheme,
      destroy: destroy
    };
  };

  return {
    createTabs: createTabs,
    randomId: randomId,
    Emitter: Emitter,
    Event: Event,
    debounce: debounce
  };
}();

export { TabView as default };
//# sourceMappingURL=tabview.modern.js.map
