import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { theme } from "./App";
import React from 'react';
import { Typography } from '@mui/material';

type HumidityChartProps = {
    xData: Array<number>;
    yData: Array<number | null>;
};

class HumidityChart extends React.Component<HumidityChartProps> {
    render() {
        return (
            <Card
                sx={{
                    backgroundColor: '#5a3b80',
                    color: theme.palette.secondary.main,
                    border: '2pt solid transparent'
                }}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                        % de humedad durante las siguientes 120 horas (5 días)
                    </Typography>
                    <LineChart
                        xAxis={[{
                            data: this.props.xData,
                            label: "Δ horas"
                        }]}
                        series={[
                            {
                                data: this.props.yData,
                                color: theme.palette.secondary.main
                            },
                        ]}
                        yAxis={[{
                            min: 0,
                            max: 100,
                            label: "%hum"
                        }]}
                        width={500}
                        height={300}
                        sx={{
                            color: theme.palette.secondary.main,
                            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                                fontFamily: "Nunito, sans-serif !important",
                                fill: `${theme.palette.secondary.main} !important`,
                            },
                            "& .MuiChartsAxis-label": {
                                fontFamily: "Nunito, sans-serif !important",
                                fill: `${theme.palette.secondary.main} !important`, 
                            },
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                                stroke: theme.palette.secondary.main,
                                strokeWidth: 2,
                            },
                            "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                                stroke: theme.palette.secondary.main,
                                strokeWidth: 2,
                            },
                        }}
                    />
                </CardContent>
            </Card>

        );
    }
}

export default HumidityChart;