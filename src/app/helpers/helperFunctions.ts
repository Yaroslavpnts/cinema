import dayjs from 'dayjs';

export const getCookie = (name: string) => {
  var matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

interface ICoockiesOptions {
  domain: string;
  path: string;
  secure: boolean;
  ['max-age']: number;
  expires: string | Date;
  samesite: 'strict';
}

export function setCookie(name: string, value: any, options = {} as any) {
  options = {
    path: '/',
    ...options,
  };

  if (options?.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}

export const parseTimeString = (time: dayjs.Dayjs) => {
  return `Час закінчення сеансу: ${time.get('hours').toString().padStart(2, '0')}:${time
    .get('minutes')
    .toString()
    .padStart(2, '0')}`;
};
