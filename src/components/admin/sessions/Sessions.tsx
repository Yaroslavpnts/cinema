import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { citiesSelector, fetchCitiesAction } from '../../../redux/slices/citiesSlice';
import CitySelectorBlock from '../../sessions/citySelectorBlock/CitySelectorBlock';
import SessionCreateBlock from './sessionCreateBlock/SessionCreateBlock';
import { SessionBlockStyled, StyledContainer } from './Sessions.styled';

const Sessions: React.FC = () => {
  const dispatch = useAppDispatch();

  const [cityName, setCityName] = useState<string>('');

  const cities = useAppSelector(citiesSelector);

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
