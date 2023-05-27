import axios from 'axios';

/* Funtions to handle all API requests to server. URL, payload, and config are pased in from functions in useApi hook. */

/* getData() performs all GET requests. */

export async function getData(url, config) {
    console.log('API-CONFIG:', config)
    const res = await axios.get(`/api${url}`, config);
    return res.data;
};


/* postData() peforms all POST requests.*/

export async function postData(url, payload, config) {
    const res = await axios.post(`/api${url}`, payload, config);
    return res.data;
};


/* patchData() peforms all PATCH requests. */

export async function patchData(url, payload, config) {
    const res = await axios.patch(`/api${url}`, payload, config);
    return res.data;
};


/* deleteData peforms all DELETE requests. */

export async function deleteData(url, config) {
    const res = await axios.delete(`/api${url}`, config);
    return res.data;
};