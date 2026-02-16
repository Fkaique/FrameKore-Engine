import { Engine, GameObject, Physics, Sprite, Vector2 } from "@framekore-engine/core";
import { Collision } from "./Collision";

type Direction = "front" | "back"

export class Player extends GameObject {
    #sprite: Sprite
    #engine: Engine
    #controls: {
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean
    }

    #velocity = new Vector2(0,0)
    #speed = 100
    #direction: Direction = "front"

    colide: boolean

    constructor(engine: Engine, x: number, y: number, {
        w = 46,
        h = 42,
        colide = true
    } = {} ) {
        super(x, y, w, h)
        this.#engine = engine
        this.#sprite = new Sprite(engine, 'assets/kore.png', 23, 21)
        this.#sprite.addAnimation('frontIdle', 0, 2, 0.3)
        this.#sprite.addAnimation('backIdle', 1, 2, 0.3)
        this.#sprite.addAnimation('frontWalk', 2, 2, 0.3)
        this.#sprite.addAnimation('backWalk', 3, 2, 0.3)
        this.#sprite.setAnimation(2, 0.3)

        engine.ctx.imageSmoothingEnabled = false
        this.colide = colide

        this.#controls = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }

    update(dt: number): void {
        this.#controls = {
            up: this.#engine.input.isKeyDown('KeyW') || this.#engine.input.isKeyDown('ArrowUp'),
            down: this.#engine.input.isKeyDown('KeyS') || this.#engine.input.isKeyDown('ArrowDown'),
            left: this.#engine.input.isKeyDown('KeyA') || this.#engine.input.isKeyDown('ArrowLeft'),
            right: this.#engine.input.isKeyDown('KeyD') || this.#engine.input.isKeyDown('ArrowRight')
        }

        const inputX = (Number(this.#controls.right) - Number(this.#controls.left))
        const inputY = (Number(this.#controls.down) - Number(this.#controls.up))

        if (inputX !== 0 || inputY !== 0) {
            const moveDir = new Vector2(inputX, inputY).normalize()
            this.#velocity.x = moveDir.x * this.#speed
            this.#velocity.y = moveDir.y * this.#speed

            if (inputY < 0) this.#direction = "back";
            else if (inputY > 0) this.#direction = "front"

            if (inputX !== 0) this.#sprite.flipX = inputX < 0

            this.#sprite.play(`${this.#direction}Walk`)

        } else {
            this.#velocity.x *= 0.8
            this.#velocity.y *= 0.8

            if (Math.abs(this.#velocity.x) < 0.1) this.#velocity.x = 0;
            if (Math.abs(this.#velocity.y) < 0.1) this.#velocity.y = 0;

            this.#sprite.play(`${this.#direction}Idle`)
        }
        this.#handlePhysics(dt)
        this.#sprite.update(dt)
    }

    #handlePhysics(dt: number) {
        const move = Vector2.mul(this.#velocity, dt)
        this.position.add(move)
        if (!this.colide) return
        const currentScene = this.#engine.getScene()
        if (!currentScene) return
        const walls = currentScene?.getEntities().filter(e => e instanceof Collision)
        for (const wall of walls) {
            Physics.resolveCollision(this, wall)
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.#sprite.draw(ctx, this.position.x, this.position.y, this.size.x, this.size.y)
    }

}