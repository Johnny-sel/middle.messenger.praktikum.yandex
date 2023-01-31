function validateForm(form: HTMLFormElement): boolean {
  const inputs = form.querySelectorAll('input');
  const results: boolean[] = [];

  let isValid = false;

  Array.from(inputs).forEach((input: HTMLInputElement) => {
    if (!input.value || !input.validity.valid) {
      input.setCustomValidity('Invalid field');

      results.push(false);
    }
  });

  isValid = !results.some((value) => value === false);
  return isValid;
}

export {validateForm};
