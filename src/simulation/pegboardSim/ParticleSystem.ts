import CircleCollider from '../ICircleCollider';
import BallColliderObject from './BallCollider';
import PegColliderObject from './PegCollider';
import Vector2 from '../utils/vect';


const MIN_VEL = 0.0001;
const PEG_RAD = 0.5;
const BALL_RAD = 0.2;
const BALL_START_POS = new Vector2(0,0);


const PEG_LOCS:Vector2[] = [
    // WRITEME: location of pegs
];

export default class Pegboard{
    friction:number
    
    pegs:PegColliderObject[]
    balls:BallColliderObject[]
    allAtRest:boolean

    Pegboard(friction_:number) {
        this.friction = friction_;
        // ball number = -1 : the cue ball
        for (let i = -1; i < 15; i++) {
            this.pegs.push(new PegColliderObject(PEG_LOCS[i], PEG_RAD));
        }
        this.allAtRest = false;
    }

    step = (deltaT: number) => {
        let ballsAtRest = 0;
        this.balls.forEach(ball => {if(!ball.atRest){
    
            ball.update(deltaT);
            
            this.checkEdge(ball);
            this.pegs.forEach(peg => {if(ball.isOverlapping(peg)) this.doCollision(ball, peg)})
            // check to see if all balls are at rest
            if (ball.atRest)
                ballsAtRest++;
        }});
        if (ballsAtRest === this.balls.length)
            this.allAtRest = true;
    }

    spawnBall = () =>{
        this.balls.push(new BallColliderObject(BALL_START_POS,BALL_RAD));
    }

    checkEdge(ball: CircleCollider) {
        // WRITEME: check Edge collisions and score conditions;
    }

    doCollision(ball: BallColliderObject, peg:PegColliderObject) {
        // Get distances between the balls components
        let distanceVect:Vector2 = ball.pos.sub(peg.pos);

        // Calculate magnitude of the vector separating the balls
        let distanceVectMag = distanceVect.length();

        // Minimum distance before they are touching
        let minDistance = ball.radius + peg.radius;

        if (distanceVectMag < minDistance) {
            let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
            let d = distanceVect.copy();
            let correctionVector = d.norm().multScalar(distanceCorrection);
            ball.pos = ball.pos.sub(correctionVector);

            // get angle of distanceVect
            let theta = distanceVect.radians();
            // precalculate trig values
            let sine = Math.sin(theta);
            let cosine = Math.cos(theta);

            /*
             * bTemp will hold rotated ball poss. You just need to worry about bTemp[1]
             * pos
             */
            let bTemp:Vector2[]=[new Vector2(0,0), new Vector2(0,0)]


            /*
             * this ball's pos is relative to the b2 so you can use the vector
             * between them (bVect) as the reference point in the rotation expressions.
             * bTemp[0].pos.x and bTemp[0].pos.y will initialize automatically to
             * 0.0, which is what you want since b[1] will rotate around b[0]
             */
            bTemp[1] = new Vector2(cosine * distanceVect.x + sine * distanceVect.y, cosine * distanceVect.y - sine * distanceVect.x)

            // rotate Temporary velocities
            let vTemp:Vector2[] = [new Vector2(cosine * ball.vel.x + sine * ball.vel.y, cosine * ball.vel.y - sine * ball.vel.x),
                                    new Vector2(cosine * peg.vel.x + sine * peg.vel.y, cosine * peg.vel.y - sine * peg.vel.x)];

            /*
             * Now that velocities are rotated, you can use 1D conservation of momentum
             * equations to calculate the final vel along the x-axis.
             */
            let vFinal:Vector2[] = [
                // final rotated vel for b[0]
                new Vector2 (((ball.mass - peg.mass) * vTemp[0].x + 2 * peg.mass * vTemp[1].x) / (ball.mass + peg.mass), vTemp[0].y),
                // final rotated vel for b[0]
                new Vector2(((peg.mass - ball.mass) * vTemp[1].x + 2 * ball.mass * vTemp[0].x) / (ball.mass + peg.mass), vTemp[1].y)
            ];
            // hack to avoid clumping
            bTemp[0].add(new Vector2(vFinal[0].x,0));
            bTemp[1].add(new Vector2(vFinal[1].x,0));

            /*
             * Rotate ball poss and velocities back Reverse signs in trig expressions
             * to rotate in the opposite direction
             */
            // rotate balls
            let bFinal:Vector2[] = [ new Vector2( cosine * bTemp[0].x - sine * bTemp[0].y, cosine * bTemp[0].y + sine * bTemp[0].x),
            new Vector2(cosine * bTemp[1].x - sine * bTemp[1].y, cosine * bTemp[1].y + sine * bTemp[1].x)];

            // update ball to screen pos
            ball.pos = ball.pos.add(bFinal[0]);

            // update velocities
            ball.vel = new Vector2(cosine * vFinal[0].x - sine * vFinal[0].y, cosine * vFinal[0].y + sine * vFinal[0].x);
            
            //check if velocities are low enough to set the balls to rest
            if(ball.vel.length() < MIN_VEL) {
                ball.vel = new Vector2(0,0);
                ball.atRest = true;
            }
        }
    }

}