[@framekore-engine/core](../globals.md) / GameObject

# Abstract Class: GameObject

Defined in: [Engine/GameObject.ts:4](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L4)

## Constructors

### Constructor

> **new GameObject**(`x?`, `y?`, `w`, `h`): `GameObject`

Defined in: [Engine/GameObject.ts:25](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L25)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |
| `w` | `number` | `undefined` |
| `h` | `number` | `undefined` |

#### Returns

`GameObject`

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="active"></a> `active` | `boolean` | `true` | Define se o objeto existe ou não **Example** `object.active = false` | [Engine/GameObject.ts:23](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L23) |
| <a id="layer"></a> `layer` | [`RenderLayer`](../enumerations/RenderLayer.md) | `RenderLayer.Default` | camada de renderização em que este objeto será desenhado | [Engine/GameObject.ts:8](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L8) |
| <a id="position"></a> `position` | [`Vector2`](Vector2.md) | `undefined` | Posição do objeto no jogo **Example** `object.position = new Vector2(0,0)` | [Engine/GameObject.ts:13](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L13) |
| <a id="size"></a> `size` | [`Vector2`](Vector2.md) | `undefined` | tamanho do objeto no jogo **Example** `object.size = new Vector2(32,32)` | [Engine/GameObject.ts:18](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L18) |

## Accessors

### bottom

#### Get Signature

> **get** **bottom**(): `number`

Defined in: [Engine/GameObject.ts:45](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L45)

Retorna a posição a baixo do objeto

##### Returns

`number`

***

### left

#### Get Signature

> **get** **left**(): `number`

Defined in: [Engine/GameObject.ts:33](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L33)

Retorna a posição a esquerda do objeto

##### Returns

`number`

***

### right

#### Get Signature

> **get** **right**(): `number`

Defined in: [Engine/GameObject.ts:37](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L37)

Retorna a posição a direita do objeto

##### Returns

`number`

***

### top

#### Get Signature

> **get** **top**(): `number`

Defined in: [Engine/GameObject.ts:41](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L41)

Retorna a posição a cima do objeto

##### Returns

`number`

## Methods

### draw()

> `abstract` **draw**(`ctx`): `void`

Defined in: [Engine/GameObject.ts:55](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L55)

Renderização do objeto

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctx` | `CanvasRenderingContext2D` | - |

#### Returns

`void`

***

### update()

> `abstract` **update**(`dt`): `void`

Defined in: [Engine/GameObject.ts:50](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/GameObject.ts#L50)

update: Processa a lógica da cena.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dt` | `number` | Delta Time vindo da FKEngine. |

#### Returns

`void`
