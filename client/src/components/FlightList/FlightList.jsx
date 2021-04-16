import React, { useEffect, useState } from 'react';
import FlightItem from '../FlightItem/FlightItem';
import styles from './FlightList.module.css';
import MainModal from '../MainModal/MainModal';
import FlightDetails from '../FlightDetails/FlightDetails';

const mockedData = [
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
    destinationPortName: 'Dublin',
    destinationPortCode: 'dnc4',
    scheduledArrival: new Date(),
    scheduledDeparture: new Date(),
    status: 'DELAYED'
  },
  {
    id: '678',
    flightCode: 'ARM3R',
    flightProvider: 'Armenia',
    sourcePortName: 'Kyiv',
    sourcePortCode: 'UKKK',
    destinationPortName: 'London',
    destinationPortCode: 'LCY',
    scheduledArrival: new Date(),
    scheduledDeparture: new Date(),
    status: 'DELAYED'
  },
  {
    id: '176',
    flightCode: 'ARM3R',
    flightProvider: 'Aerojet',
    sourcePortName: 'Tallin',
    sourcePortCode: 'TLC',
    destinationPortName: 'Sydney',
    destinationPortCode: 'SDN',
    scheduledArrival: new Date(),
    scheduledDeparture: new Date(),
    status: 'LANDED'
  }
];

const FlightList = () => {
  const [flightList, setFlightList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState();

  useEffect(() => {
    // fetch data here
    setFlightList(mockedData);
  }, []);

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
