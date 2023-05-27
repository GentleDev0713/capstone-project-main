import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/card-grid.css';
import useApi from '../../hooks/useApi';

/* Returns details on all launch sites. */

const LaunchSites = () => {
    const { data } = useApi('/launchsites')
    return (
        <div className='parent-container '>
            <header>
                <h1>Launch Sites</h1>
                <p>
                    Whether you want to blast off in Florida, Russia, the UK or Latin America, we have you covered!  We've partnered with the best launch sites all over the world, from Cape Caneveral in Florida to Naro Space Center, South Korea, to meet your travel needs.  Check out the launch sites below to find the one that best meets your needs.

                </p>
            </header>
            <section>
                {data?.launchSites?.map(ls => (
                    <div key={ls.id} className="card">
                        <Link
                            to={`/launchsites/${ls.id}`}><img
                                src={ls.siteImg}
                                alt={`Photo of launchsite ${ls.siteName}.`} />
                        </Link>
                        <h3>
                            {
                                ls.siteName.length > 17 ?
                                    ls.siteName.substring(0, 17) + '...'
                                    : ls.siteName
                            }
                        </h3>
                        <p>Country Code: {ls.countryCode}</p>
                        <p>Launch Count: {ls.launchCount}</p>
                        <div className='more-info-link'>
                            <Link to={`/launchsites/${ls.id}`}><button>More Info</button></Link>
                        </div>
                    </div>
                )
                )}
            </section>
        </div>);
};

export default LaunchSites;

// data.launchsites.countryCode
// data.launchsites.siteName
// data.launchsites.launchCount
// data.launchsites.siteImg