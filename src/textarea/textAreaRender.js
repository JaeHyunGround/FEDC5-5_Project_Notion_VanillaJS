import TextAreaPage from "./textAreaPage.js";
import TextAreaFooter from "./textAreaFooter.js";
const $ = document;

export default function TextAreaRender({ $target, initialState, onTextEditing, onTitleEditing, onClickChildPage }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const textAreaPage = new TextAreaPage({ $target, initialState, onTextEditing, onTitleEditing });
  const textAreaFooter = new TextAreaFooter({ $target, initialState, onClickChildPage });

  this.render = () => {
    textAreaPage.setState(this.state);
    textAreaFooter.setState(this.state.documents);
  };
  this.render();
}
