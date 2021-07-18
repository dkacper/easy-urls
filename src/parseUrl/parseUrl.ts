import Route from 'route-parser';
import { IParseOptions, parse, ParsedQs } from 'qs';

import { extractQueryString } from '../utils';

type UrlParsed<TParseOptions extends IParseOptions> =
  TParseOptions['decoder'] extends never | undefined
    ? {
        params: Record<string, string>;
        query: ParsedQs;
      }
    : {
        params: Record<string, string>;
        query: Record<string, unknown>;
      };

type ParseUrlOptions<TParseOptions extends IParseOptions> = {
  qs: TParseOptions;
};

function parseUrl<TParseOptions extends IParseOptions>(
  grammar: string,
  url: string,
  options?: ParseUrlOptions<TParseOptions>,
): UrlParsed<TParseOptions> {
  const parsed: UrlParsed<TParseOptions> = {
    params: {},
    query: {},
  };

  const querystring = extractQueryString(url);
  const route = new Route(grammar);
  parsed.params = route.match(url) || {};
  parsed.query = parse(querystring, options?.qs);

  return parsed;
}

export default parseUrl;
