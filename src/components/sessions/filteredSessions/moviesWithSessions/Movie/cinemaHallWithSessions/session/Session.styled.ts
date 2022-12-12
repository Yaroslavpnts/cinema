import { styled } from '@mui/material';

export const StyledSessionChoose = styled('div')`
  padding: 5px 10px;
  background: #52bbe8;
  border: 1px solid ${props => props.theme.palette.customColor.main};
  border-radius: 5px;
  font-family: 'Anonymous Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #1096e1;
  }

  &:active {
    background: #52bbe8;
  }
`;
