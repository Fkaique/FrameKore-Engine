export class Vector2 {
    x: number
    y: number
    constructor(x:number = 0, y:number = 0) {
        this.x = x
        this.y = y
    }
    
    static add(v1: Vector2, v2: Vector2){
        return new Vector2(v1.x+v2.x,v1.y+v2.y)
    }

    static sub(v1: Vector2, v2: Vector2){
        return new Vector2(v1.x-v2.x,v1.y-v2.y)
    }

    static mul(vector: Vector2, scalar: number){
        return new Vector2(vector.x*scalar,vector.y*scalar)
    }

    static div(vector: Vector2, scalar: number){
        return new Vector2(vector.x/scalar,vector.y/scalar)
    }
    /**
     * Calcula o Produto Escalar entre um vetor e outro.
     * Matematicamente: (x1 * x2) + (y1 * y2)
    */
    static dot(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.x + v1.y * v2.y;
    }
    /** 
     * Caulcula a Distancia entre um vetor e o outro
    */
    static distanceTo(v1: Vector2, v2: Vector2): number {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     * Interpolação Linear entre um vetor e um destino.
     * @param target O vetor de origem.
     * @param target O vetor de destino.
     * @param alpha Valor entre 0 e 1 (0 = início, 1 = fim, 0.5 = meio).
     */
    static lerp(v1: Vector2, v2: Vector2, alpha: number): Vector2 {
        return new Vector2(
            v1.x + (v2.x - v1.x) * alpha,
            v1.y + (v2.y - v1.y) * alpha
        );
    }

    add(v: Vector2){
        this.x += v.x
        this.y += v.y
    }

    sub(v: Vector2){
        this.x -= v.x
        this.y -= v.y
    }
    
    mul(scalar: number){
        this.x *= scalar
        this.y *= scalar
    }
    
    div(scalar: number){
        this.x /= scalar
        this.y /= scalar
    }

    /**
     * Calcula o Produto Escalar entre este vetor e outro.
     * Matematicamente: (x1 * x2) + (y1 * y2)
    */
    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }
    /** 
     * Caulcula a Distancia entre este vetor e o outro
    */
    distanceTo(v: Vector2): number {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Retorna o quadrado da magnitude.
     * Use para comparações de distância: é muito mais performático que magnitude().
    */
    magnitudeSq(){
        return this.x*this.x + this.y*this.y
    }
    /**
     * Retorna a magnitude (comprimento) do vetor.
     * Implementa o Teorema de Pitágoras: a² + b² = c²
    */
    magnitude(): number {
        return Math.sqrt(this.magnitudeSq());
    }

    normalize(): Vector2 {
        const mag = this.magnitude();
        return mag > 0 ? Vector2.mul(this, 1 / mag) : new Vector2(0, 0);
    }

    clone(): Vector2{
        return new Vector2(this.x,this.y)
    }
    /**
     * Interpolação Linear entre este vetor e um destino.
     * @param target O vetor de destino.
     * @param alpha Valor entre 0 e 1 (0 = início, 1 = fim, 0.5 = meio).
    */
    lerp(target: Vector2, alpha: number): this{
        this.x += (target.x - this.x) * alpha
        this.y += (target.y - this.y) * alpha
        return this
    }

}