import React from 'react';
import { useParams } from 'react-router-dom';
import '../../css/item-details.css';
import useApi from '../../hooks/useApi';
import PageNotFound from '../PageNotFound';

/* Renders details on one astronaut. */

const Astronaut = () => {
    const { id } = useParams();
    const { data } = useApi(`/astronauts/${id}`);
    const a = data.astronaut

    return (
        <div>
            {a ?
                <div className="details-page-container">
                    <div>
                        <img src={a?.profileImg} />
                    </div>
                    <div>
                        <h1>{a?.name}'s Details</h1>
                        <p><b>Age:</b> {a?.age}</p>
                        <p><b>Nationality:</b> {a?.nationality}</p>
                        <p><b>Misions:</b> {a?.flightsCount}</p>
                        <p><b>Bio:</b> {a?.bio}</p>
                    </div>
                </div>
                : <PageNotFound />
            }
        </div>
    );
};

export default Astronaut;