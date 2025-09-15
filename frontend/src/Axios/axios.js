import axios from "axios"
const instance = axios.create({
    baseURL:"http://localhost:7123"
})
export default instance