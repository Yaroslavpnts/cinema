import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface PaletteOptions {
    customColor?: PaletteColorOptions;
    black?: PaletteColorOptions;
    white?: PaletteColorOptions;
  }

  interface Palette {
    customColor: PaletteColor;
    black: PaletteColor;
    white: PaletteColor;
  }

  interface LinearProgressPropsColorOverrides {
    customColor: true;
    black: true;
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    customColor: true;
    black: true;
  }
}
