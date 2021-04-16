import React from 'react';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import moment from 'moment';
import styles from './FlightItem.module.css';

const FlightItem = ({ flight, showDetails }) => {

  function formatTime(date) {
    return moment(date).format('hh:mm');
  }

  return (
    <Paper>
      <div className={styles.container}>
        <div className={styles.arrivalTime}>{formatTime(flight.scheduledArrival)}</div>
        <div className={styles.sourceBlock}>
          <div className={styles.sourcePortName}>{flight.sourcePortName}  { flight.sourcePortCode}</div>

          <div className={styles.providerBlock}>
            <span>{flight.flightCode}</span>
            &nbsp;
          <span>{flight.flightProvider}</span>
          </div>
        </div>
        <div className={`${styles.status} ${styles[flight.status.toLowerCase().replace(' ', '-')]}`}>{flight.status}</div>
        <div className={styles.destinationPortName}>Tenerife</div>
        <div className={styles.moreBlock} onClick={(e) => showDetails(flight.id)}><span>More details</span><ArrowForwardIcon fontSize="small"/></div>
      </div>
    </Paper>
  )
}

export default FlightItem;
