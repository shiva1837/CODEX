'use strict';

/**
 * Input validation helpers used across the website generator.
 */

/**
 * Check whether a string is a valid CSS hex color (#RGB or #RRGGBB).
 *
 * @param {string} value
 * @returns {boolean}
 */
function isValidHexColor(value) {
  return typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

/**
 * Check whether a string is a non-empty, printable page title.
 * Rules: 1–120 characters, not all whitespace.
 *
 * @param {string} value
 * @returns {boolean}
 */
function isValidPageTitle(value) {
  return (
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.length <= 120
  );
}

/**
 * Validate a website configuration object.
 *
 * Required fields: title (string), primaryColor (hex), secondaryColor (hex).
 * Optional field: author (string).
 *
 * @param {Object} config
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateSiteConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return { valid: false, errors: ['config must be a plain object'] };
  }

  if (!isValidPageTitle(config.title)) {
    errors.push('title must be a non-empty string of at most 120 characters');
  }

  if (!isValidHexColor(config.primaryColor)) {
    errors.push('primaryColor must be a valid CSS hex color (#RGB or #RRGGBB)');
  }

  if (!isValidHexColor(config.secondaryColor)) {
    errors.push('secondaryColor must be a valid CSS hex color (#RGB or #RRGGBB)');
  }

  if ('author' in config && typeof config.author !== 'string') {
    errors.push('author must be a string when provided');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Check whether a URL string is a safe http/https URL.
 *
 * @param {string} value
 * @returns {boolean}
 */
function isSafeUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Sanitise an author name: trim whitespace and remove characters that are
 * not letters, digits, spaces, hyphens, apostrophes, or periods.
 *
 * @param {string} value
 * @returns {string}
 * @throws {TypeError} If value is not a string.
 */
function sanitiseAuthorName(value) {
  if (typeof value !== 'string') {
    throw new TypeError('value must be a string');
  }
  return value.trim().replace(/[^a-zA-Z0-9 \-'.]/g, '');
}

module.exports = {
  isValidHexColor,
  isValidPageTitle,
  validateSiteConfig,
  isSafeUrl,
  sanitiseAuthorName,
};
