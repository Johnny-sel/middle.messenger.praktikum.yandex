function onChange(event: InputEvent) {
  (event.target as any).setCustomValidity('');

  const name = (event.target as any).name;
  const value = (event.target as any).value;

  this.state.data = {...this.state.data, [name]: value};
}

export {onChange};
