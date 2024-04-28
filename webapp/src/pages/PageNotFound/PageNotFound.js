import React from 'react';
import Lottie from 'react-lottie';
import errorAnimationData from './error.json';
import './PageNotFound.css';

const pageNotFound = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="container">
            <div className="content">
                <h1>Oops...</h1>
                <p>It seems you've reached a page that's lost in cyberspace</p>
                <div className="animation" data-testid="animation-container">
                    <Lottie options={defaultOptions} height={455} width={674} />
                </div>
            </div>
        </div>
    );
};

export default pageNotFound;