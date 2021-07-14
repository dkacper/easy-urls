import Route from 'route-parser';
import queryString from 'query-string'

export type URLParams = Record<string, string | number | undefined>;
export type URLQuery = queryString.ParsedQuery<string | number | undefined>;
export interface URLOptions {
  params?: URLParams;
  query?: URLQuery;
}

export function resolveParams <TParams extends URLParams>(
  path: string,
  params: TParams,
): string {
  const route = new Route<TParams>(path);
  const url = route.reverse(params);
  return url || '';
};

export function resolveQuery <TQuery extends URLQuery>(
  url: string,
  query: TQuery,
): string {
  return query ? `${url}?${queryString.stringify(query)}` : url;
};

export function composeUrl (path: string, options: URLOptions): string {
  const { query, params = {} } = options;
  let url = resolveParams(path, params);
  if (query) {
    url = resolveQuery(url, query);
  }
  return url;
};

export function matchUrl(path?: string, pathname?: string): Record<string, string> | false {
  if (!path || !pathname) {
    return false;
  }
  const route = new Route(path);
  return route.match(pathname);
};
