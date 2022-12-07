import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const MovieRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

type PlaceholderProps = {
  children: React.ReactNode;
};

const Placeholder: React.FC<PlaceholderProps> = ({ children }) => {
  return (
    <div
      style={{
        color: '#969696',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '16px',
        fontFamily: 'Anonymous Pro',
      }}
    >
      {children}
    </div>
  );
};

interface ISengleSelectProps {
  name: string;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
  value: string;
}

const SingleSelect: React.FC<ISengleSelectProps> = ({ name, setFieldValue, value }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <FormControl>
      <Select
        value={value}
        displayEmpty
        onChange={handleChange}
        sx={{
          '.MuiSelect-select': {
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '5px 15px',
          },
        }}
        renderValue={selected => {
          return value ? value : <Placeholder>Рейтинг</Placeholder>;
        }}
      >
        {MovieRatings.map(r => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
};

export default SingleSelect;
