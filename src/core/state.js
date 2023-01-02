function getState(initialState) {
  return new Proxy(initialState, { set: hookSetter });
}

function hookSetter(prevState, property, newState, reciver) {
  prevState[property] = newState;
  const element = document.querySelector(`[key='${prevState.key}']`);
  element.innerHTML = newState;
  return newState;
}

export { getState };
