import Vector2 from './utils/vect'
export class BoundingBox{
    //topleft corner
    tl:Vector2
    //bottomright corner
    br:Vector2

    constructor(p1:Vector2, p2:Vector2){
        this.tl = p1
        this.br = p2
    }

    /**@note calculation is with respect to real space not pixel space, use caution */
    isWithin(point:Vector2):boolean{
        return (point.x>this.tl.x && point.x<this.br.x)&&(point.y<this.tl.y && point.y>this.br.y)
    }

    //WRITEME: AABB collision
    /**Implementation of standard AABB collision detection */
    intersection(other:BoundingBox):boolean{
        return true
    }
}
/**@note it is very important that if a body implements both BoxCollider and Drawable, that its bounding box is alligned to its visualization */
export interface BoxCollider{
    getBounds():BoundingBox
}