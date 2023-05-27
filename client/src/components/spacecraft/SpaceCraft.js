import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import PageNotFound from '../PageNotFound';
/* Renders details on one spacecraft */

const Spacecraft = () => {
    const { id } = useParams();
    const { data } = useApi(`/spacecraft/${id}`);
    const sc = data.spacecraft;

    return (
        <div>
            {sc ?
                <div className="details-page-container">
                    <div>
                        <img src={sc?.craftImg} />
                    </div>
                    <div>
                        <h1>{sc?.craftName}</h1>
                        <p>Country: {sc?.country}</p>
                        <p>Agency Name: {sc?.agencyName}</p>
                        <p>Agency Details: {sc?.agencyDescription}</p>
                        <p></p>
                    </div>
                </div>
                : <PageNotFound />
            }
        </div>
    );
};

export default Spacecraft;