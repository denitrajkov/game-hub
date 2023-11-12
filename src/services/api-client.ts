import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'd0b4e8e5d80349448373ff85e3a92457'
    }
})