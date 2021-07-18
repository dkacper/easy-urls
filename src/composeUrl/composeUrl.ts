import { ComposeUrlOptions, URLSegments } from '../types';
import {
  resolveBase,
  resolveFragment,
  resolveParams,
  resolveQuery,
} from '../resolvers';

function composeUrl(
  grammar: string,
  segments: URLSegments,
  options?: ComposeUrlOptions,
): string {
  const { params = {}, query, fragment, base } = segments;

  let url = resolveParams(grammar, params);
  url = resolveQuery(url, query, options?.qs);
  url = resolveFragment(url, fragment);
  url = resolveBase(url, base);

  return url;
}

export default composeUrl;
