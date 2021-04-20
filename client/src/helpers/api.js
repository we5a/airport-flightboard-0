import * as axios from 'axios';

export default class Api {
  constructor() {
    // this.api_url = process.env.REACT_API_ENDPOINT;
    this.api_url = 'http://localhost:3000/api/';
    this.api_token = null;
    this.client = null;
  }

  init = () => {

    let headers = {
      Accept: 'application/json',
      ContentType: 'application/json'
    }

    if (this.api_token) {
      headers.Autorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers
    });

    return this.client;
  }

  getFlights = () => {
    return this.init().get('/flights');
  };

  deleteFlight = (flightId) => {
    return this.init().delete(`/flight/${flightId}`);
  };

  updateFlight = (flightId, data) => {
    return this.init().put(`/flight/${flightId}`, data);
  };

  addFlight = (data) => {
    return this.init().post(`/flight`, data);
  };
}
