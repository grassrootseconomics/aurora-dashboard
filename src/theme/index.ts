import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#39AA82',
      light: '#7BB551',
      contrastText: 'white',
    },
    secondary: {
      main: '#2FD399',
      contrastText: 'white',
    },
    info: {
      main: '#F2F2F2',
      contrastText: 'white',
    },
    success: {
      main: '#6FCF97',
    },
    error: {
      main: '#CB0000',
    },
    text: {
      primary: '#000000',
      secondary: '#00A77D',
    },
    background: {
      default: 'white',
    },
  },
});

export default theme;
