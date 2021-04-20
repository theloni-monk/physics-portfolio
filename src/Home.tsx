import React from 'react'
import PreviewCard from './PreviewCard' 
import {Grid} from '@primer/components'

//WRITEME Tailwindcss
export const Home = () => {
    return (
        <div className = " bg-gray-400 h-full">
            <div className = 'font-sans text-6xl text-white p-10'>Welcome to the home of Theo's physics sims</div>
            
            <Grid  gridTemplateColumns="repeat(3, auto)" gridGap={3} className=' bg-gray-600 ' height='80%'> 
                <PreviewCard link = '/testsim'  title = 'Basic blank render with a circle' description = 'Purely for testing purposes.'/>
                <PreviewCard link = '/particlesim'  title = '2d particle motion' description = 'demonstrates kinematic equations'/>
                <PreviewCard link = '/orbitsim'  title = '2d orbit' description = 'demonstrates universal gravitation'/>
                <PreviewCard link = '/pegboard'  title = 'Pegboard Simulation' description = 'demonstrates normal distrobution'/>
                <PreviewCard link = '/universal-gravitation'  title = '3-Body Problem' description = 'demonstrates universal gravitation between dynamic bodies'/>
            </Grid>
        </div>
    );
}
