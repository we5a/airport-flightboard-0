import React from 'react';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import moment from 'moment';
import styles from './FlightItem.module.css';
import Grid from '@material-ui/core/Grid';

const FlightItem = ({ flight, showDetails }) => {

  function formatTime(date) {
    return moment(date).format('hh:mm');
  }

  return (
    <Paper>
      <Grid container style={{marginTop: '10px', marginBottom: '10px'}}>
        <div className={styles.container}>
          <Grid item xs={2}>
            <div className={styles.arrivalTime}>{formatTime(flight.scheduledArrival)}</div>
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
          <Grid xs={3 }>
            <div className={styles.moreBlock} onClick={(e) => showDetails(flight.id)}><span>More details</span><ArrowForwardIcon fontSize="small" /></div>
          </Grid>
        </div>
      </Grid>
    </Paper>
  )
};

export default FlightItem;
