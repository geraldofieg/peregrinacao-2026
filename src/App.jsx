import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════
//  HOTÉIS DA VIAGEM
//  ⚠️ Substitua os campos "address" e "mapsQuery" pelos
//  endereços reais quando forem confirmados pela agência.
//  O campo "mapsQuery" é o que abre o Google Maps —
//  pode ser o endereço completo ou o nome do hotel.
// ═══════════════════════════════════════════════════════════
const HOTELS = [
  {
    city: "Lisboa 🇵🇹",
    checkIn:  "2026-10-31",
    checkOut: "2026-11-03",   // último dia hospedado (03/Nov saem de manhã)
    name: "Iberostar Selection Lisboa",
    address: "Rua Castilho, 64 — Lisboa, Portugal",
    mapsQuery: "Iberostar Selection Lisboa, Rua Castilho 64",
    icon: "🇵🇹",
    color: "#1A2B5F",
    atracoes: [
      { icon:"🛗", nome:"Elevador de Santa Justa", min:8,  desc:"Um dos cartões-postais de Lisboa. Construído em ferro, liga a Baixa ao Largo do Carmo.", query:"Elevador de Santa Justa Lisboa Portugal wikipedia" },
      { icon:"🚋", nome:"Elétrico 28", min:11, desc:"O famoso elétrico amarelo percorre bairros históricos de Lisboa, uma das experiências mais tradicionais da cidade.", query:"Elétrico 28 Lisboa Portugal wikipedia" },
      { icon:"🍴", nome:"Time Out Market Lisboa", min:12, desc:"Um dos espaços gastronômicos mais famosos da cidade, reunindo restaurantes, chefs e sabores portugueses.", query:"Time Out Market Lisboa Portugal wikipedia" },
      { icon:"⛪", nome:"Sé de Lisboa", min:13, desc:"A Catedral de Lisboa, uma das construções religiosas mais antigas e emblemáticas da cidade, no histórico bairro de Alfama.", query:"Sé de Lisboa Catedral wikipedia" },
      { icon:"🌊", nome:"Praça do Comércio", min:14, desc:"Uma das praças mais emblemáticas de Lisboa, às margens do Tejo, cercada por arquitetura histórica, restaurantes e cafés.", query:"Praça do Comércio Lisboa Portugal wikipedia" },
      { icon:"🏰", nome:"Torre de Belém", min:14, desc:"Símbolo da época dos Descobrimentos Portugueses, construída junto ao Rio Tejo. Um dos monumentos mais fotografados de Lisboa.", query:"Torre de Belém Lisboa Portugal wikipedia" },
      { icon:"⛪", nome:"Mosteiro dos Jerónimos", min:14, desc:"Magnífico monumento em estilo manuelino, um dos maiores símbolos da história portuguesa e da Era dos Descobrimentos.", query:"Mosteiro dos Jerónimos Lisboa Portugal wikipedia" },
      { icon:"🏛️", nome:"Arco Triunfal da Rua Augusta", min:14, desc:"Um dos símbolos da Baixa de Lisboa, marcando a entrada da Rua Augusta com bela vista da Praça do Comércio.", query:"Arco da Rua Augusta Lisboa Portugal wikipedia" },
      { icon:"🎭", nome:"LX Factory", min:14, desc:"Antigo complexo industrial transformado em polo criativo, com restaurantes, lojas, arte urbana e livrarias.", query:"LX Factory Lisboa Portugal wikipedia" },
      { icon:"🗿", nome:"Padrão dos Descobrimentos", min:16, desc:"Monumento às margens do Tejo que homenageia figuras ligadas às grandes navegações portuguesas.", query:"Padrão dos Descobrimentos Lisboa Portugal wikipedia" },
      { icon:"🏰", nome:"Castelo de São Jorge", min:17, desc:"Uma das grandes atrações históricas de Lisboa, no alto de uma colina, com vistas panorâmicas sobre o centro histórico e o Rio Tejo.", query:"Castelo de São Jorge Lisboa Portugal wikipedia" },
      { icon:"🎨", nome:"Museu Nacional do Azulejo", min:17, desc:"Um passeio pela história dos tradicionais azulejos portugueses, instalado em um antigo convento do século XVI.", query:"Museu Nacional do Azulejo Lisboa Portugal wikipedia" },
      { icon:"🎨", nome:"MAAT — Museu de Arte, Arquitetura e Tecnologia", min:20, desc:"Museu contemporâneo às margens do Tejo, conhecido pela arquitetura moderna e exposições de arte e tecnologia.", query:"MAAT Museu Lisboa Portugal wikipedia" },
    ],
    // Comida pesquisada num raio de até 2km do hotel (Google Maps) — ordenada por proximidade
    comida: [
      { icon:"🍽️", nome:"Luz (restaurante do hotel)", tipo:"Português contemporâneo", min:1, nota:4.8, desc:"Restaurante do próprio hotel Iberostar. Menu com entrada, prato principal, sobremesa e bebida. Serviço impecável.", query:"Restaurante Luz Iberostar Rua Castilho 64 Lisboa" },
      { icon:"🍸", nome:"Bar Boalma (bar do hotel)", tipo:"Bar de hotel", min:1, nota:4.5, desc:"Bar dentro do próprio hotel, ambiente tranquilo, aberto ao público, perto do metrô.", query:"Bar Boalma Rua Castilho 64 Lisboa" },
      { icon:"🍝", nome:"Al Garage", tipo:"Italiana", min:1, nota:4.4, desc:"Massas frescas e pizzas, um dos favoritos da região. Ambiente animado, boa carta de vinhos.", query:"Al Garage Rua Castilho 63 Lisboa" },
      { icon:"☕", nome:"Osteria Italiana", tipo:"Italiana", min:2, nota:4.5, desc:"Pratos italianos autênticos, massas frescas, preços justos, atendimento rápido e simpático.", query:"Osteria Italiana Rua Castilho 90 Lisboa" },
      { icon:"☕", nome:"Cantinho 75", tipo:"Café / Pastelaria", min:2, nota:4.6, desc:"Cafezinho de esquina bem português, pastéis de nata e sumos frescos. Ótimo para o café da manhã.", query:"Cantinho 75 Rua Castilho 75 Lisboa" },
      { icon:"🥐", nome:"Vontadinhas", tipo:"Padaria / Pastelaria", min:2, nota:4.0, desc:"Variedade de pastéis, saladas de fruta e sumos a preço acessível — ótimo para café da manhã rápido.", query:"Vontadinhas Rua Castilho 75A Lisboa" },
      { icon:"🍰", nome:"Docelândia", tipo:"Pastelaria", min:2, nota:4.7, desc:"Pastel de nata elogiadíssimo, café e sanduíches, muito frequentado pelos locais.", query:"Docelândia Rua Braamcamp 8 Lisboa" },
      { icon:"🍛", nome:"Gula — pronto a comer", tipo:"Comida caseira", min:2, nota:4.7, desc:"Comida caseira portuguesa a preços muito baixos — pratos de peixe e frango em torno de 5 euros.", query:"Gula pronto a comer Rua Castilho 39 Lisboa" },
      { icon:"🍕", nome:"Madame Restaurant", tipo:"Pizza, Bistrô, Coquetéis", min:3, nota:4.8, desc:"Pizzas e massas muito bem avaliadas, ambiente aconchegante, um dos mais queridos da vizinhança.", query:"Madame Restaurant Rua Braamcamp 68 Lisboa" },
      { icon:"🍣", nome:"Kabuki Lisboa", tipo:"Japonesa (alta gastronomia)", min:3, nota:4.3, desc:"Japonesa de alto nível com estrela Michelin. Ambiente elegante, ideal para uma noite especial.", query:"Kabuki Lisboa Rua Castilho 77B" },
      { icon:"🍹", nome:"Uptown", tipo:"Bar", min:5, nota:3.8, desc:"Bar dentro do Hotel Intercontinental, ambiente pequeno e tranquilo para uma bebida discreta.", query:"Uptown Bar Rua Castilho 149 Lisboa" },
      { icon:"🍷", nome:"Garden Roof Top", tipo:"Bar rooftop", min:6, nota:4.6, desc:"Bar no terraço com vista panorâmica da cidade, ótimos coquetéis e música ao vivo à noite.", query:"Garden Roof Top Bar Rua Castilho 11 Lisboa" },
      { icon:"🥐", nome:"Bread & Friends Marquês", tipo:"Padaria / Café", min:7, nota:4.3, desc:"Padaria moderna com boa seleção de doces, sanduíches frescos e sucos naturais.", query:"Bread and Friends Marquês Lisboa" },
      { icon:"🌆", nome:"Mona Verde", tipo:"Restaurante rooftop", min:7, nota:4.4, desc:"Vista deslumbrante da cidade, música ao vivo, pratos para compartilhar — ótimo para uma noite especial.", query:"Mona Verde Rua Castilho 14C Lisboa" },
      { icon:"☕", nome:"SM Specialty Coffee Shop", tipo:"Café especial", min:9, nota:4.9, desc:"Um dos cafés mais bem avaliados da região, torra própria, ambiente aconchegante.", query:"SM Specialty Coffee Shop Lisboa" },
    ],
    utilidades: [],
  },
  {
    city: "Roma 🇮🇹",
    checkIn:  "2026-11-03",
    checkOut: "2026-11-06",
    name: "nhow Roma Vittorio Veneto",
    address: "Corso d'Italia, 1 — Roma, Itália",
    mapsQuery: "Hotel nhow Roma Vittorio Veneto, Corso d'Italia 1",
    icon: "🇮🇹",
    color: "#1A2B5F",
    nightWalk: {
      titulo: "Roma à Noite — passeio sugerido pelo hotel",
      passos: ["🏨 Hotel", "🇮🇹 Via Veneto", "⛲ Fontana di Trevi", "🪜 Piazza di Spagna", "🍦 Gelato", "🏨 Retorno ao hotel"],
      aviso: "Recomendamos sempre avisar alguém da organização sobre o destino e o horário aproximado de retorno.",
    },
    atracoes: [
      { icon:"🇮🇹", nome:"Via Veneto", min:4,  desc:"A famosa avenida que ficou mundialmente conhecida pelo filme La Dolce Vita. Ótima para um passeio no fim da tarde, com hotéis históricos, cafés e restaurantes.", query:"Via Vittorio Veneto Roma Itália wikipedia" },
      { icon:"🌳", nome:"Villa Borghese", min:6,  desc:"Um dos maiores e mais bonitos parques de Roma, com jardins, lago e a Galleria Borghese.", query:"Villa Borghese Roma Itália wikipedia" },
      { icon:"⛪", nome:"Igreja de Nossa Senhora da Conceição dos Capuchinhos", min:8, desc:"Um dos destaques é a famosa Cripta dos Capuchinhos, com capelas decoradas com ossos de antigos frades. Verificar previamente horários e regras de visitação.", query:"Santa Maria della Concezione dei Cappuccini Roma wikipedia" },
      { icon:"⛲", nome:"Fontana di Trevi", min:15, desc:"A fonte mais famosa de Roma. Tradição diz que jogar uma moeda de costas garante o retorno à cidade.", query:"Fontana di Trevi Roma Itália wikipedia" },
      { icon:"🛍️", nome:"Via Condotti", min:15, desc:"Rua de compras mais elegante de Roma, com grifes de luxo, próxima à Escadaria Espanhola.", query:"Via dei Condotti Roma Itália wikipedia" },
      { icon:"🪜", nome:"Piazza di Spagna", min:11, desc:"Uma das praças mais famosas de Roma, ponto de encontro tradicional no coração da cidade.", query:"Piazza di Spagna Roma Itália wikipedia" },
      { icon:"🪜", nome:"Escadaria Espanhola", min:12, desc:"Uma das escadarias mais fotografadas do mundo, ligando a Piazza di Spagna à Igreja da Trinità dei Monti.", query:"Escadaria Espanhola Roma Trinità dei Monti wikipedia" },
      { icon:"🏛️", nome:"Piazza del Popolo", min:17, desc:"Grande praça histórica com obelisco egípcio no centro, cercada de igrejas e portões monumentais.", query:"Piazza del Popolo Roma Itália wikipedia" },
      { icon:"🏛️", nome:"Fórum Romano", min:27, desc:"O centro da vida pública da Roma Antiga, com ruínas de templos, basílicas e praças que valem a visita.", query:"Fórum Romano Roma Itália wikipedia" },
      { icon:"🏟️", nome:"Coliseu", min:32, desc:"O maior anfiteatro já construído, símbolo máximo de Roma. Reserve tempo suficiente e leve água.", query:"Coliseu de Roma Itália wikipedia" },
    ],
    comida: [
      { icon:"🌆", nome:"Terrazza Borghese — Restaurant & Lounge Bar", tipo:"Restaurante rooftop", min:1, nota:4.6, desc:"Terraço com vista para a Villa Borghese, pratos elegantes e ótimo para um jantar romântico.", query:"Terrazza Borghese Restaurant Lounge Bar Via Campania 45 Roma" },
      { icon:"🍽️", nome:"I Goliardi Roma", tipo:"Piemontesa (alta gastronomia)", min:2, nota:4.7, desc:"Cozinha tradicional do Piemonte, ambiente aconchegante e autêntico, muito elogiado pelos visitantes.", query:"I Goliardi Roma Via Sardegna 28" },
      { icon:"🍕", nome:"Allegrío", tipo:"Italiana / Pizza", min:3, nota:4.4, desc:"Carbonara elogiadíssima e pratos romanos e napolitanos. Fica bem perto da Cripta dos Capuchinhos.", query:"Allegrío Restaurant Via Vittorio Veneto 114 Roma" },
      { icon:"🍕", nome:"Crazy Pizza Rome", tipo:"Pizza com show ao vivo", min:3, nota:4.3, desc:"Pizza de alta qualidade com apresentação ao vivo — experiência animada e diferente.", query:"Crazy Pizza Rome Via Vittorio Veneto 167" },
      { icon:"🍨", nome:"Neve di Latte", tipo:"Gelateria", min:3, nota:4.6, desc:"Gelato artesanal cremoso, sabores como pistache e avelã muito elogiados.", query:"Neve di Latte Via Vittorio Veneto 112 Roma" },
      { icon:"🥩", nome:"Carpaccio Beef Restaurant", tipo:"Steakhouse", min:3, nota:4.9, desc:"Especialidade em carpaccio e carnes nobres — um dos restaurantes mais bem avaliados da região.", query:"Carpaccio Beef Restaurant Via Marche 9 Roma" },
      { icon:"☕", nome:"Caffè Carpano Ristorante", tipo:"Café / Restaurante italiano", min:3, nota:null, desc:"Indicado pela organização, bem próximo ao hotel na Via Vittorio Veneto.", query:"Caffè Carpano Via Vittorio Veneto 118 Roma" },
      { icon:"🌯", nome:"Dar Basha", tipo:"Marroquina", min:5, nota:4.8, desc:"Tagines e pratos marroquinos autênticos muito elogiados, ambiente acolhedor.", query:"Dar Basha Via Aurora 10 Roma" },
      { icon:"🎸", nome:"Hard Rock Cafe Roma", tipo:"Americana / Temática", min:6, nota:4.4, desc:"Hambúrgueres, ambiente musical animado e decoração temática — indicado pela organização.", query:"Hard Rock Cafe Roma Via Vittorio Veneto 62" },
      { icon:"☕", nome:"Gran Caffè Roma", tipo:"Café", min:8, nota:3.2, desc:"Opção de café e lanche rápido indicada pela organização. Avaliações dos visitantes são bem variadas.", query:"Gran Caffè Roma Via Vittorio Veneto 32" },
      { icon:"🍝", nome:"Hostaria Romana", tipo:"Italiana tradicional", min:11, nota:4.5, desc:"Cozinha romana autêntica, pratos como ossobuco e alcachofra frita muito elogiados.", query:"Hostaria Romana Via del Boccaccio 1 Roma" },
      { icon:"🍕", nome:"Pizzeria Italia dal 1987", tipo:"Pizza por fatia", min:11, nota:4.8, desc:"Pizza vendida por pedaço, preço justo e grande variedade de sabores.", query:"Pizzeria Italia dal 1987 Corso d'Italia 103 Roma" },
      { icon:"🍦", nome:"Gelateria Azzaro", tipo:"Gelateria", min:11, nota:4.9, desc:"Um dos gelatos mais elogiados de Roma — indicado pela organização. Sabores variados e trocados com frequência.", query:"Gelateria Azzaro Corso d'Italia 104 Roma" },
    ],
    utilidades: [
      { icon:"🛒", nome:"Decò Gourmet", tipo:"Supermercado", min:3, nota:3.9, desc:"Supermercado com produtos frescos, saladas e comida pronta — indicado pela organização.", query:"Decò Gourmet Corso d'Italia 32F Roma" },
      { icon:"🛒", nome:"Supermercado — Via Piemonte", tipo:"Mercado", min:4, nota:4.4, desc:"Mercado bem avaliado, funcionário atencioso, boa seleção de produtos — indicado pela organização.", query:"Supermarket Via Piemonte 95 Roma" },
      { icon:"💊", nome:"Farmacia Gellini", tipo:"Farmácia 24 horas", min:10, nota:3.9, desc:"Farmácia 24 horas indicada pela organização. Tenha o cartão do seguro viagem à mão em caso de necessidade.", query:"Farmacia Gellini Corso d'Italia 100 Roma" },
      { icon:"💊", nome:"Farmácia na Via Veneto", tipo:"Farmácia 24 horas", min:8, nota:null, desc:"Farmácia 24 horas na Via Vittorio Veneto, indicada pela organização — próxima à Cripta dos Capuchinhos.", query:"Farmacia Via Vittorio Veneto 27 Roma" },
    ],
  },
  {
    city: "Assis ⛪",
    checkIn:  "2026-11-06",
    checkOut: "2026-11-11",
    name: "Casa Madre Caterina",
    address: "Via Antonio Cristofani, 15 — Assis, Itália",
    mapsQuery: "Casa Madre Caterina, Via Antonio Cristofani 15, Assisi, Italia",
    icon: "⛪",
    color: "#1A2B5F",
    atracoes: [],
    comida: [],
    utilidades: [],
  },
];

// Retorna o hotel atual com base na data de hoje
function getCurrentHotel() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return HOTELS.find(h => {
    const ci = new Date(h.checkIn  + "T00:00:00");
    const co = new Date(h.checkOut + "T00:00:00");
    return today >= ci && today <= co;
  }) || null;
}

// ═══════════════════════════════════════════════════════════
//  ROTEIRO
// ═══════════════════════════════════════════════════════════
const ITINERARY = [
  { day:1, date:"2026-10-30", weekday:"Sexta-feira", location:"Goiânia / Brasília → Lisboa", city:"goiania", icon:"✈️",
    morning:"10h — Saída da Paróquia São Francisco de Assis, em Goiânia, com destino ao Aeroporto de Brasília. Parada no Posto Presidente, em Anápolis.",
    afternoon:"Almoço no Posto Jerivá, em Alexânia (não incluso). Chegada ao Aeroporto de Brasília — o ideal é estar lá às 15h30.",
    evening:"Embarque às 17h30 e voo TP 58 Brasília → Lisboa às 18h30. Noite no avião — descanse bem!",
    agenda:[
      { h:"10h",    t:"Saída da Paróquia São Francisco de Assis, em Goiânia, rumo ao Aeroporto de Brasília" },
      { h:"",       t:"Parada no Posto Presidente, em Anápolis" },
      { h:"Almoço", t:"Posto Jerivá, em Alexânia (não incluso)" },
      { h:"15h30",  t:"Chegada ao Aeroporto de Brasília (3 horas antes do voo)" },
      { h:"17h30",  t:"Embarque — os portões fecham" },
      { h:"18h30",  t:"Decolagem do voo TP 58 para Lisboa" },
      { h:"Amanhã", t:"Chegada prevista em Lisboa às 06h40 (hora local)" },
    ],
    lembretes:[
      "Estar no Aeroporto de Brasília às 15h30 — o voo sai às 18h30",
      "Passaporte, e-tickets e seguro viagem à mão (não na mala despachada)",
      "Remédios de uso contínuo na bagagem de mão",
      "Em Lisboa os relógios marcam 3 horas a mais que no Brasil",
    ],
    levar:[
      "Passaporte dentro da validade",
      "E-tickets da TAP (localizador ZRFUUD) e vouchers da viagem",
      "Comprovante do seguro viagem",
      "Medicamentos de uso contínuo + receitas (bagagem de mão)",
      "1 mala de até 23 kg, 1 bagagem de bordo de até 10 kg e 1 item pessoal",
      "Casaco ou agasalho para a chegada (Lisboa amanhece com cerca de 12°)",
      "Adaptador de tomada europeu e carregador portátil (na bagagem de mão)",
      "Camiseta da peregrinação",
      "Cartão internacional e alguns euros",
    ],
    prayer:"Senhor, abençoa nossa partida e guia nossos passos nesta jornada de fé.", places:[] },

  { day:2, date:"2026-10-31", weekday:"Sábado", location:"Lisboa, Portugal 🇵🇹", city:"lisboa", icon:"🛬",
    morning:"Chegada ao Aeroporto Internacional de Lisboa. Após os trâmites de imigração, transfer para o hotel Iberostar Lisboa.",
    afternoon:"Almoço (não incluso). Check-in e descanso. Tarde livre.",
    evening:"Jantar de boas-vindas (incluso). O transfer até o jantar não está incluso.",
    agenda:[
      { h:"Manhã",  t:"Chegada ao Aeroporto Internacional de Lisboa e trâmites de imigração" },
      { h:"",       t:"Transfer para o hotel Iberostar Lisboa" },
      { h:"Almoço", t:"Não incluso" },
      { h:"",       t:"Check-in e descanso" },
      { h:"Tarde",  t:"Livre" },
      { h:"Noite",  t:"Jantar de boas-vindas (incluso)" },
    ],
    lembretes:[
      "O jantar de boas-vindas é incluso, mas o transfer até o local não",
      "Acerte o relógio: Lisboa está 3 horas à frente do Brasil",
    ],
    prayer:"Bem-vindos a Lisboa! Obrigado, Senhor, por nos trazer com segurança.", places:[
      { name:"Aeroporto Internacional de Lisboa", query:"Aeroporto Humberto Delgado Lisboa Portugal wikipedia" },
    ] },

  { day:3, date:"2026-11-01", weekday:"Domingo", location:"Lisboa → Fátima (127km) 🕊️", city:"fatima", icon:"🕊️",
    morning:"Após o café da manhã, saída com guia acompanhante em direção a Fátima.",
    afternoon:"Almoço livre (não incluso), seguido de visita guiada ao Santuário de Fátima e à Casa dos Pastorinhos.",
    evening:"Participação na Santa Missa e na tradicional Procissão das Velas, um momento especial de fé e devoção mariana. Retorno a Lisboa.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã e saída com guia acompanhante rumo a Fátima" },
      { h:"Almoço", t:"Livre (não incluso)" },
      { h:"Tarde",  t:"Visita guiada ao Santuário de Fátima e à Casa dos Pastorinhos" },
      { h:"Noite",  t:"Santa Missa e tradicional Procissão das Velas" },
      { h:"",       t:"Retorno a Lisboa" },
    ],
    lembretes:[
      "À noite a Procissão das Velas costuma ser fria (média de 9° em Fátima): leve casaco",
      "Use calçado confortável",
    ],
    sugestoes:"O Santuário de Fátima reúne a Basílica Santíssima Trindade e a Capelinha das Aparições.",
    prayer:"Nossa Senhora de Fátima, intercede por nós e abençoa esta peregrinação.", places:[
      { name:"Basílica Santíssima Trindade", query:"Basílica Santíssima Trindade Fátima Portugal wikipedia" },
      { name:"Santuário de Fátima", query:"Santuário de Fátima Cova da Iria Portugal wikipedia" },
      { name:"Casa dos Pastorinhos", query:"Casa dos Pastorinhos Fátima Portugal aparições" },
      { name:"Capelinha das Aparições", query:"Capelinha das Aparições Fátima Portugal wikipedia" },
    ] },

  { day:4, date:"2026-11-02", weekday:"Segunda-feira", location:"Lisboa, Portugal 🇵🇹", city:"lisboa", icon:"⛪",
    morning:"Após o café da manhã no hotel, Santa Missa no Santuário de Santo Antônio (transfer não incluso).",
    afternoon:"Almoço livre (não incluso). City tour com guia local pelos principais pontos turísticos de Lisboa.",
    evening:"Noite livre.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã no hotel e Santa Missa no Santuário de Santo Antônio (transfer não incluso)" },
      { h:"Almoço", t:"Livre (não incluso)" },
      { h:"Tarde",  t:"City tour com guia local pelos principais pontos turísticos de Lisboa" },
      { h:"Noite",  t:"Livre" },
    ],
    lembretes:[
      "No fim do dia o guia informa o horário de saída do hotel para o aeroporto de amanhã (03/11) — anote!",
      "Deixe as malas arrumadas hoje: amanhã é dia de voo para Roma",
      "O transfer até a Missa não está incluso",
    ],
    sugestoes:"Lugares que costumam fazer parte de um passeio por Lisboa: Sé Patriarcal de Lisboa, Baixa Pombalina, Alfama, Torre de Belém, Mosteiro dos Jerônimos, Pasteis de Belém, Praça do Comércio, Rua Augusta, Elevador de Santa Justa, Castelo de São Jorge e Miradouro de Santa Luzia.",
    prayer:"Santo Antônio de Lisboa e de Pádua, rogai por nós!", places:[
      { name:"Santuário de Santo Antônio", query:"Igreja de Santo António de Lisboa Portugal wikipedia" },
      { name:"Sé Patriarcal de Lisboa", query:"Sé de Lisboa Catedral Patriarcal Portugal wikipedia" },
      { name:"Baixa Pombalina", query:"Baixa Pombalina Lisboa Portugal wikipedia" },
      { name:"Alfama", query:"Alfama Lisboa Portugal wikipedia" },
      { name:"Torre de Belém", query:"Torre de Belém Lisboa Portugal wikipedia" },
      { name:"Mosteiro dos Jerônimos", query:"Mosteiro dos Jerónimos Lisboa Portugal wikipedia" },
      { name:"Pasteis de Belém", query:"Pastéis de Belém Lisboa Portugal wikipedia" },
      { name:"Praça do Comércio", query:"Praça do Comércio Lisboa Portugal wikipedia" },
      { name:"Rua Augusta", query:"Rua Augusta Lisboa Portugal wikipedia" },
      { name:"Elevador de Santa Justa", query:"Elevador de Santa Justa Lisboa Portugal wikipedia" },
      { name:"Castelo de São Jorge", query:"Castelo de São Jorge Lisboa Portugal wikipedia" },
      { name:"Miradouro de Santa Luzia", query:"Miradouro de Santa Luzia Lisboa Portugal wikipedia" },
    ] },

  { day:5, date:"2026-11-03", weekday:"Terça-feira", location:"Lisboa → Roma ✈️", city:"roma", icon:"✈️",
    morning:"Café da manhã. O horário de saída do hotel para o aeroporto será informado pelo guia no final do dia anterior (02/11). Voo TP 834 Lisboa → Roma às 11h45.",
    afternoon:"Transfer para o hotel nhow Roma Vittorio Veneto. Almoço (não incluso), check-in e descanso. Bem-vindos a Roma!",
    evening:"Noite livre.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã" },
      { h:"",       t:"Saída do hotel para o aeroporto: horário informado pelo guia na noite de 02/11" },
      { h:"11h00",  t:"Embarque do voo TP 834 Lisboa → Roma" },
      { h:"11h45",  t:"Decolagem" },
      { h:"15h50",  t:"Chegada ao aeroporto de Fiumicino (hora de Roma)" },
      { h:"Tarde",  t:"Transfer para o hotel nhow Roma Vittorio Veneto" },
      { h:"",       t:"Almoço (não incluso), check-in e descanso" },
      { h:"Noite",  t:"Livre" },
    ],
    lembretes:[
      "Confirme o horário de saída do hotel que o guia informou ontem à noite",
      "Chegue ao aeroporto 2 horas antes do voo (09h45), salvo outra orientação do guia",
      "Passaporte e e-ticket à mão",
      "Roma está 1 hora à frente de Lisboa (4 horas à frente do Brasil)",
    ],
    prayer:"Senhor, guia nossa jornada até a Cidade Eterna.", places:[] },

  { day:6, date:"2026-11-04", weekday:"Quarta-feira", location:"Roma / Vaticano 🇻🇦", city:"roma", icon:"✝️",
    morning:"Após o café da manhã, transfer para o Vaticano para participação na Audiência Papal, sujeita à presença do Pontífice e à programação oficial.",
    afternoon:"Almoço livre (não incluso). Tarde livre para atividades pessoais.",
    evening:"Noite livre.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã e transfer para o Vaticano" },
      { h:"",       t:"Audiência Papal — sujeita à presença do Pontífice e à programação oficial" },
      { h:"Almoço", t:"Livre (não incluso)" },
      { h:"Tarde",  t:"Livre para atividades pessoais" },
      { h:"Noite",  t:"Livre" },
    ],
    lembretes:[
      "Leve um documento com foto",
      "Vista-se com respeito: ombros e joelhos cobertos",
      "A Audiência depende da presença do Papa e da programação oficial",
    ],
    sugestoes:"Para a tarde livre: Basílica de São Pedro com Porta Santa, Basílica de São Paulo Fora dos Muros, São Sebastião Fora dos Muros, Basílica de São João de Latrão, Basílica de Santa Maria Maior e Igreja de Santo Afonso de Ligório.",
    prayer:"Santo Padre, abençoa nossa peregrinação ao Jubileu Franciscano.", places:[
      { name:"Vaticano", query:"Cidade do Vaticano Roma wikipedia" },
      { name:"Basílica de São Pedro", query:"Basílica de São Pedro Vaticano Roma wikipedia" },
      { name:"Porta Santa", query:"Porta Santa Basílica São Pedro Vaticano wikipedia" },
      { name:"Basílica de São Paulo Fora dos Muros", query:"Basílica de São Paulo Fora dos Muros Roma Itália wikipedia" },
      { name:"São Sebastião Fora dos Muros", query:"Basílica de São Sebastião Fora dos Muros Roma Itália wikipedia" },
      { name:"Basílica de São João de Latrão", query:"Basílica de São João de Latrão Roma Itália wikipedia" },
      { name:"Basílica de Santa Maria Maior", query:"Basílica de Santa Maria Maior Roma Itália wikipedia" },
      { name:"Igreja de Santo Afonso de Ligório", query:"Igreja de Santo Afonso de Ligório Roma Itália wikipedia" },
    ] },

  { day:7, date:"2026-11-05", weekday:"Quinta-feira", location:"Roma, Itália 🇮🇹", city:"roma", icon:"🏛️",
    morning:"Café da manhã no hotel. 10h — Santa Missa na Basílica do Perpétuo Socorro (transfer não incluso).",
    afternoon:"12h — Almoço (não incluso). 13h — City tour panorâmico pelos principais pontos turísticos de Roma.",
    evening:"Noite livre.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã no hotel" },
      { h:"10h",    t:"Santa Missa na Basílica do Perpétuo Socorro (transfer não incluso)" },
      { h:"12h",    t:"Almoço (não incluso)" },
      { h:"13h",    t:"City tour panorâmico pelos principais pontos turísticos de Roma" },
      { h:"Noite",  t:"Livre" },
    ],
    lembretes:[
      "O transfer até a Missa das 10h não está incluso — combine o deslocamento com o guia",
      "Confirme com o guia o ponto de encontro e o endereço da Basílica",
    ],
    sugestoes:"Pontos que costumam aparecer em um city tour panorâmico por Roma (visitas externas): Basílica de São Pedro, Coliseu, Fontana di Trevi, Panteão, Escadaria da Praça da Espanha e Praça Navona.",
    prayer:"São Pedro, guarda nossa fé e fortalece nosso caminho.", places:[
      { name:"Basílica do Perpétuo Socorro", query:"Basílica do Perpétuo Socorro Roma Santo Afonso Esquilino" },
      { name:"Basílica de São Pedro", query:"Basílica de São Pedro Vaticano Roma wikipedia" },
      { name:"Coliseu", query:"Coliseu de Roma Itália wikipedia" },
      { name:"Fontana di Trevi", query:"Fontana di Trevi Roma Itália wikipedia" },
      { name:"Panteão", query:"Panteão de Roma Itália wikipedia" },
      { name:"Escadaria da Praça da Espanha", query:"Escadaria da Praça de Espanha Roma Itália wikipedia" },
      { name:"Praça Navona", query:"Praça Navona Roma Itália wikipedia" },
    ] },

  { day:8, date:"2026-11-06", weekday:"Sexta-feira", location:"Roma → Assis ⛪", city:"assis", icon:"🚐",
    morning:"Café da manhã. 11h — Check-out no hotel.",
    afternoon:"Almoço livre (não incluso). 14h — Saída do hotel em transfer privativo rumo a Assis. Check-in e tempo livre.",
    evening:"Jantar de boas-vindas — rodízio de pizzas (incluso).",
    agenda:[
      { h:"Manhã",  t:"Café da manhã" },
      { h:"11h",    t:"Check-out no hotel" },
      { h:"Almoço", t:"Livre (não incluso)" },
      { h:"14h",    t:"Saída do hotel em transfer privativo rumo a Assis" },
      { h:"",       t:"Check-in e tempo livre" },
      { h:"Noite",  t:"Jantar de boas-vindas — rodízio de pizzas (incluso)" },
    ],
    lembretes:[
      "Malas prontas antes das 11h, para o check-out",
      "Assis é mais fria e fica em altitude: deixe o casaco à mão",
      "Hospedagem em Assis: Casa Madre Caterina — Via Antonio Cristofani, 15 (próxima ao Santuário do Despojamento, onde repousa São Carlo Acutis)",
    ],
    sugestoes:"Para o tempo livre: caminhar pelas ruas medievais de Assis e participar de momentos de oração.",
    prayer:"São Francisco de Assis, rogai por nós. Paz e Bem! 🕊️", places:[] },

  { day:9, date:"2026-11-07", weekday:"Sábado", location:"Assis, Itália 🌿", city:"assis", icon:"🌿",
    morning:"Café da manhã. 8h — Santa Missa na Basílica de Santa Maria dos Anjos (Porciúncula).",
    afternoon:"Almoço livre (não incluso). 15h — Visitas à Basílica de Santa Clara, ao local de veneração de São Carlo Acutis, à Catedral de São Rufino e à Igreja de São Damião.",
    evening:"21h15 — Rosário aux flambeaux (Santo Rosário com fiaccole/tochas).",
    agenda:[
      { h:"Manhã",  t:"Café da manhã" },
      { h:"8h",     t:"Santa Missa na Basílica de Santa Maria dos Anjos (Porciúncula)" },
      { h:"Almoço", t:"Livre (não incluso)" },
      { h:"15h",    t:"Visitas à Basílica de Santa Clara, ao local de veneração de São Carlo Acutis, à Catedral de São Rufino e à Igreja de São Damião" },
      { h:"21h15",  t:"Rosário aux flambeaux (Santo Rosário com tochas)" },
    ],
    lembretes:[
      "As noites em Assis são frias (mínima média de 5°): casaco, cachecol e agasalho extra para o Rosário",
      "Calçado confortável para as ruas de pedra",
    ],
    prayer:"Francisco e Clara, ensinai-nos a simplicidade e o amor.", places:[
      { name:"Basílica de Santa Maria dos Anjos", query:"Basílica de Santa Maria dos Anjos Porciúncula Assis Itália wikipedia" },
      { name:"Porciúncula", query:"Porciúncula Santa Maria degli Angeli Assis Itália wikipedia" },
      { name:"Basílica de Santa Clara", query:"Basílica de Santa Clara Assis Itália wikipedia" },
      { name:"São Carlo Acutis", query:"Carlo Acutis Assis santuário da Espoliação wikipedia" },
      { name:"Catedral de São Rufino", query:"Catedral de São Rufino Assis Itália wikipedia" },
      { name:"Igreja de São Damião", query:"San Damiano Assis Itália wikipedia" },
    ] },

  { day:10, date:"2026-11-08", weekday:"Domingo", location:"Assis, Itália ⛪", city:"assis", icon:"⛪",
    morning:"Café da manhã. 8h — Santa Missa na Basílica de São Francisco de Assis.",
    afternoon:"Almoço livre (não incluso). Tarde livre para atividades pessoais.",
    evening:"Sem atividades programadas.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã" },
      { h:"8h",     t:"Santa Missa na Basílica de São Francisco de Assis" },
      { h:"Almoço", t:"Livre (não incluso)" },
      { h:"Tarde",  t:"Livre para atividades pessoais" },
    ],
    lembretes:[
      "Use calçado confortável: as ruas de Assis são de pedra",
    ],
    sugestoes:"Para a tarde livre: visitar uma vinícola local.",
    prayer:"São Francisco, que nossa fé floresça como a tua.", places:[
      { name:"Basílica de São Francisco de Assis", query:"Basílica de São Francisco de Assis Itália wikipedia" },
    ] },

  { day:11, date:"2026-11-09", weekday:"Segunda-feira", location:"Assis → Vale de Rieti 🙏", city:"assis", icon:"🙏",
    morning:"Após o café da manhã, saída em horário combinado para visita aos santuários franciscanos de Fonte Colombo, La Foresta e Poggio Bustone. 11h30 — Santa Missa em Greccio.",
    afternoon:"Almoço (não incluso, valor: 25 €).",
    evening:"Noite livre.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã e saída em horário combinado" },
      { h:"",       t:"Visita aos santuários franciscanos de Fonte Colombo, La Foresta e Poggio Bustone" },
      { h:"11h30",  t:"Santa Missa em Greccio" },
      { h:"Almoço", t:"Não incluso — valor: 25 €" },
      { h:"Noite",  t:"Livre" },
    ],
    lembretes:[
      "Confirme com o guia o horário combinado de saída do hotel",
      "Tenha 25 € para o almoço (não incluso)",
    ],
    prayer:"Que os passos de Francisco iluminem nossa peregrinação.", places:[
      { name:"Fonte Colombo", query:"Santuario di Fonte Colombo Rieti Itália wikipedia" },
      { name:"La Foresta", query:"Santuario della Foresta Rieti Itália" },
      { name:"Poggio Bustone", query:"Convento San Giacomo Poggio Bustone Rieti Itália" },
      { name:"Greccio", query:"Greccio presépio São Francisco Itália wikipedia" },
    ] },

  { day:12, date:"2026-11-10", weekday:"Terça-feira", location:"Assis → La Verna ⛰️", city:"laverna", icon:"⛰️",
    morning:"Após o café da manhã, peregrinação ao Santuário de La Verna, lugar sagrado onde São Francisco recebeu os estigmas.",
    afternoon:"Almoço (não incluso, valor: 25 €). A peregrinação continua durante a tarde.",
    evening:"Noite livre.",
    agenda:[
      { h:"Manhã",  t:"Café da manhã e peregrinação ao Santuário de La Verna, onde São Francisco recebeu os estigmas" },
      { h:"Almoço", t:"Não incluso — valor: 25 €" },
      { h:"Tarde",  t:"Continuação da peregrinação em La Verna" },
      { h:"Noite",  t:"Livre" },
    ],
    lembretes:[
      "La Verna fica em altitude e é o lugar mais frio da viagem (média de 2° a 10°): casaco pesado, luvas e cachecol",
      "Tenha 25 € para o almoço (não incluso)",
    ],
    prayer:"Senhor, que recebamos as chagas do teu amor como Francisco.", places:[
      { name:"Santuário de La Verna", query:"Santuário de La Verna Itália São Francisco estigmas wikipedia" },
    ] },

  { day:13, date:"2026-11-11", weekday:"Quarta-feira", location:"Cássia → Roma → Brasil 🏠", city:"assis", icon:"🏠",
    morning:"Após o café da manhã, saída em horário combinado com destino a Cássia, cidade de Santa Rita de Cássia.",
    afternoon:"Almoço livre (não incluso) e transfer para o Aeroporto de Roma.",
    evening:"Atenção: o voo de volta (TP 839, Roma → Lisboa) sai na madrugada de 12/11, às 05h55 — o grupo deve estar no aeroporto às 03h55.",
    agenda:[
      { h:"Manhã",     t:"Café da manhã e saída em horário combinado para Cássia, cidade de Santa Rita de Cássia" },
      { h:"Almoço",    t:"Livre (não incluso)" },
      { h:"Tarde",     t:"Transfer para o Aeroporto de Roma" },
      { h:"Madrugada", t:"Voo TP 839 Roma → Lisboa às 05h55 (12/11) — estar no aeroporto às 03h55" },
    ],
    lembretes:[
      "Voo de madrugada: Roma → Lisboa às 05h55 de 12/11 — estar no aeroporto às 03h55",
      "Confirme com o guia o plano para a noite, até a hora do voo",
      "Malas prontas e documentos à mão",
    ],
    prayer:"Santa Rita, intercede por nós e por nossas famílias.", places:[
      { name:"Cássia", query:"Cascia Itália Santa Rita wikipedia" },
    ] },

  { day:14, date:"2026-11-12", weekday:"Quinta-feira", location:"Roma → Lisboa → Brasília 🏠", city:"roma", icon:"🛫",
    morning:"05h55 — Voo TP 839 Roma → Lisboa. Conexão em Lisboa e voo TP 57 às 09h55 rumo a Brasília.",
    afternoon:"16h40 — Previsão de chegada em Brasília, seguida de transfer para Goiânia.",
    evening:"Encerramento dos serviços contratados. Durante a peregrinação, os acompanhantes do grupo estarão disponíveis para orientações e apoio.",
    agenda:[
      { h:"05h55", t:"Voo TP 839 Roma → Lisboa" },
      { h:"09h55", t:"Voo TP 57 Lisboa → Brasília (conexão de 1h45 em Lisboa)" },
      { h:"16h40", t:"Previsão de chegada em Brasília, seguida de transfer para Goiânia" },
      { h:"",      t:"Encerramento dos serviços contratados" },
    ],
    lembretes:[
      "Em Lisboa, siga direto ao portão do voo TP 57",
      "Passaporte e e-tickets à mão",
    ],
    prayer:"Senhor, obrigado por esta peregrinação abençoada. Paz e Bem! 🕊️", places:[] },
];

// ═══════════════════════════════════════════════════════════
//  CHECKLIST
// ═══════════════════════════════════════════════════════════
const CHECKLIST_ITEMS = [
  { id:"remedio",   text:"Separar medicamentos de uso contínuo + receitas médicas",        urgente:false },
  { id:"voucher",   text:"Receber vouchers da viagem (enviados 2 dias antes do embarque)", urgente:false },
];

// ═══════════════════════════════════════════════════════════
//  CLIMA HISTÓRICO
// ═══════════════════════════════════════════════════════════
const HISTORICAL_CLIMATE = [
  { cityKey:"lisboa",  city:"🇵🇹 Lisboa",  period:"31 Out – 03 Nov", maxC:19, minC:12, rainDays:9,  humidity:"76%", desc:"Outono ameno e agradável. Dias ensolarados são comuns, mas chuvas passageiras acontecem.", tip:"💡 Vista-se em camadas — pela manhã pode fazer frio, mas o dia aquece." },
  { cityKey:"fatima",  city:"🇵🇹 Fátima",  period:"01 Nov",          maxC:17, minC:9,  rainDays:10, humidity:"80%", desc:"Ligeiramente mais fria que Lisboa. Noites frescas, especialmente para a Procissão das Velas.", tip:"💡 Leve casaco para a Procissão das Velas à noite — pode fazer bastante frio." },
  { cityKey:"roma",    city:"🇮🇹 Roma",    period:"03 Nov – 06 Nov", maxC:17, minC:10, rainDays:11, humidity:"74%", desc:"Outono romano temperado. Chuvas aumentam em novembro mas raramente são longas.", tip:"💡 Um guarda-chuva compacto pode ser útil. Roupas leves durante o dia, agasalho à noite." },
  { cityKey:"assis",   city:"🇮🇹 Assis",   period:"06 Nov – 11 Nov", maxC:14, minC:5,  rainDays:13, humidity:"78%", desc:"Mais fria que Roma por estar em altitude (424m). Névoa matinal é comum. Paisagem deslumbrante.", tip:"💡 Leve casaco grosso, cachecol e sapatos confortáveis para caminhar nas pedras medievais." },
  { cityKey:"laverna", city:"🇮🇹 La Verna",period:"10 Nov",           maxC:10, minC:2,  rainDays:14, humidity:"82%", desc:"Santuário em altitude elevada (1.128m). Novembro é frio e pode haver geada.", tip:"💡 Roupas de inverno recomendadas: casaco pesado, luvas e cachecol." },
];
// Acesso rápido à média histórica por cidade (chave usada em ITINERARY/WEATHER_CITIES)
const HIST_BY_CITY = Object.fromEntries(HISTORICAL_CLIMATE.map(h => [h.cityKey, h]));

const WEATHER_CITIES = {
  goiania:{ lat:-16.6864, lon:-49.2643, name:"Goiânia"  },
  lisboa: { lat:38.7169,  lon:-9.1399,  name:"Lisboa"   },
  fatima: { lat:39.6273,  lon:-8.6671,  name:"Fátima"   },
  roma:   { lat:41.9028,  lon:12.4964,  name:"Roma"     },
  assis:  { lat:43.0707,  lon:12.6156,  name:"Assis"    },
  laverna:{ lat:43.6967,  lon:11.9292,  name:"La Verna" },
};
const WMO = { 0:"☀️ Céu limpo",1:"🌤️ Principalmente limpo",2:"⛅ Parcialmente nublado",3:"☁️ Nublado",45:"🌫️ Névoa",51:"🌦️ Garoa fraca",53:"🌦️ Garoa",61:"🌧️ Chuva fraca",63:"🌧️ Chuva",65:"🌧️ Chuva forte",80:"🌦️ Pancadas",82:"⛈️ Pancadas fortes",95:"⛈️ Tempestade" };

// ═══════════════════════════════════════════════════════════
//  CORES E TIPOGRAFIA
// ═══════════════════════════════════════════════════════════
const C = {
  navy:"#1A2B5F", navyL:"#263d8a", gold:"#B8840A", goldL:"#e6a820",
  cream:"#FBF7EE", creamD:"#EDE0C4", white:"#FFFFFF",
  brown:"#1A0F00", brownM:"#4A3520", green:"#1B5E20", red:"#B71C1C",
};
const T = {
  pageTitle:    { fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:700, color:C.navy,  lineHeight:1.2 },
  sectionTitle: { fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:C.navy,  lineHeight:1.3 },
  label:        { fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, color:C.gold,  letterSpacing:1.5, textTransform:"uppercase" },
  body:         { fontSize:18, lineHeight:1.75, color:C.brown, fontWeight:500 },
  sub:          { fontSize:16, color:C.brownM, lineHeight:1.6 },
};

// ═══════════════════════════════════════════════════════════
//  UTILITÁRIOS
// ═══════════════════════════════════════════════════════════
function getWx(c){ if(c==null)return null; return WMO[c]||WMO[Math.floor(c/10)*10]||"🌤️ Variável"; }
function fmtDate(s){ const[,m,d]=s.split("-"); const mo=["","Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]; return `${parseInt(d)} de ${mo[parseInt(m)]}`; }
function dateStr(d){ const m=String(d.getMonth()+1).padStart(2,"0"), dd=String(d.getDate()).padStart(2,"0"); return `${d.getFullYear()}-${m}-${dd}`; }
// Data de hoje no fuso do próprio aparelho (na Itália vira o dia na hora certa, sem depender de UTC)
function todayStr(){ return dateStr(new Date()); }
// Clima de um dia: previsão real se estiver na janela de 16 dias; senão, média histórica da cidade
function getDayWeather(weather, city, date){
  const cw=weather[city]; const idx=cw?.time?.indexOf(date);
  if(cw && idx>=0 && cw.temperature_2m_max?.[idx]!=null){
    return { max:cw.temperature_2m_max[idx], min:cw.temperature_2m_min[idx], code:cw.weathercode?.[idx], precip:cw.precipitation_probability_max?.[idx], fonte:"previsao" };
  }
  const h=HIST_BY_CITY[city];
  if(h) return { max:h.maxC, min:h.minC, code:null, precip:null, fonte:"media" };
  return null;
}
function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// Transforma nomes de lugares dentro de um texto em links clicáveis
// que abrem uma pesquisa do Google em nova aba (não sobrepõe o site).
function LinkedText({ text, places }){
  if (!places || places.length === 0) return <>{text}</>;
  const sorted = [...places].sort((a,b) => b.name.length - a.name.length);
  const pattern = new RegExp("(" + sorted.map(p => escapeRegExp(p.name)).join("|") + ")");
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) => {
        const match = sorted.find(p => p.name === part);
        if (match) {
          return (
            <a
              key={i}
              href={`https://www.google.com/search?q=${encodeURIComponent(match.query || match.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ color:C.gold, fontWeight:700, textDecoration:"underline", textDecorationStyle:"dotted", textUnderlineOffset:2 }}
            >
              {part}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
//  COMPONENTES BASE
// ═══════════════════════════════════════════════════════════
function Card({ children, style={} }){
  return <div style={{ background:C.white, borderRadius:18, padding:"20px 18px", marginBottom:16, boxShadow:"0 3px 18px rgba(0,0,0,0.09)", border:`1px solid ${C.creamD}`, ...style }}>{children}</div>;
}
function Divider(){ return <hr style={{ border:"none", borderTop:`1px solid ${C.creamD}`, margin:"12px 0" }} />; }
function PrayerBox({ text }){
  return(
    <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:14, padding:"18px 16px", marginTop:16 }}>
      <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontSize:16, fontStyle:"italic", textAlign:"center", lineHeight:1.7 }}>🙏 {text}</div>
    </div>
  );
}
function DayBadge({ day }){ return <span style={{ background:C.gold, color:C.white, borderRadius:20, padding:"4px 14px", fontSize:14, fontFamily:"'Cinzel',serif", fontWeight:700 }}>Dia {day}</span>; }
function SectionLabel({ children }){ return <div style={{ ...T.label, display:"block", marginBottom:14 }}>{children}</div>; }

function WxBadge({ code, max, min, precip, compact=false }){
  const label=getWx(code);
  if(!label) return <span style={{ ...T.sub, fontStyle:"italic" }}>Em breve…</span>;
  if(compact) return(
    <div style={{ textAlign:"right" }}>
      <div style={{ fontSize:15, color:C.brown, fontWeight:600 }}>{label}</div>
      <div style={{ fontSize:18, color:C.gold, fontWeight:700 }}>{Math.round(max)}° / {Math.round(min)}°</div>
      {precip>20&&<div style={{ fontSize:14, color:"#1565C0" }}>💧 {precip}%</div>}
    </div>
  );
  return(
    <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:12, padding:"14px 16px", marginTop:12, textAlign:"center" }}>
      <div style={{ color:C.white, fontSize:18, marginBottom:6, fontWeight:600 }}>{label}</div>
      <div style={{ color:C.goldL, fontSize:36, fontWeight:700, fontFamily:"'Cinzel',serif" }}>{Math.round(max)}°<span style={{ fontSize:22, color:"rgba(255,255,255,0.6)" }}> / {Math.round(min)}°</span></div>
      {precip>20&&<div style={{ color:"rgba(255,255,255,0.75)", fontSize:15, marginTop:6 }}>💧 {precip}% de chance de chuva</div>}
    </div>
  );
}

// Temperatura do dia em destaque (mínima e máxima grandes, fáceis de ler)
function TempHero({ w }){
  if(!w) return(
    <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:14, padding:"16px", textAlign:"center", color:"rgba(255,255,255,0.8)", fontSize:16 }}>
      🌡️ A previsão do tempo aparece aqui assim que estiver disponível.
    </div>
  );
  const label=getWx(w.code);
  return(
    <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:14, padding:"14px 12px" }}>
      <div style={{ textAlign:"center", color:"rgba(255,255,255,0.75)", fontSize:13, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Cinzel',serif", marginBottom:8 }}>🌡️ Temperatura de hoje</div>
      <div style={{ display:"flex", alignItems:"center" }}>
        <div style={{ flex:1, textAlign:"center" }}>
          <div style={{ color:"#9CCBFF", fontSize:14, fontWeight:700, letterSpacing:1.5, fontFamily:"'Cinzel',serif" }}>MÍNIMA</div>
          <div style={{ color:"#9CCBFF", fontSize:52, fontWeight:700, fontFamily:"'Cinzel',serif", lineHeight:1.1 }}>{Math.round(w.min)}°</div>
        </div>
        <div style={{ width:1, alignSelf:"stretch", background:"rgba(255,255,255,0.25)" }} />
        <div style={{ flex:1, textAlign:"center" }}>
          <div style={{ color:"#FFC266", fontSize:14, fontWeight:700, letterSpacing:1.5, fontFamily:"'Cinzel',serif" }}>MÁXIMA</div>
          <div style={{ color:"#FFC266", fontSize:52, fontWeight:700, fontFamily:"'Cinzel',serif", lineHeight:1.1 }}>{Math.round(w.max)}°</div>
        </div>
      </div>
      {label&&<div style={{ textAlign:"center", color:C.white, fontSize:17, fontWeight:600, marginTop:8 }}>{label}</div>}
      {w.precip>20&&<div style={{ textAlign:"center", color:"rgba(255,255,255,0.85)", fontSize:15, marginTop:4 }}>💧 {w.precip}% de chance de chuva — leve guarda-chuva</div>}
      {w.fonte==="media"&&<div style={{ textAlign:"center", color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:8 }}>Média desta época do ano — a previsão real aparece quando a data se aproxima</div>}
    </div>
  );
}

function DayCard({ d, expanded, onToggle }){
  return(
    <div onClick={onToggle} style={{ background:C.white, borderRadius:18, padding:"18px 16px", marginBottom:14, boxShadow:"0 3px 18px rgba(0,0,0,0.09)", border:`2px solid ${expanded?C.gold:C.creamD}`, cursor:"pointer" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:expanded?16:0 }}>
        <span style={{ fontSize:38, flexShrink:0 }}>{d.icon}</span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:5, flexWrap:"wrap" }}>
            <DayBadge day={d.day} />
            <span style={{ ...T.sub, fontSize:15 }}>{d.weekday}</span>
          </div>
          <div style={{ ...T.sectionTitle, fontSize:17, lineHeight:1.3 }}>{d.location}</div>
          <div style={{ ...T.sub, fontSize:14, marginTop:2 }}>{fmtDate(d.date)}</div>
        </div>
        <span style={{ color:C.gold, fontSize:22, flexShrink:0, fontWeight:700 }}>{expanded?"▲":"▼"}</span>
      </div>
      {expanded&&(
        <>
          {[["Manhã","🌅",d.morning],["Tarde","☀️",d.afternoon],["Noite","🌙",d.evening]].map(([lab,em,txt],i,arr)=>(
            <div key={i}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
                <span style={{ ...T.label, fontSize:13, minWidth:56, paddingTop:3, display:"block" }}>{lab}</span>
                <span style={{ ...T.body, flex:1 }}>{em} <LinkedText text={txt} places={d.places} /></span>
              </div>
              {i<arr.length-1&&<Divider />}
            </div>
          ))}
          {d.sugestoes&&(
            <>
              <Divider />
              <div style={{ background:C.cream, borderRadius:12, padding:"12px 14px", border:`1px dashed ${C.creamD}` }}>
                <div style={{ ...T.label, fontSize:12, marginBottom:6 }}>💡 Para conhecer (sugestão — fora do roteiro oficial)</div>
                <div style={{ ...T.sub, fontSize:16 }}><LinkedText text={d.sugestoes} places={d.places} /></div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  BOTÃO FLUTUANTE — VOLTAR AO HOTEL
//  Aparece apenas durante os dias da viagem.
//  Abre o Google Maps com a rota até o hotel atual.
// ═══════════════════════════════════════════════════════════
function BotaoHotel({ hotel, antesViagem }) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  function abrirMaps() {
    if (!hotel) return;
    // Antes da viagem ou sem endereço confirmado: mostra explicação
    if (antesViagem || !hotel.mapsQuery) {
      setMostrarInfo(true);
      return;
    }
    const destino = encodeURIComponent(hotel.mapsQuery);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=walking`;
    window.open(url, "_blank");
  }

  if (!hotel) return null;

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={abrirMaps}
        style={{
          position: "fixed",
          bottom: 160,
          right: 16,
          zIndex: 200,
          background: "linear-gradient(135deg, #1B5E20, #2E7D32)",
          color: C.white,
          border: "none",
          borderRadius: 20,
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
          cursor: "pointer",
          minWidth: 80,
        }}
      >
        <span style={{ fontSize: 28 }}>🏠</span>
        <span style={{ fontSize: 11, fontFamily:"'Cinzel',serif", fontWeight:700, letterSpacing:0.5, lineHeight:1.3, textAlign:"center" }}>
          Voltar ao<br/>Hotel
        </span>
      </button>

      {/* Modal — explicação antes da viagem */}
      {mostrarInfo && (
        <div
          onClick={() => setMostrarInfo(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:C.white, borderRadius:20, padding:"28px 22px", maxWidth:340, width:"100%", textAlign:"center", boxShadow:"0 8px 40px rgba(0,0,0,0.3)" }}
          >
            {antesViagem ? (
              <>
                <div style={{ fontSize:52, marginBottom:14 }}>🗺️</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:21, fontWeight:700, color:C.navy, marginBottom:14 }}>
                  Como funciona este botão
                </div>
                <div style={{ fontSize:17, color:C.brown, lineHeight:1.75, marginBottom:10 }}>
                  Durante a viagem, ao tocar aqui, o <strong>Google Maps</strong> abrirá automaticamente com a rota a pé de onde vocês estiverem até o hotel do dia.
                </div>
                <div style={{ fontSize:17, color:C.brown, lineHeight:1.75, marginBottom:20 }}>
                  O botão reconhece em qual cidade vocês estão a cada dia e aponta sempre para a hospedagem certa — seja em <strong>Lisboa</strong>, <strong>Roma</strong> ou <strong>Assis</strong>.
                </div>
                <div style={{ background:C.creamD, borderRadius:12, padding:"12px 14px", marginBottom:22, fontSize:16, color:C.brownM, lineHeight:1.6 }}>
                  💡 Assim vocês podem sair para passear com tranquilidade e voltar para o hotel sem se preocupar!
                </div>
                <button
                  onClick={() => setMostrarInfo(false)}
                  style={{ background:C.navy, color:C.white, border:"none", borderRadius:14, padding:"14px 32px", fontSize:17, fontFamily:"'Cinzel',serif", fontWeight:700, cursor:"pointer" }}
                >
                  Entendido! 🙏
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize:48, marginBottom:14 }}>📍</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:C.navy, marginBottom:12 }}>
                  {hotel.name}
                </div>
                <div style={{ fontSize:17, color:C.brownM, marginBottom:20, lineHeight:1.65 }}>
                  O endereço deste hotel ainda está sendo confirmado pela agência. Em breve o botão abrirá o Google Maps automaticamente!
                </div>
                <button
                  onClick={() => setMostrarInfo(false)}
                  style={{ background:C.navy, color:C.white, border:"none", borderRadius:14, padding:"13px 30px", fontSize:17, fontFamily:"'Cinzel',serif", fontWeight:700, cursor:"pointer" }}
                >
                  Entendido
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: HOJE
// ═══════════════════════════════════════════════════════════
function PageHoje({ currentDay, daysUntilTrip, tripOver, weather, checked, toggleCheck, preview }){
  const total   = CHECKLIST_ITEMS.length;
  const done    = CHECKLIST_ITEMS.filter(i=>checked[i.id]).length;
  const pct     = Math.round((done/total)*100);
  const allDone = done===total;

  const ChecklistBlock = () => (
    <Card>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <SectionLabel>✅ Providências antes da viagem</SectionLabel>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:allDone?C.green:C.gold }}>{done}/{total}</span>
      </div>
      <div style={{ background:C.creamD, borderRadius:10, height:12, marginBottom:16, overflow:"hidden" }}>
        <div style={{ background:allDone?C.green:C.gold, height:"100%", width:`${pct}%`, borderRadius:10, transition:"width 0.4s ease" }} />
      </div>
      {allDone&&(
        <div style={{ background:"#E8F5E9", borderRadius:10, padding:"10px 14px", marginBottom:14, textAlign:"center", border:`2px solid ${C.green}` }}>
          <span style={{ color:C.green, fontSize:17, fontWeight:700 }}>🎉 Tudo pronto para a viagem!</span>
        </div>
      )}
      {[true,false].map(isUrgent=>{
        const items=CHECKLIST_ITEMS.filter(i=>i.urgente===isUrgent);
        return(
          <div key={String(isUrgent)}>
            {isUrgent&&<div style={{ fontSize:13, fontWeight:700, color:C.red, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>⚠️ Prioritário</div>}
            {!isUrgent&&<div style={{ fontSize:13, fontWeight:700, color:C.brownM, letterSpacing:1, textTransform:"uppercase", margin:"14px 0 8px" }}>Demais providências</div>}
            {items.map((item,i,arr)=>(
              <div key={item.id} onClick={()=>toggleCheck(item.id)} style={{ display:"flex", gap:14, padding:"13px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start", cursor:"pointer" }}>
                <div style={{ width:28, height:28, borderRadius:8, border:`2.5px solid ${checked[item.id]?C.green:(isUrgent&&!checked[item.id]?C.red:C.creamD)}`, background:checked[item.id]?C.green:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, transition:"all 0.2s" }}>
                  {checked[item.id]&&<span style={{ color:C.white, fontSize:16, fontWeight:700, lineHeight:1 }}>✓</span>}
                </div>
                <span style={{ ...T.body, fontSize:17, textDecoration:checked[item.id]?"line-through":"none", color:checked[item.id]?C.brownM:C.brown, lineHeight:1.55 }}>{item.text}</span>
              </div>
            ))}
          </div>
        );
      })}
      <div style={{ ...T.sub, fontSize:13, marginTop:14, textAlign:"center", color:C.brownM }}>Toque em cada item para marcar como concluído</div>
    </Card>
  );

  if(tripOver) return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"36px 22px", border:`2px solid ${C.gold}`, textAlign:"center" }}>
        <div style={{ fontSize:64, marginBottom:14 }}>🕊️</div>
        <div style={{ ...T.pageTitle, color:C.goldL, marginBottom:14 }}>Peregrinação Concluída!</div>
        <p style={{ color:"rgba(255,255,255,0.85)", fontSize:18, lineHeight:1.8 }}>Que as graças recebidas nesta jornada sagrada acompanhem sempre vocês.</p>
        <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontStyle:"italic", fontSize:18, marginTop:20 }}>Paz e Bem! 🕊️</div>
      </div>
    </div>
  );

  if(daysUntilTrip>0) return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"30px 20px", border:`2px solid ${C.gold}`, textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:50, marginBottom:10 }}>✈️</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:"rgba(255,255,255,0.65)", fontSize:14, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Faltam</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:80, fontWeight:700, lineHeight:1 }}>{daysUntilTrip}</div>
        <div style={{ color:"rgba(255,255,255,0.75)", fontSize:20, marginTop:8, fontWeight:600 }}>dias para a peregrinação</div>
        <div style={{ color:"rgba(255,255,255,0.45)", fontSize:16, marginTop:6 }}>Partida: 30 de outubro de 2026</div>
      </div>
      <ChecklistBlock />
      <Card>
        <SectionLabel>🗺️ Destinos da Viagem</SectionLabel>
        {[
          { icon:"🇵🇹", city:"Lisboa & Fátima",    dates:"31 de Out – 03 de Nov" },
          { icon:"🇮🇹", city:"Roma & Vaticano",    dates:"03 de Nov – 06 de Nov" },
          { icon:"⛪",  city:"Assis & Santuários", dates:"06 de Nov – 11 de Nov" },
        ].map((dest,i,arr)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}>
            <span style={{ fontSize:34 }}>{dest.icon}</span>
            <div>
              <div style={{ ...T.sectionTitle, fontSize:19 }}>{dest.city}</div>
              <div style={{ ...T.sub, fontSize:16, marginTop:2 }}>{dest.dates}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );

  // Durante a viagem
  if(!currentDay) return(
    <div style={{ padding:"20px 16px" }}>
      <Card style={{ textAlign:"center", padding:"40px 20px" }}>
        <div style={{ fontSize:48, marginBottom:10 }}>🕊️</div>
        <div style={T.sectionTitle}>Em Peregrinação</div>
        <div style={{ ...T.sub, marginTop:8 }}>Consulte o Roteiro completo.</div>
      </Card>
    </div>
  );

  const todayW   = getDayWeather(weather, currentDay.city, currentDay.date);
  const nextDay  = ITINERARY.find(d=>d.day===currentDay.day+1)||null;
  const nextW    = nextDay ? getDayWeather(weather, nextDay.city, nextDay.date) : null;
  const levar    = currentDay.levar||[];
  const levarKey = i=>`d${currentDay.day}_levar_${i}`;
  const levarOk  = levar.filter((_,i)=>checked[levarKey(i)]).length;

  return(
    <div style={{ padding:"20px 16px" }}>
      {preview&&(
        <div style={{ background:"#E3F2FD", border:"2px solid #1565C0", borderRadius:12, padding:"10px 14px", marginBottom:14, textAlign:"center", color:"#0D47A1", fontSize:15, fontWeight:600 }}>
          👀 Pré-visualização do Dia {currentDay.day} — não é o dia de hoje
        </div>
      )}

      {/* Cabeçalho do dia + temperatura em destaque */}
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"22px 18px 18px", border:`2px solid ${C.gold}`, marginBottom:16 }}>
        <div style={{ textAlign:"center", marginBottom:14 }}>
          <div style={{ fontSize:48, marginBottom:6 }}>{currentDay.icon}</div>
          <div style={{ fontFamily:"'Cinzel',serif", color:"rgba(255,255,255,0.6)", fontSize:13, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>{preview?"DIA":"HOJE · DIA"} {currentDay.day} DE {ITINERARY.length}</div>
          <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:22, lineHeight:1.3, marginBottom:6 }}>{currentDay.location}</div>
          <div style={{ color:"rgba(255,255,255,0.65)", fontSize:16 }}>{currentDay.weekday} · {fmtDate(currentDay.date)}</div>
        </div>
        <TempHero w={todayW} />
      </div>

      {/* Cronograma do dia */}
      <Card>
        <SectionLabel>📅 Programação de Hoje</SectionLabel>
        {(currentDay.agenda||[]).length>0 ? currentDay.agenda.map((a,i,arr)=>(
          <div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}>
            <div style={{ minWidth:76, fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:a.h?C.gold:C.creamD, paddingTop:3 }}>{a.h||"•"}</div>
            <div style={{ ...T.body, fontSize:17, lineHeight:1.5, flex:1 }}><LinkedText text={a.t} places={currentDay.places} /></div>
          </div>
        )) : [["Manhã","🌅",currentDay.morning],["Tarde","☀️",currentDay.afternoon],["Noite","🌙",currentDay.evening]].map(([lab,em,txt],i,arr)=>(
          <div key={i}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
              <span style={{ ...T.label, fontSize:13, minWidth:56, paddingTop:3, display:"block" }}>{lab}</span>
              <span style={{ ...T.body, flex:1 }}>{em} <LinkedText text={txt} places={currentDay.places} /></span>
            </div>
            {i<arr.length-1&&<Divider />}
          </div>
        ))}
      </Card>

      {/* Não esquecer */}
      {(currentDay.lembretes||[]).length>0&&(
        <div style={{ background:"#FFF4E5", borderRadius:18, padding:"18px 16px", marginBottom:16, borderLeft:`6px solid ${C.goldL}`, boxShadow:"0 3px 18px rgba(0,0,0,0.07)" }}>
          <SectionLabel>⚠️ Não esquecer hoje</SectionLabel>
          {currentDay.lembretes.map((l,i)=>(
            <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", alignItems:"flex-start" }}>
              <span style={{ color:C.gold, fontSize:20, fontWeight:700, lineHeight:1.4 }}>•</span>
              <span style={{ ...T.body, fontSize:17, lineHeight:1.5 }}>{l}</span>
            </div>
          ))}
        </div>
      )}

      {/* O que levar (marcável) */}
      {levar.length>0&&(
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <SectionLabel>🎒 O que levar</SectionLabel>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:levarOk===levar.length?C.green:C.gold }}>{levarOk}/{levar.length}</span>
          </div>
          {levar.map((item,i)=>(
            <div key={i} onClick={()=>toggleCheck(levarKey(i))} style={{ display:"flex", gap:14, padding:"12px 0", borderBottom:i<levar.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start", cursor:"pointer" }}>
              <div style={{ width:28, height:28, borderRadius:8, border:`2.5px solid ${checked[levarKey(i)]?C.green:C.creamD}`, background:checked[levarKey(i)]?C.green:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                {checked[levarKey(i)]&&<span style={{ color:C.white, fontSize:16, fontWeight:700, lineHeight:1 }}>✓</span>}
              </div>
              <span style={{ ...T.body, fontSize:17, lineHeight:1.5, textDecoration:checked[levarKey(i)]?"line-through":"none", color:checked[levarKey(i)]?C.brownM:C.brown }}>{item}</span>
            </div>
          ))}
          <div style={{ ...T.sub, fontSize:13, marginTop:12, textAlign:"center" }}>Toque em cada item para marcar</div>
        </Card>
      )}

      {/* Amanhã */}
      {nextDay&&(
        <Card>
          <SectionLabel>🔜 Amanhã</SectionLabel>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:36, flexShrink:0 }}>{nextDay.icon}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ ...T.sectionTitle, fontSize:17 }}>Dia {nextDay.day} · {nextDay.location}</div>
              <div style={{ ...T.sub, fontSize:14, marginTop:2 }}>{nextDay.weekday} · {fmtDate(nextDay.date)}</div>
            </div>
            {nextW&&(
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:20, fontWeight:700, color:"#1565C0", fontFamily:"'Cinzel',serif" }}><span style={{ fontSize:12, fontWeight:600 }}>mín </span>{Math.round(nextW.min)}°</div>
                <div style={{ fontSize:20, fontWeight:700, color:"#D84315", fontFamily:"'Cinzel',serif" }}><span style={{ fontSize:12, fontWeight:600 }}>máx </span>{Math.round(nextW.max)}°</div>
              </div>
            )}
          </div>
          {(nextDay.agenda||[]).slice(0,2).map((a,i)=>(
            <div key={i} style={{ ...T.sub, fontSize:15, marginTop:8 }}><b style={{ color:C.gold }}>{a.h||"•"}</b> {a.t}</div>
          ))}
          {nextW&&nextW.fonte==="media"&&<div style={{ ...T.sub, fontSize:12, marginTop:8 }}>Temperaturas pela média da época</div>}
        </Card>
      )}

      <PrayerBox text={currentDay.prayer} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: ROTEIRO
// ═══════════════════════════════════════════════════════════
function PageRoteiro({ expandedDay, setExpandedDay }){
  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:18 }}>
        <div style={T.pageTitle}>Roteiro Completo</div>
        <div style={{ ...T.sub, marginTop:4 }}>30 de Out – 12 de Nov de 2026 · 14 dias</div>
      </div>
      {ITINERARY.map(d=>(
        <DayCard key={d.day} d={d} expanded={expandedDay===d.day} onToggle={()=>setExpandedDay(expandedDay===d.day?null:d.day)} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: CLIMA
// ═══════════════════════════════════════════════════════════
function PageClima({ weather }){
  const [tab,setTab]=useState("previsao");
  const cityDayMap={};
  ITINERARY.forEach(d=>{ if(!cityDayMap[d.city])cityDayMap[d.city]=[]; if(!cityDayMap[d.city].find(x=>x.date===d.date))cityDayMap[d.city].push({date:d.date,day:d.day}); });
  const flag=k=>({goiania:"🇧🇷",lisboa:"🇵🇹",fatima:"🇵🇹",roma:"🇮🇹",assis:"🇮🇹",laverna:"🇮🇹"}[k]||"🌍");

  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:16 }}><div style={T.pageTitle}>Clima</div></div>
      <div style={{ display:"flex", gap:8, marginBottom:18 }}>
        {[{id:"previsao",label:"🌦️ Previsão"},{id:"historico",label:"📊 Histórico"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:"12px 8px", borderRadius:14, border:`2px solid ${tab===t.id?C.gold:C.creamD}`, background:tab===t.id?C.gold:C.white, color:tab===t.id?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>{t.label}</button>
        ))}
      </div>
      {tab==="previsao"&&(
        <>
          <Card style={{ background:"#EEF2FF", border:"none" }}>
            <div style={{ ...T.body, fontSize:16, lineHeight:1.7, color:C.navy }}>🛰️ Dados atualizados automaticamente via Open-Meteo. A previsão exata fica disponível quando faltar <strong>até 16 dias</strong> para cada data. Até lá, mostramos a <strong>média histórica</strong> do período (📊) — assim que a previsão real ficar disponível, ela substitui a média automaticamente (🛰️).</div>
          </Card>
          {Object.entries(cityDayMap).map(([cityKey,days])=>{
            const info=WEATHER_CITIES[cityKey]; const cw=weather[cityKey]; const hist=HIST_BY_CITY[cityKey];
            return(
              <Card key={cityKey}>
                <div style={{ ...T.sectionTitle, marginBottom:14 }}>{flag(cityKey)} {info?.name}</div>
                {days.map((di,i)=>{
                  let w=null; if(cw){const idx=cw.time?.indexOf(di.date);if(idx>=0)w={max:cw.temperature_2m_max?.[idx],min:cw.temperature_2m_min?.[idx],code:cw.weathercode?.[idx],precip:cw.precipitation_probability_max?.[idx]};}
                  return(
                    <div key={di.date} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:i<days.length-1?`1px solid ${C.creamD}`:"none" }}>
                      <div><DayBadge day={di.day} /><div style={{ ...T.sub, fontSize:15, marginTop:4 }}>{fmtDate(di.date)}</div></div>
                      {w ? (
                        <div style={{ textAlign:"right" }}>
                          <WxBadge {...w} compact/>
                          <div style={{ fontSize:11, color:C.green, marginTop:3, fontWeight:700 }}>🛰️ Previsão real</div>
                        </div>
                      ) : hist ? (
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:18, color:C.gold, fontWeight:700 }}>{hist.maxC}° / {hist.minC}°</div>
                          <div style={{ fontSize:11, color:"#8D6E63", marginTop:3, fontWeight:700 }}>📊 Média histórica</div>
                        </div>
                      ) : (
                        <span style={{ ...T.sub, fontSize:15, fontStyle:"italic" }}>Em breve…</span>
                      )}
                    </div>
                  );
                })}
              </Card>
            );
          })}
        </>
      )}
      {tab==="historico"&&(
        <>
          <Card style={{ background:"#FFF8E1", border:"1px solid #FFD54F" }}>
            <div style={{ ...T.body, fontSize:16, lineHeight:1.7, color:"#5D4037" }}>📊 Médias históricas reais para o final de outubro e novembro em cada destino. Use para se preparar com a roupa certa.</div>
          </Card>
          {HISTORICAL_CLIMATE.map((h,i)=>(
            <Card key={i}>
              <div style={{ ...T.sectionTitle, marginBottom:4 }}>{h.city}</div>
              <div style={{ ...T.sub, fontSize:15, marginBottom:14 }}>📅 {h.period}</div>
              <div style={{ display:"flex", gap:10, marginBottom:14 }}>
                <div style={{ flex:1, background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:14, padding:"14px 10px", textAlign:"center" }}>
                  <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, fontFamily:"'Cinzel',serif", letterSpacing:1, marginBottom:4 }}>MÁXIMA</div>
                  <div style={{ color:C.goldL, fontSize:32, fontWeight:700, fontFamily:"'Cinzel',serif" }}>{h.maxC}°C</div>
                </div>
                <div style={{ flex:1, background:C.creamD, borderRadius:14, padding:"14px 10px", textAlign:"center" }}>
                  <div style={{ color:C.brownM, fontSize:13, fontFamily:"'Cinzel',serif", letterSpacing:1, marginBottom:4 }}>MÍNIMA</div>
                  <div style={{ color:C.navy, fontSize:32, fontWeight:700, fontFamily:"'Cinzel',serif" }}>{h.minC}°C</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginBottom:14 }}>
                <div style={{ flex:1, background:"#E3F2FD", borderRadius:12, padding:"12px 10px", textAlign:"center" }}><div style={{ fontSize:24, marginBottom:4 }}>🌧️</div><div style={{ fontWeight:700, fontSize:17, color:"#1565C0" }}>{h.rainDays} dias</div><div style={{ fontSize:13, color:"#1565C0" }}>de chuva no mês</div></div>
                <div style={{ flex:1, background:"#F3E5F5", borderRadius:12, padding:"12px 10px", textAlign:"center" }}><div style={{ fontSize:24, marginBottom:4 }}>💧</div><div style={{ fontWeight:700, fontSize:17, color:"#6A1B9A" }}>{h.humidity}</div><div style={{ fontSize:13, color:"#6A1B9A" }}>umidade média</div></div>
              </div>
              <div style={{ ...T.body, fontSize:16, marginBottom:12, lineHeight:1.65 }}>{h.desc}</div>
              <div style={{ background:"#FFFDE7", borderRadius:10, padding:"12px 14px", borderLeft:`4px solid ${C.gold}` }}><div style={{ ...T.body, fontSize:16, lineHeight:1.6 }}>{h.tip}</div></div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: PACOTE
// ═══════════════════════════════════════════════════════════
function PagePacote(){
  const [tab,setTab]=useState("incluso");
  const TABS=[{id:"incluso",label:"✅ Incluso"},{id:"nao",label:"⚠️ Não Incluso"},{id:"voos",label:"✈️ Voos"}];
  const INCLUSO=["Direção espiritual: Frei Edgar Manso e Frei Matheus Morais","Agente de viagem acompanhante desde o Brasil","Ônibus privativo Goiânia → Brasília → Goiânia","Passagem aérea: Brasília ↔ Lisboa / Roma ↔ Brasília","Taxa de embarque","11 noites de hospedagem com café da manhã","Taxas dos hotéis (city taxes)","Transfer aeroportos de Lisboa e Roma","Transfer chegada em Assis + Transfer Assis → Roma","City tour panorâmico em Lisboa","City tour em Fátima + Casa dos Pastorinhos + Procissão das Velas","City tour panorâmico em Roma","Audiência Papal (sujeita à presença do Pontífice e à programação oficial)","Santuários: Fonte Colombo, Della Foresta, Bustone, Greccio","City tour para La Verna e visita a Cássia","Gorjetas (maleteiro e guias)","1 mala 23kg + 1 bordo 10kg + 1 item pessoal","Reserva de convites para a Audiência Papal","Guias acompanhantes em Lisboa, Fátima e Assis","Camiseta personalizada da peregrinação"];
  const NAO=["Seguro Viagem ⚠️ — OBRIGATÓRIO no Espaço Schengen","Despesas com passaporte e documentação","Guias locais e ingressos nos monumentos","Refeições e bebidas não mencionadas no programa","Lavanderia, telefonemas e táxis","Despesas pessoais","Bagagens além das mencionadas no programa"];
  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:14 }}>
        <div style={T.pageTitle}>O Pacote</div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:19, fontWeight:700, color:C.gold, marginTop:4 }}>A partir de R$ 24.993,00 por pessoa</div>
        <div style={{ ...T.sub, fontSize:15, marginTop:4 }}>Entrada R$ 2.405 + 10× R$ 1.963,80 sem juros</div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{ flexShrink:0, padding:"10px 16px", borderRadius:24, border:`2px solid ${tab===t.id?C.gold:C.creamD}`, background:tab===t.id?C.gold:C.white, color:tab===t.id?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>{t.label}</button>)}
      </div>
      {tab==="incluso"&&<Card><SectionLabel>✅ Serviços Inclusos</SectionLabel>{INCLUSO.map((item,i,arr)=><div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}><span style={{ color:C.green, fontSize:20, flexShrink:0, fontWeight:700 }}>✓</span><span style={{ ...T.body, fontSize:17 }}>{item}</span></div>)}</Card>}
      {tab==="nao"&&<Card><SectionLabel>⚠️ Não Incluso</SectionLabel>{NAO.map((item,i,arr)=><div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}><span style={{ color:C.red, fontSize:20, flexShrink:0, fontWeight:700 }}>✗</span><span style={{ ...T.body, fontSize:17 }}>{item}</span></div>)}<div style={{ background:"#FDECEA", borderRadius:12, padding:"16px 14px", marginTop:16, borderLeft:`5px solid ${C.red}` }}><div style={{ fontSize:18, color:C.red, fontWeight:700, marginBottom:6 }}>⚠️ Seguro Viagem é obrigatório!</div><div style={{ ...T.body, fontSize:17 }}>O Espaço Schengen exige comprovação de seguro. Sem ele, pode haver recusa de embarque.</div></div></Card>}
      {tab==="voos"&&<><Card><SectionLabel>✈️ Voos Inclusos</SectionLabel>{[{rota:"Brasília → Lisboa",dia:"30/Out · Dia 1",obs:"Saída de Goiânia de ônibus privativo"},{rota:"Lisboa → Roma",dia:"03/Nov · Dia 5",obs:"Horário de saída do hotel informado pelo guia na noite de 02/11"},{rota:"Roma → Lisboa → Brasília",dia:"12/Nov · Dia 14",obs:"Voo de madrugada (05h55). Chegada prevista em Brasília: 16h40"}].map((f,i,arr)=><div key={i} style={{ padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}><div style={{ ...T.sectionTitle, fontSize:18 }}>✈️ {f.rota}</div><div style={{ color:C.gold, fontSize:16, fontWeight:700, marginTop:4 }}>{f.dia}</div><div style={{ ...T.sub, fontSize:16, marginTop:2 }}>{f.obs}</div></div>)}</Card><Card><SectionLabel>🧳 Bagagem Inclusa</SectionLabel>{["🟢  1 mala despachada — até 23kg","🟢  1 bagagem de bordo — até 10kg","🟢  1 item pessoal — bolsa ou mochila pequena","🔴  Malas extras: não incluso"].map((t,i,arr)=><div key={i} style={{ ...T.body, fontSize:17, padding:"10px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}>{t}</div>)}</Card></>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  LISTA DE HOTÉIS COM ATRAÇÕES PRÓXIMAS (usa dados reais de HOTELS)
// ═══════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════
//  PÁGINA: HOTÉIS (menu próprio, não mais escondido dentro de Pacote)
// ═══════════════════════════════════════════════════════════
function PageHoteis(){
  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:16 }}>
        <div style={T.pageTitle}>Hotéis & Passeios</div>
        <div style={{ ...T.sub, marginTop:4 }}>Endereço de cada hotel, atrações, lugares para comer e farmácia/mercado por perto</div>
      </div>
      <Card style={{ background:"#E8F5E9", border:"1px solid #A5D6A7" }}>
        <div style={{ ...T.body, fontSize:16, lineHeight:1.7, color:C.green }}>
          🎯 Use os botões de categoria para filtrar a lista — sempre ordenada do lugar mais perto para o mais longe do hotel. Toque num item para ver detalhes e depois em "Ver rota a pé".
        </div>
      </Card>
      <HotelListWithNearby />
    </div>
  );
}

function abrirRota(query){
  if (!query) return;
  const destino = encodeURIComponent(query);
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=walking`, "_blank");
}

const CATEGORIAS_CONFIG = {
  atracoes:   { label:"Atrações",  icon:"🎯" },
  comida:     { label:"Comida",    icon:"🍽️" },
  utilidades: { label:"Farmácia/Mercado", icon:"💊" },
};

function HotelListWithNearby(){
  const [aberto, setAberto] = useState(null);
  const [filtro, setFiltro] = useState({}); // { [hi]: "atracoes" | "comida" | "utilidades" }

  return (
    <>
      {HOTELS.map((h, hi) => {
        // Categorias disponíveis para este hotel (só mostra filtro se tiver dados)
        const categoriasDisponiveis = Object.keys(CATEGORIAS_CONFIG).filter(cat => (h[cat]?.length || 0) > 0);
        const filtroAtual = categoriasDisponiveis.includes(filtro[hi]) ? filtro[hi] : categoriasDisponiveis[0];
        const lista = h[filtroAtual] || [];
        // Sempre ordenado do mais perto para o mais longe
        const listaOrdenada = [...lista].sort((a,b) => a.min - b.min);

        return (
          <Card key={hi}>
            <div style={{ ...T.sectionTitle, marginBottom:4 }}>{h.icon} {h.city}</div>
            <div style={{ display:"flex", gap:8, marginBottom:10, marginTop:8, flexWrap:"wrap" }}>
              <span style={{ background:C.gold, color:C.white, borderRadius:20, padding:"5px 14px", fontSize:14, fontFamily:"'Cinzel',serif", fontWeight:700 }}>
                {fmtDate(h.checkIn)} – {fmtDate(h.checkOut)}
              </span>
            </div>
            <div style={{ ...T.body, fontSize:17, fontWeight:700, color:C.navy }}>{h.name}</div>
            <div style={{ ...T.sub, fontSize:15, marginTop:3 }}>📍 {h.address}</div>

            {h.mapsQuery ? (
              <button
                onClick={() => abrirRota(h.mapsQuery)}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:12, width:"100%", background:C.navy, color:"white", border:"none", borderRadius:12, padding:"13px", fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, cursor:"pointer" }}
              >
                🗺️ Traçar rota até o hotel
              </button>
            ) : (
              <div style={{ background:C.creamD, borderRadius:10, padding:"10px 12px", marginTop:12, fontSize:14, color:C.brownM, fontStyle:"italic" }}>
                Endereço ainda não confirmado pela agência.
              </div>
            )}

            {/* Passeio noturno sugerido pelo hotel, se houver */}
            {h.nightWalk && (
              <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:14, padding:"16px 14px", marginTop:16 }}>
                <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, marginBottom:12 }}>✨ {h.nightWalk.titulo}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  {h.nightWalk.passos.map((p,i,arr) => (
                    <div key={i}>
                      <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:10, padding:"9px 12px", color:"white", fontSize:15, fontWeight:600 }}>{p}</div>
                      {i<arr.length-1 && <div style={{ textAlign:"center", color:C.goldL, fontSize:16, padding:"2px 0" }}>⬇️</div>}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:12, background:"rgba(232,168,32,0.15)", borderRadius:10, padding:"10px 12px", fontSize:14, color:"rgba(255,255,255,0.85)", lineHeight:1.6 }}>
                  💡 {h.nightWalk.aviso}
                </div>
              </div>
            )}

            {categoriasDisponiveis.length > 0 && (
              <>
                {/* Filtros por categoria (dinâmico) */}
                <div style={{ display:"flex", gap:8, marginTop:18, marginBottom:14, flexWrap:"wrap" }}>
                  {categoriasDisponiveis.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFiltro(prev => ({ ...prev, [hi]: cat }))}
                      style={{ flex:"1 1 auto", minWidth:100, padding:"11px 8px", borderRadius:14, border:`2px solid ${filtroAtual===cat?C.gold:C.creamD}`, background:filtroAtual===cat?C.gold:C.white, color:filtroAtual===cat?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, cursor:"pointer" }}
                    >
                      {CATEGORIAS_CONFIG[cat].icon} {CATEGORIAS_CONFIG[cat].label} ({h[cat].length})
                    </button>
                  ))}
                </div>

                <div style={{ ...T.sub, fontSize:13, marginBottom:10, textAlign:"center" }}>
                  Ordenado do mais perto para o mais longe 🚶
                </div>

                {listaOrdenada.map((n, ni) => {
                  const key = `${hi}-${filtroAtual}-${ni}`;
                  const open = aberto === key;
                  return (
                    <div key={ni} onClick={()=>setAberto(open?null:key)} style={{ borderRadius:12, border:`1.5px solid ${open?C.gold:C.creamD}`, marginBottom:8, overflow:"hidden", cursor:"pointer" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", background:open?C.creamD:C.white }}>
                        <div style={{ display:"flex", gap:10, alignItems:"center", flex:1 }}>
                          <span style={{ fontSize:22, flexShrink:0 }}>{n.icon}</span>
                          <div>
                            <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:C.navy }}>{n.nome}</div>
                            <div style={{ fontSize:13, color:C.brownM, marginTop:2, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                              <span>🚶 {n.min} min a pé</span>
                              {n.tipo && <span>· {n.tipo}</span>}
                              {n.nota && <span>· ⭐ {n.nota}</span>}
                            </div>
                          </div>
                        </div>
                        <span style={{ color:C.gold, fontSize:16, fontWeight:700, flexShrink:0 }}>{open?"▲":"▼"}</span>
                      </div>
                      {open && (
                        <div style={{ padding:"12px 14px", background:"#FFFDF8", borderTop:`1px solid ${C.creamD}` }}>
                          <div style={{ ...T.body, fontSize:15, lineHeight:1.65, marginBottom:12 }}>{n.desc}</div>
                          <div style={{ display:"flex", gap:8 }}>
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(n.query)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e=>e.stopPropagation()}
                              style={{ flex:1, textAlign:"center", background:C.creamD, color:C.brownM, borderRadius:10, padding:"10px", textDecoration:"none", fontSize:14, fontWeight:700, fontFamily:"'Cinzel',serif" }}
                            >
                              ℹ️ Saiba mais
                            </a>
                            <button
                              onClick={e=>{ e.stopPropagation(); abrirRota(n.query || (n.nome + " " + (h.city||""))); }}
                              style={{ flex:1, background:C.navy, color:"white", border:"none", borderRadius:10, padding:"10px", fontSize:14, fontWeight:700, fontFamily:"'Cinzel',serif", cursor:"pointer" }}
                            >
                              🗺️ Ver rota a pé
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </Card>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: VOOS
// ═══════════════════════════════════════════════════════════
function PageVoos(){
  const [expandido, setExpandido] = useState(null);

  const VOOS = [
    {
      num:1, icon:"🛫", voo:"TP 58",
      trecho:"Brasília → Lisboa",
      origem:  { code:"BSB", name:"Brasília J. Kubitschek Intl", terminal:"Terminal 1" },
      destino: { code:"LIS", name:"Lisboa Lisbon Airport",       terminal:"Terminal 1" },
      partida: { data:"30 Out 2026", hora:"18:30" },
      chegada: { data:"31 Out 2026", hora:"06:40" },
      embarque:"17:30",   // portões fecham 1h antes — voo internacional longo
      chegarAeroporto:"15:30",  // 3h antes — internacional com despacho de bagagem
      aviao:"Airbus A330-900 (339)", classe:"G — Econômica", duracao:"~10h10",
      alerta:"Voo internacional longo (noite). Chegue ao aeroporto às 15h30 — 3 horas antes.",
    },
    {
      num:2, icon:"✈️", voo:"TP 834",
      trecho:"Lisboa → Roma",
      origem:  { code:"LIS", name:"Lisboa Lisbon Airport", terminal:"Terminal 1" },
      destino: { code:"FCO", name:"Roma Fiumicino",        terminal:"Terminal 1" },
      partida: { data:"03 Nov 2026", hora:"11:45" },
      chegada: { data:"03 Nov 2026", hora:"15:50" },
      embarque:"11:00",
      chegarAeroporto:"09:45", // 2h antes — europeu com passaporte fora da UE
      aviao:"Airbus 321", classe:"G — Econômica", duracao:"~2h05",
      alerta:"Voo europeu. Chegue ao aeroporto às 09h45 — 2 horas antes. Lembre do controle de segurança.",
    },
    {
      num:3, icon:"✈️", voo:"TP 839",
      trecho:"Roma → Lisboa",
      origem:  { code:"FCO", name:"Roma Fiumicino",        terminal:"Terminal 1" },
      destino: { code:"LIS", name:"Lisboa Lisbon Airport", terminal:"Terminal 1" },
      partida: { data:"12 Nov 2026", hora:"05:55" },
      chegada: { data:"12 Nov 2026", hora:"08:10" },
      embarque:"05:15",
      chegarAeroporto:"03:55", // 2h antes — madrugada!
      aviao:"Airbus 321", classe:"G — Econômica", duracao:"~2h15",
      conexao:{ local:"Lisboa (LIS)", duracao:"1h45", proximoVoo:"09:55" },
      alerta:"⚠️ VOO DE MADRUGADA! Partida às 05:55. É preciso estar no aeroporto às 03h55. Combinar transfer com a agência na véspera.",
      alertaUrgente: true,
    },
    {
      num:4, icon:"🛬", voo:"TP 57",
      trecho:"Lisboa → Brasília",
      origem:  { code:"LIS", name:"Lisboa Lisbon Airport",       terminal:"Terminal 1" },
      destino: { code:"BSB", name:"Brasília J. Kubitschek Intl", terminal:"—" },
      partida: { data:"12 Nov 2026", hora:"09:55" },
      chegada: { data:"12 Nov 2026", hora:"16:45" },
      embarque:"09:15",
      chegarAeroporto:"Vindo da conexão — já estão no aeroporto",
      aviao:"Airbus A330-900 (339)", classe:"G — Econômica", duracao:"~8h50",
      alerta:"Conexão de 1h45 em Lisboa. Ao desembarcar do TP 839, siga direto ao portão do TP 57.",
    },
  ];

  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:16 }}>
        <div style={T.pageTitle}>Voos</div>
        <div style={{ ...T.sub, marginTop:4 }}>TAP Air Portugal · Localizador: ZRFUUD</div>
      </div>

      {/* Passageiros e localizador */}
      <Card>
        <SectionLabel>👥 Passageiros</SectionLabel>
        {[
          { nome:"Mary Ruth Rodrigues Jacobina", bilhete:"047 9293397805" },
          { nome:"Jason Jose Percilio",          bilhete:"047 9293397804" },
        ].map((p,i,arr)=>(
          <div key={i} style={{ display:"flex", gap:12, padding:"12px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"center" }}>
            <span style={{ fontSize:26 }}>👤</span>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:C.navy }}>{p.nome}</div>
              <div style={{ ...T.sub, fontSize:14, marginTop:2 }}>Bilhete: {p.bilhete}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop:12, background:C.creamD, borderRadius:12, padding:"12px 14px", display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ fontSize:22 }}>🔑</span>
          <div>
            <div style={{ fontSize:14, color:C.brownM }}>Localizador de reserva</div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:22, fontWeight:700, color:C.navy, letterSpacing:2 }}>ZRFUUD</div>
          </div>
        </div>
      </Card>

      {/* Resumo visual da rota */}
      <Card>
        <SectionLabel>🗺️ Rota completa</SectionLabel>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, flexWrap:"wrap", padding:"8px 0" }}>
          {["BSB","LIS","FCO","LIS","BSB"].map((code,i,arr)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ background: i===0||i===arr.length-1 ? C.navy : C.gold, color:C.white, borderRadius:8, padding:"6px 10px", fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700 }}>{code}</div>
              {i<arr.length-1 && <span style={{ color:C.brownM, fontSize:14 }}>→</span>}
            </div>
          ))}
        </div>
        <div style={{ ...T.sub, fontSize:14, textAlign:"center", marginTop:8 }}>30 Out · 03 Nov · 12 Nov · 12 Nov · 12 Nov</div>
      </Card>

      {/* Cards dos voos */}
      {VOOS.map((v,i)=>{
        const open = expandido === i;
        return(
          <div key={i}>
            <div onClick={()=>setExpandido(open?null:i)} style={{ background:C.white, borderRadius:18, padding:"18px 16px", marginBottom:v.conexao?0:14, boxShadow:"0 3px 18px rgba(0,0,0,0.09)", border:`2px solid ${open?C.gold:C.creamD}`, cursor:"pointer" }}>
              {/* Cabeçalho */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                    <span style={{ background:C.gold, color:C.white, borderRadius:20, padding:"3px 12px", fontSize:13, fontFamily:"'Cinzel',serif", fontWeight:700 }}>Voo {v.num} de 4</span>
                    <span style={{ ...T.sub, fontSize:14 }}>{v.voo}</span>
                  </div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:18, fontWeight:700, color:C.navy }}>{v.trecho}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:30 }}>{v.icon}</span>
                  <span style={{ color:C.gold, fontSize:18, fontWeight:700 }}>{open?"▲":"▼"}</span>
                </div>
              </div>

              {/* Horários — sempre visíveis */}
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ flex:1, background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
                  <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, fontFamily:"'Cinzel',serif", letterSpacing:1 }}>PARTIDA</div>
                  <div style={{ color:C.goldL, fontSize:26, fontWeight:700, fontFamily:"'Cinzel',serif", lineHeight:1.1 }}>{v.partida.hora}</div>
                  <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13, marginTop:2 }}>{v.partida.data}</div>
                  <div style={{ color:C.goldL, fontSize:16, fontWeight:700, marginTop:4 }}>{v.origem.code}</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:11, color:C.brownM, marginBottom:2 }}>{v.duracao}</div>
                  <div style={{ fontSize:20, color:C.creamD, fontWeight:700 }}>→</div>
                </div>
                <div style={{ flex:1, background:C.creamD, borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
                  <div style={{ color:C.brownM, fontSize:11, fontFamily:"'Cinzel',serif", letterSpacing:1 }}>CHEGADA</div>
                  <div style={{ color:C.navy, fontSize:26, fontWeight:700, fontFamily:"'Cinzel',serif", lineHeight:1.1 }}>{v.chegada.hora}</div>
                  <div style={{ color:C.brownM, fontSize:13, marginTop:2 }}>{v.chegada.data}</div>
                  <div style={{ color:C.navy, fontSize:16, fontWeight:700, marginTop:4 }}>{v.destino.code}</div>
                </div>
              </div>

              {/* Linha do tempo: chegada ao aeroporto → embarque → decolagem */}
              <div style={{ marginTop:14, background: v.alertaUrgente?"#FDECEA":"#EEF2FF", borderRadius:12, padding:"12px 14px", border:`1.5px solid ${v.alertaUrgente?C.red:"#7986CB"}` }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color: v.alertaUrgente?C.red:"#3949AB", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>
                  {v.alertaUrgente?"⚠️ Atenção especial":"🕐 Horários importantes"}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:0 }}>
                  {/* Aeroporto */}
                  <div style={{ textAlign:"center", flex:1 }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>🏢</div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color: v.alertaUrgente?C.red:"#1A237E" }}>{v.chegarAeroporto}</div>
                    <div style={{ fontSize:11, color: v.alertaUrgente?C.red:"#3949AB", marginTop:2, lineHeight:1.4 }}>Chegar ao{"\n"}aeroporto</div>
                  </div>
                  <div style={{ color:C.brownM, fontSize:16, flex:"0 0 auto", paddingBottom:16 }}>→</div>
                  {/* Embarque */}
                  <div style={{ textAlign:"center", flex:1 }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>🚪</div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color: v.alertaUrgente?C.red:"#1A237E" }}>{v.embarque}</div>
                    <div style={{ fontSize:11, color: v.alertaUrgente?C.red:"#3949AB", marginTop:2, lineHeight:1.4 }}>Início do{"\n"}embarque</div>
                  </div>
                  <div style={{ color:C.brownM, fontSize:16, flex:"0 0 auto", paddingBottom:16 }}>→</div>
                  {/* Decolagem */}
                  <div style={{ textAlign:"center", flex:1 }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>{v.icon}</div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color: v.alertaUrgente?C.red:"#1A237E" }}>{v.partida.hora}</div>
                    <div style={{ fontSize:11, color: v.alertaUrgente?C.red:"#3949AB", marginTop:2, lineHeight:1.4 }}>Decolagem</div>
                  </div>
                </div>
                {/* Alerta textual */}
                <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${v.alertaUrgente?"rgba(183,28,28,0.3)":"rgba(57,73,171,0.2)"}`, fontSize:14, color:v.alertaUrgente?C.red:"#283593", lineHeight:1.65, fontWeight: v.alertaUrgente?600:400 }}>
                  {v.alerta}
                </div>
              </div>

              {/* Detalhes expandidos */}
              {open && (
                <div style={{ marginTop:14 }}>
                  {[
                    { label:"Origem",   value:`${v.origem.name} · ${v.origem.terminal}` },
                    { label:"Destino",  value:`${v.destino.name} · ${v.destino.terminal}` },
                    { label:"Aeronave", value:v.aviao },
                    { label:"Classe",   value:v.classe },
                  ].map((d,di,darr)=>(
                    <div key={di} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:di<darr.length-1?`1px solid ${C.creamD}`:"none" }}>
                      <span style={{ ...T.label, fontSize:11, minWidth:64, paddingTop:2 }}>{d.label}</span>
                      <span style={{ ...T.body, fontSize:16, flex:1 }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bloco de conexão entre voo 3 e 4 */}
            {v.conexao && (
              <div style={{ background:"#FFF8E1", borderRadius:14, padding:"14px 16px", margin:"0 0 14px 0", border:"1px solid #FFD54F", display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:28, flexShrink:0 }}>🔄</span>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:"#5D4037", marginBottom:4 }}>Conexão em {v.conexao.local}</div>
                  <div style={{ ...T.body, fontSize:16, color:"#5D4037", lineHeight:1.65 }}>
                    Duração: <strong>{v.conexao.duracao}</strong> · Próximo voo às <strong>{v.conexao.proximoVoo}</strong>
                  </div>
                  <div style={{ fontSize:14, color:"#B71C1C", marginTop:6, fontWeight:600 }}>
                    ⚠️ Tempo curto — ao desembarcar, siga direto para o portão do próximo voo.
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Bagagem despachada */}
      <Card>
        <SectionLabel>💼 Bagagem Despachada — por passageiro</SectionLabel>
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <div style={{ flex:1, background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, fontFamily:"'Cinzel',serif", letterSpacing:1 }}>PESO MÁXIMO</div>
            <div style={{ color:C.goldL, fontSize:26, fontWeight:700, fontFamily:"'Cinzel',serif" }}>23 kg</div>
          </div>
          <div style={{ flex:1, background:C.creamD, borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
            <div style={{ color:C.brownM, fontSize:11, fontFamily:"'Cinzel',serif", letterSpacing:1 }}>DIMENSÃO MÁXIMA</div>
            <div style={{ color:C.navy, fontSize:22, fontWeight:700, fontFamily:"'Cinzel',serif" }}>158 cm</div>
            <div style={{ color:C.brownM, fontSize:12, marginTop:2 }}>altura + largura + comprimento</div>
          </div>
        </div>

        <div style={{ fontSize:13, fontWeight:700, color:C.green, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>✅ Pode ir na mala despachada</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
          {["👕 Roupas e casacos","👟 Calçados","🧴 Higiene pessoal","💄 Cosméticos e líquidos (dentro das regras)","☂️ Guarda-chuva","📚 Livros e objetos pessoais","🎁 Presentes e lembranças"].map((t,i)=>(
            <span key={i} style={{ background:"#E8F5E9", borderRadius:20, padding:"6px 12px", fontSize:14, color:C.green, fontWeight:600 }}>{t}</span>
          ))}
        </div>

        <div style={{ background:"#FDECEA", borderRadius:12, padding:"14px", borderLeft:`4px solid ${C.red}` }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.red, marginBottom:8 }}>⚠️ NUNCA coloque na mala despachada:</div>
          {["Passaporte e documentos","Dinheiro e cartões","Joias e objetos de valor","Medicamentos essenciais","Power banks / baterias externas","Cigarros eletrônicos","Itens perigosos ou proibidos"].map((t,i,arr)=>(
            <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", fontSize:15, color:C.brown }}>
              <span style={{ color:C.red, fontWeight:700 }}>✗</span>{t}
            </div>
          ))}
        </div>
      </Card>

      {/* Bagagem de mão + item pessoal */}
      <Card>
        <SectionLabel>🎒 Bagagem de Mão + Item Pessoal</SectionLabel>
        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          <div style={{ flex:1, background:C.creamD, borderRadius:14, padding:"14px 12px" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:C.navy, marginBottom:6 }}>🧳 1 Bagagem de mão</div>
            <div style={{ fontSize:22, fontWeight:700, color:C.gold, fontFamily:"'Cinzel',serif" }}>até 10 kg</div>
            <div style={{ fontSize:13, color:C.brownM, marginTop:6, lineHeight:1.5 }}>Medidas: 55 × 40 × 25 cm<br/>(altura × largura × profundidade)</div>
          </div>
          <div style={{ flex:1, background:C.creamD, borderRadius:14, padding:"14px 12px" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:C.navy, marginBottom:6 }}>🎒 1 Item pessoal</div>
            <div style={{ fontSize:22, fontWeight:700, color:C.gold, fontFamily:"'Cinzel',serif" }}>até 2 kg</div>
            <div style={{ fontSize:13, color:C.brownM, marginTop:6, lineHeight:1.5 }}>Medidas: 40 × 30 × 15 cm<br/>Bolsa, mochila ou pasta que caiba embaixo do assento</div>
          </div>
        </div>
        <div style={{ background:"#E3F2FD", borderRadius:12, padding:"14px" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#1565C0", marginBottom:8 }}>💡 Lembre-se:</div>
          {["Documentos, dinheiro e medicamentos essenciais ficam sempre com você — na bagagem de mão ou item pessoal","Verifique as regras específicas da companhia aérea antes de embarcar","Em voos internacionais as medidas e o peso podem variar"].map((t,i)=>(
            <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", fontSize:15, color:"#1565C0" }}>
              <span>✓</span>{t}
            </div>
          ))}
        </div>
      </Card>

      {/* Líquidos na bagagem de bordo */}
      <Card>
        <SectionLabel>🧴 Líquidos na Bagagem de Bordo</SectionLabel>
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:14, padding:"16px", textAlign:"center", marginBottom:14 }}>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontFamily:"'Cinzel',serif", letterSpacing:1 }}>FRASCOS DE ATÉ</div>
          <div style={{ color:C.goldL, fontSize:32, fontWeight:700, fontFamily:"'Cinzel',serif" }}>100 ml cada</div>
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
          {["🧴 Shampoo","🧴 Condicionador","🧴 Creme","🌸 Perfume","☀️ Protetor solar","🧴 Gel","🦷 Pasta de dente","🧼 Líquidos de higiene"].map((t,i)=>(
            <span key={i} style={{ background:C.creamD, borderRadius:20, padding:"6px 12px", fontSize:14, color:C.brownM, fontWeight:600 }}>{t}</span>
          ))}
        </div>

        <div style={{ background:"#FFF8E1", borderRadius:12, padding:"14px", borderLeft:`4px solid ${C.gold}` }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#5D4037", marginBottom:6 }}>⚠️ Atenção</div>
          <div style={{ fontSize:15, color:"#5D4037", lineHeight:1.65 }}>
            Os líquidos devem estar acondicionados em embalagem transparente e seguir as regras de segurança da companhia aérea. As regras podem variar conforme o aeroporto, país e companhia.
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  DADOS DAS SALAS VIP E RESTAURANTES
// ═══════════════════════════════════════════════════════════
const LOUNGES = [
  {
    code:"BSB", airport:"Brasília (BSB)", city:"Brasília, Brasil 🇧🇷",
    role:"Embarque direto para Lisboa (30/Out) — voo não passa por São Paulo",
    salas:[
      { nome:"Aeroportos VIP Club (Internacional)", horario:"24 horas",      local:"Terminal 1 · Partidas internacionais · Lado ar · Nível do solo · Após controle de passaporte e segurança, vire à esquerda na Duty Free. Recomendada — é a sala do lado do embarque internacional, o do voo para Lisboa." },
      { nome:"Aeroportos VIP Club (Doméstico)",     horario:"24 horas",      local:"Terminal 1 · Partidas domésticas · Lado ar · Nível 2" },
      { nome:"VIP Express Club Pier Norte",         horario:"06h00 às 22h00", local:"Terminal 1 · Embarque doméstico · Lado ar · Nível 2" },
      { nome:"VIP Express Club Pier Sul",           horario:"06h00 às 22h00", local:"Terminal 1 · Embarque doméstico" },
    ],
    restaurantes:[
      { nome:"Living Heineken — Estacionamento", horario:"Consultar no app", local:"No estacionamento do aeroporto, em frente à entrada principal." },
      { nome:"Living Heineken — Embarque (lado 1)", horario:"Consultar no app", local:"Dentro do salão de embarque, de um dos lados." },
      { nome:"Living Heineken — Embarque (lado 2)", horario:"Consultar no app", local:"Dentro do salão de embarque, do outro lado." },
    ],
  },
  {
    code:"LIS", airport:"Lisboa (LIS)", city:"Lisboa, Portugal 🇵🇹",
    role:"Chegada (31/Out) · Partida para Roma (03/Nov)",
    salas:[
      { nome:"ANA Lounge", horario:"04h00 às 22h00", local:"Terminal 1 · Lado ar · 6º andar · Acima da nova área comercial" },
    ],
    restaurantes:[],
  },
  {
    code:"FCO", airport:"Roma Fiumicino (FCO)", city:"Roma, Itália 🇮🇹",
    role:"Chegada (03/Nov) · Partida para o Brasil (11/Nov)",
    salas:[
      { nome:"Plaza Premium Lounge",      horario:"04h30 às 21h30", local:"Terminal 1 · Lado ar · Mezanino" },
      { nome:"Prima Vista Lounge",        horario:"05h15 às 21h45", local:"Terminal 1 · Lado ar · Piso Mezanino" },
      { nome:"Primeclass Lounge",         horario:"05h30 às 22h00", local:"Terminal 1 · Lado ar · Piso 1 · Área de embarque A · Portões 61–83" },
      { nome:"Plaza Premium Lounge",      horario:"05h00 às 22h30", local:"Terminal 3 · Lado ar · Próximo portões E1–E44 · Subir 1 andar pela escada rolante perto de E1–E4 · Ao lado da British Airways" },
      { nome:"Prima Vista Lounge Portus", horario:"05h45 às 22h45", local:"Terminal 3 · Lado ar · Level 1 · Área de trânsito perto dos portões E51–E61" },
    ],
    restaurantes:[],
  },
];

// ═══════════════════════════════════════════════════════════
//  PÁGINA: SALAS VIP
// ═══════════════════════════════════════════════════════════
function PageSalasVip(){
  const [aberto, setAberto] = useState(null);
  const [aba, setAba]       = useState("salas");

  // Todos os restaurantes (apenas BSB tem por ora)
  const todosRestaurantes = LOUNGES.filter(ap => ap.restaurantes.length > 0);

  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:16 }}>
        <div style={T.pageTitle}>Salas VIP</div>
        <div style={{ ...T.sub, marginTop:4 }}>Acesso nos aeroportos da rota</div>
      </div>

      {/* Card do cartão — Mary (titular) */}
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"22px 18px", border:`2px solid ${C.gold}`, marginBottom:16 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:18, fontWeight:700, marginBottom:14 }}>
          💳 Cartão — Mary (Titular)
        </div>
        <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"16px 14px" }}>
          <div style={{ color:C.white, fontSize:17, fontWeight:700, marginBottom:6 }}>Ourocard Visa Infinite — Banco do Brasil</div>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:16, lineHeight:1.7 }}>
            Programa: <strong style={{ color:C.goldL }}>Visa Airport Companion</strong> (DragonPass)
          </div>
          <div style={{ marginTop:10, background:"rgba(232,168,32,0.2)", borderRadius:10, padding:"12px 14px", border:`1px solid ${C.gold}` }}>
            <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontSize:17, fontWeight:700 }}>🎟️ 4 acessos gratuitos por ano</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:15, marginTop:4 }}>Nunca utilizados — 4 acessos disponíveis</div>
          </div>
          <div style={{ marginTop:10, background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ color:"rgba(255,255,255,0.8)", fontSize:15, lineHeight:1.7 }}>
              📱 Baixe o app <strong>Visa Airport Companion</strong> (iOS ou Android), cadastre o cartão e apresente o QR Code na entrada da sala.
            </div>
          </div>
        </div>
      </div>

      {/* Card do cartão — Jason (adicional) */}
      <div style={{ background:"linear-gradient(150deg,#4A148C,#6A1B9A)", borderRadius:20, padding:"22px 18px", border:`2px solid ${C.gold}`, marginBottom:16 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:18, fontWeight:700, marginBottom:14 }}>
          💳 Cartão — Jason (Adicional)
        </div>
        <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"16px 14px" }}>
          <div style={{ color:C.white, fontSize:17, fontWeight:700, marginBottom:6 }}>Ourocard Visa Infinite — adicional da Mary</div>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:16, lineHeight:1.7 }}>
            Mesmo programa: <strong style={{ color:C.goldL }}>Visa Airport Companion</strong> (DragonPass)
          </div>
          <div style={{ marginTop:10, background:"rgba(232,168,32,0.2)", borderRadius:10, padding:"12px 14px", border:`1px solid ${C.gold}` }}>
            <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontSize:17, fontWeight:700 }}>🎟️ 4 acessos gratuitos por ano</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:15, marginTop:4 }}>Próprios do cartão adicional — não dividem os acessos da Mary</div>
          </div>
          <div style={{ marginTop:10, background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ color:"rgba(255,255,255,0.8)", fontSize:15, lineHeight:1.7 }}>
              📱 Baixe o app <strong>Visa Airport Companion</strong>, cadastre o cartão adicional dele e apresente o QR Code próprio na entrada da sala.
            </div>
          </div>
        </div>
      </div>

      {/* Dica */}
      <Card style={{ background:"#E8F5E9", border:`1px solid #A5D6A7` }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:C.green, marginBottom:8 }}>💡 Como aproveitar os 8 acessos (4 + 4)</div>
        <div style={{ ...T.body, fontSize:16, lineHeight:1.75 }}>
          Mary e Jason têm 4 acessos cada um, no total 8 entre os dois. Com 3 aeroportos na rota (BSB, LIS, FCO), dá para usar algumas entradas em <strong>Brasília</strong> antes do voo de ida e o restante em <strong>Roma</strong> na volta — onde há 5 opções de sala.
        </div>
      </Card>

      {/* Abas: Salas / Restaurantes */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <button onClick={()=>setAba("salas")} style={{ flex:1, padding:"12px 8px", borderRadius:14, border:`2px solid ${aba==="salas"?C.gold:C.creamD}`, background:aba==="salas"?C.gold:C.white, color:aba==="salas"?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
          🛋️ Salas VIP
        </button>
        <button onClick={()=>setAba("restaurantes")} style={{ flex:1, padding:"12px 8px", borderRadius:14, border:`2px solid ${aba==="restaurantes"?C.gold:C.creamD}`, background:aba==="restaurantes"?C.gold:C.white, color:aba==="restaurantes"?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
          🍽️ Restaurantes
        </button>
      </div>

      {/* ABA: SALAS VIP */}
      {aba === "salas" && LOUNGES.map((ap, ai) => (
        <Card key={ai}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
            <span style={{ background:C.navy, color:C.goldL, borderRadius:8, padding:"4px 12px", fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700 }}>{ap.code}</span>
            <div style={{ ...T.sectionTitle, fontSize:18 }}>{ap.airport}</div>
          </div>
          <div style={{ ...T.sub, fontSize:15, marginBottom:2 }}>{ap.city}</div>
          <div style={{ color:C.gold, fontSize:15, fontWeight:700, marginBottom:14 }}>{ap.role}</div>

          {ap.salas.map((sala, si) => {
            const key = `s-${ai}-${si}`;
            const open = aberto === key;
            return (
              <div key={si} onClick={()=>setAberto(open?null:key)} style={{ borderRadius:12, border:`1.5px solid ${open?C.gold:C.creamD}`, marginBottom:8, overflow:"hidden", cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 14px", background:open?C.creamD:C.white }}>
                  <div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:C.navy }}>{sala.nome}</div>
                    <div style={{ fontSize:14, color:C.brownM, marginTop:3 }}>🕐 {sala.horario}</div>
                  </div>
                  <span style={{ color:C.gold, fontSize:18, fontWeight:700, flexShrink:0 }}>{open?"▲":"▼"}</span>
                </div>
                {open && (
                  <div style={{ padding:"12px 14px", background:"#FFFDF8", borderTop:`1px solid ${C.creamD}` }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.gold, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>📍 Localização</div>
                    <div style={{ ...T.body, fontSize:16, lineHeight:1.75 }}>{sala.local}</div>
                  </div>
                )}
              </div>
            );
          })}
        </Card>
      ))}

      {/* ABA: RESTAURANTES */}
      {aba === "restaurantes" && (
        <>
          <Card style={{ background:"#FFF8E1", border:"1px solid #FFD54F" }}>
            <div style={{ ...T.body, fontSize:16, lineHeight:1.75, color:"#5D4037" }}>
              🍽️ Restaurantes disponíveis pelo programa <strong>Visa Airport Companion</strong> (DragonPass) nos aeroportos da rota. Por ora mapeados apenas em <strong>Brasília (BSB)</strong> — há 3 unidades da Living Heineken no aeroporto, qualquer uma delas aceita a promoção: desconto de USD 32 (deduz 1 visita) ou 1L de chope grátis na compra de 1L + 20% off em comidas e bebidas.
            </div>
          </Card>

          {todosRestaurantes.map((ap, ai) => (
            <Card key={ai}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                <span style={{ background:C.navy, color:C.goldL, borderRadius:8, padding:"4px 12px", fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700 }}>{ap.code}</span>
                <div style={{ ...T.sectionTitle, fontSize:18 }}>{ap.airport}</div>
              </div>
              <div style={{ ...T.sub, fontSize:15, marginBottom:14 }}>{ap.city}</div>

              {ap.restaurantes.map((rest, ri) => {
                const key = `r-${ai}-${ri}`;
                const open = aberto === key;
                return (
                  <div key={ri} onClick={()=>setAberto(open?null:key)} style={{ borderRadius:12, border:`1.5px solid ${open?C.gold:C.creamD}`, marginBottom:8, overflow:"hidden", cursor:"pointer" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 14px", background:open?C.creamD:C.white }}>
                      <div>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:C.navy }}>{rest.nome}</div>
                        <div style={{ fontSize:14, color:C.brownM, marginTop:3 }}>🕐 {rest.horario}</div>
                      </div>
                      <span style={{ color:C.gold, fontSize:18, fontWeight:700, flexShrink:0 }}>{open?"▲":"▼"}</span>
                    </div>
                    {open && (
                      <div style={{ padding:"12px 14px", background:"#FFFDF8", borderTop:`1px solid ${C.creamD}` }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.gold, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>📍 Localização</div>
                        <div style={{ ...T.body, fontSize:16, lineHeight:1.75 }}>{rest.local}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </Card>
          ))}
        </>
      )}

      <Card style={{ background:C.creamD, border:"none", textAlign:"center" }}>
        <div style={{ ...T.body, fontSize:15, lineHeight:1.75 }}>
          ℹ️ Confirme disponibilidade no app <strong>Visa Airport Companion</strong> antes de cada voo.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: SEGURO VIAGEM
// ═══════════════════════════════════════════════════════════
function PageSeguro(){
  const [pessoa, setPessoa] = useState("mary");

  const COBERTURAS_MARY = [
    { icon:"🏥", titulo:"Despesas médicas e hospitalares",       valor:"US$ 175.000", detalhe:"Acidentes ou doenças súbitas, incluindo COVID-19 e SARS-CoV-2. Cobre hospitalização, cirurgias e tratamentos." },
    { icon:"🦷", titulo:"Despesas odontológicas",                valor:"US$ 7.500",   detalhe:"Atendimento odontológico de emergência durante a viagem." },
    { icon:"🚑", titulo:"Regresso Sanitário (Repatriação Médica)",valor:"US$ 100.000", detalhe:"Transporte médico de volta ao Brasil caso necessário por razões de saúde." },
    { icon:"✈️", titulo:"Translado Médico (Remoção Médica)",     valor:"US$ 100.000", detalhe:"Transporte para outro local/hospital mais adequado ao tratamento." },
    { icon:"⚰️", titulo:"Translado de Corpo (Repatriação Funerária)", valor:"US$ 100.000", detalhe:"Despesas de transporte funerário de volta ao Brasil." },
    { icon:"🏠", titulo:"Retorno antecipado da pessoa elegível", valor:"US$ 30.000",  detalhe:"Retorno ao Brasil por emergência familiar ou hospitalar." },
    { icon:"🏨", titulo:"Prorrogação de estadia",                valor:"US$ 2.000",   detalhe:"Extensão da hospedagem em caso de impossibilidade de retorno." },
    { icon:"👥", titulo:"Acompanhante em hospitalização",        valor:"US$ 12.000",  detalhe:"Despesas de um acompanhante em caso de hospitalização prolongada." },
    { icon:"💵", titulo:"Benefício em dinheiro — internação",    valor:"US$ 6.000",   detalhe:"Auxílio financeiro diário para paciente internado." },
    { icon:"💺", titulo:"Retorno em classe executiva",           valor:"US$ 7.500",   detalhe:"Upgrade de retorno por necessidade médica documentada." },
    { icon:"🐾", titulo:"Hospedagem de pet",                     valor:"US$ 650",     detalhe:"Despesas de canil ou hospedagem do animal em caso de hospitalização." },
    { icon:"🚕", titulo:"Transporte VIP",                        valor:"US$ 2.500",   detalhe:"Transporte especial por necessidade médica durante a viagem." },
    { icon:"🩹", titulo:"Despesas complementares — acidente",    valor:"US$ 300",     detalhe:"Despesas adicionais em caso de acidente." },
    { icon:"🧳", titulo:"Atraso de bagagem",                     valor:"US$ 600",     detalhe:"Indenização após 4h de atraso na entrega da bagagem." },
    { icon:"💼", titulo:"Perda ou roubo de bagagem",             valor:"US$ 3.500",   detalhe:"Em viagem por transporte público autorizado." },
    { icon:"⏰", titulo:"Atraso de embarque",                    valor:"US$ 200",     detalhe:"Após 4 horas de atraso no embarque." },
    { icon:"❌", titulo:"Cancelamento de viagem",                valor:"US$ 4.500",   detalhe:"A partir da emissão do bilhete até a data do embarque." },
    { icon:"🔗", titulo:"Perda de conexão aérea",                valor:"US$ 300",     detalhe:"Em caso de perda de conexão por motivos cobertos." },
  ];

  const COBERTURAS_JASON = [
    { icon:"🏥", titulo:"Despesas médicas e hospitalares",  valor:"US$ 150.000", detalhe:"Inclui COVID-19, doenças preexistentes, esportes amadores e gestantes até a 28ª semana." },
    { icon:"🦷", titulo:"Despesas odontológicas",           valor:"US$ 2.000",   detalhe:"Atendimento odontológico de emergência." },
    { icon:"💊", titulo:"Despesas farmacêuticas",           valor:"US$ 1.500",   detalhe:"Reembolso de medicamentos prescritos durante a viagem." },
    { icon:"💼", titulo:"Perda de bagagem",                 valor:"US$ 1.500",   detalhe:"Indenização em caso de perda total da bagagem." },
    { icon:"🧳", titulo:"Atraso de bagagem",                valor:"US$ 200",     detalhe:"Somente na ida, reembolso após 8h de atraso." },
    { icon:"🩹", titulo:"Danos a malas",                    valor:"US$ 120",     detalhe:"Reembolso por avarias na bagagem." },
    { icon:"⏰", titulo:"Cancelamento ou atraso de voo",    valor:"US$ 300",     detalhe:"Reembolso após 8h de atraso do voo." },
    { icon:"❌", titulo:"Cancelamento de viagem",           valor:"US$ 1.500",   detalhe:"Reembolso de despesas não recuperáveis." },
    { icon:"🚫", titulo:"Interrupção de viagem",            valor:"US$ 2.000",   detalhe:"Reembolso em caso de necessidade de interromper a viagem." },
    { icon:"🏠", titulo:"Retorno antecipado do segurado",   valor:"US$ 1.500",   detalhe:"Retorno ao Brasil por motivo de força maior." },
    { icon:"👥", titulo:"Retorno antecipado de acompanhante", valor:"US$ 1.500", detalhe:"Retorno do acompanhante junto ao segurado." },
    { icon:"🏨", titulo:"Prorrogação de estadia",           valor:"US$ 3.000",   detalhe:"Extensão de hospedagem por necessidade médica." },
    { icon:"🛌", titulo:"Acompanhante — hospitalização prolongada", valor:"US$ 2.000", detalhe:"Despesas de um acompanhante durante internação longa." },
    { icon:"🏩", titulo:"Hospedagem de acompanhante",       valor:"US$ 3.000",   detalhe:"Custeio de hospedagem para quem acompanha o segurado internado." },
    { icon:"🚑", titulo:"Regresso sanitário",               valor:"US$ 30.000",  detalhe:"Transporte médico de volta ao Brasil." },
    { icon:"✈️", titulo:"Traslado médico",                  valor:"US$ 30.000",  detalhe:"Transporte para hospital mais adequado ao tratamento." },
    { icon:"♿", titulo:"Invalidez permanente (acidente)",  valor:"R$ 30.000",   detalhe:"Total ou parcial, por acidente durante a viagem." },
    { icon:"🕊️", titulo:"Morte acidental em viagem",        valor:"R$ 30.000",   detalhe:"Indenização aos beneficiários." },
    { icon:"⚰️", titulo:"Traslado de corpo",                valor:"US$ 30.000",  detalhe:"Despesas de transporte funerário de volta ao Brasil." },
    { icon:"⚖️", titulo:"Fiança e despesas legais",         valor:"US$ 2.500",   detalhe:"Cobertura de fiança em caso de necessidade jurídica no exterior." },
    { icon:"🧑‍⚖️", titulo:"Assistência jurídica",            valor:"US$ 1.000",   detalhe:"Apoio jurídico durante a viagem." },
    { icon:"💻", titulo:"Roubo/furto de notebook",          valor:"US$ 800",     detalhe:"Reembolso em caso de roubo ou furto qualificado." },
    { icon:"🐾", titulo:"Seguro Pet",                       valor:"US$ 500",     detalhe:"Despesas veterinárias do animal de estimação em casa." },
  ];

  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:14 }}>
        <div style={T.pageTitle}>Seguro Viagem</div>
        <div style={{ ...T.sub, marginTop:4 }}>Mary e Jason têm seguradoras DIFERENTES</div>
      </div>

      {/* Aviso crítico: dois seguros diferentes */}
      <div style={{ background:"#FDECEA", border:`2px solid ${C.red}`, borderRadius:16, padding:"14px 16px", marginBottom:16 }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:C.red, marginBottom:6 }}>⚠️ Atenção — cada um liga para um número diferente!</div>
        <div style={{ fontSize:15, color:C.brown, lineHeight:1.7 }}>
          Mary usa o seguro do <strong>cartão Visa Infinite (AIG)</strong>. Jason usa o seguro <strong>HERO Seguros (Generali)</strong>, contratado separadamente. Toque no nome de quem precisa de ajuda para ver o número certo.
        </div>
      </div>

      {/* Seletor de pessoa */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[
          {id:"mary",  label:"👤 Mary",  cor:C.navy},
          {id:"jason", label:"👤 Jason", cor:"#6A1B9A"},
        ].map(p=>(
          <button key={p.id} onClick={()=>setPessoa(p.id)} style={{ flex:1, padding:"14px 8px", borderRadius:16, border:`2.5px solid ${pessoa===p.id?p.cor:C.creamD}`, background:pessoa===p.id?p.cor:C.white, color:pessoa===p.id?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, cursor:"pointer" }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* ═══ BILHETE DA MARY (Visa Infinite / AIG) ═══ */}
      {pessoa === "mary" && (
        <>
          <Card>
            <SectionLabel>📄 Bilhete de Seguro — Mary</SectionLabel>
            <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:14, padding:"16px 14px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div>
                  <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700 }}>Mary Ruth Jacobina</div>
                  <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:3 }}>Ourocard Visa Infinite · AIG Seguros</div>
                </div>
                <span style={{ background:"#1B5E20", color:"white", borderRadius:20, padding:"4px 12px", fontSize:12, fontFamily:"'Cinzel',serif", fontWeight:700 }}>✓ Emitido</span>
              </div>
              <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 12px" }}>
                <div style={{ color:"rgba(255,255,255,0.55)", fontSize:12, letterSpacing:1, fontFamily:"'Cinzel',serif", marginBottom:4 }}>Nº DO BILHETE</div>
                <div style={{ color:C.white, fontSize:15, fontWeight:700 }}>16011-0001-69-2610220786</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginTop:2 }}>CER-7374404</div>
              </div>
              <div style={{ display:"flex", gap:8, marginTop:8 }}>
                <div style={{ flex:1, background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"8px 10px" }}>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>Início</div>
                  <div style={{ color:C.white, fontSize:14, fontWeight:700 }}>31/08/2026</div>
                </div>
                <div style={{ flex:1, background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"8px 10px" }}>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>Término</div>
                  <div style={{ color:C.white, fontSize:14, fontWeight:700 }}>31/08/2027</div>
                </div>
              </div>
              <a href="/documentos/bilhete_mary.pdf" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:10, background:"rgba(232,168,32,0.2)", border:`1px solid ${C.gold}`, color:C.goldL, borderRadius:10, padding:"11px", textDecoration:"none", fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700 }}>
                📥 Baixar PDF do Bilhete — Mary
              </a>
            </div>
          </Card>

          {/* Emergência Mary */}
          <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"20px 18px", border:`2px solid ${C.red}`, marginBottom:14 }}>
            <div style={{ fontFamily:"'Cinzel',serif", color:"#FF8A80", fontSize:16, fontWeight:700, marginBottom:14 }}>🆘 Emergência da Mary — ligue AGORA!</div>

            <div style={{ background:"rgba(183,28,28,0.3)", borderRadius:14, padding:"14px", marginBottom:10, border:"1px solid rgba(255,100,100,0.4)" }}>
              <div style={{ color:"#FF8A80", fontSize:12, fontFamily:"'Cinzel',serif", letterSpacing:1.5, fontWeight:700, marginBottom:6 }}>📍 ESTANDO EM PORTUGAL OU ITÁLIA</div>
              <a href="tel:+13039671098" style={{ display:"flex", gap:12, alignItems:"center", textDecoration:"none" }}>
                <span style={{ fontSize:32 }}>📞</span>
                <div>
                  <div style={{ color:C.white, fontSize:24, fontWeight:700, fontFamily:"'Cinzel',serif" }}>+1 303 967 1098</div>
                  <div style={{ color:"rgba(255,255,255,0.65)", fontSize:13, marginTop:2 }}>Opção 1 → português · Opção 3 → benefícios Visa</div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:1 }}>24h · Chamada a cobrar via operadora internacional</div>
                </div>
              </a>
            </div>

            <a href="tel:08008913679" style={{ display:"flex", gap:12, alignItems:"center", background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"12px 14px", textDecoration:"none", border:"1px solid rgba(232,201,122,0.25)", marginBottom:8 }}>
              <span style={{ fontSize:26 }}>📞</span>
              <div>
                <div style={{ color:C.goldL, fontSize:12, fontFamily:"'Cinzel',serif", letterSpacing:1, fontWeight:700 }}>DO BRASIL · GRATUITO</div>
                <div style={{ color:C.white, fontSize:20, fontWeight:700, marginTop:2 }}>0800 891 3679</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:1 }}>24h em português</div>
              </div>
            </a>

            <a href="mailto:benefits@ap-visa.com" style={{ display:"flex", gap:12, alignItems:"center", background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"12px 14px", textDecoration:"none", border:"1px solid rgba(232,201,122,0.25)" }}>
              <span style={{ fontSize:26 }}>📧</span>
              <div>
                <div style={{ color:C.goldL, fontSize:12, fontFamily:"'Cinzel',serif", letterSpacing:1, fontWeight:700 }}>E-MAIL</div>
                <div style={{ color:C.white, fontSize:16, marginTop:2 }}>benefits@ap-visa.com</div>
              </div>
            </a>
          </div>

          {/* Passo a passo Mary */}
          <Card>
            <SectionLabel>📋 O que fazer em caso de emergência</SectionLabel>
            {[
              { num:"1", cor:C.red,   titulo:"Ligue imediatamente para a central", desc:"Use o número +1 303 967 1098. Eles falam português e atendem 24 horas. Informe que possui o Seguro Viagem Visa Infinite." },
              { num:"2", cor:C.navy,  titulo:"Eles vão orientar você", desc:"A central indica o hospital ou clínica credenciada mais próxima. Siga as orientações — não vá a qualquer hospital sem antes ligar." },
              { num:"3", cor:C.navy,  titulo:"Autorização de atendimento", desc:"Quando há rede credenciada no destino, o seguro paga diretamente o hospital. Você não paga nada na hora." },
              { num:"4", cor:"#E65100", titulo:"Se não houver rede credenciada", desc:"Você paga e depois solicita o reembolso. Guarde TODAS as notas fiscais, receitas e documentos médicos." },
              { num:"5", cor:C.navy,  titulo:"Atenção com cobranças duplas", desc:'Se o hospital cobrar tanto você quanto o seguro, entre em contato com a central ou envie e-mail para: visa_iemsclaims@axa-assistance.us' },
            ].map((p,i,arr)=>(
              <div key={i} style={{ display:"flex", gap:14, padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}>
                <div style={{ width:34, height:34, borderRadius:10, background:p.cor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontFamily:"'Cinzel',serif", color:"white", fontSize:16, fontWeight:700 }}>{p.num}</span>
                </div>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:C.navy, marginBottom:4 }}>{p.titulo}</div>
                  <div style={{ ...T.body, fontSize:16, lineHeight:1.7 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ background:"#FFF8E1", border:"1px solid #FFD54F" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:"#5D4037", marginBottom:8 }}>📞 Outros contatos da AIG (2ª a 6ª, 9h–18h)</div>
            {[
              { label:"SAC AIG",         tel:"0800 726 6130" },
              { label:"Ouvidoria AIG",   tel:"0800 724 0219" },
              { label:"Def. Auditivos",  tel:"0800 724 0149" },
            ].map((c,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:i<2?`1px solid #FFE082`:"none" }}>
                <span style={{ fontSize:15, color:"#5D4037" }}>{c.label}</span>
                <a href={`tel:${c.tel.replace(/\s/g,"")}`} style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:"#5D4037", textDecoration:"none" }}>{c.tel}</a>
              </div>
            ))}
          </Card>

          {/* Coberturas Mary */}
          <Card>
            <SectionLabel>🛡️ Coberturas · Visa Infinite (AIG)</SectionLabel>
            <div style={{ background:"#E8F5E9", borderRadius:10, padding:"10px 12px", marginBottom:14, border:`1px solid #A5D6A7` }}>
              <div style={{ fontSize:15, color:C.green, fontWeight:700 }}>✅ Gratuito — benefício do cartão</div>
              <div style={{ fontSize:14, color:C.brownM, marginTop:4 }}>Vigência: 31/08/2026 a 31/08/2027 · Até 60 dias por viagem</div>
            </div>
            {COBERTURAS_MARY.map((cob,i,arr)=>(
              <div key={i} style={{ padding:"12px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:4 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", flex:1 }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{cob.icon}</span>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:C.navy, lineHeight:1.35 }}>{cob.titulo}</div>
                  </div>
                  <span style={{ background:C.gold, color:C.white, borderRadius:20, padding:"3px 10px", fontSize:12, fontFamily:"'Cinzel',serif", fontWeight:700, flexShrink:0, whiteSpace:"nowrap" }}>{cob.valor}</span>
                </div>
                <div style={{ fontSize:14, color:C.brownM, lineHeight:1.6, paddingLeft:28 }}>{cob.detalhe}</div>
              </div>
            ))}
          </Card>
        </>
      )}

      {/* ═══ BILHETE DO JASON (HERO Seguros / Generali) ═══ */}
      {pessoa === "jason" && (
        <>
          <Card>
            <SectionLabel>📄 Bilhete de Seguro — Jason</SectionLabel>
            <div style={{ background:"linear-gradient(135deg,#6A1B9A,#8E24AA)", borderRadius:14, padding:"16px 14px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div>
                  <div style={{ color:"#F3E5F5", fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700 }}>Jason Jose Percilio</div>
                  <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, marginTop:3 }}>HERO Seguros · Generali Brasil</div>
                </div>
                <span style={{ background:"#1B5E20", color:"white", borderRadius:20, padding:"4px 12px", fontSize:12, fontFamily:"'Cinzel',serif", fontWeight:700 }}>✓ Emitido</span>
              </div>
              <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 12px" }}>
                <div style={{ color:"rgba(255,255,255,0.65)", fontSize:12, letterSpacing:1, fontFamily:"'Cinzel',serif", marginBottom:4 }}>Nº DO BILHETE</div>
                <div style={{ color:"white", fontSize:15, fontWeight:700 }}>716922801004247272</div>
              </div>
              <div style={{ display:"flex", gap:8, marginTop:8 }}>
                <div style={{ flex:1, background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"8px 10px" }}>
                  <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11 }}>Início</div>
                  <div style={{ color:"white", fontSize:14, fontWeight:700 }}>30/10/2026</div>
                </div>
                <div style={{ flex:1, background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"8px 10px" }}>
                  <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11 }}>Término</div>
                  <div style={{ color:"white", fontSize:14, fontWeight:700 }}>13/11/2026</div>
                </div>
              </div>
              <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"8px 10px", marginTop:8 }}>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11 }}>Plano</div>
                <div style={{ color:"white", fontSize:14, fontWeight:700 }}>HERO 150 · VIP + eSIM grátis</div>
              </div>
              <a href="/documentos/bilhete_jason.pdf" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:10, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.4)", color:"white", borderRadius:10, padding:"11px", textDecoration:"none", fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700 }}>
                📥 Baixar PDF do Bilhete — Jason
              </a>
            </div>
          </Card>

          {/* Emergência Jason */}
          <div style={{ background:"linear-gradient(150deg,#4A148C,#6A1B9A)", borderRadius:20, padding:"20px 18px", border:`2px solid ${C.red}`, marginBottom:14 }}>
            <div style={{ fontFamily:"'Cinzel',serif", color:"#FF8A80", fontSize:16, fontWeight:700, marginBottom:14 }}>🆘 Emergência do Jason — ligue AGORA!</div>

            <a href="https://wa.me/551150399001" target="_blank" rel="noopener noreferrer" style={{ display:"flex", gap:12, alignItems:"center", background:"rgba(37,211,102,0.25)", borderRadius:14, padding:"16px", textDecoration:"none", border:"1px solid rgba(37,211,102,0.5)", marginBottom:10 }}>
              <span style={{ fontSize:32 }}>💬</span>
              <div>
                <div style={{ color:"#69F0AE", fontSize:12, fontFamily:"'Cinzel',serif", letterSpacing:1.5, fontWeight:700 }}>WHATSAPP · CENTRAL 24H</div>
                <div style={{ color:"white", fontSize:22, fontWeight:700, fontFamily:"'Cinzel',serif" }}>+55 11 5039-9001</div>
                <div style={{ color:"rgba(255,255,255,0.65)", fontSize:13, marginTop:2 }}>Toque para abrir o WhatsApp diretamente</div>
              </div>
            </a>

            <a href="tel:+551150399001" style={{ display:"flex", gap:12, alignItems:"center", background:"rgba(255,255,255,0.1)", borderRadius:12, padding:"12px 14px", textDecoration:"none", border:"1px solid rgba(255,255,255,0.25)" }}>
              <span style={{ fontSize:26 }}>📞</span>
              <div>
                <div style={{ color:"#F3E5F5", fontSize:12, fontFamily:"'Cinzel',serif", letterSpacing:1, fontWeight:700 }}>OU LIGAR PARA O MESMO NÚMERO</div>
                <div style={{ color:"white", fontSize:18, fontWeight:700, marginTop:2 }}>+55 11 5039-9001</div>
              </div>
            </a>
          </div>

          {/* Passo a passo Jason */}
          <Card>
            <SectionLabel>📋 O que fazer em caso de emergência</SectionLabel>
            {[
              { num:"1", cor:C.red,   titulo:"Chame no WhatsApp +55 11 5039-9001", desc:"Central de Assistência HERO/Generali, atendimento 24 horas. Envie mensagem explicando a situação — funciona mesmo no exterior com internet Wi-Fi ou o eSIM incluído no plano." },
              { num:"2", cor:"#6A1B9A", titulo:"Informe o número do bilhete", desc:"716922801004247272 — tenha à mão para agilizar o atendimento." },
              { num:"3", cor:C.navy,  titulo:"Siga as orientações da central", desc:"Eles indicam o que fazer e, quando possível, o hospital ou clínica mais indicada." },
              { num:"4", cor:"#E65100", titulo:"Guarde todos os documentos", desc:"Muitas coberturas deste plano funcionam por reembolso (farmácia, atraso, cancelamento). Guarde recibos, notas fiscais e laudos médicos." },
              { num:"5", cor:C.navy,  titulo:"Dúvidas fora de emergência", desc:"SAC 24h: 0800 88 90 200 · Ouvidoria (dias úteis, 9h-18h): 0800 88 03 900" },
            ].map((p,i,arr)=>(
              <div key={i} style={{ display:"flex", gap:14, padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}>
                <div style={{ width:34, height:34, borderRadius:10, background:p.cor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontFamily:"'Cinzel',serif", color:"white", fontSize:16, fontWeight:700 }}>{p.num}</span>
                </div>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:C.navy, marginBottom:4 }}>{p.titulo}</div>
                  <div style={{ ...T.body, fontSize:16, lineHeight:1.7 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ background:"#F3E5F5", border:"1px solid #CE93D8" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:"#4A148C", marginBottom:8 }}>📞 Outros contatos (dias úteis, 9h–18h salvo indicado)</div>
            {[
              { label:"SAC 24h",             tel:"0800 88 90 200" },
              { label:"Def. Auditivos 24h",  tel:"0800 88 90 400" },
              { label:"Ouvidoria",           tel:"0800 88 03 900" },
            ].map((c,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:i<2?"1px solid #E1BEE7":"none" }}>
                <span style={{ fontSize:15, color:"#4A148C" }}>{c.label}</span>
                <a href={`tel:${c.tel.replace(/\s/g,"")}`} style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:"#4A148C", textDecoration:"none" }}>{c.tel}</a>
              </div>
            ))}
          </Card>

          {/* Coberturas Jason */}
          <Card>
            <SectionLabel>🛡️ Coberturas · HERO 150 (Generali)</SectionLabel>
            <div style={{ background:"#F3E5F5", borderRadius:10, padding:"10px 12px", marginBottom:14, border:"1px solid #CE93D8" }}>
              <div style={{ fontSize:15, color:"#4A148C", fontWeight:700 }}>✅ Plano contratado · Prêmio pago: R$ 152,17 + IOF R$ 0,58</div>
              <div style={{ fontSize:14, color:C.brownM, marginTop:4 }}>Vigência: 30/10/2026 a 13/11/2026 · Destino: Europa</div>
            </div>
            {COBERTURAS_JASON.map((cob,i,arr)=>(
              <div key={i} style={{ padding:"12px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:4 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", flex:1 }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{cob.icon}</span>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:C.navy, lineHeight:1.35 }}>{cob.titulo}</div>
                  </div>
                  <span style={{ background:"#6A1B9A", color:"white", borderRadius:20, padding:"3px 10px", fontSize:12, fontFamily:"'Cinzel',serif", fontWeight:700, flexShrink:0, whiteSpace:"nowrap" }}>{cob.valor}</span>
                </div>
                <div style={{ fontSize:14, color:C.brownM, lineHeight:1.6, paddingLeft:28 }}>{cob.detalhe}</div>
              </div>
            ))}
          </Card>
        </>
      )}

      {/* Quem paga? — vale para os dois */}
      <Card style={{ background:"#E8F5E9", border:`1px solid #A5D6A7` }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:C.green, marginBottom:10 }}>
          💰 Quem paga? Regra geral para os dois seguros
        </div>
        <div style={{ ...T.body, fontSize:16, lineHeight:1.8 }}>
          Quando existe <strong>rede credenciada</strong> no local, a seguradora paga direto ao hospital — vocês não desembolsam nada. Quando não existe rede credenciada, é preciso pagar e depois pedir <strong>reembolso</strong>, guardando todos os recibos e documentos médicos.
        </div>
        <div style={{ marginTop:12, background:"rgba(27,94,32,0.1)", borderRadius:10, padding:"10px 12px" }}>
          <div style={{ fontSize:15, color:C.green, fontWeight:700 }}>👉 Por isso é fundamental LIGAR PRIMEIRO para a central certa!</div>
        </div>
      </Card>

      <Card>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:C.navy, marginBottom:10 }}>
          ⚠️ O seguro de viagem não é seguro saúde
        </div>
        <div style={{ ...T.body, fontSize:16, lineHeight:1.8 }}>
          Cobre <strong>emergências</strong> durante a viagem — acidentes, doenças súbitas, hospitalização de urgência. Não é um plano de saúde permanente nem cobre consultas de rotina.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: CONTATO
// ═══════════════════════════════════════════════════════════
function PageContato(){
  return(
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:18 }}>
        <div style={T.pageTitle}>Contato</div>
        <div style={{ ...T.sub, marginTop:4 }}>Agência, direção espiritual e emergências</div>
      </div>
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"22px 18px", border:`2px solid ${C.gold}`, marginBottom:16 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:20, fontWeight:700, marginBottom:16 }}>🏢 Beth Viagens e Turismo</div>
        <a href="tel:+5562984296855" style={{ display:"flex", gap:14, alignItems:"center", background:"rgba(255,255,255,0.12)", borderRadius:14, padding:"16px", textDecoration:"none", border:"1px solid rgba(232,201,122,0.4)", marginBottom:12 }}>
          <span style={{ fontSize:36 }}>📱</span>
          <div><div style={{ color:C.goldL, fontSize:13, fontFamily:"'Cinzel',serif", letterSpacing:1.5, fontWeight:700 }}>WHATSAPP / TELEFONE</div><div style={{ color:C.white, fontSize:22, fontWeight:700, marginTop:2 }}>(62) 98429-6855</div></div>
        </a>
        <a href="mailto:bethviagens.comercial@gmail.com" style={{ display:"flex", gap:14, alignItems:"center", background:"rgba(255,255,255,0.12)", borderRadius:14, padding:"16px", textDecoration:"none", border:"1px solid rgba(232,201,122,0.4)" }}>
          <span style={{ fontSize:36 }}>📧</span>
          <div><div style={{ color:C.goldL, fontSize:13, fontFamily:"'Cinzel',serif", letterSpacing:1.5, fontWeight:700 }}>E-MAIL</div><div style={{ color:"rgba(255,255,255,0.9)", fontSize:17, marginTop:2 }}>bethviagens.comercial@gmail.com</div></div>
        </a>
      </div>
      <Card>
        <SectionLabel>🙏 Direção Espiritual</SectionLabel>
        <div style={{ display:"flex", gap:12 }}>
          {["Frei Edgar Manso","Frei Matheus Morais"].map((name,i)=>(
            <div key={i} style={{ flex:1, background:C.creamD, borderRadius:14, padding:"18px 12px", textAlign:"center" }}>
              <div style={{ fontSize:36, marginBottom:8 }}>🕊️</div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:C.navy, lineHeight:1.35 }}>{name}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionLabel>🆘 Emergências Locais</SectionLabel>
        {[
          { country:"🇵🇹 Portugal",              number:"112",               detail:"Polícia, INEM (ambulância), Bombeiros" },
          { country:"🇮🇹 Itália",                number:"112",               detail:"Polícia 113 · Ambulância 118 · Bombeiros 115" },
          { country:"🇧🇷 Consulado BR em Roma",   number:"+39 06 4222 200",   detail:"Emergência para brasileiros na Itália" },
          { country:"🇧🇷 Consulado BR em Lisboa", number:"+351 21 392 4000",  detail:"Emergência para brasileiros em Portugal" },
        ].map((e,i,arr)=>(
          <div key={i} style={{ padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:17, fontWeight:700, color:C.navy, marginBottom:8 }}>{e.country}</div>
            <a href={`tel:${e.number.replace(/\s/g,"")}`} style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#FDECEA", color:C.red, borderRadius:10, padding:"10px 18px", fontSize:20, fontWeight:700, textDecoration:"none", marginBottom:6 }}>🆘 {e.number}</a>
            <div style={{ ...T.sub, fontSize:15 }}>{e.detail}</div>
          </div>
        ))}
      </Card>
      <Card>
        <SectionLabel>📋 Documentos Essenciais</SectionLabel>
        {["Passaporte válido (mínimo até Maio/2027)","Seguro viagem com cobertura Schengen","Vouchers da viagem (enviados 2 dias antes)","Euro (€) em espécie — despesas pessoais","Cartão de crédito internacional (backup)"].map((d,i,arr)=>(
          <div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}>
            <span style={{ color:C.green, fontSize:20, flexShrink:0, fontWeight:700 }}>✓</span>
            <span style={{ ...T.body, fontSize:17 }}>{d}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  APP PRINCIPAL
// ═══════════════════════════════════════════════════════════
export default function App(){
  const [page,setPage]            = useState("hoje");
  const [expandedDay,setExpanded] = useState(null);
  const [weather,setWeather]      = useState({});
  const [checked,setChecked]      = useState({});

  useEffect(()=>{
    try{ const s=localStorage.getItem("peregrinacao_checklist"); if(s) setChecked(JSON.parse(s)); }catch(_){}
  },[]);

  useEffect(()=>{
    async function fetchWeather(){
      const results={};
      for(const [key,city] of Object.entries(WEATHER_CITIES)){
        try{
          const url=`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=16`;
          // Pede sempre "os próximos 16 dias" (limite do Open-Meteo). Pedir um intervalo fixo
          // até 12/Nov fazia a API recusar a consulta inteira enquanto o fim da viagem
          // estivesse a mais de 16 dias. As datas da viagem dentro da janela usam a previsão
          // real; as que ainda estão fora dela caem na média histórica.
          const res=await fetch(url); const data=await res.json();
          if(data.daily) results[key]=data.daily;
        }catch(_){}
      }
      setWeather(results);
    }
    fetchWeather();
  },[]);

  function toggleCheck(id){
    setChecked(prev=>{
      const next={...prev,[id]:!prev[id]};
      try{ localStorage.setItem("peregrinacao_checklist",JSON.stringify(next)); }catch(_){}
      return next;
    });
  }

  const today         = new Date(); today.setHours(0,0,0,0);
  const tripStart     = new Date("2026-10-30T00:00:00");
  const tripEnd       = new Date("2026-11-12T00:00:00");
  // Pré-visualização: abrir o site com ?dia=1 (ou 2, 3…) mostra a página inicial daquele dia
  let previewDay = null;
  try{ const n=parseInt(new URLSearchParams(window.location.search).get("dia"),10); previewDay=ITINERARY.find(d=>d.day===n)||null; }catch(_){}
  const daysReal      = Math.ceil((tripStart-today)/86400000);
  const daysUntilTrip = previewDay ? 0 : daysReal;
  const currentDay    = previewDay || ITINERARY.find(d=>d.date===todayStr())||null;
  const tripOver      = !previewDay && today>tripEnd;
  const duringTrip    = today>=tripStart && today<=tripEnd;
  const hotelAtual    = duringTrip ? getCurrentHotel() : HOTELS[0];

  const NAV=[
    {id:"hoje",    icon:"🏠", label:"Hoje"   },
    {id:"roteiro", icon:"📅", label:"Roteiro"},
    {id:"voos",    icon:"✈️", label:"Voos"   },
    {id:"hoteis",  icon:"🏨", label:"Hotéis" },
    {id:"clima",   icon:"⛅", label:"Clima"  },
    {id:"pacote",  icon:"📋", label:"Pacote" },
    {id:"vip",     icon:"🛋️", label:"Salas"  },
    {id:"seguro",  icon:"🛡️", label:"Seguro" },
    {id:"contato", icon:"📞", label:"Contato"},
  ];

  return(
    <div style={{ minHeight:"100vh", background:C.cream, fontFamily:"'EB Garamond',Georgia,serif", color:C.brown, paddingBottom:150, maxWidth:540, margin:"0 auto" }}>

      <header style={{ background:`linear-gradient(160deg,${C.navy} 0%,${C.navyL} 100%)`, padding:"20px 20px 16px", boxShadow:"0 4px 24px rgba(27,43,94,0.35)", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:13, letterSpacing:6, textAlign:"center", marginBottom:5 }}>✦  ✝  ✦</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:19, fontWeight:700, letterSpacing:1, textAlign:"center", lineHeight:1.3, marginBottom:4 }}>Jubileu Franciscano 2026</div>
        <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, textAlign:"center" }}>Peregrinação · Portugal & Itália · 30 Out – 12 Nov</div>
      </header>

      {page==="hoje"    && <PageHoje currentDay={currentDay} daysUntilTrip={daysUntilTrip} tripOver={tripOver} weather={weather} checked={checked} toggleCheck={toggleCheck} preview={!!previewDay} />}
      {page==="roteiro" && <PageRoteiro expandedDay={expandedDay} setExpandedDay={setExpanded} />}
      {page==="voos"    && <PageVoos />}
      {page==="hoteis"  && <PageHoteis />}
      {page==="clima"   && <PageClima weather={weather} />}
      {page==="pacote"  && <PagePacote />}
      {page==="vip"     && <PageSalasVip />}
      {page==="seguro"  && <PageSeguro />}
      {page==="contato" && <PageContato />}

      {/* Botão flutuante — visível sempre, em qualquer aba */}
      <BotaoHotel hotel={hotelAtual} antesViagem={daysReal > 0} />

      <nav style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:540, background:C.navy, display:"flex", flexWrap:"wrap", borderTop:`3px solid ${C.gold}`, zIndex:100 }}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{ flex:"1 0 20%", padding:"10px 0 8px", background:page===n.id?"rgba(232,168,32,0.2)":"none", border:"none", borderTop: NAV.indexOf(n) >= 5 ? `1px solid rgba(255,255,255,0.08)` : "none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
            <span style={{ fontSize:21 }}>{n.icon}</span>
            <span style={{ fontSize:10, color:page===n.id?C.goldL:"rgba(255,255,255,0.55)", fontFamily:"'Cinzel',serif", letterSpacing:0.2, fontWeight:page===n.id?700:500 }}>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
