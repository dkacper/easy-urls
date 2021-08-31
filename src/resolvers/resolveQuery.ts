import { stringify, IStringifyOptions } from 'qs';

import { RouteQuery } from '../types';

function resolveQuery<TQuery extends RouteQuery>(
  url: string,
  query?: TQuery,
  options?: IStringifyOptions,
): string {
  if (!query) {
    return url;
  }
  const qsOptions = { addQueryPrefix: true, ...options };
  return `${url}${stringify(query, qsOptions)}`;
}

export default resolveQuery;
