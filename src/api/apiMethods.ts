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

export interface IActorMovie {
  description: string;
  id: number;
  imdb_rating: string;
  name: string;
  poster_src: string;
  production_year: string;
  rating: string;
  wide_poster_src: string;
}

export interface IApiResponseFullActor extends IApiResponseActor {
  movies: IActorMovie[];
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

export interface ISession {
  date: string;
  session_start: string;
  session_end: string;
  available_seats?: number;
  cinema_hall_id: number;
  movie_id: number;
}

export interface IApiResponseSession extends ISession {
  session_id: number;
}

export interface IApiResponseSessionWithMovieAndCinemaHall extends IApiResponseSession {
  movie: IApiResponseMovie;
  cinema_hall: IApiResponseCinemaHall;
}

export interface ICinemaHall {
  name: string;
  number_of_seats: number;
  isWorking?: boolean;
  cinema_id: number;
  sessions?: IApiResponseSession[];
}

export interface IApiResponseCinemaHall extends ICinemaHall {
  cinemas_hall_id: number;
}

export interface ICinema {
  city_id: number;
  total_number_of_seats: number;
  adress: string;
  cinema_halls?: IApiResponseCinemaHall[];
}

export interface IApiResponseCinema extends ICinema {
  cinemas_id: number;
}

export interface ICity {
  name: string;
  cinemas?: IApiResponseCinema[];
}

export interface IApiResponseCity extends ICity {
  city_id: number;
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
  start_date_session?: string;
  end_date_session?: string;
  sessions?: IApiResponseSession[];
  duration: string;
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

  fetchMovies(page: number, size: number) {
    return instance.get<IApiResponseMovie[]>(`movies?page=${page}&size=${size}`);
  },

  fetchMoviesByFilters(dateStart: string, dateEnd: string, cinemaHalls: string) {
    return instance.get<IApiResponseMovie[]>(
      `movies/filter?dateStart=${dateStart}&dateEnd=${dateEnd}${cinemaHalls}`
    );
  },

  fetchMovie(id: number) {
    return instance.get<IApiResponseMovie>(`movies/${id}`);
  },

  fetchMoviesBySearch(search: string) {
    return instance.get<IApiResponseMovie[]>(`movies/search?search=${search}`);
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

  fetchCities() {
    return instance.get<IApiResponseCity[]>('cities');
  },

  createCity(city: ICity) {
    return instance.post<IApiResponseCity>('cities', city);
  },

  fetchCinemas() {
    return instance.get<IApiResponseCinema[]>('cinemas');
  },

  createCinema(cinema: ICinema) {
    return instance.post<IApiResponseCinema>('cinemas', cinema);
  },

  fetchCinemaHalls() {
    return instance.get<IApiResponseCinemaHall[]>('cinema_halls');
  },

  fetchCinemaHallsWithSessionsByCinema(cinema_id: number) {
    return instance.get<IApiResponseCinemaHall[]>(`cinema_halls/${cinema_id}`);
  },

  createCinemaHall(body: ICinemaHall) {
    return instance.post<IApiResponseCinemaHall>('cinema_halls', body);
  },

  createSessions(body: ISession[]) {
    return instance.post<IApiResponseSessionWithMovieAndCinemaHall[]>('sessions', body);
  },

  fetchAllSessions() {
    return instance.get<IApiResponseSessionWithMovieAndCinemaHall[]>('sessions');
  },
};
