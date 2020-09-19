import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

export default abstract class GenericSim extends Component {
    protected renderTarget: HTMLDivElement
    protected G: PIXI.Graphics
    protected app: PIXI.Application

    readonly fps:number = 60;
    
    protected title: string

    constructor(title:string, ...rest:any[]){
        super(rest);
        this.title = title
        this.G = new PIXI.Graphics();
    }

    initPIXI = (width:number, height:number, backgroundColor:number | 0x000000) =>{
        this.app = new PIXI.Application({
			width: width,
			height: height,
			backgroundColor: backgroundColor,
			antialias: true
		});
		this.renderTarget.appendChild(this.app.view);
		this.app.start(); //start renderer;
		this.app.stage.addChild(this.G);
    }

    abstract handlePress(e:KeyboardEvent):void

    abstract componentDidMount():void //must call initPIXI

    abstract draw():void

    abstract update(delta:number):void
    abstract render():JSX.Element
}
