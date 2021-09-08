import Tabview from "../index.js";
let container = document.getElementById("tabs");
let addBtn = document.getElementById("addTab");
let view = new Tabview();
view.init(container, {
    // theme: "purple",
});
function add() {
    let tab = view.add({
        bg: "red",
        text: "Welcome " + Math.random(),
    });
}
addBtn.addEventListener("click", () => {
    add();
});
