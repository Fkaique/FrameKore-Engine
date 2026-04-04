import { Engine, GameObject } from "@framekore/core";
import type { Vector2 } from "@framekore/math";
import { BoxCollide2D, CollisionLayer } from "@framekore/physics2d";
import { Transform2D } from "@framekore/transform2d";

export class Collision extends GameObject {
    transformer: Transform2D
    constructor(params : {
        engine: Engine,
        width: number, 
        height: number,
        position: Vector2
    }) {
        super()
        this.engine = params.engine
        this.transformer = new Transform2D()
        this.transformer.position = params.position
        const box = new BoxCollide2D(params.width, params.height, {
            layer: CollisionLayer.Layer1,
            mask: CollisionLayer.Layer2
        })
        box.setOrigin(0,0)
        this.addComponent(box)
        this.addComponent(this.transformer)
    }
}