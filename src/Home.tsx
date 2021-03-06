import React from 'react'
import PreviewCard from './PreviewCard' 

//WRITEME Tailwindcss
const testimg = require('./resources/rand.jpg'); //FIXME: get image to load properly
export const Home = () => {
    return (
        <div className = " bg-gray-400">
            <div className = "text-align:center h-52">
                <div className = 'font-sans text-6xl text-white p-10'>Welcome to the home of Theo's physics sims</div>
                <div className = 'pl-24 text-xl'>you will notice it looks like shit bc im too lazy to write the css to make it pretty</div>
            </div>
            <div className=' grid auto-cols-auto bg-gray-600'>
                <PreviewCard link = '/testsim' preview_img = {testimg} title = 'Basic blank render with a circle' description = 'Purely for testing purposes.'/>
                <PreviewCard link = '/particlesim' preview_img = {testimg} title = '2d particle motion' description = 'demonstrates kinematic equations'/>
                <PreviewCard link = '/orbitsim' preview_img = {testimg} title = '2d orbit' description = 'demonstrates universal gravitation'/>
                <PreviewCard link = '/pegboard' preview_img = {testimg} title = 'Pegboard Simulation' description = 'demonstrates normal distrobution'/>
            </div>
        </div>
    );
}
