import { addEvent, createDOM } from '../../utils/dom.js';

export default function SubDocumetFooter({ $target, initialState, onClick }) {
  const $subDocumentFooter = createDOM({
    tag: 'div',
    className: 'sub-document-footer',
  });

  $target.appendChild($subDocumentFooter);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $subDocumentFooter.innerHTML = `
      <div class="sub-document-list">
        ${this.state
          .map(
            (subDocument) =>
              `<div data-id="${subDocument.id}" class="sub-document-item">${subDocument.title}</div>`,
          )
          .join('')}
      </div>
    `;
  };

  this.handleClickSubDocumentItem = (e) => {
    const $subDocumentItem = e.target.closest('.sub-document-item');
    if ($subDocumentItem) {
      const { id } = $subDocumentItem.dataset;
      if (onClick) {
        onClick(id);
      }
    }
  };

  addEvent($subDocumentFooter, null, 'click', this.handleClickSubDocumentItem);
}
