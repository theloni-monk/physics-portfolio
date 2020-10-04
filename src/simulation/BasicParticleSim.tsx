import React,{Component} from 'react'
import * as PIXI from 'pixi.js'
import GenericSim from './GenericSim'

import Drawable, {screenBounds} from './IDrawable'
import DynamicBody from './IDynamicBody'
import Vector2 from './utils/vect'

import '../css/SimLayout.scss';
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
    goBack:boolean
}
export default class BasicParticleSim extends Component<iprops,istate> {
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application
    protected prevUpdateTime:number
    protected screen:screenBounds 

    readonly fps:number = 60;
    
    protected title: string

    ball:Particle
    
    constructor(props:iprops){
        super(props);
        this.state = {
            goBack:false
        }
        //this.title = props.title
        this.G = new PIXI.Graphics();
    }

    initPIXI = (backgroundColor:number) =>{
        //TODO: on resize reinit application and reassign this.G
        this.app = new PIXI.Application({
			width: this.screen.screenWidth,
			height: this.screen.screenHeight,
			backgroundColor: backgroundColor,
			antialias: true
		});
		this.renderTarget.appendChild(this.app.view);
		this.app.start(); //start renderer internal update ticker;
        this.app.stage.addChild(this.G);
        this.prevUpdateTime = Date.now();
    }

    componentDidMount(){
        this.screen = {
            screenHeight:window.innerHeight, 
            screenWidth:window.innerWidth,
            startX: 0, endX: 10,
            startY: 0, endY: 3
        }
        this.initPIXI(0); //black background
        
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
        let deltaT = (Date.now() - this.prevUpdateTime)/1000
        this.ball.update(deltaT);
        //constrain ball to window bounds
        if(this.ball.pos.y<this.screen.startY || this.ball.pos.y > this.screen.endY || this.ball.pos.x<this.screen.startX || this.ball.pos.x > this.screen.endX){
            this.ball.setAcc(new Vector2(0,0));
            this.ball.setVel(new Vector2(0,0));
        }
        this.draw();
        this.prevUpdateTime = Date.now();
        setTimeout(this.update, 16.66); //~60fps
    }

    handlePress = (e:KeyboardEvent) => {

    }

    render() {
        if(this.state.goBack) return <Redirect to = {{pathname:'/'}}/>
        let component = this;
		document.addEventListener('keyup', (e) => { this.handlePress(e) });
		return (
            <div>
                <div className="sim-sidebar" >
                    <div className = "back-butt" onClick={(e)=>this.setState({goBack:true})}>back</div>
                </div>
                <div className="sim-content">
                    <div ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
                        onMouseMove={(e) => {  }}
                    />
                </div>
            </div>
		); // TODO: add sidebar with controls and option to return to home
    }
}
