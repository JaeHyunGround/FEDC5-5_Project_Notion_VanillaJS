import { pushRoute } from "./utils/router.js";
import { localStorageGetItem, localStorageSetItem } from "./utils/storage.js";

export default function SideBarList({ $target, initialState }) {
  const $sideBarList = document.createElement("div");
  $sideBarList.className = "sideBarList";
  $target.appendChild($sideBarList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const handleNewButton = () => {
    console.log(handleNewButton);
  };

  const showSubLi = ({ $target, documents }) => {
    const $subUl = document.createElement("ul");
    const padding = $target.style.paddingLeft;
    $subUl.style.position = "relative";
    $subUl.style.paddingLeft = padding
      ? Number(padding.split("px")[0]) + 40 + "px"
      : "0px";
    $subUl.style.right = padding ? padding : "0px";
    $target.appendChild($subUl);
    documents.map((doc) => {
      const $subLi = document.createElement("li");
      $subLi.style.position = "relative";
      $subLi.style.paddingLeft = padding
        ? Number(padding.split("px")[0]) + 40 + "px"
        : "0px";
      $subLi.style.right = padding
        ? Number(padding.split("px")[0]) + 40 + "px"
        : "0px";
      $subLi.dataset.id = doc.id;
      $subLi.innerHTML = `<div class="each" style="position: relative;padding-left: inherit;right: inherit; width:200px">
        <button class="toggle_button">⩥</button>
        <span>${doc.title}</span>
        <button class="new_button">➕</button></div>
      `;
      $subUl.appendChild($subLi);
      if (doc.documents.length > 0) {
        const newDocuments = doc.documents;
        showSubLi({ $target: $subLi, documents: newDocuments });
      } else {
        return;
      }
    });
  };
  this.render = () => {
    const documents = this.state;
    if (documents.length > 0) {
      documents.innerHTML = "";
      // innerHTML로 그리는게 아니라 이전값이 남음. 처음 렌더링시 documents=[]일떄 그려지는 빈 ul을 막기 위함
      showSubLi({ $target: $sideBarList, documents });
    }
  };
  this.render();

  $sideBarList.addEventListener("click", (e) => {
    const { tagName, className } = e.target;
    console.log(e.target);
    if (className === "toggle_button") {
      console.log("click toggle_button");
    } else if (className === "new_button") {
      console.log("click new_button");
      const closestLi = e.target.closest("li");
      console.log("closestLi", closestLi.dataset.id);
    }
    if (className === "toggle_button") {
      e.target.innerHTML = e.target.innerHTML === "⊽" ? "⩥" : "⊽";
      const li = e.target.closest("li");
      const liChilds = li.lastChild.tagName === "UL" ? li.lastChild : null;
      if (liChilds) {
        liChilds.style.display =
          liChilds.style.display !== "none" ? "none" : "block";
      }
      pushRoute(li.dataset.id);
    }
  });
}
