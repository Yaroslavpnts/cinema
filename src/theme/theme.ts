import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    customColor: {
      main: '#3cb4e7',
      light: 'rgba(60, 180, 231, 0.3)',
    },
    black: {
      main: '#121212',
    },
    white: {
      main: '#f8f5f5',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1300,
      xl: 1600,
    },
  },
});
