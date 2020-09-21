import * as PIXI from 'pixi.js';
import Vector2 from './utils/vect'
export default interface Drawable{
    /**@param coordinates in real space, converted to pixel location based on internal scaling parameters 
     * @note all Drawables in a given application must be ensured to have the same space to pixel transforms
    */
    posToPx():Vector2
    
    draw(g:PIXI.Graphics):void
}