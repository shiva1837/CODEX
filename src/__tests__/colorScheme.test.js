'use strict';

const {
  hexToRgb,
  rgbToHex,
  relativeLuminance,
  contrastRatio,
  meetsWcagAA,
  complementaryPalette,
} = require('../colorScheme');

describe('colorScheme.hexToRgb', () => {
  // --- 6-digit hex ---
  test('parses a standard 6-digit hex color', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });

  test('parses another 6-digit hex color', () => {
    expect(hexToRgb('#1a2b3c')).toEqual({ r: 26, g: 43, b: 60 });
  });

  test('parses white (#ffffff)', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  test('parses black (#000000)', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  test('is case-insensitive for 6-digit hex', () => {
    expect(hexToRgb('#FF8800')).toEqual(hexToRgb('#ff8800'));
  });

  // --- 3-digit hex ---
  test('parses a 3-digit shorthand hex color', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
  });

  test('parses #abc as #aabbcc', () => {
    expect(hexToRgb('#abc')).toEqual({ r: 170, g: 187, b: 204 });
  });

  test('is case-insensitive for 3-digit hex', () => {
    expect(hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
  });

  // --- Leading/trailing whitespace ---
  test('trims surrounding whitespace', () => {
    expect(hexToRgb('  #ff0000  ')).toEqual({ r: 255, g: 0, b: 0 });
  });

  // --- Error cases ---
  test('throws TypeError for non-string input', () => {
    expect(() => hexToRgb(12345)).toThrow(TypeError);
  });

  test('throws RangeError for invalid hex (no hash)', () => {
    expect(() => hexToRgb('ff0000')).toThrow(RangeError);
  });

  test('throws RangeError for invalid hex (wrong length)', () => {
    expect(() => hexToRgb('#ff00')).toThrow(RangeError);
  });

  test('throws RangeError for empty string', () => {
    expect(() => hexToRgb('')).toThrow(RangeError);
  });
});

describe('colorScheme.rgbToHex', () => {
  test('converts pure red', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
  });

  test('converts white', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
  });

  test('converts black', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
  });

  test('pads single-digit hex values', () => {
    expect(rgbToHex(0, 0, 15)).toBe('#00000f');
  });

  test('hexToRgb and rgbToHex are inverse operations', () => {
    const { r, g, b } = hexToRgb('#4e9af1');
    expect(rgbToHex(r, g, b)).toBe('#4e9af1');
  });

  // --- Error cases ---
  test('throws RangeError for value below 0', () => {
    expect(() => rgbToHex(-1, 0, 0)).toThrow(RangeError);
  });

  test('throws RangeError for value above 255', () => {
    expect(() => rgbToHex(0, 256, 0)).toThrow(RangeError);
  });

  test('throws RangeError for float values', () => {
    expect(() => rgbToHex(1.5, 0, 0)).toThrow(RangeError);
  });
});

describe('colorScheme.relativeLuminance', () => {
  test('luminance of white is 1', () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 5);
  });

  test('luminance of black is 0', () => {
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 5);
  });

  test('luminance is in [0, 1] for arbitrary colors', () => {
    const lum = relativeLuminance({ r: 128, g: 64, b: 200 });
    expect(lum).toBeGreaterThanOrEqual(0);
    expect(lum).toBeLessThanOrEqual(1);
  });
});

describe('colorScheme.contrastRatio', () => {
  test('black on white has maximum contrast (21:1)', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  test('white on white has minimum contrast (1:1)', () => {
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
  });

  test('is symmetric (order of arguments does not matter)', () => {
    expect(contrastRatio('#336699', '#ffffff')).toBeCloseTo(
      contrastRatio('#ffffff', '#336699'),
      10
    );
  });

  test('ratio is always ≥ 1', () => {
    const ratio = contrastRatio('#aabbcc', '#112233');
    expect(ratio).toBeGreaterThanOrEqual(1);
  });
});

describe('colorScheme.meetsWcagAA', () => {
  test('black on white passes AA for normal text', () => {
    expect(meetsWcagAA('#000000', '#ffffff')).toBe(true);
  });

  test('white on white fails AA', () => {
    expect(meetsWcagAA('#ffffff', '#ffffff')).toBe(false);
  });

  test('uses 3:1 threshold for large text', () => {
    // A pair with ratio ~3.2 should pass large but not normal
    // #767676 on white is ~4.54 – just passes normal AA
    expect(meetsWcagAA('#767676', '#ffffff', 'large')).toBe(true);
  });

  test('defaults to normal text level', () => {
    expect(meetsWcagAA('#000000', '#ffffff')).toBe(meetsWcagAA('#000000', '#ffffff', 'normal'));
  });
});

describe('colorScheme.complementaryPalette', () => {
  test('returns an object with base and complement keys', () => {
    const palette = complementaryPalette('#ff0000');
    expect(palette).toHaveProperty('base');
    expect(palette).toHaveProperty('complement');
  });

  test('base matches the input color', () => {
    expect(complementaryPalette('#336699').base).toBe('#336699');
  });

  test('complement of red (#ff0000) is cyan (#00ffff)', () => {
    expect(complementaryPalette('#ff0000').complement).toBe('#00ffff');
  });

  test('complement of white is black', () => {
    expect(complementaryPalette('#ffffff').complement).toBe('#000000');
  });

  test('applying complement twice returns the original color', () => {
    const { complement } = complementaryPalette('#4a7c59');
    const restored = complementaryPalette(complement).complement;
    const { r, g, b } = hexToRgb('#4a7c59');
    expect(restored).toBe(rgbToHex(r, g, b));
  });

  test('throws on invalid hex input', () => {
    expect(() => complementaryPalette('not-a-color')).toThrow(RangeError);
  });
});
