import { MenuItem, styled, TextField } from '@mui/material';

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
  justify-content: space-between;
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    font-size: 18px;
    line-height: 18px;
    &::placeholder {
      font-family: 'Anonymous Pro';
      color: #969696;
      opacity: 1;
      font-size: 18px;
      line-height: '18px';
      font-weight: 400;
    }
  }
`;
