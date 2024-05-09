export function createSlug(text) {
  // Normalize Unicode characters for consistent representation
  text = text.normalize('NFKD');

  // Convert to lowercase
  text = text.toLowerCase();

  // Replace non-word characters with underscores
  text = text.replace(/[^\w]+/g, '_'); // Any non-word character is replaced with an underscore

  // Remove leading and trailing underscores
  text = text.replace(/^_+|_+$/g, ''); // Removes leading/trailing underscores

  return text;
}
