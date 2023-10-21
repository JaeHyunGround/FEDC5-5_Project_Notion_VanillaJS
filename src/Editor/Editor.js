export default function Editor({ $target, initialState, EditPost }) {
  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editDiv");
  $editor.setAttribute("name", "editor");
  $editor.setAttribute("contentEditable", "true");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  // 편집기의 텍스트를 수정 시 -> 텍스트 내의 title, content, 해당 포스트의 id 콜백으로 전달
  const onEditText = () => {
    // const $div = $editor.querySelector("[name=editor]");

    $editor.addEventListener("keyup", (e) => {
      const title = $editor.querySelector("[name=title]").innerText;
      const content = $editor.querySelector("[name=content]").innerText;

      EditPost(title, content, this.state.id);
    });
  };

  this.render = () => {
    // 편집기 초기 화면
    if (this.state === null) {
      $editor.innerHTML = `
        <h1>안녕하세요 🙌🏻</h1>
        <h3>이 화면은 초기 화면입니다. 나만의 포스트를 작성해 보세요 👨‍💻</h3>`;

      $target.appendChild($editor);
      return;
    }

    const { title, id, content } = this.state;

    $editor.innerHTML = `
        <h1 name="title">${title}</h1>
        <div name="content">${content}</div>
    `;

    $target.appendChild($editor);

    onEditText();
  };
}
