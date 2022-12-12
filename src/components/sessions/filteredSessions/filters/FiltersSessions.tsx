import React, { useEffect, useRef, useState } from 'react';
import {
  StyledFilterBlock,
  StyledFiltersList,
  StyledFiltersSessions,
  StyledHeaderFilters,
} from './FiltersSessions.styled';
import { ReactComponent as Filter } from '../../../../assets/img/filter-icon.svg';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from '@mui/material';
import dayjs from 'dayjs';
import { IApiResponseCinemaHall } from '../../../../api/apiMethods';
import { ICinemaHallsChecked } from '../../../../redux/slices/cinemaHallsSlice';

interface IFiltersSessionsProps {
  setDateStart: (date: string) => void;
  setDateEnd: (date: string) => void;
  dateStart: string;
  dateEnd: string;
  technologiesChecked: ICinemaHallsChecked[];
  setTechnologiesChecked: (technologies: ICinemaHallsChecked[]) => void;
}

export const FiltersSessions: React.FC<IFiltersSessionsProps> = ({
  setDateStart,
  setDateEnd,
  dateStart,
  dateEnd,
  technologiesChecked,
  setTechnologiesChecked,
}) => {
  const today = useRef(dateStart);
  const tommorow = useRef(dayjs(dateStart).add(1, 'day').format('YYYY-MM-DD'));
  const dayAfterWeek = useRef(dayjs(dateStart).add(7, 'day').format('YYYY-MM-DD'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd((event.target as HTMLInputElement).value);
    setDateStart((event.target as HTMLInputElement).value);

    if (event.target.value === dayAfterWeek.current) {
      setDateStart(today.current);
    }
  };

  const handleChecked = (cinemaHall: ICinemaHallsChecked) => {
    const checked = technologiesChecked?.map(t => {
      if (t.cinemas_hall_id === cinemaHall.cinemas_hall_id) {
        return { ...t, checked: !t.checked };
      } else {
        return t;
      }
    });

    setTechnologiesChecked(checked ? checked : []);
  };

  return (
    <StyledFiltersSessions>
      <StyledHeaderFilters>
        <Filter />
        <h4>Фільтри</h4>
      </StyledHeaderFilters>
      <StyledFiltersList>
        <StyledFilterBlock>
          <h4>Період:</h4>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={dateEnd}
              onChange={handleChange}
            >
              <FormControlLabel value={today.current} control={<Radio />} label="Сьогодні" />
              <FormControlLabel value={tommorow.current} control={<Radio />} label="Завтра" />
              <FormControlLabel value={dayAfterWeek.current} control={<Radio />} label="Тиждень" />
            </RadioGroup>
          </FormControl>
        </StyledFilterBlock>
        <StyledFilterBlock>
          <h4>Технологія:</h4>
          <FormGroup>
            {technologiesChecked?.map(technology => (
              <FormControlLabel
                key={technology.cinemas_hall_id}
                control={
                  <Checkbox
                    onChange={() => handleChecked(technology)}
                    checked={technology.checked}
                  />
                }
                label={technology.name}
              />
            ))}
          </FormGroup>
        </StyledFilterBlock>
      </StyledFiltersList>
    </StyledFiltersSessions>
  );
};
