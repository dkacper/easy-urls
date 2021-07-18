import parseUrl from './parseUrl';
import matchUrl from './parseUrl';

test('should match query params in url with path, query, fragment and base', () => {
  const grammar = '/some/path';
  const url = 'https://example.com/some/path?q=search_value&z=test#hash';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: { q: 'search_value', z: 'test' },
  });
});

test('should match query params in url with path, query and fragment', () => {
  const grammar = '/some/path';
  const url = '/some/path?q=search_value#hash';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: { q: 'search_value' },
  });
});

test('should match query params in url with path and query', () => {
  const grammar = '/some/path';
  const url = '/some/path?q=search_value';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: { q: 'search_value' },
  });
});

test('should match multiple query params in url with path and query', () => {
  const grammar = '/some/path';
  const url = '/some/path?q=search_value&z=test';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: { q: 'search_value', z: 'test' },
  });
});

test('should match query params in query only', () => {
  const grammar = '';
  const url = '?q=search_value';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: { q: 'search_value' },
  });
});

test.skip('should match query params in query only without question mark', () => {
  const grammar = '';
  const url = 'q=search_value';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: { q: 'search_value' },
  });
});

test('should not match query when not present in the url with path, base and fragment', () => {
  const grammar = '/some/path';
  const url = 'https://example.com/some/path#hash';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: {},
  });
});

test('should not match query when not present in the url with path and base', () => {
  const grammar = '/some/path';
  const url = 'https://example.com/some/path';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: {},
  });
});

test('should not match query when not present in the url with only path', () => {
  const grammar = '/some/path';
  const url = '/some/path';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: {},
  });
});

test('should not match query when not present in the url with only base', () => {
  const grammar = '/some/path';
  const url = 'https://example.com/';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: {},
  });
});

test('should not match query when not present in the url with only fragment', () => {
  const grammar = '/some/path';
  const url = '#hash';
  expect(parseUrl(grammar, url)).toEqual({
    params: {},
    query: {},
  });
});
