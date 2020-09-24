import { Component } from 'react'
import * as PIXI from 'pixi.js'
import {screenBounds} from './IDrawable'

export default abstract class GenericSim extends Component {
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application
    protected prevUpdateTime:number
    protected screen:screenBounds 

    readonly fps:number = 60;
    
    protected title: string

    constructor(title:string, ...rest:any[]){
        super(rest);
        this.title = title
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

    abstract handlePress(e:KeyboardEvent):void

    /** @note must create a screenBounds object and call initPIXI */
    abstract componentDidMount():void 

    abstract draw():void

    abstract update():void
    abstract render():JSX.Element
}
