---
outline: deep
---

# GameObjects

Os GameObjects são elementos padronizados com um campo de atualização e de renderização `update(dt), draw(ctx)` e algumas propriedades `position, size...`


# Propriedades de GameObjects

- `position` é uma instancia de Vector2, ele vai definir a posição física do objeto.
o Vector2 tem alguns metodos que serão mostrados mais a frente em: [(Vector2)](doc-vector2).
- `size` também é uma instancia de Vector2, ele vai definir o tamanho do objeto.
- `active` é um booleano que por padrão é `true` e apaga o objeto quando `false`.
- `top, left, bottom e right` representam posições em relação ao objeto. (topo, esquerda, baixo e direita respectivamente).
- `layer` define a camada onde o objeto será renderizado. Por padrão é 10

# Metodos de GameObjects

Existem dois metodos que são obrigatórios no GameObject, eles são responsaveis por atualizar e renderizar o objeto

- `update(dt)` O update é o metodo responsavel pela atualização do objeto, onde o fara se mover por exemplo.

O parametro `dt` DeltaTime é responsavel por controlar a velocidade de atualização do jogo, por padrão ele vai sempre tentar deixar em 60fps
- `draw(ctx)` O metodo draw será responsavel por renderizar o objeto e quaisquer outros elementos visuais (texto, formas, sprites...)

O parametro `ctx` espera um `CanvasRenderingContext2D` para conseguir renderizar dentro do canvas


