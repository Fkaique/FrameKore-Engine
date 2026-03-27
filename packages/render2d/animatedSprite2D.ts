import { Sprite2D } from "./sprite2D";
import type { Frame } from "./texture";

export class AnimatedSprite2D extends Sprite2D {
    #frames: Frame[] = []
    #currentFrame = 0
    #elapsed = 0
    fps = 10
    playing = true

    addFrame(x: number, y: number) {
        const frame = this.texture.getFrame(x, y)
        if (frame) this.#frames.push(frame)
    }

    update(delta: number) {
        if (!this.playing || this.#frames.length === 0) return 
        this.#elapsed += delta
        const frameDuration = 1000 / this.fps

        if (this.#elapsed >= frameDuration) {
            this.#elapsed = 0
            this.#currentFrame = (this.#currentFrame + 1) % this.#frames.length
            this.frame = this.#frames[this.#currentFrame]
        }
    }

    play() {this.playing = true}
    stop() {this.playing = false}
}