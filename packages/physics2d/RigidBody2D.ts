import { Vector2 } from "../math/vector2"
import { Component } from "../core/utils/component"

export class RigidBody2D extends Component{
    velocity = new Vector2()
    mass = 1
    useGravity = true

    applyForce(force: Vector2) {
        this.velocity.x += force.x / this.mass
        this.velocity.y += force.y / this.mass
    }
}