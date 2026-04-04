import { AssetManager } from "@framekore/asset-manager";
import { Engine, GameObject } from "@framekore/core";
import playerImage from "../assets/kore.png"
import { RenderManager2D, Sprite2D, SPRITE_2D, Texture } from "@framekore/render2d";
import { Transform2D } from "@framekore/transform2d/transform2D";
import { InputManager } from "@framekore/input-manager";
import { BOX_COLLIDE_2D, BoxCollide2D, RIGID_BODY_2D, RigidBody2D } from "@framekore/physics2d";

export class Player extends GameObject {
    sprite: Sprite2D | null = null
    input: InputManager
    render: RenderManager2D
    transformer: Transform2D | null = null
    constructor(engine: Engine) {
        super()
        this.engine = engine
        this.render = RenderManager2D.get(engine)
        this.input = InputManager.get(engine)
        const assets = AssetManager.get(engine)
        assets.load('player', 'image', playerImage).then((img) => {
            const texture = new Texture(img)
            texture.slice(23,21)

            this.sprite = new Sprite2D(texture)
            this.sprite.setFrame(0, 0)
            this.addComponent(this.sprite)
        })
        this.transformer = new Transform2D()
        this.transformer.position.x = 10
        this.transformer.position.y = 10
        this.transformer.scaleX = 2
        this.transformer.scaleY = 2
        this.addComponent(this.transformer)
        this.addComponent(new BoxCollide2D(23, 21))
        this.addComponent(new RigidBody2D())
    }
    update(_delta: number): void {
        super.update(_delta)
        if ( this.transformer && this.transformer.position.y > this.render.canvas.height) {
            this.transformer.position.y = 0
        }
        
    }
    fixedUpdate(_delta: number): void {
        super.fixedUpdate(_delta)
        if (this.input.isDown("KeyD")) {
            if (!this.transformer) return
                this.transformer.position.x += 4
        }
        if (this.input.isDown("KeyA")) {
            if (!this.transformer) return
                this.transformer.position.x -= 4
        }
        if (this.input.isDown("KeyS")) {
            if (!this.transformer) return
                this.transformer.position.y += 4
        }
        if (this.input.isDown("KeyW")) {
            if (!this.transformer) return
                this.transformer.position.y -= 4
        }
    }
} 