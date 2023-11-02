import DocumentPage from "./page/DocumentPage.js";
import Nav from "./component/Nav.js";
import Component from "./core/Component.js";
import Router from "./core/Router.js";
import Route from "./core/Route.js";

export default class App extends Component {
  constructor($target, tagName) {
    super($target, tagName);
    this.$app = document.getElementById("app");
    this.routing();
  }
  //NavPage는 항상 렌더되야한다
  renderChild() {
    new Nav({
      $target: this.$target,
    });
  }
  routing() {
    new Router(
      { $target: this.$app },
      new Route({
        path: "documents",
        component: DocumentPage,
        initialState: "",
      })
    );
  }
}
