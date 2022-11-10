import { instance } from './axios';

export type userDataType = {
  email: string;
  password: string;
};

export type ApiResponseToken = {
  token: string;
};

export interface IPosition {
  name: string;
  birthday: string;
  city: string;
  country: string;
  photo_src: string;
}

export interface IApiResponseActor extends IPosition {
  actor_id: number;
}

export interface IApiResponseFullActor extends IApiResponseActor {
  movies: {
    description: string;
    id: number;
    imdb_rating: string;
    name: string;
    poster_src: string;
    production_year: string;
    rating: string;
    wide_poster_src: string;
  }[];
}

export interface IApiResponseDirector extends IPosition {
  id: number;
}

export type GenreType = {
  id: number;
  name: string;
};

export interface ICreateMovieAsync {
  name: string;
  description: string;
  genres: number[];
  actors: number[];
  directors: number[];
  rating: string;
  imdb_rating: string;
  production_year: string;
  wide_poster_src: string;
  poster_src: string;
}

export interface IMovie {
  name: string;
  description: string;
  rating: string;
  imdb_rating: string;
  poster_src: string;
  wide_poster_src: string;
  actors: IApiResponseActor[];
  directors: IApiResponseDirector[];
  production_year: string;
  genres: Array<GenreType>;
}

export interface IApiResponseMovie extends IMovie {
  id: number;
}

export interface ICategory {
  name: string;
}

export interface IApiResponseCategory extends ICategory {
  id: number;
}

export const Api = {
  auth(data: userDataType) {
    return instance.post<ApiResponseToken>('auth/login', data);
  },

  signUp(data: userDataType) {
    return instance.post<ApiResponseToken>('auth/registration', data);
  },

  fetchMovies() {
    return instance.get<IApiResponseMovie[]>('movies');
  },

  createMovie(movie: ICreateMovieAsync) {
    return instance.post<IApiResponseMovie>('movies', movie);
  },

  updateMovie(movie: ICreateMovieAsync) {
    return instance.patch<IApiResponseMovie>('movies', movie);
  },

  deleteMovie(id: number) {
    return instance.delete(`movies/${id}`);
  },

  fetchCategories() {
    return instance.get<IApiResponseCategory[]>('movies/categories');
  },

  createCategory(name: ICategory) {
    return instance.post<IApiResponseCategory>('movies/categories', name);
  },
  fetchActors() {
    return instance.get<IApiResponseActor[]>('actors');
  },

  fetchActor(id: number) {
    return instance.get<IApiResponseFullActor>(`actors/${id}`);
  },

  createActor(actor: IPosition) {
    return instance.post<IApiResponseActor>('actors', actor);
  },

  updateActor(actor: IPosition) {
    return instance.patch<IApiResponseActor>('actors', actor);
  },

  deleteActor(id: number) {
    return instance.delete(`actors/${id}`);
  },

  fetchDirectors() {
    return instance.get<IApiResponseDirector[]>('directors');
  },

  createDirector(director: IPosition) {
    return instance.post<IApiResponseDirector>('directors', director);
  },

  deleteDirector(id: number) {
    return instance.delete(`directors/${id}`);
  },
};
