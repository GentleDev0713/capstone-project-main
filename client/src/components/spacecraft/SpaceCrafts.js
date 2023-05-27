import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/card-grid.css';
import useApi from '../../hooks/useApi';

/* Renders details on all spacecraft. Note: Pl = Plural.*/

const Spacecrafts = () => {
    const { data } = useApi('/spacecraft');

    return (
        <div className='parent-container '>
            <header>
                <h1>Page for All Spacecraft</h1>
                <p>
                    When you choose Stellar Travel Agency, you will travel in style and in luxury.  We've partnered with the most influential space agencies, from NASA to National Centre for Space Studies (CNES) in France, to ensure our clients have access to the best spacecraft.  Select the spacecraft that shows everyone who you are!
                </p>
            </header>
            <section>
                {data?.spacecraft?.map(sc => (
                    sc.craftImg ?
                        <div key={sc.id} className="card">

                            <Link
                                to={`/spacecraft/${sc.id}`}> <img
                                    src={sc.craftImg}
                                    alt={`Photo of  ${sc.craftName} spacecraft.`} />
                            </Link>
                            <h3>{sc.craftName}</h3>
                            <p>Country: {sc.country}</p>
                            <p>Agency Name: {
                                sc.agencyName.length > 15 ?
                                    sc.agencyName.substring(0, 15) + '...'
                                    : sc.agencyName
                            }</p>
                            <p>Agency Description: {
                                sc.agencyDescription.length > 36 ?
                                    sc.agencyDescription.substring(0, 36) + '...'
                                    : sc.agencyDescription
                            }
                            </p>
                            <div className='more-info-link'>
                                <Link to={`/spacecraft/${sc.id}`}><button>More Info</button></Link>
                            </div>
                        </div>
                        : null
                )
                )}
            </section>
        </div>
    );
};

export default Spacecrafts;