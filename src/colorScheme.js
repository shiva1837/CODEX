'use strict';

/**
 * Color scheme utilities for website design.
 * Provides hex/RGB conversion, contrast checking, and palette generation.
 */

/**
 * Parse a CSS hex color string (#RGB or #RRGGBB) into {r, g, b}.
 *
 * @param {string} hex - Hex color string.
 * @returns {{r: number, g: number, b: number}}
 * @throws {TypeError|RangeError} If input is not a valid hex color.
 */
function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('hex must be a string');
  }
  const cleaned = hex.trim();
  const shortRe = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
  const longRe = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

  let m = longRe.exec(cleaned);
  if (m) {
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }
  m = shortRe.exec(cleaned);
  if (m) {
    return {
      r: parseInt(m[1] + m[1], 16),
      g: parseInt(m[2] + m[2], 16),
      b: parseInt(m[3] + m[3], 16),
    };
  }
  throw new RangeError(`Invalid hex color: "${hex}"`);
}

/**
 * Convert {r, g, b} values (0-255) to a CSS hex string (#rrggbb).
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 * @throws {RangeError} If any channel value is outside 0-255.
 */
function rgbToHex(r, g, b) {
  for (const [name, value] of [['r', r], ['g', g], ['b', b]]) {
    if (!Number.isInteger(value) || value < 0 || value > 255) {
      throw new RangeError(`Channel "${name}" must be an integer in [0, 255], got ${value}`);
    }
  }
  return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculate the relative luminance of a color (WCAG 2.1 formula).
 *
 * @param {{r: number, g: number, b: number}} rgb
 * @returns {number} Luminance in [0, 1].
 */
function relativeLuminance({ r, g, b }) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * Compute the WCAG contrast ratio between two hex colors.
 *
 * @param {string} hexA
 * @param {string} hexB
 * @returns {number} Contrast ratio (1:1 – 21:1).
 */
function contrastRatio(hexA, hexB) {
  const lumA = relativeLuminance(hexToRgb(hexA));
  const lumB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check whether two colors meet the WCAG AA standard (contrast ratio ≥ 4.5:1
 * for normal text, or ≥ 3:1 for large text).
 *
 * @param {string} hexA
 * @param {string} hexB
 * @param {'normal'|'large'} [level='normal']
 * @returns {boolean}
 */
function meetsWcagAA(hexA, hexB, level = 'normal') {
  const ratio = contrastRatio(hexA, hexB);
  return level === 'large' ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Generate a simple complementary color palette from a base hex color.
 * Returns the base color plus its complement (180° hue rotation).
 *
 * @param {string} baseHex
 * @returns {{ base: string, complement: string }}
 */
function complementaryPalette(baseHex) {
  const { r, g, b } = hexToRgb(baseHex);
  return {
    base: baseHex,
    complement: rgbToHex(255 - r, 255 - g, 255 - b),
  };
}

module.exports = {
  hexToRgb,
  rgbToHex,
  relativeLuminance,
  contrastRatio,
  meetsWcagAA,
  complementaryPalette,
};
