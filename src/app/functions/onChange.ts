function onChange(event: InputEvent) {
  (event.target as any).setCustomValidity('');

  const name = (event.target as any).name;
  const value = (event.target as any).value;

  this.state.inputData = {...this.state.inputData, [name]: value};
}

export {onChange};
