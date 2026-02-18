import type { GameObject } from "./GameObject";

export class Physics {
    /**
     * Verifica se dois GameObjects estão colidindo
     * @example
     *```ts
     *if (Physics.checkCollision(Player, Enemy))
     *
     *```
    */
    static checkCollision(a: GameObject, b: GameObject): boolean {
        return (
            a.right > b.left &&
            a.left < b.right &&
            a.bottom > b.top &&
            a.top < b.bottom
        );
    }
    /**
     * Resolve a colisão física entre dois GameObjects
     * @param object1 GameObject
     * @param object2 GameObject 
     */
    static resolveCollision(object1: GameObject, object2: GameObject) {
        const dx = (object1.position.x + object1.size.x / 2) - (object2.position.x + object2.size.x / 2)
        const dy = (object1.position.y + object1.size.y / 2) - (object2.position.y + object2.size.y / 2)

        const combinedHalfWidths = (object1.size.x / 2) + (object2.size.x / 2)
        const combinedHalfHeights = (object1.size.y / 2) + (object2.size.y / 2)

        if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
            const overlapX = combinedHalfWidths - Math.abs(dx)
            const overlapY = combinedHalfHeights - Math.abs(dy)

            if (overlapX < overlapY) {
                if (dx > 0) object1.position.x += overlapX
                else object1.position.x -= overlapX
            } else {
                if (dy > 0) object1.position.y += overlapY
                else object1.position.y -= overlapY
            }
        }
    }
}