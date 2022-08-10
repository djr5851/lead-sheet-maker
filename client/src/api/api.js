import axios from "axios";

const REACT_APP_BASEURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

const API = axios.create({ baseURL: REACT_APP_BASEURL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export default API