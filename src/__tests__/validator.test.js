'use strict';

const {
  isValidHexColor,
  isValidPageTitle,
  validateSiteConfig,
  isSafeUrl,
  sanitiseAuthorName,
} = require('../validator');

describe('validator.isValidHexColor', () => {
  // --- Valid colors ---
  test('accepts a 6-digit lowercase hex', () => {
    expect(isValidHexColor('#ff0000')).toBe(true);
  });

  test('accepts a 6-digit uppercase hex', () => {
    expect(isValidHexColor('#FF0000')).toBe(true);
  });

  test('accepts a 3-digit hex', () => {
    expect(isValidHexColor('#f0f')).toBe(true);
  });

  test('accepts #000000', () => {
    expect(isValidHexColor('#000000')).toBe(true);
  });

  test('accepts #ffffff', () => {
    expect(isValidHexColor('#ffffff')).toBe(true);
  });

  test('accepts hex with leading/trailing whitespace (after trim)', () => {
    expect(isValidHexColor('  #ff0000  ')).toBe(true);
  });

  // --- Invalid colors ---
  test('rejects hex without leading #', () => {
    expect(isValidHexColor('ff0000')).toBe(false);
  });

  test('rejects 4-digit hex', () => {
    expect(isValidHexColor('#ff00')).toBe(false);
  });

  test('rejects a non-string value', () => {
    expect(isValidHexColor(0xff0000)).toBe(false);
    expect(isValidHexColor(null)).toBe(false);
  });

  test('rejects empty string', () => {
    expect(isValidHexColor('')).toBe(false);
  });

  test('rejects color names', () => {
    expect(isValidHexColor('red')).toBe(false);
  });

  test('rejects invalid characters in hex digits', () => {
    expect(isValidHexColor('#zzzzzz')).toBe(false);
  });
});

describe('validator.isValidPageTitle', () => {
  test('accepts a normal title', () => {
    expect(isValidPageTitle('My Awesome Site')).toBe(true);
  });

  test('accepts a single character', () => {
    expect(isValidPageTitle('A')).toBe(true);
  });

  test('accepts exactly 120 characters', () => {
    expect(isValidPageTitle('x'.repeat(120))).toBe(true);
  });

  test('rejects an empty string', () => {
    expect(isValidPageTitle('')).toBe(false);
  });

  test('rejects a string of only whitespace', () => {
    expect(isValidPageTitle('   ')).toBe(false);
  });

  test('rejects a title longer than 120 characters', () => {
    expect(isValidPageTitle('x'.repeat(121))).toBe(false);
  });

  test('rejects non-string values', () => {
    expect(isValidPageTitle(null)).toBe(false);
    expect(isValidPageTitle(42)).toBe(false);
    expect(isValidPageTitle(undefined)).toBe(false);
  });
});

describe('validator.validateSiteConfig', () => {
  const validConfig = {
    title: 'My Site',
    primaryColor: '#336699',
    secondaryColor: '#ff6600',
  };

  test('returns valid:true for a correct config', () => {
    const result = validateSiteConfig(validConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('accepts an optional author string', () => {
    const result = validateSiteConfig({ ...validConfig, author: 'Alice' });
    expect(result.valid).toBe(true);
  });

  test('returns valid:false when title is missing', () => {
    const { title, ...rest } = validConfig;
    const result = validateSiteConfig(rest);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('title'))).toBe(true);
  });

  test('returns valid:false when primaryColor is invalid', () => {
    const result = validateSiteConfig({ ...validConfig, primaryColor: 'not-a-color' });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('primaryColor'))).toBe(true);
  });

  test('returns valid:false when secondaryColor is invalid', () => {
    const result = validateSiteConfig({ ...validConfig, secondaryColor: 'bad' });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('secondaryColor'))).toBe(true);
  });

  test('returns valid:false when author is not a string', () => {
    const result = validateSiteConfig({ ...validConfig, author: 123 });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('author'))).toBe(true);
  });

  test('returns multiple errors for multiple invalid fields', () => {
    const result = validateSiteConfig({
      title: '',
      primaryColor: 'bad',
      secondaryColor: 'bad',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(3);
  });

  test('returns single error when config is not an object', () => {
    const result = validateSiteConfig(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('config must be a plain object');
  });

  test('returns error for array input', () => {
    const result = validateSiteConfig([]);
    expect(result.valid).toBe(false);
  });
});

describe('validator.isSafeUrl', () => {
  test('accepts an https URL', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
  });

  test('accepts an http URL', () => {
    expect(isSafeUrl('http://example.com/path?q=1')).toBe(true);
  });

  test('rejects javascript: protocol', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
  });

  test('rejects data: URI', () => {
    expect(isSafeUrl('data:text/html,<h1>hi</h1>')).toBe(false);
  });

  test('rejects a relative URL', () => {
    expect(isSafeUrl('/relative/path')).toBe(false);
  });

  test('rejects empty string', () => {
    expect(isSafeUrl('')).toBe(false);
  });

  test('rejects non-string input', () => {
    expect(isSafeUrl(null)).toBe(false);
    expect(isSafeUrl(42)).toBe(false);
  });

  test('rejects ftp: protocol', () => {
    expect(isSafeUrl('ftp://files.example.com')).toBe(false);
  });
});

describe('validator.sanitiseAuthorName', () => {
  test('returns trimmed name unchanged when already clean', () => {
    expect(sanitiseAuthorName('Alice')).toBe('Alice');
  });

  test('trims leading and trailing whitespace', () => {
    expect(sanitiseAuthorName('  Bob  ')).toBe('Bob');
  });

  test('allows hyphens, apostrophes, and periods', () => {
    expect(sanitiseAuthorName("Mary O'Brien")).toBe("Mary O'Brien");
    expect(sanitiseAuthorName('J. Smith')).toBe('J. Smith');
    expect(sanitiseAuthorName('Jean-Luc')).toBe('Jean-Luc');
  });

  test('strips disallowed characters like angle brackets', () => {
    expect(sanitiseAuthorName('<script>hack</script>')).toBe('scripthackscript');
  });

  test('strips special symbols', () => {
    expect(sanitiseAuthorName('Al!ce@Domain')).toBe('AlceDomain');
  });

  test('handles a string of all disallowed characters', () => {
    expect(sanitiseAuthorName('!@#$%^&*()')).toBe('');
  });

  test('throws TypeError for non-string input', () => {
    expect(() => sanitiseAuthorName(null)).toThrow(TypeError);
    expect(() => sanitiseAuthorName(42)).toThrow(TypeError);
  });
});
