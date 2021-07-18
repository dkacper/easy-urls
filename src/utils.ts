export function stripTrailingSlash(path: string) {
  const trailingSlashIndex = path.search(/\/$/);
  if (trailingSlashIndex > -1) {
    return path.substring(0, trailingSlashIndex);
  }
  return path;
}

export function extractQueryString(url: string) {
  const matched = url.match(/(\?.*)(?=#)|(\?.*)/);
  if (!matched) {
    return '';
  }
  return matched[0].replace(/^\?/, '');
}
