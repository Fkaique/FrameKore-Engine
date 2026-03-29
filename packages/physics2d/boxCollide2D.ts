import { Component } from "../core/utils/component";
import { Transform2D } from "../transform2d/transform2D";

export const CollisionLayer = {
    NONE: 0,
    Layer1: 1 << 0,
    Layer2: 1 << 1,
    Layer3: 1 << 2,
    Layer4: 1 << 3,
    Layer5: 1 << 4,
    Layer6: 1 << 5,
    Layer7: 1 << 6,
    Layer8: 1 << 7,
    Layer9: 1 << 8,
} as const

export type CollisionLayer = number

export class BoxCollide2D extends Component {
    // gameObject?: any

    width: number
    height: number
    offsetX = 0
    offsetY = 0

    isTrigger: boolean
    layer: CollisionLayer
    mask: CollisionLayer
    colliding: boolean = false
    constructor(width: number, height: number, options: {
        isTrigger?: boolean
        layer?: CollisionLayer
        mask?: CollisionLayer
    } = {}
    ) {
        super()
        this.width = width
        this.height = height
        this.isTrigger = options.isTrigger ?? false
        this.layer = options.layer ?? 0
        this.mask = options.mask ?? 0
    }
    /**
     * Retorna os limites AABB do collider com base no transform.
     */
    getBounds(transform: Transform2D) {
        return {
            left: transform.position.x + this.offsetX,
            right: transform.position.x + this.offsetX + this.width * transform.scaleX,
            top: transform.position.y + this.offsetY,
            bottom: transform.position.y + this.offsetY + this.height * transform.scaleY,
        }
    }
}