import dayjs from 'dayjs';
import {
  IApiResponseCinema,
  IApiResponseCinemaHall,
  IApiResponseMovie,
} from '../../api/apiMethods';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import _ from 'lodash';

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
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

export const parsePeriodString = (
  dateStart: dayjs.Dayjs,
  dateEnd: dayjs.Dayjs,
  period: boolean
) => {
  return ` ${dateStart.isValid() ? dateStart.format('YYYY-MM-DD') : 'Невірно вказана дата'} ${
    period ? `- ${dateEnd.isValid() ? dateEnd.format('YYYY-MM-DD') : 'Невірно вказана дата'}` : ''
  }`;
};

export const parseTimeString = (time: dayjs.Dayjs, movie: IApiResponseMovie | null) => {
  if (!movie) return 'Необхідно вибрати фільм';
  if (!time.isValid()) return 'Необхідно вибрати коректний час початку сеансу';

  return `Кінець сеансу: ${time.get('hours').toString().padStart(2, '0')}:${time
    .get('minutes')
    .toString()
    .padStart(2, '0')}`;
};

export const parseCheckedCinemaHall = (
  cinema: IApiResponseCinema | undefined,
  id: number | null
) => {
  const cinemaHall = cinema?.cinema_halls?.find(c => c.cinemas_hall_id === id);

  if (id && cinemaHall) {
    return cinemaHall.name;
  } else {
    // return cinema?.cinema_halls?.[0] ? cinema?.cinema_halls?.[0].name : '';
    return '';
  }
};
