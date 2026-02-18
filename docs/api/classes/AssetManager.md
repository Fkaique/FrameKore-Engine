[@framekore-engine/core](../globals.md) / AssetManager

# Class: AssetManager

Defined in: [Utils/AssetManager.ts:1](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/AssetManager.ts#L1)

## Constructors

### Constructor

> **new AssetManager**(): `AssetManager`

#### Returns

`AssetManager`

## Methods

### get()

> **get**(`url`, `base?`): `HTMLImageElement`

Defined in: [Utils/AssetManager.ts:63](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/AssetManager.ts#L63)

Retorna uma imagem já carregada. 
Se não existir, avisa no console (útil para debug).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` \| `URL` |
| `base` | `URL` |

#### Returns

`HTMLImageElement`

***

### loadAudio()

> **loadAudio**(`url`, `base?`): `Promise`\<`HTMLAudioElement`\>

Defined in: [Utils/AssetManager.ts:27](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/AssetManager.ts#L27)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` \| `URL` |
| `base` | `URL` |

#### Returns

`Promise`\<`HTMLAudioElement`\>

***

### loadImage()

> **loadImage**(`url`, `base?`): `Promise`\<`HTMLImageElement`\>

Defined in: [Utils/AssetManager.ts:9](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/AssetManager.ts#L9)

Carrega uma imagem e a armazena no cache.
Retorna uma Promise que resolve quando a imagem está pronta.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` \| `URL` |
| `base` | `URL` |

#### Returns

`Promise`\<`HTMLImageElement`\>

***

### setBaseURL()

> **setBaseURL**(`url`): `void`

Defined in: [Utils/AssetManager.ts:47](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/AssetManager.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` \| `URL` |

#### Returns

`void`
