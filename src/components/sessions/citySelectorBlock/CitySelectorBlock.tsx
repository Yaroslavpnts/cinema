import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { IApiResponseCity } from '../../../api/apiMethods';
import { StyledCitySelectorBlock } from './citySelector.styled';

interface CitySelectorBlockProps {
  setCityName: (id: string) => void;
  cityName: string;
  cities: IApiResponseCity[];
}

const CitySelectorBlock: React.FC<CitySelectorBlockProps> = ({ cities, setCityName, cityName }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setCityName(event.target.value);
  };

  return (
    <StyledCitySelectorBlock>
      <h2>Розклад фільмів у</h2>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select value={cityName} onChange={handleChange} autoWidth>
          {cities.map(city => (
            <MenuItem key={city.city_id} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledCitySelectorBlock>
  );
};

export default CitySelectorBlock;
