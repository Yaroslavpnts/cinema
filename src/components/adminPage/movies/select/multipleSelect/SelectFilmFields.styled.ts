import { MenuItem, styled, TextField } from '@mui/material';

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
  justify-content: space-between;
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    font-size: 16px;
    line-height: 16px;

    &::placeholder {
      font-family: 'Anonymous Pro';
      color: #969696;
      opacity: 1;
      font-size: 16px;
      line-height: '16px';
      font-weight: 400;
    }
  }
  .MuiOutlinedInput-root .MuiAutocomplete-input {
    padding: 0px;
  }
  .MuiOutlinedInput-root {
    padding-left: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;
