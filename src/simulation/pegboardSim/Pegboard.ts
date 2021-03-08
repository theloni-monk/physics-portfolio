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
const BALL_START_POS = new Vector2(0, -BALL_RAD - 0.001);
const BB_RESTITUTION = 0.8; //what factor of kinetic energy is preserved in ball-ball collision, aka  how bouncy balls are with each other
const BP_RESTITUTION = 0.7; //what factor of kinetic energy is preserved in ball-peg collision, aka  how bouncy balls are with pegs


//locations are percentages down the field in x and y
const PEG_LOCS: Vector2[] = [
    new Vector2(-0.8, 0.2), new Vector2(-0.6, 0.2), new Vector2(-0.4, 0.2), new Vector2(-0.2, 0.2), new Vector2(0, 0.2),new Vector2(0.8, 0.2), new Vector2(0.6, 0.2), new Vector2(0.4, 0.2), new Vector2(0.2, 0.2),
    new Vector2(-0.9, 0.3), new Vector2(-0.7, 0.3), new Vector2(-0.5, 0.3), new Vector2(-0.3, 0.3), new Vector2(-0.1, 0.3),new Vector2(0.7, 0.3), new Vector2(0.5, 0.3), new Vector2(0.3, 0.3), new Vector2(0.1, 0.3),
    new Vector2(-0.8, 0.4), new Vector2(-0.6, 0.4), new Vector2(-0.4, 0.4), new Vector2(-0.2, 0.4), new Vector2(0, 0.4),new Vector2(0.8, 0.4), new Vector2(0.6, 0.4), new Vector2(0.4, 0.4), new Vector2(0.2, 0.4),
    new Vector2(-0.9, 0.5), new Vector2(-0.7, 0.5), new Vector2(-0.5, 0.5), new Vector2(-0.3, 0.5), new Vector2(-0.1, 0.5),new Vector2(0.7, 0.5), new Vector2(0.5, 0.5), new Vector2(0.3, 0.3), new Vector2(0.1, 0.5)
];

export default class Pegboard {
    stage: PIXI.Container

    pegs: PegColliderObject[]
    balls: BallColliderObject[]
    allAtRest: boolean

    xrange: number[];
    yrange: number[];

    constructor(stage: PIXI.Container, xrange: number[], yrange: number[]) {
        this.stage = stage;
        this.pegs = [];
        this.balls = [];

        this.xrange = xrange;
        this.yrange = yrange;
        let xlen = Math.abs(xrange[0]) + Math.abs(xrange[1]);
        let ylen = Math.abs(yrange[0]) + Math.abs(yrange[1]);

        PEG_LOCS.forEach(loc =>
            this.pegs.push(new PegColliderObject(new Vector2(loc.x * xlen / 2, -loc.y * ylen), PEG_RAD)))

        this.pegs.forEach(peg => this.stage.addChild(peg.g))

        this.allAtRest = false;
    }

    draw = (sb: screenBounds) => {
        this.pegs.forEach(peg => peg.draw(sb));
        this.balls.forEach(ball => ball.draw(sb));
    }

    step = (deltaT: number) => {
        console.log('deltat', deltaT);
        if (this.balls.length === 0) { return; }
        let ballsAtRest = 0;
        let rindex = 0;//jank asf method of checking balls against each other by refrence without duplicates
        this.balls.forEach(ball => {
            if (!ball.atRest) {

                ball.update(deltaT);

                this.pegs.forEach(peg => {
                    if (ball.isOverlapping(peg)) { 
                        this.doBPCollision(ball, peg) }
                });
                // this.balls.slice(rindex + 1).forEach(oball => {
                //     if (!oball.atRest) {
                //         if (ball.isOverlapping(oball)) this.doBBCollision(ball, oball)
                //     }
                // })
                // rindex++;
                this.checkEdge(ball);
                // check to see if all balls are at rest
                if (ball.atRest) ballsAtRest++;

            }
        });
        if (ballsAtRest === this.balls.length)
            this.allAtRest = true;
    }

    spawnBall = () => {
        this.balls.push(new BallColliderObject(BALL_START_POS, BALL_RAD));
        this.stage.addChild(this.balls[this.balls.length - 1].g);
        console.log('ball spawned');
    }

    checkEdge(ball: BallColliderObject) {
        // reverse ball x vel and push out of wall if bumps into side wall
        if (ball.pos.x - ball.radius < this.xrange[0]) {
            ball.setVel(new Vector2(-ball.vel.x, ball.vel.y));
            ball.setPos(new Vector2(this.xrange[0] + ball.radius + 0.001, ball.pos.y));
        }
        if (ball.pos.x + ball.radius > this.xrange[1]) {
            ball.setVel(new Vector2(-ball.vel.x, ball.vel.y));
            ball.setPos(new Vector2(this.xrange[1] - ball.radius + 0.001, ball.pos.y))
        }

        //bounce off of ceiling
        if (ball.pos.y + ball.radius > this.yrange[1]) {
            ball.setVel(new Vector2(ball.vel.x, -ball.vel.y));
            ball.setPos(new Vector2(ball.pos.x, this.yrange[1] - ball.radius + 0.001))
        }

        //stop when hitting the floor
        if (ball.pos.y < this.yrange[0]) {
            ball.setVel(new Vector2(0, 0));
            ball.atRest = true;
        }
    }

    doBPCollision(ball: BallColliderObject, peg: PegColliderObject) {
        // Get distances between the balls components
        let distanceVect: Vector2 = ball.pos.sub(peg.pos);

        // Calculate magnitude of the vector separating the balls
        let distanceVectMag = distanceVect.length();

        // Minimum distance before they are touching
        let minDistance = ball.radius + peg.radius;

        if (distanceVectMag < minDistance) {
            //let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
            let d = distanceVect.copy();
            let correctionVector = d.norm().multScalar(minDistance + 0.01);
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
            let bTemp: Vector2[] = [new Vector2(0, 0), new Vector2(0, 0)]


            /*
             * this ball's pos is relative to the b2 so you can use the vector
             * between them (bVect) as the reference point in the rotation expressions.
             * bTemp[0].pos.x and bTemp[0].pos.y will initialize automatically to
             * 0.0, which is what you want since b[1] will rotate around b[0]
             */
            bTemp[1] = new Vector2(cosine * distanceVect.x + sine * distanceVect.y, cosine * distanceVect.y - sine * distanceVect.x)

            // rotate Temporary velocities
            let vTemp: Vector2[] = [new Vector2(cosine * ball.vel.x + sine * ball.vel.y, cosine * ball.vel.y - sine * ball.vel.x),
            new Vector2(cosine * peg.vel.x + sine * peg.vel.y, cosine * peg.vel.y - sine * peg.vel.x)];

            /*
             * Now that velocities are rotated, you can use 1D conservation of momentum
             * equations to calculate the final vel along the x-axis.
             */
            let vFinal: Vector2[] = [
                // final rotated vel for b[0]
                new Vector2(((ball.mass - peg.mass) * vTemp[0].x + 2 * peg.mass * vTemp[1].x) / (ball.mass + peg.mass), vTemp[0].y),
                // final rotated vel for b[0]
                new Vector2(((peg.mass - ball.mass) * vTemp[1].x + 2 * ball.mass * vTemp[0].x) / (ball.mass + peg.mass), vTemp[1].y)
            ];
            // hack to avoid clumping
            bTemp[0].add(new Vector2(vFinal[0].x, 0));
            bTemp[1].add(new Vector2(vFinal[1].x, 0));

            /*
             * Rotate ball poss and velocities back Reverse signs in trig expressions
             * to rotate in the opposite direction
             */
            // rotate balls
            let bFinal: Vector2[] = [new Vector2(cosine * bTemp[0].x - sine * bTemp[0].y, cosine * bTemp[0].y + sine * bTemp[0].x),
            new Vector2(cosine * bTemp[1].x - sine * bTemp[1].y, cosine * bTemp[1].y + sine * bTemp[1].x)];

            // update ball to screen pos
            ball.setPos(ball.pos.add(bFinal[0]));

            // update velocities
            //ball.setVel(new Vector2(cosine * vFinal[0].x - sine * vFinal[0].y, cosine * vFinal[0].y + sine * vFinal[0].x));

            // if peg doesn't move then for KE to be preserved output vel mag must be the same as input, just rotated
            ball.setVel(Vector2.fromPolar(ball.vel.length(), theta));

            // prevent head on collision from resulting in perfect up and down bouncing
            let velNoiseVect: Vector2 = new Vector2(Math.random() * VEL_NOISE_MAX, Math.abs(Math.random() * VEL_NOISE_MAX));
            ball.setVel(ball.vel.add(velNoiseVect).multScalar(BP_RESTITUTION));

            //check if velocities are low enough to set the ball to rest
            if (ball.vel.length() < MIN_VEL) {
                ball.setVel(new Vector2(0, 0));
                ball.atRest = true;
            }
        }
    }

    doBBCollision(b1: BallColliderObject, b2: BallColliderObject) {
        // Get distances between the balls components
        let distanceVect: Vector2 = b1.pos.sub(b2.pos);

        // Calculate magnitude of the vector separating the balls
        let distanceVectMag = distanceVect.length();

        // Minimum distance before they are touching
        let minDistance = b1.radius + b2.radius;

        if (distanceVectMag > minDistance) return;


        //let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
        let d = distanceVect.copy();
        let correctionVector = d.norm().multScalar(minDistance + 0.01);
        b1.pos = b1.pos.add(correctionVector);

        // get angle of distanceVect
        let theta = distanceVect.radians();
        // precalculate trig values
        let sine = Math.sin(theta);
        let cosine = Math.cos(theta);

        /*
         * bTemp will hold rotated ball poss. You just need to worry about bTemp[1]
         * pos
         */
        let bTemp: Vector2[] = [new Vector2(0, 0), new Vector2(0, 0)]


        /*
         * this ball's pos is relative to the b2 so you can use the vector
         * between them (bVect) as the reference point in the rotation expressions.
         * bTemp[0].pos.x and bTemp[0].pos.y will initialize automatically to
         * 0.0, which is what you want since b[1] will rotate around b[0]
         */
        bTemp[1] = new Vector2(cosine * distanceVect.x + sine * distanceVect.y, cosine * distanceVect.y - sine * distanceVect.x)

        // rotate Temporary velocities
        let vTemp: Vector2[] = [new Vector2(cosine * b1.vel.x + sine * b1.vel.y, cosine * b1.vel.y - sine * b1.vel.x),
        new Vector2(cosine * b2.vel.x + sine * b2.vel.y, cosine * b2.vel.y - sine * b2.vel.x)];

        /*
         * Now that velocities are rotated, you can use 1D conservation of momentum
         * equations to calculate the final vel along the x-axis.
         */
        let vFinal: Vector2[] = [
            // final rotated vel for b[0]
            new Vector2(((b1.mass - b2.mass) * vTemp[0].x + 2 * b2.mass * vTemp[1].x) / (b1.mass + b2.mass), vTemp[0].y),
            // final rotated vel for b[0]
            new Vector2(((b2.mass - b1.mass) * vTemp[1].x + 2 * b1.mass * vTemp[0].x) / (b1.mass + b2.mass), vTemp[1].y)
        ];
        // hack to avoid clumping
        bTemp[0].add(new Vector2(vFinal[0].x, 0));
        bTemp[1].add(new Vector2(vFinal[1].x, 0));

        /*
         * Rotate ball poss and velocities back Reverse signs in trig expressions
         * to rotate in the opposite direction
         */
        // rotate balls
        let bFinal: Vector2[] = [new Vector2(cosine * bTemp[0].x - sine * bTemp[0].y, cosine * bTemp[0].y + sine * bTemp[0].x),
        new Vector2(cosine * bTemp[1].x - sine * bTemp[1].y, cosine * bTemp[1].y + sine * bTemp[1].x)];

        // update ball to screen pos
        b1.setPos(b1.pos.add(bFinal[0]));
        b2.setPos(b2.pos.add(bFinal[1]));

        // update velocities
        b1.setVel(new Vector2(cosine * vFinal[0].x - sine * vFinal[0].y, cosine * vFinal[0].y + sine * vFinal[0].x));
        b2.setVel(new Vector2(cosine * vFinal[1].x - sine * vFinal[1].y, cosine * vFinal[1].y + sine * vFinal[1].x));

        //
        b1.setVel(b1.vel.multScalar(BB_RESTITUTION));
        b2.setVel(b2.vel.multScalar(BB_RESTITUTION));

        //check if velocities are low enough to set the balls to rest
        if (b1.vel.length() < MIN_VEL) {
            b1.setVel(new Vector2(0, 0));
            b1.atRest = true;
        }
        if (b2.vel.length() < MIN_VEL) {
            b2.setVel(new Vector2(0, 0));
            b2.atRest = true;
        }

    }
}