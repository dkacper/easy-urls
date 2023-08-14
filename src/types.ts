import {
  ParseOptions,
  RegexpToFunctionOptions,
  TokensToFunctionOptions,
  TokensToRegexpOptions,
} from 'path-to-regexp';
import { IStringifyOptions } from 'qs';

export type RouteParam = string | number | boolean | null | undefined;

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
  compile?: ParseOptions & TokensToFunctionOptions;
}

export type MatchOptions = ParseOptions &
  TokensToRegexpOptions &
  RegexpToFunctionOptions;

export interface DefaultOptions extends RouteOptions {
  match?: MatchOptions;
}

type RequireAtLeastOne<
  TObject,
  Keys extends keyof TObject = keyof TObject,
> = Pick<TObject, Exclude<keyof TObject, Keys>> &
  {
    [TKey in Keys]-?: Required<Pick<TObject, TKey>> &
      Partial<Pick<TObject, Exclude<Keys, TKey>>>;
  }[Keys];

export type ExtractParams<TPattern extends string> =
  TPattern extends `${infer Head}/${infer Tail}`
    ? Head extends `:${infer Parameter}`
      ? Parameter extends `${infer OptionalPrameter}?`
        ? { [TKey in OptionalPrameter]?: RouteParam } & ExtractParams<Tail>
        : Parameter extends `${infer OptionalSegment}*`
        ? {
            [TKey in OptionalSegment]?: RouteParam | RouteParam[];
          } & ExtractParams<Tail>
        : Parameter extends `${infer Segment}+`
        ? {
            [TKey in Segment]: RouteParam | RouteParam[];
          } & ExtractParams<Tail>
        : { [TKey in Parameter]: RouteParam } & ExtractParams<Tail>
      : ExtractParams<Tail>
    : TPattern extends `:${infer LastParameter}`
    ? LastParameter extends `${infer OptionalPrameter}?`
      ? { [TKey in OptionalPrameter]?: RouteParam }
      : LastParameter extends `${infer OptionalSegment}*`
      ? { [TKey in OptionalSegment]?: RouteParam | RouteParam[] }
      : LastParameter extends `${infer Segment}+`
      ? { [TKey in Segment]: RouteParam | RouteParam[] }
      : { [TKey in LastParameter]: RouteParam }
    : {};

export type CompileArguments<TParams extends object> = TParams extends Record<
  string,
  never
>
  ? [
      segments?: {
        query?: RouteQuery;
        fragment?: string;
        base?: string;
      },
      options?: RouteOptions,
    ]
  : TParams extends RequireAtLeastOne<TParams>
  ? [
      segments: {
        params: TParams;
        query?: RouteQuery;
        fragment?: string;
        base?: string;
      },
      options?: RouteOptions,
    ]
  : [
      segments?: {
        params?: TParams;
        query?: RouteQuery;
        fragment?: string;
        base?: string;
      },
      options?: RouteOptions,
    ];

export type MatchParams<
  TParams extends object,
  TKeys extends keyof TParams = keyof TParams,
> = {
  [TKey in TKeys]: string;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
