import React from 'react'
import PreviewCard from './PreviewCard' 

import './css/Home.scss'

const testimg = require('./resources/rand.jpg'); //FIXME: get image to load properly
export const Home = () => {
    return (
        <div className = 'home'>
            <div className = 'home-heading'>
                <h1>Welcome to the home of Theo's physics sims</h1>
                <em>you will notice it looks like shit bc im too lazy to write the css to make it pretty</em>
            </div>
            <hr />
            <h2>Anyways heres a link to some sims:</h2>
            <div className='card-container'>
                <PreviewCard link = '/testsim' preview_img = {testimg} title = 'Basic blank render with a circle' description = 'Purely for testing purposes.'/>
                <PreviewCard link = '/particlesim' preview_img = {testimg} title = '2d particle motion' description = 'demonstrates kinematic equations'/>
            </div>
        </div>
    );
}
