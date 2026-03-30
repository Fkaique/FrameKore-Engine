import { AssetManager } from "@framekore/asset-manager";
import { Engine, GameObject } from "@framekore/core";
import { Vector2 } from "@framekore/math";
import { BOX_COLLIDE_2D, BoxCollide2D, CollisionLayer, RIGID_BODY_2D, RigidBody2D } from "@framekore/physics2d";
import { Sprite2D, SPRITE_2D, Texture } from "@framekore/render2d";
import { Transform2D, TRANSFORM_2D } from "@framekore/transform2d/transform2D";
import playerImage from '@/assets/kore.png'
import { InputManager } from "@framekore/input-manager";


export class Player extends GameObject {
    sprite: Sprite2D | null = null
    input: InputManager
    velocity: Vector2 = new Vector2()
    position: Vector2 = new Vector2(100, 100)
    transformer: Transform2D | undefined
    body: RigidBody2D
    SPEED = 400
    controler = {
        left: false,
        right: false,
        up: false,
        down: false
    }

    constructor(engine: Engine) {
        super()
        this.engine = engine
        const assets = AssetManager.get(engine)
        assets.load('player', "image", playerImage).then((img) => {
            const texture = new Texture(img)
            texture.slice(23, 21)

            this.sprite = new Sprite2D(texture)
            this.sprite.setFrame(0, 0)

            this.addComponent(SPRITE_2D, this.sprite)
        })
        this.input = InputManager.get(engine)
        this.transformer = new Transform2D()
        this.transformer.scaleX = 2
        this.transformer.scaleY = 2
        this.transformer.position = this.position
        this.body = new RigidBody2D()
        this.body.useGravity = false
        this.addComponent(TRANSFORM_2D, this.transformer)
        this.addComponent(RIGID_BODY_2D, this.body)
        this.addComponent(BOX_COLLIDE_2D, new BoxCollide2D(23 * this.transformer.scaleX, 21 * this.transformer.scaleY, {
            layer: CollisionLayer.Layer2,
            mask: CollisionLayer.Layer1 | CollisionLayer.Layer2
        }))
    }

    update(_delta: number): void {
        super.update(_delta)
        this.controler = {
            left: this.input.isDown('KeyA'),
            right: this.input.isDown('KeyD'),
            up: this.input.isDown('KeyW'),
            down: this.input.isDown('KeyS')
        }        
    }

    fixedUpdate(_delta: number): void {
        super.fixedUpdate(_delta)
        this.transformer = this.getComponent<Transform2D>(TRANSFORM_2D)
        if (!this.transformer)
            return
        
        const dir = new Vector2(
            (Number(this.controler.right) - Number(this.controler.left)),
            (Number(this.controler.down) - Number(this.controler.up))
        )
        
        this.body.velocity = Vector2.mul(dir.normalize(), this.SPEED)
    }
}