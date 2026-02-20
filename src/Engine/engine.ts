import { Ticker } from "../Utils/ticker"
import type { Scene } from "./scene"

export interface EnginePlugin {
    name: string
    init(engine: Engine): void
    update?(delta: number): void
    destroy?(): void
}

export class Engine {
    #ticker: Ticker
    #currentScene?: Scene

    #plugins: EnginePlugin[] = []

    constructor() {
        this.#ticker = new Ticker(this.#gameLoop)
    }

    // Engine

    update(delta: number) {
        for (const plugin of this.#plugins) {
            plugin.update?.(delta)
        }
        this.#currentScene?.update(delta)
    }
    
    // Scene
    
    setScene(cena: Scene) {
        this.#currentScene?.onExit?.()
        this.#currentScene = cena
        this.#currentScene.onEnter?.()
    }
    
    render() {
        if (this.#currentScene?.render)
            this.#currentScene?.render()
    }

    // Plugins

    use(plugin: EnginePlugin) {
        plugin.init(this)
        this.#plugins.push(plugin)
    }
    

    destroy() {
        for (const plugin of this.#plugins) {
            plugin.destroy?.()
        }
    }

    start() {
        this.#ticker.start()
    }

    stop() {
        this.#ticker.stop()
    }

    #gameLoop = (delta: number) => {
        this.update(delta)
        this.render()
    }

    
}