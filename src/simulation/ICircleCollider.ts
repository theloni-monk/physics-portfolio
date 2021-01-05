import Vector2 from './utils/vect'


export default interface CircleCollider{
    pos:Vector2
    vel: Vector2
    mass:number
    radius:number

    atRest:boolean
    
    momentum():Vector2

    isOverlapping(other:any):boolean

    //collide(other:any):void
}