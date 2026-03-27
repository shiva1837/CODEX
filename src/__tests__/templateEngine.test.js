'use strict';

const { render, buildPage, extractKeys } = require('../templateEngine');

describe('templateEngine.render', () => {
  // --- Happy path ---
  test('replaces a single placeholder', () => {
    expect(render('Hello, {{name}}!', { name: 'World' })).toBe('Hello, World!');
  });

  test('replaces multiple placeholders', () => {
    expect(render('{{greeting}}, {{name}}!', { greeting: 'Hi', name: 'Alice' })).toBe('Hi, Alice!');
  });

  test('replaces the same placeholder appearing more than once', () => {
    expect(render('{{x}} + {{x}} = ?', { x: '1' })).toBe('1 + 1 = ?');
  });

  test('coerces non-string data values to string', () => {
    expect(render('Value: {{n}}', { n: 42 })).toBe('Value: 42');
  });

  test('leaves template unchanged when data is empty object', () => {
    expect(render('no placeholders here', {})).toBe('no placeholders here');
  });

  test('unknown placeholders are replaced with empty string', () => {
    expect(render('Hello, {{unknown}}!', {})).toBe('Hello, !');
  });

  // --- Conditional blocks ---
  test('renders content inside {{#if key}} when key is truthy', () => {
    expect(render('A{{#if show}} visible{{/if}}B', { show: true })).toBe('A visibleB');
  });

  test('omits content inside {{#if key}} when key is falsy', () => {
    expect(render('A{{#if show}} visible{{/if}}B', { show: false })).toBe('AB');
  });

  test('conditional block works with undefined key (falsy)', () => {
    expect(render('{{#if missing}}text{{/if}}', {})).toBe('');
  });

  test('variable substitution still works after conditional processing', () => {
    expect(render('{{#if ok}}{{msg}}{{/if}}', { ok: true, msg: 'yes' })).toBe('yes');
  });

  // --- Error handling ---
  test('throws TypeError when template is not a string', () => {
    expect(() => render(123, {})).toThrow(TypeError);
  });

  test('throws TypeError when data is null', () => {
    expect(() => render('t', null)).toThrow(TypeError);
  });

  test('throws TypeError when data is an array', () => {
    expect(() => render('t', [])).toThrow(TypeError);
  });

  test('throws TypeError when data is a primitive', () => {
    expect(() => render('t', 'string')).toThrow(TypeError);
  });
});

describe('templateEngine.buildPage', () => {
  const sections = {
    head: '<title>{{title}}</title>',
    header: '<h1>{{title}}</h1>',
    body: '<p>{{body}}</p>',
    footer: '<footer>{{author}}</footer>',
  };
  const data = { title: 'Home', body: 'Welcome', author: 'Alice' };

  test('returns a valid HTML document string', () => {
    const html = buildPage(sections, data);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('</html>');
  });

  test('injects rendered head section inside <head>', () => {
    const html = buildPage(sections, data);
    expect(html).toContain('<head><title>Home</title></head>');
  });

  test('injects rendered body sections inside <body>', () => {
    const html = buildPage(sections, data);
    expect(html).toContain('<h1>Home</h1>');
    expect(html).toContain('<p>Welcome</p>');
    expect(html).toContain('<footer>Alice</footer>');
  });

  test('works with partial sections (only body provided)', () => {
    const html = buildPage({ body: '<p>{{msg}}</p>' }, { msg: 'hi' });
    expect(html).toContain('<p>hi</p>');
    expect(html).toContain('<!DOCTYPE html>');
  });

  test('works with empty sections object', () => {
    const html = buildPage({}, {});
    expect(html).toContain('<!DOCTYPE html>');
  });

  test('throws TypeError when sections is not an object', () => {
    expect(() => buildPage(null, {})).toThrow(TypeError);
    expect(() => buildPage('str', {})).toThrow(TypeError);
  });
});

describe('templateEngine.extractKeys', () => {
  test('returns empty array for template with no placeholders', () => {
    expect(extractKeys('no placeholders')).toEqual([]);
  });

  test('extracts a single key', () => {
    expect(extractKeys('{{name}}')).toEqual(['name']);
  });

  test('extracts multiple distinct keys', () => {
    const keys = extractKeys('{{a}} {{b}} {{c}}');
    expect(keys).toEqual(expect.arrayContaining(['a', 'b', 'c']));
    expect(keys).toHaveLength(3);
  });

  test('deduplicates repeated keys', () => {
    expect(extractKeys('{{x}} {{x}}')).toEqual(['x']);
  });

  test('extracts key from conditional block', () => {
    const keys = extractKeys('{{#if show}}text{{/if}}');
    expect(keys).toContain('show');
  });

  test('throws TypeError when template is not a string', () => {
    expect(() => extractKeys(null)).toThrow(TypeError);
    expect(() => extractKeys(42)).toThrow(TypeError);
  });
});
