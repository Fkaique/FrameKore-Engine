import { definePlugin, Engine } from "../core/engine";

export const assetManager = definePlugin(() => {
    return {
        name: "assetManager",
        setup(engine) {
            const manager = new AssetManager()
            engine.setResource(AssetManager, manager)
        },

    }
})

type AssetType = 'image' | 'audio' | 'json'

type AssetMap = {
    image: HTMLImageElement,
    audio: HTMLAudioElement,
    json: any
}

export class AssetManager {
    #cache = new Map<string, unknown>()

    async load<K extends AssetType>(
        key: string,
        type: K,
        src: string | URL
    ): Promise<AssetMap[K]> {

        if (this.#cache.has(key)) {
            return this.#cache.get(key) as AssetMap[K]
        }

        const url = typeof src === "string" ? src : src.toString()
        let asset: AssetMap[K]
        const promise = (async () => {
            switch (type) {
                case "image":
                    asset = await this.#loadImage(url) as AssetMap[K]
                    break
    
                case "audio":
                    asset = await this.#loadAudio(url) as AssetMap[K]
                    break
    
                case "json":
                    asset = await this.#loadJSON(url) as AssetMap[K]
                    break
                default:
                    throw new Error(`Tipo de asset não suportado: ${type}`)
            }
        })()

        this.#cache.set(key, promise)
        return promise as Promise<AssetMap[K]>
    }
    
    static get(engine: Engine): AssetManager{
        const manager = engine.getResource(AssetManager)
        if (!manager) 
            throw new Error("AssetManager não foi adicionado à Engine")
        return manager
    }

    get<T>(key: string): T {
        const asset = this.#cache.get(key)
        if (!asset) {
            throw new Error(`Asset "${key}" não encontrado`)
        }
        return asset as T
    }

    remove(key: string) {
        this.#cache.delete(key)
    }

    clear() {
        this.#cache.clear()
    }


    #loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(img)
            img.onerror = reject
        })
    }

    #loadAudio(src: string): Promise<HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            const audio = new Audio(src)
            audio.onloadeddata = () => resolve(audio)
            audio.onerror = reject
        })
    }

    async #loadJSON(src: string): Promise<any> {
        const res = await fetch(src)
        if (!res.ok) {
            throw new Error(`Erro ao carregar JSON: ${src}`)
        }
        return res.json()
    }

}