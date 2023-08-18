import { compile, Key, match, pathToRegexp } from 'path-to-regexp';
import { IStringifyOptions, stringify } from 'qs';

import {
  ExtractParams,
  RouteQuery,
  Prettify,
  CompileArguments,
  MatchOptions,
  DefaultOptions,
  MatchParams,
} from './types';

function stripTrailingSlash(path: string) {
  const trailingSlashIndex = path.search(/\/$/);
  if (trailingSlashIndex > -1) {
    return path.slice(0, trailingSlashIndex);
  }
  return path;
}

class Route<
  TPattern extends string,
  TParams extends object = Prettify<ExtractParams<TPattern>>,
> {
  public readonly pattern: TPattern;
  public readonly regexp: RegExp;
  public readonly keys: Key[];
  private readonly _defaultOptions: DefaultOptions;

  constructor(pattern: TPattern, defaultOptions?: DefaultOptions) {
    this.pattern = pattern;
    this.keys = [];
    this.regexp = pathToRegexp(this.pattern, this.keys);
    this._defaultOptions = defaultOptions || {};
  }

  public compile(...args: CompileArguments<TParams>): string {
    const [segments, options] = args;
    const { params, query, fragment, base } = segments || {};
    let url = '';
    url = compile<TParams>(this.pattern, {
      ...this._defaultOptions.compile,
      ...options?.compile,
    })(params as TParams);
    url = Route.resolveQuery(url, query, {
      ...this._defaultOptions.qs,
      ...options?.qs,
    });
    url = Route.resolveFragment(url, fragment);
    url = Route.resolveBase(url, base);
    return url;
  }

  public match(
    path: string,
    options?: MatchOptions,
  ): MatchParams<TParams> | false {
    const matched = match<MatchParams<TParams>>(this.pattern, {
      ...this._defaultOptions.match,
      ...options,
    })(path);
    return matched ? matched.params : false;
  }

  public isSame(
    route: Route<string, object>,
  ): route is Route<TPattern, TParams> {
    return this.pattern === route.pattern;
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
