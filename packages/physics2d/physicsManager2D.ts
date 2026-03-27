import { definePlugin, Engine } from "../core/engine";
import type { GameObject } from "../core/gameObject";
import { Priority } from "../core/utils/ticker";
import { Vector2 } from "../math/vector2";
import { TRANSFORM_2D } from "../transform2d/transform2D";
import type { Transform2D } from "../transform2d/transform2D";
import { BoxCollide2D } from "./boxCollide2D";
import { RigidBody2D } from "./RigidBody2D";

const rigidBodies = new WeakMap<Engine, Set<RigidBody2D>>();
const boxColliders = new WeakMap<Engine, Set<BoxCollide2D>>();

export const physics2d = definePlugin(() => {
  return {
    name: "physics",
    setup(engine) {
      rigidBodies.set(engine, new Set());
      boxColliders.set(engine, new Set());
      const physics = new Physics2D(engine);
      engine.setResource(Physics2D, physics);

      engine.ticker.add((delta) => {
        if (!engine.currentScene) return;
        physics.step(delta);
      }, Priority.UPDATE);
    },
    onComponentAdded(component) {
      const engine = component.gameObject.engine;
      if (component instanceof RigidBody2D) {
        rigidBodies.get(engine)?.add(component);
      }
      if (component instanceof BoxCollide2D) {
        boxColliders.get(engine)?.add(component);
      }
    },
    onComponentRemoved(component) {
      const engine = component.gameObject.engine;
      if (component instanceof RigidBody2D) {
        rigidBodies.get(engine)?.delete(component);
      }
      if (component instanceof BoxCollide2D) {
        boxColliders.get(engine)?.delete(component);
      }
    },
  };
});

export const BOX_COLLIDE_2D = Symbol("boxCollide2d");
export const RIGID_BODY_2D = Symbol("rigidBody2d");

export class Physics2D {
  gravity: Vector2 = new Vector2(0, 50);

  #engine: Engine;

  constructor(engine: Engine) {
    this.#engine = engine;
  }

  /**
   * Verifica se dois GameObjects estão colidindo
   * @example
   *```ts
   *if (Physics.checkCollision(Player, Enemy))
   *
   *```
   */
  checkCollision(a: GameObject, b: GameObject): boolean {
    const transformA = a.getComponent<Transform2D>(TRANSFORM_2D);
    const boxA = a.getComponent<BoxCollide2D>(BOX_COLLIDE_2D);
    const transformB = b.getComponent<Transform2D>(TRANSFORM_2D);
    const boxB = b.getComponent<BoxCollide2D>(BOX_COLLIDE_2D);

    if (!boxA || !boxB || !transformA || !transformB)
      throw new Error(
        "Os objetos precisam ter os components 'Transform2D' e 'BoxCollide2D'",
      );

    const boundA = boxA.getBounds(transformA);
    const boundB = boxB.getBounds(transformB);

    return (
      boundA.right > boundB.left &&
      boundA.left < boundB.right &&
      boundA.bottom > boundB.top &&
      boundA.top < boundB.bottom
    );
  }
  /**
   * Resolve a colisão física entre dois GameObjects
   * @param object1 GameObject
   * @param object2 GameObject
   */
  resolveCollision(object1: GameObject, object2: GameObject) {
    const transformA = object1.getComponent<Transform2D>(TRANSFORM_2D);
    const boxA = object1.getComponent<BoxCollide2D>(BOX_COLLIDE_2D);
    const transformB = object2.getComponent<Transform2D>(TRANSFORM_2D);
    const boxB = object2.getComponent<BoxCollide2D>(BOX_COLLIDE_2D);

    if (!boxA || !boxB || !transformA || !transformB)
      throw new Error(
        "Os objetos precisam ter os components 'Transform2D' e 'BoxCollide2D'",
      );

    const dx =
      transformA.position.x +
      boxA.width / 2 -
      (transformB.position.x + boxB.width / 2);
    const dy =
      transformA.position.y +
      boxA.height / 2 -
      (transformB.position.y + boxB.height / 2);

    const combinedHalfWidths = boxA.width / 2 + boxB.width / 2;
    const combinedHalfHeights = boxA.height / 2 + boxB.height / 2;

    if (
      Math.abs(dx) < combinedHalfWidths &&
      Math.abs(dy) < combinedHalfHeights
    ) {
      const overlapX = combinedHalfWidths - Math.abs(dx);
      const overlapY = combinedHalfHeights - Math.abs(dy);

      const rbA = object1.getComponent<RigidBody2D>(RIGID_BODY_2D);
      const rbB = object2.getComponent<RigidBody2D>(RIGID_BODY_2D);
      if (rbA && rbB) {
        if (overlapX < overlapY) {
          if (dx > 0) {
            transformA.position.x += overlapX / 2;
            transformB.position.x += overlapX / 2;
            rbA.velocity.x = 0
            rbB.velocity.x = 0
          } else {
            transformA.position.y += overlapY / 2;
            transformB.position.y += overlapY / 2;
            rbA.velocity.y = 0
            rbB.velocity.y = 0
          }
        }
      } else if (rbA) {
        if (overlapX < overlapY) {
          if (dx > 0) transformA.position.x += overlapX;
          else transformA.position.x -= overlapX;
          rbA.velocity.x = 0
        } else {
          if (dy > 0) transformA.position.y += overlapY;
          else transformA.position.y -= overlapY;
          rbA.velocity.y = 0
        }

      } else if (rbB) {
        if (overlapX < overlapY) {
          if (dx > 0) transformB.position.x += overlapX;
          else transformB.position.x -= overlapX;
          rbB.velocity.x = 0
        } else {
          if (dy > 0) transformB.position.y += overlapY;
          else transformB.position.y -= overlapY;
          rbB.velocity.y = 0
        }
      }
    }
  }

  step(delta: number) {
    const rbSet = rigidBodies.get(this.#engine);
    const colSet = boxColliders.get(this.#engine);
    if (!rbSet || !colSet) return;

    for (const rb of rbSet) {
      const transform = rb.gameObject.getComponent<Transform2D>(TRANSFORM_2D);
      if (!transform) continue;

      if (rb.useGravity) rb.velocity.y += this.gravity.y;

      transform.position.x += rb.velocity.x * delta;
      transform.position.y += rb.velocity.y * delta;
    }

    for (const rb of rbSet) {
      const objA = rb.gameObject;

      for (const collider of colSet) {
        const objB = collider.gameObject
        if (objA === objB) continue

        if (this.checkCollision(objA, objB)) {
          this.resolveCollision(objA, objB);
        }
      }
    }
  }
}
