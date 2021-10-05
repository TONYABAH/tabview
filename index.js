const TabView = (function () {
    const randomId = () => {
        return Math.random().toString(36).slice(2);
    };
    const THEMES = {
        blue: {
            contrastColor: 'blue',
            tabBg: 'rgb(8, 118, 185)',
            tabColor: '#eee',
            tabBorderColor: '#2E4053',
            tabButtonBg: 'rgb(8, 118, 185)',
            hoverBg: 'rgb(8, 181, 250)',
            hoverColor: '#efefef',
            activeBg: 'rgb(8, 100, 190)',
            activeColor: '#fff',
            pageBg: '',
            pageColor: '',
            headerBg: 'rgb(8, 118, 185)',
            headerColor: '#eee',
            footerBg: 'rgb(8, 118, 185)',
            footerColor: '#eee',
            footerBorderColor: '#2E4055',
            iconColor: 'red',
        },
        green: {
            contrastColor: 'green',
            tabBg: '#1D8348',
            tabColor: '#eee',
            tabBorderColor: '#104032',
            tabButtonBg: '#1D8348',
            hoverBg: '#2ECC71',
            hoverColor: '#efefef',
            activeBg: '#145A32',
            activeColor: '#fff',
            pageBg: '',
            pageColor: '',
            headerBg: '#1D8348',
            headerColor: '#eee',
            footerBg: '#1D8348',
            footerColor: '#eee',
            footerBorderColor: '#104032',
            iconColor: 'red',
        },
        red: {
            contrastColor: '#CD4435',
            tabBg: '#BA4335',
            tabColor: '#eee',
            tabBorderColor: '#5A3400',
            tabButtonBg: '#BA4335',
            hoverBg: '#CD4435',
            hoverColor: '#efefef',
            activeBg: '#CD0935',
            activeColor: '#fff',
            pageBg: null,
            pageColor: null,
            headerBg: '#BA4335',
            headerColor: '#eee',
            footerBg: '#BA4335',
            footerColor: '#eee',
            footerBorderColor: '#5A3400',
            iconColor: '#00ff00',
        },
        orange: {
            contrastColor: 'orange',
            tabBg: '#D68910',
            tabColor: '#eee',
            tabBorderColor: '#784212',
            tabButtonBg: '#D68910',
            hoverBg: '#FC7633',
            hoverColor: '#efefef',
            activeBg: '#FF8910',
            activeColor: '#fff',
            pageBg: '',
            pageColor: '',
            headerBg: '#D68910',
            headerColor: '#eee',
            footerBg: '#D68910',
            footerColor: '#eee',
            footerBorderColor: '#784212',
            iconColor: '#00ff00',
        },
        grey: {
            contrastColor: '#efefef',
            tabBg: '#D0D3D4',
            tabColor: '#333',
            tabBorderColor: '#333',
            tabButtonBg: '#ECF0F1',
            hoverBg: '#FFFFFF',
            hoverColor: '#111',
            activeBg: '#D0D3D4',
            activeColor: '#222',
            pageBg: '',
            pageColor: '',
            headerBg: '#D0D3D4',
            headerColor: '#333',
            footerBg: '#D0D3D4',
            footerColor: '#333',
            footerBorderColor: '#222222',
            iconColor: '#00ff00',
        },
        dark: {
            contrastColor: '',
            tabBg: '#34495E',
            tabColor: '#eee',
            tabBorderColor: '#233011',
            tabButtonBg: '#474747',
            hoverBg: '#2C3E50',
            hoverColor: '#fff',
            activeBg: '#566573 ',
            activeColor: '#eee',
            pageBg: '',
            pageColor: '',
            headerBg: '#34495E ',
            headerColor: '#eee',
            footerBg: '#34495E ',
            footerColor: '#eee',
            footerBorderColor: '#233011',
            iconColor: '#00ff00',
        },
        black: {
            contrastColor: '',
            tabBg: '#1C2833',
            tabColor: '#eee',
            tabBorderColor: '#233011',
            tabButtonBg: '#2C3E50',
            hoverBg: '#5D6D7E ',
            hoverColor: '#fff',
            activeBg: '#1C2833',
            activeColor: '#eee',
            pageBg: '',
            pageColor: '',
            headerBg: '#1C2833',
            headerColor: '#eee',
            footerBg: '#1C2833',
            footerColor: '#eee',
            footerBorderColor: '#233011',
            iconColor: '#00ff00',
        },
        light: {
            contrastColor: '',
            tabBg: 'lavender',
            tabColor: '#111',
            tabBorderColor: '#233011',
            tabButtonBg: 'lavender',
            hoverBg: '#AED6F1',
            hoverColor: '#000',
            activeBg: '#AED6F1',
            activeColor: '#000',
            pageBg: '',
            pageColor: '',
            headerBg: 'lavender',
            headerColor: '#111',
            footerBg: 'lavender',
            footerColor: '#111',
            footerBorderColor: '#233011',
            iconColor: 'green',
        },
        purple: {
            contrastColor: '',
            tabBg: '#9B59B6',
            tabColor: '#fff',
            tabBorderColor: '#443974',
            tabButtonBg: '#8E44AD',
            hoverBg: '#A569BD',
            hoverColor: '#fff',
            activeBg: '#633974',
            activeColor: '#eee',
            pageBg: '',
            pageColor: '',
            headerBg: '#9B59B6',
            headerColor: '#fff',
            footerBg: '#9B59B6',
            footerColor: '#fff',
            footerBorderColor: '#443974',
            iconColor: '#00ff00',
        },
    };
    const LAYOUT_SETTINGS = {
        header: false,
        footer: true,
        alginTab: 'top',
        minTabHeight: 'auto',
        maxTabWidth: 225,
        minTabWidth: 'auto',
        tabWidth: 125,
        tabHeight: 52,
        footerHeight: 22,
        headerHeight: 24,
    };
    const THEME_SETTINGS = {
        contrastColor: '#efefef',
        tabBg: '#efefef',
        tabColor: '#333',
        tabBorderColor: '#ababab',
        tabButtonBg: '#cdcdcd',
        hoverBg: '#ffffff',
        hoverColor: '#000000',
        activeBg: '#777777',
        activeColor: '#ffffff',
        pageBg: '#eef',
        pageColor: '#333',
        headerBg: '#efefef',
        headerColor: '#333',
        footerBg: '#cdcdcd',
        footerBorderColor: '#777777',
        footerColor: '#333',
        iconColor: 'green',
    };
    const removeCSS = (styleId) => {
        document.getElementById(styleId).remove();
    };
    const addCSS = (containerId, options = {}) => {
        Object.assign(LAYOUT_SETTINGS, options);
        if (typeof options.theme === 'string') {
            let theme = THEMES[options.theme];
            Object.assign(THEME_SETTINGS, theme);
        } else if (typeof options.theme === 'object') {
            Object.assign(THEME_SETTINGS, options);
        }
        const s = Object.assign(THEME_SETTINGS, LAYOUT_SETTINGS);

        const footerHeight = s.footer ? s.footerHeight : 0;
        const headerHeight = s.header ? s.headerHeight : 0;

        const css = `
    #${containerId} {
        
    --display-header: ${s.header ? 'flex' : 'none'};
    --display-footer: ${s.footer ? 'flex' : 'none'};
    --min-tab-height: ${s.minTabHeight}px;
    --max-tab-width: ${s.maxTabWidth}px;
    --min-tab-width: ${s.minTabWidth}px;
    --tab-width: ${s.tabWidth}px;
    --tab-height: ${s.tabHeight}px;
    --footer-height: ${footerHeight}px;
    --header-height: ${headerHeight}px;
    --panel-top: ${headerHeight + s.tabHeight + 1}px;
    --panel-bottom: var(--footer-height);

    --tab-bar-bg: ${s.tabBg};
    --tab-bar-contrast-bg: ${s.contrastColor};
    --tab-color: ${s.tabColor};
    --tab-border-color: ${s.tabBorderColor};
    --tab-color: ${s.tabColor};
    --tab-border-color:  ${s.tabBorderColor};
    --tab-button-bg: ${s.tabButtonBg};
    --hover-bg: ${s.hoverBg};
    --hover-color: ${s.hoverColor};
    --active-bg: ${s.activeBg};
    --active-color: ${s.activeColor};
    --header-bg: ${s.headerBg};
    --header-color: ${s.headerColor};
    --footer-bg: ${s.footerBg};
    --footer-color: ${s.footerColor};
    --footer-border-color: ${s.footerBorderColor};
    --page-bg: ${s.pageBg};
    --page-color: ${s.pageColor},
    --icon-color: ${s.iconColor},
}

/**Layout CSS **/
#${containerId} {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    color: ';
    background: '';
    overflow: hidden;
}
#${containerId} .tab-panel {
    position: absolute;
    display: block;
    top: var(--panel-top);
    bottom: var(--footer-height);
    right: 0;
    left: 0;
    z-index: 10;
    background: #333;
}
#${containerId} .tab-panel .tab-page {
    position: absolute;
    display: none;
    top: 5px;
    bottom: 1px;
    right: 0px;
    left: 0px;
}
#${containerId} .tab-header {
    position: absolute;
    right: 0;
    left: 0;
    height: calc(var(--header-height) - 1px );
    padding-left: 14px;
    display: var(--display-header);
    border-bottom: 1px solid var(--tab-border-color);
}

#${containerId} .tab-footer {
    position: absolute;
    height: var(--footer-height);
    right: 0;
    bottom: 0;
    left: 0;
    border-top: 1px solid var(--footer-border-color);
    display: var(--display-footer);
    z-index: 10;
}

#${containerId} .tab-bar {
    position: absolute;
    top: var(--header-height);
    height: var(--tab-height);
    min-height: var(--min-tab-height);
    max-width: 100%;
    left: 0px;
    right: 0px;
    /*box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.15);*/
    border-bottom: 1px solid var(--tab-border-color);
    overflow: auto;
    display: flex;
    white-space: nowrap;
    z-index: 1;
}
#${containerId} .tabs {
    position: absolute;
    left: 24px;
    right: 24px;
    height: 100%;
    overflow: hidden;
    display: flex;
    white-space: nowrap;
    background: var(--tab-bar-contrast-bg);
}
#${containerId} .tabs > button {
    position: relative;
    display: block;
    min-height: 100%;
    max-width: var(--max-tab-width);
    min-width: var(--min-tab-width);
    width: auto;
    padding-left: 20px;
    padding-right: 24px;
    background: inherit;
    border: none;
    cursor: pointer;
    align-items: center;
    margin: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: .4s;
    border-right: 1px inset;
    /*box-shadow: 1px 1px 2px 0 #eee;*/
}

#${containerId} .tabs > button:hover {
    transform: all 0.2s;
}
#${containerId} .tabs > button.active {
    transform: all 0.2s;
}
#${containerId} .tabs > button > .close-button {
    position: absolute;
    width: auto;
    height: 100%;
    right:0px;
    top: 0;
    padding-right: 4px;
    margin-right: 0px;
    display: flex;
    align-items: center;
    background: inherit;
}
#${containerId} .tabs > button > .close-button::after {
    content: '✖';
    border-radius: 50%;
    line-height: 12px;
    padding: 2px;
    display: none;
}
#${containerId} .tabs > button.active .close-button::after {
    display: block;
}
#${containerId} .tabs > button:hover .close-button::after {
    display: block;
}
#${containerId} .tab-icon {
    margin-top: -3px;
    float:left;
    color: var(--icon-color);
}
#${containerId} .tabs > button > .close-button:hover::after {
    color: red;
    background: #eee;
}
#${containerId} .tabs > button > .tab-label {
    display: flex;
    left: 22px;
    right: 24px;
    height: 100%;
    min-width: 45%;
    margin-top: 50%;
    transform: translateY(-50%);
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-shadow: transparent;
    text-overflow: ellipsis;
    align-items: center;
    background-color: green;
    font-size: 11px;
    letter-spacing: 1px;
}

#${containerId} .left-nav-button,
#${containerId} .right-nav-button {
    position: absolute;
    width: 24px;
    min-width: 24px;
    max-width: 24px;
    top: 0;
    bottom: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    /*text-shadow: 1px 1px #333;*/
    text-align: center;
    z-index: 0;
}
#${containerId} .right-nav-button {
    right: 0;
    padding-left: 4px;
}
#${containerId} .left-nav-button::after {
    content: '';
    min-width: 0;
    max-width: 0;
    width: 0;
    height: 0;
    min-height: 0;
    max-height: 0;
    height: 0;
    border-right: 8px solid var(--tab-color);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}
#${containerId} .right-nav-button::after {
    content: '';
    min-width: 0;
    max-width: 0;
    width: 0;
    height: 0;
    min-height: 0;
    max-height: 0;
    border-left: 8px solid var(--tab-color);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}
#${containerId} .left-nav-button:hover {
    color: cadetblue;
}
#${containerId} .right-nav-button:hover {
    color: cadetblue;
}

/** Side tabs (Left or Right) CSS */

#${containerId}.tab-align-left .tab-header,
#${containerId}.tab-align-right .tab-header {
    border-bottom: 1px solid;
}
#${containerId}.tab-align-right .tab-bar,
#${containerId}.tab-align-left .tab-bar {
    position: absolute;
    display: block;
    min-width: 125px;
    max-width: 125px;
    top: calc(var(--header-height) + 0px);
    bottom: var(--footer-height);
    overflow: hidden;
    text-align: center;
    z-index: 1;
}
#${containerId}.tab-align-right .tab-bar .tabs,
#${containerId}.tab-align-left .tab-bar .tabs {
    position: absolute;
    display: block;
    height: auto;
    left: 1px;
    right: 1px;
    top: 32px;
    bottom: 32px;
}
#${containerId}.tab-align-right .left-nav-button,
#${containerId}.tab-align-right .right-nav-button,
#${containerId}.tab-align-left .left-nav-button,
#${containerId}.tab-align-left .right-nav-button {
    position: relative;
    display: block;
    min-width: 125px;
    max-height: 32px;
    float: none;
    height: var(--tab-height);
    justify-content: center;
    align-items: center;
}
#${containerId}.tab-align-right .tab-bar button,
#${containerId}.tab-align-left .tab-bar button {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: var(--tab-width);
    min-height: auto; 
    max-height: var(--tab-height);
    height: var(--tab-height);
    margin-right: 2px;
    cursor: pointer;
    border-right: 0 none transparent;
    /* margin-top: calc(var(--tab-width) / 2 + 10px);
       transform: rotateZ(-90deg) translateX(24px);
       box-shadow: 1px 1px 2px 0px #ccc;
    */
}

#${containerId}.tab-align-right .right-nav-button,
#${containerId}.tab-align-left .right-nav-button {
    position: absolute;
    display: flex;
    bottom: 0;
    top: auto;
    justify-content: center;
    align-items: center;
    z-index: 1;
    border: 1px none;
}
#${containerId}.tab-align-right .left-nav-button,
#${containerId}.tab-align-left .left-nav-button {
    position: sticky;
    top: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    border: 1px none;
}
#${containerId}.tab-align-right .left-nav-button::after,
#${containerId}.tab-align-left .left-nav-button::after {
    transform: rotateZ(90deg);
}
#${containerId}.tab-align-right .right-nav-button::after,
#${containerId}.tab-align-left .right-nav-button::after {
    transform: rotateZ(90deg);
}
#${containerId}.tab-align-right > .tab-panel,
#${containerId}.tab-align-left > .tab-panel {
    top: var(--header-height);
    z-index: auto;
}

/** Right tabs CSS */

#${containerId}.tab-align-right .tab-bar {
    right: 0;
    left: auto;
    height: auto;
    border-right: 0;
}
#${containerId}.tab-align-right > .tab-panel {
    right: 125px;
    left: 0;
}
#${containerId}.tab-align-right .tab-header {
    margin-right: 0;
    margin-left: 0;
    z-index: 1;
}
#${containerId}.tab-align-right .tab-footer {
    right: 0;
    z-index: 1;
}
#${containerId}.tab-align-right .tabs > button.active {
    border-radius: 0px 0px 0px 0;
    right: 0px;
}

/** Left tabs CSS */

#${containerId}.tab-align-left .tab-bar {
    left: 0;
    right: auto;
    height: auto;
   border-left: 0;
}

#${containerId}.tab-align-left > .tab-panel {
    left: var(--tab-width);
    right: 0;
}
#${containerId}.tab-align-left .tab-header {
    margin-left: 0;
    margin-right: 0;
}
#${containerId}.tab-align-left .tab-footer {
    left: 0;
}
#${containerId}.tab-align-left .tabs > button.active {
    border-radius: 0px 0 0 0px;
    left: 0px;
}

/** Bottom tabs CSS */

#${containerId}.tab-align-bottom .tab-bar {
    position: absolute;
    bottom: var(--footer-height);
    top: auto;
}
#${containerId}.tab-align-bottom .tab-bar .tabs > button.active {
    border-radius: 0px 0px 5px 5px;
    right: 1px;
}
#${containerId}.tab-align-bottom > .tab-panel {
    bottom: var(--panel-bottom);
    top: var(--header-height);
}

/**Theme CSS */

#${containerId} {
    background-color: '';
}

#${containerId} .tab-bar {
    background-color: var(--tab-bar-bg);
    color: var(--tab-color);
}
#${containerId} .tab-bar button {
    background-color: var(--tab-button-bg);
    color: var(--tab-color);
    border-right: 1px solid var(--tab-border-color);
}
#${containerId} .tab-bar button:hover {
    background-color: var(--hover-bg);
    color: var(--hover-color);
}
#${containerId} .tab-bar button.active {
    background-color: var(--active-bg);
    color: var(--active-color);
}
#${containerId} .left-nav-button,
#${containerId} .right-nav-button {
    background-color: var(--tab-bar-bg);
}
#${containerId} .tab-panel {
    border: none;
    background: var(--page-bg);
    color: var(--page-color);
    box-shadow: 1px 1px 1px 1px transparent;
}
#${containerId} .tab-panel .tab-page {
    padding: 8px;
}
#${containerId} .tab-footer{
    background-color: var(--footer-bg);
    color: var(--footer-color);
    padding-left: 14px;
   
}
#${containerId} .tab-header {
    background-color: var(--header-bg);
    color: var(--header-color);
    padding-left: 14px;
}
        `;
        let styles = document.createElement('style');
        styles.id = options.stylesId || 'tabviewStyles';
        styles.append(document.createTextNode(css));
        document.head.appendChild(styles);
        return styles.id;
    };

    const Emitter = () => {
        return {
            fire(event, data, context, cancelable, bubbles) {
                const cntx = context || document;
                const myEvent = new CustomEvent(event, {
                    detail: data,
                    cancelable: cancelable || true,
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
    };
    const dnd = {
        allowDrop: (ev) => {
            ev.preventDefault();
        },

        drag: (ev) => {
            ev.dataTransfer.setData('text/plain', ev.target.id);
        },
        drop: (ev) => {
            ev.preventDefault();

            const data = ev.dataTransfer.getData('text');
            // do not drop on label wrappers or close button
            let role = ev.target.getAttribute('role');
            var target =
                role === 'tab-button' ? ev.target : ev.target.parentNode; // getLinkTarget(ev.target);

            const dataEl = document.getElementById(data);
            const dragStartPoint = dataEl.getBoundingClientRect();
            const dragStopPoint = target.getBoundingClientRect();
            if (
                dragStartPoint.x > dragStopPoint.x ||
                dragStartPoint.y > dragStopPoint.y
            ) {
                target.before(dataEl);
            } else {
                target.after(dataEl);
            }
            // handleDrop(newIndex, oldIndex);
            //tabList.insertBefore(document.getElementById(data), node.nextSibling);
        },
    };
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    const debounce = (func, wait, immediate) => {
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
    };

    const isVisible = (elem) => {
        if (!(elem instanceof Element))
            throw Error('DomUtil: elem is not an element.');
        const style = getComputedStyle(elem);
        if (style.display === 'none') return false;
        if (style.visibility !== 'visible') return false;
        if (style.opacity < 0.1) return false;
        if (
            elem.offsetWidth +
                elem.offsetHeight +
                elem.getBoundingClientRect().height +
                elem.getBoundingClientRect().width ===
            0
        ) {
            return false;
        }
        const elemCenter = {
            x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
            y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
        };
        if (elemCenter.x < 0) return false;
        if (
            elemCenter.x >
            (document.documentElement.clientWidth || window.innerWidth)
        )
            return false;
        if (elemCenter.y < 0) return false;
        if (
            elemCenter.y >
            (document.documentElement.clientHeight || window.innerHeight)
        )
            return false;
        let pointContainer = document.elementFromPoint(
            elemCenter.x,
            elemCenter.y
        );
        do {
            if (pointContainer === elem) return true;
        } while (
            pointContainer &&
            (pointContainer = pointContainer.parentNode)
        );
        return false;
    };

    const scrollToView = debounce((tabBar, x = 0, y = 0) => {
        tabBar.scroll({
            top: y,
            left: x,
            behavior: 'smooth',
        });
    }, 200);

    function getVisibleTabs(tabBar) {
        const children = tabBar.children;
        const visibleTabs = [];
        // const invisibleTabs = [];
        for (let child of children) {
            if (isVisible(child)) {
                visibleTabs.push(child);
            } else {
                // invisibleTabs.push(child);
            }
        }
        return visibleTabs;
    }
    function getInVisibleTabs(tabBar) {
        const children = tabBar.children;
        // const visibleTabs = [];
        const invisibleTabs = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (isVisible(child)) {
                // visibleTabs.push(child);
                break;
            } else {
                invisibleTabs.push(child);
            }
        }
        return invisibleTabs;
    }

    function createLabel(text) {
        const label = document.createElement('span');
        label.append(document.createTextNode(text));
        label.classList.add('tab-label');
        label.style.cursor = 'pointer';
        return label;
    }
    function createCloseButton() {
        let btn = document.createElement('label');
        btn.setAttribute('role', 'close-button');
        btn.classList.add('close-button');
        // btn.style.position = 'absolute';
        // btn.style.right = '4px';
        // btn.style.top = '50%';
        // btn.style.transform = 'translateY(-50%)';
        // btn.textContent = 'X';
        return btn;
    }
    function createIcon(icon, iconColor) {
        let btn = document.createElement('label');
        btn.setAttribute('role', 'tab-icon');
        btn.classList.add('tab-icon');
        btn.style.position = 'absolute';
        btn.style.left = '4px';
        // btn.style.top = '50%';
        btn.style.color = iconColor || '';
        // btn.style.transform = 'translateY(-50%)';
        btn.textContent = icon || '❖';
        return btn;
    }

    function createPage(pageId, content) {
        let page = document.createElement('div');
        page.classList.add('tab-page');
        page.setAttribute('id', pageId);
        // page.textContent = text;
        page.append(content || '');
        return page;
    }
    function createTabs(
        containerId,
        options = {
            footer: true,
            header: false,
            headerHeight: 32,
            footerHeight: 25,
            align: '',
            iconColor: 'orange',
            infiniteScroll: true,
        }
    ) {
        let accumulator = 0;
        const tabs = [];
        const events = Emitter();
        let tabAlignSide =
            options.align === 'left' || options.align === 'right'
                ? true
                : false;
        let infiniteScroll = options.infiniteScroll || false;
        let activeTab = null;
        let tabBar = null; // container.querySelector('.tabs');
        let tabPanel = null;
        // let tabs = tabBar.querySelector('.tabs');
        let container = document.getElementById(containerId);
        let original = container.outerHTML;
        if (container.classList.contains('infinit-scroll')) {
            infiniteScroll = true;
        }
        if (
            container.classList.contains('tab-align-right') ||
            container.classList.contains('tab-align-left')
        ) {
            tabAlignSide = true;
        }
        options.stylesId = 'tab_css_' + containerId;
        container.classList.add('tab-align-' + options.align);
        let stylesId = addCSS(containerId, options);

        function handleKeypress(e) {
            const code = e.keyCode;
            const link = activeTab.linkButton;
            // eslint-disable-next-line default-case
            if (!link) return;
            switch (code) {
                case 37: // left key
                case 38: // up key
                    scrollRight(e);
                    break;
                case 39: // right key
                case 40: // down key
                    scrollLeft(e);
                    break;
                case 13: // enter key
                    break;
                default:
                    break;
            }
        }
        function createButton(tabId, options) {
            let id = tabId || randomId();
            var { text, title, closable, icon, iconcolor } = options;
            title = title || text;
            // let closable = tab.closable;
            icon = icon || '❖';
            let btn = document.createElement('button');
            btn.setAttribute('id', id);
            btn.setAttribute('data-target', 'page-' + id);
            btn.setAttribute('data-tab', id);
            btn.setAttribute('draggable', true);
            btn.setAttribute('title', title || text);
            btn.setAttribute('role', 'tab-button');
            // const label = createLabel(text);
            // btn.appendChild(label);
            btn.appendChild(document.createTextNode(text));
            const tabIcon = createIcon(icon, iconcolor);
            btn.appendChild(tabIcon);

            if (closable) {
                const closeBtn = createCloseButton();
                closeBtn.addEventListener(
                    'click',
                    (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        let tabButton = event.target.parentNode;
                        closeTab(tabButton.getAttribute('data-tab'));
                    },
                    true
                );
                btn.appendChild(closeBtn);
            }

            btn.addEventListener(
                'click',
                (e) => selectTab(btn.getAttribute('data-tab')),
                true
            );
            if (container.classList.contains('draggable')) {
                btn.addEventListener('drop', dnd.drop, true);
                btn.addEventListener('dragover', dnd.allowDrop, true);
                btn.addEventListener('dragstart', dnd.drag);
            }
            return btn;
        }
        function addTab(tabId, options = { attributes: [], iconColor: 'red' }) {
            const btn = createButton(tabId, options);
            const pageId = btn.getAttribute('data-target');
            const vpage = createPage(pageId, options.content);
            // tab.attributes.forEach((a) => btn.setAttribute(a[0], a[1]));
            // delete options.attributes;
            let tab = Object.create(null);
            tab.id = tabId || randomId();
            tab.linkButton = btn;
            tab.tabPage = vpage;
            tab.options = options;
            tabs.push(tab);
            tabPanel.appendChild(vpage);
            // let selectedTab = tabs.find((t) => t.active === true);
            if (activeTab) {
                activeTab.linkButton.after(btn);
            } else {
                tabBar.appendChild(btn);
            }
            selectTab(tabId);
            return tab;
        }
        function createTab(
            tabId,
            options = { attributes: [], iconColor: 'red' }
        ) {
            const btn = createButton(tabId, options);
            const pageId = btn.getAttribute('data-target');
            const page = document.getElementById(pageId);
            let vpage = createPage(pageId, options.content);
            if (!page) {
                // const panel = document.querySelector('.tab-panel');
                tabPanel.appendChild(vpage);
            } else {
                page.replaceWith(vpage);
            }
            // options.attributes.forEach((a) => btn.setAttribute(a[0], a[1]));

            let tab = Object.create(null);
            tab.id = tabId || randomId();
            tab.linkButton = btn;
            tab.tabPage = vpage;
            delete options.attributes;
            tab.options = options;
            tabs.push(tab);
            // tab.onClick = (fn) => btn.addEventListener('click', fn);
            // delete tab.attributes;
            // selectTab(tab.id);
            return tab;
        }
        const closeTab = debounce(
            (tabId) => {
                // event.preventDefault();
                // event.stopPropagation();
                let tab = tabs.find((t) => t.id === tabId);
                if (!tab) return;
                let tabButton = tab.linkButton;
                let pageId = tabButton.getAttribute('data-target');
                let nextButtonId = null;
                if (tabButton.nextElementSibling) {
                    nextButtonId =
                        tabButton.nextElementSibling.getAttribute('data-tab');
                } else if (tabButton.previousElementSibling) {
                    nextButtonId =
                        tabButton.previousElementSibling.getAttribute(
                            'data-tab'
                        );
                }
                document.getElementById(pageId).remove();
                tabButton.remove();
                selectTab(nextButtonId);
                let index = tabs.findIndex((t) => t.id === tabId);
                tabs.splice(index, 1);
                events.fire('close', tab);
            },
            250,
            true
        );
        const selectTab = debounce(
            (tabId) => {
                // let currentTab = tabs.find((t) => t.active === true);
                // if (currentTab) currentTab.active = false;
                if (activeTab) {
                    activeTab.tabPage.style.display = 'none';
                    activeTab.linkButton.classList.remove('active');
                    activeTab.active = false;
                }
                let tab = tabs.find((t) => t.id === tabId);
                tab.active = true;
                activeTab = tab;
                selectButton(tab.linkButton.id);
                selectPage(tab.tabPage.id);
                events.fire('select', tab);
                // tab.select();
            },
            250,
            true
        );
        function setTextContent(tabId, content) {
            let tab = tabs.find((t) => t.id === tabId);
            let linkButton = tab.linkButton;
            let pageId = linkButton.getAttribute('data-target');
            let page = document.getElementById(pageId);
            page.textContent = content;
        }
        function setHtml(tabId, content) {
            let tab = tabs.find((t) => t.id === tabId);
            let linkButton = tab.linkButton;
            let pageId = linkButton.getAttribute('data-target');
            let page = document.getElementById(pageId);
            page.innerHTML = content;
        }
        function selectPage(pageId) {
            // let pageId = target.getAttribute('data-target');
            let page = document.getElementById(pageId);
            // if (activeTab) activeTab.tabPage.style.display = 'none';
            page.style.display = 'block';
            activeTab.tabPage = page;
        }
        const scroButtonToView = () => {
            if (!activeTab) return;
            let tabButton = activeTab.linkButton;
            if (isVisible(tabButton)) return;

            let visibleTabs = getVisibleTabs(tabBar);
            if (visibleTabs.length > 1) {
                let last = visibleTabs[visibleTabs.length - 1];
                if (last.nextElementSibling) {
                    if (tabAlignSide) {
                        visibleTabs[0].style.marginTop =
                            '-' + visibleTabs[0].clientHeight + 'px';
                    } else {
                        visibleTabs[0].style.marginLeft =
                            '-' + visibleTabs[0].clientWidth + 'px';
                    }
                }
            }
        };
        const scrollToActiveTab = debounce(() => {
            scroButtonToView();
        }, 2);
        function selectButton(id) {
            let el = document.getElementById(id);
            if (!el) return;
            let target =
                el.getAttribute('role') === 'tab-button' ? el : el.parentNode;
            target.classList.add('active');
            activeTab.linkButton = target;

            scroButtonToView();
        }

        const scrollLeft = debounce(() => {
            // e.preventDefault();
            // let offsetX = tabAlignSide ? 0 : getLeftScrollOffset(tabBar);
            // let offsetY = tabAlignSide ? getTopScrollOffset(tabBar) : 0;
            let visibleTabs = getVisibleTabs(tabBar);
            let allTabs = tabBar.children;
            if (visibleTabs.length >= 1) {
                let last = visibleTabs[visibleTabs.length - 1];
                // if (last.nextElementSibling) {
                if (infiniteScroll) {
                    allTabs[allTabs.length - 1].after(allTabs[0]);
                } else {
                    if (!last.nextElementSibling) return;
                    if (tabAlignSide) {
                        visibleTabs[0].style.marginTop =
                            '-' + visibleTabs[0].clientHeight + 'px';
                    } else {
                        visibleTabs[0].style.marginLeft =
                            '-' + visibleTabs[0].clientWidth + 'px';
                    }
                }
            }
            // scrollToView(tabBar, offsetX, offsetY);
        }, 50);
        const scrollRight = debounce((e) => {
            // let offsetX = tabAlignSide ? 0 : getRightScrollOffset(tabBar);
            // let offsetY = tabAlignSide ? getBottomScrollOffset(tabBar) : 0;
            // scrollToView(tabBar, offsetX, offsetY);
            let visibleTabs = getVisibleTabs(tabBar);
            if (visibleTabs.length >= 1) {
                let first = visibleTabs[0];
                // if (first.previousElementSibling) {
                if (infiniteScroll) {
                    first.before(visibleTabs[visibleTabs.length - 1]);
                } else {
                    if (!first.previousElementSibling) return;
                    if (tabAlignSide) {
                        if (first.previousElementSibling)
                            first.previousElementSibling.style.marginTop = 0;
                    } else {
                        if (first.previousElementSibling)
                            first.previousElementSibling.style.marginLeft = 0;
                    }
                }
            }
        }, 50);
        function ensureMarkup() {
            let tabBarWrapper = document.createElement('div');
            let tabHeader = container.querySelector('.tab-header');
            let tabFooter = container.querySelector('.tab-footer');
            tabPanel = container.querySelector('.tab-panel');
            tabBar = container.querySelector('.tabs');
            if (!tabBar) {
                tabBar = document.createElement('div');
                tabBar.className = 'tabs';
            } else {
                tabBarWrapper = document.createElement('div');
            }
            tabBarWrapper.className = 'tab-bar';
            tabBarWrapper.appendChild(tabBar);
            container.append(tabBarWrapper);

            let leftNav = tabBarWrapper.querySelector('.left-nav-button');
            let rightNav = tabBarWrapper.querySelector('.right-nav-button');

            if (!leftNav) {
                leftNav = document.createElement('div');
                leftNav.className = 'left-nav-button';
                tabBarWrapper.prepend(leftNav);
            }
            if (!rightNav) {
                rightNav = document.createElement('div');
                rightNav.className = 'right-nav-button';
                tabBarWrapper.appendChild(rightNav);
            }

            if (!tabHeader) {
                tabHeader = document.createElement('div');
                tabHeader.className = 'tab-header';
                container.prepend(tabHeader);
            }
            if (!tabPanel) {
                tabPanel = document.createElement('div');
                tabPanel.className = 'tab-panel';
                container.appendChild(tabPanel);
            }
            if (!tabFooter) {
                tabFooter = document.createElement('div');
                tabFooter.className = 'tab-footer';
                container.appendChild(tabFooter);
            }
            tabFooter.innerHTML = options.footer || '';
            tabHeader.innerHTML = options.header || '';
        }
        function init() {
            ensureMarkup();
            // let tabBarWrapper = container.querySelector('.tab-bar');
            // let tabs = container.querySelector('.tabs');
            let buttons = tabBar.querySelectorAll('[role=tab-button]');

            for (let i = 0; i < buttons.length; i++) {
                const btn = document.getElementById(buttons[i].id);
                let id = btn.id;
                let text = btn.innerText;
                let closable = btn.getAttribute('closable');
                let icon = btn.getAttribute('icon');
                let attr = btn.getAttributeNames();
                let content = btn.innerHTML;
                const attributes = [];
                const options = {
                    id: id,
                    text: text,
                    closable: closable,
                    icon: icon,
                    content,
                };
                attr.forEach((a) => {
                    attributes.push([a, btn.getAttribute(a)]);
                    let val = btn.getAttribute(a);
                    if (typeof val !== 'function') {
                        options[a] = val;
                    }
                });
                let tab = createTab(id, options);
                btn.replaceWith(tab.linkButton);
                selectTab(tab.id);
            }

            let rightNavBtn = container.querySelector('.right-nav-button');
            rightNavBtn.addEventListener('click', (e) => scrollLeft(e));

            let leftNavBtn = container.querySelector('.left-nav-button');
            leftNavBtn.addEventListener('click', (e) => scrollRight(e));

            tabBar.addEventListener(
                'keyup',
                (event) => {
                    handleKeypress(event);
                },
                true
            );
        }
        function destroy() {
            container.outerHTML = original;
            removeCSS(stylesId);
            events.fire('destroy', null);
        }
        function setHeader(text) {
            container.querySelector('.tab-header').textContent = text;
        }
        function setFooterText(text) {
            container.querySelector('.tab-footer').textContent = text;
        }

        // Event listeners
        const onSelect = (fn) => events.on('select', fn);
        const onClose = (fn) => events.on('close', fn);
        const onOpen = (fn) => events.on('open', fn);
        const onDestroy = (fn) => events.on('destroy', fn);

        window.addEventListener('resize', scrollToActiveTab);

        init();

        return {
            onOpen,
            onSelect,
            onClose,
            onDestroy,
            addTab,
            closeTab,
            selectTab,
            setHtml,
            setTextContent,
            setHeader,
            setFooterText,
            destroy,
        };
    }
    return {
        createTabs,
        debounce,
    };
})();
export default TabView;

/*const view = TabView.createTabs('tabview-container', {
    theme: 'green',
    header: false,
    footer: 'Copyright 2021 Ampani Inc',
    header: '<b>Programmable Tabs</b>',
    draggable: true,
    contrastColor: 'red',
    headerColor: '#eee',
    headerBg: 'darkcyan',
    footerBg: 'lavender',
    footerColor: 'blue',
});*/
// view.destroy();

/*const view = TabView.createTabs('tabview-container', {
    theme: 'green',
    header: false,
    footer: 'Copyright 2021 Ampani Inc',
    header: '<b>Programmable Tabs</b>',
    draggable: true,
    contrastColor: 'red',
    headerColor: '#eee',
    headerBg: 'darkcyan',
    footerBg: 'lavender',
    footerColor: 'blue',
});
// view.destroy();
*/
