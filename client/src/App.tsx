import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import styles from './App.module.css';
import FlightList from './components/FlightList/FlightList';
import Api from './helpers/api';
import mockedFlights from './helpers/mocked-flights.json';

export interface Flight {
  id: string,
  flightCode: string,
  flightProvider: string,
  sourcePortName: string,
  sourcePortCode: string,
  destinationPortName: string,
  destinationPortCode: string,
  scheduledArrival: string,
  scheduledDeparture: string,
  status: 'ON SCHEDULE' | 'DELAYED' | 'LANDED' | string
}

export const FlightApiContext = React.createContext<Api | null>(null);

const App = () => {
  const [api] = useState(new Api());

  const handleFill = (): void => {
    mockedFlights.forEach(async (f: Flight) => {
      const result: AxiosResponse = await api.addFlight(f);
      if (result.status === 201) {
        console.log('Item added', JSON.parse(result.config.data));
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
