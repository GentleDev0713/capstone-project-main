import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/card-grid.css';
import useApi from '../../hooks/useApi';

/* Renders details on all planets */

const Planets = () => {
    const { data } = useApi('/planets')

    return (
        <div className='parent-container'>
            <header>
                <h1>Planets</h1>
                <p>
                    From the bars on Satrun to the spas on Mercury, from the slopes on Pluto to the trails on Mars, there are so many fantastic things to do in our solar system.  The choice is yours!  At present, below are the planets we offer round-trip travel too.  We can also connect you with a universe-renowned  travel guide to make sure you have the time of your life and that you see the places that are not on the maps.
                </p>
            </header>
            <section>
                {data?.planets?.map(p => (
                    <div key={p.id} className="card">
                        <Link
                            to={`/planets/${p.id}`}><img
                                src={p.planetImg}
                                alt={`Photo of planet ${p.name}.`} />
                        </Link>
                        <h3>{p.planetName}</h3>
                        <p>Light Years: {p.planetDistance}</p>
                        <p>Description:
                            {
                                p.planetDescription.length > 23 ?
                                    p.planetDescription.substring(0, 23) + '...'
                                    : p.planetDescription
                            }
                        </p>
                        <div className='more-info-link'>
                            <Link to={`/planets/${p.id}`}><button>More Info</button></Link>
                        </div>
                    </div>
                )
                )}
            </section>
        </div>
    );
};

export default Planets;