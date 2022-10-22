function getValidApiUrl() {
  const url = process.env.REACT_APP_BASE_API_URL?.trim();
  return url?.at(-1) === '/' ? url.slice(0, -1) : url;
}

export const config = {
  BASE_API_URL: getValidApiUrl(),
  PUBLIC_VAPID_KEY: process.env.REACT_APP_PUBLIC_VAPID_KEY,
};
