import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useRef } from 'react';

export default function ControlWeather() {
    let [selected, setSelected] = useState(-1);

    const descriptionRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: SelectChangeEvent) => {
        let idx = parseInt(event.target.value)
        setSelected(idx);

        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
        }

    };

    {/* Arreglo de objetos */ }
    let items = [
        { "name": "Precipitación", "description": "Cantidad de agua que cae sobre una superficie en un período específico." },
        { "name": "Humedad", "description": "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje." },
        { "name": "Nubosidad", "description": "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida." }
    ]

    {/* Arreglo de elementos JSX */ }
    let options = items.map((item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem>)

    {/* JSX */ }
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Typography mb={2} component="h3" variant="h6" color="primary">
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
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

        </Paper>


    )
}