import React from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
// import 'swiper/css/scrollbar';

import { Navigation, EffectFade } from 'swiper';
import {
  CarouselCaptionBlock,
  Img,
  ImgWrapper,
  MovieTitle,
  StyledSwiper,
  StyledSwiperSlide,
} from './MainPageSlider.styled';
import { IApiResponseMovie } from '../../api/apiMethods';

interface SliderProps {
  movies: Array<IApiResponseMovie>;
}

const MainPageSlider: React.FC<SliderProps> = ({ movies }) => {
  return (
    <ImgWrapper>
      <StyledSwiper
        loop={true}
        navigation={true}
        slidesPerView={1}
        // effect="fade"
        speed={800}
        modules={[Navigation, EffectFade]}
      >
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

export default MainPageSlider;
