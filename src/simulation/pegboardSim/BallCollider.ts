import Vector2 from '../utils/vect'
import DynamicBody from '../IDynamicBody'
import CircleCollider from '../ICircleCollider'
import Drawable, { screenBounds, scaleh, scalew} from '../IDrawable'
import * as PIXI from 'pixi.js'
const COLOR = 0xFA0A0B

export default class BallColliderObject implements DynamicBody, CircleCollider, Drawable{
    //NOTE: must add each g to app.stage
    g: PIXI.Graphics

    pos: Vector2
    acc:Vector2
    vel:Vector2
    mass: number

    radius: number

    atRest:boolean

    constructor(pos:Vector2, rad:number){
        //somewhat hacked bc we know the system its used in
        this.pos = pos;
        this.vel = new Vector2(0,0);
        this.acc = new Vector2(0, -9.8);
        this.mass = 1;
        this.radius = rad;
        this.atRest = false;

        this.g = new PIXI.Graphics();
    }
    
    momentum = ():Vector2 => this.vel.multScalar(this.mass)

    update(deltaT:number){
        this.pos = this.pos.add(this.vel.multScalar(deltaT)); 
        this.vel = this.vel.add(this.acc.multScalar(deltaT));
    }
    setPos = (p:Vector2):void => {this.pos = p};
    setVel = (v:Vector2):void => {this.vel = v}
    setAcc = (a:Vector2):void => {this.acc = a}

    isOverlapping(other:CircleCollider){
        return this.pos.sub(other.pos).length() < this.radius + other.radius
    }

    posToPx(sb:screenBounds){
        let px = ((this.pos.x - sb.startX) / scalew(sb.screenWidth, sb));
        let py = ((-1 * (this.pos.y - sb.endY)) / scaleh(sb.screenHeight, sb));
        return new Vector2(px,py);
    }

    draw(sb:screenBounds){
        this.g.clear();
        let pxPos:Vector2 = this.posToPx(sb);
        // Circle
        this.g.lineStyle(0); //lineStyle to zero so the circle doesn't have an outline
        this.g.beginFill(COLOR, 1);
        this.g.drawEllipse(pxPos.x, pxPos.y, this.radius / scalew(sb.screenWidth, sb), this.radius / scaleh(sb.screenHeight, sb)); //20px size is totally arbitrary but will be fine for now
        this.g.endFill();
    }
}