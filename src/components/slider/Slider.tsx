import React, { useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/scrollbar';

import { Navigation } from 'swiper';
import {
  CarouselCaptionBlock,
  Img,
  ImgWrapper,
  MovieTitle,
  StyledSwiper,
  StyledSwiperSlide,
} from './Slider.styled';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IApiResponseMovie } from '../../api/apiMethods';

interface SliderProps {
  movies: Array<IApiResponseMovie>;
}

const Slider: React.FC<SliderProps> = ({ movies }) => {
  return (
    <ImgWrapper>
      <StyledSwiper loop={true} navigation={true} slidesPerView={1} modules={[Navigation]}>
        {movies.map((movie, index) => (
          <StyledSwiperSlide key={index}>
            <Img src={movie.poster_src} alt="movie" />
            <CarouselCaptionBlock>
              <MovieTitle variant="h1">
                {movie.name} ({movie.rating})
              </MovieTitle>
            </CarouselCaptionBlock>
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    </ImgWrapper>
  );
};

export default Slider;
