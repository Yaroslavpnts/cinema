import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import { Autocomplete } from '@react-google-maps/api';

export const StyledLocationBlock = styled('div')`
  h2,
  h3 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 38px;
    margin-bottom: 25px;
  }
`;

export const StyledCityList = styled('ul')`
  display: flex;
  gap: 70px;
  margin-bottom: 40px;

  button {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 22px;
    padding: 10px;
    border: ${props => props.theme.palette.customColor.main};
    box-shadow: 2px 4px 9px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    background: #fff;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 2px 16px ${props => props.theme.palette.customColor.main};
    }
  }
`;

export const StyledAutocomplete = styled(Autocomplete)`
  position: relative;
  width: 600px;
  svg {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

export const StyledInput = styled('input')`
  margin-bottom: 40px;
  padding: 10px;
  outline: none;
  border: 1px solid #59c1ed;
  border-radius: 5px;
  width: 100%;
  font-family: 'Anonymous Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  &::placeholder {
    color: #969696;
  }
`;

export const StyledButton = styled(Button)`
  margin-bottom: 25px;
  padding: 10px;
  background: ${props => props.theme.palette.customColor.main};
  border: 1px solid #59c1ed;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  text-transform: none;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 28px;
  color: #f3f5f7;

  &:active {
    box-shadow: inset 1px 3px 10px rgba(0, 0, 0, 0.25);
  }
  &:hover {
    background: ${props => props.theme.palette.customColor.main};
    /* box-shadow: 1px 0px 14px #3cb4e7; */
  }
`;

export const StyledCalculatedData = styled('div')`
  display: flex;
  gap: 100px;
  margin-bottom: 30px;
  font-family: 'Anonymous Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 22px;
`;
