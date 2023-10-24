import Editor from "../component/Editor.js";
import Title from "../common/Title.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

// initialState : {doucmentId :null, document:null}
export default function DocumentPage({ $target, initialState }) {
  const $documentPage = document.createElement("div");
  $documentPage.classList.add("document-page");
  this.state = initialState;
  const fetchDocument = async (documentId) => {
    const document = await request(`/documents/${documentId}`);
    if (!document) {
      alert("존재하지 않는 문서군요?");
      push("/");
      return;
    }
    this.setState(document);
  };
  fetchDocument(this.state.id);
  this.setState = async (nextState) => {
    this.state = nextState;
    const { id, title } = this.state;
    this.render();
    documentHeader.setState({ href: id, title });
    editor.setState(this.state);
  };
  this.render = () => {
    $target.replaceChildren($documentPage);
  };
  const documentHeader = new Title({
    $target: $documentPage,
    initialState: {
      href: "",
      title: "",
    },
  });
  let timerOfSetTimeout = null;
  const editor = new Editor({
    $target: $documentPage,
    initialState: {
      title: "",
      content: "",
    },
    documentAutoSave: (documentId, requestBody) => {
      if (timerOfSetTimeout !== null) {
        clearTimeout(timerOfSetTimeout);
      }
      timerOfSetTimeout = setTimeout(async () => {
        await request(`/documents/${documentId}`, {
          method: "PUT",
          body: JSON.stringify(requestBody),
        });
      }, 1500);
    },
  });
}
