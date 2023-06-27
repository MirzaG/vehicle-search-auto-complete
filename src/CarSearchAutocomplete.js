import React, { useEffect, useRef, useState } from 'react';
import {CARS} from './GetCarsData';
import debounce from 'lodash/debounce';

const CarSearchAutocomplete = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const fakeCars = useRef([]);

    useEffect(() => {
        fakeCars.current  = CARS;
    }, []);
    
    useEffect(() => {
        if(searchTerm.trim() && suggestions.length && suggestions[0] === searchTerm){
            handleSelectCar(suggestions[0]);
        }
    }, [suggestions])

  // Debounce the search function to reduce network traffic
  const debouncedSearch = debounce((term) => {
    // Simulating API call with faker JS data
    const filteredSuggestions = fakeCars.current.filter((car) =>
    term.split(" ").every(_term => car.Name.toLowerCase().includes(_term.toLowerCase()))  
    );
    setSuggestions(filteredSuggestions);
  }, 500);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setSearchTerm(car.Name);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a car"
        list="vehicleAutoSuggest"
        style={{width: '315px'}}
      />
    <datalist id="vehicleAutoSuggest">
        {suggestions.map((car, index) => (
            <option key={index} onClick={() => handleSelectCar(car)}>
            {/* {car.Name.replaceAll(searchTerm, `<b>${searchTerm}</b>`)} */}
            {car.Name}
            </option>
        ))}
    </datalist>

      {selectedCar && (
        <div>
          <h3 style={{textAlign: 'left', marginBottom: 0}}>{selectedCar.Name}</h3>
          <div style={{fontSize: '1.2rem'}}>
            <div style={{float: 'left'}}>
                <p><b>Model:</b> {selectedCar.Model}</p>
            </div>
            <div style={{float: 'right'}}>
                <p><b>Price:</b> ${selectedCar.Price.toLocaleString(undefined, {maximumFractionDigits:2})}</p>
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CarSearchAutocomplete;