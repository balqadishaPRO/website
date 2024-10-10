const apiKey = '0c227678969d4b6bb3e173717240910';

function fetchWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

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
                <h2>Weather in ${data.location.name}, ${data.location.region}, ${data.location.country} (${data.location.localtime})</h2>
                <p>Temperature: ${data.current.temp_c} °C</p>
                <p>Feels like: ${data.current.feelslike_c} °C</p>
                <p>Condition: ${data.current.condition.text} <img src=${data.current.condition.icon}></img></p>
                <p>Wind: ${data.current.wind_kph} km/h ${getWindDirection(data.current.wind_dir)}</p>
                <p>Pressure: ${data.current.pressure_mb} mb</p>
                <p>Humididty: ${data.current.humidity}%</p>
                <p>UV index: ${data.current.uv}</p>
            `;
            
            document.getElementById('weatherOutput').innerHTML = weatherInfo; // Assuming you have a div to display weather
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getWindDirection(abbreviation) {
    switch (abbreviation) {
        case 'N':
            return 'North';
        case 'S':
            return 'South';
        case 'E':
            return 'East';
        case 'W':
            return 'West';
        case 'NE':
            return 'Northeast';
        case 'NW':
            return 'Northwest';
        case 'SE':
            return 'Southeast';
        case 'SW':
            return 'Southwest';
        case 'NNE':
            return 'North-Northeast';
        case 'ENE':
            return 'East-Northeast';
        case 'ESE':
            return 'East-Southeast';
        case 'SSE':
            return 'South-Southeast';
        case 'SSW':
            return 'South-Southwest';
        case 'WSW':
            return 'West-Southwest';
        case 'WNW':
            return 'West-Northwest';
        case 'NNW':
            return 'North-Northwest';
        default:
            return abbreviation;
    }
}

function getWeather() {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
}
