import Route from 'route-parser';

import { URLParams } from '../types';

function resolveParams<TParams extends URLParams>(
  grammar: string,
  params: TParams,
): string {
  const route = new Route<TParams>(grammar);
  const path = route.reverse(params);
  return path || '';
}

export default resolveParams;
