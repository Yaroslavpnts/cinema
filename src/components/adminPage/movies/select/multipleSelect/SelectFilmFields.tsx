import React from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

interface ISelectProps {
  name: string;
  value: string[];
  options: Array<{ id: number; name: string }>;
  setFieldValue: (field: string, value: string[], shouldValidate?: boolean | undefined) => void;
  // children: React.ReactNode;
  title: string;
  id: string;
  // newItemTitle: string;
}

const SelectFilmFields: React.FC<ISelectProps> = ({
  name,
  value,
  options,
  setFieldValue,
  title,
  id,
}) => {
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={options}
      onChange={(e, value) =>
        setFieldValue(
          name,
          value.map(value => value.name)
        )
      }
      getOptionLabel={({ name }: { name: string }) => name}
      filterSelectedOptions
      renderInput={params => <TextField {...params} value={value} name={name} id={id} />}
    />
  );
};

export default SelectFilmFields;
