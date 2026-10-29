import { formatPhone, phoneDigits } from './formatPhone';

test('masks progressively as digits are typed', () => {
  expect(formatPhone('')).toBe('');
  expect(formatPhone('4')).toBe('(4');
  expect(formatPhone('404')).toBe('(404) ');
  expect(formatPhone('40455')).toBe('(404) 55');
  expect(formatPhone('4045551234')).toBe('(404) 555-1234');
});

test('ignores non-digits and caps at 10 digits', () => {
  expect(formatPhone('+1 (404) 555-1234 ext 9')).toBe('(140) 455-5123');
  expect(formatPhone('abc404def5551234999')).toBe('(404) 555-1234');
});

test('phoneDigits strips formatting', () => {
  expect(phoneDigits('(404) 555-1234')).toBe('4045551234');
});
