import React, { useState } from 'react';
import FlightItem from '../FlightItem/FlightItem';
import styles from './FlightList.module.css';
import MainModal from '../MainModal/MainModal';
import FlightDetails from '../FlightDetails/FlightDetails';

const data = [
  {
    id: '123',
    flightCode: 'LH456',
    flightProvider: 'Lufthansa',
    sourcePortName: 'Frankfurt',
    sourcePortCode: 'FRA',
    destinationPortName: 'Tenerife',
    destinationPortCode: 'tn23',
    scheduledArrival: new Date(),
    scheduledDeparture: new Date(),
    status: 'LANDED'
  },
  {
    id: '345',
    flightCode: 'RN45C',
    flightProvider: 'Ryanair',
    sourcePortName: 'Prague',
    sourcePortCode: 'PR',
    destinationPortName: 'Tenerife',
    destinationPortCode: 'tn25',
    scheduledArrival: new Date(),
    scheduledDeparture: new Date(),
    status: 'DELAYED'
  }
]

const FlightList = () => {
  const [flightList, setFlightList] = useState(data);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState();

  function handleClose() {
    setIsEditOpen(false);
  }

  function showDetails(id) {
    const flight = flightList.find(flight => flight.id === id);
    if (flight) {
      setCurrentFlight(flight);
      setIsEditOpen(true);
    }
  }

  function changeStatus(id, status) {
    const updatedList = flightList.map(el => {
      if (el.id === id) {
        el.status = status;
      }
      return el;
    });
    setFlightList(updatedList);
  }

  function handleDelete(id) {
    const updatedList = flightList.filter(el => el.id !== id);
    setFlightList(updatedList);
    setIsEditOpen(false);
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        {
          flightList.map(flight => {
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
