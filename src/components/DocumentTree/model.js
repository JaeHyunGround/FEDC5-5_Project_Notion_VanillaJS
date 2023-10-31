import {
    createDocument,
    deleteDocument,
} from "../../services/apiManager/index.js";
import requireNew from "../../services/requireNew.js";

import { initialDocument } from "../../constants/initialData.js";
import {
    customDeleteEvent,
    customReplaceStateEvent,
} from "../../services/router.js";

const validateSelf = (data) => {
    if (typeof data.id !== "number")
        throw new Error("문서 id가 숫자 타입이 아닙니다");
    else if (typeof data.title !== "string")
        throw new Error("문서 title가 문자열 타입이 아닙니다");
    else if (Array.isArray(data.documents) === false)
        throw new Error("문서 documents가 배열이 아닙니다");
};

export const validateDocumentNode = (nodes) => {
    if (Array.isArray(nodes) === false) {
        throw new Error("documentTree의 nextState가 배열이 아닙니다");
    }

    try {
        nodes.forEach((node) => validateSelf(node));
    } catch (err) {
        throw err;
    }
};

export function DocumentNode({ initialData, appendNode, findRootOf }) {
    try {
        requireNew(new.target);
        validateSelf(initialData);
    } catch (err) {
        console.error(err);
        return;
    }

    const $documentNode = document.createElement("ul");
    const $addChildButton = document.createElement("button");
    const $deleteButton = document.createElement("button");
    const $title = document.createElement("span");

    $documentNode.appendChild($title);
    $title.classList.add("document-title");

    $documentNode.appendChild($addChildButton);
    $addChildButton.classList.add("add-button");

    $documentNode.appendChild($deleteButton);
    $deleteButton.classList.add("delete-button");

    $documentNode.classList.add("document-node");

    this.id = initialData.id;
    this.title = initialData.title;
    this.documents = initialData.documents;

    $documentNode.setAttribute("data-id", `${this.id}`);

    this.getNode = () => {
        return $documentNode;
    };

    $title.addEventListener("click", () => {
        history.replaceState(
            { documentId: this.id },
            null,
            `/document/${this.id}`
        );
        document.dispatchEvent(customReplaceStateEvent(this.id));
    });

    $addChildButton.addEventListener("click", async () => {
        const { id } = await createDocument({
            title: initialDocument.title,
            parent: this.id,
        });
        const createdDocumentData = { ...initialDocument, id };
        appendNode(
            $documentNode,
            new DocumentNode({
                initialData: createdDocumentData,
                appendNode,
                findRootOf,
            })
        );
    });

    $deleteButton.addEventListener("click", () => {
        const pathname = location.pathname;
        const $documentTree = document.querySelector(".document-tree");
        const $rootNode = findRootOf($documentNode);
        const children = $documentNode.children;
        for (const $childNode of Object.values(children)) {
            if (
                $rootNode != null &&
                $childNode.classList.contains("document-node")
            ) {
                $documentTree.insertBefore(
                    $childNode,
                    $rootNode.nextElementSibling
                );
            }
        }
        if (pathname.endsWith(this.id)) {
            history.replaceState(null, null, "/");
            document.dispatchEvent(customDeleteEvent());
        }
        $documentNode.remove();
        deleteDocument(this.id);
    });

    this.render = () => {
        $title.innerText = this.title;
    };

    this.render();
}
