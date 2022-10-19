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
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1350,
      xl: 1536,
    },
  },
});
