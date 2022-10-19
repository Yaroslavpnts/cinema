import { styled, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ImgWrapper = styled('div')`
  width: 100%;
  height: 570px;
  margin-bottom: 2 0px;
`;

export const Img = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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
  }

  & .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: ${props => props.theme.palette.customColor.main};
  }
  & .swiper-button-next::after,
  .swiper-button-prev::after {
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
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
`;

export const CarouselCaptionBlock = styled('div')`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  min-height: 150px;
  padding: 30px 60px;
`;

export const MovieTitle = styled(Typography)`
  font-size: 36px;
  line-height: 30px;
  color: #fff;
  font-weight: 700;
`;
