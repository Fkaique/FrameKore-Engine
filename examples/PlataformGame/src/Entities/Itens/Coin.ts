import { Engine, GameObject, Sprite } from "@framekore-engine/core";

export class Coin extends GameObject {
    #sprite: Sprite

    constructor(engine: Engine, x: number, y: number, w: number = 30, h: number = 26) {
        super(x,y,w,h)
        this.#sprite = new Sprite(engine, "/assets/coin.png", 15, 13)
        this.#sprite.addAnimation('coin', 0, 4, 0.3)
        this.#sprite.setAnimation(4, 0.3)
        this.#sprite.play("coin")
    }

    update(dt: number): void {
        this.#sprite.update(dt)
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.#sprite.draw(ctx, this.position.x, this.position.y, this.size.x, this.size.y)
    }

}