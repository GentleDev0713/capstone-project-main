import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import PageNotFound from '../PageNotFound';

/* Returns details on one launch site. */

const LaunchSite = () => {
    const { id } = useParams();
    const { data } = useApi(`/launchsites/${id}`);
    const ls = data.launchSite

    return (
        <div>
            {ls ?
                <div className="details-page-container">
                    <div>
                        <img src={ls?.siteImg} />
                    </div>
                    <div>
                        <h1>{ls?.siteName}</h1>
                        <p>Total Launches: {ls?.launchCount}</p>
                        <p>Country Code: {ls?.countryCode}</p>
                        <p></p>
                    </div>
                </div>
                : <PageNotFound />
            }
        </div>
    );
};

export default LaunchSite;