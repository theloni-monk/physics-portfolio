import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as PIXI from 'pixi.js'
import { screenBounds } from '../IDrawable'
import GravSystem from './GravSystem'
import Vector2 from '../utils/vect'

/**
 * CONSTANTS
 */
const SPACE_HEIGHT = 20;
const updateTicker = new PIXI.Ticker();
interface iState {
    paused: boolean,
    goBack: boolean
}
export default class threeBodySim extends Component<{}, iState>{
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application
    protected prevUpdateTime: number
    protected screen: screenBounds
    protected title: string

    gravSys: GravSystem;

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
            width: this.screen.screenWidth,
            height: this.screen.screenHeight,
            backgroundColor: backgroundColor,
            antialias: true
        });
        this.renderTarget.appendChild(this.app.view);
        this.app.start(); //start renderer internal update ticker;
        this.app.stage.addChild(this.G);
        this.gravSys = new GravSystem(this.app.stage, [this.screen.startX, this.screen.endX], [this.screen.startY, this.screen.endY]);
        
    }

    initSim = () => {
        console.log('initsim called');
        if (this.gravSys) this.G.clear();
        this.gravSys.spawnBody(new Vector2(0,-1));
        this.gravSys.spawnBody(new Vector2(0, -5))
        this.app.stage.addChild(this.G);
        if(!updateTicker.started) updateTicker.add((deltaT:number) => this.update(deltaT / 35));
    }

    componentDidMount() {
        console.log(this.renderTarget.getBoundingClientRect())
        let sw = document.getElementById('sim')?.clientWidth;
        let sh = document.getElementById('sim')?.clientHeight;
        sw = sw ? sw : window.innerWidth;
        sh = sh ? sh : window.innerHeight

        let ratio = sw / sh;

        this.screen = {
            screenWidth: sw,
            screenHeight: sh,
            startX: -ratio * SPACE_HEIGHT / 2, endX: ratio * SPACE_HEIGHT / 2,
            startY: -SPACE_HEIGHT, endY: 0
        }

        console.log(this.screen.screenWidth, this.screen.screenHeight)
        this.initPIXI(0x997950); //wood background
        this.initSim();
    }


    draw = () => {
        this.G.clear();
        this.G.beginFill(0);
        this.gravSys.draw(this.screen);
        this.G.endFill();
    }

    update = (deltaT: number) => {
        if (this.state.paused) return;

        /**UPDATE LOGIC */

        //update vel, pos
        this.gravSys.step(deltaT);
        this.draw();
    }

    handleClick = (e:any) =>{ //FIXME
        console.log(e);
    }

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
            e.preventDefault(); // stop space from scrolling
        }
    }

    debounced = true;
    handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
            e.preventDefault();
        }
    }

    render() {
        if (this.state.goBack) return <Redirect to={{ pathname: '/' }} />
        let component = this;
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e))
        return (
            <div className="sim-wrapper">
                <div className="sim-header">Pegboard Simulation</div>

                <div className="sim-sidebar">
                    <div className="back-butt" onClick={(e) => this.setState({ goBack: true })}>back</div>
                    <div className="pause-butt" onClick={(e) => this.setState({ paused: !this.state.paused })}>{!this.state.paused ? 'pause' : 'unpause'}</div>
                    <div className="restart-butt" onClick={(e) => this.initSim()}>restart</div>

                    {/** this is where you place any misc inputs to your sim and bind them to state*/}

                </div>

                <div className="sim-content" id='sim' ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
                    onMouseDown={(e)=>this.handleClick(e)}
                />
                <div className="sim-footer">Written by Theo Cooper</div>

            </div>
        );
    }


}

