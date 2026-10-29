/** Masks free-typed input as a US phone number: "(555) 123-4567". */
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, '').slice(0, 10);
  if (numbers.length >= 6) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }
  if (numbers.length >= 3) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  }
  if (numbers.length > 0) {
    return `(${numbers}`;
  }
  return numbers;
}

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}
