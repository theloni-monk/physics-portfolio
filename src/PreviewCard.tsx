import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";


interface iprops{
    link: string,
    preview_img: any,
    title: string,
    description: string
}
interface istate{
    isClicked:boolean,
    isHovered:boolean
}

export default class PreviewCard extends Component<iprops,istate> {
    constructor(props:iprops){
        super(props);
        this.state = {isClicked:false, isHovered:false};
    }
    render() {
        //fuxk it write the hover css later stop being a dumbass
        if(this.state.isClicked) return <Redirect to = {{pathname: this.props.link}} />
        //TODO: add preview
        return (
            <div className='rounded-lg bg-purple-800 p-4 w-36 text-white m-3' onClick={(e) => this.setState({isClicked:true})}>
                <div className = 'hover:underline'>{this.props.title}</div>
                <div className= 'text-center text-blue-400'>{this.props.description}</div>
            
            </div>
        );
    }
}
