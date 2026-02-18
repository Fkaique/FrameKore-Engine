---
outline: deep
---
<img src="/banner.png" width="500px" style="margin: 0px auto 50px ;"/>


# O que é a FrameKore Engine?

A FrameKore Engine é um motor de jogos 2D feito em TypeScript usando POO para tornar a criação dos jogos intuitiva e fácil

<!-- O que faz a FrameKore Especial? -->

# Porque Escolher a FrameKore?

A FrameKore busca "agilizar" a criação do seu jogo com uma biblioteca simples, mas não limita as possibilidades ao que tem ali, você pode criar seus proprios plugins e suas proprias classes, tornando o limite a sua criatividade

# Aqui um exemplo da estrutura inicial

```js
import {Engine} from "@framekore-engine/core"

const canvas = getElementById('canvas')

const engine = new Engine(canvas)

class Level extends Scene {

    init() { 
    }

    update(dt) {
    }

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.fillText("Olá FrameKore", canvas.width/2, canvas.height/2)
    }
}

engine.setScene(new Level(engine))

```
