const apiKey = '0c227678969d4b6bb3e173717240910';

function fetchWeather(city) {
    // Changed HTTP to HTTPS
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // You can check the data format in the console
            // Update your UI with the weather data here
            const weatherInfo = `
                <h2 id="header">Weather in ${data.location.name}, ${data.location.region}, ${data.location.country} (${data.location.localtime})</h2>
                <table>
                    <tr>
                        <th>Temperature</th>
                        <td>${data.current.temp_c} °C</td>
                    </tr>
                    <tr>
                        <th>Feels like</th>
                        <td>${data.current.feelslike_c} °C</td>
                    </tr>
                    <tr>
                        <th>Condition</th>
                        <td>${data.current.condition.text} <img src="${data.current.condition.icon}" alt="Weather icon" class="weather-icon"></td>
                    </tr>
                    <tr>
                        <th>Wind</th>
                        <td>${data.current.wind_kph} km/h (${getWindDirection(data.current.wind_dir)})</td>
                    </tr>
                    <tr>
                        <th>Pressure</th>
                        <td>${data.current.pressure_mb} mb</td>
                    </tr>
                    <tr>
                        <th>Humidity</th>
                        <td>${data.current.humidity}%</td>
                    </tr>
                    <tr>
                        <th>UV Index</th>
                        <td>${data.current.uv}</td>
                    </tr>
                </table>
            `;
            
            document.getElementById('weatherOutput').innerHTML = weatherInfo; // Assuming you have a div to display weather
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getWindDirection(abbreviation) {
    switch (abbreviation) {
        case 'N': return 'North';
        case 'S': return 'South';
        case 'E': return 'East';
        case 'W': return 'West';
        case 'NE': return 'Northeast';
        case 'NW': return 'Northwest';
        case 'SE': return 'Southeast';
        case 'SW': return 'Southwest';
        case 'NNE': return 'North-Northeast';
        case 'ENE': return 'East-Northeast';
        case 'ESE': return 'East-Southeast';
        case 'SSE': return 'South-Southeast';
        case 'SSW': return 'South-Southwest';
        case 'WSW': return 'West-Southwest';
        case 'WNW': return 'West-Northwest';
        case 'NNW': return 'North-Northwest';
        default: return abbreviation;
    }
}

document.getElementById('getWeatherButton').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
}