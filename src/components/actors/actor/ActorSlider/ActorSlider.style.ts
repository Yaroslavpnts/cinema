import { styled } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  height: 100%;

  .swiper-button-next {
    right: 15px;
  }
  .swiper-button-prev {
    left: 15px;
  }
  & .swiper-button-next,
  .swiper-button-prev {
    display: block;
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme.palette.customColor.light};
    border-radius: 50%;

    &:hover {
      background-color: ${props => props.theme.palette.customColor.main};
    }

    &::after {
      position: absolute;
      color: #fff;
      width: 40px;
      height: 40px;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &.swiper-button-disabled {
      opacity: 0;
    }
  }
`;

export const Img = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  width: 175px !important;
  height: 210px;
`;
