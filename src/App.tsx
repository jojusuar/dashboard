import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicationWeather'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import { useEffect, useState } from 'react';
import Item from './interface/Item';

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {

  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let request = async () => {
      try {
        let response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=97ba37b25701174cbb5a00019fd2efe1", { method: 'GET' });
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

          let forecasts = xml.getElementsByTagName("time");
          for( let i = 0; i < 6; i++ ) {
            let time = forecasts[i];
            let from = time.getAttribute("from");
            let to = time.getAttribute("to");
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
  }, []);
  let renderIndicators = () => {
    return indicators
      .map(
        (indicator, idx) => (
          <Grid key={idx} size={{ xs: 12, xl: 3 }}>
            <IndicatorWeather
              title={indicator["title"]}
              subtitle={indicator["subtitle"]}
              value={indicator["value"]} />
          </Grid>
        )
      )
  }
  return (
    <Grid container spacing={5}>

      {/* Indicadores */}
      {renderIndicators()}

      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 8 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 3 }}>
            <ControlWeather />
          </Grid>
          <Grid size={{ xs: 12, xl: 9 }}>
            <TableWeather itemsIn={ items } />
          </Grid>
        </Grid></Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, xl: 4 }}> <LineChartWeather /></Grid>

    </Grid>
  )
}

export default App
