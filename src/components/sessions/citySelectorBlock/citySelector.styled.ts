import { styled } from '@mui/material';

export const StyledCitySelectorBlock = styled('div')`
  display: flex;
  align-items: center;
  h2 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    color: #171717;
  }

  .MuiSelect-select {
    border: 1px solid ${props => props.theme.palette.customColor.main};
    border-radius: 33px;
    padding-right: 70px;
    &:focus {
      border-radius: 33px;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-style: none;
  }

  .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input {
    padding: 10px 33px 10px 14px;
    border-radius: 15px;
  }
`;
