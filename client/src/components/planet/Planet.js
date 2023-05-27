import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import PageNotFound from '../PageNotFound';

/* Renders details on one planet */

const Planet = () => {
    const { id } = useParams();
    const { data } = useApi(`/planets/${id}`);
    const p = data.planet

    return (
        <div>
            {p ?
                <div className="details-page-container">

                    <div>
                        <img src={p?.planetImg} />
                    </div>

                    <div>
                        <h1>{p?.planetName}</h1>
                        <p>Distance: {p?.planetDistance} light years from Earth.</p>
                        <p>Details: {p?.planetDescription}</p>
                    </div>
                </div>
                : <PageNotFound />
            }
        </div>
    );
};

export default Planet;