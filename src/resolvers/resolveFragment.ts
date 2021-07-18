function resolveFragment(url: string, fragment?: string) {
  if (!fragment) {
    return url;
  }
  return `${url}#${fragment}`;
}

export default resolveFragment;
