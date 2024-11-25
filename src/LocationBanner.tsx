import { theme } from "./App";
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";


type LocationBannerProps = {
    city: string;
    country: string;
    timezone: string;
    lat: string;
    lon: string;
};

class LocationBanner extends React.Component<LocationBannerProps> {
    constructor(props: LocationBannerProps) {
        super(props);
    }
    render() {
        return (
            <Card
                sx={{
                    backgroundColor: '#5a3b80',
                    color: theme.palette.secondary.main,
                    border: '2pt solid transparent'
                }}>
                <CardContent>
                    <Typography variant="h4" component="div" sx={{fontFamily: 'Nunito, sans-serif'}}>
                        {this.props.city}, {this.props.country}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontSize: "1.5rem", fontFamily: 'Nunito, sans-serif'}}>
                        Zona horaria: UTC {this.props.timezone}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "1.5rem", fontFamily: 'Nunito, sans-serif' }}>
                        Latitud: {this.props.lat}°
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "1.5rem", fontFamily: 'Nunito, sans-serif' }}>
                        Longitud: {this.props.lon}°
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default LocationBanner;