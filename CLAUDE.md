# Contexto do projeto — Jubileu Franciscano 2026

Site (React + Vite, arquivo principal `src/App.jsx`) da peregrinação de Mary (mãe) e Jason (padrasto), 30/Out a 12/Nov/2026 (Portugal, Fátima, Roma, Assis, Cássia). Publicado na Vercel a partir da branch `main` do GitHub (`geraldofieg/peregrinacao-2026`).

## Regras de trabalho
- O dono (Gera) não é programador: **responder sempre em português do Brasil**, em linguagem simples.
- A cota de deploys da Vercel é limitada: agrupar mudanças em um único push. Mudanças só de documentação: usar `[skip ci]` na mensagem do commit.
- Antes de commitar: `git config user.email noreply@anthropic.com && git config user.name Claude`.
- Checar sintaxe do `App.jsx` com Babel antes do push.
- Não mexer no site antes de o Gera aprovar a comparação/alteração.

## Estado atual (23/Out/2026)
- Voos conferidos com os e-tickets TAP (localizador ZRFUUD, Airbus A330-900).
- Checklist da home tem só 2 itens (remédios e vouchers).
- Salas VIP: Brasília (4 lounges + 3 unidades Living Heineken). Jason tem cartão Visa Infinite adicional.
- Clima: média histórica até a previsão real aparecer (Open-Meteo, `forecast_days=16`).
- Botões "Baixar PDF do Bilhete" na página Seguro apontam para arquivos que não existem (`/documentos/bilhete_mary.pdf` e `bilhete_jason.pdf`). Faltam os PDFs dos cartões, que o Gera vai baixar de novo e enviar.

## Roteiro oficial corrigido — aplicado em 23/Out/2026
O PDF novo da organização (14 dias, com o dia 5 corrigido) já está no `ITINERARY` do `App.jsx`. Cada dia tem `agenda` (cronograma com horários, usado na home), `lembretes` ("não esquecer"), `levar` (só dia 1) e `sugestoes` (lugares do roteiro antigo, mostrados no Roteiro como "fora do roteiro oficial").
- Dia 5 (03/11): o horário de saída do hotel será informado pelo guia na noite de 02/11 (o conflito 11h/11h45 foi resolvido pela organização).
- Dia 8: transfer privativo às 14h (removido "Bilhete de trem" de "Não incluso").
- Dia 6: "Audiência Papal". Dia 14 (12/11) criado (voo de madrugada e chegada 16h40).
- A home mostra o dia atual (data do aparelho), com temperatura mín/máx em destaque (previsão real; média histórica se fora dos 16 dias). `?dia=N` na URL pré-visualiza a home de qualquer dia.

## AINDA PENDENTE (organização / Gera)
1. **Hotel de Assis**: sem nome nem endereço (site: "Convento de Assis / A confirmar").
2. **Hotel de Lisboa**: roteiro diz "Iberostar Collection"; `HOTELS` usa "Iberostar Selection" (Rua Castilho, 64). A programação diz só "Iberostar Lisboa".
3. **Dia 13 (11/11)**: o grupo vai ao aeroporto de Roma, mas o voo sai 12/11 às 05h55. Onde o grupo fica até lá?
4. **Dia 7**: confirmar endereço da Basílica do Perpétuo Socorro (provável Sant'Alfonso all'Esquilino).
5. Frei "Moraes" (capa) x "Morais" (pág. 2): o PDF novo usa "Morais".
6. **Decisão do Gera**: manter ou não as sugestões turísticas antigas (hoje ficam num bloco "Para conhecer" no Roteiro).
7. PDFs dos bilhetes na página Seguro ainda não existem.
8. Dia 1: voo/horários vêm dos e-tickets (TP 58 às 18h30; chegar 15h30).
