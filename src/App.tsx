import './App.css';
//import Grid from '@mui/material/Grid2'
import Dashboard from './Dashboard';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import Helmet from 'react-helmet';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#311f53',
    },
    secondary: {
      main: '#dfd6e7',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <style>{`body { 
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.secondary.main};
        font-family: 'Nunito', sans-serif;
        } 
        `}</style>
      </Helmet>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Nunito, sans-serif' }} color="secondary">
            GUAYACLIMA
          </Typography>
        </Toolbar>
      </AppBar>
      <Dashboard/>
      {/*<Grid container spacing={5}>

        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 1</Grid>
        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 2</Grid>
        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 3</Grid>
        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 4</Grid>

        <Grid size={{ xs: 12, xl: 8 }}>Elemento: Tabla</Grid>

        <Grid size={{ xs: 12, xl: 4 }}>Elemento: Gráfico 1</Grid>

      </Grid>
      */}
    </ThemeProvider>
  )
}

export default App
