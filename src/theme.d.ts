import { PaletteColorOptions, PaletteColor, Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`

  // interface Theme {
  //   palette: {
  //     customColor: {
  //       main: string;
  //       light: string;
  //     };
  //     black: {
  //       main: string;
  //     };
  //   };
  // }

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

// import { Theme, ThemeOptions } from '@mui/material/styles';

// declare module '@mui/material/styles' {
//   interface CustomTheme extends Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface CustomThemeOptions extends ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
//   export function createTheme(options?: CustomThemeOptions): CustomTheme;
// }

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    customColor: true;
    black: true;
  }
}
