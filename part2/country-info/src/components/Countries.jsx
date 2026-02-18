import CountryDetails from "./CountryDetails"

const Countries = ({ countries, onShow}) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length === 1) {
        return <CountryDetails  country={countries[0]} />
    }

    return (
        <div>
            {countries.map(country => (
                <div key={country.cca3}>
                    {country.name.common}
                    <button onClick={() => onShow(country.name.common)}>show</button>
                </div>
            ))}
        </div>
    )
}

export default Countries