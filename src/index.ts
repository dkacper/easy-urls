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
  RouteComposeArgs,
  ExtractParams,
  RouteQuery,
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
  TParams extends RouteParams | NoParams = ExtractParams<TPattern> extends []
    ? NoParams
    : Record<ExtractParams<TPattern>[number], string>,
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

  public compose(...args: RouteComposeArgs<TParams>): string {
    const [segments, options] = args;
    let url: string = this.pattern;

    if (segments?.params && !Array.isArray(segments?.params)) {
      url = this._resolvePath(segments?.params);
    }
    url = Route.resolveQuery(url, segments?.query, options?.qs);
    url = Route.resolveFragment(url, segments?.fragment);
    url = Route.resolveBase(url, segments?.base);

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
