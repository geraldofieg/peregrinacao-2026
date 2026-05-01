import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════
//  DADOS DO ROTEIRO
//  Se precisar editar alguma informação, basta alterar aqui.
// ═══════════════════════════════════════════════════════════
const ITINERARY = [
  {
    day: 1,
    date: "2026-10-30",
    weekday: "Sexta-feira",
    location: "Goiânia / Brasília → Lisboa",
    city: "goiania",
    icon: "✈️",
    morning: "Partida de Goiânia em horário combinado. Transfer em ônibus privativo para Brasília. Embarque para Lisboa.",
    afternoon: "Em viagem intercontinental.",
    evening: "Em voo — descanse bem para a chegada!",
    highlights: ["Início da peregrinação 🙏", "Voo Brasília → Lisboa"],
    prayer: "Senhor, abençoa nossa partida e guia nossos passos nesta jornada de fé.",
  },
  {
    day: 2,
    date: "2026-10-31",
    weekday: "Sábado",
    location: "Lisboa, Portugal 🇵🇹",
    city: "lisboa",
    icon: "🛬",
    morning: "Chegada ao Aeroporto Internacional de Lisboa. Trâmites de imigração. Transfer para o hotel. Check-in e descanso.",
    afternoon: "Tarde livre — compras ou explorar Lisboa no seu ritmo.",
    evening: "Noite livre.",
    highlights: ["Chegada em Lisboa 🇵🇹", "Check-in no hotel ****"],
    prayer: "Bem-vindos a Lisboa! Obrigado, Senhor, por nos trazer com segurança.",
  },
  {
    day: 3,
    date: "2026-11-01",
    weekday: "Domingo",
    location: "Lisboa → Fátima (127km) 🕊️",
    city: "fatima",
    icon: "🕊️",
    morning: "Após o café da manhã, peregrinação para Fátima com guia acompanhante. Visita à Basílica Santíssima Trindade e atividades religiosas do Santuário.",
    afternoon: "City tour guiado no Santuário de Fátima e Casa dos Pastorinhos.",
    evening: "Santa Missa e Procissão das Velas na Capelinha das Aparições. Retorno para Lisboa.",
    highlights: ["Santuário de Fátima 🕊️", "Casa dos Pastorinhos", "Santa Missa", "Procissão das Velas 🕯️"],
    prayer: "Nossa Senhora de Fátima, intercede por nós e abençoa esta peregrinação.",
  },
  {
    day: 4,
    date: "2026-11-02",
    weekday: "Segunda-feira",
    location: "Lisboa, Portugal 🇵🇹",
    city: "lisboa",
    icon: "⛪",
    morning: "Santa Missa na Igreja de Santo Antônio — local onde o Santo nasceu (entrada gratuita). Visita à Sé Catedral de Lisboa, a mais antiga de Portugal.",
    afternoon: "City tour com guia: Torre de Belém, Mosteiro dos Jerônimos, Pasteis de Belém, Castelo de São Jorge, Alfama, Miradouro de Santa Luzia.",
    evening: "Noite livre.",
    highlights: ["Igreja de Santo Antônio ⛪", "Sé Catedral de Lisboa", "Torre de Belém 🏰", "Mosteiro dos Jerônimos", "Pasteis de Belém 🥐"],
    prayer: "Santo Antônio de Lisboa e de Pádua, rogai por nós!",
  },
  {
    day: 5,
    date: "2026-11-03",
    weekday: "Terça-feira",
    location: "Lisboa → Roma ✈️",
    city: "roma",
    icon: "✈️",
    morning: "Após o café da manhã, transfer para o aeroporto de Lisboa. Voo para Roma.",
    afternoon: "Chegada em Roma. Transfer para o hotel. Check-in e descanso.",
    evening: "Noite livre. Bem-vindos à Cidade Eterna!",
    highlights: ["Voo Lisboa → Roma ✈️", "Check-in em Roma 🇮🇹"],
    prayer: "Senhor, guia nossa jornada até a Cidade Eterna.",
  },
  {
    day: 6,
    date: "2026-11-04",
    weekday: "Quarta-feira",
    location: "Roma / Vaticano 🇻🇦",
    city: "roma",
    icon: "✝️",
    morning: "Transfer para o Vaticano. Assistir à Catequese Papal — se o Papa estiver em Roma.",
    afternoon: "Passeio a pé pelas praças mais bonitas: Praça Navona, Fontana di Trevi e Pantheon Romano (visita externa).",
    evening: "Noite livre.",
    highlights: ["Catequese Papal 🇻🇦", "Praça Navona", "Fontana di Trevi ⛲", "Pantheon"],
    prayer: "Santo Padre, abençoa nossa peregrinação ao Jubileu Franciscano.",
  },
  {
    day: 7,
    date: "2026-11-05",
    weekday: "Quinta-feira",
    location: "Roma, Itália 🇮🇹",
    city: "roma",
    icon: "🏛️",
    morning: "City tour panorâmico: Basílica de São Pedro, Vaticano, Museus do Vaticano, Coliseu, Fontana di Trevi, Panteão, Praça da Espanha, Praça Navona.",
    afternoon: "Tarde livre — compras ou explorar Roma no seu ritmo.",
    evening: "Noite livre.",
    highlights: ["Basílica de São Pedro ✝️", "Coliseu 🏛️", "Museus do Vaticano"],
    prayer: "São Pedro, guarda nossa fé e fortalece nosso caminho.",
  },
  {
    day: 8,
    date: "2026-11-06",
    weekday: "Sexta-feira",
    location: "Roma → Assis 🚂",
    city: "assis",
    icon: "🚂",
    morning: "Após o café da manhã, saída para a estação de trem rumo a Assis. Transfer para o convento. Acomodação e descanso.",
    afternoon: "Tarde livre — caminhar pelas ruas medievais de Assis. Momentos de oração.",
    evening: "Noite livre. Bem-vindos a Assis!",
    highlights: ["Trem Roma → Assis 🚂", "Hospedagem em Convento ⛪"],
    prayer: "São Francisco de Assis, rogai por nós. Paz e Bem! 🕊️",
  },
  {
    day: 9,
    date: "2026-11-07",
    weekday: "Sábado",
    location: "Assis, Itália 🌿",
    city: "assis",
    icon: "🌿",
    morning: "Após o café da manhã, Santa Missa na Porciúncula.",
    afternoon: "Às 15h: Basílica de Santa Clara, Catedral de São Rufino, Igrejinha de São Damião.",
    evening: "Noite livre.",
    highlights: ["Missa na Porciúncula 🕊️", "Basílica de Santa Clara", "Catedral de São Rufino", "Igreja de São Damião"],
    prayer: "Francisco e Clara, ensinai-nos a simplicidade e o amor.",
  },
  {
    day: 10,
    date: "2026-11-08",
    weekday: "Domingo",
    location: "Assis, Itália ⛪",
    city: "assis",
    icon: "⛪",
    morning: "Após o café da manhã, Santa Missa na Basílica de São Francisco.",
    afternoon: "Tarde livre. Sugestão opcional: visitar uma vinícola local.",
    evening: "Noite livre.",
    highlights: ["Missa na Basílica de São Francisco 🙏"],
    prayer: "São Francisco, que nossa fé floresça como a tua.",
  },
  {
    day: 11,
    date: "2026-11-09",
    weekday: "Segunda-feira",
    location: "Santuários da Região 🙏",
    city: "assis",
    icon: "🙏",
    morning: "City tour: Santuário de Fonte Colombo, Santuário Della Foresta, Convento San Giacomo (Vaggio Bustone) e Greccio.",
    afternoon: "Retorno para Assis.",
    evening: "Noite livre.",
    highlights: ["Fonte Colombo", "Santuário Della Foresta", "Convento de Bustone", "Greccio 🌟"],
    prayer: "Que os passos de Francisco iluminem nossa peregrinação.",
  },
  {
    day: 12,
    date: "2026-11-10",
    weekday: "Terça-feira",
    location: "La Verna, Itália ⛰️",
    city: "laverna",
    icon: "⛰️",
    morning: "Visita ao Santuário de La Verna — lugar sagrado onde São Francisco recebeu as Estigmas.",
    afternoon: "Continuação da visita a La Verna. Retorno.",
    evening: "Noite livre.",
    highlights: ["Santuário de La Verna ⛰️", "Local das Estigmas de São Francisco 🌟"],
    prayer: "Senhor, que recebamos as chagas do teu amor como Francisco.",
  },
  {
    day: 13,
    date: "2026-11-11",
    weekday: "Quarta-feira",
    location: "Cássia → Roma → Brasil 🏠",
    city: "assis",
    icon: "🏠",
    morning: "Café da manhã. Visita a Cássia. Transfer para o aeroporto de Roma. Embarque para o Brasil.",
    afternoon: "Em voo de retorno ao Brasil.",
    evening: "Voo noturno. Chegada prevista em Brasília em 12/Nov às 16h40. Transfer Brasília → Goiânia.",
    highlights: ["Visita a Cássia 🙏", "Voo Roma → Brasil ✈️", "Chegada em Brasília: 12/Nov às 16h40 🇧🇷"],
    prayer: "Senhor, obrigado por esta peregrinação abençoada. Paz e Bem! 🕊️",
  },
];

// ═══════════════════════════════════════════════════════════
//  COORDENADAS PARA PREVISÃO DO TEMPO
//  Fonte: Open-Meteo (gratuito, sem necessidade de API key)
// ═══════════════════════════════════════════════════════════
const WEATHER_CITIES = {
  goiania: { lat: -16.6864, lon: -49.2643, name: "Goiânia" },
  lisboa:  { lat: 38.7169,  lon: -9.1399,  name: "Lisboa"  },
  fatima:  { lat: 39.6273,  lon: -8.6671,  name: "Fátima"  },
  roma:    { lat: 41.9028,  lon: 12.4964,  name: "Roma"    },
  assis:   { lat: 43.0707,  lon: 12.6156,  name: "Assis"   },
  laverna: { lat: 43.6967,  lon: 11.9292,  name: "La Verna"},
};

// Tabela de condições climáticas WMO
const WMO = {
  0: "☀️ Céu limpo", 1: "🌤️ Principalmente limpo", 2: "⛅ Parcialmente nublado",
  3: "☁️ Nublado", 45: "🌫️ Névoa", 48: "🌫️ Névoa glacial",
  51: "🌦️ Garoa fraca", 53: "🌦️ Garoa", 55: "🌧️ Garoa intensa",
  61: "🌧️ Chuva fraca", 63: "🌧️ Chuva", 65: "🌧️ Chuva forte",
  71: "🌨️ Neve fraca", 73: "❄️ Neve", 75: "❄️ Neve intensa",
  80: "🌦️ Pancadas", 82: "⛈️ Pancadas fortes", 95: "⛈️ Tempestade",
};

// ═══════════════════════════════════════════════════════════
//  CORES E ESTILOS
// ═══════════════════════════════════════════════════════════
const C = {
  navy:   "#1B2B5E",
  navyL:  "#2d4494",
  gold:   "#C4922A",
  cream:  "#FBF7EE",
  creamD: "#F0E6CA",
  brown:  "#2D1B0E",
  brownM: "#6B4C30",
  green:  "#2E7D32",
  red:    "#C62828",
};

// ═══════════════════════════════════════════════════════════
//  UTILITÁRIOS
// ═══════════════════════════════════════════════════════════
function getWeatherLabel(code) {
  if (code == null) return null;
  return WMO[code] || WMO[Math.floor(code / 10) * 10] || "🌤️ Variável";
}

function formatDate(dateStr) {
  const [, m, d] = dateStr.split("-");
  const months = ["","Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${parseInt(d)} de ${months[parseInt(m)]}`;
}

function getTodayString() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split("T")[0];
}

// ═══════════════════════════════════════════════════════════
//  COMPONENTE: Título estilo pergaminho (fonte Cinzel)
// ═══════════════════════════════════════════════════════════
function Title({ children, size = 16, color = C.navy, style = {} }) {
  return (
    <span style={{ fontFamily: "'Cinzel', serif", fontSize: size, color, ...style }}>
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
//  COMPONENTE: Badge de previsão do tempo
// ═══════════════════════════════════════════════════════════
function WeatherBadge({ code, max, min, precip, compact = false }) {
  const label = getWeatherLabel(code);

  if (!label) {
    return <span style={{ fontSize: 12, color: "#bbb", fontStyle: "italic" }}>Em breve…</span>;
  }

  if (compact) {
    return (
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 12.5 }}>{label}</div>
        <div style={{ fontSize: 14, color: C.gold, fontWeight: 700 }}>
          {Math.round(max)}°/{Math.round(min)}°
        </div>
        {precip > 20 && (
          <div style={{ fontSize: 11, color: "#5a9" }}>💧 {precip}%</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.13)", borderRadius: 10, padding: "10px 14px", marginTop: 10, textAlign: "center" }}>
      <div style={{ color: "white", fontSize: 14, marginBottom: 4 }}>{label}</div>
      <div style={{ color: C.gold, fontSize: 28, fontWeight: 700, fontFamily: "'Cinzel', serif" }}>
        {Math.round(max)}°{" "}
        <span style={{ fontSize: 16, color: "rgba(255,255,255,0.55)" }}>/ {Math.round(min)}°</span>
      </div>
      {precip > 20 && (
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 3 }}>
          💧 {precip}% de chance de chuva
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  COMPONENTE: Card de um dia do roteiro (expansível)
// ═══════════════════════════════════════════════════════════
function DayCard({ d, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: "#FFFDF8",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        boxShadow: "0 2px 14px rgba(44,27,16,0.07)",
        border: `1px solid ${C.creamD}`,
        cursor: "pointer",
      }}
    >
      {/* Cabeçalho sempre visível */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: expanded ? 12 : 0 }}>
        <span style={{ fontSize: 30, flexShrink: 0 }}>{d.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3, flexWrap: "wrap" }}>
            <span style={{ background: C.gold, color: "white", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
              Dia {d.day}
            </span>
            <span style={{ fontSize: 11.5, color: C.brownM }}>{d.weekday} · {formatDate(d.date)}</span>
          </div>
          <Title size={13.5} style={{ lineHeight: 1.3, display: "block" }}>{d.location}</Title>
        </div>
        <span style={{ color: C.gold, fontSize: 14, flexShrink: 0 }}>{expanded ? "▲" : "▼"}</span>
      </div>

      {/* Conteúdo expandido */}
      {expanded && (
        <div className="fade-in">
          {/* Chips de destaques */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
            {d.highlights.map((h, i) => (
              <span key={i} style={{ background: C.creamD, borderRadius: 20, padding: "3px 10px", fontSize: 12, color: C.brownM }}>
                {h}
              </span>
            ))}
          </div>

          {/* Manhã / Tarde / Noite */}
          {[["Manhã", "🌅", d.morning], ["Tarde", "☀️", d.afternoon], ["Noite", "🌙", d.evening]].map(([label, emoji, text], i, arr) => (
            <div key={i}>
              <div style={{ display: "flex", gap: 9, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", minWidth: 44, paddingTop: 3 }}>
                  {label}
                </span>
                <span style={{ fontSize: 14.5, lineHeight: 1.65, flex: 1 }}>
                  {emoji} {text}
                </span>
              </div>
              {i < arr.length - 1 && <hr style={{ border: "none", borderTop: `1px solid ${C.creamD}`, margin: "4px 0 10px" }} />}
            </div>
          ))}

          {/* Oração do dia */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyL})`, borderRadius: 10, padding: "12px 14px", marginTop: 10 }}>
            <div style={{ color: C.gold, fontFamily: "'Cinzel', serif", fontSize: 13, fontStyle: "italic", textAlign: "center", lineHeight: 1.6 }}>
              🙏 {d.prayer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: Hoje
// ═══════════════════════════════════════════════════════════
function PageHoje({ currentDay, daysUntilTrip, tripOver, weather }) {
  // Viagem encerrada
  if (tripOver) {
    return (
      <div style={{ padding: "18px 16px" }}>
        <div style={{ background: `linear-gradient(150deg, ${C.navy}, ${C.navyL})`, borderRadius: 16, padding: "30px 20px", border: `2px solid ${C.gold}`, textAlign: "center" }}>
          <div style={{ fontSize: 54, marginBottom: 10 }}>🕊️</div>
          <Title size={22} color={C.gold} style={{ display: "block", marginBottom: 12, lineHeight: 1.3 }}>
            Peregrinação Concluída!
          </Title>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.8 }}>
            Que as graças recebidas nesta jornada sagrada acompanhem sempre vocês, iluminando cada passo da vida.
          </p>
          <div style={{ color: C.gold, fontFamily: "'Cinzel', serif", fontStyle: "italic", fontSize: 15, marginTop: 16 }}>
            Paz e Bem! 🕊️
          </div>
        </div>
      </div>
    );
  }

  // Contagem regressiva (antes da viagem)
  if (daysUntilTrip > 0) {
    return (
      <div style={{ padding: "18px 16px" }}>
        {/* Countdown */}
        <div style={{ background: `linear-gradient(150deg, ${C.navy}, ${C.navyL})`, borderRadius: 16, padding: "26px 18px", border: `2px solid ${C.gold}`, textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>✈️</div>
          <Title size={11} color="rgba(255,255,255,0.55)" style={{ letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
            Contagem Regressiva
          </Title>
          <div style={{ fontFamily: "'Cinzel', serif", color: C.gold, fontSize: 72, fontWeight: 700, lineHeight: 1 }}>
            {daysUntilTrip}
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginTop: 6 }}>dias para a peregrinação</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12.5, marginTop: 4 }}>Partida: 30 de outubro de 2026</div>
        </div>

        {/* Destinos */}
        {[
          { icon: "🇵🇹", city: "Lisboa & Fátima",   dates: "31/Out – 03/Nov" },
          { icon: "🇮🇹", city: "Roma & Vaticano",   dates: "03/Nov – 06/Nov" },
          { icon: "⛪",  city: "Assis & Santuários", dates: "06/Nov – 11/Nov" },
        ].map((dest, i, arr) => (
          <div
            key={i}
            style={{
              background: "#FFFDF8",
              borderRadius: i === 0 ? "14px 14px 0 0" : i === arr.length - 1 ? "0 0 14px 14px" : 0,
              padding: "12px 16px",
              border: `1px solid ${C.creamD}`,
              borderBottom: i < arr.length - 1 ? "none" : undefined,
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: i === arr.length - 1 ? 14 : 0,
            }}
          >
            <span style={{ fontSize: 26 }}>{dest.icon}</span>
            <div>
              <Title size={14}>{dest.city}</Title>
              <div style={{ fontSize: 12, color: C.brownM, marginTop: 2 }}>{dest.dates}</div>
            </div>
          </div>
        ))}

        {/* Checklist */}
        <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, border: `1px solid ${C.creamD}` }}>
          <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
            📋 Checklist de Preparação
          </Title>
          {[
            "Passaporte válido (mínimo até Maio/2027)",
            "Seguro viagem — obrigatório no Espaço Schengen!",
            "1 mala 23kg + 1 bordo 10kg + 1 item pessoal",
            "Euros em espécie para despesas pessoais",
            "Aguardar vouchers (enviados 2 dias antes do embarque)",
          ].map((item, i, arr) => (
            <div key={i} style={{ fontSize: 13.5, padding: "7px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamD}` : "none", display: "flex", gap: 8, lineHeight: 1.5 }}>
              <span style={{ color: C.green, flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Durante a viagem — exibe o dia atual
  if (!currentDay) {
    return (
      <div style={{ padding: "18px 16px" }}>
        <div style={{ background: "#FFFDF8", borderRadius: 14, padding: "30px 20px", textAlign: "center", border: `1px solid ${C.creamD}` }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🕊️</div>
          <Title>Em Peregrinação</Title>
          <div style={{ color: C.brownM, fontSize: 14, marginTop: 6 }}>Consulte o Roteiro completo.</div>
        </div>
      </div>
    );
  }

  // Busca previsão do dia atual
  const cw = weather[currentDay.city];
  let todayW = null;
  if (cw) {
    const idx = cw.time?.indexOf(getTodayString());
    if (idx >= 0) {
      todayW = {
        max:    cw.temperature_2m_max?.[idx],
        min:    cw.temperature_2m_min?.[idx],
        code:   cw.weathercode?.[idx],
        precip: cw.precipitation_probability_max?.[idx],
      };
    }
  }

  return (
    <div style={{ padding: "18px 16px" }}>
      {/* Card azul do dia */}
      <div style={{ background: `linear-gradient(150deg, ${C.navy}, ${C.navyL})`, borderRadius: 16, padding: "22px 18px", border: `2px solid ${C.gold}`, marginBottom: 14 }}>
        <div style={{ textAlign: "center", marginBottom: todayW ? 10 : 0 }}>
          <div style={{ fontSize: 44, marginBottom: 6 }}>{currentDay.icon}</div>
          <Title size={10} color="rgba(255,255,255,0.55)" style={{ letterSpacing: 3, textTransform: "uppercase", display: "block" }}>
            Hoje · Dia {currentDay.day} de 13
          </Title>
          <Title size={19} color={C.gold} style={{ display: "block", marginTop: 6, lineHeight: 1.3 }}>
            {currentDay.location}
          </Title>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 4 }}>
            {currentDay.weekday} · {formatDate(currentDay.date)}
          </div>
        </div>
        {todayW && <WeatherBadge {...todayW} />}
      </div>

      {/* Destaques */}
      <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${C.creamD}` }}>
        <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
          ⭐ Destaques de Hoje
        </Title>
        {currentDay.highlights.map((h, i) => (
          <div key={i} style={{ background: C.creamD, borderRadius: 8, padding: "8px 12px", marginBottom: 6, borderLeft: `3px solid ${C.gold}`, fontSize: 14.5 }}>
            {h}
          </div>
        ))}
      </div>

      {/* Programação */}
      <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, border: `1px solid ${C.creamD}` }}>
        <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
          📅 Programação do Dia
        </Title>
        {[["Manhã", "🌅", currentDay.morning], ["Tarde", "☀️", currentDay.afternoon], ["Noite", "🌙", currentDay.evening]].map(([label, em, txt], i, arr) => (
          <div key={i}>
            <div style={{ display: "flex", gap: 9, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: C.gold, textTransform: "uppercase", letterSpacing: 1.5, minWidth: 44, paddingTop: 3 }}>{label}</span>
              <span style={{ fontSize: 14.5, lineHeight: 1.65, flex: 1 }}>{em} {txt}</span>
            </div>
            {i < arr.length - 1 && <hr style={{ border: "none", borderTop: `1px solid ${C.creamD}`, margin: "4px 0 10px" }} />}
          </div>
        ))}
        <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyL})`, borderRadius: 10, padding: "12px 14px", marginTop: 10 }}>
          <div style={{ color: C.gold, fontFamily: "'Cinzel', serif", fontSize: 13, fontStyle: "italic", textAlign: "center", lineHeight: 1.6 }}>
            🙏 {currentDay.prayer}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: Roteiro completo
// ═══════════════════════════════════════════════════════════
function PageRoteiro({ expandedDay, setExpandedDay }) {
  return (
    <div style={{ padding: "18px 16px" }}>
      <div style={{ marginBottom: 16 }}>
        <Title size={22} style={{ display: "block", marginBottom: 4 }}>Roteiro Completo</Title>
        <div style={{ color: C.brownM, fontSize: 13.5 }}>30 Out – 12 Nov de 2026 · 13 dias</div>
      </div>
      {ITINERARY.map(d => (
        <DayCard
          key={d.day}
          d={d}
          expanded={expandedDay === d.day}
          onToggle={() => setExpandedDay(expandedDay === d.day ? null : d.day)}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: Previsão do tempo
// ═══════════════════════════════════════════════════════════
function PageClima({ weather }) {
  // Agrupa dias por cidade
  const cityDayMap = {};
  ITINERARY.forEach(d => {
    if (!cityDayMap[d.city]) cityDayMap[d.city] = [];
    if (!cityDayMap[d.city].find(x => x.date === d.date)) {
      cityDayMap[d.city].push({ date: d.date, day: d.day });
    }
  });

  const flagOf = k => ({ goiania: "🇧🇷", lisboa: "🇵🇹", fatima: "🇵🇹", roma: "🇮🇹", assis: "🇮🇹", laverna: "🇮🇹" }[k] || "🌍");

  return (
    <div style={{ padding: "18px 16px" }}>
      <div style={{ marginBottom: 16 }}>
        <Title size={22} style={{ display: "block", marginBottom: 4 }}>Previsão do Tempo</Title>
        <div style={{ color: C.brownM, fontSize: 13, lineHeight: 1.65 }}>
          Atualizada automaticamente via Open-Meteo (gratuito). A previsão aparece quando a viagem estiver dentro de 16 dias.
        </div>
      </div>

      {Object.entries(cityDayMap).map(([cityKey, days]) => {
        const info = WEATHER_CITIES[cityKey];
        const cw   = weather[cityKey];
        return (
          <div key={cityKey} style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${C.creamD}` }}>
            <Title size={16} style={{ display: "block", marginBottom: 12 }}>
              {flagOf(cityKey)} {info?.name}
            </Title>
            {days.map((dayInfo, i) => {
              let w = null;
              if (cw) {
                const idx = cw.time?.indexOf(dayInfo.date);
                if (idx >= 0) w = {
                  max:    cw.temperature_2m_max?.[idx],
                  min:    cw.temperature_2m_min?.[idx],
                  code:   cw.weathercode?.[idx],
                  precip: cw.precipitation_probability_max?.[idx],
                };
              }
              return (
                <div key={dayInfo.date} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < days.length - 1 ? `1px solid ${C.creamD}` : "none" }}>
                  <div>
                    <span style={{ background: C.gold, color: "white", borderRadius: 20, padding: "2px 9px", fontSize: 10.5, fontFamily: "'Cinzel', serif", fontWeight: 700, marginRight: 7 }}>
                      Dia {dayInfo.day}
                    </span>
                    <span style={{ fontSize: 12.5, color: C.brownM }}>{formatDate(dayInfo.date)}</span>
                  </div>
                  {w ? <WeatherBadge {...w} compact /> : <span style={{ fontSize: 12, color: "#bbb", fontStyle: "italic" }}>Em breve…</span>}
                </div>
              );
            })}
          </div>
        );
      })}

      <div style={{ background: C.creamD, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 13.5, color: C.brownM, lineHeight: 1.75 }}>
          🌡️ <strong>Temperaturas esperadas em Novembro:</strong><br />
          Lisboa / Fátima: 12–20°C<br />
          Roma: 10–19°C<br />
          Assis / La Verna: 6–16°C —{" "}
          <span style={{ color: C.red, fontWeight: 600 }}>leve casaco!</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: O Pacote (incluso / não incluso / voos / hotéis)
// ═══════════════════════════════════════════════════════════
function PagePacote() {
  const [tab, setTab] = useState("incluso");

  const TABS = [
    { id: "incluso", label: "✅ Incluso"      },
    { id: "nao",     label: "⚠️ Não Incluso" },
    { id: "voos",    label: "✈️ Voos"         },
    { id: "hoteis",  label: "🏨 Hotéis"       },
  ];

  const INCLUSO = [
    "Direção espiritual: Frei Edgar Manso e Frei Matheus Morais",
    "Agente de viagem acompanhante desde o Brasil",
    "Ônibus privativo Goiânia → Brasília → Goiânia",
    "Passagem aérea: Brasília ↔ Lisboa / Roma ↔ Brasília",
    "Taxa de embarque",
    "11 noites de hospedagem com café da manhã",
    "Taxas dos hotéis (city taxes)",
    "Transfer aeroportos de Lisboa e Roma",
    "Transfer chegada em Assis + Transfer Assis → Roma",
    "City tour panorâmico em Lisboa",
    "City tour em Fátima + Casa dos Pastorinhos + Procissão das Velas",
    "City tour panorâmico em Roma",
    "Catequese Papal (se o Papa estiver em Roma)",
    "Santuários: Fonte Colombo, Della Foresta, Bustone, Greccio",
    "City tour para La Verna e visita a Cássia",
    "Gorjetas (maleteiro e guias)",
    "1 mala 23kg + 1 bordo 10kg + 1 item pessoal",
    "Reserva de convites para Catequese Papal",
    "Guias acompanhantes em Lisboa, Fátima e Assis",
    "Camiseta personalizada da peregrinação",
  ];

  const NAO_INCLUSO = [
    "Seguro Viagem ⚠️ — OBRIGATÓRIO no Espaço Schengen",
    "Despesas com passaporte e documentação",
    "Bilhete de trem Roma → Assis",
    "Guias locais e ingressos nos monumentos",
    "Refeições e bebidas não mencionadas no programa",
    "Lavanderia, telefonemas e táxis",
    "Despesas pessoais",
    "Bagagens além das mencionadas no programa",
  ];

  return (
    <div style={{ padding: "18px 16px" }}>
      <div style={{ marginBottom: 14 }}>
        <Title size={22} style={{ display: "block", marginBottom: 3 }}>O Pacote</Title>
        <Title size={16} color={C.gold} style={{ display: "block" }}>A partir de R$ 24.993,00 por pessoa</Title>
        <div style={{ fontSize: 12.5, color: C.brownM, marginTop: 4 }}>
          Entrada R$ 2.405 + 10x R$ 1.963,80 sem juros · Assis: R$ 2.950 (até 4x)
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 5, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flexShrink: 0,
              padding: "7px 12px",
              borderRadius: 20,
              border: `1.5px solid ${tab === t.id ? C.gold : C.creamD}`,
              background: tab === t.id ? C.gold : "#FFFDF8",
              color: tab === t.id ? "white" : C.brownM,
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              cursor: "pointer",
              fontWeight: tab === t.id ? 700 : 400,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Conteúdo da tab */}
      {tab === "incluso" && (
        <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, border: `1px solid ${C.creamD}` }}>
          <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
            ✅ Serviços Inclusos
          </Title>
          {INCLUSO.map((item, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamD}` : "none", fontSize: 14, lineHeight: 1.55 }}>
              <span style={{ color: C.green, flexShrink: 0, marginTop: 2 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      )}

      {tab === "nao" && (
        <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, border: `1px solid ${C.creamD}` }}>
          <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
            ⚠️ Não Incluso no Pacote
          </Title>
          {NAO_INCLUSO.map((item, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamD}` : "none", fontSize: 14, lineHeight: 1.55 }}>
              <span style={{ color: C.red, flexShrink: 0, marginTop: 2 }}>✗</span>
              {item}
            </div>
          ))}
          <div style={{ background: "#FDECEA", borderRadius: 8, padding: 12, marginTop: 12, borderLeft: "3px solid #C62828" }}>
            <div style={{ fontSize: 14, color: C.red, fontWeight: 700 }}>⚠️ Seguro Viagem é obrigatório!</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.65, marginTop: 4 }}>
              O Espaço Schengen (Portugal e Itália) exige comprovação de seguro com cobertura mínima. Sem ele, pode haver recusa de embarque.
            </div>
          </div>
        </div>
      )}

      {tab === "voos" && (
        <div>
          <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${C.creamD}` }}>
            <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              ✈️ Voos Inclusos
            </Title>
            {[
              { rota: "Brasília → Lisboa", dia: "30/Out · Dia 1",  obs: "Saída de Goiânia em ônibus privativo" },
              { rota: "Lisboa → Roma",     dia: "03/Nov · Dia 5",  obs: "Pela manhã, após café da manhã"       },
              { rota: "Roma → Brasília",   dia: "11/Nov · Dia 13", obs: "Chegada em Brasília: 12/Nov às 16h40" },
            ].map((f, i, arr) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamD}` : "none" }}>
                <Title size={15}>✈️ {f.rota}</Title>
                <div style={{ fontSize: 13, color: C.gold, marginTop: 2 }}>{f.dia}</div>
                <div style={{ fontSize: 13, color: C.brownM }}>{f.obs}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, border: `1px solid ${C.creamD}` }}>
            <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              🧳 Bagagem Inclusa
            </Title>
            {[
              "🟢  1 mala despachada — até 23kg",
              "🟢  1 bagagem de bordo — até 10kg",
              "🟢  1 item pessoal — bolsa ou mochila pequena",
              "🔴  Malas extras: não incluso",
            ].map((t, i, arr) => (
              <div key={i} style={{ fontSize: 14.5, padding: "6px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamD}` : "none" }}>{t}</div>
            ))}
          </div>
        </div>
      )}

      {tab === "hoteis" && (
        <div>
          {[
            { city: "🇵🇹 Lisboa", nights: "4 noites", stars: "Hotel ****", dates: "31/Out – 03/Nov", obs: "Café da manhã incluso" },
            { city: "🇮🇹 Roma",   nights: "3 noites", stars: "Hotel ****", dates: "03/Nov – 06/Nov", obs: "Café da manhã incluso" },
            { city: "⛪ Assis",   nights: "5 noites", stars: "Convento",   dates: "06/Nov – 11/Nov", obs: "Experiência única! Café da manhã incluso" },
          ].map((h, i) => (
            <div key={i} style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${C.creamD}` }}>
              <Title size={17} style={{ display: "block", marginBottom: 8 }}>{h.city}</Title>
              <div style={{ display: "flex", gap: 7, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ background: C.gold, color: "white", borderRadius: 20, padding: "3px 11px", fontSize: 12, fontFamily: "'Cinzel', serif" }}>{h.nights}</span>
                <span style={{ background: C.creamD, borderRadius: 20, padding: "3px 11px", fontSize: 12, color: C.brownM }}>{h.stars}</span>
              </div>
              <div style={{ fontSize: 14, color: C.brownM }}>📅 {h.dates}</div>
              <div style={{ fontSize: 13.5, marginTop: 4 }}>☕ {h.obs}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: Contato e emergências
// ═══════════════════════════════════════════════════════════
function PageContato() {
  return (
    <div style={{ padding: "18px 16px" }}>
      <div style={{ marginBottom: 18 }}>
        <Title size={22} style={{ display: "block", marginBottom: 4 }}>Contato</Title>
        <div style={{ color: C.brownM, fontSize: 14 }}>Agência, direção espiritual e emergências</div>
      </div>

      {/* Agência */}
      <div style={{ background: `linear-gradient(150deg, ${C.navy}, ${C.navyL})`, borderRadius: 16, padding: "20px 18px", border: `2px solid ${C.gold}`, marginBottom: 14 }}>
        <Title size={17} color={C.gold} style={{ display: "block", marginBottom: 14 }}>
          🏢 Beth Viagens e Turismo
        </Title>
        <a href="tel:+5562984296855" style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", textDecoration: "none", border: "1px solid rgba(196,146,42,0.3)", marginBottom: 10 }}>
          <span style={{ fontSize: 26 }}>📱</span>
          <div>
            <div style={{ color: C.gold, fontSize: 9.5, fontFamily: "'Cinzel', serif", letterSpacing: 1.5 }}>WHATSAPP / TELEFONE</div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 700 }}>(62) 98429-6855</div>
          </div>
        </a>
        <a href="mailto:bethviagens.comercial@gmail.com" style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", textDecoration: "none", border: "1px solid rgba(196,146,42,0.3)" }}>
          <span style={{ fontSize: 26 }}>📧</span>
          <div>
            <div style={{ color: C.gold, fontSize: 9.5, fontFamily: "'Cinzel', serif", letterSpacing: 1.5 }}>E-MAIL</div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>bethviagens.comercial@gmail.com</div>
          </div>
        </a>
      </div>

      {/* Direção espiritual */}
      <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${C.creamD}` }}>
        <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
          🙏 Direção Espiritual
        </Title>
        <div style={{ display: "flex", gap: 10 }}>
          {["Frei Edgar Manso", "Frei Matheus Morais"].map((name, i) => (
            <div key={i} style={{ flex: 1, background: C.creamD, borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🕊️</div>
              <Title size={13} style={{ lineHeight: 1.4, display: "block" }}>{name}</Title>
            </div>
          ))}
        </div>
      </div>

      {/* Emergências */}
      <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${C.creamD}` }}>
        <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
          🆘 Emergências Locais
        </Title>
        {[
          { country: "🇵🇹 Portugal",            number: "112",               detail: "Polícia, INEM (ambulância), Bombeiros"   },
          { country: "🇮🇹 Itália",              number: "112",               detail: "Polícia 113 · Ambulância 118 · Bombeiros 115" },
          { country: "🇧🇷 Consulado BR em Roma",   number: "+39 06 4222 200",   detail: "Emergência para brasileiros na Itália"   },
          { country: "🇧🇷 Consulado BR em Lisboa", number: "+351 21 392 4000", detail: "Emergência para brasileiros em Portugal"  },
        ].map((e, i, arr) => (
          <div key={i} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamD}` : "none" }}>
            <Title size={13.5} style={{ display: "block", marginBottom: 5 }}>{e.country}</Title>
            <a href={`tel:${e.number.replace(/\s/g, "")}`} style={{ display: "inline-block", background: "#FDECEA", color: C.red, borderRadius: 8, padding: "5px 12px", fontSize: 15, fontWeight: 700, textDecoration: "none", marginBottom: 4 }}>
              🆘 {e.number}
            </a>
            <div style={{ fontSize: 12, color: C.brownM }}>{e.detail}</div>
          </div>
        ))}
      </div>

      {/* Documentos */}
      <div style={{ background: "#FFFDF8", borderRadius: 14, padding: 16, border: `1px solid ${C.creamD}` }}>
        <Title size={11} color={C.gold} style={{ letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
          📋 Documentos Essenciais
        </Title>
        {[
          "Passaporte válido (mínimo até Maio/2027)",
          "Seguro viagem com cobertura Schengen",
          "Vouchers da viagem (enviados 2 dias antes)",
          "Euro (€) em espécie — despesas pessoais",
          "Cartão de crédito internacional (backup)",
        ].map((d, i, arr) => (
          <div key={i} style={{ fontSize: 14, padding: "7px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamD}` : "none", display: "flex", gap: 8, lineHeight: 1.5 }}>
            <span style={{ color: C.green }}>✓</span>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  APP PRINCIPAL
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage]           = useState("hoje");
  const [expandedDay, setExpanded] = useState(null);
  const [weather, setWeather]     = useState({});

  // Busca previsão do tempo ao carregar
  useEffect(() => {
    async function fetchWeather() {
      const results = {};
      for (const [key, city] of Object.entries(WEATHER_CITIES)) {
        try {
          const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${city.lat}&longitude=${city.lon}` +
            `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
            `&timezone=auto&start_date=2026-10-30&end_date=2026-11-12`;
          const res  = await fetch(url);
          const data = await res.json();
          if (data.daily) results[key] = data.daily;
        } catch (_) {
          // Silencioso — previsão ainda não disponível para datas futuras
        }
      }
      setWeather(results);
    }
    fetchWeather();
  }, []);

  // Lógica de data
  const today      = new Date(); today.setHours(0, 0, 0, 0);
  const tripStart  = new Date("2026-10-30T00:00:00");
  const tripEnd    = new Date("2026-11-12T00:00:00");
  const daysUntilTrip = Math.ceil((tripStart - today) / 86400000);
  const currentDay    = ITINERARY.find(d => d.date === getTodayString()) || null;
  const tripOver      = today > tripEnd;

  const NAV_ITEMS = [
    { id: "hoje",    icon: "🏠", label: "Hoje"    },
    { id: "roteiro", icon: "📅", label: "Roteiro" },
    { id: "clima",   icon: "⛅", label: "Clima"   },
    { id: "pacote",  icon: "📋", label: "Pacote"  },
    { id: "contato", icon: "📞", label: "Contato" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: C.cream,
      fontFamily: "'EB Garamond', Georgia, serif",
      color: C.brown,
      paddingBottom: 82,
      maxWidth: 520,
      margin: "0 auto",
      position: "relative",
    }}>
      {/* ── Cabeçalho ── */}
      <header style={{
        background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyL} 100%)`,
        padding: "20px 20px 16px",
        boxShadow: "0 4px 24px rgba(27,43,94,0.35)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ fontFamily: "'Cinzel', serif", color: C.gold, fontSize: 11, letterSpacing: 6, textAlign: "center", marginBottom: 5 }}>
          ✦  ✝  ✦
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", color: C.gold, fontSize: 17, letterSpacing: 1.5, textAlign: "center", lineHeight: 1.3, marginBottom: 4 }}>
          Jubileu Franciscano 2026
        </div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11.5, textAlign: "center", letterSpacing: 0.5 }}>
          Peregrinação · Portugal & Itália · 30 Out – 12 Nov
        </div>
      </header>

      {/* ── Conteúdo da página ── */}
      {page === "hoje"    && <PageHoje currentDay={currentDay} daysUntilTrip={daysUntilTrip} tripOver={tripOver} weather={weather} />}
      {page === "roteiro" && <PageRoteiro expandedDay={expandedDay} setExpandedDay={setExpanded} />}
      {page === "clima"   && <PageClima weather={weather} />}
      {page === "pacote"  && <PagePacote />}
      {page === "contato" && <PageContato />}

      {/* ── Barra de navegação inferior ── */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 520,
        background: C.navy,
        display: "flex",
        borderTop: `2.5px solid ${C.gold}`,
        zIndex: 100,
      }}>
        {NAV_ITEMS.map(n => (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            style={{
              flex: 1,
              padding: "10px 2px 8px",
              background: page === n.id ? "rgba(196,146,42,0.18)" : "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span style={{ fontSize: 21 }}>{n.icon}</span>
            <span style={{
              fontSize: 9.5,
              color: page === n.id ? C.gold : "rgba(255,255,255,0.5)",
              fontFamily: "'Cinzel', serif",
              letterSpacing: 0.5,
              fontWeight: page === n.id ? 700 : 400,
            }}>
              {n.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
