import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useState } from 'react';
import { IApiResponseCinemaHall } from '../../../../../../api/apiMethods';

interface ISelectCinemaHallProps {
  cinemaHalls: IApiResponseCinemaHall[] | undefined;
  setValue: (field: string, value: number, shouldValidate?: boolean | undefined) => void;
}

const SelectCinemaHall: React.FC<ISelectCinemaHallProps> = ({ cinemaHalls, setValue }) => {
  const [checked, setChecked] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('cinema_hall_id', Number(event.target.value));
    setChecked(Number(event.target.value));
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={checked}
        onChange={handleChange}
      >
        {cinemaHalls?.map(c => (
          <FormControlLabel
            key={c.cinemas_hall_id}
            value={c.cinemas_hall_id}
            control={<Radio />}
            label={c.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SelectCinemaHall;
