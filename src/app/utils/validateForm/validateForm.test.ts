import {validateForm} from './validateForm';

test('Validate form shoud be return true', () => {
  const form = document.createElement('form');
  const isValid = validateForm(form);
  expect(isValid).toBe(true);
});
test('Validate form shoud be return false', () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  form.appendChild(input);
  const isValid = validateForm(form);
  expect(isValid).toBe(false);
});
