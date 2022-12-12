import { styled } from '@mui/material/styles';
import { Radio } from '@mui/material';

export const StyledFiltersSessions = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const StyledHeaderFilters = styled('div')`
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 15px;
  font-family: 'Anonymous Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  text-transform: lowercase;
  color: #5a5b5b;
`;

export const StyledFiltersList = styled('ul')`
  /* border-top: 1px solid #b0aaaa; */
`;

export const StyledFilterBlock = styled('div')`
  border-top: 1px solid #b0aaaa;
  padding: 15px 15px 15px 55px;
  padding-right: 55px;

  h4 {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    text-transform: lowercase;
    color: #9c9d9d;
    margin-bottom: 10px;
  }

  .MuiFormGroup-root {
    .MuiTypography-root {
      font-family: 'Anonymous Pro';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 120%;
      letter-spacing: 0.03em;
      color: #171717;
    }
  }
`;
