import axios from 'axios';

export const instance = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5/' });
// Достаю спрятанный ключ
export const apiKey = process.env.REACT_APP_API_KEY;