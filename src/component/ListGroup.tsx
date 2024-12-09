import React from 'react';

interface City {
  name: string;
  description: string;
}

interface ListGroupProps {
  cities: City[];
  selectedCity: string | null;
  onSelectCity: (cityName: string) => void;
}

const ListGroup: React.FC<ListGroupProps> = ({ cities, selectedCity, onSelectCity }) => {
  return (
    <ul className="list-group">
      {cities.map((city) => (
        <li
          key={city.name}
          className={`list-group-item ${selectedCity === city.name ? 'active' : ''}`}
          onClick={() => onSelectCity(city.name)}
          style={{ cursor: 'pointer' }}
        >
          {city.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;



