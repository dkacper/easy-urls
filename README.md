# Easy URLs

Easy and typesafe URL handling. TypeScript focused lib for composing and matching URLs. Built on top of [path-to-regexp](https://github.com/pillarjs/path-to-regexp) and [qs](https://github.com/ljharb/qs).

## `compile`

Basic usage with no params.

```ts
const route = new Route('/path'); // Route<"/path", {}>
route.compile();
// => '/path'
```

Route with path params. While compiling the route it checks if all params have been passed, otherwise raises a TypeError.

```ts
const route = new Route('/path/:id'); // Route<"/path/:id", { id: RouteParam }>
route.compile(); // 🚫 TypeError: Expected 1-2 arguments, but got 0.
route.compile({}); // 🚫 TypeError: Property 'params' is missing in type '{}'...
route.compile({ params: {} }); // 🚫 TypeError: Property 'id' is missing in type '{}' but required in type '{ id: RouteParam; }'.
route.compile({ params: { id: '123' } }); // ✅
// => '/path/123'
```

When route params are optional no TypeError will be raised.

```ts
const route = new Route('/path/:segments*/:id?'); // Route<"/path/:segments*/:id?", { id?: RouteParam; segments?: RouteParam | RouteParam[] }>
route.compile(); // ✅
// => '/path'
route.compile({}); // ✅
// => '/path'
route.compile({ params: {} }); // ✅
// => '/path'
route.compile({ params: { id: '123' } }); // ✅
// => '/path/123'
route.compile({ params: { id: '123', segments: ['x', 'y', 'z'] } }); // ✅
// => '/path/x/y/z/123'
```

Multiple params can be provided.

```ts
const route = new Route('/path/:first_id/next-path/:second_id'); // Route<"/path/:first_id/next-path/:second_id", { first_id: RouteParam; second_id: RouteParam }>
route.compile({ params: { first_id: '1', second_id: '2' } });
// => '/path/1/next-path/2'
```

Options

```ts
const route = new Route('/path'); // Route<"/path", {}>
route.compile({ base: 'http://localhost:3000' });
// => 'http://localhost:3000/path'
```

```ts
const route = new Route('/path'); // Route<"/path", {}>
route.compile({ query: { q: 'search' } });
// => '/path?q=search'
```

```ts
const route = new Route('/path'); // Route<"/path", {}>
route.compile({ fragment: 'section' });
// => '/path#section'
```

## `match`

Match path params in a given URL.

```ts
const route = new Route('/path/:id'); // Route<"/path/:id", { id: RouteParam }>
route.match('/path/123');
// => { id: '123' }
```

```ts
const route = new Route('/path/:id'); // Route<"/path/:id", { id: RouteParam }>
route.match('/wrong/path');
// => false
```
