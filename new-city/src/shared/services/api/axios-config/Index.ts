
import axios from "axios";
import { Enviroment } from "../../../environment";
import { errorInterceptors, responseInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Enviroment.URL_BASE,
}); 

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptors(error),
)

export {Api};