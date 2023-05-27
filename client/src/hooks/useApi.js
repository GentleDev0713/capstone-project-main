import { useEffect, useState } from 'react';
import { deleteData, getData, patchData, postData } from '../helpers/Api';
import useLocalStorage from '../hooks/useLocalStorage';

/* Hooks to manage all GET, POST, PATCH, and DELETE requests */

const useApi = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [token] = useLocalStorage();

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    /* Fetches all records or one record on any table on DB. */

    async function fetchData() {
        try {
            const data = await getData(url, config);
            setData(data);
        }
        catch (error) {
            return error;
        };
    };

    useEffect(() => {
        if (url) {
            fetchData();
        };
    }, []);


    /* Posts on records on any table on DB. */

    async function addData(url, payload) {
        try {
            const data = await postData(url, payload, config);
            setData(data);
            return data;
        }
        catch (error) {
            setError(error?.response?.data?.error?.message);
            return error;
        };
    };


    /* Updates data on users and missions tables. */

    async function updateData(url, payload) {
        try {
            const data = await patchData(url, payload, config);
            return data;
        } catch (error) {
            return error;
        };
    };

    /* Deletes one record on the users or missions table. */

    async function removeData(url) {
        try {
            await deleteData(url, config);
            fetchData();
        }
        catch (error) {
            return error;
        };
    };

    return { addData, data, error, fetchData, removeData, updateData };
};

export default useApi;