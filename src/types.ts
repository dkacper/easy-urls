import qs from 'qs';

export type URLParams = Record<string, string | number | undefined>;
export type URLQuery = qs.ParsedQs;
export interface URLSegments {
  params?: URLParams;
  query?: URLQuery;
  fragment?: string;
  base?: string;
}
export interface ComposeUrlOptions {
  qs: qs.IStringifyOptions;
}
