import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const MovieRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

interface ISengleSelectProps {
  name: string;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
  value: string;
}

const SingleSelect: React.FC<ISengleSelectProps> = ({ name, setFieldValue, value }) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(name, event.target.value);
  };

  return (
    // <div>
    <FormControl>
      {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
      <Select
        // labelId="demo-simple-select-helper-label"
        // id="demo-simple-select-helper"
        value={value}
        // label="Age"
        onChange={handleChange}
      >
        {MovieRatings.map(r => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
    // </div>
  );
};

export default SingleSelect;
