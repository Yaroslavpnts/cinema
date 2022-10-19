import { Input, styled } from '@mui/material';
import { Button } from '@mui/material';

interface BtnSendValueProps {
  sz?: string;
}

export const FormEnter = styled('div')({
  height: '0px',
  transition: '0.7s',
  overflow: 'hidden',
  '&.show-enter': {
    height: '200px',
    transition: '0.7s',
  },
});

export const BtnShowForm = styled(Button)(({ theme }) => ({
  color: theme.palette.customColor.main,
  width: '100%',
  borderRadius: '20px',
  padding: '7px',
  marginBottom: '15px',
  '&:hover': {
    backgroundColor: theme.palette.customColor.main,
    color: '#fff',
  },
}));

export const BtnSendValues = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.customColor.main,
  padding: '10px 40px',
  borderRadius: '15px',
  marginTop: '15px',
}));

export const FormRegistration = styled('div')`
  height: 0px;
  transition: 0.7s ease-in-out;
  overflow: hidden;
  &.opened {
    height: 200px;
  }
`;

export const CustomInput = styled(Input)`
  font-size: 20px;
  padding: 5px 10px;
  &:focus {
    outline: none;
    border: none;
  }
  &.MuiInput-underline {
    outline: none;
    border: none;
  }
`;
