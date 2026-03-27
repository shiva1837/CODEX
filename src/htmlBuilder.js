'use strict';

/**
 * Fluent HTML element builder.
 * Creates a chainable builder for constructing safe HTML strings.
 */

/**
 * Escape HTML special characters to prevent XSS.
 *
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Serialise a plain attributes object to an HTML attribute string.
 *
 * @param {Object} attrs
 * @returns {string}  Leading space included when non-empty.
 */
function attrsToString(attrs) {
  if (!attrs || typeof attrs !== 'object') return '';
  return Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => (v === true ? ` ${escapeHtml(k)}` : ` ${escapeHtml(k)}="${escapeHtml(String(v))}"`) )
    .join('');
}

/** Tags that must be self-closing. */
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

/**
 * Create an HTML tag string.
 *
 * @param {string} tag - HTML tag name.
 * @param {Object} [attrs={}] - Attribute map.
 * @param {string} [inner=''] - Inner HTML (ignored for void tags).
 * @returns {string}
 */
function tag(tagName, attrs = {}, inner = '') {
  if (typeof tagName !== 'string' || tagName.trim() === '') {
    throw new TypeError('tagName must be a non-empty string');
  }
  const name = tagName.toLowerCase().trim();
  const attrStr = attrsToString(attrs);
  if (VOID_TAGS.has(name)) {
    return `<${name}${attrStr}>`;
  }
  return `<${name}${attrStr}>${inner}</${name}>`;
}

/**
 * Build an unordered list (<ul>) from an array of items.
 *
 * @param {string[]} items - List items (will be escaped).
 * @param {Object} [ulAttrs={}] - Attributes for the <ul>.
 * @returns {string}
 */
function ul(items, ulAttrs = {}) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }
  const liItems = items.map((item) => tag('li', {}, escapeHtml(String(item)))).join('');
  return tag('ul', ulAttrs, liItems);
}

/**
 * Build an anchor tag.
 *
 * @param {string} href
 * @param {string} text - Link text (will be escaped).
 * @param {Object} [extraAttrs={}]
 * @returns {string}
 */
function anchor(href, text, extraAttrs = {}) {
  return tag('a', { href, ...extraAttrs }, escapeHtml(String(text)));
}

/**
 * Build an <img> tag.
 *
 * @param {string} src
 * @param {string} alt
 * @param {Object} [extraAttrs={}]
 * @returns {string}
 */
function img(src, alt, extraAttrs = {}) {
  return tag('img', { src, alt, ...extraAttrs });
}

module.exports = { escapeHtml, attrsToString, tag, ul, anchor, img };
