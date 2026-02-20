export class Ticker {
    #lastTime: number = 0
    #running = false
    #fps: number
    #interval: number
    #callback: (delta: number) => void


    constructor(callback: (delta: number) => void, fps = 60) {
        this.#callback = callback
        this.#fps = fps
        this.#interval = 1000 / fps
    }

    start() {
        this.#running = true
        requestAnimationFrame(this.#loop)
    }

    stop() {
        this.#running = false
    }

    setFPS(fps: number){
        this.#fps = fps
        this.#interval = 1000 / fps
    }

    #loop = (time: number) => {
        if (!this.#running) return

        const deltaTime = time - this.#lastTime
        
        if (deltaTime >= this.#interval) {
            const delta = deltaTime / 1000
            this.#lastTime = time

            this.#callback?.(delta)
        }

        requestAnimationFrame(this.#loop)
    }
}