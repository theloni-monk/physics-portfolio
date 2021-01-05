/**@class Immutable Vector class, all methods return either properties or new vectors */
export default class Vector2 {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromPolar = (r: number, theta: number): Vector2 => new Vector2(r * Math.cos(theta), r * Math.sin(theta))

    copy = ():Vector2 => new Vector2(this.x, this.y)

    toString = ():string => 'x: ' + this.x.toString() + ', y: ' + this.y.toString()

    length = (): number => Math.sqrt(this.x * this.x + (this.y * this.y))

    isZero = (): boolean => this.length()<0.00001

    radians = (): number => Math.atan2(this.y, this.x)

    congugate = (): Vector2 => new Vector2(this.x, -this.y)

    norm = (): Vector2 => this.multScalar(1/this.length())


    inv = (): Vector2 => new Vector2(-this.x, -this.y)


    add = (other: Vector2): Vector2 => new Vector2(this.x + other.x, this.y + other.y);


    sub = (other: Vector2): Vector2 => new Vector2(this.x - other.x, this.y - other.y);


    multScalar = (s: number): Vector2 => new Vector2(this.x * s, this.y * s)


    dot = (other: Vector2): number => this.x * other.x + (this.y * other.y)

}