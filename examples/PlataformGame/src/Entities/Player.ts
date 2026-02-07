import type { Engine } from "@framekore-engine/core";
import { GameObject } from "@framekore-engine/core";
import { Physics } from "@framekore-engine/core";
import { Sprite } from "@framekore-engine/core";
import { Vector2 } from "@framekore-engine/core";
import { Wall } from "./Wall";
import { Level1 } from "../Scenes/Level1";


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

    #walkingSound: HTMLAudioElement | null = null
    #JumpingSound: HTMLAudioElement | null = null

    #controls = {
        up: "KeyW",
        down: "KeyS",
        left: "KeyA",
        right: "KeyD"
    }

    hp = 10
    #isInvencible = false
    #invencibilityTimer = 0

    get isFalling(): boolean {
    return this.#velocity.y > 0 && !this.#isGrounded;
    }

    get isRising(): boolean {
        return this.#velocity.y < 0 && !this.#isGrounded;
    }

    takeDamage(damage: number, direction: number) {
        if (this.#isInvencible) return
        this.hp-=damage
        this.#isInvencible = true
        this.#invencibilityTimer = 1.0

        this.#velocity.y = this.#jumpForce * 0.8
        this.#velocity.x = direction*400

        this.#currentState = PlayerState.JUMPING;
    }


    constructor(engine: Engine, x: number, y: number, w: number = 28, h: number = 48) {
        super(x, y, w, h)
        this.#engine = engine
        this.#sprite = new Sprite(engine, "/assets/Lillian.png", 14, 24)

        this.#sprite.addAnimation("idle", 0, 3, 0.3)
        this.#sprite.addAnimation("walk", 1, 2, 0.2)
        this.#sprite.addAnimation("rising", 2, 1, 0)
        this.#sprite.addAnimation("falling", 3, 1, 0)
        this.#sprite.setAnimation(3, 0.1)
    }

    update(dt: number): void {
        this.#handlePhysics(dt)

        

        if (!this.#isGrounded && this.#walkingSound && !this.#walkingSound.paused) {
            this.#walkingSound.pause();
        }

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
            if (this.#walkingSound) this.#walkingSound.pause();
        }
        if (this.#isInvencible) {
            this.#invencibilityTimer -= dt
            if (this.#invencibilityTimer <= 0) {
                this.#isInvencible = false
            }
        }
    }

    #handlePhysics(dt: number) {
        this.#applyPhysics(dt)

        this.#velocity.x *= 0.9

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

        if (this.#walkingSound && !this.#walkingSound.paused) {
            this.#walkingSound.pause()
        }

        if (this.#engine.input.getAxis(this.#controls).x !== 0) {
            this.#currentState = PlayerState.WALKING
        }
    }

    #handleWalkingState(dt: number) {
        const moveDir = this.#engine.input.getAxis(this.#controls);
        const isMoving = moveDir.magnitude() > 0
        if (moveDir.x !== 0)
        if (this.#isGrounded && isMoving){
            if (!this.#walkingSound) {
                this.#walkingSound = this.#engine.audio.play('/assets/passo.ogg', { loop: true, volume: 0.3 })
            } else if (this.#walkingSound.paused) {
                this.#walkingSound.play()
            }
        } else {
            if (this.#walkingSound && !this.#walkingSound.paused) {
                this.#walkingSound.pause()
            }
        }

        const velocity = Vector2.mul(moveDir, this.#speed * dt)
        this.position.x += velocity.x
        if (moveDir.x !== 0){
            this.#sprite.play("walk")
            this.#sprite.update(dt)
        }

        if (moveDir.x !== 0) this.#sprite.flipX = moveDir.x < 0

        if (!isMoving) {
            this.#currentState = PlayerState.IDLE
        }
    }

    #handleJumpingState(dt: number) {
        const moveDir = this.#engine.input.getAxis(this.#controls);

        if (this.isRising) {
            this.#sprite.play("rising")
        } else if (this.isFalling) {
            this.#sprite.play("falling")
        }

        if (!this.#JumpingSound) {
            this.#JumpingSound = this.#engine.audio.play('/assets/pulo.ogg', {volume: 0.3})
        }

        this.position.x += moveDir.x * this.#speed * dt
        
        if (moveDir.x < 0) this.#sprite.flipX = true
        else if (moveDir.x > 0) this.#sprite.flipX = false

        if (this.#isGrounded) {
            this.#JumpingSound = null
            this.#currentState = moveDir.x !== 0 ? PlayerState.WALKING : PlayerState.IDLE
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        this.#sprite.draw(ctx, this.position.x, this.position.y, this.size.x, this.size.y)
    }
}