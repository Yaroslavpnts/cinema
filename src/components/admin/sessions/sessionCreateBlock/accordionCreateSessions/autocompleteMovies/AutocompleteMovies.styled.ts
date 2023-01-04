import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material';

export const AutocompleteMoviesStyled = styled(Autocomplete)`
  .MuiInputBase-root.MuiOutlinedInput-root {
    border-radius: 33px;
  }

  .MuiFormControl-root {
    width: 270px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.theme.palette.customColor.main};
  }
`;
