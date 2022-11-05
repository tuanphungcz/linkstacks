export const truncateUrl = (url: string) => {
  if (url.length > 6) {
    return url.slice(0, 4) + '...' + url.slice(-3);
  }
  return url;
};
