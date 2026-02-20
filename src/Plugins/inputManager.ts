import type { Engine, EnginePlugin } from "../Engine/engine";

export class InputManager implements EnginePlugin {
    name: string = "input";
    #keys = new Set<string>();
    
    init(engine: Engine): void {
        window.addEventListener("keydown", e => {
            this.#keys.add(e.code)
        })
        window.addEventListener("keyup", e => {
            this.#keys.delete(e.code)
        })
    }

    isDown(code: string) {
        return this.#keys.has(code)
    }

}