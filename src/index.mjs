import App from "./App.js";
import "./style/reset.css";
import "./style/global.css";

const $target = document.querySelector("#app");
$target.className = "container";

new App({ $target });
