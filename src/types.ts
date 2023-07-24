import { IStringifyOptions } from 'qs';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type NoParams = [never];
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

export type ComposeSegments<TParams extends object | NoParams> =
  TParams extends NoParams
    ? {
        params?: TParams;
        query?: RouteQuery;
        fragment?: string;
        base?: string;
        options?: RouteOptions;
      }
    : {
        params: TParams;
        query?: RouteQuery;
        fragment?: string;
        base?: string;
        options?: RouteOptions;
      };

export interface IRoute<TParams extends object | NoParams> {
  compose(segments: ComposeSegments<TParams>): string;
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

export type RouteParams<TParams extends unknown[]> = TParams extends [
  infer Param,
  ...infer RestParams,
]
  ? Param extends `${infer OptionalParam}?`
    ? { [key in OptionalParam]?: string | number } & RouteParams<RestParams>
    : Param extends string
    ? { [key in Param]: string | number } & RouteParams<RestParams>
    : never
  : {};
