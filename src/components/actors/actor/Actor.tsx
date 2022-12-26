import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api, IApiResponseFullActor } from '../../../api/apiMethods';
import ActorHighchart from '../../Highcharts/ActorHighcharts/ActorHighchart';
import {
  StyledActor,
  StyledActorInfo,
  StyledActorSliderBlock,
  StyledBiographyActor,
  StyledPersonalInfo,
  StyledPhotoBlock,
} from './Actor.style';
import Typography from '@mui/material/Typography';
import ActorSlider from './ActorSlider/ActorSlider';

const Actor: React.FC = () => {
  const [actor, setActor] = useState<IApiResponseFullActor>();

  const { id } = useParams();

  useEffect(() => {
    const getActor = async (id: number) => {
      try {
        const { data } = await Api.fetchActor(id);
        setActor(data);
      } catch (error) {}
    };

    if (id) getActor(+id);
  }, [id]);

  return (
    <StyledActor>
      <StyledActorInfo>
        <StyledPhotoBlock>
          <img src={actor?.photo_src} alt="actor_photo" />
        </StyledPhotoBlock>
        <StyledBiographyActor>
          <Typography component="h2">{actor?.name}</Typography>
          <div>
            <h3>Особиста інформація</h3>
            <StyledPersonalInfo>
              <div>
                <p>Дата народження</p>
                <p>Місто</p>
                <p>Країна</p>
              </div>
              <div>
                <p>{actor?.birthday}</p>
                <p>{actor?.city}</p>
                <p>{actor?.country}</p>
              </div>
            </StyledPersonalInfo>
          </div>
        </StyledBiographyActor>
      </StyledActorInfo>

      <StyledActorSliderBlock>
        <Typography component="h3">Фільмографія</Typography>
        <ActorSlider movies={actor?.movies ? actor?.movies : []} />
      </StyledActorSliderBlock>

      <ActorHighchart actor={actor} />
    </StyledActor>
  );
};

export default Actor;
