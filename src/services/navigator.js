import { LoginPage } from "../pages";
import { home, chats, login, logout } from "../routes";
import { renderPage } from "./render";
import { last, penultimate } from "../utils";

const stack = [];

export function navigateTo(route, { clickFromToolbar } = {}) {
  if (route === undefined || typeof route !== "string") {
    throw new Error("[Navigator]: route is undefined or not string");
  }

  if (route == last(stack)) return;

  changeLocationUrl(route, clickFromToolbar);
  registerRoute(route);
  saveLocalStorage(route);

  switch (route) {
    case home:
      renderPage(LoginPage);
      break;
    case login:
      break;
    case logout:
      break;
    case chats:
      break;

    default:
      break;
  }

  console.log("[Navigator] change route to: ", route);
  console.log("[Navigator]: stack ", stack);
}

function changeLocationUrl(route, clickFromToolbar) {
  if (clickFromToolbar) {
    history.replaceState({}, route, route);
  } else {
    history.pushState({}, route, route);
  }
}

function registerRoute(route) {
  if (last(stack) === route) return;
  stack.push(route);
}

function saveLocalStorage(route) {
  localStorage.setItem("lastRoute", route);
}

export function goBack() {}
export function goHome() {}
export function goForward() {}

export function initNavigator() {
  window.addEventListener("popstate", () => {
    const route = penultimate(stack); // предпоследний
    navigateTo(route, { clickFromToolbar: true }); // клик из браузерной панели (назад, вперед)
  });

  return document.location.pathname;
}
