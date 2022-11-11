import { styled, Container, css } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';

export const HeaderApp = styled('header')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 66px;
  background-color: ${props => props.theme.palette.black.main};
  display: flex;
  align-items: center;
  z-index: 2;
`;

export const Logo = styled(Link)`
  position: absolute;
  /* left: 29px; */
  top: 18px;
  left: 20px;
  display: inline-block;
  z-index: 2;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderMain = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  @media (max-width: 1250px) {
    justify-content: flex-end;
    padding-right: 70px;
  }
`;

export const Menu = styled('ul')`
  /* padding-left: 30px; */
  color: #fff;
  display: flex;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Mulish';
  display: flex;
  gap: 70px;

  a {
    color: ${props => props.theme.palette.white.main};
  }

  @media (max-width: 1250px) {
    padding-left: 0;
    position: fixed;
    top: 66px;
    right: -320px;
    flex-direction: column;
    z-index: 100;
    gap: 0;
    min-width: 320px;
    transition: right 0.5s;
    font-size: 18px;

    &.active {
      right: 0;
    }

    li {
      background-color: ${props => props.theme.palette.black.main};
    }

    a {
      display: block;
      padding: 10px;
    }
  }
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
  display: flex;
`;

export const LinkAuth = styled(Link)`
  color: #fff;
  font-size: 14px;
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

const BurgerStyles = css`
  color: #fff;
  font-size: 40px;
  cursor: pointer;
`;

export const BurgerBlock = styled('div')`
  display: none;

  @media (max-width: 1250px) {
    display: block;
    position: absolute;
    top: 13px;
    right: 20px;
  }
`;

export const BurgerIcon = styled(MenuSharpIcon)`
  ${BurgerStyles}
`;

export const BurgerIconOpen = styled(MenuOpenSharpIcon)`
  ${BurgerStyles}
`;
