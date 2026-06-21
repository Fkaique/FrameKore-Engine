import { Component } from "@framekore/core"
import { Vector2 } from "@framekore/math"
import { ITransform2D, TRANSFORM_2D } from "./contract"

export class Transform2D extends Component implements ITransform2D{
    static key = TRANSFORM_2D
    position = new Vector2()
    scale = new Vector2(1,1)
    rotation = 0
}