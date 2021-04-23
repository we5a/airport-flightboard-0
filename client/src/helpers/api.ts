import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { Flight } from '../App';

export default class Api {
  api_url: string;
  api_token: string;
  client: AxiosInstance;

  constructor() {
    this.api_url = process.env.REACT_APP_API_URL;
    this.api_token = null;
    this.client = null;
  }

  init = () => {
    let headers: any = {
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

  getFlights = (): Promise<AxiosResponse> => {
    return this.init().get('/flights');
  };

  deleteFlight = (flightId: string): Promise<AxiosResponse> => {
    return this.init().delete(`/flight/${flightId}`);
  };

  updateFlight = (flightId: string, data: { status: string }): Promise<AxiosResponse> => {
    return this.init().put(`/flight/${flightId}`, data);
  };

  addFlight = (data: Flight): Promise<AxiosResponse> => {
    return this.init().post(`/flight`, data);
  };
}
