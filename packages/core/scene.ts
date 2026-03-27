import type { GameObject } from "./gameObject"

export abstract class Scene {
    protected objects: GameObject[] = []

    onEnter?(): void
    onExit?(): void

    add(obj: GameObject) {
        this.objects.push(obj)
    }

    update(delta: number) {
        for (const obj of this.objects) {
            obj.update(delta)
        }
    }

    getObjects(){
        return this.objects
    }
}