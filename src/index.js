import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.WEATHERBIT_API_KEY;
const WEATHERBIT_API_BASE_URL = "https://api.weatherbit.io/v2.0/alerts";

const cities = [
    "Toronto",
    "New York City",
    "Montreal",
    "Vancouver",
    "Ottawa",
    "Boston",
    "Chicago",
    "Seattle",
    "Paris",
    "London",
    "Hartford",
    "Red Lake",
];

const cities_with_alerts = [];

for (const city of cities) {
    console.log(city);
    const full_url = `${WEATHERBIT_API_BASE_URL}?city=${city}&key=${API_KEY}`;
    const city_weather = await axios
        .get(full_url)
        .then((response) => {
            if (response.data.alerts.length > 0) {
                const weatherWarnings = response.data.alerts.map((alert) => {
                    return alert.severity === "Warning";
                });
                if (weatherWarnings.length > 0) {
                    for (const warning of weatherWarnings)
                        cities_with_alerts.push({
                            city: city,
                            severity: response.data.alerts[warning].severity,
                            title: response.data.alerts[warning].title,
                            description: response.data.alerts[warning].description,
                        });
                }
            }
        })
        .catch((error) => {
            console.log(`there was an error downloading alert data: ${error}. 
            Please try again again later`);
        });
}

if (cities_with_alerts.length > 0) {
    console.log(
        `There are active weather alerts in the following cities: ${cities_with_alerts}`,
    );
} else {
    console.log(`There are no active weather alerts`);
}
