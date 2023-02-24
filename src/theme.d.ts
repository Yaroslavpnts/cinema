import { PaletteColorOptions, PaletteColor, Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface ThemeOptions {
    customColor?: React.CSSProperties['color'];
    black?: React.CSSProperties['color'];
    white?: React.CSSProperties['color'];
  }

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
