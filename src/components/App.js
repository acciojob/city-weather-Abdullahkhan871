import React, { useState, useEffect } from "react";
import "./../styles/App.css";
import axios from "axios";

const App = () => {
  const [searchData, setSearchData] = useState("");
  const [showData, setShowData] = useState([]);
  // const [cityName, setCityName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSearchData("");
    handleWeatherData();
  }

  function handleWeatherData() {
    if (searchData) {
      axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&units=imperial&appid=${"d594e5203816ab170db68f040e5cc611"}`
      )
        .then((response) => setShowData(response.data))
        .catch((er) => console.log(er));
    } else {
      alert("please fill input");
    }
  }

  useEffect(() => {
    if (showData.weather) {
      console.log(showData.weather[0].main);
    }
  }, [showData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          placeholder="Enter a City"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </form>
      <div className="weather">
        {showData.name && <p>{showData.name}</p>}
        {showData.main && <p>{Math.ceil(showData.main.temp)} F</p>}
        {showData.weather && <p>{showData.weather[0].main}</p>}
        {showData.weather && (
          <img
            src={`https://openweathermap.org/img/wn/${showData.weather[0].icon}@2x.png`}
            alt={showData.weather[0].description}
          />
        )}
      </div>
    </div>
  );
};

export default App;

// {
//   temprature
//   description
//   icon
// }
