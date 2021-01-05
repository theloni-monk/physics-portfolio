import * as PIXI from 'pixi.js';
import Vector2 from './utils/vect'

export const scalew = (width:number, sb:screenBounds): number => (sb.endX - sb.startX) / width;
export const scaleh = (height:number, sb:screenBounds): number => (sb.endY - sb.startY) / height;

export interface screenBounds{
    screenWidth:number 
    screenHeight:number 
    startX:number 
    endX:number 
    startY:number 
    endY:number
}
export default interface Drawable{
    g:PIXI.Graphics

    /**@param coordinates in real space, converted to pixel location based on internal scaling parameters 
     * @note all Drawables in a given application must be ensured to have the same space to pixel transforms
    */
    posToPx(sb:screenBounds):Vector2
    
    draw(sb:screenBounds):void
}