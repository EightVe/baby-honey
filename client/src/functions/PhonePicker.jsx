import React, { useState, useEffect } from 'react';

const PhonePicker = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryData = data.map((country) => ({
          name: country.name.common,
          code: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : ''),
          flag: country.flags?.png // URL of the country flag image
        })).filter(country => country.code); // Filter out countries without codes
        setCountries(countryData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    console.log('Selected country code:', country.code);
  };

  return (
    <div style={{ position: 'relative', width: '200px' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '8px', textAlign: 'left' }}>
        {selectedCountry ? (
          <>
            <img
              src={selectedCountry.flag}
              alt={`Flag of ${selectedCountry.name}`}
              style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
            />
            {selectedCountry.name} ({selectedCountry.code})
          </>
        ) : 'Select Country'}
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            zIndex: 1
          }}
        >
          {countries.map((country) => (
            <div
              key={country.name}
              onClick={() => handleCountrySelect(country)}
              style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}
            >
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                style={{ width: '20px', marginRight: '8px' }}
              />
              {country.name} ({country.code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhonePicker;
