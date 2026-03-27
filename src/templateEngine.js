'use strict';

/**
 * Simple template engine for generating website HTML from templates.
 * Supports variable substitution ({{varName}}) and conditional blocks
 * ({{#if condition}}...{{/if}}).
 */

/**
 * Render a template string by replacing {{key}} placeholders with values
 * from the provided data object.
 *
 * @param {string} template - Template string with {{key}} placeholders.
 * @param {Object} data - Key/value pairs to substitute into the template.
 * @returns {string} The rendered string.
 * @throws {TypeError} If template is not a string or data is not an object.
 */
function render(template, data) {
  if (typeof template !== 'string') {
    throw new TypeError('template must be a string');
  }
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new TypeError('data must be a plain object');
  }

  // Process {{#if key}}...{{/if}} blocks first
  let result = template.replace(
    /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, key, content) => (data[key] ? content : '')
  );

  // Then replace {{key}} placeholders
  result = result.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return String(data[key]);
    }
    return '';
  });

  return result;
}

/**
 * Build a complete HTML page from named section templates.
 *
 * @param {Object} sections - Map of section name → template string.
 *   Recognised keys: `head`, `header`, `body`, `footer`.
 * @param {Object} data - Data object passed to each template section.
 * @returns {string} A complete HTML document string.
 */
function buildPage(sections, data) {
  if (!sections || typeof sections !== 'object') {
    throw new TypeError('sections must be a plain object');
  }

  const head = render(sections.head || '', data);
  const header = render(sections.header || '', data);
  const body = render(sections.body || '', data);
  const footer = render(sections.footer || '', data);

  return `<!DOCTYPE html>
<html lang="en">
<head>${head}</head>
<body>
${header}
${body}
${footer}
</body>
</html>`;
}

/**
 * Extract the placeholder keys referenced in a template string.
 *
 * @param {string} template - Template string.
 * @returns {string[]} Unique array of referenced key names.
 */
function extractKeys(template) {
  if (typeof template !== 'string') {
    throw new TypeError('template must be a string');
  }
  const keys = new Set();
  const re = /\{\{(?:#if\s+)?(\w+)\}\}/g;
  let match;
  while ((match = re.exec(template)) !== null) {
    keys.add(match[1]);
  }
  return Array.from(keys);
}

module.exports = { render, buildPage, extractKeys };
