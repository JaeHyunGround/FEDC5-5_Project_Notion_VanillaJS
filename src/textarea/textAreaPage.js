import { DUMMY_DATA_TEXT_CONTENT } from "../utils/api.js";

const $ = document;
export default function TextAreaPage({ $target, initialState }) {
  const $textArea = $.createElement("div");
  $textArea.className = "textArea";

  const $titleInputArea = $.createElement("input");
  $titleInputArea.className = "textArea-title";
  $titleInputArea.type = "text";
  $titleInputArea.name = "title";
  $titleInputArea.value = DUMMY_DATA_TEXT_CONTENT.title;
  // <input type="text" name="title" style="width:600px;" value="${this.state.title}" />
  // <textarea name="content" style="width:600px;height:400px;"
  const $contentTextArea = $.createElement("textarea");
  $contentTextArea.className = "textArea-content";
  $contentTextArea.name = "content";
  $contentTextArea.value = DUMMY_DATA_TEXT_CONTENT.content;

  $textArea.appendChild($titleInputArea);
  $textArea.appendChild($contentTextArea);

  $target.appendChild($textArea);
  // console.log($target);
  // console.log(DUMMY_DATA_TEXT_CONTENT.title);
}
