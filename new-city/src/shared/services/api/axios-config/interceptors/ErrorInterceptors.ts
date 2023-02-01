import { AxiosError } from "axios";


export const errorInterceptors = (error: AxiosError) => {
    if(error.message === 'Network error') {
       return Promise.reject( new Error (" erro de conexção " + error.message))
    }

    if(error.response?.status=== 401) {
       return Promise.reject( new Error (" erro de conexção " + error.message))
    }

    return Promise.reject(error);

}