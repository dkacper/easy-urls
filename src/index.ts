import { compile, match, MatchFunction, PathFunction } from 'path-to-regexp';

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
  private _resolvePath: PathFunction;
  private _match: MatchFunction<TParams extends RouteParams ? TParams : never>;

  constructor(pattern: TPattern) {
    this.pattern = pattern;
    this._resolvePath = compile(pattern);
    this._match = match(pattern);
  }

  public compose(...args: RouteComposeArgs<TParams>): string {
    const [segments, options] = args;
    let url: string = this.pattern;

    if (segments?.params) {
      url = this._resolvePath(segments?.params);
    }
    url = resolveQuery(url, segments?.query, options?.qs);
    url = resolveFragment(url, segments?.fragment);
    url = resolveBase(url, segments?.base);

    return url;
  }

  public match(path: string): TParams | false {
    const matched = this._match(path);
    return matched ? matched.params : false;
  }
}

export default Route;
