// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { Navigation } from 'swiper';
import { IActorMovie } from '../../../../api/apiMethods';
import { Img, StyledSwiper, StyledSwiperSlide } from './ActorSlider.style';
import { Link } from 'react-router-dom';

interface IActorSliderProps {
  movies: IActorMovie[];
}

const ActorSlider: React.FC<IActorSliderProps> = ({ movies }) => {
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
      {movies.map(movie => (
        <StyledSwiperSlide key={movie.id}>
          <Link to={`../movies/${movie.id}`}>
            <Img src={movie.wide_poster_src} />
          </Link>
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default ActorSlider;
