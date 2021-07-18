import { stripTrailingSlash } from '../utils';

function resolveBase(url: string, base?: string) {
  if (!base) {
    return url;
  }
  return `${stripTrailingSlash(base)}${url}`;
}

export default resolveBase;
