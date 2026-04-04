import { Component } from "../core/utils/component"
import { Vector2 } from "../math/vector2"
import { TRANSFORM_2D, type ITransform2D } from "./contract"

export class Transform2D extends Component implements ITransform2D{
    static key = TRANSFORM_2D
    position = new Vector2()
    scale = new Vector2(1,1)
    rotation = 0
}