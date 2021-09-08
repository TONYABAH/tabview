import Tabview from "../index.js";
let container = document.getElementById("tabs");
let addBtn = document.getElementById("addTab");
let view = Tabview.createTabs(container, { theme: "dark" });
function add() {
    let tab = view.add({
        bg: "",
        text: "Welcome " + Math.random(),
    });
}
addBtn.addEventListener("click", () => {
    add();
});
