import { AssetManager } from "@framekore/asset-manager"
import { GameObject, Engine } from "@framekore/core"
import { InputManager } from "@framekore/input-manager"
import { Vector2 } from "@framekore/math"
import { RIGID_BODY_2D, RigidBody2D, BOX_COLLIDE_2D, BoxCollide2D } from "@framekore/physics2d"
import { Texture, SPRITE_2D, Sprite2D } from "@framekore/render2d"
import { Transform2D, TRANSFORM_2D } from "@framekore/transform2d"

export class Player extends GameObject {
    input: InputManager
    constrols: {
        up: boolean,
        left: boolean,
        down: boolean,
        right: boolean
    }
    SPEED = 400
    JUMP_FORCE = 400
    texture: Texture | null = null
    velocity: Vector2 = new Vector2()
    body?: RigidBody2D
    transformer?: Transform2D

    constructor(engine: Engine) {
        super();
        this.engine = engine;
        this.input = InputManager.get(engine)
        this.constrols = {
            up: false,
            left: false,
            down: false,
            right: false
        }

        const assets = AssetManager.get(engine)
        assets.load("player", "image", "/src/assets/kore.png").then((img) => {
            const texture = new Texture(img);
            texture.slice(23, 21);

            const sprite = new Sprite2D(texture);
            sprite.setFrame(0, 0);

            this.addComponent(SPRITE_2D, sprite);
        });
        const transform = new Transform2D()
        transform.scaleX = 2
        transform.scaleY = 2
        this.addComponent(TRANSFORM_2D, transform);
        this.addComponent(RIGID_BODY_2D, new RigidBody2D());
        this.addComponent(BOX_COLLIDE_2D, new BoxCollide2D(23 * transform.scaleX, 21 * transform.scaleY));
    }
    update(_delta: number): void {
        super.update(_delta)
        this.constrols = {
            up: this.input.isDown('KeyW'),
            left: this.input.isDown('KeyA'),
            down: this.input.isDown('KeyS'),
            right: this.input.isDown('KeyD')
        }
    }
    fixedUpdate(delta: number): void {
        super.fixedUpdate(delta)
        this.transformer = this.getComponent<Transform2D>(TRANSFORM_2D)
        this.body = this.getComponent<RigidBody2D>(RIGID_BODY_2D)
        const dir = new Vector2(
            (Number(this.constrols.right) - Number(this.constrols.left))
        )
        this.velocity = Vector2.mul(dir.normalize(), this.SPEED * delta)
        this.transformer?.position.add(this.velocity)
        if (this.body?.touching.bottom && this.constrols.up) {
            this.#jump()
        }
    }
    #jump() {
        if (!this.body) return
        if (!this.body.touching.bottom) return

        this.body.applyForce(new Vector2(0, -this.JUMP_FORCE))
    }

}