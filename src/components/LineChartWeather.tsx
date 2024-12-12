import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import ChartData from '../interface/ChartData';

export default function LineChartWeather({
    uData,
    xLabels,
    bgColor
}: ChartData) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: bgColor
            }}
        >

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={400}
                height={250}
                series={[
                    { data: uData, label: 'Variable seleccionada' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Paper>
    );
}