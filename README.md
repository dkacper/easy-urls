# Easy URLs

Easy and typesafe URL handling. TypeScript focused lib for composing and matching URLs. Built on top of [path-to-regexp](https://github.com/pillarjs/path-to-regexp) and [qs](https://github.com/ljharb/qs).

## `compose`

Basic usage with no params.

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compose();
// => '/path'
```

Route with path params. While composing TypeScript checks if all params have been passed, otherwise raises an error.

```ts
const route = new Route('/path/:id'); // Route<"/path/:id", Record<"id", string>>
route.compose(); // TS raises an error with a missing `id`
route.compose({ params: { id: '123' } }); // This works
// => '/path/123'
```

Multiple params can be provided.

```ts
const route = new Route('/path/:first_id/next-path/:second_id'); // Route<"/path/:first_id/next-path/:second_id", Record<"first_id" | "second_id", string>>
route.compose({ params: { first_id: '1', second_id: '2' } });
// => '/path/1/next-path/2'
```

Options

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compose({ base: 'http://localhost:3000' });
// => 'http://localhost:3000/path'
```

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compose({ query: { q: 'search' } });
// => '/path?q=search'
```

```ts
const route = new Route('/path'); // Route<"/path", NoParams>
route.compose({ fragment: 'section' });
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
