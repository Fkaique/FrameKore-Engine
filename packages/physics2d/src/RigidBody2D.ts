import { Vector2 } from "@framekore/math"
import { Component } from "@framekore/core"

export const RIGID_BODY_2D = Symbol("rigidBody2d");

export class RigidBody2D extends Component{
    static key = RIGID_BODY_2D
    
    velocity = new Vector2()
    mass = 1
    useGravity = true

    touching = {
        top: false,
        bottom: false,
        left: false,
        right: false
    }

    applyForce(force: Vector2) {
        this.velocity.x += force.x / this.mass
        this.velocity.y += force.y / this.mass
    }
}