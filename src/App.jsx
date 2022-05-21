import { useState } from "react";
import "./App.scss";

const api = {
  key: "065e94927d0e746e2b2ae8ca97234ebd",
  base: "https://api.openweathermap.org/data/2.5/",
};

const dateBuilder = (d) => {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app__warm App"
            : "app__cold App"
          : "App"
      }
    >
      <main>
        <div className="search-bar">
          <input
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="location-information">
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="degreee">
                <div className="degree">{Math.round(weather.main.temp)}°C</div>
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="not-found">
            <div className="notfound-overlay">
              <div className="notfound">Type a country to start the app</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
