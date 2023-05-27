import React from 'react';
import { Link } from 'react-router-dom';
import '../css/pageNotFound.css';

const PageNotFound = () => {
    return (
        <div className='page-not-found'>
            <h1>404 Oops!</h1>
            <p>It looks like you took a wrong turn.</p>
            <p><Link to="/"><button>Home</button></Link></p>
        </div>);
};

export default PageNotFound;