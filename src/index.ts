import {
  compile,
  Key,
  match,
  MatchFunction,
  PathFunction,
  pathToRegexp,
} from 'path-to-regexp';
import { IStringifyOptions, stringify } from 'qs';

import {
  IRoute,
  NoParams,
  RouteParams,
  ExtractParams,
  RouteQuery,
  Prettify,
  ComposeSegments,
} from './types';

function stripTrailingSlash(path: string) {
  const trailingSlashIndex = path.search(/\/$/);
  if (trailingSlashIndex > -1) {
    return path.substring(0, trailingSlashIndex);
  }
  return path;
}

class Route<
  TPattern extends string,
  TParams extends object = ExtractParams<TPattern> extends []
    ? NoParams
    : Prettify<RouteParams<ExtractParams<TPattern>>>,
> implements IRoute<TParams>
{
  readonly pattern: TPattern;
  readonly regexp: RegExp;
  private _keys: Key[];
  private _resolvePath: PathFunction<TParams>;
  private _match: MatchFunction<TParams>;

  constructor(pattern: TPattern) {
    this.pattern = pattern;
    this._resolvePath = compile(pattern);
    this._match = match(pattern);
    this._keys = [];
    this.regexp = pathToRegexp(this.pattern, this._keys);
  }

  public compose(segments?: ComposeSegments<TParams>): string {
    const { params, query, fragment, base, options } = segments || {};
    let url = '';
    url = this._resolvePath(params as TParams);
    url = Route.resolveQuery(url, query, options?.qs);
    url = Route.resolveFragment(url, fragment);
    url = Route.resolveBase(url, base);
    return url;
  }

  public match(path: string): TParams | false {
    if (this._keys.length) {
      const matched = this._match(path);
      return matched ? matched.params : false;
    }
    return false;
  }

  public static resolveBase(url: string, base?: string): string {
    if (!base) {
      return url;
    }
    return `${stripTrailingSlash(base)}${url}`;
  }

  public static resolveFragment(url: string, fragment?: string): string {
    if (!fragment) {
      return url;
    }
    return `${url}#${fragment}`;
  }

  public static resolveQuery<TQuery extends RouteQuery>(
    url: string,
    query?: TQuery,
    options?: IStringifyOptions,
  ): string {
    if (!query) {
      return url;
    }
    const qsOptions = { addQueryPrefix: true, ...options };
    return `${url}${stringify(query, qsOptions)}`;
  }
}

export default Route;
