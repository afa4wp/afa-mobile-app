import { extendTheme, ITheme } from 'native-base';

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
  mark: {
    900: '#CC3466',
    800: '#383042',
    700: '#fff',
    600: '#CC3466',
    500: '#383042',
    400: '#fff',
    300: '#CC3466',
    200: '#383042',
    100: '#fff',
    50: '#CC3466',
  },
  schemahelper: {
    900: '#0c4a6e',
    800: '#075985',
    700: '#0369a1',
    600: '#383042',
    500: '#0ea5e9',
    400: '#38bdf8',
    300: '#7dd3fc',
    200: '#bae6fd',
    100: '#e0f2fe',
    50: '#f0f9ff',
  },
  schemaPressed: {
    900: '#d4d4d4',
  },
};

export const theme: ITheme = extendTheme({ colors: newColorTheme });
