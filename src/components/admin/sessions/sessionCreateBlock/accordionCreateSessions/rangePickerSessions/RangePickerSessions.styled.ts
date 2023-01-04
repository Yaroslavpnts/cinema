import { styled, css } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';

export const DatePickerSessionStyled = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 15px;
  svg {
    cursor: pointer;
  }
`;

export const TimeSessionsPickerStyled = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 200px));
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
          border-bottom: 1px solid ${props => props.theme.palette.customColor.main};
        }
      }
    }

    &::before {
      border-bottom: 1px solid ${props => props.theme.palette.customColor.main};
    }

    &.Mui-focused {
      &::after {
        transform: scale(1) translate(0);
      }
    }

    &::after {
      border-bottom: 1px solid black;
    }

    svg {
      color: ${props => props.theme.palette.customColor.main};
    }
  }
`;

export const SessionStyled = styled('div')`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

export const SessionBlock = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;

  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.theme.palette.customColor.main};
  }
`;

export const IconButtonStyled = styled(IconButton)`
  svg {
    color: ${props => props.theme.palette.customColor.main};
  }

  cursor: pointer;
`;

export const AddCircleOutlineIconStyled = styled(AddCircleOutlineIcon)`
  color: ${props => props.theme.palette.customColor.main};

  &:active {
    font-size: 2rem;
  }
`;

export const AddSessionBlockStyled = styled('div')`
  display: flex;
  align-items: center;
  height: 35px;
`;

export const SwithStyled = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
  '& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.white,
    '&+.MuiSwitch-track': {
      backgroundColor: theme.palette.customColor.main,
    },
  },
}));
