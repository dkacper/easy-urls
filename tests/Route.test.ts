import Route from '../src';

test('Should throw an error when params required but not given', () => {
  const pattern = '/product/:segment+/:slug';
  const route = new Route(pattern);

  // @ts-expect-error compile expects arguments
  expect(() => route.compile()).toThrow(TypeError);
});

test('Should not throw an error when optional params not given', () => {
  const pattern = '/product/:segment*/:slug?';
  const route = new Route(pattern);

  expect(() => route.compile()).not.toThrow(TypeError);
});

test('Should compile URL with no params using pattern', () => {
  const pattern = '/example/test/path';
  const route = new Route(pattern);
  expect(route.compile()).toBe(pattern);
});

test('Should resolve path with params', () => {
  const pattern = '/example/:test/:id';
  const route = new Route(pattern);
  expect(route.compile({ params: { test: '432', id: '876' } })).toBe(
    '/example/432/876',
  );
});

test('Should resolve params and keep trailing slash', () => {
  const pattern = '/example/path/:id/';
  const route = new Route(pattern);
  expect(route.compile({ params: { id: '876' } })).toBe('/example/path/876/');
});

test('Should compile URL without params but with query, fragment and base', () => {
  const pattern = '/example/test/path';
  const route = new Route(pattern);
  expect(
    route.compile({
      query: { q: 'search_value' },
      fragment: 'test_hash',
      base: 'http://domain.com',
    }),
  ).toBe('http://domain.com/example/test/path?q=search_value#test_hash');
});

test('Should compile URL with params, query, fragment and base', () => {
  const pattern = '/test/path/:id';
  const route = new Route(pattern);
  expect(
    route.compile({
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
    route.compile({
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

test('should return empty object when route has no params', () => {
  const pattern = '/path/without/params';
  const route = new Route(pattern);
  const match = route.match(pattern);
  expect(match).toEqual({});
});

test('should resolve optional param', () => {
  const pattern = '/example/:test?/optional';
  const route = new Route(pattern);
  expect(route.compile({ params: { test: 'hello' } })).toBe(
    '/example/hello/optional',
  );
});

test('should resolve URL when optional param omitted', () => {
  const pattern = '/example/:test?/optional';
  const route = new Route(pattern);
  expect(route.compile()).toBe('/example/optional');
});

test('should resolve optional last param', () => {
  const pattern = '/example/hello/:last?';
  const route = new Route(pattern);
  expect(route.compile({ params: { last: 'optional' } })).toBe(
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
  const match = route.compile({
    params: { id: '321' },
    query: { q: 'search_value' },
  });
  expect(match).toBe('/example/path/321?q=search_value');
});

test('should resolve optional param', () => {
  const pattern = '/example/:test?/optional';
  const route = new Route(pattern);
  expect(route.compile({ params: { test: 'hello' } })).toBe(
    '/example/hello/optional',
  );
});

test('should resolve URL when optional param omitted', () => {
  const pattern = '/example/:test?/optional';
  const route = new Route(pattern);
  expect(route.compile()).toBe('/example/optional');
});

test('should resolve optional last param', () => {
  const pattern = '/example/hello/:last?';
  const route = new Route(pattern);
  expect(route.compile({ params: { last: 'optional' } })).toBe(
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
  const match = route.compile({
    params: { id: '321' },
    query: { q: 'search_value' },
  });
  expect(match).toBe('/example/path/321?q=search_value');
});

test('should compare the same routes', () => {
  const pattern = '/example/path/:id?';
  const route1 = new Route(pattern);
  const route2 = new Route(pattern);

  expect(route1.isSame(route2)).toBe(true);
});

test('should distinguish different routes', () => {
  const pattern1 = '/first/path/:id';
  const pattern2 = '/second/path/:slug';
  const route1 = new Route(pattern1);
  const route2 = new Route(pattern2);

  expect(route1.isSame(route2)).toBe(false);
});
