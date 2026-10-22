# Contexto do projeto — Jubileu Franciscano 2026

Site (React + Vite, arquivo principal `src/App.jsx`) da peregrinação de Mary (mãe) e Jason (padrasto), 30/Out a 12/Nov/2026 (Portugal, Fátima, Roma, Assis, Cássia). Publicado na Vercel a partir da branch `main` do GitHub (`geraldofieg/peregrinacao-2026`).

## Regras de trabalho
- O dono (Gera) não é programador: **responder sempre em português do Brasil**, em linguagem simples.
- A cota de deploys da Vercel é limitada: agrupar mudanças em um único push. Mudanças só de documentação: usar `[skip ci]` na mensagem do commit.
- Antes de commitar: `git config user.email noreply@anthropic.com && git config user.name Claude`.
- Checar sintaxe do `App.jsx` com Babel antes do push.
- Não mexer no site antes de o Gera aprovar a comparação/alteração.

## Estado atual (22/Out/2026)
- Voos conferidos com os e-tickets TAP (localizador ZRFUUD, Airbus A330-900).
- Checklist da home tem só 2 itens (remédios e vouchers).
- Salas VIP: Brasília (4 lounges + 3 unidades Living Heineken). Jason tem cartão Visa Infinite adicional.
- Clima: média histórica até a previsão real aparecer (Open-Meteo, `forecast_days=16`).
- Botões "Baixar PDF do Bilhete" na página Seguro apontam para arquivos que não existem (`/documentos/bilhete_mary.pdf` e `bilhete_jason.pdf`). Faltam os PDFs dos cartões, que o Gera vai baixar de novo e enviar.

## PENDENTE — aguardando confirmação da organização da viagem (Mary está checando)
O novo ROTEIRO OFICIAL (PDF) trouxe mudanças. Só atualizar o site depois que estes pontos forem confirmados:
1. **Hotel de Assis**: o roteiro não traz nome nem endereço. Hoje o site tem "Convento de Assis / A confirmar". Falta endereço (botão "Voltar ao Hotel" fica sem destino de 06 a 11/Nov).
2. **Dia 5 (03/11)**: o roteiro diz check-out 11h e transfer 11h45 para o aeroporto, mas o voo TP834 sai às 11h45. Provável erro do roteiro. Confirmar horário real do transfer (hoje a aba Voos manda chegar ao aeroporto às 9h45).
3. **Hotel de Lisboa**: roteiro escreve "Iberostar *Collection*"; o site usa "Iberostar *Selection*" (Rua Castilho, 64). Confirmar o nome certo.
4. **Dia 13 (11/11)**: o roteiro leva o grupo ao aeroporto de Roma em 11/11, mas o voo sai em 12/11 às 05h55. Perguntar onde o grupo fica até a madrugada.
5. **Roma → Assis (dia 8)**: o roteiro agora diz transfer privativo às 14h (antes: trem). Confirmar e, se for isso, remover "Bilhete de trem Roma → Assis" de "Não incluso" na página Pacote.
6. **Nome do frei**: capa diz "Moraes", página 2 diz "Morais". O site usa "Morais".
7. **Dia 7 (05/11)**: "Missa na Basílica do Perpétuo Socorro" (nova, 10h). Confirmar o local exato (provável Igreja de Santo Afonso) e se o transfer não incluso muda algo.
8. **Dia 6 (04/11)**: o roteiro diz "Audiência Papal" (o site diz "Catequese Papal"). Ajustar também na página Pacote.

### Mudanças do novo roteiro a aplicar depois da confirmação
- Dia 1: saída 10h da Paróquia São Francisco de Assis (Goiânia); parada no Posto Presidente (Anápolis); almoço no Posto Jerivá (Alexânia), não incluso.
- Dia 2: jantar de boas-vindas incluso (transfer até o jantar não incluso).
- Dia 3: Fátima, Casa dos Pastorinhos, Missa e Procissão das Velas (sem citar Basílica da Santíssima Trindade nem Capelinha das Aparições).
- Dia 4: Missa no "Santuário de Santo Antônio" (transfer não incluso); city tour genérico (saíram a Sé e a lista de pontos).
- Dia 7: Missa 10h; almoço 12h; city tour panorâmico 13h (sem lista de pontos).
- Dia 8: check-out 11h; transfer privativo 14h; jantar de boas-vindas com rodízio de pizzas incluso.
- Dia 9: Missa 8h na Porciúncula; 15h visitas (Santa Clara, São Carlo Acutis, Catedral de São Rufino, São Damião); 21h15 Rosário com tochas (aux flambeaux).
- Dia 10: Missa 8h na Basílica de São Francisco; sugestão de vinícola saiu.
- Dia 11: Fonte Colombo, La Foresta, Poggio Bustone; Missa 11h30 em Greccio; almoço estimado €25.
- Dia 12: La Verna; almoço estimado €25.
- Dia 14 (12/11): chegada prevista em Brasília 16h40, transfer para Goiânia.
- **Decisão do Gera pendente**: manter os detalhes turísticos que o roteiro novo tirou (Sé, Alfama, vinícola, links clicáveis) ou seguir só o texto novo?

## FUTURO — home dinâmica por dia da viagem (fazer só depois das confirmações acima)
A página inicial (Home) deve mostrar os **destaques do dia atual**, mudando conforme a data:
- **Dia do embarque (30/Out)**: cronograma do dia, o que não esquecer e o que levar.
- **Dia 2 em diante**: as informações e os pontos mais importantes daquele dia (horários, missa, local, transfer, hotel).
- Fora do período da viagem: manter a home atual (contagem regressiva/resumo).
Ideia de implementação: calcular o "dia da viagem" pela data de hoje (fuso de Brasília) e ler os destaques do `ITINERARY`, com um campo novo de destaques/lembretes por dia.
