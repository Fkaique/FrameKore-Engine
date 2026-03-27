import type { Component } from "./utils/component"
import type { Engine } from "./engine"

export class GameObject {
    #components = new Map<symbol, Component>()
    engine!: Engine

    addComponent<T extends Component>(key: symbol, component: T): T {
        component.gameObject = this
        this.#components.set(key, component)
        
        component.onAdded?.()
        this.engine.notifyComponentAdded(component)

        return component
    }

    removeComponent(key: symbol) {
        const comp = this.#components.get(key)
        if (!comp) return
        comp.onRemoved?.()
        this.engine.notifyComponentRemoved(comp)
        this.#components.delete(key)
    }

    getComponent<T>(key: symbol): T | undefined {
        return this.#components.get(key) as T | undefined
    }

    draw?(): void
    update(delta: number) {

    }

}
