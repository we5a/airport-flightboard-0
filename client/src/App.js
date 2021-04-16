import styles from './App.module.css';
import FlightList from './components/FlightList/FlightList';

function App() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Airport Flightboard</h2>
      <FlightList />
    </div>
  );
}

export default App;
