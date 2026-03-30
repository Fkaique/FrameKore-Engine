import type { Engine } from "@framekore/core";
import { GameObject } from "@framekore/core/gameObject";
import { BOX_COLLIDE_2D, BoxCollide2D } from "@framekore/physics2d";
import { RenderManager2D } from "@framekore/render2d";
import { Transform2D, TRANSFORM_2D } from "@framekore/transform2d";

export class Ground extends GameObject {
  constructor(engine: Engine) {
    super();
    this.engine = engine;

    const transform = new Transform2D();
    transform.position.y = 400;
    transform.position.x = 10;

    this.addComponent(TRANSFORM_2D, transform);
    this.addComponent(BOX_COLLIDE_2D, new BoxCollide2D(500, 50));
  }
}