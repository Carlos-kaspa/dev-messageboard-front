import axios from 'axios'
const baseUrl:any = import.meta.env.VITE_BASE_API_URL

export const api = axios.create({
    baseURL: baseUrl,
})
