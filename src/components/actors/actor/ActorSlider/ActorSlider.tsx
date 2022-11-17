// Import Swiper styles
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { Navigation, Scrollbar, A11y } from 'swiper';
import { IActorMovie } from '../../../../api/apiMethods';
import { Img, StyledSwiper, StyledSwiperSlide } from './ActorSlider.style';

interface IActorSliderProps {
  movies: IActorMovie[];
}

const ActorSlider: React.FC<IActorSliderProps> = ({ movies }) => {
  const test = [
    {
      id: 1,
      poster_src:
        'https://st2.depositphotos.com/4431055/7495/i/600/depositphotos_74950191-stock-photo-men-latin-american-and-hispanic.jpg',
    },
    {
      id: 2,
      poster_src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfaS70ALn_-Gf8xgogDTCwTQA0RoZJCUZEWA&usqp=CAU',
    },
    {
      id: 3,
      poster_src:
        'https://st2.depositphotos.com/4431055/7495/i/600/depositphotos_74950191-stock-photo-men-latin-american-and-hispanic.jpg',
    },
    {
      id: 4,
      poster_src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfaS70ALn_-Gf8xgogDTCwTQA0RoZJCUZEWA&usqp=CAU',
    },
    {
      id: 5,
      poster_src:
        'https://st2.depositphotos.com/4431055/7495/i/600/depositphotos_74950191-stock-photo-men-latin-american-and-hispanic.jpg',
    },
    {
      id: 6,
      poster_src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfaS70ALn_-Gf8xgogDTCwTQA0RoZJCUZEWA&usqp=CAU',
    },
    {
      id: 7,
      poster_src:
        'https://st2.depositphotos.com/4431055/7495/i/600/depositphotos_74950191-stock-photo-men-latin-american-and-hispanic.jpg',
    },
    {
      id: 8,
      poster_src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfaS70ALn_-Gf8xgogDTCwTQA0RoZJCUZEWA&usqp=CAU',
    },
  ];

  return (
    <StyledSwiper
      // onFromEdge={swiper => console.log('onFromEdge', swiper)}
      // install Swiper modules
      modules={[Navigation]}
      spaceBetween={55}
      slidesPerView={'auto'}
      navigation
      // scrollbar={{ draggable: true }}
      // onSwiper={swiper => console.log('onSwiper', swiper)}
      onSlideChange={swiper => console.log('onSlideChange', swiper)}
      // onReachEnd={swiper => console.log('onReachEnd', swiper)}
      onBeforeSlideChangeStart={swiper => console.log('onBeforeSlideChangeStart', swiper)}
    >
      {/* {movies.map(movie => (
        <StyledSwiperSlide key={movie.id}>
          <Img src={movie.poster_src} />
        </StyledSwiperSlide>
      ))} */}
      {test.map(movie => (
        <StyledSwiperSlide key={movie.id}>
          <Img src={movie.poster_src} />
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default ActorSlider;
