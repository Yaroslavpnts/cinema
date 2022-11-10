import React from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledTextField } from './SelectFilmFields.styled';

interface ISelectProps {
  name: string;
  value: { id: number; name: string }[];
  options: { id: number; name: string }[];
  setFieldValue: (
    field: string,
    value: { id: number; name: string }[],
    shouldValidate?: boolean | undefined
  ) => void;
  title: string;
  id: string;
  placeholderText: string;
}

const SelectFilmFields: React.FC<ISelectProps> = ({
  name,
  value,
  options,
  setFieldValue,
  title,
  id,
  placeholderText,
}) => {
  return (
    <>
      <Autocomplete
        sx={{
          '.MuiOutlinedInput-root': {
            backgroundColor: '#fff',
          },
        }}
        multiple
        value={value}
        id="tags-outlined"
        options={options}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(e, newValue) =>
          setFieldValue(
            name,
            newValue.map(value => value)
          )
        }
        getOptionLabel={({ name }: { name: string }) => name}
        filterSelectedOptions
        renderInput={params => {
          return (
            <StyledTextField
              {...params}
              value={value}
              name={name}
              id={id}
              placeholder={value[0] ? '' : placeholderText}
            />
          );
        }}
      />
    </>
  );
};

export default SelectFilmFields;
