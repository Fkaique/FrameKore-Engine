import { Engine, GameObject, Physics, Sprite, Vector2 } from "@framekore-engine/core";
import { Wall } from "./Wall";

export class Enemy extends GameObject {
    #sprite: Sprite
    #engine: Engine
    target: GameObject | null = null

    #velocity = new Vector2(0,0)
    #speed = 50
    #gravity = 800
    #wanderTime = 0
    #currentWanderDir = 1
    #isGrounded: boolean = false
    
    constructor(engine: Engine, x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
        this.#engine = engine
        this.#sprite = new Sprite(engine, '/assets/Enemy.png', 16, 16)
        this.#sprite.addAnimation("enemy", 0, 5, 0.15)
        this.#sprite.setAnimation(5,0.15)
        this.#sprite.play("enemy")
    }
    
    update(dt: number): void {
        this.#handlePhysics(dt)
        this.#sprite.update(dt);

        let moveDirection = 0;

        if (this.target) {
            this.#speed = 100
            moveDirection = Math.sign(this.target.position.x - this.position.x)
        } else {
            this.#speed = 50
            this.#wanderTime -= dt

            if(this.#wanderTime <= 0) {
                this.#currentWanderDir = Math.random() < 0.5 ? -1 : 1
                this.#wanderTime = 2.0

            }
            moveDirection = this.#currentWanderDir
        }
        
        if (moveDirection !== 0){
            this.#sprite.flipX = moveDirection === 1
        }
        
        this.#velocity.x = (this.#speed * moveDirection) * dt

        this.position.x += this.#velocity.x
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