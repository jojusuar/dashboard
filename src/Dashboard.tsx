const url: string = "https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=";
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;

const getData = async () => {
    let parser: DOMParser = new DOMParser();
    try {
        let response = await fetch(url + apiKey);
        let data: XMLDocument = parser.parseFromString(await response.text(), "application/xml");
        let container: HTMLElement | null = document.getElementById("data");
        if (container) {
            let forecast: HTMLCollectionOf<HTMLTimeElement> = data.getElementsByTagName("time");
            for (let entry of forecast) {
                container.innerHTML += entry.getAttribute("from") + "<br>";
            }
        }
    }
    catch (e) {
        console.log(`Error al consumir OpenWeatherMap: ${e}`);
    }
};

window.addEventListener('load', getData);

function Dashboard() {
    return (
        <>
            <div id="data">
            </div>
        </>
    )
}

export default Dashboard