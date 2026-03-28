import { PriorityQueue } from "./priorityQueue"

const disposerOfDisposer = function () {
    throw new Error("Esse dispose já foi destruído.")
}

export const Priority = {
    FIXED_UPDATE: 500,
    UPDATE: 1000,
    RENDER: 10000
} as const

export type Priority = number
export type TickerDisposer = { dispose(): void }

type Listener = {
    priority: number
    f: (delta: number) => void
}

export class Ticker {
    #running = false

    #fps: number
    #interval: number

    #fixedFPS: number
    #fixedInterval: number
    #accumulator = 0

    #lastTime = 0
    #nextTime = 0

    #maxDeltaMs = 100
    #maxAccumulatedMs = 250

    #listeners = new PriorityQueue<Listener>()
    #fixedListeners = new PriorityQueue<Listener>()
    #renderListeners = new PriorityQueue<Listener>()

    constructor(fps = 60, fixedFPS = 60) {
        this.#fps = fps
        this.#interval = 1000 / fps

        this.#fixedFPS = fixedFPS
        this.#fixedInterval = 1000 / fixedFPS
    }

    start() {
        if (this.#running) return

        this.#running = true
        const now = performance.now()
        this.#lastTime = now
        this.#nextTime = now
        this.#accumulator = 0

        requestAnimationFrame(this.#loop)
    }

    stop() {
        this.#running = false
    }

    setFPS(fps: number) {
        this.#fps = fps
        this.#interval = 1000 / fps
        this.#nextTime = performance.now()
    }

    setFixedFPS(fps: number) {
        this.#fixedFPS = fps
        this.#fixedInterval = 1000 / fps
    }

    add(callback: (delta: number) => void, priority: Priority = Priority.UPDATE): TickerDisposer {
        const entry: Listener = {
            f: callback,
            priority
        }

        let queue = this.#listeners

        if (priority === Priority.FIXED_UPDATE) {
            queue = this.#fixedListeners
        } else if (priority === Priority.RENDER) {
            queue = this.#renderListeners
        }

        queue.enqueue(entry)

        const disposer = {
            dispose: () => {
                queue.delete(entry)
                disposer.dispose = disposerOfDisposer
            }
        }

        return disposer
    }

    resetTime() {
        const now = performance.now()
        this.#lastTime = now
        this.#nextTime = now
        this.#accumulator = 0
    }

    #loop = (time: number) => {
        if (!this.#running) return
        requestAnimationFrame(this.#loop)

        let deltaMs = time - this.#lastTime
        this.#lastTime = time

        if (deltaMs > this.#maxDeltaMs) {
            deltaMs = this.#maxDeltaMs
        }

        for (const entry of this.#listeners) {
            entry.f(deltaMs / 1000)
        }

        this.#accumulator += deltaMs
        if (this.#accumulator > this.#maxAccumulatedMs) {
            this.#accumulator = this.#maxAccumulatedMs
        }

        while (this.#accumulator >= this.#fixedInterval) {
            for (const entry of this.#fixedListeners) {
                entry.f(this.#fixedInterval / 1000)
            }

            this.#accumulator -= this.#fixedInterval
        }

        if (time >= this.#nextTime) {
            while (this.#nextTime <= time) {
                this.#nextTime += this.#interval
            }

            for (const entry of this.#renderListeners) {
                entry.f(deltaMs / 1000)
            }
        }
    }
}