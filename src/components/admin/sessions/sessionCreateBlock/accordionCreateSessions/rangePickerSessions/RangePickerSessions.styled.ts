import { styled } from '@mui/material';

export const DatePickerSessionStyled = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const TimeSessionsPickerStyled = styled('div')`
  width: 100%;
  display: flex;
  gap: 30px;
`;

export const DateBlockStyled = styled('div')`
  display: flex;
  gap: 40px;

  .MuiFormControl-root {
    width: 210px;
  }

  .MuiFormLabel-root.MuiInputLabel-root.Mui-focused {
    color: black;
  }

  .MuiInputBase-root.MuiInput-root {
    &:hover {
      &:not(.Mui-disabled) {
        &::before {
          border-bottom: none;
        }
      }
    }
    &.Mui-focused {
      &::after {
        transform: scale(1) translate(0);
      }
    }

    &::after {
      border-bottom: 1px solid black;
    }
  }
`;

export const SessionStyled = styled('div')`
  display: flex;
  flex-direction: column;
`;
