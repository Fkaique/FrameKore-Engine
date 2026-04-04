import type { Vector2 } from "../math/vector2"

export interface ITransform2D {
    position: Vector2
    rotation: number
    scale: Vector2
}

export const TRANSFORM_2D = Symbol("transform2d")