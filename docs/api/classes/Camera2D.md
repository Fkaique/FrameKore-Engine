[@framekore-engine/core](../globals.md) / Camera2D

# Class: Camera2D

Defined in: [Engine/Camera2D.ts:4](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L4)

## Constructors

### Constructor

> **new Camera2D**(`width`, `height`): `Camera2D`

Defined in: [Engine/Camera2D.ts:48](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`Camera2D`

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="border"></a> `border` | [`Vector2`](Vector2.md) \| `null` | `null` | Cria uma borda invisivel na janela que move a camera quando o target tenta ultrapassa-la **Example** `horizontal = 200 vertival = 200 camera.border = new Vector2(horizontal, vertical)` | [Engine/Camera2D.ts:46](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L46) |
| <a id="bounds"></a> `bounds` | \{ `height`: `number`; `width`: `number`; `x`: `number`; `y`: `number`; \} \| `null` | `null` | Limita o mapa em que a camera pode se mover em um retangulo **Example** `camera.bounds = { . x: 0, . y: 0, . width: 1600, . height: 600 }` | [Engine/Camera2D.ts:38](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L38) |
| <a id="height"></a> `height` | `number` | `undefined` | Altura da camera | [Engine/Camera2D.ts:28](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L28) |
| <a id="learpfactor"></a> `learpFactor` | `number` | `5` | Velocidade em que a camera se aproxima do target | [Engine/Camera2D.ts:20](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L20) |
| <a id="position"></a> `position` | [`Vector2`](Vector2.md) | `undefined` | Posição da camera **Example** `camera.position = new Vector2(0,0)` | [Engine/Camera2D.ts:9](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L9) |
| <a id="target"></a> `target` | [`GameObject`](GameObject.md) \| `null` | `null` | Objeto que será seguido pela camera **Example** `const player = new Player(...) camera.target = player` | [Engine/Camera2D.ts:16](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L16) |
| <a id="width"></a> `width` | `number` | `undefined` | Largura da camera | [Engine/Camera2D.ts:24](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L24) |

## Methods

### apply()

> **apply**(`ctx`): `void`

Defined in: [Engine/Camera2D.ts:113](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L113)

apply: desenha a camera na posição certa de acordo com a posição do target

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctx` | `CanvasRenderingContext2D` | - |

#### Returns

`void`

***

### update()

> **update**(`dt`): `void`

Defined in: [Engine/Camera2D.ts:56](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Camera2D.ts#L56)

update: Processa a lógica da cena.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dt` | `number` | Delta Time vindo da FKEngine. |

#### Returns

`void`
