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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const containsText = (text: string, searchText: string) =>
  // text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  text.toLowerCase().includes(searchText.toLowerCase());

interface ISelectProps {
  name: string;
  value: string[];
  options: Array<{ id: number; name: string }>;
  setFieldValue: (field: string, value: string[], shouldValidate?: boolean | undefined) => void;
  children: React.ReactNode;
  title: string;
  newItemTitle: string;
}

const SelectValue: React.FC<ISelectProps> = ({
  name: fieldName,
  value,
  options,
  setFieldValue,
  children,
  title,
  newItemTitle,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = useState('');

  let displayedOptions = useMemo(
    () => options.filter(option => containsText(option.name, searchText)),
    [searchText]
  );

  const handleClose = (
    e: React.MouseEvent<HTMLElement>,
    reason: 'escapeKeyDown' | 'backdropClick'
  ) => {
    setOpen(false);
  };

  const theme = useTheme();

  const uniqueId = uuidv4();

  const displayedList = [{ id: uniqueId, name: newItemTitle }, ...displayedOptions];

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setFieldValue(fieldName, typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ width: 350 }}>
        <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name={fieldName}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={title} />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <ListSubheader>
            <TextField
              size="small"
              // Autofocus on textfield
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => {
                if (e.key !== 'Escape') {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedList.map(option => {
            return option.id !== uniqueId ? (
              <MenuItem
                key={option.id}
                value={option.name}
                style={getStyles(option.name, value, theme)}
              >
                {option.name}
              </MenuItem>
            ) : (
              <StyledMenuItem key={option.id} sx={{ position: 'relative' }}>
                {option.name}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '100%',
                  }}
                  onClick={() => setOpen(true)}
                ></div>
                {/* <CreateModal handleClose={handleClose} open={open}>
                  {children}
                </CreateModal> */}
                <AddBoxIcon />
              </StyledMenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectValue;
