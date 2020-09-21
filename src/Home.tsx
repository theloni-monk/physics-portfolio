import React, {useState, useEffect} from 'react'
import PreviewCard from './PreviewCard' 

const testimg = require('./resources/rand.jpg'); //FIXME: get image to load properly
export const Home = () => {
    return (
        <div className = 'home'>
            <h1>Welcome to the home of Theo's physics sims</h1>
            <p>you will notice it looks like shit bc im too lazy to write the css to make it pretty</p>
            <h2>Anyways heres a link to some sims:</h2>
            <PreviewCard link = '/testsim' preview_img = {testimg} title = 'Basic blank render with a circle' description = 'Purely for testing purposes.'/>
        </div>
    );
}
