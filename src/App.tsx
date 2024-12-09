import React, { useState, useEffect } from 'react';
import ListGroup from './component/ListGroup';


interface City {
  name: string;
  description: string;
}

const App: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCity, setNewCity] = useState({ name: '', description: '' });

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    setCities(savedCities);
  }, []);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const handleSelectCity = (cityName: string) => {
    setSelectedCity(cityName);
  };

  const handleAddCity = () => {
    if (newCity.name && newCity.description) {
      setCities([...cities, newCity]);
      setNewCity({ name: '', description: '' });
    }
  };

  const handleReset = () => {
    setSelectedCity(null);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h1>City Explorer</h1>

      <input
        type="text"
        className="form-control my-2"
        placeholder="Search cities..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ListGroup
        cities={filteredCities}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
      />

      {selectedCity && (
        <div className="my-3">
          <h3>City Details</h3>
          <p>{cities.find((city) => city.name === selectedCity)?.description}</p>
        </div>
      )}

      <div className="my-3">
        <h4>Add New City</h4>
        <input
          type="text"
          className="form-control my-1"
          placeholder="City Name"
          value={newCity.name}
          onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
        />
        <textarea
          className="form-control my-1"
          placeholder="City Description"
          value={newCity.description}
          onChange={(e) => setNewCity({ ...newCity, description: e.target.value })}
        />
        <button className="btn btn-primary my-1" onClick={handleAddCity}>
          Add City
        </button>
      </div>

      <button className="btn btn-warning my-2" onClick={handleReset}>
        Reset Selected City
      </button>
    </div>
  );
};

export default App;

