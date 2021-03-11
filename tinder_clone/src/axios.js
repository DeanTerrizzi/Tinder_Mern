import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tinder-backend-dean.herokuapp.com'
});

export default instance;