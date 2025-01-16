import axios from 'axios'; 

const axiosInstence = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
    withCredentials:true
})

export default axiosInstence; 