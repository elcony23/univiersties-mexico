import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL
const ROUTES = {
    SEARCH_BY_COUNTRY: '/search'
}
const api = axios.create({baseURL:API_URL });

const WEB_SERVICES = {
    searchByCountry: async (country) => (await api.get(`${ROUTES.SEARCH_BY_COUNTRY}?country=${country}`)).data
}
export default WEB_SERVICES