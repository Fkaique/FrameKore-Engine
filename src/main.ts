import { Engine } from "./Engine/engine";
import { GameObject } from "./Engine/gameObject";
import { Scene } from "./Engine/scene";
import { InputManager } from "./Plugins/inputManager";
import { Component } from "./Utils/component";
import { Vector2 } from "./Utils/vector2";

const engine = new Engine()
const input = new InputManager()
engine.use(input)

engine.start()

class Move extends Component {
  input: InputManager
  engine: Engine

  position = new Vector2(0,0)

  constructor(input: InputManager, engine: Engine) {
    super()
    this.engine = engine
    this.input = input

  }
  update(delta: number): void {
    this.input
  }
}

class Cena extends Scene {
  #engine: Engine
  #input: InputManager
  constructor(engine: Engine, input: InputManager) {
    super()
    this.#engine = engine
    this.#input = input
  }

  onEnter(): void {
    const player = new GameObject()
    const move = new Move(this.#input, this.#engine)
    
    player.addComponent(move)
    this.add(player)
  }

  update(delta: number): void {
    super.update(delta)
    for (const obj of this.objects) {
      if (obj instanceof GameObject) {
        const move = obj.getComponent(Move)

      }
    }
  }
}

engine.setScene(new Cena(engine, input))