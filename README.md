# Easy URLs

Easy and typesafe URL handling. TypeScript focused lib for composing and matching URLs. Built on top of [path-to-regexp](https://github.com/pillarjs/path-to-regexp) and [qs](https://github.com/ljharb/qs).

## `compile`

Basic usage with no params.

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compile();
// => '/path'
```

Route with path params. While composing TypeScript checks if all params have been passed, otherwise raises an error.

```ts
const route = new Route('/path/:id'); // Route<"/path/:id", Record<"id", string>>
route.compile(); // TS raises an error with a missing `id`
route.compile({ params: { id: '123' } }); // This works
// => '/path/123'
```

Multiple params can be provided.

```ts
const route = new Route('/path/:first_id/next-path/:second_id'); // Route<"/path/:first_id/next-path/:second_id", Record<"first_id" | "second_id", string>>
route.compile({ params: { first_id: '1', second_id: '2' } });
// => '/path/1/next-path/2'
```

Options

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compile({ base: 'http://localhost:3000' });
// => 'http://localhost:3000/path'
```

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compile({ query: { q: 'search' } });
// => '/path?q=search'
```

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compile({ fragment: 'section' });
// => '/path#section'
```

## `match`

Match path params in a given URL.

```ts
const route = new Route('/path/:id'); // Route<"/path/:id", Record<"id", string>>
route.match('/path/123');
// => { id: '123' }
```

```ts
const route = new Route('/path/:id'); // Route<"/path/:id", Record<"id", string>>
route.match('/wrong/path');
// => false
```
