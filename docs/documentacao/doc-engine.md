---
outline: deep
---

# Engine

A Engine é a responsavel pelo controle de todo o jogo, nela tem elementos de configuração de jogo podendo iniciar uma Cena, carregar um asset, configurar controles e outras coisas que você pode ver logo abaixo.

# Propriedades de Engine

|Propriedade| Descrição | Exemplo |
|:--:|:--:|:--:|
|assets|Instancia de AssetManager, configura assets de audio e imagem| engine.asset.loadImage("....")|  
|ctx|Context2D de um canvas, usado para renderizar elementos no canvas|engine.ctx.fillRect(x,y,w,h)|
|input|Instancia de InputManager, configuração controles|engine.input.isKeyDown("KeyW")|

# Metodos de Engine

| Metodo | Descrição| Exemplo |
|:--:|:--:|:--:|
|setScene|Inicia uma nova Cena no jogo | setScene(new Level(engine)) |
|getScene|Retorna a cena atual da engine| getScene()|