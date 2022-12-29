import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDebounce } from '../../../../../../app/hooks';
import { Api, IApiResponseMovie } from '../../../../../../api/apiMethods';

interface AutocompleteMoviesProps {
  movie: IApiResponseMovie | null;
  setMovie: (movie: IApiResponseMovie) => void;
  setMovieId: (field: string, value: number, shouldValidate?: boolean | undefined) => void;
}

export const AutocompleteMovies: React.FC<AutocompleteMoviesProps> = ({
  movie,
  setMovie,
  setMovieId,
}) => {
  const [movies, setMovies] = useState<IApiResponseMovie[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');

  const onChange = (event: any, newMovie: IApiResponseMovie | string | null) => {
    if (newMovie && typeof newMovie === 'object') {
      setMovie(newMovie);
      setMovieId('movie_id', newMovie.id);
    }
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
    <Autocomplete
      freeSolo
      value={movie}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      options={movies}
      getOptionLabel={options => (typeof options === 'object' ? options.name : options)}
      renderInput={params => <TextField {...params} label="Movie" />}
    />
  );
};
