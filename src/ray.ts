import { Vector3 } from "./vector";

export class Ray {

    origin : Vector3;
    direction : Vector3;

    constructor( origin : Vector3, direction : Vector3) {
        this.origin = origin;
        this.direction = direction;
    }

    at(t : number) {
        return this.origin.add(this.direction.multiplyScalar(t));
    }
}