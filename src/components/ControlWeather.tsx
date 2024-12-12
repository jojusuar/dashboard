import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useRef, useEffect } from 'react';
import LineChartWeather from './LineChartWeather';
import Item from '../interface/Item';
import ChartData from '../interface/ChartData';

interface ControlWeatherProps {
    itemsIn: Item[] | null;
    bgColor: string;
}

export default function ControlWeather({ itemsIn, bgColor }: ControlWeatherProps) {
    let [selected, setSelected] = useState(-1);
    let [chartData, setChartData] = useState<ChartData>({ uData: [], xLabels: [], bgColor: bgColor });

    const descriptionRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: SelectChangeEvent) => {
        let idx = parseInt(event.target.value)
        setSelected(idx);

        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
        }
        setChartData({ uData: items[idx]["values"], xLabels: start, bgColor: bgColor });
    };

    useEffect(() => {
        if (selected > -1) {
            setChartData({ uData: items[selected]["values"], xLabels: start, bgColor: bgColor });
        }
    }, [itemsIn]);

    let start: (string | null)[] = [];
    let humidity: (number | null)[] = [];
    let precipitation: (number | null)[] = [];
    let clouds: (number | null)[] = [];
    itemsIn?.map(item => {
        start.push(item.dateStart);
        humidity.push(parseFloat(item.humidity));
        precipitation.push(parseFloat(item.precipitation));
        clouds.push(parseFloat(item.clouds));
    });

    {/* Arreglo de objetos */ }
    let items = [
        { "name": "Precipitación", "description": "Cantidad de agua que cae sobre una superficie en un período específico.", "values": precipitation },
        { "name": "Humedad", "description": "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.", "values": humidity },
        { "name": "Nubosidad", "description": "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.", "values": clouds }
    ]

    {/* Arreglo de elementos JSX */ }
    let options = items.map((item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem>)

    {/* JSX */ }
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: bgColor
            }}
        >

            <Typography mb={2} component="h3" variant="h6" color="primary">
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        sx={{
                            backgroundColor: bgColor
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    backgroundColor: bgColor
                                },
                            },
                        }}
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        defaultValue={selected.toString()}
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>

                        {options}

                    </Select>
                </FormControl>

            </Box>

            <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />
            <LineChartWeather uData={chartData ? chartData.uData : []} xLabels={chartData ? chartData.xLabels : []} bgColor={chartData ? chartData.bgColor : ""} />
        </Paper>
    )
}