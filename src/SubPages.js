import SubPage from "./SubPage.js";

export default function SubPages({ $target, initialState }) {
  const $subPages = document.createElement("div");
  $subPages.className = "sub_pages";

  $target.appendChild($subPages);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $subPages.innerHTML = "";
    if (this.state) {
      this.state.forEach((subPage) => {
        new SubPage({ $target: $subPages, initialState: subPage });
      });
    }
  };

  this.render();
}
