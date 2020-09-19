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
        return (
            <div className='card-container' onClick={(e) => this.setState({isClicked:true})}>
                <div className = 'card title'>{this.props.title}</div>
                <div className= 'card-descriptor'>{this.props.description}</div>
            </div>
        );
    }
}
