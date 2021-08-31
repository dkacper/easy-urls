import {
  compile,
  Key,
  match,
  MatchFunction,
  PathFunction,
  pathToRegexp,
} from 'path-to-regexp';

import { resolveBase, resolveFragment, resolveQuery } from './resolvers';
import {
  IRoute,
  NoParams,
  RouteParams,
  RouteComposeArgs,
  ExtractParams,
} from './types';

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
    url = resolveQuery(url, segments?.query, options?.qs);
    url = resolveFragment(url, segments?.fragment);
    url = resolveBase(url, segments?.base);

    return url;
  }

  public match(path: string): TParams | false {
    if (this._keys.length) {
      const matched = this._match(path);
      return matched ? matched.params : false;
    }
    return false;
  }
}

export default Route;
