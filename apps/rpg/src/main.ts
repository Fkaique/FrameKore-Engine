import { Engine } from '@framekore/core'
import './style.css'
import { inputPlugin } from '@framekore/input-manager'
import { render2d } from '@framekore/render2d'

const app = document.getElementById('app')
const canvas = document.createElement('canvas') as HTMLCanvasElement
app?.append(canvas)

const engine = new Engine()
  .use(inputPlugin())
  .use(render2d(canvas))

engine.start()