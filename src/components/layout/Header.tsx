import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AdminLink,
  AnonymousBlock,
  AuthorizedBlock,
  BurgerBlock,
  BurgerIcon,
  BurgerIconOpen,
  HeaderApp,
  HeaderMain,
  HeaderRightBlock,
  LinkAuth,
  Logo,
  Menu,
  StyledContainer,
  UserBlock,
} from './Header.styled';
import CartSvg from '../../assets/img/cart.svg';
import OutSvg from '../../assets/img/out.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isAuthSelector, signOut } from '../../redux/slices/authorizationSlice';
import Search from '../search/Search';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);

  const [activeNav, setSsActiveNav] = useState<boolean>(false);

  return (
    <HeaderApp>
      <StyledContainer>
        <Logo to="/">
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.7151 41.1373C48.1272 50.9629 39.9742 58.75 30.0014 58.75C25.5533 58.75 21.4681 57.2 18.2534 54.612C22.8246 53.3071 27.8906 51.4752 33.0982 49.2129C38.8206 46.727 44.1847 43.9465 48.7151 41.1373ZM47.4163 33.0425C42.7392 36.2194 36.6268 39.503 30.1102 42.3339C25.0018 44.5532 19.9016 46.3833 15.3611 47.6266C14.6224 47.8291 13.8806 48.0198 13.1359 48.1988C12.9379 47.7918 12.7546 47.3779 12.5865 46.9577C11.7263 44.8063 11.2522 42.4585 11.2522 40C11.2522 39.618 11.265 39.2391 11.2875 38.8627C11.8757 29.0371 20.0285 21.25 30.0014 21.25C34.4494 21.25 38.5347 22.8 41.7492 25.388C43.8933 27.1141 45.6497 29.3018 46.8668 31.8012C47.065 32.2081 47.2483 32.6222 47.4163 33.0425Z"
              fill="#3CB4E7"
            />
            <path
              d="M9.64841 43.3435C9.79559 44.6984 9.92696 44.9404 10.3388 46.2374C8.36087 47.6482 6.7022 49.0154 5.51802 50.2145C5.13306 50.6045 4.82954 50.944 4.59082 51.2343C4.78817 51.2441 5.00766 51.2499 5.25071 51.2499C7.81548 51.2499 11.5819 50.6053 15.8563 49.4349C20.4813 48.1685 25.6684 46.3077 30.8572 44.0536C37.7632 41.0536 44.2351 37.5449 49.0811 34.1739C51.3171 32.6182 53.1858 31.1005 54.4849 29.7852C54.8699 29.3952 55.1734 29.0557 55.4121 28.7654C55.2149 28.7556 54.9954 28.7499 54.7521 28.7499C52.9582 28.7499 50.5759 29.0656 47.8437 29.6556C47.1611 28.4833 47.0258 28.1672 46.1254 27.1467C49.1411 26.0547 52.1924 25.2955 54.7519 25C57.6116 24.6697 59.4792 25.647 59.9063 27.0086C61.204 31.1473 48.8672 40.3185 32.3513 47.4932C21.2698 52.3072 11.1206 55 5.25071 55C2.372 55 0.523602 54.353 0.0965691 52.9913C-0.6464 50.6222 2.9338 47.5 9.64841 43.3435Z"
              fill="#3CB4E7"
            />
            <path
              d="M57.2726 6.64751L59.4029 2.33098C59.6207 1.88967 60.25 1.88967 60.4678 2.33098L62.5981 6.64751L67.3617 7.3397C67.8487 7.41046 68.0432 8.00895 67.6908 8.35245L64.2438 11.7124L65.0575 16.4567C65.1407 16.9418 64.6316 17.3117 64.196 17.0826L59.9354 14.8427L55.6747 17.0826C55.2391 17.3117 54.73 16.9418 54.8132 16.4567L55.6269 11.7124L52.18 8.35245C51.8276 8.00895 52.022 7.41046 52.509 7.3397L57.2726 6.64751Z"
              fill="#3CB4E7"
            />
          </svg>
        </Logo>
        <HeaderMain>
          <Menu className={activeNav ? 'active' : ''}>
            <li>
              <Link to="">Розклад</Link>
            </li>
            <li>
              <Link to="">Фільми</Link>
            </li>
            <li>
              <Link to="">Кінотеатри</Link>
            </li>
          </Menu>
          <HeaderRightBlock>
            <Search />
            <UserBlock>
              {!isAuth ? (
                <AnonymousBlock>
                  <LinkAuth to="/auth?type=enter">Вхід</LinkAuth>
                  <LinkAuth to="/auth?type=register" className="register-link">
                    Реєстрація
                  </LinkAuth>
                </AnonymousBlock>
              ) : (
                <AuthorizedBlock>
                  <Link to="/auth" style={{ display: 'flex' }} onClick={() => dispatch(signOut())}>
                    <img src={OutSvg} alt="" />
                  </Link>
                </AuthorizedBlock>
              )}
              <img src={CartSvg} alt="" />
              <AdminLink to="admin">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2052 1.69064C10.7029 1.74553 8.28342 2.59773 6.29909 4.12317C1.60784 7.72177 0.31015 14.2482 3.26665 19.368C3.29302 19.4185 3.32932 19.463 3.37336 19.499C3.41741 19.5351 3.46828 19.5618 3.52292 19.5777C3.57757 19.5935 3.63485 19.5982 3.69134 19.5913C3.74782 19.5844 3.80233 19.5662 3.85159 19.5377C3.90085 19.5093 3.94384 19.4711 3.97798 19.4256C4.01212 19.3801 4.03669 19.3281 4.05023 19.2729C4.06376 19.2176 4.06598 19.1602 4.05675 19.104C4.04751 19.0479 4.02702 18.9942 3.99649 18.9462C2.66817 16.647 2.22146 13.9432 2.73968 11.3389C3.25789 8.73466 4.70564 6.4078 6.81293 4.79227C8.77302 3.28699 11.1852 2.49007 13.6563 2.53145C16.1273 2.57282 18.5115 3.45003 20.4201 5.02008H19.8236C19.7117 5.02008 19.6044 5.06453 19.5252 5.14364C19.4461 5.22276 19.4017 5.33007 19.4017 5.44195C19.4017 5.55384 19.4461 5.66115 19.5252 5.74026C19.6044 5.81938 19.7117 5.86383 19.8236 5.86383H21.4933C21.5537 5.8669 21.614 5.85696 21.6702 5.83469C21.7264 5.81242 21.7772 5.77833 21.819 5.73474C21.8284 5.72587 21.8375 5.71658 21.846 5.70689C21.8732 5.67249 21.8948 5.63406 21.9101 5.59299C21.9149 5.58109 21.9191 5.56898 21.9228 5.5567C21.9228 5.55558 21.9228 5.55445 21.9228 5.55333C21.9262 5.54081 21.929 5.52814 21.9312 5.51536C21.9356 5.49114 21.9379 5.46657 21.938 5.44195V3.75024C21.9389 3.6937 21.9284 3.63755 21.9072 3.58513C21.886 3.53272 21.8545 3.4851 21.8145 3.44512C21.7745 3.40514 21.7269 3.3736 21.6745 3.35238C21.6221 3.33116 21.5659 3.3207 21.5094 3.32161C21.454 3.32249 21.3993 3.33427 21.3484 3.35629C21.2976 3.37831 21.2516 3.41013 21.213 3.44993C21.1745 3.48973 21.1441 3.53674 21.1238 3.58827C21.1034 3.6398 21.0934 3.69483 21.0942 3.75024V4.48683C18.8963 2.61912 16.0887 1.62402 13.2052 1.69064ZM13.5005 6.58102C11.5008 6.58102 9.87659 8.19764 9.87659 10.1923V11.2216H8.46921C8.35732 11.2216 8.25002 11.2661 8.1709 11.3452C8.09178 11.4243 8.04734 11.5316 8.04734 11.6435V19.9966C8.04734 20.1085 8.09178 20.2158 8.1709 20.295C8.25002 20.3741 8.35732 20.4185 8.46921 20.4185H18.5318C18.6437 20.4185 18.751 20.3741 18.8301 20.295C18.9092 20.2158 18.9536 20.1085 18.9536 19.9966V11.6435C18.9536 11.5316 18.9092 11.4243 18.8301 11.3452C18.751 11.2661 18.6437 11.2216 18.5318 11.2216H17.1244V10.1923C17.1244 8.19764 15.5002 6.58102 13.5005 6.58102ZM23.3555 7.4062C23.2804 7.40712 23.2069 7.42808 23.1425 7.46691C23.0782 7.50575 23.0255 7.56106 22.9897 7.62712C22.9539 7.69318 22.9364 7.76759 22.939 7.84267C22.9416 7.91776 22.9642 7.99078 23.0045 8.0542C24.3328 10.3534 24.7795 13.0572 24.2613 15.6615C23.7431 18.2657 22.2954 20.5926 20.1881 22.2081C18.228 23.7128 15.8162 24.5094 13.3456 24.468C10.8749 24.4267 8.49112 23.5498 6.58259 21.9803H7.15887C7.27076 21.9803 7.37806 21.9359 7.45718 21.8567C7.5363 21.7776 7.58074 21.6703 7.58074 21.5584C7.58074 21.4465 7.5363 21.3392 7.45718 21.2601C7.37806 21.181 7.27076 21.1365 7.15887 21.1365H5.53803C5.48675 21.1299 5.4347 21.1328 5.38446 21.145C5.28917 21.1644 5.20353 21.2162 5.14203 21.2916C5.08053 21.3669 5.04694 21.4612 5.04696 21.5584V23.2501C5.04696 23.362 5.09141 23.4693 5.17053 23.5485C5.24964 23.6276 5.35695 23.672 5.46884 23.672C5.58073 23.672 5.68803 23.6276 5.76715 23.5485C5.84626 23.4693 5.89071 23.362 5.89071 23.2501V22.4984C7.8188 24.1431 10.2266 25.1212 12.7555 25.287C15.6092 25.4765 18.4342 24.6199 20.7019 22.8772C25.3932 19.2786 26.6908 12.7522 23.7343 7.63233C23.6981 7.56322 23.6435 7.50549 23.5765 7.46557C23.5094 7.42565 23.4327 7.4051 23.3547 7.4062H23.3555ZM13.5005 7.42561C13.8653 7.42271 14.2271 7.49221 14.5649 7.63011C14.9027 7.768 15.2098 7.97154 15.4683 8.22894C15.7269 8.48634 15.9319 8.79248 16.0713 9.12964C16.2107 9.46679 16.2819 9.82826 16.2807 10.1931V11.2225H10.7203V10.1931C10.7203 8.65242 11.9522 7.42561 13.5005 7.42561ZM8.89109 12.0662H18.1099V19.5756H8.89109V12.0662ZM13.5005 13.5791C12.7183 13.5791 12.072 14.2178 12.072 14.9991C12.072 15.6336 12.4998 16.1677 13.0786 16.3491V18.4981H13.9224V16.3491C14.2119 16.2603 14.4655 16.0816 14.6466 15.8388C14.8276 15.596 14.9265 15.3019 14.929 14.9991C14.929 14.2178 14.2826 13.5791 13.5005 13.5791ZM13.5005 14.4228C13.8296 14.4228 14.0852 14.6768 14.0852 14.9991C14.0856 15.0757 14.0706 15.1516 14.0413 15.2224C14.012 15.2932 13.9688 15.3574 13.9144 15.4113C13.8599 15.4652 13.7953 15.5076 13.7242 15.5363C13.6531 15.5649 13.5771 15.579 13.5005 15.5779C13.4239 15.579 13.3478 15.5649 13.2768 15.5363C13.2057 15.5076 13.1411 15.4652 13.0866 15.4113C13.0322 15.3574 12.989 15.2932 12.9597 15.2224C12.9304 15.1516 12.9154 15.0757 12.9158 14.9991C12.9158 14.6768 13.1714 14.4228 13.5005 14.4228Z"
                    fill="#3CB4E7"
                  />
                </svg>
              </AdminLink>
            </UserBlock>
          </HeaderRightBlock>
        </HeaderMain>
      </StyledContainer>
      <BurgerBlock onClick={() => setSsActiveNav(!activeNav)}>
        {activeNav ? <BurgerIconOpen /> : <BurgerIcon />}
      </BurgerBlock>

      {/* <MenuOpenSharpIcon fontSize="large" sx={{ color: '#fff' }} /> */}
    </HeaderApp>
  );
};

export default Header;