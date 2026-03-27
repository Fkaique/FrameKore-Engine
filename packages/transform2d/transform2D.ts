import { Component } from "../core/utils/component"
import { Vector2 } from "../math/vector2"

export const TRANSFORM_2D = Symbol("transform2d")

export class Transform2D extends Component{
    position = new Vector2()
    scaleX = 1
    scaleY = 1
    rotation = 0
}