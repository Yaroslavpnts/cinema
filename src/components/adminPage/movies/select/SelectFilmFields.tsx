import React, { useState, useMemo } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ListSubheader, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import { StyledMenuItem } from './Select.styled';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateModal from '../../../modal/Modal';
import Autocomplete from '@mui/material/Autocomplete';

interface ISelectProps {
  name: string;
  value: string[];
  options: Array<{ id: number; name: string }>;
  setFieldValue: (field: string, value: string[], shouldValidate?: boolean | undefined) => void;
  // children: React.ReactNode;
  title: string;
  // newItemTitle: string;
}

const SelectFilmFields: React.FC<ISelectProps> = ({
  name,
  value,
  options,
  setFieldValue,
  title,
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
      renderInput={params => <TextField {...params} value={value} name={name} />}
    />
  );
};

export default SelectFilmFields;
