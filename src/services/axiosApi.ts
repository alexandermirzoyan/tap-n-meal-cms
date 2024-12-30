import axios from 'axios';

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_ORIGIN });

axiosInstance.interceptors.response.use((res: any) => {
  const errorInitialMessage = 'Oh..Please reload and try again';
  const errorResponse = { response: { data: { message: errorInitialMessage } } };

  if (res) {
    if (res.status >= 200 && res.status <= 299) { // Handling HTTP success status codes
      if (res.hasOwnProperty('error')) {
        errorResponse.response.data.message = res.error;
        return Promise.reject(errorResponse);
      }
      if (res.data.hasOwnProperty('error')) {
        const { error } = res.data;
        errorResponse.response.data.message = typeof error === 'string' ? error : errorInitialMessage;
        return Promise.reject(errorResponse);
      }
      if (typeof res === 'string' || res instanceof String) {
        errorResponse.response.data.message = 'Fatal error';
        return Promise.reject(errorResponse);
      }
      return res;
    }
    errorResponse.response = res;

    return Promise.reject(errorResponse);
  }

  return Promise.reject(errorResponse);
});

export default axiosInstance;
