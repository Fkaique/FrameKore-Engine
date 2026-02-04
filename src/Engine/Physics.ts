import type { GameObject } from "./GameObject";

export class Physics {
    /**
     * Verifica se dois GameObjects estão colidindo
    */
    static checkCollision(a: GameObject, b: GameObject): boolean {
        return (
            a.right > b.left &&
            a.left < b.right &&
            a.bottom > b.top &&
            a.top < b.bottom
        );
    }

    static resolveCollision(player: GameObject, wall: GameObject) {
        const dx = (player.position.x + player.size.x / 2) - (wall.position.x + wall.size.x / 2)
        const dy = (player.position.y + player.size.y / 2) - (wall.position.y + wall.size.y / 2)

        const combinedHalfWidths = (player.size.x / 2) + (wall.size.x / 2)
        const combinedHalfHeights = (player.size.y / 2) + (wall.size.y / 2)

        if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
            const overlapX = combinedHalfWidths - Math.abs(dx)
            const overlapY = combinedHalfHeights - Math.abs(dy)

            if (overlapX < overlapY) {
                if (dx > 0) player.position.x += overlapX
                else player.position.x -= overlapX
            } else {
                if (dy > 0) player.position.y += overlapY
                else player.position.y -= overlapY
            }
        }
    }
}