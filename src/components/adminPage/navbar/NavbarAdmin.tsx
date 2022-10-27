import React from 'react';
import {
  NavbarWrapper,
  StyledList,
  StyledListItem,
  StyledListLink,
  StyledNav,
} from './NavbarAdmin.styled';
import { Container } from '@mui/material';

const NavbarAdmin = () => {
  return (
    <NavbarWrapper>
      <Container>
        <StyledNav>
          <StyledList>
            <StyledListItem>
              <StyledListLink to="actors">Актори</StyledListLink>
            </StyledListItem>
            <StyledListItem>
              <StyledListLink to="movies">Фільми</StyledListLink>
            </StyledListItem>
            <StyledListItem>
              <StyledListLink to="sessions">Сеанси</StyledListLink>
            </StyledListItem>
            <StyledListItem>
              <StyledListLink to="cinemas">Кінотеатри</StyledListLink>
            </StyledListItem>
          </StyledList>
        </StyledNav>
      </Container>
    </NavbarWrapper>
  );
};

export default NavbarAdmin;
