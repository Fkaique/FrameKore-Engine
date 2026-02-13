import type { Engine } from "@framekore-engine/core";
import { GameObject } from "@framekore-engine/core";

export class Wall extends GameObject {
    constructor(engine: Engine, x: number, y: number, w: number, h: number) {
        super(x,y,w,h)
    }

    update(dt: number): void {
        
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#302416'; // Cinza para parecer parede
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}