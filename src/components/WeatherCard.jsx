import React, { useState, useEffect } from 'react';
import "../css/style.css";

const WeatherCard = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("London");
  const [query, setQuery] = useState("London");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=b5466335ea42203a06fc7fca81418fed`;

      try {
        const response = await fetch(url);
        const resJson = await response.json();
        if (resJson.main) {
          setCity(resJson);
        } else {
          setCity(null);
        }
      } catch (error) {
        console.error(error);
        setCity(null);
      }
    };
    fetchApi();
  }, [query]);

  const handleSearch = () => {
    setQuery(search);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') setQuery(search);
  };

  return (
    <div className='app-container'>

      {/* Teal blob decorations */}
      <div className="blob blob-left" />
      <div className="blob blob-right" />

      

      {/* Search */}
      <div className='searchbox-css'>
        <input
          type='text'
          placeholder='Search city…'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => setSearch('')} className="clear-btn" title="Clear">✕</button>
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      {!city ? (
        <p className="error-text">City not found. Try again.</p>
      ) : (
        <div className={`weather-info ${city.main.temp >= 25 ? "hot" : city.main.temp <= 15 ? "cold" : "moderate"}`}>

          {/* Top: icon + temp + info */}
          <div className="card-main">
            {/* Left: weather icon */}
            <div className="icon-area">
              <img
                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                alt="weather-icon"
                className="weather-icon"
              />
            </div>

            {/* Right: info */}
            <div className="info-panel">
              <div className="temp-icon">
                <h3>{Math.round(city.main.temp)}°C</h3>
              </div>
              <p className="description">{city.weather[0].description}</p>
              <h2>{city.name}, <span>{city.sys.country}</span></h2>

              {/* Stats */}
              <div className="weather-stats">
                <div className="stat">
                  <div className="stat-icon">💧</div>
                  <div className="stat-info">
                    <div className="stat-value">{city.main.humidity}%</div>
                    <div className="stat-label">Humidity</div>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-icon">💨</div>
                  <div className="stat-info">
                    <div className="stat-value">{city.wind.speed} m/s</div>
                    <div className="stat-label">Wind Speed</div>
                  </div>
                </div>
              </div>

              <h5>Min {Math.round(city.main.temp_min)}°C &nbsp;·&nbsp; Max {Math.round(city.main.temp_max)}°C</h5>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default WeatherCard;