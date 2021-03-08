import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Pegboard from './Pegboard'
import * as PIXI from 'pixi.js'
import { screenBounds } from '../IDrawable'

/**
 * CONSTANTS
 */
const BOARDLEN = 20;
const updateTicker = new PIXI.Ticker();
interface iState {
    paused: boolean,
    goBack: boolean
}
export default class pegboardSim extends Component<{}, iState>{
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application
    protected prevUpdateTime: number
    protected screen: screenBounds
    protected timeoutPtr: any //weird js pointer type
    readonly fps: number = 244;
    protected title: string

    board: Pegboard;

    constructor(props: any) {
        super(props);
        this.state = {
            paused: false,
            goBack: false
        }
        //this.title = props.title
        this.G = new PIXI.Graphics();
        updateTicker.autoStart = true;
    }

    initPIXI = (backgroundColor: number) => {
        //TODO: on resize reinit application and reassign this.G
        //FIXME: get accurate canvas size from dom
        this.app = new PIXI.Application({
            width: window.innerWidth,//this.screen.screenWidth,
            height: window.innerHeight, // this.screen.screenHeight,
            backgroundColor: backgroundColor,
            antialias: true
        });
        this.renderTarget.appendChild(this.app.view);
        this.app.start(); //start renderer internal update ticker;
        this.app.stage.addChild(this.G);
        this.board = new Pegboard(this.app.stage, [this.screen.startX,this.screen.endX], [this.screen.startY, this.screen.endY]);
    }

    initSim = () => {
        console.log('initsim called')
        if (this.timeoutPtr) clearTimeout(this.timeoutPtr);
        if (this.board) this.G.clear();

        this.app.stage.addChild(this.G);
        updateTicker.add(deltaT=>this.update(deltaT/70));
    }
    componentDidMount() {
        console.log(this.renderTarget.getBoundingClientRect())
        let sw = document.getElementById('sim')?.clientWidth;
        let sh = document.getElementById('sim')?.clientHeight;
        sw = sw ? sw : window.innerWidth;
        sh = sh? sh: window.innerHeight
    
        let ratio = sw/sh;


        this.screen = {
            screenWidth: sw, 
            screenHeight: sh, 
            startX: -ratio * BOARDLEN / 2, endX: ratio * BOARDLEN/2,
            startY: -BOARDLEN, endY: 0
        }

        console.log(this.screen.screenWidth, this.screen.screenHeight)
        this.initPIXI(0x997950); //wood background
        this.initSim();
    }

    

    draw = () => {
        this.G.clear();
        this.G.beginFill(0);
        this.board.draw(this.screen);
        this.G.endFill();
    }

    update = (deltaT: number) => {
        if (this.state.paused) return;
        
        /**UPDATE LOGIC */

        //update vel, pos
        this.board.step(deltaT);
        this.draw();
    }

    debounced = true;
    handlePress = (e: KeyboardEvent) => {
        if (e.code === 'Space' && this.debounced) {
            this.board.spawnBall(); 
            this.debounced = false;
        }

        setTimeout(() => { this.debounced = true }, 250);
    }

    render() {
        if (this.state.goBack) return <Redirect to={{ pathname: '/' }} />
        let component = this;
        document.addEventListener('keyup', (e) => { this.handlePress(e) });
        return (
            <div className="sim-wrapper">
                <div className="sim-header">Pegboard Simulation</div>

                <div className="sim-sidebar">
                    <div className="back-butt" onClick={(e) => this.setState({ goBack: true })}>back</div>
                    <div className="pause-butt" onClick={(e) => this.setState({ paused: !this.state.paused })}>{!this.state.paused ? 'pause' : 'unpause'}</div>
                    <div className="restart-butt" onClick={(e) => this.initSim()}>restart</div>

                    {/** this is where you place any misc inputs to your sim and bind them to state*/}

                </div>

                <div className="sim-content" id = 'sim' ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
                    onMouseMove={(e) => { }}
                />
                <div className="sim-footer">Written by Theo Cooper</div>

            </div>
        );
    }


}

