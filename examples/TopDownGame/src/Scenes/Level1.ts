import { Scene } from "@framekore-engine/core";
import { Player } from "../Entities/Player";
import { Collision } from "../Entities/Collision";

export class Level1 extends Scene {
    init(): void {
        this.add(new Player(this.engine, 100, 100))
        this.add(new Collision(200, 100, 32, 32))
    }

    update(dt: number): void { 
        for (const entity of this.entities) {
            entity.update(dt)
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        const sorted = [...this.entities].sort((a, b) => a.layer - b.layer);
        for (const entity of sorted) {
            if(entity.active) entity.draw(ctx)
        }
        ctx.restore()
    }

}