function validateForm(form: HTMLElement): boolean {
  const inputs = form.querySelectorAll('input');
  const results: boolean[] = [];

  let isValid = false;

  Array.from(inputs).forEach((input: any) => {
    if (!input.value) {
      input.setCustomValidity("Invalid field.");
      results.push(false);
    }
  });

  isValid = !(results.some(value => value === false));

  return isValid;
}

export { validateForm };