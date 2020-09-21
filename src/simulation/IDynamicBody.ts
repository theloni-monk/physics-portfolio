import Vector2 from './utils/vect'
/**@param pos: position in meters, all derivatives are with respect to time in seconds */
export default interface DynamicBody{
    acc:Vector2,
    vel:Vector2,
    pos:Vector2
    update(deltaT:number):void
    setPos(p:Vector2):void
    setVel(v:Vector2):void
    setAcc(a:Vector2):void
}