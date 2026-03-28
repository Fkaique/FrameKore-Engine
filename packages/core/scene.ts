import type { Engine } from "./engine"
import type { GameObject } from "./gameObject"

export abstract class Scene {
    protected objects: GameObject[] = []
    engine!: Engine

    onEnter?(): void
    onExit?(): void

    add(obj: GameObject) {
        if (this.engine) {
            obj.engine = this.engine
        }

        this.objects.push(obj)
    }

    update(delta: number) {
        for (const obj of this.objects) {
            obj.update(delta)
        }
    }

    fixedUpdate(delta: number) {
        for (const obj of this.objects) {
            obj.fixedUpdate?.(delta)
        }
    }

    getObjects() {
        return this.objects
    }
}