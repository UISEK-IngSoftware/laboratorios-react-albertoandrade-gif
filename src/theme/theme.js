import { createTheme } from '@mui/material/styles';

const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#0789C1' : '#4FC3F7',
      light: mode === 'light' ? '#19A7DC' : '#81D4FA',
      dark: mode === 'light' ? '#005F8A' : '#0288D1',
    },
    secondary: {
      main: mode === 'light' ? '#FF6B35' : '#FF9E80',
      light: mode === 'light' ? '#FFB84D' : '#FFCCBC',
      dark: mode === 'light' ? '#E55100' : '#FF6E40',
    },
    background: {
      default: mode === 'light' ? '#EEF3F8' : '#0F1720',
      paper: mode === 'light' ? '#FFFFFF' : '#18232E',
    },
    text: {
      primary: mode === 'light' ? '#1A1A1A' : '#F5F7FA',
      secondary: mode === 'light' ? '#5F6670' : '#B8C2CC',
    },
    success: {
      main: mode === 'light' ? '#2E7D32' : '#66BB6A',
    },
    error: {
      main: mode === 'light' ? '#D32F2F' : '#EF5350',
    },
    warning: {
      main: mode === 'light' ? '#ED6C02' : '#FFA726',
    },
    info: {
      main: mode === 'light' ? '#0288D1' : '#29B6F6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            mode === 'light'
              ? 'linear-gradient(135deg, #EEF3F8 0%, #DCE7F2 100%)'
              : 'linear-gradient(135deg, #0F1720 0%, #172635 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            mode === 'light'
              ? '0 2px 8px rgba(0, 0, 0, 0.1)'
              : '0 2px 10px rgba(0, 0, 0, 0.35)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow:
              mode === 'light'
                ? '0 8px 24px rgba(0, 0, 0, 0.15)'
                : '0 8px 24px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover fieldset': {
              borderColor: mode === 'light' ? '#0789C1' : '#4FC3F7',
            },
            '&.Mui-focused fieldset': {
              borderColor: mode === 'light' ? '#0789C1' : '#4FC3F7',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            mode === 'light'
              ? 'linear-gradient(135deg, #0789C1 0%, #19A7DC 55%, #087FB8 100%)'
              : 'linear-gradient(135deg, #0B4F6C 0%, #096B8F 55%, #073B52 100%)',
          color: '#FFFFFF',
          boxShadow:
            mode === 'light'
              ? '0 2px 8px rgba(0, 0, 0, 0.18)'
              : '0 2px 10px rgba(0, 0, 0, 0.45)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '1rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

export default lightTheme;
