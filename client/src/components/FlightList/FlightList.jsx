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
    api.getFlights()
      .then((res) => { setFlightList(res.data.data) })
      .catch((err) => console.log(err));
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
    let item;
    const filteredList = flightList.filter(el => {
      if (el.id === id) {
        item = el;
        return false;
      }
      return true;
    });

    if (item) {
      item.status = status;
      api.updateFlight(id, item).then(res => {
        if (res.status === 200) {
          filteredList.push(item);
          setFlightList(filteredList);
        }
      }).catch(err => console.log(err));
    }
  }

  function handleDelete(id) {
    api.deleteFlight(id).then(res => {
      if (res.status === 200) {
        const updatedList = flightList.filter(el => el.id !== id);
        setFlightList(updatedList);
        setIsEditOpen(false);
        return;
      }
      console.log("Can't delete the flight with id", id);
      setIsEditOpen(false);
    }).catch(err => console.log(err));
  }

  function compareDate(a, b) {
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
