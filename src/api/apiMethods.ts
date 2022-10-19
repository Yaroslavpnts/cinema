import { instance } from './axios';

export type userDataType = {
  email: string;
  password: string;
};

export type ApiResponseToken = {
  token: string;
};

export interface IPosition {
  actor_id: number;
  name: string;
  birthday: string;
  city: string;
  country: string;
  photo_src: string;
}

export type GenreType = {
  id: number;
  name: string;
};

export interface ApiResponseMovie {
  id: string;
  name: string;
  description: string;
  rating: string;
  imdb_rating: string;
  poster_src: string;
  actors: Array<IPosition>;
  directors: Array<IPosition>;
  genres: Array<GenreType>;
}

export const Api = {
  auth(data: userDataType) {
    return instance.post<ApiResponseToken>('auth/login', data);
  },

  signUp(data: userDataType) {
    return instance.post<ApiResponseToken>('auth/registration', data);
  },

  getMovies() {
    return instance.get<Array<ApiResponseMovie>>('movies');
  },

  getCategories() {
    return instance.get('movies/categories');
  },
};
