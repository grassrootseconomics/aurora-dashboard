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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: '#964514',
          borderRadius: '15px',
          marginRight: 10,
          minWidth: 'auto',
          color: 'white',
          '&.Mui-selected': {
            color: 'white',
            boxShadow: '3px 5px #888888',
          },
          '&.MuiTabScrollButton-root': {
            display: 'block!important',
          },
        },
      },
    },
  },
});

export default theme;
