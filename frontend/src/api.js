import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const raw = Cookies.get("token");
  if (raw) {
    let token = raw;
    try {
      token = JSON.parse(raw);
    } catch {
      /* use raw string */
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setAuthToken(token) {
  Cookies.set("token", JSON.stringify(token), { expires: 7 });
}

export function clearAuthToken() {
  Cookies.remove("token");
}

export default api;
