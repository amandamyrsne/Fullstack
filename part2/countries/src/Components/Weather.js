import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) =>{
    const [weather, setWeather] = useState(null)
    const API_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
      }, [API_key,city])
      if (weather === null) return null
    return(
        <div>
        <h2> Weather in {city}</h2>
        <div>Temperature {weather.main.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather_icon" />
        <div>Wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather;