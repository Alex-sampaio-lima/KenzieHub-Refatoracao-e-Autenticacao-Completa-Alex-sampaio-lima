import axios from "axios"
import { fakeApiAdapter } from "./fakeApi"

// Com VITE_API_URL definida, usa uma API real; sem ela, a API simulada no navegador.
const baseURL = import.meta.env.VITE_API_URL

export const api = axios.create(
    baseURL
        ? { baseURL, timeout: 8000 }
        : { adapter: fakeApiAdapter }
)
