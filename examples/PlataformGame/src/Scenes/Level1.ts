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
        await this.engine.assets.loadAudio("assets/coin.ogg").then(audio => {
            this.#coinSound = audio
        })
        await this.engine.assets.loadAudio("assets/puff.ogg").then(audio => {
            this.#puffSound = audio
        })

        const CELL_SIZE = 32
        /*
        1
        2
        3
        4
        5
        6
        7
        8
        */

        this.#player = new Player(this.engine, CELL_SIZE * 3, CELL_SIZE * 16)
        this.add(new Enemy(this.engine, CELL_SIZE * 13, CELL_SIZE * 16))
        this.add(new Enemy(this.engine, CELL_SIZE * 24, CELL_SIZE * 16))
        this.add(new Enemy(this.engine, CELL_SIZE * 26, CELL_SIZE * 16))
        this.add(new Enemy(this.engine, CELL_SIZE * 25, CELL_SIZE * 16, 60, 56, {
            hp: 5,
            speed: 30,
            isBoss: true,
            drop: "coin"
        }))
        this.add(new Coin(this.engine, CELL_SIZE * 7, CELL_SIZE * 19))
        this.add(new Coin(this.engine, CELL_SIZE * 9, CELL_SIZE * 19))
        this.add(new Coin(this.engine, CELL_SIZE * 11, CELL_SIZE * 19))
        this.add(new Wall(this.engine, CELL_SIZE * 49, 0, CELL_SIZE * 5, CELL_SIZE * 49))
        this.add(new Wall(this.engine, -(CELL_SIZE * 9), 0, CELL_SIZE * 10, CELL_SIZE * 30))
        this.add(new Wall(this.engine, CELL_SIZE * 5, CELL_SIZE * 21, 300, CELL_SIZE))
        this.add(new Wall(this.engine, 0, CELL_SIZE * 24, CELL_SIZE * 49, CELL_SIZE * 5))
        this.add(new Wall(this.engine, CELL_SIZE * 20, CELL_SIZE * 20, CELL_SIZE, CELL_SIZE * 4))
        this.add(new Wall(this.engine, CELL_SIZE * 19, CELL_SIZE * 21, CELL_SIZE, CELL_SIZE * 3))
        this.add(new Wall(this.engine, CELL_SIZE * 18, CELL_SIZE * 22, CELL_SIZE, CELL_SIZE * 2))
        this.add(new Wall(this.engine, CELL_SIZE * 17, CELL_SIZE * 23, CELL_SIZE, CELL_SIZE * 1))
        this.add(new Wall(this.engine, CELL_SIZE * 40, CELL_SIZE * 20, CELL_SIZE, CELL_SIZE * 4))
        this.add(new Wall(this.engine, CELL_SIZE * 41, CELL_SIZE * 21, CELL_SIZE, CELL_SIZE * 3))
        this.add(new Wall(this.engine, CELL_SIZE * 42, CELL_SIZE * 22, CELL_SIZE, CELL_SIZE * 2))
        this.add(new Wall(this.engine, CELL_SIZE * 43, CELL_SIZE * 23, CELL_SIZE, CELL_SIZE * 1))
        this.add(this.#player)
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
                    this.score++
                }
            }
            if (entity instanceof Enemy) {
                if (entity.isDead) {
                    if (entity.drop === "coin") {
                        this.add(new Coin(this.engine, entity.position.x, entity.position.y))
                    }
                    entity.active = false
                }
                const distance = Vector2.distanceTo(entity.position, this.#player.position)
                if (distance < 300) {
                    entity.target = this.#player
                } else {
                    entity.target = null
                }

                if (Physics.checkCollision(entity, this.#player)) {
                    const isStomping = this.#player.velocity.y > 0 && this.#player.position.y < entity.position.y;

                    if (isStomping && !entity.isInvencible) {
                        this.#player.bounce();
                        (this.#puffSound.cloneNode() as HTMLAudioElement).play()
                        if(entity.isBoss){
                            entity.takeDamage(1, 2.0)
                        } else {
                            entity.takeDamage(1)
                        }
                    } else if (!entity.isInvencible) {
                        const knockbackDir = this.#player.position.x < entity.position.x ? -1 : 1;
                        if(entity.isBoss){
                            this.#player.takeDamage(3, knockbackDir);
                        }else{
                            this.#player.takeDamage(1, knockbackDir);
                        }
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
        for (const men of messages) {
            ctx.font = `${fontSize}px Arial`
            ctx.fillText(men, ctx.canvas.width / 2, ((ctx.canvas.height / 2) + (count * (fontSize + 30))) - 100)
            fontSize = 32
            count++
        }
    }

    #drawHUD(ctx: CanvasRenderingContext2D) {
        if (!this.#player) return

        ctx.fillStyle = "black"
        const sizeBar = new Vector2(100, 20)

        ctx.lineWidth = 2
        ctx.strokeRect(10, 10, sizeBar.x, sizeBar.y)
        ctx.fillStyle = "red"
        ctx.fillRect(10, 10, (this.#player.hp / this.#player.maxHp) * sizeBar.x, sizeBar.y)

        ctx.fillStyle = 'white'
        ctx.fillText(`Moedas: ${this.score}`, ctx.canvas.width - 50, 20)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = "#306082"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        if (this.score >= 4) {
            this.victory(ctx)
        }
        if (this.#camera) this.#camera.apply(ctx);

        const sorted = [...this.entities].sort((a, b) => a.layer - b.layer);

        for (const entity of sorted) {
            if (entity.active) entity.draw(ctx);
            if (entity instanceof Enemy && entity.hp < entity.maxHp) {
                const barWidth = 40;
                const barHeight = 6;
                const hpPercent = (entity.hp / entity.maxHp);
                
                const x = entity.position.x + (entity.size.x / 2) - (barWidth / 2);
                const y = entity.position.y - 15;
                ctx.fillStyle = "red"                
                ctx.fillRect(x, y,barWidth * hpPercent, barHeight)
            }
        }

        ctx.restore();
        // DRAW GUI


        this.#drawHUD(ctx)
    }
}