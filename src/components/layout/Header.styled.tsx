import { styled, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const HeaderApp = styled('header')`
  position: relative;
  height: 66px;
  background-color: ${props => props.theme.palette.black.main};
  display: flex;
  align-items: center;
`;

export const Logo = styled(Link)`
  position: absolute;
  left: 29px;
  top: 18px;
  display: inline-block;
  z-index: 2;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Menu = styled('ul')`
  padding-left: 30px;
  color: #fff;
  display: flex;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Mulish';
  display: flex;
  gap: 90px;
`;

export const UserBlock = styled('div')`
  height: 50px;
  display: flex;
  align-items: center;
  font-family: 'Mulish';
`;

export const AnonymousBlock = styled('div')`
  margin-right: 57px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const AuthorizedBlock = styled('div')`
  margin-right: 57px;
`;

export const LinkAuth = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0 10px;
  &.register-link {
    border-left: 1px solid #fff;
  }
`;

export const HeaderRightBlock = styled('div')`
  display: flex;
  align-items: center;
`;

export const AdminLink = styled(Link)`
  padding: 0 15px 0 30px;
  display: inherit;
`;
