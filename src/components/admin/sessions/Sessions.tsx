import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { citiesSelector, fetchCitiesAction } from '../../../redux/slices/citiesSlice';
import CitySelectorBlock from '../../sessions/citySelectorBlock/CitySelectorBlock';
import SessionCreateBlock from './sessionCreateBlock/SessionCreateBlock';
import { SessionBlockStyled, StyledContainer } from './Sessions.styled';

const Sessions: React.FC = () => {
  const dispatch = useAppDispatch();

  const cities = useAppSelector(citiesSelector);

  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCitiesAction());
  }, []);

  return (
    <SessionBlockStyled>
      <StyledContainer>
        <CitySelectorBlock cities={cities} setCityName={setCityName} cityName={cityName} />
        {cityName && <SessionCreateBlock cityName={cityName} />}
      </StyledContainer>
    </SessionBlockStyled>
  );
};

export default Sessions;
