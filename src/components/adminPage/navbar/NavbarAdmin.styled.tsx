import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavbarWrapper = styled('div')`
  background-color: ${props => props.theme.palette.customColor.light};
`;

export const StyledNav = styled('div')`
  height: 66px;
  display: flex;
  align-items: center;
`;

export const StyledList = styled('ul')`
  list-style: none;
  display: flex;
  gap: 47px;
`;

export const StyledListItem = styled('li')``;

export const StyledListLink = styled(Link)`
  color: #000;
  font-family: 'Anonymous Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-decoration: none;
`;
