import React, { useState } from 'react';
import styles from './App.module.css';
import FlightList from './components/FlightList/FlightList';
import Api from './helpers/api';
import mockedFlights from './helpers/mocked-flights.json';

export const FlightApiContext = React.createContext();

const App = () => {
  const [api] = useState(new Api());

  const handleFill = () => {
    mockedFlights.forEach(async (f) => {
      const result = await api.addFlight(f);
      if (result.status === 201) {
        console.log('Item added', JSON.parse(result.config.data))
      };
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Airport Flightboard (<a onClick={handleFill} className={styles.fillLink}>fill with items</a>)</h2>
      <FlightApiContext.Provider value={api}>
        <FlightList />
      </FlightApiContext.Provider>
    </div>
  );
}

export default App;
