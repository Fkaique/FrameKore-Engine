export class AssetManager {
    #storage: Map<string, any> = new Map()

    /**
     * Carrega uma imagem e a armazena no cache.
     * Retorna uma Promise que resolve quando a imagem está pronta.
    */
    async loadImage(url: string | URL): Promise<HTMLImageElement> {
        const key = url instanceof URL ? url.toString() : url
        if (this.#storage.has(key)) {
            return this.#storage.get(key)!
        }

        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = key
            img.onload = () => {
                this.#storage.set(key,img)
                resolve(img)
            }
            img.onerror = () => reject(`Erro ao carremar imagem: ${url}`)
        })
    }
    async loadAudio(url: string | URL): Promise<HTMLAudioElement> {
        const key = url instanceof URL ? url.toString() : url
        
        if (this.#storage.has(key)) return this.#storage.get(key)
        if (this.#storage.has(key)) {
            return this.#storage.get(key)!
        }

        return new Promise((resolve, reject) => {
            const audio = new Audio()
            audio.src = key
            audio.oncanplaythrough = () => {
                this.#storage.set(key,audio)
                resolve(audio)
            }
            audio.onerror = () => reject(`Erro ao carregar audio: ${key}`)
        })
    }

    /**
     * Retorna uma imagem já carregada. 
     * Se não existir, avisa no console (útil para debug).
    */
    get(path: string): HTMLImageElement {
        const img = this.#storage.get(path)
        if (!img) {
            console.error(`Asset não encontrado: ${path}. Garanta que ele foi carregado no init().`);
        }
        return img!
    }
}