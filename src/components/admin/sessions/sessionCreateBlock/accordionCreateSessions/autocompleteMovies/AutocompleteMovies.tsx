import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import { Api, IApiResponseMovie } from '../../../../../../api/apiMethods';
import { AutocompleteMoviesStyled } from './AutocompleteMovies.styled';
import { useDebounce } from '../../../../../../hooks/useDebounceHook';

interface AutocompleteMoviesProps {
  movie: IApiResponseMovie | null;
  setMovie: (movie: IApiResponseMovie | null) => void;
  setMovieId: (field: string, value: number, shouldValidate?: boolean | undefined) => void;
  handleReadyValue: (isExpanded: boolean) => void;
}

export const AutocompleteMovies: React.FC<AutocompleteMoviesProps> = ({
  movie,
  setMovie,
  setMovieId,
  handleReadyValue,
}) => {
  const [movies, setMovies] = useState<IApiResponseMovie[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');

  // const onChange = (event: any, newMovie: IApiResponseMovie | string | null) => {
  const onChange = (event: any, newMovie: unknown) => {
    if (newMovie && typeof newMovie === 'object') {
      const typedMovie = newMovie as IApiResponseMovie;

      setMovie(typedMovie);
      setMovieId('movie_id', typedMovie.id);
      handleReadyValue(false);
    } else {
      setMovieId('movie_id', 0);
      setMovie(null);
    }
  };

  const handleGetOptionsLabel = (options: unknown) => {
    const typedOptions = options as IApiResponseMovie | string;

    return typeof typedOptions === 'object' ? typedOptions.name : typedOptions;
  };

  const onInputChange = (event: any, value: string) => {
    setInputValue(value);
    updateSearch(value);
  };

  const updateSearch = useDebounce((search: string) => {
    setSearchValue(search);
  }, 300);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await Api.fetchMoviesBySearch(inputValue);

      if (data.length === 0) {
        setMovies([]);
      } else {
        setMovies(data);
      }
    };

    if (searchValue) {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchValue]);

  return (
    <AutocompleteMoviesStyled
      freeSolo
      value={movie}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      // sx={{ width: '350px' }}
      options={movies}
      getOptionLabel={handleGetOptionsLabel}
      renderInput={params => <TextField {...params} label="Введіть назву фільму" size="small" />}
    />
  );
};
