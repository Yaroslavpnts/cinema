import { styled } from '@mui/material';

export const StyledCitySelectorBlock = styled('div')`
  display: flex;
  align-items: center;
  h2 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #171717;
  }

  .MuiSelect-select {
    border: 1px solid ${props => props.theme.palette.customColor.main};
    border-radius: 33px;
    /* padding-right: 54px; */
  }
  .MuiOutlinedInput-notchedOutline {
    border-style: none;
  }
`;
