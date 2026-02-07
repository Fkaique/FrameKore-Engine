import { Physics, Scene, Vector2 } from "@framekore-engine/core";
import { Player } from "../Entities/Player";
import { Wall } from "../Entities/Wall";
import { Camera2D } from "@framekore-engine/core";
import { Enemy } from "../Entities/Enemy";

export class Level1 extends Scene {
    #camera!: Camera2D
    #player!: Player

    async init() {
        await this.engine.assets.loadImage('/assets/Lillian.png')
        await this.engine.assets.loadImage('/assets/Enemy.png')
        await this.engine.assets.loadAudio('/assets/passo.ogg')
        await this.engine.assets.loadAudio('/assets/pulo.ogg')
        this.#player = new Player(this.engine, 100, 500)
        this.add(this.#player)
        this.add(new Enemy(this.engine, 400, 500, 32, 32))
        this.add(new Enemy(this.engine, 700, 500, 32, 32))
        this.add(new Enemy(this.engine, 850, 500, 32, 32))
        this.#camera = new Camera2D(this.engine.ctx.canvas.width, this.engine.ctx.canvas.height)
        this.#camera.target = this.#player
        this.#camera.bounds = {
            x: 0,
            y: 0,
            width: 1600,
            height: 600
        }
        this.#camera.position.x = this.#player.position.x - this.#camera.width / 2;
        this.#camera.position.y = this.#player.position.y - this.#camera.height / 2;
        this.add(new Wall(this.engine, this.#camera.bounds.width-32, 0, 32, this.engine.ctx.canvas.height-32))
        this.add(new Wall(this.engine, 0, 0, 32, this.engine.ctx.canvas.height-32))
        this.add(new Wall(this.engine, 200, this.engine.ctx.canvas.height-120, 300, 32))
        this.add(new Wall(this.engine, 0, this.engine.ctx.canvas.height-32, this.#camera.bounds.width, 32))
        
    }

    #drawHUD(ctx: CanvasRenderingContext2D) {
        if (!this.#player) return
        ctx.fillStyle = "red"
        ctx.fillRect(10,10,(this.#player.hp/10)*100,20)
    }

    update(dt: number): void {
        if (!this.#camera) return
        this.#camera.update(dt)
        if (this.#player.hp <= 0) {
            this.engine.setScene(new Level1(this.engine))
        }
        for (const entity of this.entities) {
            
            if (!entity.active) continue

            entity.update(dt)

            if (entity instanceof Enemy) {
                const distance = Vector2.distanceTo(entity.position, this.#player.position)
                if (distance < 300) {
                    entity.target = this.#player
                } else {
                    entity.target = null
                }

                if (Physics.checkCollision(entity, this.#player)) {
                    const knockbackDir = this.#player.position.x < entity.position.x ? -1 : 1;
                    this.#player.takeDamage(2, knockbackDir);
                }
            }
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
        this.#drawHUD(ctx)
    }
}