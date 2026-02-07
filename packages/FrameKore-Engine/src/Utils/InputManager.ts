import { Vector2 } from "./Vector2"

export class InputManager {
    #keys: Record<string,boolean> = {}

    constructor() {
        window.addEventListener('keydown',(e)=>{
            this.#keys[e.code] = true
        })
        window.addEventListener('keyup',(e)=>{
            this.#keys[e.code] = false
        })
    }
    /**
     * Verifica se uma tecla está sendo pressionada
     * @param key 
     * @returns 
     */
    isKeyDown(key: string): boolean {
        return !!this.#keys[key]
    }
    /**
     * Retorna um Vector2 normalizado com a direção correspondente aos controles pressionados
     * @param constrols {up, down, left, right}
     * @returns new Vector2(x,y).normalize() ->
     * x: -1 | 0 | 1, 
     * y: -1 | 0 | 1
     */
    getAxis(controls = {up : 'ArrowUp', down : 'ArrowDown', left : 'ArrowLeft', right : 'ArrowRight'}): Vector2 {
        let x = 0
        let y = 0

        if (this.isKeyDown(controls.up)) y -= 1;
        if (this.isKeyDown(controls.down)) y += 1;
        if (this.isKeyDown(controls.left)) x -= 1;
        if (this.isKeyDown(controls.right)) x += 1;

        return new Vector2(x,y).normalize();
    }
}