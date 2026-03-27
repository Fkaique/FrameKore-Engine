import { PriorityQueue } from "./priorityQueue"

const disposerOfDisposer = function () {
    throw new Error("Esse dispose já foi destruído.")
}

export const Priority = {
    UPDATE: 1000,
    RENDER: 10000
} as const

export type Priority = number

export type TickerDisposer = {dispose(): void}

export class Ticker {
    #currentTime: number = 0
    #lastUpdateTime: number = 0
    #nextTime = 0
    #running = false
    #fps: number
    #interval: number
    #listeners = new PriorityQueue<{priority: number, f: (delta: number)=>void}>()

    constructor(fps = 60) {
        this.#fps = fps
        this.#interval = 1000 / fps
    }

    start() {
        this.#running = true
        this.#currentTime = performance.now()
        requestAnimationFrame(this.#loop)
    }

    add(callback: (delta: number) => void, priority: Priority = Priority.UPDATE): TickerDisposer {
        const entry = {
            f: callback,
            priority: priority
        }
        this.#listeners.enqueue(entry)
        const disposer =  {
            dispose: () => {
                this.#listeners.delete(entry)
                disposer.dispose = disposerOfDisposer
            }
        }
        return disposer
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
        requestAnimationFrame(this.#loop)
        
        this.#currentTime = time

        if (time < this.#nextTime) {
            return
        }
        
        const deltaTime = time - this.#lastUpdateTime
        
        while (this.#nextTime < time) {
            this.#nextTime+=this.#interval
        }

        const delta = deltaTime / 1000
        this.#lastUpdateTime = time
        
        for (const entry of this.#listeners) {
            entry.f(delta)
        }

    }
}