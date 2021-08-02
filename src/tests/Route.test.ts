import Route from '..';

test('Should compose URL with no params using pattern', () => {
  const pattern = '/example/test/path';
  const url = new Route(pattern);
  expect(url.compose()).toBe(pattern);
});

test('Should resolve path with params', () => {
  const pattern = '/example/:test/path/:id';
  const url = new Route(pattern);
  expect(url.compose({ params: { test: '432', id: '876' } })).toBe(
    '/example/432/path/876',
  );
});

test('Should compose URL without params but with query, fragment and base', () => {
  const pattern = '/example/test/path';
  const url = new Route(pattern);
  expect(
    url.compose({
      query: { q: 'search_value' },
      fragment: 'test_hash',
      base: 'http://domain.com',
    }),
  ).toBe('http://domain.com/example/test/path?q=search_value#test_hash');
});

test('Should compose URL with params, query, fragment and base', () => {
  const pattern = '/example/test/path/:id';
  const url = new Route(pattern);
  expect(
    url.compose({
      params: { id: '123' },
      query: { q: 'search_value' },
      fragment: 'test_hash',
      base: 'http://domain.com',
    }),
  ).toBe('http://domain.com/example/test/path/123?q=search_value#test_hash');
});

test('Should resolve base with trailing slash', () => {
  const pattern = '/example/test/path/:id';
  const url = new Route(pattern);
  expect(
    url.compose({
      params: { id: '123' },
      base: 'http://domain.com/',
    }),
  ).toBe('http://domain.com/example/test/path/123');
});
