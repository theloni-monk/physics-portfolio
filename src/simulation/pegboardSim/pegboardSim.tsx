import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Pegboard from './Pegboard'
import * as PIXI from 'pixi.js'
import {screenBounds} from '../IDrawable'

/**
 * CONSTANTS
 */
const COORDSPACE = [-15, 15, -20, 0] 

interface iState {
    paused:boolean,
    goBack:boolean
}
export default class pegboardSim extends Component<{},iState>{
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application
    protected prevUpdateTime:number
    protected screen:screenBounds 
    protected timeoutPtr: any //weird js pointer type
    readonly fps:number = 60;
    protected title: string

    board: Pegboard;

    constructor(props:any){
        super(props);
        this.state = {
            paused: false,
            goBack: false
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
        this.board = new Pegboard(this.app.stage,0);
    }

    componentDidMount(){
        console.log(this.renderTarget.getBoundingClientRect())
        this.screen = {
            screenWidth: (window.innerWidth), //this.renderTarget.getBoundingClientRect().width,
            screenHeight: window.innerHeight, //this.renderTarget.getBoundingClientRect().height, 
            startX: COORDSPACE[0], endX: COORDSPACE[1],
            startY: COORDSPACE[2], endY: COORDSPACE[3]
        }
        
        console.log(this.screen.screenWidth, this.screen.screenHeight)
        this.initPIXI(0x0F0F0F); //white background
        this.initSim();
    }

    initSim(){
        console.log('initsim called')
        if(this.timeoutPtr) clearTimeout(this.timeoutPtr);
        if(this.board) this.G.clear();
        
        this.app.stage.addChild(this.G);
        this.update();
    }

    draw = () =>{
        this.G.clear();
        this.G.lineStyle(0); //lineStyle to zero so the circle doesn't have an outline
        this.G.beginFill(0x50A6C2, 1);
        this.board.draw(this.screen);
        //WRITEME: write draw logic from board
        this.G.endFill();
    }

    update = () =>{
        if(this.state.paused) {
            this.prevUpdateTime = Date.now(); 
            this.timeoutPtr = setTimeout(this.update, 16.66); //~60fps
            return;
        }
        if(!this.prevUpdateTime) this.prevUpdateTime = Date.now();
        let deltaT = (Date.now() - this.prevUpdateTime)/1000;
        

        /**UPDATE LOGIC */
        

        //update vel, pos
        this.board.step(deltaT);
        this.draw();
        
        this.prevUpdateTime = Date.now();
        this.timeoutPtr = setTimeout(this.update, 1000/this.fps); //~60fps
        return;
    }

    handlePress = (e:KeyboardEvent) => {
        if(e.ctrlKey) this.board.spawnBall();
    }
 
    render() {
        if(this.state.goBack) return <Redirect to = {{pathname:'/'}}/>
        let component = this;
		document.addEventListener('keyup', (e) => { this.handlePress(e) });
		return (
            <div className ="sim-wrapper">
                <div className = "sim-header">Pegboard Simulation</div>
                
                <div className="sim-sidebar" >
                    <div className = "back-butt" onClick={(e)=>this.setState({goBack:true})}>back</div>
                    <div className = "pause-butt" onClick = {(e)=>this.setState({paused:!this.state.paused})}>{!this.state.paused?'pause':'unpause'}</div>
                    <div className = "restart-butt" onClick = {(e)=>this.initSim()}>restart</div>
                     
                    {/** this is where you place any misc inputs to your sim and bind them to state*/}
                    
                    
                </div> 
                
                <div className = "sim-content" ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
                        onMouseMove={(e) => {  }}
                    />
                <div className = "sim-footer">Written by Theo Cooper</div>
                
            </div>
		);
    }


}

