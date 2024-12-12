import { Paper, Typography } from "@mui/material";

interface Indicator {
    title?: string;
    subtitle?: string;
    value?: string;
    bgColor: string;
}

export default function IndicatorWeather(config: Indicator) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: config.bgColor
            }}
        >
            <Typography component="h2" variant="h6"
                color="primary" gutterBottom>
                {config.title}
            </Typography>
            <Typography component="p" variant="h4">
                {config.value}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {config.subtitle}
            </Typography>
        </Paper>
    )
}