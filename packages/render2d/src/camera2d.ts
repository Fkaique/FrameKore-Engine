import { Vector2 } from '../../math'
import { GameObject } from '../../core'
import { Component } from '../../core'

export const CAMERA_2D = Symbol("camera2d")

export class Camera2D extends Component {
    static key = CAMERA_2D

    #zoom: number = 1
    targetZoom = 1
    zoomSpeed = 0
    minZoom = 0.25
    maxZoom = 4
    rotation: number = 0
    isMain: boolean = true
    target?: GameObject
    followSpeed = 6
    followX = true
    followY = true

    offset = new Vector2(0, 0)
    deadZoneWidth = 0
    deadZoneHeight = 0

    worldBounds?: {
        x: number
        y: number
        width: number
        height: number
    }
    set zoom(value: number) {
        if (value < this.minZoom || value > this.maxZoom)
            return
        this.#zoom = value
    }

    get zoom() {
        return this.#zoom
    }
}