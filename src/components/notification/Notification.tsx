import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import { minWidth } from '@mui/system';
import { SnackBarStyled } from './Notification.styled';

interface IProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

// const Notification: React.FC<IProps> = ({ severity }) => {
//   return <Alert severity={severity}>Alert</Alert>;

const Alert: React.FC<IProps> = React.forwardRef(function Alert(
  props,
  ref:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
};

const Notification: React.FC<Props> = ({ isOpen, severity, children, setIsOpen }) => {
  // const [open, setOpen] = React.useState(isOpen);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    setIsOpen(false);
  };

  return (
    <SnackBarStyled
      open={isOpen}
      autoHideDuration={300000}
      onClose={handleClose}
      sx={{
        '.MuiSnackbar-root': {
          left: '4px',
          bottom: '4px',
        },
      }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {children}
      </Alert>
    </SnackBarStyled>
  );
};

// };

export default Notification;
