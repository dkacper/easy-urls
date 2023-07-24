import Route from '../src';

test('Should compose URL with no params using pattern', () => {
  const pattern = '/example/test/path';
  const route = new Route(pattern);
  expect(route.compose()).toBe(pattern);
});

test('Should resolve path with params', () => {
  const pattern = '/example/:test/:id';
  const route = new Route(pattern);
  expect(route.compose({ params: { test: '432', id: '876' } })).toBe(
    '/example/432/876',
  );
});

test('Should resolve params and keep trailing slash', () => {
  const pattern = '/example/path/:id/';
  const route = new Route(pattern);
  expect(route.compose({ params: { id: '876' } })).toBe('/example/path/876/');
});

test('Should compose URL without params but with query, fragment and base', () => {
  const pattern = '/example/test/path';
  const route = new Route(pattern);
  expect(
    route.compose({
      query: { q: 'search_value' },
      fragment: 'test_hash',
      base: 'http://domain.com',
    }),
  ).toBe('http://domain.com/example/test/path?q=search_value#test_hash');
});

test('Should compose URL with params, query, fragment and base', () => {
  const pattern = '/test/path/:id';
  const route = new Route(pattern);
  expect(
    route.compose({
      params: { id: '123' },
      query: { q: 'search_value' },
      fragment: 'test_hash',
      base: 'http://example.com',
    }),
  ).toBe('http://example.com/test/path/123?q=search_value#test_hash');
});

test('Should resolve base with trailing slash', () => {
  const pattern = '/example/test/path/:id';
  const route = new Route(pattern);
  expect(
    route.compose({
      params: { id: '123' },
      base: 'http://domain.com/',
    }),
  ).toBe('http://domain.com/example/test/path/123');
});

test('Should match route params', () => {
  const pattern = '/example/:test/path/:id';
  const route = new Route(pattern);
  const match = route.match('/example/987/path/321');
  expect(match).toEqual({ id: '321', test: '987' });
});

test('should return false if no match', () => {
  const pattern = '/example/:test';
  const route = new Route(pattern);
  const match = route.match('/not/matching/path');
  expect(match).toBe(false);
});

test('should return false if route has no params', () => {
  const pattern = '/path/without/params';
  const route = new Route(pattern);
  const match = route.match(pattern);
  expect(match).toBe(false);
});

test('should resolve optional param', () => {
  const pattern = '/example/:test?/optional';
  const route = new Route(pattern);
  expect(route.compose({ params: { test: 'hello' } })).toBe(
    '/example/hello/optional',
  );
});

test('should resolve URL when optional param omitted', () => {
  const pattern = '/example/:test?/optional';
  const route = new Route(pattern);
  expect(route.compose()).toBe('/example/optional');
});

test('should resolve optional last param', () => {
  const pattern = '/example/hello/:last?';
  const route = new Route(pattern);
  expect(route.compose({ params: { last: 'optional' } })).toBe(
    '/example/hello/optional',
  );
});

test('should match optional param', () => {
  const pattern = '/example/:test?/path/:id';
  const route = new Route(pattern);
  const match = route.match('/example/987/path/321');
  expect(match).toEqual({ id: '321', test: '987' });
});

test('should match optional param when ommited', () => {
  const pattern = '/example/:test?/path/:id';
  const route = new Route(pattern);
  const match = route.match('/example/path/321');
  expect(match).toEqual({ id: '321' });
});

test('should match optional last param', () => {
  const pattern = '/example/path/:id?';
  const route = new Route(pattern);
  const match = route.match('/example/path/321');
  expect(match).toEqual({ id: '321' });
});

test('should add querysting when optional last param', () => {
  const pattern = '/example/path/:id?';
  const route = new Route(pattern);
  const match = route.compose({
    params: { id: '321' },
    query: { q: 'search_value' },
  });
  expect(match).toBe('/example/path/321?q=search_value');
});
