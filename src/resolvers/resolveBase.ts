function stripTrailingSlash(path: string) {
  const trailingSlashIndex = path.search(/\/$/);
  if (trailingSlashIndex > -1) {
    return path.substring(0, trailingSlashIndex);
  }
  return path;
}

function resolveBase(url: string, base?: string): string {
  if (!base) {
    return url;
  }
  return `${stripTrailingSlash(base)}${url}`;
}

export default resolveBase;
