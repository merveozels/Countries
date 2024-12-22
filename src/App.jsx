import { useState } from "react";
import Datas from "./data.js";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const goBack = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="container">
      <Header />
      {!selectedCountry && <InputArea />}
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} goBack={goBack} />
      ) : (
        <CountryCard handleCountryClick={handleCountryClick} />
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Where in the world?</h1>
      <div className="btn-area">
        <img src="./public/assets/img/moon-icon.png" alt="Moon Icon" />
        <button className="darkBtn">Dark Mode</button>
      </div>
    </div>
  );
}

function InputArea() {
  return (
    <div className="input-area">
      <input type="text" placeholder="Search for a country..." />
    </div>
  );
}

function CountryCard({ handleCountryClick }) {
  return (
    <div className="card-area">
      {Datas.map((country) => (
        <div
          key={country.cca2}
          onClick={() => handleCountryClick(country)}
          className="card-inner"
        >
          <img src={country.flags.png} alt={`${country.name.common} flag`} />
          <div className="text-area">
            <h2>{country.name.common}</h2>
            <div className="text-area-inner">
              <p><span className="strongSpan" >Population:</span>{Intl.NumberFormat("en-US").format(country.population)}</p>
              <p> <span className="strongSpan">Region: </span>{country.region}</p>
              <p><span className="strongSpan">Capital:</span> {country.capital}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CountryDetails({ country, goBack }) {
  return (
    <div className="country-details">
      <button className="backBtn" onClick={goBack}>Back</button>
      <img className="img-details" src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>{country.name.common}</h3>
      <div className="population-details">
        <p>Native Name: {country.name.nativeName.eng.common}</p>
        <p>Population: {Intl.NumberFormat("en-US").format(country.population)}</p>
        <p>Region: {country.region}</p>
        <p>{country.subregion ? country.subregion : "" }</p>
      </div>
      <h4>Official Name: {country.name.official}</h4>
      <p>Top-Level Domain: {country.tld.join(", ")}</p>
      <p>Currency: {Object.values(country.currencies)[0]?.name}</p>
      <p>Calling Code: {country.idd.root}{country.idd.suffixes.join(", ")}</p>
    </div>
  );
}

export default App;
