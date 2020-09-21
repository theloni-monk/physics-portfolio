import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import GenericSim from './GenericSim'

import Drawable from './IDrawable'
import DynamicBody from './IDynamicBody'
import Vector2 from './utils/vect'

interface iparticle extends DynamicBody,Drawable{};

class Particle implements iparticle{
    pos:Vector2 
    vel:Vector2 
    acc:Vector2
    constructor(p:Vector2,v:Vector2,a:Vector2){
        this.pos = p;
    }
    setPos = (p:Vector2) => this.pos = p;
    setVel = (v:Vector2) => this.vel = v;
    setAcc = (a:Vector2) => this.acc = a;

    /**@param t - time difference between update calls ; must be in seconds _not ms_ */
    update(t:number){
        this.pos = this.pos.add(this.vel.multScalar(t));
        this.vel = this.vel.add(this.acc.multScalar(t));
    }

    posToPx(){
        let px,py:number
        //WRITEME posToPx
        return new Vector2(px,py)
    }

    draw(G:PIXI.Graphics){
        let pxPos:Vector2 = this.posToPx();
        // Circle
        G.lineStyle(0); //lineStyle to zero so the circle doesn't have an outline
        G.beginFill(0xDE3249, 1);
        G.drawCircle(pxPos.x, pxPos.y, 50); //50px size is totally arbitrary but will be fine for now
        G.endFill();
    }
}

interface iprops{
    title: string
}
export default class BasicParticleSim extends GenericSim {
    ball:particle
    constructor(props:iprops){
        super(props.title);
        
    }
    componentDidMount(){
        this.initPIXI(window.innerWidth, window.innerHeight, 0);
        this.ball = new Particle(
            new Vector2(5,0), // pos (5,0)
            new Vector2(0,7), // 7m/s upward initial velocity
            new Vector2(0,-10) // -10m/s/s downward acceleration due to gravity
        );
        this.update()
    }


    draw = () =>{
        this.ball.draw(this.G)
    }

    update = () =>{
        let deltaT = (Date.now() - this.prevUpdateTime)/1000
        this.ball.update(deltaT);
        //WRITEME: constrain ball to window bounds
        this.draw();
        this.prevUpdateTime = Date.now();
        setTimeout(this.update, 16.66); //~60fps
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
