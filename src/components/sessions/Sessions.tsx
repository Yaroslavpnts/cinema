import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { citiesSelector, fetchCitiesAction } from '../../redux/slices/citiesSlice';
import CitySelectorBlock from './citySelectorBlock/CitySelectorBlock';
import { FilteredSessions } from './filteredSessions/FilteredSessions';
import { StyledSession } from './Session.styled';

const Sessions: React.FC = () => {
  const dispatch = useAppDispatch();

  const cities = useAppSelector(citiesSelector);

  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCitiesAction());
  }, []);

  return (
    <StyledSession>
      <CitySelectorBlock cities={cities} setCityName={setCityName} cityName={cityName} />
      {cityName && <FilteredSessions cityName={cityName} />}
    </StyledSession>
  );
};

export default Sessions;
