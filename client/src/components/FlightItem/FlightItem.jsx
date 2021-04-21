import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import styles from './FlightItem.module.css';

const FlightItem = ({ flight, showDetails }) => {
  const [arrivalDate, setArrivalDate] = useState();
  const [arrivalTime, setArrivalTime] = useState();
  const [isArrivesToday, setIsArrivesToday] = useState(true);

  useEffect(() => {
    const arrivalDate = moment(flight.scheduledArrival);
    setArrivalTime(arrivalDate.format('hh:mm'));
    setArrivalDate(arrivalDate.format('DD.MM'));

    if (moment().dayOfYear() !== arrivalDate.dayOfYear()) {
      setIsArrivesToday(false);
    }
  }, [flight]);

  return (
    <Paper>
      <Grid container style={{margin: '10px 0'}}>
        <div className={styles.container}>
          <Grid item xs={2}>
            <div className={styles.arrivalTime}><span className={styles.date}>{!isArrivesToday && arrivalDate}</span> &nbsp;{arrivalTime}</div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.sourceBlock}>
              <div className={styles.sourcePortName}>{flight.sourcePortName}  {flight.sourcePortCode}</div>

              <div className={styles.providerBlock}>
                <span>{flight.flightCode}</span>
            &nbsp;
          <span>{flight.flightProvider}</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={`${styles.status} ${styles[flight.status.toLowerCase().replace(' ', '-')]}`}>{flight.status}</div>
          </Grid>
          <Grid item xs={1}>
            <div className={styles.terminal}>Terminal #</div>
          </Grid>
          <Grid item xs={3 }>
            <div className={styles.moreBlock} onClick={(e) => showDetails(flight.id)}><span>More details</span><ArrowForwardIcon fontSize="small" /></div>
          </Grid>
        </div>
      </Grid>
    </Paper>
  )
};

FlightItem.propTypes = {
  flight: PropTypes.object,
  showDetails: PropTypes.func
}

export default FlightItem;
