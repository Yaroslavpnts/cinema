export const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BASE_API_URL_dev
    : process.env.REACT_APP_BASE_API_URL_prod;
