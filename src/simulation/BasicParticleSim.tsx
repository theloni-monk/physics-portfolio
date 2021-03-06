import React,{Component} from 'react'
import * as PIXI from 'pixi.js'
import GenericSim from './GenericSim'

import Drawable, {screenBounds} from './IDrawable'
import DynamicBody from './IDynamicBody'
import Vector2 from './utils/vect'

import { Redirect } from 'react-router-dom'
interface iparticle extends DynamicBody,Drawable{};

class Particle implements iparticle{
    pos:Vector2 
    vel:Vector2 
    acc:Vector2
    g:PIXI.Graphics
    constructor(p:Vector2,v:Vector2,a:Vector2){
        this.pos = p;
        this.vel = v;
        this.acc = a;
        this.g = new PIXI.Graphics();
    }
    setPos = (p:Vector2) => this.pos = p;
    setVel = (v:Vector2) => this.vel = v;
    setAcc = (a:Vector2) => this.acc = a;

    /**@param t - time difference between update calls ; must be in seconds _not ms_ */
    update(t:number){
        this.pos = this.pos.add(this.vel.multScalar(t));
        this.vel = this.vel.add(this.acc.multScalar(t));
    }

    posToPx(sb:screenBounds){
        let scaleh = (sb.endY - sb.startY) / sb.screenHeight;
        //what one px corresponds to
        let scalew = (sb.endX - sb.startX) / sb.screenWidth;
        
        let px = ((this.pos.x - sb.startX) / scalew);
        let py = ((-1 * (this.pos.y - sb.endY)) / scaleh);
        return new Vector2(px,py);
    }

    draw(sb:screenBounds){
        this.g.clear();
        let pxPos:Vector2 = this.posToPx(sb);
        // Circle
        this.g.lineStyle(0); //lineStyle to zero so the circle doesn't have an outline
        this.g.beginFill(0xDE3249, 1);
        this.g.drawCircle(pxPos.x, pxPos.y, 20); //20px size is totally arbitrary but will be fine for now
        this.g.endFill();
    }
    
}

interface iprops{
    title: string
}
interface istate{
    goBack:boolean,
    paused:boolean,
    dampingLevel: string
}
export default class BasicParticleSim extends Component<iprops,istate> {
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application
    protected prevUpdateTime:number
    protected screen:screenBounds 
    protected timeoutPtr: any //weird js pointer type

    readonly fps:number = 60;

    protected title: string

    /**UNIQUE SIM VARIABLES */
    ball:Particle

    constructor(props:iprops){
        super(props);
        this.state = {
            goBack:false,
            paused:false,
            dampingLevel: '0.5'
        }
        //this.title = props.title
        this.G = new PIXI.Graphics();
    }

    initPIXI = (backgroundColor:number) =>{
        //TODO: on resize reinit application and reassign this.G
        //FIXME: get accurate canvas size from dom
        this.app = new PIXI.Application({
			width: window.innerWidth ,//this.screen.screenWidth,
			height: window.innerHeight, // this.screen.screenHeight,
			backgroundColor: backgroundColor,
			antialias: true
		});
		this.renderTarget.appendChild(this.app.view);
		this.app.start(); //start renderer internal update ticker;
        this.app.stage.addChild(this.G);
    }

    componentDidMount(){
        console.log(this.renderTarget.getBoundingClientRect())
        this.screen = {
            screenWidth: (window.innerWidth), //this.renderTarget.getBoundingClientRect().width,
            screenHeight: window.innerHeight, //this.renderTarget.getBoundingClientRect().height, 
            startX: 0, endX: 15,
            startY: 0, endY: 10
        }
        this.initPIXI(0); //black background
        this.initSim()
    }

    initSim(){
        if(this.timeoutPtr) clearTimeout(this.timeoutPtr);
        if(this.ball) this.ball.g.clear();
        this.ball = new Particle(
            new Vector2(2,0), // pos (5,0)
            new Vector2(3,7), // 3m/s horizontal 7m/s upward initial velocity
            new Vector2(0,-10) // -10m/s/s downward acceleration due to gravity
        );
        this.app.stage.addChild(this.ball.g)
        this.update();
    }

    draw = () =>{
        this.ball.draw(this.screen)
    }

    update = () =>{
        if(this.state.paused) {this.prevUpdateTime = Date.now(); return}
        if(!this.prevUpdateTime) this.prevUpdateTime = Date.now();
        let deltaT = (Date.now() - this.prevUpdateTime)/1000
        /**UPDATE LOGIC */
        this.ball.update(deltaT);
        //constrain ball to window bounds in X
        if(this.ball.pos.x<this.screen.startX || this.ball.pos.x > this.screen.endX){
            this.ball.setAcc(new Vector2(0,0));
            this.ball.setVel(new Vector2(0,0));
        }
        if(this.ball.pos.y<this.screen.startY){
            this.ball.setPos(new Vector2(this.ball.pos.x, this.screen.startY)) // avoid double collision registration
            this.ball.setVel(new Vector2(this.ball.vel.x,-this.ball.vel.y* (1 - Number(this.state.dampingLevel)/10))); // bounce off of floor
        }

        this.draw();
        this.prevUpdateTime = Date.now();
        this.timeoutPtr = setTimeout(this.update, 16.66); //~60fps
    }

    handlePress = (e:KeyboardEvent) => {

    }

    render() {
        if(this.state.goBack) return <Redirect to = {{pathname:'/'}}/>
        let component = this;
		document.addEventListener('keyup', (e) => { this.handlePress(e) });
		return (
            <div className ="sim-wrapper">
                <div className = "sim-header">Basic Bouncing Ball</div>
                <div className="sim-sidebar" >
                    <div className = "back-butt" onClick={(e)=>this.setState({goBack:true})}>back</div>
                    <div className = "pause-butt" onClick = {(e)=>this.setState({paused:!this.state.paused})}>{!this.state.paused?'pause':'unpause'}</div>
                    <div className = "restart-butt" onClick = {(e)=>this.initSim()}>restart</div>
                    {/** this is where you place any misc inputs to your sim and bind them to state*/}
                    <div className = "num-input">
                        <em>damping level:</em>
                        {/**TODO: make custom input component */}
                        <input className = "slider" type="range" min="0" max="10" value={this.state.dampingLevel} onChange={(v)=>this.setState({dampingLevel: v.target.value})}/>
                    </div>
                </div>
                <div className = "sim-content" ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
                        onMouseMove={(e) => {  }}
                    />
                <div className = "sim-footer">written by theo cooper</div>
                
            </div>
		);
    }
}
