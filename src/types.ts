import { IStringifyOptions } from 'qs';

export type URLParams = Record<string, string | number | undefined>;

export type URLQuery = {
  [key: string]:
    | undefined
    | boolean
    | boolean[]
    | string
    | string[]
    | number
    | number[]
    | URLQuery
    | URLQuery[];
};

export interface URLOptions {
  qs?: IStringifyOptions;
}

interface URLSegmentsRequired<TParams extends URLParams | null> {
  params: TParams;
}

interface URLSegmentsOptional {
  query?: URLQuery;
  fragment?: string;
  base?: string;
}

interface URLSegments<TParams extends URLParams | null>
  extends URLSegmentsOptional,
    URLSegmentsRequired<TParams> {}

export type URLSegmentsArgs<TParams extends URLParams | null> =
  TParams extends URLParams ? URLSegments<TParams> : URLSegmentsOptional;

export type RouteComposeArgs<TParams extends URLParams | null> =
  TParams extends URLParams
    ? [segments: URLSegmentsArgs<TParams>, options?: URLOptions]
    : [segments?: URLSegmentsArgs<null>, options?: URLOptions];

export type ExtractParam<Pattern extends string> =
  Pattern extends `${infer Head}/${infer Tail}`
    ? Head extends `:${infer Param}`
      ? [Param, ...ExtractParam<Tail>]
      : ExtractParam<Tail>
    : Pattern extends `:${infer LastParam}`
    ? [LastParam]
    : [];
