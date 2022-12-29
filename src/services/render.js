export function renderPage(page) {
  const root = document.querySelector("#root");
  const template = page().trim();
  const element = document.createElement("div");

  element.innerHTML = template;
  root.appendChild(element.firstChild);
}