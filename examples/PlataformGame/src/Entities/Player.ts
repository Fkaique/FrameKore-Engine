import type { Engine } from "@framekore-engine/core";
import { GameObject } from "@framekore-engine/core";
import { Physics } from "@framekore-engine/core";
import { Sprite } from "@framekore-engine/core";
import { Vector2 } from "@framekore-engine/core";
import { Wall } from "./Wall";

enum PlayerState {
    IDLE,
    WALKING,
    JUMPING
}

export class Player extends GameObject {
    #speed: number = 150
    #engine: Engine
    #sprite: Sprite
    #currentState: PlayerState = PlayerState.IDLE

    #velocity: Vector2 = new Vector2(0, 0);
    #gravity: number = 800;
    #jumpForce: number = -400;
    #isGrounded: boolean = false

    constructor(engine: Engine, x: number, y: number, w: number = 28, h: number = 48) {
        super(x, y, w, h)
        this.#engine = engine
        this.#sprite = new Sprite(engine, "/assets/Lillian.png", 14, 24)

        this.#sprite.addAnimation("idle", 0, 3, 0.1)
        this.#sprite.addAnimation("walk", 1, 2, 0.15)
        this.#sprite.setAnimation(3, 0.1)
    }

    update(dt: number): void {
        this.#handlePhysics(dt)

        switch (this.#currentState) {
            case PlayerState.IDLE:
                this.#handleIdleState(dt)
                break;
            case PlayerState.WALKING:
                this.#handleWalkingState(dt)
                break;
            case PlayerState.JUMPING:
                this.#handleJumpingState(dt)
                break;
        }

        if (this.#engine.input.isKeyDown("Space") && this.#isGrounded) {
            this.#velocity.y = this.#jumpForce
            this.#currentState = PlayerState.JUMPING
            this.#isGrounded = false
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

    #handleIdleState(dt: number) {
        this.#sprite.play("idle")
        this.#sprite.update(dt)

        if (this.#engine.input.getAxis().magnitude() > 0) {
            this.#currentState = PlayerState.WALKING
        }
    }

    #handleWalkingState(dt: number) {
        const moveDir = this.#engine.input.getAxis();
        const isMoving = moveDir.magnitude() > 0

        const velocity = Vector2.mul(moveDir, this.#speed * dt)
        this.position.add(velocity)

        this.#sprite.play("walk")
        this.#sprite.update(dt)

        if (moveDir.x !== 0) this.#sprite.flipX = moveDir.x < 0

        if (!isMoving) {
            this.#currentState = PlayerState.IDLE
        }
    }

    #handleJumpingState(dt: number) {
        const moveDir = this.#engine.input.getAxis();

        this.position.x += moveDir.x * this.#speed * dt

        // this.#sprite.play('walk')
        // this.#sprite.update(dt)

        if (moveDir.x < 0) this.#sprite.flipX = true
        else if (moveDir.x > 0) this.#sprite.flipX = false

        if (this.#isGrounded) {
            this.#currentState = moveDir.x !== 0 ? PlayerState.WALKING : PlayerState.IDLE
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        this.#sprite.draw(ctx, this.position.x, this.position.y, this.size.x, this.size.y)
    }
}