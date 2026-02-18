import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const capital = country.capital?.[0]

    useEffect(() => {
        if (capital) 
            weatherService
            .getWeather(capital)
            .then(response => {
                setWeather(response)
            })
        }, [capital])
    
    return (
        <div>
            <h1>{country.name.common}</h1>

            <p>Capital: {country.capital?.[0]}</p>
            <p>Area: {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img
            src={country.flags.png}
            style={{widht: "400", border: "1px solid #000"}}
            />
            
            {weather && (
                <>
                    <h2>Weather in {capital}</h2>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description }
                    />
                    <p>Wind: {weather.wind.speed} m/s</p>
                </>
            )}
        </div>
    )
}

export default CountryDetails
