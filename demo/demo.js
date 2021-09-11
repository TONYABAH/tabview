'use strict';

import Tabview from '../lib/tabview.modern.js';
const container = document.getElementById('tabs');
const addBtn = document.getElementById('addTab');
const view = Tabview.createTabs(container, { theme: 'dark' });
function add() {
    const tab = view.add({
        bg: '',
        text: `Welcome ${Math.random()}`,
    });
}
addBtn.addEventListener('click', () => {
    add();
});
