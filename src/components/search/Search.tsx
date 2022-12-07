import React, { useEffect, useRef, useState } from 'react';
import { SearchStyled, StyledSearchIcon, StyledInput } from './Search.styled';

const Search: React.FC = () => {
  const [isSearchActive, setSearchActive] = useState(false);
  const DivRef = useRef<HTMLDivElement>(null);
  const SearchBlockRef = useRef<HTMLDivElement>(null);

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

  return (
    <SearchStyled className={isSearchActive ? 'activeSearch' : ''} ref={SearchBlockRef}>
      <StyledSearchIcon
        onClick={e => {
          setSearchActive(!isSearchActive);
        }}
      />
      <StyledInput disableUnderline ref={DivRef}></StyledInput>
    </SearchStyled>
  );
};

export default Search;
