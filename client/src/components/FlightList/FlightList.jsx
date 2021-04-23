import React, { useEffect, useState, useContext } from 'react';
import FlightItem from '../FlightItem/FlightItem';
import styles from './FlightList.module.css';
import MainModal from '../MainModal/MainModal';
import FlightDetails from '../FlightDetails/FlightDetails';
import { FlightApiContext } from '../../App';

const FlightList = () => {
  const [flightList, setFlightList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState();
  const api = useContext(FlightApiContext);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    const res = await api.getFlights();
    if (res.status === 200) {
      setFlightList(res.data.data);
    }
  }

  const handleClose = () => {
    setIsEditOpen(false);
  }

  const showDetails = (id) => {
    const flight = flightList.find(flight => flight.id === id);
    if (flight) {
      setCurrentFlight(flight);
      setIsEditOpen(true);
    }
  }

  const changeStatus = async (id, status) => {
    const res = await api.updateFlight(id, { status })
    if (res.status === 200) {
      const filteredList = flightList.map(el => el.id === res.data.flight.id ? res.data.flight : el);
      setFlightList(filteredList);
    }
  }

  const handleDelete = async(id) => {
    const res = await api.deleteFlight(id);
      if (res.status === 200) {
        const updatedList = flightList.filter(el => el.id !== id);
        setFlightList(updatedList);
        setIsEditOpen(false);
        return;
      }
      console.log("Can't delete the flight with id", id);
      setIsEditOpen(false);
  }

  const compareDate = (a, b) => {
    const dateA = Date.parse(a.scheduledArrival);
    const dateB = Date.parse(b.scheduledArrival);
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        {
          flightList.sort(compareDate).map(flight => {
            return <FlightItem key={flight.id} flight={flight} showDetails={showDetails} />
          })
        }
      </div>
      <MainModal isOpen={isEditOpen} handleClose={handleClose}>
        <FlightDetails
          deleteFlight={handleDelete}
          handleClose={handleClose}
          flightItem={currentFlight}
          changeStatus={changeStatus}
        />
      </MainModal>
    </React.Fragment>
  )
}

export default FlightList;
