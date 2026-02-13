import { Physics, Scene, Vector2 } from "@framekore-engine/core";
import { Player } from "../Entities/Player";
import { Wall } from "../Entities/Wall";
import { Camera2D } from "@framekore-engine/core";
import { Enemy } from "../Entities/Enemy";
import { Menu } from "./Menu";
import { Coin } from "../Entities/Itens/Coin";

export class Level1 extends Scene {
    #camera!: Camera2D
    #player!: Player
    #coinSound!: HTMLAudioElement
    #puffSound!: HTMLAudioElement
    score: number = 0

    async init() {
        // await this.engine.assets.loadImage("assets/kore.png")
        // await this.engine.assets.loadImage("assets/virus.png")
        // await this.engine.assets.loadImage("assets/coin.png")
        await this.engine.assets.loadAudio("assets/coin.ogg").then(audio=>{
            this.#coinSound=audio
        })
        await this.engine.assets.loadAudio("assets/puff.ogg").then(audio=>{
            this.#puffSound=audio
        })
        this.#player = new Player(this.engine, 100, 500)
        this.add(new Enemy(this.engine, 400, 500))
        this.add(new Enemy(this.engine, 700, 500))
        this.add(new Enemy(this.engine, 850, 500))
        this.add(new Coin(this.engine, 200, 650))
        this.add(new Coin(this.engine, 250, 650))
        this.add(new Coin(this.engine, 300, 650))
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
        this.add(this.#player)
        
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
            this.engine.setScene(new Menu(this.engine))
        }

        if (this.engine.input.isKeyDown('KeyR')) {
            this.engine.setScene(new Menu(this.engine))
        }
        for (const entity of this.entities) {
            
            if (!entity.active) continue

            entity.update(dt)
            if (entity instanceof Coin) {
                if (Physics.checkCollision(this.#player, entity)) {
                    (this.#coinSound.cloneNode() as HTMLAudioElement).play()
                    entity.active = false,
                    this.score ++
                }
            } 
            if (entity instanceof Enemy) {
                const distance = Vector2.distanceTo(entity.position, this.#player.position)
                if (distance < 300) {
                    entity.target = this.#player
                } else {
                    entity.target = null
                }

                if (Physics.checkCollision(entity, this.#player)) {
                    const isStomping = this.#player.velocity.y > 0 && this.#player.position.y < entity.position.y;

                    if (isStomping) {
                        entity.active = false
                        this.#player.bounce();
                        (this.#puffSound.cloneNode() as HTMLAudioElement).play()
                        this.score ++
                    } else {
                        const knockbackDir = this.#player.position.x < entity.position.x ? -1 : 1;
                        this.#player.takeDamage(2, knockbackDir);
                    }
                }
            }
        }
    }

    victory(ctx: CanvasRenderingContext2D, message: string = "BOUA!\n pressione (R) para voltar ao menu") {
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        const messages = message.split("\n")
        let count = 1
        let fontSize = 48
        for(const men of messages) {
            ctx.font = `${fontSize}px Arial`
            ctx.fillText(men, ctx.canvas.width/2, ((ctx.canvas.height/2)+(count*(fontSize+30)))-100)
            fontSize = 32
            count++
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.fillStyle = 'white'
        ctx.fillText(`Moedas: ${this.score}`, ctx.canvas.width - 50, 20)
        
        if (this.score>=6) {
            this.victory(ctx)
        }

        if (this.#camera) this.#camera.apply(ctx);

        const sorted = [...this.entities].sort((a, b) => a.layer - b.layer);

        for (const entity of sorted) {
            if (entity.active) entity.draw(ctx);
        }

        
        ctx.restore();
        this.#drawHUD(ctx)
    }
}