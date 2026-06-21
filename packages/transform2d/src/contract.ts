import type { Vector2 } from "@framekore/math"

export interface ITransform2D {
    position: Vector2
    rotation: number
    scale: Vector2
}

export const TRANSFORM_2D = Symbol("transform2d")