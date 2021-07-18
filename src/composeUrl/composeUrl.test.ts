import composeUrl from './composeUrl';

// params segment
test('should return reversed grammar when params are optional and not passed', () => {
  const grammar = '/some/path/with(/:param)';
  expect(composeUrl(grammar, {})).toBe('/some/path/with');
});

test('should add params whenever you like', () => {
  const grammar = '/some/path/with(/:param)(/?q=:search)#:hash';
  expect(
    composeUrl(grammar, {
      params: {
        param: '123',
        search: 'sth',
        hash: 'fragment',
      },
    }),
  ).toBe('/some/path/with/123/?q=sth#fragment');
});

//  base segment
test('should strip base trailing slash if any ', () => {
  const grammar = '/some/path';
  const base = 'https://example.base.com';
  expect(composeUrl(grammar, { base })).toBe(
    'https://example.base.com/some/path',
  );
});

test('should add base before the url', () => {
  const grammar = '/some/path';
  const base = 'https://example.base.com';
  expect(composeUrl(grammar, { base })).toBe(
    'https://example.base.com/some/path',
  );
});

// query segment
test('should add given key value pairs as query string', () => {
  const grammar = '/some/path';
  const query = { q: 'search_value', z: 'other_value' };
  expect(composeUrl(grammar, { query })).toBe(
    '/some/path?q=search_value&z=other_value',
  );
});

test('should add only one question mark before query string', () => {
  const grammar = '/some/path';
  const query = { q: 'search_value' };
  const options = { addQueryPrefix: true };
  expect(composeUrl(grammar, { query }, { qs: options })).toBe(
    '/some/path?q=search_value',
  );
});

test('should remove question mark before query string', () => {
  const grammar = '';
  const query = { q: 'search_value' };
  const options = { addQueryPrefix: false };
  expect(composeUrl(grammar, { query }, { qs: options })).toBe(
    'q=search_value',
  );
});

// fragment segment
test('should add fragment at the very and of a URL', () => {
  const grammar = '/some/path';
  const query = { q: 'search_value' };
  const fragment = 'hash-to-resource';
  expect(composeUrl(grammar, { fragment, query })).toBe(
    '/some/path?q=search_value#hash-to-resource',
  );
});
