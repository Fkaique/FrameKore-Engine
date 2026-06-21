import { Scene, Engine, GameObject } from "@framekore/core";
import { BoxCollide2D, BOX_COLLIDE_2D } from "@framekore/physics2d";
import { RenderManager2D, Sprite2D, SPRITE_2D } from "@framekore/render2d";
import { Transform2D, TRANSFORM_2D } from "@framekore/transform2d";
import { Ground } from "../Entities/ground";
import { Player } from "../Entities/player";

export class Cena extends Scene {
  #engine: Engine;
  fps = 0
  history: number[] = []

  constructor(engine: Engine) {
    super();
    this.#engine = engine;
  }
  onEnter(): void {
    const player = new Player(this.#engine);
    const ground = new Ground(this.#engine);
    const fps = new GameObject()

    this.add(player);
    this.add(fps);
    this.add(ground);
  }
  update(delta: number): void {
    super.update(delta);
    const render = RenderManager2D.get(this.#engine);
    this.history.push(delta)
    if (this.history.length > 120) {
      this.history.splice(0, this.history.length - 120)
    }
    const avg = this.history.reduce((soma, deltaTime) => soma + deltaTime, 0) / this.history.length

    this.fps = 1 / avg

    const objs = this.getObjects();

    for (const obj of objs) {
      render.draw((ctx) => {
        const transform = obj.getComponent<Transform2D>(TRANSFORM_2D);
        const box = obj.getComponent<BoxCollide2D>(BOX_COLLIDE_2D);
        const sprite = obj.getComponent<Sprite2D>(SPRITE_2D)
        sprite?.setFrame(0, 0)
        if (!transform || !box) return;

        if (sprite)
          return
        const color = 'black';
        ctx.fillStyle = `#${color}`;
        ctx.fillRect(
          transform.position.x,
          transform.position.y,
          box.width * transform.scale.x,
          box.height * transform.scale.y,
        );
      });
    }
    render.draw((ctx) => {
      ctx.fillStyle = 'black'
      ctx.font = "20px arial"
      ctx.fillText("fps: " + this.fps.toFixed(1), 20, 20)
    })
  }

}