import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/about.css';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className='about-container'>
            <div>
                <h1>About Stellar Travel</h1>
                <p>
                    We've been in space exploration since NASA's first Apollo missions, and we've been in the travel business for longer.  Our goal at Stellar Travel Agency is to ensure your voyage into the heavens is without equal and to provide you with out-of-this-world customer service.  To do so, we've partnered with the most exceptional astronauts, engineers, scientists, and minds at NASA and other governmental and private space agencies around the world, along with the most notable figures in the world of travel and hospitality here on Earth and on every planet in our solar system.
                </p>
                <button onClick={() => { navigate('/missions/new') }}>Ready to blast off?</button>
            </div>
        </div>
    );
};

export default About