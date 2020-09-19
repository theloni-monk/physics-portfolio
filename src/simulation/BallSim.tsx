import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import GenericSim from './GenericSim'

interface iprops{
    title: string
}
export class BallSim extends GenericSim{
    //WRITME: basic ball collision sim
    constructor(props:iprops){
        super(props.title);
    }
    componentDidMount(){
        this.initPIXI(window.innerWidth, window.innerHeight, 0);
        this.update()
    }


    draw = () =>{
        // Circle
        this.G.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        this.G.beginFill(0xDE3249, 1);
        this.G.drawCircle(100, 250, 50);
        this.G.endFill();
    }

    update = () =>{
        this.draw();

        setTimeout(this.update, 16.7);
    }

    handlePress = (e:KeyboardEvent) => {

    }

    render() {
        let component = this;
		document.addEventListener('keyup', (e) => { this.handlePress(e) });
		return (
			<div className="GameFrameWrapper">
				<div ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
					onMouseMove={(e) => {  }}
				/>
			</div>
		); //
    }
}
