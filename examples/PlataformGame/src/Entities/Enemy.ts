import { Engine, GameObject, Physics, Sprite, Vector2 } from "@framekore-engine/core";
import { Wall } from "./Wall";

enum State {
    IDLE,
    WALK,
    FALLING,
    CHASING
}

export class Enemy extends GameObject {
    #sprite: Sprite
    #engine: Engine
    target: GameObject | null = null

    #velocity = new Vector2(0, 0)
    #speed = 50
    #gravity = 800
    #wanderTime = 0
    #currentWanderDir = 1
    #isGrounded: boolean = false

    #state = State.IDLE

    constructor(engine: Engine, x: number, y: number, w: number = 30, h: number = 28) {
        super(x, y, w, h)
        this.#engine = engine
        this.#sprite = new Sprite(engine, 'assets/virus.png', 15, 14)
        this.#sprite.addAnimation("idle", 0, 2, 0.3)
        this.#sprite.addAnimation("walk", 1, 2, 0.2)
        this.#sprite.addAnimation("chasing", 1, 2, 0.3)
        this.#sprite.addAnimation("falling", 1, 1, 0)
        this.#sprite.setAnimation(1, 0.3)
        this.#sprite.play("idle")
    }

    update(dt: number): void {
        this.#handlePhysics(dt)

        if (!this.#isGrounded) {
            this.#state = State.FALLING
        } else if (this.target) {
            this.#state = State.CHASING
        } else if (this.#state === State.FALLING || this.#state === State.CHASING) [
            this.#state = State.WALK
        ]

        let moveDirection = 0

        switch (this.#state) {
            case State.IDLE: this.#handleIdle(); break;
            case State.WALK: moveDirection = this.#handleWalk(dt); break;
            case State.CHASING: moveDirection = this.#handleChasing(); break;
            case State.FALLING: this.#handleFalling(); break;
        }

        this.#velocity.x = (this.#speed * moveDirection) * dt

        this.position.x += this.#velocity.x

        this.#sprite.update(dt);
    }

    #handleIdle() {
        this.#sprite.play("idle")
        if (this.#velocity.x !== 0) {
            this.#state = State.WALK
        }
    }
    #handleWalk(dt: number) {
        this.#sprite.play("walk")
        this.#speed = 50
        this.#wanderTime -= dt
        if (this.#wanderTime <= 0) {
            const luck = Math.random()
            if (luck < 0.3) {
                this.#currentWanderDir = -1
            } else if (luck > 0.6) {
                this.#currentWanderDir = 1
            } else {
                this.#state = State.IDLE
            }
            this.#wanderTime = 2.0
        }

        if (this.#currentWanderDir !== 0) {
            this.#sprite.flipX = this.#currentWanderDir === -1;
        }

        return this.#currentWanderDir
    }

    #handleChasing() {
        if (!this.target) {
            this.#state = State.IDLE
            return 0
        }
        this.#speed = 100
        this.#sprite.play("chasing");
        
        const diff = this.position.x - this.target!.position.x

        if (Math.abs(diff) > 10) {
            const dir = Math.sign(diff)
            this.#sprite.flipX = dir === 1
            return Math.sign(this.target!.position.x - this.position.x)
        }
        return 0
    }

    #handleFalling() {
        this.#sprite.play("falling")
        if (this.#isGrounded) {
            this.#state = State.IDLE
        }
    }

    #handlePhysics(dt: number) {
        this.#applyPhysics(dt)

        const currentScene = this.#engine.currentScene
        if (!currentScene) return

        const walls = currentScene.getEntities().filter(e => e instanceof Wall)

        let touchingGround = false

        for (const wall of walls) {
            const preY = this.position.y
            Physics.resolveCollision(this, wall)

            if (this.position.y < preY && this.#velocity.y > 0) {
                this.#velocity.y = 0
                touchingGround = true
            }

            if (this.position.y > preY && this.#velocity.y < 0) {
                this.#velocity.y = 0
            }
        }
        this.#isGrounded = touchingGround
    }

    #applyPhysics(dt: number) {
        this.#velocity.y += this.#gravity * dt
        this.position.y += this.#velocity.y * dt
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.#sprite.draw(ctx, this.position.x, this.position.y, this.size.x, this.size.y)
    }

}