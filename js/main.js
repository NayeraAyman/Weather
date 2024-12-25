const API_KEY = "9025ad270bd049be8aa221417242412";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function fetchWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    updateCurrentWeather(data.location, data.current);
    updateForecast(data.forecast.forecastday);
  } catch (error) {
    console.error(error.message);
    document.getElementById(
      "forecast"
    ).innerHTML = `<p class="text-white">Could not fetch weather data. Please try again.</p>`;
  }
}

function updateCurrentWeather(location, current) {
  if (!current) return;
  const lastUpdated = new Date(current.last_updated.replace(" ", "T"));
  const html = `
            <div class="today forecast">
              <div class="header" id="today">
                <div class="day">${days[lastUpdated.getDay()]}</div>
                <div class="date">${lastUpdated.getDate()} ${
    monthNames[lastUpdated.getMonth()]
  }</div>
                <div class="clear-fix"></div>
              </div>
              <div class="content" id="content">
                <div class="location">${location.name}</div>
                <div class="degree">
                  <div class="num">
                  ${current.temp_c}
                    <sup>o</sup>
                    C
                  </div>
                  <div class="content-icon">
                    <img src="https:${current.condition.icon}" alt="${
    current.condition.text
  }" width="90" />
                  </div>
                </div>
                <div class="custom">${current.condition.text}</div>
                <span>
                  <img src="images/5.png" alt="">
                  20%
                </span>
                <span>
                  <img src="images/6.png" alt="">
                  18km/h
                </span>
                <span>
                  <img src="images/4.png" alt="">
                  East
                </span>
               
              </div>
            </div>`;
  document.getElementById("forecast").innerHTML = html;
}

function updateForecast(forecastDays) {
  const html = forecastDays
    .slice(1)
    .map((day) => {
      const date = new Date(day.date.replace(" ", "T"));
      return `<div class="forecast">
              <div class="header d-flex justify-content-center align-items-center">
                <div class="day">
                ${days[date.getDay()]}
                </div>
                <div class="clear-fix"></div>
              </div>
              <div class="content  d-flex justify-content-center align-items-center flex-column">
                <div class="content-icon">
                  <img src="https:${day.day.condition.icon}" alt="${
        day.day.condition.text
      }" width="48">
                </div>
                <div class="degree">
                ${day.day.maxtemp_c}
                  <sup>o</sup>
                  C
                </div>
                <small>
                ${day.day.mintemp_c}
                  <sup>o</sup>
                </small>
                <div class="custom">${day.day.condition.text}</div>
              </div>
            </div>`;
    })
    .join("");
  document.getElementById("forecast").innerHTML += html;
}

document.getElementById("search").addEventListener("keyup", (e) => {
  const location = e.target.value.trim();
  if (location) fetchWeather(location);
});

fetchWeather("cairo");
