import * as PIXI from "pixi.js";
import Drawable, { screenBounds, scaleh, scalew } from "../IDrawable";
import DynamicBody from "../IDynamicBody";
import Vector2 from "../utils/vect";
interface igrav extends DynamicBody, Drawable {}

const GRAV_CONST = 0.0000000000067

const COLOR = 0x00fa0f;
export default class GravBody implements igrav {
  pos: Vector2;
  vel: Vector2;
  acc: Vector2;

  mass: number;
  radius: number;

  g: PIXI.Graphics;
  constructor(p: Vector2, v: Vector2, a: Vector2, mass: number, rad: number) {
    this.pos = p;
    this.vel = v;
    this.acc = a;

    this.radius = rad;
    this.mass = mass;

    this.g = new PIXI.Graphics();
  }
  setPos = (p: Vector2) => (this.pos = p);
  setVel = (v: Vector2) => (this.vel = v);
  setAcc = (a: Vector2) => (this.acc = a);

  /**@param t - time difference between update calls ; must be in seconds _not ms_ */
  update(t: number) {
    this.pos = this.pos.add(this.vel.multScalar(t));
    this.vel = this.vel.add(this.acc.multScalar(t));
  }

  gravInteract(other:GravBody){
    let r:Vector2 = this.pos.sub(other.pos); //displacement vector
    
    // resultent force vector
    let F:Vector2 = r.norm().multScalar( -GRAV_CONST * this.mass * other.mass / (r.length() ** 2) ); 
        
    //ACC from force vector
    this.setAcc(F.multScalar(1/this.mass));
    other.setAcc(F.multScalar(1/other.mass));
  }
  
  posToPx(sb: screenBounds) {
    let px = (this.pos.x - sb.startX) / scalew(sb.screenWidth, sb);
    let py = (-1 * (this.pos.y - sb.endY)) / scaleh(sb.screenHeight, sb);
    return new Vector2(px, py);
  }

  draw(sb: screenBounds) {
    this.g.clear();
    let pxPos: Vector2 = this.posToPx(sb);
    // Circle
    this.g.lineStyle(0); //lineStyle to zero so the circle doesn't have an outline
    this.g.beginFill(COLOR, 1);
    this.g.drawEllipse(
      pxPos.x,
      pxPos.y,
      this.radius / scalew(sb.screenWidth, sb),
      this.radius / scaleh(sb.screenHeight, sb)
    ); //20px size is totally arbitrary but will be fine for now
    this.g.endFill();
  }
}
