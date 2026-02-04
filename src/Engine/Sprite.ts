import type { FKEngine } from "./FKEngine"

interface Animation {
    row: number;
    frames: number;
    speed: number;
}

export class Sprite {
    #texture: HTMLImageElement | null = null
    #path: string
    #engine: FKEngine
    #animations: Map<string, Animation> = new Map();
    #currentAnim: string | null = null

    addAnimation(name: string, row: number, frames: number, speed: number) {
        this.#animations.set(name, {row, frames, speed})
    }

    play(name: string) {
        if (this.#currentAnim === name) return

        const anim = this.#animations.get(name)
        if (anim) {
            this.#currentAnim = name
            this.frameY = anim.row
            this.frameX = 0
            this.setAnimation(anim.frames, anim.speed)
        }
    }

    frameX: number = 0
    frameY: number = 0
    frameWidth: number
    frameHeight: number

    rotation: number = 0
    flipX: boolean = false
    flipY: boolean = false
    alpha: number = 1.0

    #timer: number = 0
    #speed: number = 0.1
    #maxFrames: number = 1

    constructor(engine: FKEngine, path: string, fw: number, fh: number) {
        this.#path = path
        this.#texture
        this.#engine = engine
        this.#texture = this.#engine.assets.get(path)
        this.frameWidth = fw
        this.frameHeight = fh
    }

    setAnimation(max: number, speed: number) {
        this.#maxFrames = max
        this.#speed = speed
    }

    update(dt: number) {
        this.#timer += dt

        if (this.#timer >= this.#speed) {
            this.#timer = 0
            this.frameX++

            if (this.frameX >= this.#maxFrames) {
                this.frameX = 0
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        if (!this.#texture) {
            this.#texture = this.#engine.assets.get(this.#path)
            return
        }

        ctx.save()

        ctx.globalAlpha = this.alpha

        ctx.translate(x + w / 2, y + h / 2)

        if (this.rotation !== 0) {
            ctx.rotate(this.rotation)
        }

        const scaleX = this.flipX ? -1 : 1;
        const scaleY = this.flipY ? -1 : 1;
        if (this.flipX || this.flipY) {
            ctx.scale(scaleX, scaleY)
        }

        ctx.drawImage(
            this.#texture,
            this.frameX * this.frameWidth,
            this.frameY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            -w / 2, -h / 2,
            w, h
        )
        ctx.restore()
    }

}