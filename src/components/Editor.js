import { updateDocument } from "../services/apiManager/index.js";
import requireNew from "../services/requireNew.js";

export function Editor({ $target, initialContent, changeTitle }) {
    requireNew(new.target);

    const $editor = document.createElement("div");
    $editor.classList.add("editor");

    const $title = document.createElement("input");
    $title.classList.add("editor-title");
    $title.setAttribute("placeholder", "제목 입력");

    const $content = document.createElement("textarea");
    $content.classList.add("editor-content");
    $content.setAttribute("autofocus", "true");

    $editor.appendChild($title);
    $editor.appendChild($content);

    this.state = initialContent;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.appendEditor = () => {
        $target.appendChild($editor);
    }

    this.removeEditor = () => {
        $editor.remove()
    }

    let timeoutId;

    $editor.addEventListener("keyup", (e) => {
        const nextState = { ...this.state };
        if (e.target.classList.contains("editor-title")) {
            this.setState({ ...nextState, title: e.target.value });
            changeTitle(history.state.documentId, e.target.value);
        } else if (e.target.classList.contains("editor-content")) {
            this.setState({ ...nextState, content: e.target.value });
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            updateDocument(history.state.documentId, this.state);
        }, 2000);
    });

    this.render = () => {
        $title.value = this.state.title;
        $content.value = this.state.content;
    };
}
