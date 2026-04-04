import type { Engine } from "@framekore/core";
import { GameObject } from "@framekore/core/gameObject";
import { BoxCollide2D, CollisionLayer } from "@framekore/physics2d";
import { Transform2D } from "@framekore/transform2d";

export class Ground extends GameObject {
  constructor(engine: Engine) {
    super();
    this.engine = engine;

    const transform = new Transform2D();
    transform.position.y = 400;
    transform.position.x = 10;

    this.addComponent(transform);
    this.addComponent(new BoxCollide2D(500, 50, {
      layer: CollisionLayer.Layer1,
      mask: CollisionLayer.Layer2
    }));
  }
}