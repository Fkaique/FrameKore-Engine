import type { Component } from "../Utils/component";

export class GameObject {
    #components: Component[] = []

    addComponent<T extends Component>(component: T): T {
        component.attach(this)
        this.#components.push(component)
        return component
    }

    getComponent<T extends Component>(
        type: new (...args: any[]) => T
    ): T | undefined {
        return this.#components.find(c => c instanceof type) as T
    }

    getComponents<T extends Component>(
        type: new (...args: any[]) => T
    ): T[] {
        return this.#components.filter(c => c instanceof type) as T[]
    }

    update(delta: number) {
        for (const component of this.#components) {
            component.update?.(delta)
        }
    }
}