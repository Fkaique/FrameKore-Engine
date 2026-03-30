import { Engine, GameObject } from "@framekore/core";
import type { Vector2 } from "@framekore/math";
import { BOX_COLLIDE_2D, BoxCollide2D, CollisionLayer } from "@framekore/physics2d";
import { Transform2D, TRANSFORM_2D } from "@framekore/transform2d";

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
        this.addComponent(BOX_COLLIDE_2D, new BoxCollide2D(params.width, params.height, {
            layer: CollisionLayer.Layer1,
            mask: CollisionLayer.Layer2
        }))
        this.addComponent(TRANSFORM_2D, this.transformer)
    }
}