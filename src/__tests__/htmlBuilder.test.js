'use strict';

const { escapeHtml, attrsToString, tag, ul, anchor, img } = require('../htmlBuilder');

describe('htmlBuilder.escapeHtml', () => {
  test('escapes ampersand', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });

  test('escapes less-than', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  test('escapes double quotes', () => {
    expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;');
  });

  test('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  test('returns unchanged string when no special chars', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  test('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  test('coerces non-string input via String()', () => {
    expect(escapeHtml(42)).toBe('42');
    expect(escapeHtml(null)).toBe('null');
  });

  test('escapes all special chars in one string', () => {
    expect(escapeHtml('<a href="x" data-v=\'y\'>&')).toBe(
      '&lt;a href=&quot;x&quot; data-v=&#39;y&#39;&gt;&amp;'
    );
  });
});

describe('htmlBuilder.attrsToString', () => {
  test('returns empty string for empty object', () => {
    expect(attrsToString({})).toBe('');
  });

  test('renders a simple attribute', () => {
    expect(attrsToString({ id: 'main' })).toBe(' id="main"');
  });

  test('renders multiple attributes', () => {
    const str = attrsToString({ id: 'main', class: 'container' });
    expect(str).toContain(' id="main"');
    expect(str).toContain(' class="container"');
  });

  test('renders boolean true as bare attribute name', () => {
    expect(attrsToString({ disabled: true })).toBe(' disabled');
  });

  test('omits attributes with value false', () => {
    expect(attrsToString({ hidden: false })).toBe('');
  });

  test('omits attributes with value null', () => {
    expect(attrsToString({ title: null })).toBe('');
  });

  test('omits attributes with value undefined', () => {
    expect(attrsToString({ 'aria-label': undefined })).toBe('');
  });

  test('escapes attribute values', () => {
    expect(attrsToString({ href: '"danger"' })).toContain('&quot;danger&quot;');
  });

  test('returns empty string for null input', () => {
    expect(attrsToString(null)).toBe('');
  });
});

describe('htmlBuilder.tag', () => {
  test('creates a simple element', () => {
    expect(tag('p', {}, 'Hello')).toBe('<p>Hello</p>');
  });

  test('creates element with attributes', () => {
    expect(tag('a', { href: 'https://example.com' }, 'Click')).toBe(
      '<a href="https://example.com">Click</a>'
    );
  });

  test('creates a void/self-closing element (no inner text)', () => {
    expect(tag('br')).toBe('<br>');
  });

  test('creates <img> as void element', () => {
    expect(tag('img', { src: 'a.png', alt: 'A' })).toBe('<img src="a.png" alt="A">');
  });

  test('ignores inner content for void elements', () => {
    expect(tag('input', { type: 'text' }, 'ignored')).toBe('<input type="text">');
  });

  test('normalises tag name to lowercase', () => {
    expect(tag('DIV', {}, 'content')).toBe('<div>content</div>');
  });

  test('allows nested tags in inner HTML', () => {
    const inner = tag('span', {}, 'hi');
    expect(tag('div', {}, inner)).toBe('<div><span>hi</span></div>');
  });

  test('throws TypeError for empty tag name', () => {
    expect(() => tag('', {}, '')).toThrow(TypeError);
  });

  test('throws TypeError for non-string tag name', () => {
    expect(() => tag(null, {}, '')).toThrow(TypeError);
  });
});

describe('htmlBuilder.ul', () => {
  test('creates an unordered list with items', () => {
    const html = ul(['Apple', 'Banana', 'Cherry']);
    expect(html).toBe('<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>');
  });

  test('escapes special chars in items', () => {
    const html = ul(['<b>bold</b>']);
    expect(html).toContain('&lt;b&gt;bold&lt;/b&gt;');
  });

  test('applies attributes to the <ul> element', () => {
    const html = ul(['item'], { class: 'nav' });
    expect(html).toBe('<ul class="nav"><li>item</li></ul>');
  });

  test('returns an empty <ul> for an empty array', () => {
    expect(ul([])).toBe('<ul></ul>');
  });

  test('coerces non-string items to string', () => {
    const html = ul([1, 2, 3]);
    expect(html).toBe('<ul><li>1</li><li>2</li><li>3</li></ul>');
  });

  test('throws TypeError for non-array input', () => {
    expect(() => ul('not an array')).toThrow(TypeError);
    expect(() => ul(null)).toThrow(TypeError);
  });
});

describe('htmlBuilder.anchor', () => {
  test('creates a basic anchor tag', () => {
    expect(anchor('https://example.com', 'Example')).toBe(
      '<a href="https://example.com">Example</a>'
    );
  });

  test('escapes the link text', () => {
    expect(anchor('#', '<Click & go>')).toContain('&lt;Click &amp; go&gt;');
  });

  test('passes extra attributes through', () => {
    const html = anchor('#', 'Nav', { class: 'nav-link', target: '_blank' });
    expect(html).toContain('class="nav-link"');
    expect(html).toContain('target="_blank"');
  });
});

describe('htmlBuilder.img', () => {
  test('creates a basic img tag', () => {
    expect(img('logo.png', 'Logo')).toBe('<img src="logo.png" alt="Logo">');
  });

  test('passes extra attributes through', () => {
    const html = img('x.jpg', 'X', { width: '200', loading: 'lazy' });
    expect(html).toContain('width="200"');
    expect(html).toContain('loading="lazy"');
  });

  test('escapes the alt text', () => {
    expect(img('x.png', '"quoted"')).toContain('alt="&quot;quoted&quot;"');
  });
});
