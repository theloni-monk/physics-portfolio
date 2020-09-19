import React, {useState, useEffect} from 'react'
import PreviewCard from './PreviewCard' 

const testimg = require('./resources/rand.jpg');
export const Home = () => {
    return (
        <div className = 'home'>
            <PreviewCard link = '/ballsim' preview_img = {testimg} title = 'Basic Ball Simulation' description = 'Purely for testing purposes.'/>
        </div>
    );
}
