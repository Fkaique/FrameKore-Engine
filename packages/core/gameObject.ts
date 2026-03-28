import type { Engine } from "./engine"
import type { Component } from "./utils/component"

export class GameObject {
    #components = new Map<symbol, Component>()
    engine?: Engine
    destroyed = false
    /**
     * 
     * @param key chave simbólica 
     * @param component instancia de um Component
     * @returns 
     */
    addComponent<T extends Component>(key: symbol, component: T): T {
        return this.#setComponent(key, component)
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
    /**
     * remove um Component
     * @param key chave simbólica
     * @returns Component deletado ou undefined caso não o encontre
     */
    removeComponent<T extends Component>(key: symbol): T | undefined {
        this.#assertNotDestroyed()
        this.#assertEngine()

        const component = this.#components.get(key) as T | undefined
        if (!component) return undefined

        this.#detachComponent(key, component)
        return component
    }
    /**
     * 
     * @param key chave simbólica
     * @returns um Component ou undefined caso não o encontre
     */
    getComponent<T extends Component>(key: symbol): T | undefined {
        return this.#components.get(key) as T | undefined
    }
    /**
     * 
     * @param key chave simbólica
     * @returns 'true' se um Component existe na instancia de GameObject
     */
    hasComponent(key: symbol): boolean {
        return this.#components.has(key)
    }
    /**
     * 
     * @returns todos os Components de um GameObject
     */
    getAllComponents(): readonly Component[] {
        return [...this.#components.values()]
    }
    /**
     * 
     * destroi todos os Components de um gameObject
     */
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