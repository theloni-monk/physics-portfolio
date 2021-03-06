import CircleCollider from '../ICircleCollider';
import BallColliderObject from './BallCollider';
import PegColliderObject from './PegCollider';
import Vector2 from '../utils/vect';
import { screenBounds } from '../IDrawable';
import * as PIXI from 'pixi.js'

const MIN_VEL = 0.0001;
const VEL_NOISE_MAX = 0.01;
const PEG_RAD = 0.2;
const BALL_RAD = 0.2;
const BALL_START_POS = new Vector2(0,0);


const PEG_LOCS:Vector2[] = [
    // WRITEME: location of pegs
new Vector2(0,-5)
];

export default class Pegboard{
    friction:number
    stage:PIXI.Container

    pegs:PegColliderObject[]
    balls:BallColliderObject[]
    allAtRest:boolean

    constructor(stage: PIXI.Container, friction_:number) {
        this.friction = friction_;
        this.stage = stage;
        this.pegs = new Array();
        this.balls = new Array();
        // ball number = -1 : the cue ball
        PEG_LOCS.forEach(peg=>
            this.pegs.push(new PegColliderObject(peg, PEG_RAD)))
        
        this.pegs.forEach(peg=>this.stage.addChild(peg.g))

        this.allAtRest = false;
    }
    
    draw = (sb:screenBounds) =>{
        this.pegs.forEach(peg=>peg.draw(sb));
        this.balls.forEach(ball=>ball.draw(sb));
    }

    step = (deltaT: number) => {
        if(this.balls.length === 0) {return;}
        let ballsAtRest = 0;
        this.balls.forEach(ball => {if(!ball.atRest){
    
            ball.update(deltaT);
            
            this.pegs.forEach(peg => {if(ball.isOverlapping(peg)) this.doCollision(ball, peg)});

            this.checkEdge(ball);
            // check to see if all balls are at rest
            if (ball.atRest)
                ballsAtRest++;
        }});
        if (ballsAtRest === this.balls.length)
            this.allAtRest = true;
    }

    spawnBall = () =>{
        this.balls.push(new BallColliderObject(BALL_START_POS,BALL_RAD));
        this.stage.addChild(this.balls[this.balls.length-1].g);
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
            //let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
            let d = distanceVect.copy();
            let correctionVector = d.norm().multScalar(minDistance+0.01);
            ball.pos = ball.pos.add(correctionVector);

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
            ball.setPos(ball.pos.add(bFinal[0]));

            // update velocities
            ball.setVel(new Vector2(cosine * vFinal[0].x - sine * vFinal[0].y, cosine * vFinal[0].y + sine * vFinal[0].x));
            
            // prevent head on collision from resulting in perfect up and down bouncing
            let velNoiseVect: Vector2 = new Vector2(Math.random()*VEL_NOISE_MAX,Math.random()*VEL_NOISE_MAX);
            ball.setVel(ball.vel.add(velNoiseVect));

            //check if velocities are low enough to set the balls to rest
            if(ball.vel.length() < MIN_VEL) {
                ball.setVel(new Vector2(0,0));
                ball.atRest = true;
            }
        }
    }

}