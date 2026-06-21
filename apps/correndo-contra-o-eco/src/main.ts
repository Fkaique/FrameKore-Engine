import { Engine } from '@framekore/core'
import { inputPlugin } from '@framekore/input-manager'
import { physics2d } from '@framekore/physics2d'
import { render2d } from '@framekore/render2d'

import './style.css'

const app = document.getElementById('app')
const canvas = document.createElement('canvas') as HTMLCanvasElement
app?.append(canvas)

const engine = new Engine()
  .use(inputPlugin())
  .use(render2d(canvas))
  .use(physics2d())

engine.start()