import type { Engine } from "./Engine";

export class Audio {
    #engine: Engine
    #masterVolume: number = 0.5

    constructor(engine: Engine) {
        this.#engine = engine
    }

    play(path: string, options: {volume?: number, loop?: boolean} = {}) {
        const asset = this.#engine.assets.get(path)

        if (asset instanceof HTMLAudioElement) {
            const sound = asset.cloneNode() as HTMLAudioElement
            sound.volume = (options.volume ?? 1.0) * this.#masterVolume
            sound.loop = options.loop ?? false
            sound.play().catch((e) => console.warn(e))
            return sound
        }
        return null
    }
}