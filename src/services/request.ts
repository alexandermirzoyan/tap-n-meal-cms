import axios from './axiosApi';

type RequestParams = {
  url: string;
  method: string;
  params?: any;
  data?: object;
}

export const request = async ({
  url,
  method,
  params,
  data,
} : RequestParams) => {
  // For the CMS we can pass only 'en' Language, as for creation/update we are passing an object with language
  // codes and this is just for getting the list in necessary language
  const headers = {
    Language: 'en',
  };

  return axios({
    method,
    url,
    data,
    params,
    headers,
  })
    .catch((error) => {
      const res = error.response;
      const errorMessage = res ? res.data.message : 'Check your connection';

      throw new Error(errorMessage);
    });
};
