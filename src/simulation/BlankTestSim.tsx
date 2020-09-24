import React from 'react'
import GenericSim from './GenericSim'

interface iprops{
    title: string
}
export class BlankTestSim extends GenericSim{
    //WRITME: basic ball collision sim
    constructor(props:iprops){
        super(props.title);
    }
    componentDidMount(){
        this.screen = {
            screenHeight:window.innerHeight, 
            screenWidth:window.innerWidth,
            startX: 0, endX: 15,
            startY: 0, endY: 10
        }
        this.initPIXI(0);
        this.update()
    }


    draw = () =>{
        // Circle
        this.G.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        this.G.beginFill(0xDE3249, 1);
        this.G.drawCircle(100, 250, 50);
        this.G.endFill();
    }

    update = () =>{
        this.draw();

        setTimeout(this.update, 16.7);
    }

    handlePress = (e:KeyboardEvent) => {

    }

    render() {
        let component = this;
		document.addEventListener('keyup', (e) => { this.handlePress(e) });
		return (
			<div className="GameFrameWrapper">
				<div ref={(thisDiv: HTMLDivElement) => { component.renderTarget = thisDiv }}
					onMouseMove={(e) => {  }}
				/>
			</div>
		); //
    }
}
