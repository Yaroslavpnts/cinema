import { styled } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

export const AccordionSummaryStyled = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
    .MuiTypography-root {
      &:last-of-type {
        margin-right: 10px;
        color: rgba(60, 180, 231, 0.9);
      }
    }
  }
`;

export const FormFieldsBlock = styled('div')`
  margin-bottom: 30px;
  p {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-size: 20px;
  }
`;

export const ButtonStyled = styled('button')`
  background: #3cb4e7;
  border: 1px solid rgba(197, 233, 248, 0.11);
  box-shadow: 0px 2px 6px rgba(60, 180, 231, 0.66);
  border-radius: 33px;
  padding: 10px;

  font-family: 'Anonymous Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #ffffff;

  cursor: pointer;
  &:hover {
    box-shadow: 1px 0px 14px #3cb4e7;
  }

  &:active {
    box-shadow: inset 1px 3px 10px rgba(0, 0, 0, 0.25);
  }
`;
