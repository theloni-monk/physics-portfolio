import GravBody from './GravBody';
import * as PIXI from 'pixi.js'
import { screenBounds } from '../IDrawable';
import Vector2 from '../utils/vect';

export default class GravSystem{
    stage: PIXI.Container;

    xrange: number[]
    yrange: number[]

    bodies:GravBody[]
    constructor(stage:PIXI.Container, xrange:number[], yrange:number[]){
        this.stage = stage;
        this.xrange = xrange;
        this.yrange = yrange;
        this.bodies = [];
    }

    step = (deltaT: number) => {
        for(let i = 0; i < this.bodies.length; i++){
            this.bodies[i].update(deltaT);
            for(let j = i + 1; j< this.bodies.length; j++){
                this.bodies[i].gravInteract(this.bodies[j]);
            }
        }
    }

    spawnBody = (initPos:Vector2, initVel:Vector2 = new Vector2(0,0), mass:number = 1, rad:number = 1) =>{
        this.bodies.push(new GravBody(initPos, initVel, new Vector2(0,0), mass, rad))
        this.stage.addChild(this.bodies[this.bodies.length-1].g)
    }

    draw = (sb: screenBounds) => {
        this.bodies.forEach((body) => body.draw(sb));
    }

}