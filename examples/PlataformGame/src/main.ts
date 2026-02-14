import "./style.css"
import { Engine } from "@framekore-engine/core"
import { Menu } from "./Scenes/Menu"

const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = 800
canvas.height = 800

canvas.style.width = `${window.innerWidth<innerHeight? window.innerWidth/1.3 : window.innerHeight/1.3}px`
canvas.style.height =` ${window.innerWidth<innerHeight? window.innerWidth/1.3 : window.innerHeight/1.3}px`

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

ctx.textAlign = "center"
ctx.textBaseline = "middle"
ctx.font = "48px Arial"
ctx.fillStyle = "white"
ctx.fillText("Clique na tela!", canvas.width/2, canvas.height/2)

let trilha: HTMLAudioElement;

function start(){
    const engine = new Engine(canvas)
    
    engine.assets.setBaseURL(import.meta.env.BASE_URL + '/')
    engine.assets.loadAudio("assets/trilha.ogg").then(audio=>{
        audio.loop = true
        trilha = audio
    }).then(()=>{
        trilha.volume=0.5
        trilha.play()
    })
    engine.setScene(new Menu(engine))
}

window.addEventListener('click', start, {
    once: true
})
