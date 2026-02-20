export abstract class Scene {
    protected objects: { update(delta: number): void }[] = []

    onEnter?(): void
    onExit?(): void
    render?(): void

    add(obj: { update(delta: number): void }) {
        this.objects.push(obj)
    }

    update(delta: number) {
        for (const obj of this.objects) {
            obj.update(delta)
        }
    }

}