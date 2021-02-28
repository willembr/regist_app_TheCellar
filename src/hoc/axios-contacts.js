import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://chapel-contact.firebaseio.com/'
});

export default instance;