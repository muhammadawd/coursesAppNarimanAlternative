// axios
import axios from 'axios'

let lang = (JSON.parse(localStorage.getItem('language')));

const baseURL = process.env.VUE_APP_API;

export default axios.create({
    baseURL: baseURL,
    withCredentials: false,
    // You can add your headers here
    headers: {
        'lang': lang,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
