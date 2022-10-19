import React from 'react';
import { Link } from 'react-router-dom';
// import { Container } from '@mui/material';
import {
  ContainerStyled,
  FooterCompany,
  FooterContacts,
  FooterQA,
  FooterSocialMedias,
  FooterWrapper,
} from './Footer.styled';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <ContainerStyled>
        <FooterCompany>
          <h3>Чому ми?</h3>
          <ul>
            <li>
              <Link to="/about">Про компанію</Link>
            </li>
            <li>
              <Link to="/cinema">Кінозали</Link>
            </li>
            <li>
              <Link to="/about">Наш бар</Link>
            </li>
            <li>
              <Link to="/about">Події та акції</Link>
            </li>
          </ul>
        </FooterCompany>
        <FooterQA>
          <h3>Є запитання?</h3>
          <ul>
            <li>
              <Link to="/about">ЧаПи</Link>
            </li>
            <li>
              <Link to="/about">Як придбати квиток</Link>
            </li>
            <li>
              <Link to="/about">Повернення квитків</Link>
            </li>
          </ul>
        </FooterQA>
        <FooterContacts>
          <h3>Контакти</h3>
          <ul>
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33333 3.33334H16.6667C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6667 16.6667H3.33333C2.41667 16.6667 1.66667 15.9167 1.66667 15V5.00001C1.66667 4.08334 2.41667 3.33334 3.33333 3.33334Z"
                  stroke="#F8F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3333 5L10 10.8333L1.66667 5"
                  stroke="#F8F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <a href="mailto: galaxycinema@gmail.com">galaxycinema@gmail.com</a>
            </li>
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 8.33334C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33334C2.5 6.34422 3.29018 4.43657 4.6967 3.03004C6.10322 1.62352 8.01088 0.833344 10 0.833344C11.9891 0.833344 13.8968 1.62352 15.3033 3.03004C16.7098 4.43657 17.5 6.34422 17.5 8.33334Z"
                  stroke="#F8F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 10.8333C11.3807 10.8333 12.5 9.71406 12.5 8.33334C12.5 6.95263 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95263 7.5 8.33334C7.5 9.71406 8.61929 10.8333 10 10.8333Z"
                  stroke="#F8F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link to="/about">Як придбати квиток</Link>
            </li>
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4995 13.5209V15.9045C17.5004 16.1258 17.455 16.3448 17.3662 16.5475C17.2773 16.7503 17.1471 16.9323 16.9837 17.0819C16.8203 17.2315 16.6274 17.3453 16.4174 17.4162C16.2074 17.4871 15.9848 17.5135 15.764 17.4935C13.3143 17.2279 10.9612 16.3925 8.89372 15.0544C6.97021 13.8345 5.33942 12.207 4.11714 10.2873C2.77172 8.21452 1.93444 5.85464 1.67313 3.39878C1.65323 3.17907 1.6794 2.95764 1.74995 2.74857C1.82051 2.5395 1.93391 2.34739 2.08293 2.18446C2.23196 2.02153 2.41334 1.89135 2.61554 1.80222C2.81774 1.71308 3.03631 1.66694 3.25736 1.66673H5.64565C6.032 1.66294 6.40655 1.79948 6.69949 2.05091C6.99243 2.30234 7.18376 2.6515 7.23784 3.03331C7.33864 3.7961 7.52559 4.54506 7.7951 5.2659C7.90221 5.55028 7.92539 5.85934 7.8619 6.15646C7.79841 6.45358 7.6509 6.72632 7.43686 6.94234L6.42582 7.95137C7.55911 9.94049 9.20933 11.5874 11.2024 12.7185L12.2134 11.7094C12.4299 11.4958 12.7032 11.3486 13.0009 11.2852C13.2986 11.2219 13.6083 11.245 13.8932 11.3519C14.6155 11.6209 15.3659 11.8075 16.1302 11.9081C16.5169 11.9625 16.8701 12.1569 17.1226 12.4543C17.3751 12.7517 17.5092 13.1313 17.4995 13.5209Z"
                  stroke="#F8F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <a href="tel:+380 999 999 999">+380 999 999 999</a>
            </li>
          </ul>
        </FooterContacts>
        <FooterSocialMedias>
          <h3>Ми в соціальних мережах</h3>
          <ul>
            <li>
              <Link to="/about">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.4167 1.58334L8.70834 10.2917"
                    stroke="#F8F5F5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.4167 1.58334L11.875 17.4167L8.70834 10.2917L1.58334 7.12501L17.4167 1.58334Z"
                    stroke="#F8F5F5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4583 1.58334H5.54168C3.35555 1.58334 1.58334 3.35555 1.58334 5.54168V13.4583C1.58334 15.6445 3.35555 17.4167 5.54168 17.4167H13.4583C15.6445 17.4167 17.4167 15.6445 17.4167 13.4583V5.54168C17.4167 3.35555 15.6445 1.58334 13.4583 1.58334Z"
                    stroke="#F8F5F5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.6667 9.00124C12.7644 9.66011 12.6518 10.333 12.3451 10.9242C12.0383 11.5154 11.5529 11.9949 10.958 12.2943C10.363 12.5938 9.68877 12.698 9.03117 12.5922C8.37356 12.4864 7.76606 12.1759 7.29508 11.7049C6.8241 11.2339 6.51362 10.6264 6.40781 9.96883C6.30199 9.31122 6.40622 8.63699 6.70568 8.04204C7.00513 7.44709 7.48457 6.96171 8.07578 6.65494C8.667 6.34817 9.33989 6.23563 9.99875 6.33333C10.6708 6.43299 11.293 6.74615 11.7734 7.22657C12.2538 7.70699 12.567 8.32918 12.6667 9.00124Z"
                    stroke="#F8F5F5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.8542 5.14584H13.8629"
                    stroke="#F8F5F5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <svg
                  width="22"
                  height="15"
                  viewBox="0 0 22 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5813 2.69146C20.4733 2.26169 20.2534 1.86792 19.9438 1.54992C19.6341 1.23191 19.2457 1.00094 18.8178 0.880336C17.2542 0.5 11 0.5 11 0.5C11 0.5 4.74578 0.5 3.18222 0.916559C2.75429 1.03717 2.36588 1.26814 2.05623 1.58614C1.74659 1.90414 1.52666 2.29791 1.41868 2.72768C1.13253 4.30839 0.992553 5.91192 1.00052 7.51811C0.99032 9.13639 1.1303 10.7522 1.41868 12.3448C1.53773 12.7612 1.76258 13.14 2.0715 13.4445C2.38043 13.7491 2.76299 13.9692 3.18222 14.0834C4.74578 14.5 11 14.5 11 14.5C11 14.5 17.2542 14.5 18.8178 14.0834C19.2457 13.9628 19.6341 13.7319 19.9438 13.4139C20.2534 13.0959 20.4733 12.7021 20.5813 12.2723C20.8653 10.7035 21.0052 9.1122 20.9995 7.51811C21.0097 5.89983 20.8697 4.28407 20.5813 2.69146Z"
                    stroke="#F8F5F5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.95465 10.4793L14.1817 7.51811L8.95465 4.55692V10.4793Z"
                    stroke="#F8F5F5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </FooterSocialMedias>
      </ContainerStyled>
    </FooterWrapper>
  );
};

export default Footer;
