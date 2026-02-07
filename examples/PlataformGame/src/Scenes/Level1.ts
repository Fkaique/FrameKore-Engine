import { Physics } from "@framekore-engine/core";
import { Scene } from "@framekore-engine/core";
import { Player } from "../Entities/Player";
import { Vector2 } from "@framekore-engine/core";
import { Wall } from "../Entities/Wall";
import { Camera2D } from "@framekore-engine/core";

export class Level1 extends Scene {
    #playerPos = new Vector2(100,100)
    #camera!: Camera2D

    async init() {
        console.log("Level 1 Carregado!")
        await this.engine.assets.loadImage('/assets/Lillian.png')
        const player = new Player(this.engine, 100,100)
        this.add(player)
        this.add(new Wall(this.engine, 10,300, 1000, 32))
        this.#camera = new Camera2D(this.engine.ctx.canvas.width, this.engine.ctx.canvas.height)
        this.#camera.target = player
        this.#camera.bounds = {
            x: 0,
            y: 0,
            width: 1600,
            height: 600
        }
        this.#camera.position.x = player.position.x - this.#camera.width / 2;
        this.#camera.position.y = player.position.y - this.#camera.height / 2;
    }

    update(dt: number): void {
        if (!this.#camera) return
        this.#camera.update(dt)
        for (const entity of this.entities){
            if (entity.active) entity.update(dt)
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
    
        if (this.#camera) this.#camera.apply(ctx);

        const sorted = [...this.entities].sort((a, b) => a.layer - b.layer);
        
        for (const entity of sorted) {
            if (entity.active) entity.draw(ctx);
        }

    ctx.restore();
}
}