function resolveFragment(url: string, fragment?: string): string {
  if (!fragment) {
    return url;
  }
  return `${url}#${fragment}`;
}

export default resolveFragment;
