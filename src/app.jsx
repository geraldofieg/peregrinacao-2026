import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════
//  ROTEIRO
// ═══════════════════════════════════════════════════════════
const ITINERARY = [
  { day:1,  date:"2026-10-30", weekday:"Sexta-feira",   location:"Goiânia / Brasília → Lisboa", city:"goiania", icon:"✈️", morning:"Partida de Goiânia em horário combinado. Transfer em ônibus privativo para Brasília. Embarque para Lisboa.", afternoon:"Em viagem intercontinental.", evening:"Em voo — descanse bem para a chegada!", highlights:["Início da peregrinação 🙏","Voo Brasília → Lisboa"], prayer:"Senhor, abençoa nossa partida e guia nossos passos nesta jornada de fé." },
  { day:2,  date:"2026-10-31", weekday:"Sábado",        location:"Lisboa, Portugal 🇵🇹", city:"lisboa", icon:"🛬", morning:"Chegada ao Aeroporto de Lisboa. Imigração. Transfer para o hotel. Check-in e descanso.", afternoon:"Tarde livre — compras ou explorar Lisboa.", evening:"Noite livre.", highlights:["Chegada em Lisboa 🇵🇹","Check-in no hotel ****"], prayer:"Bem-vindos a Lisboa! Obrigado, Senhor, por nos trazer com segurança." },
  { day:3,  date:"2026-11-01", weekday:"Domingo",       location:"Lisboa → Fátima 🕊️", city:"fatima", icon:"🕊️", morning:"Peregrinação para Fátima com guia. Basílica Santíssima Trindade e atividades religiosas.", afternoon:"City tour no Santuário de Fátima e Casa dos Pastorinhos.", evening:"Santa Missa e Procissão das Velas. Retorno para Lisboa.", highlights:["Santuário de Fátima 🕊️","Casa dos Pastorinhos","Santa Missa","Procissão das Velas 🕯️"], prayer:"Nossa Senhora de Fátima, intercede por nós e abençoa esta peregrinação." },
  { day:4,  date:"2026-11-02", weekday:"Segunda-feira", location:"Lisboa, Portugal 🇵🇹", city:"lisboa", icon:"⛪", morning:"Santa Missa na Igreja de Santo Antônio. Visita à Sé Catedral de Lisboa.", afternoon:"City tour: Torre de Belém, Mosteiro dos Jerônimos, Pasteis de Belém, Castelo de São Jorge, Alfama.", evening:"Noite livre.", highlights:["Igreja de Santo Antônio ⛪","Sé Catedral de Lisboa","Torre de Belém 🏰","Mosteiro dos Jerônimos"], prayer:"Santo Antônio de Lisboa e de Pádua, rogai por nós!" },
  { day:5,  date:"2026-11-03", weekday:"Terça-feira",   location:"Lisboa → Roma ✈️", city:"roma", icon:"✈️", morning:"Café da manhã. Transfer para o aeroporto de Lisboa. Voo para Roma.", afternoon:"Chegada em Roma. Transfer para o hotel. Check-in e descanso.", evening:"Noite livre. Bem-vindos à Cidade Eterna!", highlights:["Voo Lisboa → Roma ✈️","Check-in em Roma 🇮🇹"], prayer:"Senhor, guia nossa jornada até a Cidade Eterna." },
  { day:6,  date:"2026-11-04", weekday:"Quarta-feira",  location:"Roma / Vaticano 🇻🇦", city:"roma", icon:"✝️", morning:"Transfer para o Vaticano. Catequese Papal — se o Papa estiver em Roma.", afternoon:"Passeio a pé: Praça Navona, Fontana di Trevi e Pantheon Romano.", evening:"Noite livre.", highlights:["Catequese Papal 🇻🇦","Praça Navona","Fontana di Trevi ⛲","Pantheon"], prayer:"Santo Padre, abençoa nossa peregrinação ao Jubileu Franciscano." },
  { day:7,  date:"2026-11-05", weekday:"Quinta-feira",  location:"Roma, Itália 🇮🇹", city:"roma", icon:"🏛️", morning:"City tour: Basílica de São Pedro, Museus do Vaticano, Coliseu, Fontana di Trevi, Panteão, Praça da Espanha.", afternoon:"Tarde livre — compras ou explorar Roma.", evening:"Noite livre.", highlights:["Basílica de São Pedro ✝️","Coliseu 🏛️","Museus do Vaticano"], prayer:"São Pedro, guarda nossa fé e fortalece nosso caminho." },
  { day:8,  date:"2026-11-06", weekday:"Sexta-feira",   location:"Roma → Assis 🚂", city:"assis", icon:"🚂", morning:"Após o café da manhã, trem para Assis. Transfer para o convento. Acomodação e descanso.", afternoon:"Tarde livre — ruas medievais de Assis. Momentos de oração.", evening:"Noite livre. Bem-vindos a Assis!", highlights:["Trem Roma → Assis 🚂","Hospedagem em Convento ⛪"], prayer:"São Francisco de Assis, rogai por nós. Paz e Bem! 🕊️" },
  { day:9,  date:"2026-11-07", weekday:"Sábado",        location:"Assis, Itália 🌿", city:"assis", icon:"🌿", morning:"Santa Missa na Porciúncula.", afternoon:"Às 15h: Basílica de Santa Clara, Catedral de São Rufino, Igrejinha de São Damião.", evening:"Noite livre.", highlights:["Missa na Porciúncula 🕊️","Basílica de Santa Clara","Catedral de São Rufino","Igreja de São Damião"], prayer:"Francisco e Clara, ensinai-nos a simplicidade e o amor." },
  { day:10, date:"2026-11-08", weekday:"Domingo",       location:"Assis, Itália ⛪", city:"assis", icon:"⛪", morning:"Santa Missa na Basílica de São Francisco.", afternoon:"Tarde livre. Sugestão opcional: vinícola local.", evening:"Noite livre.", highlights:["Missa na Basílica de São Francisco 🙏"], prayer:"São Francisco, que nossa fé floresça como a tua." },
  { day:11, date:"2026-11-09", weekday:"Segunda-feira", location:"Santuários da Região 🙏", city:"assis", icon:"🙏", morning:"City tour: Fonte Colombo, Santuário Della Foresta, Convento de Bustone e Greccio.", afternoon:"Retorno para Assis.", evening:"Noite livre.", highlights:["Fonte Colombo","Santuário Della Foresta","Convento de Bustone","Greccio 🌟"], prayer:"Que os passos de Francisco iluminem nossa peregrinação." },
  { day:12, date:"2026-11-10", weekday:"Terça-feira",   location:"La Verna, Itália ⛰️", city:"laverna", icon:"⛰️", morning:"Visita ao Santuário de La Verna — onde São Francisco recebeu as Estigmas.", afternoon:"Continuação da visita a La Verna. Retorno.", evening:"Noite livre.", highlights:["Santuário de La Verna ⛰️","Local das Estigmas de São Francisco 🌟"], prayer:"Senhor, que recebamos as chagas do teu amor como Francisco." },
  { day:13, date:"2026-11-11", weekday:"Quarta-feira",  location:"Cássia → Roma → Brasil 🏠", city:"assis", icon:"🏠", morning:"Café da manhã. Visita a Cássia. Transfer para o aeroporto de Roma. Embarque para o Brasil.", afternoon:"Em voo de retorno.", evening:"Chegada em Brasília: 12/Nov às 16h40. Transfer → Goiânia.", highlights:["Visita a Cássia 🙏","Voo Roma → Brasil ✈️","Chegada em Brasília: 12/Nov às 16h40 🇧🇷"], prayer:"Senhor, obrigado por esta peregrinação abençoada. Paz e Bem! 🕊️" },
];

// ═══════════════════════════════════════════════════════════
//  CHECKLIST DE PROVIDÊNCIAS
//  Edite aqui os itens conforme necessário
// ═══════════════════════════════════════════════════════════
const CHECKLIST_ITEMS = [
  { id:"passport",   text:"Renovar / tirar passaporte (validade mínima: Maio/2027)",       urgente: true  },
  { id:"seguro",     text:"Contratar Seguro Viagem com cobertura Schengen",                urgente: true  },
  { id:"euros",      text:"Comprar Euros em espécie para despesas pessoais",               urgente: false },
  { id:"banco",      text:"Avisar o banco sobre uso do cartão no exterior",                urgente: false },
  { id:"cartao",     text:"Verificar limite e validade do cartão de crédito internacional", urgente: false },
  { id:"vacinas",    text:"Verificar vacinas recomendadas para Europa",                    urgente: false },
  { id:"adaptador",  text:"Comprar adaptador de tomada (Europa — Tipo C/F)",               urgente: false },
  { id:"remedio",    text:"Separar medicamentos de uso contínuo + receitas médicas",       urgente: false },
  { id:"dados",      text:"Confirmar dados pessoais com a agência Beth Viagens",           urgente: false },
  { id:"apps",       text:"Instalar aplicativos: tradutor offline, Google Maps, WhatsApp", urgente: false },
  { id:"voucher",    text:"Receber vouchers da viagem (enviados 2 dias antes do embarque)", urgente: false },
];

// ═══════════════════════════════════════════════════════════
//  CLIMA HISTÓRICO (médias reais de outubro/novembro)
// ═══════════════════════════════════════════════════════════
const HISTORICAL_CLIMATE = [
  {
    city: "🇵🇹 Lisboa",
    period: "31 Out – 03 Nov",
    maxC: 19, minC: 12,
    rainDays: 9,
    humidity: "76%",
    desc: "Outono ameno e agradável. Dias ensolarados são comuns, mas chuvas passageiras acontecem. Leve casaco para a noite.",
    tip: "💡 Vista-se em camadas — pela manhã pode fazer frio, mas o dia aquece.",
  },
  {
    city: "🇵🇹 Fátima",
    period: "01 Nov",
    maxC: 17, minC: 9,
    rainDays: 10,
    humidity: "80%",
    desc: "Ligeiramente mais fria e úmida que Lisboa por estar no interior. Noites frescas, especialmente para a Procissão das Velas.",
    tip: "💡 Leve casaco para a Procissão das Velas à noite — pode fazer bastante frio.",
  },
  {
    city: "🇮🇹 Roma",
    period: "03 Nov – 06 Nov",
    maxC: 17, minC: 10,
    rainDays: 11,
    humidity: "74%",
    desc: "Outono romano é temperado. Chuvas aumentam em novembro mas raramente são longas. Muito agradável para caminhar.",
    tip: "💡 Um guarda-chuva compacto pode ser útil. Roupas leves durante o dia, agasalho à noite.",
  },
  {
    city: "🇮🇹 Assis",
    period: "06 Nov – 11 Nov",
    maxC: 14, minC: 5,
    rainDays: 13,
    humidity: "78%",
    desc: "Mais fria e úmida que Roma por estar em altitude (424m). Névoa matinal é comum. Paisagem deslumbrante no outono.",
    tip: "💡 Leve casaco grosso, cachecol e sapatos confortáveis para caminhar nas pedras medievais.",
  },
  {
    city: "🇮🇹 La Verna",
    period: "10 Nov",
    maxC: 10, minC: 2,
    rainDays: 14,
    humidity: "82%",
    desc: "Santuário em altitude elevada (1.128m). Novembro é frio e pode haver geada. Atmosfera mística e contemplativa.",
    tip: "💡 Roupas de inverno recomendadas: casaco pesado, luvas e cachecol. Vale muito a pena!",
  },
];

// ═══════════════════════════════════════════════════════════
//  PREVISÃO DO TEMPO — coordenadas Open-Meteo
// ═══════════════════════════════════════════════════════════
const WEATHER_CITIES = {
  goiania: { lat:-16.6864, lon:-49.2643, name:"Goiânia"  },
  lisboa:  { lat:38.7169,  lon:-9.1399,  name:"Lisboa"   },
  fatima:  { lat:39.6273,  lon:-8.6671,  name:"Fátima"   },
  roma:    { lat:41.9028,  lon:12.4964,  name:"Roma"     },
  assis:   { lat:43.0707,  lon:12.6156,  name:"Assis"    },
  laverna: { lat:43.6967,  lon:11.9292,  name:"La Verna" },
};
const WMO = {
  0:"☀️ Céu limpo", 1:"🌤️ Principalmente limpo", 2:"⛅ Parcialmente nublado",
  3:"☁️ Nublado", 45:"🌫️ Névoa", 51:"🌦️ Garoa fraca", 53:"🌦️ Garoa",
  61:"🌧️ Chuva fraca", 63:"🌧️ Chuva", 65:"🌧️ Chuva forte",
  80:"🌦️ Pancadas", 82:"⛈️ Pancadas fortes", 95:"⛈️ Tempestade",
};

// ═══════════════════════════════════════════════════════════
//  CORES e TIPOGRAFIA — alto contraste para idosos
// ═══════════════════════════════════════════════════════════
const C = {
  navy:"#1A2B5F", navyL:"#263d8a", gold:"#B8840A", goldL:"#e6a820",
  cream:"#FBF7EE", creamD:"#EDE0C4", white:"#FFFFFF",
  brown:"#1A0F00", brownM:"#4A3520", green:"#1B5E20", red:"#B71C1C",
  orange:"#E65100",
};
const T = {
  pageTitle:    { fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:700, color:C.navy,   lineHeight:1.2 },
  sectionTitle: { fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:C.navy,   lineHeight:1.3 },
  label:        { fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, color:C.gold,   letterSpacing:1.5, textTransform:"uppercase" },
  body:         { fontSize:18, lineHeight:1.75, color:C.brown, fontWeight:500 },
  sub:          { fontSize:16, color:C.brownM, lineHeight:1.6 },
};

// ═══════════════════════════════════════════════════════════
//  UTILITÁRIOS
// ═══════════════════════════════════════════════════════════
function getWx(code) {
  if (code == null) return null;
  return WMO[code] || WMO[Math.floor(code/10)*10] || "🌤️ Variável";
}
function fmtDate(s) {
  const [,m,d] = s.split("-");
  const mo = ["","Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  return `${parseInt(d)} de ${mo[parseInt(m)]}`;
}
function todayStr() {
  const t = new Date(); t.setHours(0,0,0,0);
  return t.toISOString().split("T")[0];
}

// ═══════════════════════════════════════════════════════════
//  COMPONENTES BASE
// ═══════════════════════════════════════════════════════════
function Card({ children, style={} }) {
  return <div style={{ background:C.white, borderRadius:18, padding:"20px 18px", marginBottom:16, boxShadow:"0 3px 18px rgba(0,0,0,0.09)", border:`1px solid ${C.creamD}`, ...style }}>{children}</div>;
}
function Divider() {
  return <hr style={{ border:"none", borderTop:`1px solid ${C.creamD}`, margin:"12px 0" }} />;
}
function PrayerBox({ text }) {
  return (
    <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius:14, padding:"18px 16px", marginTop:16 }}>
      <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontSize:16, fontStyle:"italic", textAlign:"center", lineHeight:1.7 }}>🙏 {text}</div>
    </div>
  );
}
function DayBadge({ day }) {
  return <span style={{ background:C.gold, color:C.white, borderRadius:20, padding:"4px 14px", fontSize:14, fontFamily:"'Cinzel',serif", fontWeight:700 }}>Dia {day}</span>;
}
function SectionLabel({ children }) {
  return <div style={{ ...T.label, display:"block", marginBottom:14 }}>{children}</div>;
}

function WxBadge({ code, max, min, precip, compact=false }) {
  const label = getWx(code);
  if (!label) return <span style={{ ...T.sub, fontStyle:"italic" }}>Em breve…</span>;
  if (compact) return (
    <div style={{ textAlign:"right" }}>
      <div style={{ fontSize:15, color:C.brown, fontWeight:600 }}>{label}</div>
      <div style={{ fontSize:18, color:C.gold, fontWeight:700 }}>{Math.round(max)}° / {Math.round(min)}°</div>
      {precip>20 && <div style={{ fontSize:14, color:"#1565C0" }}>💧 {precip}%</div>}
    </div>
  );
  return (
    <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:12, padding:"14px 16px", marginTop:12, textAlign:"center" }}>
      <div style={{ color:C.white, fontSize:18, marginBottom:6, fontWeight:600 }}>{label}</div>
      <div style={{ color:C.goldL, fontSize:36, fontWeight:700, fontFamily:"'Cinzel',serif" }}>
        {Math.round(max)}°<span style={{ fontSize:22, color:"rgba(255,255,255,0.6)" }}> / {Math.round(min)}°</span>
      </div>
      {precip>20 && <div style={{ color:"rgba(255,255,255,0.75)", fontSize:15, marginTop:6 }}>💧 {precip}% de chance de chuva</div>}
    </div>
  );
}

function DayCard({ d, expanded, onToggle }) {
  return (
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
      {expanded && (
        <>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
            {d.highlights.map((h,i)=><span key={i} style={{ background:C.creamD, borderRadius:20, padding:"6px 14px", fontSize:15, color:C.brownM, fontWeight:600 }}>{h}</span>)}
          </div>
          {[["Manhã","🌅",d.morning],["Tarde","☀️",d.afternoon],["Noite","🌙",d.evening]].map(([lab,em,txt],i,arr)=>(
            <div key={i}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
                <span style={{ ...T.label, fontSize:13, minWidth:56, paddingTop:3, display:"block" }}>{lab}</span>
                <span style={{ ...T.body, flex:1 }}>{em} {txt}</span>
              </div>
              {i<arr.length-1 && <Divider />}
            </div>
          ))}
          <PrayerBox text={d.prayer} />
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: HOJE
//  Inclui contagem regressiva, destinos e checklist persistente
// ═══════════════════════════════════════════════════════════
function PageHoje({ currentDay, daysUntilTrip, tripOver, weather, checked, toggleCheck }) {

  const total    = CHECKLIST_ITEMS.length;
  const done     = CHECKLIST_ITEMS.filter(i => checked[i.id]).length;
  const pct      = Math.round((done / total) * 100);
  const allDone  = done === total;

  const ChecklistBlock = () => (
    <Card>
      {/* Cabeçalho com progresso */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <SectionLabel>✅ Providências antes da viagem</SectionLabel>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color: allDone ? C.green : C.gold }}>{done}/{total}</span>
      </div>

      {/* Barra de progresso */}
      <div style={{ background:C.creamD, borderRadius:10, height:12, marginBottom:16, overflow:"hidden" }}>
        <div style={{ background: allDone ? C.green : C.gold, height:"100%", width:`${pct}%`, borderRadius:10, transition:"width 0.4s ease" }} />
      </div>
      {allDone && (
        <div style={{ background:"#E8F5E9", borderRadius:10, padding:"10px 14px", marginBottom:14, textAlign:"center", border:`2px solid ${C.green}` }}>
          <span style={{ color:C.green, fontSize:17, fontWeight:700 }}>🎉 Tudo pronto para a viagem!</span>
        </div>
      )}

      {/* Itens urgentes primeiro */}
      {[true, false].map(isUrgent => {
        const items = CHECKLIST_ITEMS.filter(i => i.urgente === isUrgent);
        return (
          <div key={String(isUrgent)}>
            {isUrgent && <div style={{ fontSize:13, fontWeight:700, color:C.red, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>⚠️ Prioritário</div>}
            {!isUrgent && <div style={{ fontSize:13, fontWeight:700, color:C.brownM, letterSpacing:1, textTransform:"uppercase", margin:"14px 0 8px" }}>Demais providências</div>}
            {items.map((item, i, arr) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                style={{ display:"flex", gap:14, padding:"13px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start", cursor:"pointer" }}
              >
                {/* Checkbox visual */}
                <div style={{ width:28, height:28, borderRadius:8, border:`2.5px solid ${checked[item.id] ? C.green : (isUrgent && !checked[item.id] ? C.red : C.creamD)}`, background:checked[item.id]?C.green:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, transition:"all 0.2s" }}>
                  {checked[item.id] && <span style={{ color:C.white, fontSize:16, fontWeight:700, lineHeight:1 }}>✓</span>}
                </div>
                <span style={{ ...T.body, fontSize:17, textDecoration:checked[item.id]?"line-through":"none", color:checked[item.id]?C.brownM:C.brown, lineHeight:1.55 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        );
      })}
      <div style={{ ...T.sub, fontSize:13, marginTop:14, textAlign:"center", color:C.brownM }}>Toque em cada item para marcar como concluído</div>
    </Card>
  );

  // ── Viagem encerrada ──
  if (tripOver) return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"36px 22px", border:`2px solid ${C.gold}`, textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:64, marginBottom:14 }}>🕊️</div>
        <div style={{ ...T.pageTitle, color:C.goldL, marginBottom:14 }}>Peregrinação Concluída!</div>
        <p style={{ color:"rgba(255,255,255,0.85)", fontSize:18, lineHeight:1.8 }}>Que as graças recebidas nesta jornada sagrada acompanhem sempre vocês.</p>
        <div style={{ color:C.goldL, fontFamily:"'Cinzel',serif", fontStyle:"italic", fontSize:18, marginTop:20 }}>Paz e Bem! 🕊️</div>
      </div>
    </div>
  );

  // ── Contagem regressiva ──
  if (daysUntilTrip > 0) return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"30px 20px", border:`2px solid ${C.gold}`, textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:50, marginBottom:10 }}>✈️</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:"rgba(255,255,255,0.65)", fontSize:14, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Faltam</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:80, fontWeight:700, lineHeight:1 }}>{daysUntilTrip}</div>
        <div style={{ color:"rgba(255,255,255,0.75)", fontSize:20, marginTop:8, fontWeight:600 }}>dias para a peregrinação</div>
        <div style={{ color:"rgba(255,255,255,0.45)", fontSize:16, marginTop:6 }}>Partida: 30 de outubro de 2026</div>
      </div>

      {/* Checklist de providências — destaque na home */}
      <ChecklistBlock />

      {/* Destinos */}
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

  // ── Durante a viagem ──
  const cw = weather[currentDay?.city];
  let todayW = null;
  if (currentDay && cw) {
    const idx = cw.time?.indexOf(todayStr());
    if (idx>=0) todayW = { max:cw.temperature_2m_max?.[idx], min:cw.temperature_2m_min?.[idx], code:cw.weathercode?.[idx], precip:cw.precipitation_probability_max?.[idx] };
  }
  if (!currentDay) return (
    <div style={{ padding:"20px 16px" }}>
      <Card style={{ textAlign:"center", padding:"40px 20px" }}>
        <div style={{ fontSize:48, marginBottom:10 }}>🕊️</div>
        <div style={T.sectionTitle}>Em Peregrinação</div>
        <div style={{ ...T.sub, marginTop:8 }}>Consulte o Roteiro completo.</div>
      </Card>
    </div>
  );

  return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"24px 20px", border:`2px solid ${C.gold}`, marginBottom:16 }}>
        <div style={{ textAlign:"center", marginBottom:todayW?12:0 }}>
          <div style={{ fontSize:52, marginBottom:8 }}>{currentDay.icon}</div>
          <div style={{ fontFamily:"'Cinzel',serif", color:"rgba(255,255,255,0.6)", fontSize:13, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>HOJE · DIA {currentDay.day} DE 13</div>
          <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:22, lineHeight:1.3, marginBottom:6 }}>{currentDay.location}</div>
          <div style={{ color:"rgba(255,255,255,0.55)", fontSize:16 }}>{currentDay.weekday} · {fmtDate(currentDay.date)}</div>
        </div>
        {todayW && <WxBadge {...todayW} />}
      </div>
      <Card>
        <SectionLabel>⭐ Destaques de Hoje</SectionLabel>
        {currentDay.highlights.map((h,i)=><div key={i} style={{ background:C.creamD, borderRadius:10, padding:"12px 14px", marginBottom:8, borderLeft:`4px solid ${C.gold}`, ...T.body, fontSize:17 }}>{h}</div>)}
      </Card>
      <Card>
        <SectionLabel>📅 Programação do Dia</SectionLabel>
        {[["Manhã","🌅",currentDay.morning],["Tarde","☀️",currentDay.afternoon],["Noite","🌙",currentDay.evening]].map(([lab,em,txt],i,arr)=>(
          <div key={i}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
              <span style={{ ...T.label, fontSize:13, minWidth:56, paddingTop:3, display:"block" }}>{lab}</span>
              <span style={{ ...T.body, flex:1 }}>{em} {txt}</span>
            </div>
            {i<arr.length-1 && <Divider />}
          </div>
        ))}
        <PrayerBox text={currentDay.prayer} />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: ROTEIRO
// ═══════════════════════════════════════════════════════════
function PageRoteiro({ expandedDay, setExpandedDay }) {
  return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:18 }}>
        <div style={T.pageTitle}>Roteiro Completo</div>
        <div style={{ ...T.sub, marginTop:4 }}>30 de Out – 12 de Nov de 2026 · 13 dias</div>
      </div>
      {ITINERARY.map(d=>(
        <DayCard key={d.day} d={d} expanded={expandedDay===d.day} onToggle={()=>setExpandedDay(expandedDay===d.day?null:d.day)} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: CLIMA (com abas: Previsão / Histórico)
// ═══════════════════════════════════════════════════════════
function PageClima({ weather }) {
  const [tab, setTab] = useState("previsao");

  const cityDayMap = {};
  ITINERARY.forEach(d=>{
    if (!cityDayMap[d.city]) cityDayMap[d.city]=[];
    if (!cityDayMap[d.city].find(x=>x.date===d.date)) cityDayMap[d.city].push({ date:d.date, day:d.day });
  });
  const flag = k=>({ goiania:"🇧🇷", lisboa:"🇵🇹", fatima:"🇵🇹", roma:"🇮🇹", assis:"🇮🇹", laverna:"🇮🇹" }[k]||"🌍");

  return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:16 }}>
        <div style={T.pageTitle}>Clima</div>
      </div>

      {/* Abas */}
      <div style={{ display:"flex", gap:8, marginBottom:18 }}>
        {[
          { id:"previsao", label:"🌦️ Previsão" },
          { id:"historico", label:"📊 Histórico" },
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:"12px 8px", borderRadius:14, border:`2px solid ${tab===t.id?C.gold:C.creamD}`, background:tab===t.id?C.gold:C.white, color:tab===t.id?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ABA: PREVISÃO DO TEMPO REAL */}
      {tab === "previsao" && (
        <>
          <Card style={{ background:"#EEF2FF", border:"none" }}>
            <div style={{ ...T.body, fontSize:16, lineHeight:1.7, color:C.navy }}>
              🛰️ Dados atualizados automaticamente via Open-Meteo (serviço gratuito). A previsão exata fica disponível quando faltar <strong>até 16 dias</strong> para cada data.
            </div>
          </Card>
          {Object.entries(cityDayMap).map(([cityKey,days])=>{
            const info = WEATHER_CITIES[cityKey];
            const cw   = weather[cityKey];
            return (
              <Card key={cityKey}>
                <div style={{ ...T.sectionTitle, marginBottom:14 }}>{flag(cityKey)} {info?.name}</div>
                {days.map((di,i)=>{
                  let w=null;
                  if(cw){const idx=cw.time?.indexOf(di.date);if(idx>=0)w={max:cw.temperature_2m_max?.[idx],min:cw.temperature_2m_min?.[idx],code:cw.weathercode?.[idx],precip:cw.precipitation_probability_max?.[idx]};}
                  return (
                    <div key={di.date} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:i<days.length-1?`1px solid ${C.creamD}`:"none" }}>
                      <div><DayBadge day={di.day} /><div style={{ ...T.sub, fontSize:15, marginTop:4 }}>{fmtDate(di.date)}</div></div>
                      {w?<WxBadge {...w} compact/>:<span style={{ ...T.sub, fontSize:15, fontStyle:"italic" }}>Em breve…</span>}
                    </div>
                  );
                })}
              </Card>
            );
          })}
        </>
      )}

      {/* ABA: HISTÓRICO / EXPECTATIVA */}
      {tab === "historico" && (
        <>
          <Card style={{ background:"#FFF8E1", border:`1px solid #FFD54F` }}>
            <div style={{ ...T.body, fontSize:16, lineHeight:1.7, color:"#5D4037" }}>
              📊 Estas são as <strong>médias históricas reais</strong> para o final de outubro e novembro em cada destino, baseadas em dados climáticos dos últimos anos. Use como referência para o que esperar e como se preparar.
            </div>
          </Card>

          {HISTORICAL_CLIMATE.map((h,i)=>(
            <Card key={i}>
              {/* Título */}
              <div style={{ ...T.sectionTitle, marginBottom:4 }}>{h.city}</div>
              <div style={{ ...T.sub, fontSize:15, marginBottom:14 }}>📅 {h.period}</div>

              {/* Temperatura */}
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

              {/* Chuva e umidade */}
              <div style={{ display:"flex", gap:10, marginBottom:14 }}>
                <div style={{ flex:1, background:"#E3F2FD", borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
                  <div style={{ fontSize:24, marginBottom:4 }}>🌧️</div>
                  <div style={{ fontWeight:700, fontSize:17, color:"#1565C0" }}>{h.rainDays} dias</div>
                  <div style={{ fontSize:13, color:"#1565C0" }}>de chuva no mês</div>
                </div>
                <div style={{ flex:1, background:"#F3E5F5", borderRadius:12, padding:"12px 10px", textAlign:"center" }}>
                  <div style={{ fontSize:24, marginBottom:4 }}>💧</div>
                  <div style={{ fontWeight:700, fontSize:17, color:"#6A1B9A" }}>{h.humidity}</div>
                  <div style={{ fontSize:13, color:"#6A1B9A" }}>umidade média</div>
                </div>
              </div>

              {/* Descrição */}
              <div style={{ ...T.body, fontSize:16, marginBottom:12, lineHeight:1.65 }}>{h.desc}</div>

              {/* Dica */}
              <div style={{ background:"#FFFDE7", borderRadius:10, padding:"12px 14px", borderLeft:`4px solid ${C.gold}` }}>
                <div style={{ ...T.body, fontSize:16, lineHeight:1.6 }}>{h.tip}</div>
              </div>
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
function PagePacote() {
  const [tab, setTab] = useState("incluso");
  const TABS = [
    { id:"incluso", label:"✅ Incluso"      },
    { id:"nao",     label:"⚠️ Não Incluso" },
    { id:"voos",    label:"✈️ Voos"         },
    { id:"hoteis",  label:"🏨 Hotéis"       },
  ];
  const INCLUSO = ["Direção espiritual: Frei Edgar Manso e Frei Matheus Morais","Agente de viagem acompanhante desde o Brasil","Ônibus privativo Goiânia → Brasília → Goiânia","Passagem aérea: Brasília ↔ Lisboa / Roma ↔ Brasília","Taxa de embarque","11 noites de hospedagem com café da manhã","Taxas dos hotéis (city taxes)","Transfer aeroportos de Lisboa e Roma","Transfer chegada em Assis + Transfer Assis → Roma","City tour panorâmico em Lisboa","City tour em Fátima + Casa dos Pastorinhos + Procissão das Velas","City tour panorâmico em Roma","Catequese Papal (se o Papa estiver em Roma)","Santuários: Fonte Colombo, Della Foresta, Bustone, Greccio","City tour para La Verna e visita a Cássia","Gorjetas (maleteiro e guias)","1 mala 23kg + 1 bordo 10kg + 1 item pessoal","Reserva de convites para Catequese Papal","Guias acompanhantes em Lisboa, Fátima e Assis","Camiseta personalizada da peregrinação"];
  const NAO = ["Seguro Viagem ⚠️ — OBRIGATÓRIO no Espaço Schengen","Despesas com passaporte e documentação","Bilhete de trem Roma → Assis","Guias locais e ingressos nos monumentos","Refeições e bebidas não mencionadas no programa","Lavanderia, telefonemas e táxis","Despesas pessoais","Bagagens além das mencionadas no programa"];

  return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:14 }}>
        <div style={T.pageTitle}>O Pacote</div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:19, fontWeight:700, color:C.gold, marginTop:4 }}>A partir de R$ 24.993,00 por pessoa</div>
        <div style={{ ...T.sub, fontSize:15, marginTop:4 }}>Entrada R$ 2.405 + 10× R$ 1.963,80 sem juros</div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flexShrink:0, padding:"10px 16px", borderRadius:24, border:`2px solid ${tab===t.id?C.gold:C.creamD}`, background:tab===t.id?C.gold:C.white, color:tab===t.id?C.white:C.brownM, fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab==="incluso" && <Card><SectionLabel>✅ Serviços Inclusos</SectionLabel>{INCLUSO.map((item,i,arr)=><div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}><span style={{ color:C.green, fontSize:20, flexShrink:0, fontWeight:700 }}>✓</span><span style={{ ...T.body, fontSize:17 }}>{item}</span></div>)}</Card>}
      {tab==="nao" && <Card><SectionLabel>⚠️ Não Incluso</SectionLabel>{NAO.map((item,i,arr)=><div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}><span style={{ color:C.red, fontSize:20, flexShrink:0, fontWeight:700 }}>✗</span><span style={{ ...T.body, fontSize:17 }}>{item}</span></div>)}<div style={{ background:"#FDECEA", borderRadius:12, padding:"16px 14px", marginTop:16, borderLeft:`5px solid ${C.red}` }}><div style={{ fontSize:18, color:C.red, fontWeight:700, marginBottom:6 }}>⚠️ Seguro Viagem é obrigatório!</div><div style={{ ...T.body, fontSize:17 }}>O Espaço Schengen (Portugal e Itália) exige comprovação de seguro. Sem ele, pode haver recusa de embarque.</div></div></Card>}
      {tab==="voos" && <><Card><SectionLabel>✈️ Voos Inclusos</SectionLabel>{[{rota:"Brasília → Lisboa",dia:"30/Out · Dia 1",obs:"Saída de Goiânia de ônibus privativo"},{rota:"Lisboa → Roma",dia:"03/Nov · Dia 5",obs:"Pela manhã, após café da manhã"},{rota:"Roma → Brasília",dia:"11/Nov · Dia 13",obs:"Chegada em Brasília: 12/Nov às 16h40"}].map((f,i,arr)=><div key={i} style={{ padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}><div style={{ ...T.sectionTitle, fontSize:18 }}>✈️ {f.rota}</div><div style={{ color:C.gold, fontSize:16, fontWeight:700, marginTop:4 }}>{f.dia}</div><div style={{ ...T.sub, fontSize:16, marginTop:2 }}>{f.obs}</div></div>)}</Card><Card><SectionLabel>🧳 Bagagem Inclusa</SectionLabel>{["🟢  1 mala despachada — até 23kg","🟢  1 bagagem de bordo — até 10kg","🟢  1 item pessoal — bolsa ou mochila pequena","🔴  Malas extras: não incluso"].map((t,i,arr)=><div key={i} style={{ ...T.body, fontSize:17, padding:"10px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}>{t}</div>)}</Card></>}
      {tab==="hoteis" && [{city:"🇵🇹 Lisboa",nights:"4 noites",stars:"Hotel ****",dates:"31/Out – 03/Nov"},{city:"🇮🇹 Roma",nights:"3 noites",stars:"Hotel ****",dates:"03/Nov – 06/Nov"},{city:"⛪ Assis",nights:"5 noites",stars:"Convento",dates:"06/Nov – 11/Nov",obs:"Experiência única!"}].map((h,i)=><Card key={i}><div style={{ ...T.sectionTitle, marginBottom:10 }}>{h.city}</div><div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}><span style={{ background:C.gold, color:C.white, borderRadius:20, padding:"5px 14px", fontSize:15, fontFamily:"'Cinzel',serif", fontWeight:700 }}>{h.nights}</span><span style={{ background:C.creamD, borderRadius:20, padding:"5px 14px", fontSize:15, color:C.brownM, fontWeight:600 }}>{h.stars}</span></div><div style={{ ...T.body, fontSize:17 }}>📅 {h.dates}</div><div style={{ ...T.body, fontSize:17, marginTop:6 }}>☕ Café da manhã incluso {h.obs?`— ${h.obs}`:""}</div></Card>)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: SALAS VIP
//  Pronta para receber informações dos cartões e aeroportos
// ═══════════════════════════════════════════════════════════
function PageSalasVip() {
  return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:16 }}>
        <div style={T.pageTitle}>Salas VIP</div>
        <div style={{ ...T.sub, marginTop:4 }}>Acesso nos aeroportos da rota</div>
      </div>

      {/* Aviso de seção em construção */}
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"26px 20px", border:`2px solid ${C.gold}`, textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🛋️</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:20, fontWeight:700, marginBottom:10 }}>Em Preparação</div>
        <div style={{ color:"rgba(255,255,255,0.75)", fontSize:17, lineHeight:1.75 }}>
          As informações sobre salas VIP estão sendo levantadas e serão adicionadas em breve, com base nos cartões de crédito disponíveis e nos aeroportos da rota.
        </div>
      </div>

      {/* O que será preenchido */}
      <Card>
        <SectionLabel>📋 O que será informado aqui</SectionLabel>
        {[
          { icon:"💳", titulo:"Cartões de crédito",   desc:"Quais cartões possuem benefício de sala VIP e quantos acessos estão disponíveis." },
          { icon:"✈️", titulo:"Aeroportos da rota",   desc:"Brasília (BSB) → Lisboa (LIS) → Roma (FCO) → Assis → Roma (FCO) → Brasília (BSB)." },
          { icon:"🏢", titulo:"Salas disponíveis",    desc:"Quais salas VIP cada aeroporto oferece e quais são acessíveis pelos cartões." },
          { icon:"⏱️", titulo:"Tempo de conexão",     desc:"Após confirmar horários dos voos, verificaremos se há tempo suficiente para aproveitar a sala." },
          { icon:"🤝", titulo:"Programas parceiros",  desc:"Loungekey, DragonPass, Priority Pass e outros programas de parceria serão verificados." },
        ].map((item,i,arr)=>(
          <div key={i} style={{ display:"flex", gap:14, padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none", alignItems:"flex-start" }}>
            <span style={{ fontSize:28, flexShrink:0 }}>{item.icon}</span>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:17, fontWeight:700, color:C.navy, marginBottom:4 }}>{item.titulo}</div>
              <div style={{ ...T.sub, fontSize:16 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* Aeroportos da rota — placeholder */}
      <Card>
        <SectionLabel>🗺️ Aeroportos da Rota</SectionLabel>
        {[
          { code:"BSB", name:"Aeroporto de Brasília", city:"Brasília, Brasil 🇧🇷", role:"Partida (30/Out) e Chegada (12/Nov)" },
          { code:"LIS", name:"Aeroporto Humberto Delgado", city:"Lisboa, Portugal 🇵🇹", role:"Chegada (31/Out) e Partida (03/Nov)" },
          { code:"FCO", name:"Aeroporto Leonardo da Vinci", city:"Roma, Itália 🇮🇹", role:"Chegada (03/Nov) e Partida (11/Nov)" },
        ].map((ap,i,arr)=>(
          <div key={i} style={{ padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.creamD}`:"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <span style={{ background:C.navy, color:C.goldL, borderRadius:8, padding:"4px 10px", fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700 }}>{ap.code}</span>
              <div style={{ ...T.sectionTitle, fontSize:17 }}>{ap.name}</div>
            </div>
            <div style={{ ...T.sub, fontSize:15, marginBottom:2 }}>{ap.city}</div>
            <div style={{ ...T.sub, fontSize:15, color:C.gold, fontWeight:600 }}>{ap.role}</div>
            <div style={{ background:C.creamD, borderRadius:8, padding:"8px 12px", marginTop:8 }}>
              <div style={{ fontSize:15, color:C.brownM, fontStyle:"italic" }}>💳 Salas disponíveis: <strong>a confirmar</strong></div>
            </div>
          </div>
        ))}
      </Card>

      <div style={{ background:"#E8F5E9", borderRadius:14, padding:"16px", border:`1px solid #A5D6A7` }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:C.green, marginBottom:6 }}>✉️ Como atualizar</div>
        <div style={{ ...T.body, fontSize:16, lineHeight:1.7 }}>
          Envie os cartões de crédito disponíveis (bandeira e nome do programa) e os horários dos voos confirmados. As informações serão adicionadas aqui.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINA: CONTATO
// ═══════════════════════════════════════════════════════════
function PageContato() {
  return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ marginBottom:18 }}>
        <div style={T.pageTitle}>Contato</div>
        <div style={{ ...T.sub, marginTop:4 }}>Agência, direção espiritual e emergências</div>
      </div>
      <div style={{ background:`linear-gradient(150deg,${C.navy},${C.navyL})`, borderRadius:20, padding:"22px 18px", border:`2px solid ${C.gold}`, marginBottom:16 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:20, fontWeight:700, marginBottom:16 }}>🏢 Beth Viagens e Turismo</div>
        <a href="tel:+5562984296855" style={{ display:"flex", gap:14, alignItems:"center", background:"rgba(255,255,255,0.12)", borderRadius:14, padding:"16px", textDecoration:"none", border:"1px solid rgba(232,201,122,0.4)", marginBottom:12 }}>
          <span style={{ fontSize:36 }}>📱</span>
          <div>
            <div style={{ color:C.goldL, fontSize:13, fontFamily:"'Cinzel',serif", letterSpacing:1.5, fontWeight:700 }}>WHATSAPP / TELEFONE</div>
            <div style={{ color:C.white, fontSize:22, fontWeight:700, marginTop:2 }}>(62) 98429-6855</div>
          </div>
        </a>
        <a href="mailto:bethviagens.comercial@gmail.com" style={{ display:"flex", gap:14, alignItems:"center", background:"rgba(255,255,255,0.12)", borderRadius:14, padding:"16px", textDecoration:"none", border:"1px solid rgba(232,201,122,0.4)" }}>
          <span style={{ fontSize:36 }}>📧</span>
          <div>
            <div style={{ color:C.goldL, fontSize:13, fontFamily:"'Cinzel',serif", letterSpacing:1.5, fontWeight:700 }}>E-MAIL</div>
            <div style={{ color:"rgba(255,255,255,0.9)", fontSize:17, marginTop:2 }}>bethviagens.comercial@gmail.com</div>
          </div>
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
export default function App() {
  const [page, setPage]            = useState("hoje");
  const [expandedDay, setExpanded] = useState(null);
  const [weather, setWeather]      = useState({});
  const [checked, setChecked]      = useState({});

  // Carrega checklist do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("peregrinacao_checklist");
      if (saved) setChecked(JSON.parse(saved));
    } catch (_) {}
  }, []);

  // Busca clima ao montar
  useEffect(() => {
    async function fetchWeather() {
      const results = {};
      for (const [key, city] of Object.entries(WEATHER_CITIES)) {
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=2026-10-30&end_date=2026-11-12`;
          const res  = await fetch(url);
          const data = await res.json();
          if (data.daily) results[key] = data.daily;
        } catch (_) {}
      }
      setWeather(results);
    }
    fetchWeather();
  }, []);

  // Marca/desmarca item e salva no localStorage
  function toggleCheck(id) {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem("peregrinacao_checklist", JSON.stringify(next)); } catch(_){}
      return next;
    });
  }

  const today         = new Date(); today.setHours(0,0,0,0);
  const tripStart     = new Date("2026-10-30T00:00:00");
  const tripEnd       = new Date("2026-11-12T00:00:00");
  const daysUntilTrip = Math.ceil((tripStart - today) / 86400000);
  const currentDay    = ITINERARY.find(d => d.date === todayStr()) || null;
  const tripOver      = today > tripEnd;

  const NAV = [
    { id:"hoje",    icon:"🏠", label:"Hoje"    },
    { id:"roteiro", icon:"📅", label:"Roteiro" },
    { id:"clima",   icon:"⛅", label:"Clima"   },
    { id:"pacote",  icon:"📋", label:"Pacote"  },
    { id:"vip",     icon:"🛋️", label:"Salas"   },
    { id:"contato", icon:"📞", label:"Contato" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.cream, fontFamily:"'EB Garamond',Georgia,serif", color:C.brown, paddingBottom:90, maxWidth:540, margin:"0 auto" }}>

      <header style={{ background:`linear-gradient(160deg,${C.navy} 0%,${C.navyL} 100%)`, padding:"20px 20px 16px", boxShadow:"0 4px 24px rgba(27,43,94,0.35)", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:13, letterSpacing:6, textAlign:"center", marginBottom:5 }}>✦  ✝  ✦</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:C.goldL, fontSize:19, fontWeight:700, letterSpacing:1, textAlign:"center", lineHeight:1.3, marginBottom:4 }}>Jubileu Franciscano 2026</div>
        <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, textAlign:"center" }}>Peregrinação · Portugal & Itália · 30 Out – 12 Nov</div>
      </header>

      {page==="hoje"    && <PageHoje currentDay={currentDay} daysUntilTrip={daysUntilTrip} tripOver={tripOver} weather={weather} checked={checked} toggleCheck={toggleCheck} />}
      {page==="roteiro" && <PageRoteiro expandedDay={expandedDay} setExpandedDay={setExpanded} />}
      {page==="clima"   && <PageClima weather={weather} />}
      {page==="pacote"  && <PagePacote />}
      {page==="vip"     && <PageSalasVip />}
      {page==="contato" && <PageContato />}

      <nav style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:540, background:C.navy, display:"flex", borderTop:`3px solid ${C.gold}`, zIndex:100 }}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{ flex:1, padding:"11px 1px 9px", background:page===n.id?"rgba(232,168,32,0.2)":"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
            <span style={{ fontSize:21 }}>{n.icon}</span>
            <span style={{ fontSize:9, color:page===n.id?C.goldL:"rgba(255,255,255,0.55)", fontFamily:"'Cinzel',serif", letterSpacing:0.3, fontWeight:page===n.id?700:500 }}>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
