import { GameObject } from "@framekore-engine/core";

export class Collision extends GameObject {

    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
    }

    update(dt: number): void {

    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#3c2b1b"
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
    }

}