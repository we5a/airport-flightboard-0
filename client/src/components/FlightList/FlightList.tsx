import React, { useEffect, useState, useContext } from 'react';
import { AxiosResponse } from 'axios';
import FlightItem from '../FlightItem/FlightItem';
import styles from './FlightList.module.css';
import MainModal from '../MainModal/MainModal';
import FlightDetails from '../FlightDetails/FlightDetails';
import { FlightApiContext, Flight } from '../../App';

const FlightList = (): JSX.Element => {
  const [flightList, setFlightList] = useState<Flight[]>([]);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [currentFlight, setCurrentFlight] = useState<Flight>();
  const api = useContext(FlightApiContext);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async (): Promise<void> => {
    const res: AxiosResponse = await api.getFlights();
    if (res.status === 200) {
      setFlightList(res.data.data);
    }
  }

  const handleClose = (): void => {
    setIsEditOpen(false);
  }

  const showDetails = (id: string): void => {
    const flight: Flight = flightList.find(flight => flight.id === id);
    if (flight) {
      setCurrentFlight(flight);
      setIsEditOpen(true);
    }
  }

  const changeStatus = async (id: string, status: string): Promise<void> => {
    const res: AxiosResponse = await api.updateFlight(id, { status });
    if (res.status === 200) {
      const filteredList: Flight[] = flightList.map((el: Flight) => el.id === res.data.flight.id ? res.data.flight : el);
      setFlightList(filteredList);
    }
  }

  const handleDelete = async(id: string): Promise<void> => {
    const res: AxiosResponse = await api.deleteFlight(id);
      if (res.status === 200) {
        const updatedList: Flight[] = flightList.filter(el => el.id !== id);
        setFlightList(updatedList);
        setIsEditOpen(false);
        return;
      }
      console.log("Can't delete the flight with id", id);
      setIsEditOpen(false);
  }

  const compareDate = (a: Flight, b: Flight): number => {
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
