function onChange(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  target.setCustomValidity('');

  const name = target.name;
  const value = target.value;

  this.state.inputData = {...this.state.inputData, [name]: value};
}

export {onChange};
