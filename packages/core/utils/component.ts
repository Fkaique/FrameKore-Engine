import type { GameObject } from "../gameObject";

export abstract class Component {
    gameObject!: GameObject
    onAdded?(): void
    onRemoved?(): void
}