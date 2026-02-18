import { useState, useEffect } from "react"
import Finder from "./components/Finder"
import Countries from "./components/Countries"
import countryService from "./services/countries"


const App = () => {
  const [finder, setFinder] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(response => 
      setCountries(response)
    )
  }, [])

  const filteredCountries = 
    finder === ""
    ? []
    : countries.filter(country =>
    country.name.common.toLowerCase()
    .includes(finder.toLowerCase())
    )

    const handleShow = (countryName) => {
      setFinder(countryName)
    }
  return (
    <div>
      <Finder finder={finder} setFinder={setFinder} />
      <Countries countries={filteredCountries} onShow={handleShow} />
    </div>
  )
}

export default App
