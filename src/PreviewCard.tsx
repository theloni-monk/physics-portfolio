import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";


interface iprops{
    link: string,
    title: string,
    description: string
}
interface istate{
    isClicked:boolean
}

export default class PreviewCard extends Component<iprops,istate> {
    constructor(props:iprops){
        super(props);
        this.state = {isClicked:false};
    }
    render() {
        //fuxk it write the hover css later stop being a dumbass
        if(this.state.isClicked) return <Redirect to = {{pathname: this.props.link}} />
        //TODO: add preview
        return (
            <div className='rounded-lg bg-purple-800 p-4 text-white m-3' style={{width:'80%'}} onClick={(e) => this.setState({isClicked:true})}>
                <div className = 'hover:underline'>{this.props.title}</div>
                <div className= ' text-blue-400'>{this.props.description}</div>
            </div>
        );
    }
}
