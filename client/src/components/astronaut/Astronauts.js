import { Link } from 'react-router-dom';
import '../../css/card-grid.css';
import useApi from '../../hooks/useApi';

/* Renders details on all astronauts */

const Astronauts = () => {
    const { data } = useApi("/astronauts");
    return (
        <div className='parent-container '>
            <header>
                <h1>Astronauts</h1>
                <p>
                    Inter-planetary travel requires the best and the brightest.  We have contracted with numerous astronauts who have years of experience to ensure you have a wide variety of astronauts to choose from.  Our goal is for you to have an unforgettable and care-free voyage, and that you arrive safe and sound at your planet of choice.  Below, you'll find only the best astronauts to when choosing your commander, captain, and navigator.
                </p>
            </header>
            <section>
                {data?.astronauts?.map(a => (
                    <div key={a.id} className="card">
                        <Link
                            to={`/astronauts/${a.id}`}><img
                                src={a.profileImg}
                                alt={`Photo of astronaut ${a.name}.`} />
                        </Link>
                        <h3>
                            {
                                a.name.length > 17 ?
                                    a.name.substring(0, 17) + '...'
                                    : a.name
                            }
                        </h3>
                        <p>Nationality: {a.nationality}</p>
                        <p>Age: {a.age}</p>
                        <p>Missions: {a.flightsCount}</p>
                        <p>
                            Bio: {
                                a.bio.length > 23 ?
                                    a.bio.substring(0, 23) + '...'
                                    : a.bio
                            }
                        </p>
                        <div className='more-info-link'>
                            <Link to={`/astronauts/${a.id}`}><button>More Info</button></Link>
                        </div>
                    </div>
                )
                )}
            </section >
        </div >
    );
};






/******************** */
//Form mapping data from server response 
{/* <section>
{astronauts.map(a => (
    <div className="astronaut-card">
        <img src={a.profile_image} alt={`Photo of astronaut ${a.name}.`} />
        <h3>{
            a.name.length > 17 ?
                a.name.substring(0, 17) + '...'
                : a.name
        }</h3>
        <p>Nationality: {a.nationality}</p>
        <p>Age: {a.age}</p>
        <p>Missions: {a.flights_count}</p>
        <p>Bio: {
            a.bio.length > 23 ?
                a.bio.substring(0, 23) + '...'
                : a.bio
        }
        </p>
        <button>More Info</button>
    </div>
)
)}
</section> */}






//For mapping data in .js file
{/* <section>
{data?.astronauts?.map(a => (
    <div className="astronaut-card">
        <img src={a.profileImg} alt={`Photo of astronaut ${a.name}.`} />
        <h3>{a.name}</h3>
        <p><b>Nationality</b>: {a.nationality}</p>
        <p><b>Age</b>: {a.age}</p>
        <p><b>Missions</b>: {a.flightsCount}</p>
        <p><b>Bio:</b> {
            a.bio.length > 23 ?
                a.bio.substring(0, 23) + '...'
                : a.bio
        }
        </p>
        <button>More Info</button>
    </div>
)
)}
</section> */}

export default Astronauts;