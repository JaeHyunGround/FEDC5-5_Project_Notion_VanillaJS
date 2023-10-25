export default function PageManagerHeader({ $target, onNewPageAdd }) {
  const $pageAddButton = document.createElement("button");
  $pageAddButton.className = "page_manager_add_button";
  $pageAddButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

  `;
  $target.appendChild($pageAddButton);

  $pageAddButton.addEventListener("click", async (e) => {
    await onNewPageAdd();
  });
}
