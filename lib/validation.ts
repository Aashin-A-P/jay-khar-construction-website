export function requireFields(data: Record<string, unknown>, fields: string[]) {
  for (const field of fields) {
    if (String(data[field] ?? '').trim() === '') {
      return `${field.replaceAll('_', ' ').replace(/^\w/, (value) => value.toUpperCase())} is required.`;
    }
  }

  return null;
}

export function validateEmail(email: unknown) {
  const value = String(email ?? '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
