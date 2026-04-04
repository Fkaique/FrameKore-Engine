import type { Component } from "./utils/component"
import { Priority, Ticker } from "./utils/ticker"
import type { Scene } from "./scene"

export interface EnginePlugin {
    name: string
    setup(engine: Engine): void
    destroy?(engine: Engine): void

    render?(scene: Scene, delta: number): void
    update?(engine: Engine, delta: number): void
    fixedUpdate?(engine: Engine, delta: number): void

    onComponentAdded?(component: Component): void
    onComponentRemoved?(component: Component): void
}

export interface AssetProvider {
  load<T = unknown>(key: string, type: string, src: string): Promise<T>
  get<T = unknown>(key: string): T | undefined
  has(key: string): boolean
  unload?(key: string): void
  clear?(): void
}

export class Engine {
    #ticker: Ticker
    #currentScene?: Scene
    #plugins = new Map<string, EnginePlugin>()
    #resources = new Map<any, any>()

    constructor() {
        this.#ticker = new Ticker()
        this.#ticker.add(this.#update, Priority.UPDATE)
        this.#ticker.add(this.#fixedUpdate, Priority.FIXED_UPDATE)
        this.#ticker.add(this.#render, Priority.RENDER)
    }

    setResource(key: any, resource: any) {
        this.#resources.set(key, resource)
        return this
    }

    getResource<T>(key: new (...args: any[]) => T): T
    getResource<T>(key: PropertyKey): T
    getResource(key: any) {
        if (!this.#resources.has(key)) return
        return this.#resources.get(key)
    }

    // Engine

    #update = (delta: number) => {
        this.#currentScene?.update(delta)
        for (const plugin of this.#plugins.values()) {
            plugin.update?.(this, delta)
        }
    }

    #fixedUpdate = (delta: number) => {
        this.#currentScene?.fixedUpdate?.(delta)

        for (const plugin of this.#plugins.values()) {
            plugin.fixedUpdate?.(this, delta)
        }
    }

    // Scene

    setScene(cena: Scene) {
        this.#currentScene?.onExit?.()
        this.#currentScene = cena
        this.#currentScene.engine = this
        for (const obj of this.#currentScene.getObjects()) {
            obj.engine = this
        }
        this.#currentScene.onEnter?.()
    }

    #render = (delta: number) => {
        if (!this.#currentScene) return
        for (const plugin of this.#plugins.values()) {
            plugin.render?.(this.#currentScene, delta)
        }
    }

    use(plugin: EnginePlugin) {
        if (this.#plugins.has(plugin.name)) throw new Error(`O plugin ${plugin.name} já foi adicionado.`)
        plugin.setup(this)
        this.#plugins.set(plugin.name, plugin)
        return this
    }

    destroy() {
        for (const plugin of this.#plugins.values()) {
            plugin.destroy?.(this)
        }
    }

    start() {
        this.#ticker.start()
    }

    stop() {
        this.#ticker.stop()
    }

    get ticker() {
        return this.#ticker
    }

    get currentScene() {
        return this.#currentScene
    }

    notifyComponentAdded(component: Component) {
        for (const plugin of this.#plugins.values()) {
            plugin.onComponentAdded?.(component)
        }
    }

    notifyComponentRemoved(component: Component) {
        for (const plugin of this.#plugins.values()) {
            plugin.onComponentRemoved?.(component)
        }
    }

}

/**
 * 
 * @param plugin 
 */
export function definePlugin(plugin: EnginePlugin): () => EnginePlugin
/**
 * 
 */
export function definePlugin<T extends ((...args: any[]) => EnginePlugin)>(plugin: T): T
export function definePlugin(plugin: any): any {
    if (typeof plugin === "object") return () => plugin
    if (typeof plugin === "function") return plugin
    throw new TypeError("O Plugin precisa ser um objeto ou uma função que retorne um objeto")
}