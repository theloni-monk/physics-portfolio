import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

export default abstract class GenericSim extends Component {
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application
    protected prevUpdateTime:number

    readonly fps:number = 60;
    
    protected title: string

    constructor(title:string, ...rest:any[]){
        super(rest);
        this.title = title
        this.G = new PIXI.Graphics();
    }

    initPIXI = (width:number, height:number, backgroundColor:number) =>{
        //TODO: on resize reinit application and reassign this.G
        this.app = new PIXI.Application({
			width: width,
			height: height,
			backgroundColor: backgroundColor,
			antialias: true
		});
		this.renderTarget.appendChild(this.app.view);
		this.app.start(); //start renderer internal update ticker;
        this.app.stage.addChild(this.G);
        this.prevUpdateTime = Date.now();
    }

    abstract handlePress(e:KeyboardEvent):void

    abstract componentDidMount():void //must call initPIXI

    abstract draw():void

    abstract update():void
    abstract render():JSX.Element
}
