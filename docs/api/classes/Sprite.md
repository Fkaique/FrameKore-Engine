[@framekore-engine/core](../globals.md) / Sprite

# Class: Sprite

Defined in: [Engine/Sprite.ts:9](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L9)

## Constructors

### Constructor

> **new Sprite**(`engine`, `path`, `fw`, `fh`): `Sprite`

Defined in: [Engine/Sprite.ts:42](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `engine` | [`Engine`](Engine.md) |
| `path` | `string` |
| `fw` | `number` |
| `fh` | `number` |

#### Returns

`Sprite`

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="alpha"></a> `alpha` | `number` | `1.0` | Transparencia da sprite | [Engine/Sprite.ts:36](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L36) |
| <a id="flipx"></a> `flipX` | `boolean` | `false` | Espelha a sprite na Horizontal | [Engine/Sprite.ts:28](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L28) |
| <a id="flipy"></a> `flipY` | `boolean` | `false` | Espelha a sprite na Vertical | [Engine/Sprite.ts:32](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L32) |
| <a id="frameheight"></a> `frameHeight` | `number` | `undefined` | - | [Engine/Sprite.ts:19](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L19) |
| <a id="framewidth"></a> `frameWidth` | `number` | `undefined` | - | [Engine/Sprite.ts:18](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L18) |
| <a id="framex"></a> `frameX` | `number` | `0` | - | [Engine/Sprite.ts:16](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L16) |
| <a id="framey"></a> `frameY` | `number` | `0` | - | [Engine/Sprite.ts:17](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L17) |
| <a id="rotation"></a> `rotation` | `number` | `0` | Rotaciona a sprite | [Engine/Sprite.ts:24](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L24) |

## Methods

### addAnimation()

> **addAnimation**(`name`, `row`, `frames`, `speed`): `void`

Defined in: [Engine/Sprite.ts:57](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L57)

Adiciona uma animação

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | Nome da Animação ("Parado"|"Correndo") |
| `row` | `number` | Linha da Animação na Imagem |
| `frames` | `number` | Quantidade de quadros da animação |
| `speed` | `number` | Velocidade da Animação (Quanto maior mais lento) |

#### Returns

`void`

#### Example

```ts
sprite.addAnimation("parado", 0, 3, 0.3)
```

***

### draw()

> **draw**(`ctx`, `x`, `y`, `w`, `h`): `void`

Defined in: [Engine/Sprite.ts:110](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L110)

Desenha a sprite

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ctx` | `CanvasRenderingContext2D` | - |
| `x` | `number` | posição no eixo x |
| `y` | `number` | posição no eixo y |
| `w` | `number` | largura da sprite |
| `h` | `number` | altura da sprite |

#### Returns

`void`

***

### play()

> **play**(`name`): `void`

Defined in: [Engine/Sprite.ts:67](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L67)

Roda uma animação

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | nome da animação |

#### Returns

`void`

#### Example

```ts
sprite.addAnimation("parado", 0, 3, 0.3)
sprite.play("parado")
```

***

### setAnimation()

> **setAnimation**(`max`, `speed`): `void`

Defined in: [Engine/Sprite.ts:82](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L82)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `max` | `number` | Maximo de frames da animação atual |
| `speed` | `number` | Velocidade da Sprite |

#### Returns

`void`

***

### update()

> **update**(`dt`): `void`

Defined in: [Engine/Sprite.ts:90](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Engine/Sprite.ts#L90)

update: Processa a lógica da cena.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dt` | `number` | Delta Time vindo da FKEngine. |

#### Returns

`void`
