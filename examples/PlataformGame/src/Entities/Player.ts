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
    #gravity: number = 1000;
    #jumpForce: number = -500;
    #isGrounded: boolean = false

    #walkingSound: HTMLAudioElement | null = null
    #JumpingSound: HTMLAudioElement | null = null

    hp = 10
    #isInvencible = false
    #invencibilityTimer = 0

    #controls: {
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean
    }

    get isFalling(): boolean {
    return this.#velocity.y > 0 && !this.#isGrounded;
    }

    get isRising(): boolean {
        return this.#velocity.y < 0 && !this.#isGrounded;
    }
    get velocity() {
        return this.#velocity
    }

    bounce(force: number = this.#jumpForce) {
        this.#velocity.y = force * 0.6; 
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


    constructor(engine: Engine, x: number, y: number, w: number = 46, h: number = 42) {
        super(x, y, w, h)
        this.#engine = engine
        this.#sprite = new Sprite(engine, "/assets/kore.png", 23, 21)
        engine.ctx.imageSmoothingEnabled = false
        engine.assets.loadAudio("assets/passo.ogg").then(audio=>{
            this.#walkingSound=audio
            audio.volume = 0.3
        })
        engine.assets.loadAudio("assets/pulo.ogg").then(audio=>{
            this.#JumpingSound=audio
            audio.volume = 0.3
        })

        this.#sprite.addAnimation("idle", 0, 2, 0.3)
        this.#sprite.addAnimation("walk", 1, 2, 0.2)
        this.#sprite.addAnimation("rising", 2, 1, 0)
        this.#sprite.addAnimation("falling", 3, 1, 0)
        this.#sprite.setAnimation(3, 0.1)
        this.#controls = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }

    update(dt: number): void {
        this.#handlePhysics(dt)

        this.#controls = {
            up: this.#engine.input.isKeyDown('W') || this.#engine.input.isKeyDown('ArrowUp'),
            down: this.#engine.input.isKeyDown('S') || this.#engine.input.isKeyDown('ArroDown'),
            left: this.#engine.input.isKeyDown('A') || this.#engine.input.isKeyDown('ArrowLeft'),
            right: this.#engine.input.isKeyDown('D') || this.#engine.input.isKeyDown('ArrowRight'),
        }

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

        if (this.#controls.up && this.#isGrounded) {
            this.#velocity.y = this.#jumpForce
            this.#currentState = PlayerState.JUMPING
            this.#isGrounded = false
            if (this.#walkingSound) this.#walkingSound.pause();
            this.#JumpingSound?.play()
            
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
        this.position.x += this.#velocity.x * dt;

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
        const moveDir = (Number(this.#controls.right) - Number(this.#controls.left))
        if (moveDir !== 0) {
            this.#currentState = PlayerState.WALKING
        }
    }

    #handleWalkingState(dt: number) {
        const moveDir = (Number(this.#controls.right) - Number(this.#controls.left))
        const isMoving = Math.abs(moveDir) > 0
        if (moveDir !== 0)
        if (this.#isGrounded && isMoving){
            this.#walkingSound?.play()
        } else {
            if (this.#walkingSound && !this.#walkingSound.paused) {
                this.#walkingSound.pause()
            }
        }

        const velocity = moveDir * this.#speed * dt
        this.position.x += velocity
        if (moveDir !== 0){
            this.#sprite.play("walk")
            this.#sprite.update(dt)
        }

        if (moveDir !== 0) this.#sprite.flipX = moveDir < 0

        if (!isMoving) {
            this.#currentState = PlayerState.IDLE
        }
    }

    #handleJumpingState(dt: number) {
        const moveDir = (Number(this.#controls.right) - Number(this.#controls.left))

        if (this.isRising) {
            this.#sprite.play("rising")
        } else if (this.isFalling) {
            this.#sprite.play("falling")
        }
        

        this.position.x += moveDir * this.#speed * dt
        
        if (moveDir < 0) this.#sprite.flipX = true
        else if (moveDir > 0) this.#sprite.flipX = false

        if (this.#isGrounded && this.#JumpingSound) {
            this.#JumpingSound.currentTime = 0
            this.#JumpingSound.pause()
            this.#currentState = moveDir !== 0 ? PlayerState.WALKING : PlayerState.IDLE
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        this.#sprite.draw(ctx, this.position.x, this.position.y, this.size.x, this.size.y)
    }
}