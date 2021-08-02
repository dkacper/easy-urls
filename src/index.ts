import { compile, match, MatchFunction, PathFunction } from 'path-to-regexp';

import { resolveBase, resolveFragment, resolveQuery } from './resolvers';
import {
  ExtractParam,
  RouteComposeArgs,
  URLParams,
  URLSegmentsArgs,
} from './types';

function isParamSegment<TParams extends URLParams>(
  item: unknown,
): item is URLSegmentsArgs<TParams> {
  return (
    typeof item === 'object' &&
    item !== null &&
    Object.prototype.hasOwnProperty.call(item, 'params')
  );
}

class Route<
  TPattern extends string,
  TParams extends URLParams | null = ExtractParam<TPattern> extends []
    ? null
    : Record<ExtractParam<TPattern>[number], string>,
> {
  readonly pattern: TPattern;
  private _pathResolver: PathFunction;
  private _matcher: MatchFunction<TParams extends URLParams ? TParams : never>;

  constructor(pattern: TPattern) {
    this.pattern = pattern;
    this._pathResolver = compile(pattern);
    this._matcher = match(pattern);
  }

  public compose(...args: RouteComposeArgs<TParams>): string {
    const [segments, options] = args;
    let url: string = this.pattern;

    if (isParamSegment(segments)) {
      url = this._pathResolver(segments?.params);
    }
    url = resolveQuery(url, segments?.query, options?.qs);
    url = resolveFragment(url, segments?.fragment);
    url = resolveBase(url, segments?.base);

    return url;
  }

  public match(path: string): TParams | false {
    const matched = this._matcher(path);
    return matched ? matched.params : false;
  }
}

export default Route;
