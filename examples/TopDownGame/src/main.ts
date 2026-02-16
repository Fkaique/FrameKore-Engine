import "./style.css"
import {Engine} from "@framekore-engine/core"
import { Level1 } from "./Scenes/Level1"

const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = 800
canvas.height = 800

const engine = new Engine(canvas)

engine.setScene(new Level1(engine))

