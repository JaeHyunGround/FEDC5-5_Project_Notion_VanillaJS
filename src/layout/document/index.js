import { updateDocument, deleteDocument } from '@api/document';
import debounce from '@util/debounce';
import ContentBlock from '@component/document/content-block';
import { createElementWithClass, addEvent } from '../../util/dom';

import './style.scss';

const ARROWUP_CHARACTER = 'ArrowUp';
const ARROWDOWN_CHARACTER = 'ArrowDown';

const ROOT_DOCUMENT_ID = 103858;
const NOT_FOUND_DOCUMENT_ID = 116012;
const filterTarget = [ROOT_DOCUMENT_ID, NOT_FOUND_DOCUMENT_ID];

export default function Document({ $target, initialState, handleOptimisticUITitle }) {
	const $document = createElementWithClass('div', 'document');
	$target.appendChild($document);

	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
		$document.style.pointerEvents = filterTarget.includes(this.state.id) ? 'none' : 'auto';
		$document.querySelector('.document__deleteBtn').style.display = filterTarget.includes(this.state.id)
			? 'none'
			: 'block';
	};

	this.parseContent = () => {
		const htmlString = this.state.content;
		const pattern = /<(\w+)[^>]*>([^<]+)<\/\1>/g;
		let match;
		const parsed = [];
		// eslint-disable-next-line no-cond-assign
		while ((match = pattern.exec(htmlString)) !== null) {
			const tagName = match[1];
			const innerText = match[2].trim();
			parsed.push({ tagName, innerText });
		}
		return parsed;
	};

	const test = () => {
		const $contentBox = $document.querySelector('.document__content');
		const elements = this.parseContent();
		elements.map((element) => new ContentBlock({ $target: $contentBox, initialState: element }));
	};

	this.render = () => {
		const { title } = this.state;
		$document.innerHTML = `
		<h1 contenteditable="true" class="document__title" style="margin-top:0px;">${title}</h1>
		<div class="document__content"></div>
		<div class="document__deleteBtn" role='button'>페이지 삭제</div>
		`;
		test();
		addEvent($document, 'document__title', 'keyup', this.handleKeyUpTitle);
		addEvent($document, 'document__content', 'click', this.handleClickContent);
		addEvent($document, 'document__content', 'keyup', this.handleKeyUpContent);
		addEvent($document, 'document__deleteBtn', 'click', this.handleClickDelete);
	};
	this.render();

	this.handleKeyUpTitle = (e) => {
		if (e.code === ARROWDOWN_CHARACTER) {
			const $content = $document?.querySelector('.document__content');
			$content.firstChild.focus();
		}
		const { id, content } = this.state;
		// optimistic UI
		handleOptimisticUITitle(id, e.target.innerHTML);
		// api update
		debounce(async () => {
			const newDocument = { title: e.target.innerHTML, content };
			await updateDocument(newDocument, id);
		});
	};
	this.handleClickDelete = () => {
		const { id } = this.state;
		handleOptimisticUITitle(id);
		deleteDocument(id);
	};

	this.handleKeyUpContent = (e) => {
		if (e.code === ARROWUP_CHARACTER) {
			const $title = $document?.querySelector('.document__title');
			// eslint-disable-next-line no-unused-expressions
			e.target.previousSibling ? e.target.previousSibling.focus() : $title.focus();
		}
		if (e.code === ARROWDOWN_CHARACTER) {
			return e.target.nextSibling?.focus();
		}

		const $contentBox = $document.querySelector('.document__content');
		return debounce(async () => {
			const { id, title } = this.state;
			const newDocument = { title, content: $contentBox.innerHTML };
			await updateDocument(newDocument, id);
		});
	};
	this.handleClickContent = () => {
		// const $contentBox = $document?.querySelector('.document__content');
		// const init = {
		// 	tagName: 'div',
		// 	innerText: '### test입',
		// };
		// new ContentBlock({ $target: $contentBox, initialState: init });
	};
}
