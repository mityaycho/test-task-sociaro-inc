import axios from 'axios';

export const instance = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5/' });

export const apiKey = '330216f9e3042b8a57a7865c3de67865';