import axios from "axios";

const authApi = axios.create({
    baseURL:"http://localhost:3000/api/auth"
})
const userApi = axios.create({
    baseURL:"http://localhost:3000/api/user"
})
const feedBackApi = axios.create({
    baseURL:"http://localhost:3000/api/feedback"
})

export {authApi,userApi,feedBackApi};