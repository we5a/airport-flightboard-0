import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import styles from './FlightDetails.module.css';
import { Flight } from '../../App';

type FlightDetailsProps = {
  flightItem: Flight,
  handleClose: () => void,
  deleteFlight: (id: string) => Promise<void>,
  changeStatus: (id: string, status: string) => Promise<void>
}

const FlightDetails = ({ flightItem, handleClose, deleteFlight, changeStatus }: FlightDetailsProps): JSX.Element => {
  const [flightStatus, setFlightStatus] = useState<Flight["status"]>(flightItem.status);

  const handleChangeStatus = (e: React.ChangeEvent<any>): void => {
    const status: Flight["status"] = e.target.value;
    setFlightStatus(status);
    changeStatus(flightItem.id, status);
  }

  const formatDate = (date: string): string => {
    return moment(date).format('hh:mm DD.MM.YYYY');
  }

  return (
    <React.Fragment>
      <div className={styles.title}>{flightItem.flightCode} {flightItem.flightProvider}</div>
      <Grid container spacing={1} style={{ marginBottom: '20px' }}>
        <Grid item xs={6}>
          <div>
            <div className={styles.label}>From:</div>
            <div className={styles.airport}>{flightItem.sourcePortName} {flightItem.sourcePortCode}</div>
            <div className={styles.time}>{formatDate(flightItem.scheduledDeparture)}</div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <div className={styles.label}>To:</div>
            <div className={styles.airport}>{flightItem.destinationPortName} {flightItem.destinationPortCode}</div>
            <div className={styles.time}>{formatDate(flightItem.scheduledArrival)}</div>
          </div>
        </Grid>
      </Grid>

      <div className={styles.statusBlock}>
        <div className={styles.label}>Status:</div>
        <Select labelId="label" id="status" value={flightStatus} autoWidth onChange={handleChangeStatus}>
          <MenuItem value="ON SCHEDULE">ON SCHEDULE</MenuItem>
          <MenuItem value="DELAYED">DELAYED</MenuItem>
          <MenuItem value="LANDED">LANDED</MenuItem>
        </Select>
      </div>
      <div className={styles.buttonBlock}>
        <Button color="secondary" size="large" onClick={(e) => deleteFlight(flightItem.id)}>Delete</Button>
        <Button color="primary" size="large" onClick={handleClose}>Close</Button>
      </div>
    </React.Fragment>
  )
}

export default FlightDetails;
