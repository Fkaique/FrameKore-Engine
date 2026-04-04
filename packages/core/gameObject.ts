import type { Engine } from "./engine"
import type { Component } from "./utils/component"
import type { ComponentKey, ComponentClass } from "./utils/componentKey"

export class GameObject {
    #components = new Map<symbol, Component>()
    engine?: Engine
    destroyed = false

    #resolveKey<T extends Component>(key: ComponentKey<T>): symbol {
        if (typeof key === "symbol") return key
        if (key.key) return key.key

        throw new Error("Classe de componente sem chave estática.")
    }

    addComponent<T extends Component>(component: T): T {
        const ctor = component.constructor as ComponentClass<T>

        if (!ctor.key) {
            throw new Error(`Componente ${ctor.name} sem chave estática.`)
        }

        return this.#setComponent(ctor.key, component)
    }

    #setComponent<T extends Component>(key: symbol, component: T): T {
        this.#assertNotDestroyed()
        this.#assertEngine()
        this.#assertComponentOwnership(component)

        const current = this.#components.get(key)

        if (current === component) {
            return component
        }

        if (current) {
            this.#detachComponent(key, current)
        }

        component.gameObject = this
        this.#components.set(key, component)

        component.onAdded?.()
        this.engine!.notifyComponentAdded(component)

        return component
    }

    removeComponent<T extends Component>(key: ComponentKey<T>): T | undefined {
        this.#assertNotDestroyed()
        this.#assertEngine()

        const resolvedKey = this.#resolveKey(key)
        const component = this.#components.get(resolvedKey) as T | undefined

        if (!component) return undefined

        this.#detachComponent(resolvedKey, component)
        return component
    }

    getComponent<T extends Component>(key: ComponentKey<T>): T | undefined {
        return this.#components.get(this.#resolveKey(key)) as T | undefined
    }

    hasComponent<T extends Component>(key: ComponentKey<T>): boolean {
        return this.#components.has(this.#resolveKey(key))
    }

    getAllComponents(): readonly Component[] {
        return [...this.#components.values()]
    }

    destroy(): void {
        if (this.destroyed) return
        this.#assertEngine()

        const entries = [...this.#components.entries()]

        for (const [key, component] of entries) {
            this.#detachComponent(key, component)
        }

        this.destroyed = true
    }

    #detachComponent(key: symbol, component: Component): void {
        component.onRemoved?.()
        this.engine!.notifyComponentRemoved(component)
        this.#components.delete(key)
        component.gameObject = undefined
    }

    #assertComponentOwnership(component: Component): void {
        if (component.gameObject && component.gameObject !== this) {
            throw new Error("Esse componente já pertence a outro GameObject")
        }
    }

    #assertEngine(): void {
        if (!this.engine) {
            throw new Error("GameObject não está vinculado a uma Engine")
        }
    }

    #assertNotDestroyed(): void {
        if (this.destroyed) {
            throw new Error("GameObject já foi destruído")
        }
    }

    draw?(): void
    update(_delta: number): void {}
    fixedUpdate(_delta: number): void {}
}