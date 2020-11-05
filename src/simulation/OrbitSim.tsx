import React,{Component} from 'react'
import * as PIXI from 'pixi.js'
import GenericSim from './GenericSim'
//TODO organize all this code
import Drawable, {screenBounds} from './IDrawable'
import DynamicBody from './IDynamicBody'
import Vector2 from './utils/vect'

import '../css/SimLayout.scss';
import { Redirect } from 'react-router-dom'
/**SIM CONSTANTS */
const COORDSPACE = [-15, 15, -10, 10] // km
//what one px corresponds to
const scalew = (width:number): number => (COORDSPACE[1] - COORDSPACE[0]) / width;
const scaleh = (height:number): number => (COORDSPACE[3] - COORDSPACE[2]) / height;
        

const PLANET_RAD = 3.1855 //km
const BODY_RAD = 0.5 //km(idk)
const PLANET_MASS = 6000000000000 //kg
const ESCAPE_VEL =  3.1 //km/s
const GRAV_CONST = 0.0000000000066 

/**UNIQUE ACTOR */
interface igrav extends DynamicBody, Drawable{};
class GravBody implements igrav{
    pos:Vector2 
    vel:Vector2 
    acc:Vector2

    mass: number

    g:PIXI.Graphics
    constructor(p:Vector2,v:Vector2,a:Vector2, mass:number){
        this.pos = p;
        this.vel = v;
        this.acc = a;

        this.mass = mass;

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
        let px = ((this.pos.x - sb.startX) / scalew(sb.screenWidth));
        let py = ((-1 * (this.pos.y - sb.endY)) / scaleh(sb.screenHeight));
        return new Vector2(px,py);
    }

    draw(sb:screenBounds){
        this.g.clear();
        let pxPos:Vector2 = this.posToPx(sb);
        // Circle
        this.g.lineStyle(0); //lineStyle to zero so the circle doesn't have an outline
        this.g.beginFill(0x000000, 1);
        this.g.drawEllipse(pxPos.x, pxPos.y, BODY_RAD / scalew(sb.screenWidth), BODY_RAD / scaleh(sb.screenHeight)); //20px size is totally arbitrary but will be fine for now
        this.g.endFill();
    }
}

/**LAYOUT */
interface iprops{
    title: string
}
interface istate{
    goBack:boolean,
    paused:boolean,
    rVel: string
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
    ball:GravBody

    constructor(props:iprops){
        super(props);
        this.state = {
            goBack:false,
            paused:false,
            rVel: String(ESCAPE_VEL)
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
            startX: COORDSPACE[0], endX: COORDSPACE[1],
            startY: COORDSPACE[2], endY: COORDSPACE[3]
        }
        console.log(scalew(this.screen.screenWidth), scaleh(this.screen.screenHeight))
        this.initPIXI(0xAFAFAF); //white background
        this.initSim()
    }

    initSim(){
        console.log('initsim called')
        if(this.timeoutPtr) clearTimeout(this.timeoutPtr);
        if(this.ball) this.ball.g.clear();
        this.ball = new GravBody(
            new Vector2(0,PLANET_RAD+BODY_RAD), // pos (5,0)
            new Vector2(Number(this.state.rVel), 0), // horizontal
            new Vector2(0,0), // -10m/s/s downward acceleration due to gravity
            5
        );
        this.app.stage.addChild(this.G);
        this.app.stage.addChild(this.ball.g)
        this.update();
    }

    draw = () =>{
        //draw planet
        this.G.clear();
        this.G.lineStyle(0); //lineStyle to zero so the circle doesn't have an outline
        this.G.beginFill(0xDE3249, 1);
        this.G.drawEllipse(this.screen.screenWidth/2, this.screen.screenHeight/2, PLANET_RAD / scalew(this.screen.screenWidth), PLANET_RAD / scaleh(this.screen.screenHeight));
        this.G.endFill();
        this.ball.draw(this.screen);
    }

    update = () =>{
        if(this.state.paused) {this.prevUpdateTime = Date.now(); return}
        if(!this.prevUpdateTime) this.prevUpdateTime = Date.now();
        let deltaT = (Date.now() - this.prevUpdateTime)/1000;
        

        /**UPDATE LOGIC */
        let r:Vector2 = this.ball.pos; //displacement vector
        // resultent force vector
        let F:Vector2 = r.norm().multScalar( -GRAV_CONST * PLANET_MASS * this.ball.mass / (r.length() ** 2) ); 
        
        //ACC from force vector
        //console.log(`${A}`)
        this.ball.setAcc(F.multScalar(1/this.ball.mass));
       
        
        
        //constrict ball to window
        if(this.ball.pos.x<this.screen.startX || this.ball.pos.x > this.screen.endX || this.ball.pos.y<this.screen.startY|| this.ball.pos.y>this.screen.endY){
            //console.log('ball constricted to window')
            this.ball.setAcc(new Vector2(0,0));
            this.ball.setVel(new Vector2(0,0));
        }
        //stop on coll with planet
        if(r.length() < PLANET_RAD){
            //console.log('ball stopped on collision with planet')
            this.ball.setAcc(new Vector2(0,0));
            this.ball.setVel(new Vector2(0,0));
        }

        //update vel, pos
        this.ball.update(deltaT);
        this.draw();
        this.prevUpdateTime = Date.now();
        this.timeoutPtr = setTimeout(this.update, 16.66); //~60fps
        return;
    }

    handlePress = (e:KeyboardEvent) => {

    }
 
    render() {
        if(this.state.goBack) return <Redirect to = {{pathname:'/'}}/>
        let component = this;
		document.addEventListener('keyup', (e) => { this.handlePress(e) });
		return (
            <div className ="sim-wrapper">
                <div className = "sim-header">Orbit Simulation</div>
                <div className="sim-sidebar" >
                    <div className = "back-butt" onClick={(e)=>this.setState({goBack:true})}>back</div>
                    <div className = "pause-butt" onClick = {(e)=>this.setState({paused:!this.state.paused})}>{!this.state.paused?'pause':'unpause'}</div>
                    <div className = "restart-butt" onClick = {(e)=>this.initSim()}>restart</div>
                     
                    {/** this is where you place any misc inputs to your sim and bind them to state*/}
                    
                    <div className = "num-input">
                        <em>Initial rightward velocity: (km/s)</em>
                        {/**TODO: make custom input component */}
                       1<input className = "slider" type="range" min="1" max="5" value={this.state.rVel} onChange={(v)=>this.setState({rVel: v.target.value})}/>5
                    </div>
                    
                </div>
                <div className = "sim-content" ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
                        onMouseMove={(e) => {  }}
                    />
                <div className = "sim-footer">Written by Theo Cooper</div>
                
            </div>
		);
    }
}
