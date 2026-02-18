[@framekore-engine/core](../globals.md) / Vector2

# Class: Vector2

Defined in: [Utils/Vector2.ts:1](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L1)

## Constructors

### Constructor

> **new Vector2**(`x?`, `y?`): `Vector2`

Defined in: [Utils/Vector2.ts:4](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L4)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `x` | `number` | `0` |
| `y` | `number` | `0` |

#### Returns

`Vector2`

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="x"></a> `x` | `number` | [Utils/Vector2.ts:2](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L2) |
| <a id="y"></a> `y` | `number` | [Utils/Vector2.ts:3](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L3) |

## Methods

### add()

> **add**(`v`): `void`

Defined in: [Utils/Vector2.ts:52](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L52)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v` | `Vector2` |

#### Returns

`void`

***

### clone()

> **clone**(): `Vector2`

Defined in: [Utils/Vector2.ts:108](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L108)

#### Returns

`Vector2`

***

### distanceTo()

> **distanceTo**(`v`): `number`

Defined in: [Utils/Vector2.ts:82](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L82)

Caulcula a Distancia entre este vetor e o outro

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v` | `Vector2` |

#### Returns

`number`

***

### div()

> **div**(`scalar`): `void`

Defined in: [Utils/Vector2.ts:67](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L67)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `scalar` | `number` |

#### Returns

`void`

***

### dot()

> **dot**(`v`): `number`

Defined in: [Utils/Vector2.ts:76](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L76)

Calcula o Produto Escalar entre este vetor e outro.
Matematicamente: (x1 * x2) + (y1 * y2)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v` | `Vector2` |

#### Returns

`number`

***

### lerp()

> **lerp**(`target`, `alpha`): `this`

Defined in: [Utils/Vector2.ts:116](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L116)

Interpolação Linear entre este vetor e um destino.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `Vector2` | O vetor de destino. |
| `alpha` | `number` | Valor entre 0 e 1 (0 = início, 1 = fim, 0.5 = meio). |

#### Returns

`this`

***

### magnitude()

> **magnitude**(): `number`

Defined in: [Utils/Vector2.ts:99](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L99)

Retorna a magnitude (comprimento) do vetor.
Implementa o Teorema de Pitágoras: a² + b² = c²

#### Returns

`number`

***

### magnitudeSq()

> **magnitudeSq**(): `number`

Defined in: [Utils/Vector2.ts:92](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L92)

Retorna o quadrado da magnitude.
Use para comparações de distância: é muito mais performático que magnitude().

#### Returns

`number`

***

### mul()

> **mul**(`scalar`): `void`

Defined in: [Utils/Vector2.ts:62](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L62)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `scalar` | `number` |

#### Returns

`void`

***

### normalize()

> **normalize**(): `Vector2`

Defined in: [Utils/Vector2.ts:103](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L103)

#### Returns

`Vector2`

***

### sub()

> **sub**(`v`): `void`

Defined in: [Utils/Vector2.ts:57](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L57)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v` | `Vector2` |

#### Returns

`void`

***

### add()

> `static` **add**(`v1`, `v2`): `Vector2`

Defined in: [Utils/Vector2.ts:9](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L9)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v1` | `Vector2` |
| `v2` | `Vector2` |

#### Returns

`Vector2`

***

### distanceTo()

> `static` **distanceTo**(`v1`, `v2`): `number`

Defined in: [Utils/Vector2.ts:34](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L34)

Caulcula a Distancia entre um vetor e o outro

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v1` | `Vector2` |
| `v2` | `Vector2` |

#### Returns

`number`

***

### div()

> `static` **div**(`vector`, `scalar`): `Vector2`

Defined in: [Utils/Vector2.ts:21](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `vector` | `Vector2` |
| `scalar` | `number` |

#### Returns

`Vector2`

***

### dot()

> `static` **dot**(`v1`, `v2`): `number`

Defined in: [Utils/Vector2.ts:28](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L28)

Calcula o Produto Escalar entre um vetor e outro.
Matematicamente: (x1 * x2) + (y1 * y2)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v1` | `Vector2` |
| `v2` | `Vector2` |

#### Returns

`number`

***

### lerp()

> `static` **lerp**(`v1`, `v2`, `alpha`): `Vector2`

Defined in: [Utils/Vector2.ts:45](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L45)

Interpolação Linear entre um vetor e um destino.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `Vector2` | - |
| `v2` | `Vector2` | - |
| `alpha` | `number` | Valor entre 0 e 1 (0 = início, 1 = fim, 0.5 = meio). |

#### Returns

`Vector2`

***

### mul()

> `static` **mul**(`vector`, `scalar`): `Vector2`

Defined in: [Utils/Vector2.ts:17](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `vector` | `Vector2` |
| `scalar` | `number` |

#### Returns

`Vector2`

***

### sub()

> `static` **sub**(`v1`, `v2`): `Vector2`

Defined in: [Utils/Vector2.ts:13](https://github.com/Fkaique/FrameKore-Engine/blob/5c9abedf52e5fafeef7f49a0f7b714054daa65dc/packages/FrameKore-Engine/src/Utils/Vector2.ts#L13)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `v1` | `Vector2` |
| `v2` | `Vector2` |

#### Returns

`Vector2`
