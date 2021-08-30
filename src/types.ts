import { IStringifyOptions } from 'qs';

export type NoParams = undefined;
export type RouteParams = Record<string, string | number | undefined>;
export type RouteQuery = {
  [key: string]:
    | undefined
    | boolean
    | boolean[]
    | string
    | string[]
    | number
    | number[]
    | RouteQuery
    | RouteQuery[];
};

export interface RouteOptions {
  qs?: IStringifyOptions;
}

export interface RouteSegmentsOptional {
  params?: NoParams;
  query?: RouteQuery;
  fragment?: string;
  base?: string;
}

export interface RouteSegments<TParams extends RouteParams | NoParams> {
  params: TParams;
  query?: RouteQuery;
  fragment?: string;
  base?: string;
}

export type RouteComposeArgs<TParams extends RouteParams | NoParams> =
  TParams extends RouteParams
    ? [segments: RouteSegments<TParams>, options?: RouteOptions]
    : [segments?: RouteSegmentsOptional, options?: RouteOptions];

export interface IRoute<TParams extends RouteParams | NoParams> {
  compose(...args: RouteComposeArgs<TParams>): string;
  match(path: string): TParams | false;
}

export type ExtractParams<Pattern extends string> =
  Pattern extends `${infer Head}/${infer Tail}`
    ? Head extends `:${infer Param}`
      ? [Param, ...ExtractParams<Tail>]
      : ExtractParams<Tail>
    : Pattern extends `:${infer LastParam}`
    ? [LastParam]
    : [];
