// Function to create a slug with underscores from Hindi text
export function createHindiSlug(text) {
  // Normalize Unicode characters for consistent representation
  text = text.normalize('NFKD');

  // Convert to lowercase
  text = text.toLowerCase();

  // Replace spaces with underscores
  text = text.replace(/\s+/g, '_');

  // Replace all non-word and non-Hindi characters with underscores
  text = text.replace(/[^\w\u0900-\u097F]+/g, '_'); // Keep word characters and Hindi Unicode range

  // Remove leading and trailing underscores
  text = text.replace(/^_+|_+$/g, '');

  return text;
}

// Function to create a slug with underscores from English text
export function createEnglishSlug(text) {
  // Normalize Unicode characters for consistent representation
  text = text.normalize('NFKD');

  // Convert to lowercase for consistent casing
  text = text.toLowerCase();

  // Replace spaces with underscores
  text = text.replace(/\s+/g, '_');

  // Replace all non-word characters with underscores
  text = text.replace(/[^\w]+/g, '_');

  // Remove leading and trailing underscores
  text = text.replace(/^_+|_+$/g, '');

  return text;
}
