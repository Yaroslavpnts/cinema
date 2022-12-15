import React, { useMemo, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { Api, IApiResponseMovie } from '../../api/apiMethods';
import {
  SearchStyled,
  StyledSearchIcon,
  StyledInput,
  StyledSearchResults,
  StyledSmallPosterBlock,
} from './Search.styled';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../app/hooks';

const Search: React.FC = () => {
  const [isSearchActive, setSearchActive] = useState(false);
  const DivRef = useRef<HTMLDivElement>(null);
  const SearchBlockRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const [movies, setMovies] = useState<IApiResponseMovie[] | null>([]);

  const updateSearch = useDebounce((search: string) => {
    setSearchValue(search);
  }, 300);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearch(e.target.value);
  };

  const searchIconHandler = () => {
    setSearchActive(!isSearchActive);
    setValue('');
    setMovies([]);
  };

  useEffect(() => {
    const children = DivRef.current?.children as HTMLCollectionOf<HTMLElement>;
    const input = children[0];
    if (isSearchActive) {
      input.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!SearchBlockRef.current!.contains(e.target as Element)) {
        setSearchActive(false);
      }
    };

    document.addEventListener('click', onClick);

    return () => {
      document.body.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await Api.fetchMoviesBySearch(searchValue);

      if (data.length === 0) {
        setMovies(null);
      } else {
        setMovies(data);
      }
    };

    if (value) {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchValue]);

  return (
    <SearchStyled className={isSearchActive ? 'activeSearch' : ''} ref={SearchBlockRef}>
      <StyledSearchIcon onClick={searchIconHandler} />
      <StyledInput disableUnderline ref={DivRef} value={value} onChange={changeHandler} />
      <StyledSearchResults>
        {isSearchActive ? (
          <ul>
            {movies ? (
              movies.map(m => (
                <li key={m.id}>
                  <Link to={`/movies/${m.id}`}>
                    <StyledSmallPosterBlock>
                      <img src={m.poster_src} alt={'poster'} />
                    </StyledSmallPosterBlock>
                    {m.name}
                  </Link>
                </li>
              ))
            ) : (
              <p>Фільм не знайдено</p>
            )}
          </ul>
        ) : null}
      </StyledSearchResults>
    </SearchStyled>
  );
};

export default Search;
