import { definePlugin, type Engine } from "../core/engine";

export const inputPlugin = definePlugin(()=>{
    return {
        name: "input",
        setup(engine) {
            const input = new InputManager()
            engine.setResource(InputManager, input)
        },
        destroy(engine) {
            const input = engine.getResource(InputManager)
            input?.destroy()
        },
    }
})

export class InputManager {
    #keys = new Set<string>();
    
    constructor() {
        window.addEventListener("keydown", this.#onKeyDown)
        window.addEventListener("keyup", this.#onKeyUp)
    }

    static get(engine: Engine): InputManager{
        const input = engine.getResource(InputManager)
        if (!input) throw new Error("InputPlugin não foi adicionado a Engine")
        return input
    }

    #onKeyDown = (e: KeyboardEvent) => {
        this.#keys.add(e.code)
    }

    #onKeyUp = (e: KeyboardEvent) => {
        this.#keys.delete(e.code)
    }

    isDown(code: string) {
        return this.#keys.has(code)
    }

    destroy() {
        window.removeEventListener("keydown", this.#onKeyDown)
        window.removeEventListener("keyup", this.#onKeyUp)
        this.#keys.clear()
    }

}