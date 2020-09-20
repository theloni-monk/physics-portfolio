//WRITEME: vector code
/**@class Immutable Vector class, all methods return either properties or new vectors */
export default class Vector2{
    readonly x:number;
    readonly y:number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    static fromPolar(r:number, theta:number){
        return new Vector2(r*Math.cos(theta), r*Math.sin(theta))
    }

    length():number{
        return Math.sqrt(this.x*this.x + (this.y*this.y))
    }

    radians():number {
        return Math.atan2(this.y, this.x)
    }

    congugate():Vector2{
        return new Vector2(this.x, -this.y)
    }

    inv():Vector2{
        return new Vector2(-this.x, -this.y)
    }

    add(other:Vector2):Vector2{
        return new Vector2(this.x+other.x, this.y+other.y);
    }

    sub(other:Vector2):Vector2{
        return new Vector2(this.x-other.x, this.y-other.y);
    }

    multScalar(s:number):Vector2{
        return new Vector2(this.x*s, this.y*s)
    }

    dot(other:Vector2):number{
        return this.x*other.x+(this.y*other.y)
    }
}