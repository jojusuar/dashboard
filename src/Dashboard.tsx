import { useState, useEffect, ReactElement } from "react";
import LocationBanner from "./LocationBanner";

const url: string = "https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=";
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;

function getTimezoneString(seconds: string | null): string {
    if (seconds) {
        let negative: boolean = false;
        let number = Number(seconds);
        if (number < 0 ) {
            negative = true;
            number = Math.abs(number);
        }
        const hours = Math.floor(number / 3600);
        const minutes = Math.floor((number % 3600) / 60);
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${negative ? "-" : ""}${formattedHours}:${formattedMinutes}`;
    }
    return "No disponible";
}

function Dashboard() {
    const [banner, setBanner] = useState<ReactElement | null>(null);

    useEffect(() => {
        const getData = async () => {
            let parser: DOMParser = new DOMParser();
            try {
                let response = await fetch(url + apiKey);
                let data: XMLDocument = parser.parseFromString(await response.text(), "application/xml");
                let location = data.getElementsByTagName("location")[0];
                let info = location.getElementsByTagName("location")[0];
                setBanner(
                    <LocationBanner
                        city={location.getElementsByTagName("name")[0]?.textContent || "Ciudad desconocida"}
                        country={location.getElementsByTagName("country")[0]?.textContent || "País desconocido"}
                        timezone={getTimezoneString(location.getElementsByTagName("timezone")[0]?.textContent)}
                        alt={info.getAttribute("altitude") || "desconocida"}
                        lat={info.getAttribute("latitude") || "desconocida"}
                        lon={info.getAttribute("longitude") || "desconocida"}
                    />
                );
            } catch (e) {
                console.log(`Error al consumir OpenWeatherMap: ${e}`);
            }
        };

        getData();
    }, []);

    return (
        <div id="container">
            {banner}
        </div>
    );
}

export default Dashboard;