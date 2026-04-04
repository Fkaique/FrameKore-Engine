import { Vector2 } from "../math/vector2";
import { Component } from "../core/utils/component";
import { Transform2D } from "../transform2d/transform2D";

export const BOX_COLLIDE_2D = Symbol("boxCollide2d");

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
    static key = BOX_COLLIDE_2D

    width: number
    height: number
    offset = new Vector2()
    #origin = new Vector2(0.5, 0.5)

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

    setOrigin(x: number, y: number) {
        this.#origin.x = x
        this.#origin.y = y
    }
    /**
     * Retorna os limites AABB do collider com base no transform.
     */
    getBounds(transform: Transform2D) {
        const scaledWidth = this.width * transform.scale.x
        const scaledHeight = this.height * transform.scale.y

        const offsetX = scaledWidth * this.#origin.x
        const offsetY = scaledHeight * this.#origin.y

        const x = transform.position.x + this.offset.x
        const y = transform.position.y + this.offset.y

        return {
        left: x - offsetX,
        right: x + (scaledWidth - offsetX),
        top: y - offsetY,
        bottom: y + (scaledHeight - offsetY),
    }
    }
}