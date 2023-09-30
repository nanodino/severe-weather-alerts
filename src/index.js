import axios from "axios";
import dotenv from "dotenv";
const WEATHERBIT_API_BASE_URL = "https://api.weatherbit.io/v2.0/alerts";

dotenv.config();

const API_KEY = process.env.WEATHERBIT_API_KEY;

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
];

const cities_with_alerts = [];

for (const city of cities) {
    console.log(city);
    const full_url = `${WEATHERBIT_API_BASE_URL}?city=${city}&key=${API_KEY}`;
    const city_weather = await axios
        .get(full_url)
        .then((response) => {
            if (response.data.alerts.length > 0) {
                cities_with_alerts.push(city);
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
