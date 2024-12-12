import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicationWeather'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import { useEffect, useState } from 'react';
import Item from './interface/Item';
import { AppBar, createTheme, ThemeProvider, Toolbar, Typography } from '@mui/material';
import Helmet from 'react-helmet';
import SearchBar from './components/SearchBar';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#25272b',
    },
    secondary: {
      main: '#e2e4e1',
    }
  },
});

function App() {

  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [items, setItems] = useState<Item[]>([]);
  let [city, setCity] = useState<string>("Guayaquil");

  useEffect(() => {
    let request = async () => {
      try {
        if (!city || city.length == 0) setCity("Guayaquil");
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=xml&appid=97ba37b25701174cbb5a00019fd2efe1`, { method: 'GET' });
        if (response.ok) {
          let parser = new DOMParser();
          let xml: XMLDocument = parser.parseFromString(await response.text(), "application/xml");

          let dataToIndicators: Indicator[] = new Array<Indicator>();
          let dataToItems: Item[] = new Array<Item>();

          let name = xml.getElementsByTagName("name")[0].innerHTML || ""
          dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name })

          let location = xml.getElementsByTagName("location")[1]

          let latitude = location.getAttribute("latitude") || ""
          dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

          let longitude = location.getAttribute("longitude") || ""
          dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

          let altitude = location.getAttribute("altitude") || ""
          dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })
          setIndicators(dataToIndicators)

          const toUTCminus5 = (dateString: string | null): string => {
            if (!dateString) {
              return "";
            }
            const date = new Date(dateString);
            const utcOffset = -5;
            const adjustedDate = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);
            const hours = adjustedDate.getUTCHours().toString().padStart(2, "0");
            const minutes = adjustedDate.getUTCMinutes().toString().padStart(2, "0");
            const seconds = adjustedDate.getUTCSeconds().toString().padStart(2, "0");

            return `${hours}:${minutes}:${seconds}`;
          };

          let forecasts = xml.getElementsByTagName("time");
          for (let i = 0; i < 6; i++) {
            let time = forecasts[i];
            let from = toUTCminus5(time.getAttribute("from"));
            let to = toUTCminus5(time.getAttribute("to"));
            let precipitation = time.getElementsByTagName("precipitation")[0].getAttribute("probability");
            let humidity = time.getElementsByTagName("humidity")[0].getAttribute("value");
            let clouds = time.getElementsByTagName("clouds")[0].getAttribute("all");
            let item: Item = {
              dateStart: from ? from : "",
              dateEnd: to ? to : "",
              precipitation: precipitation ? precipitation : "",
              humidity: humidity ? humidity : "",
              clouds: clouds ? clouds : ""
            };
            dataToItems.push(item);
          }
          setItems(dataToItems);
        }
      }
      catch (error) { }
    };
    request()
  }, [city]);
  let renderIndicators = () => {
    return indicators
      .map(
        (indicator, idx) => (
          <Grid key={idx} size={{ xs: 12, xl: 3 }}>
            <IndicatorWeather
              title={indicator["title"]}
              subtitle={indicator["subtitle"]}
              value={indicator["value"]}
              bgColor={theme.palette.secondary.main} />
          </Grid>
        )
      )
  }
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
        <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Nunito, sans-serif' }} color={theme.palette.secondary.main}>
            GUAYACLIMA
          </Typography>
          <SearchBar setter={setCity} bgColor={theme.palette.secondary.main} />
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} sx={{ mt: 8 }}>

        {/* Indicadores */}
        {renderIndicators()}

        {/* Tabla */}
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, xl: 5 }}>
              <ControlWeather itemsIn={items} bgColor={theme.palette.secondary.main}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 7 }}>
              <TableWeather itemsIn={items} bgColor={theme.palette.secondary.main} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
