import React, { useState } from 'react';
import styles from './App.module.css';
import FlightList from './components/FlightList/FlightList';
import Api from './helpers/api';
import mockedFlights from './helpers/mocked-flights.json';

export const FlightApiContext = React.createContext();

function App() {
  const [api] = useState(new Api());

  function handleFill() {
    mockedFlights.forEach(f => {
      api.addFlight(f)
        .then(res => {
          console.log('Add one flight', res);
        })
        .catch(err => console.log(err));
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
