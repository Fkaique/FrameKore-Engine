export class Time {
    #lastTime: number = 0
    deltaTime: number = 0
    elapsed: number = 0
    fps: number = 0

    constructor(){
        this.#lastTime = performance.now()
    }

    update() {
        const now = performance.now()

        let delta = (now - this.#lastTime) / 1000

        if (delta > 0.1) {
            delta = 0.1
        }
        
        this.deltaTime = delta
        this.fps = 1 / this.deltaTime
        this.elapsed += delta
        this.#lastTime = now
    }
}