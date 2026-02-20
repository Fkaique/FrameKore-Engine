import type { GameObject } from "../Engine/gameObject";

export abstract class Component {
    #gameObject!: GameObject

    attach(gameObject: GameObject) {
        this.#gameObject = gameObject
        this.start?.()
    }

    start?(): void 
    update?(delta: number): void
    destroy?(): void
}