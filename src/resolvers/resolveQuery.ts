import { stringify, IStringifyOptions } from 'qs';

import { URLQuery } from '../types';

function resolveQuery<TQuery extends URLQuery>(
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
