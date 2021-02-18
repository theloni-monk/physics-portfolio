import Vector2 from '../utils/vect'
import CircleCollider from '../ICircleCollider'
import Drawable,{screenBounds, scaleh, scalew} from '../IDrawable'
import * as PIXI from 'pixi.js'
const COLOR = 0xFFFFFF;
export default class PegColliderObject implements CircleCollider, Drawable{
    pos: Vector2
    vel: Vector2 = new Vector2(0,0)
    acc: Vector2 = new Vector2(0,0)
    mass: number
    radius: number

    atRest: boolean = true

    g: PIXI.Graphics

    constructor(p:Vector2, rad:number){
        this.pos = p;
        this.radius = rad;

        this.g = new PIXI.Graphics();
    }


    setPos = ():void => {};//cant alter pos
    
    momentum = ():Vector2 => new Vector2(0,0)

    isOverlapping = (other:CircleCollider):boolean => this.pos.sub(other.pos).length() < this.radius + other.radius
    
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

    collide(other:CircleCollider){}
}