import { createTheme } from "@mui/material";
import { darken } from '@mui/material/styles';

const defaultFontFamily = 'Roboto, sans-serif';

export default createTheme({
  typography: {
    fontFamily: defaultFontFamily,
    h1: {
      fontFamily: defaultFontFamily,
      fontSize: '2.6rem',
      margin: '1rem 0',
      textAlign: 'center',
    },
    h2: {
      fontFamily: defaultFontFamily,
      fontSize: '2rem',
      margin: '.8rem 0',
    },
    body1: {
      p: {
        margin: 0,
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          backgroundColor: '#8fc1e3',

          '&:hover': {
            // darken background color by 30%
            backgroundColor: darken('#8fc1e3', 0.3),
          }
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          padding: '0',
        }
      }
    }
  }
});