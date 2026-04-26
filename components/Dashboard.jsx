import { useState, useEffect, useRef } from "react";
import { supabase } from '../lib/supabase';

const categorias = [
  { id: "todos",          label: "Todos",              emoji: "✦",  cor: "#C8973A" },
  { id: "identificacao",  label: "Identificação",      emoji: "🔮", cor: "#7C3AED" },
  { id: "curiosidade",    label: "Curiosidade",        emoji: "👁", cor: "#0369A1" },
  { id: "conexao",        label: "Conexão",            emoji: "❤️", cor: "#DB2777" },
  { id: "autoridade",     label: "Autoridade",         emoji: "👑", cor: "#B45309" },
  { id: "desejo",         label: "Despertar Desejo",   emoji: "🔥", cor: "#DC2626" },
  { id: "urgencia",       label: "Urgência / FOMO",    emoji: "⚡", cor: "#EA580C" },
  { id: "leads",          label: "Captar Leads",       emoji: "🎯", cor: "#0F766E" },
  { id: "seguidores",     label: "Atrair Seguidores",  emoji: "📡", cor: "#15803D" },
  { id: "engajamento",    label: "Engajamento",        emoji: "💬", cor: "#92400E" },
  { id: "vendas",         label: "Vendas",             emoji: "💰", cor: "#1D4ED8" },
  { id: "objecao",        label: "Quebra de Objeção",  emoji: "🧩", cor: "#6D28D9" },
];

const palavrasChave = {
  iniciar: ["Se você quer","Se você deseja","Se você almeja","Se você sonha","Se você precisa","Pare agora de","O que eu faria se","O que você precisa","O que você deve","Quando você"],
  verbos: ["Ser","Fazer","Conquistar","Aprender","Vender","Ganhar","Realizar","Montar","Evitar","Errar","Perder"],
  termos: ["Como","Onde","O que","Por que","Para que","Quando","Agora"],
  interligacao: ["Aplique","Faça","Pratique","Siga","Corrija","Mude","Melhore"],
  final: ["Ensinar","Explicar","Mostrar","Falar"],
};

const faq = [
  { q: "Como funciona os Códigos Secretos Da Atenção?", a: "Para cada Código existe uma estrutura simples e replicável de como você pode adaptar para o seu nicho e ter infinitas ideias de conteúdos virais. Eles foram desenvolvidos para chamar atenção nos 3 primeiros segundos do seu conteúdo." },
  { q: "Como acessar os Códigos?", a: "Clique na aba 'Códigos' no menu acima. Você pode filtrar por categoria ou funil de conteúdo. Ao clicar em qualquer código, abrirá todos os detalhes, estrutura, exemplos e prompts prontos." },
  { q: "Serve para qualquer nicho?", a: "Sim para qualquer nicho. Médicos, advogados, especialistas, social medias, professores… Os códigos são adaptáveis para qualquer área de atuação." },
  { q: "Vou aprender criar Roteiros?", a: "Nesse produto você não vai aprender a estrutura completa de roteiros, mas com os Códigos Secretos você vai ter praticamente o roteiro central do seu conteúdo pronto." },
];

const publicoPerguntas = [
  "Quem é o seu Público Alvo?","Quais são as principais dores deles?","Quais são as maiores dificuldades que eles passam no dia a dia?","Quais são os maiores desejos?","Quais erros eles têm cometido?","Quais são os medos?","Quais são os maiores sonhos?","Como o seu produto ou serviço pode ajudá-los?","Quais bons ou ruins hábitos?","Quais problemas eles têm passado?","Quais suas necessidades?","Quais conquistas eles possuem?","Quais são os seus medos?","Quais suas paixões?"
];

export default function Dashboard() {
  const [codigos, setCodigos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("boasvindas");
  const [catAtiva, setCatAtiva] = useState("todos");
  const [busca, setBusca] = useState("");
  const [codigoAberto, setCodigoAberto] = useState(null);
  const [faqAberto, setFaqAberto] = useState(null);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    async function fetchCodigos() {
      const { data, error } = await supabase.from("codigos").select("*").order("num");
      if (!error && data) setCodigos(data);
      setLoading(false);
    }
    fetchCodigos();
  }, []);

  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") setCodigoAberto(null); }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const codigosFiltrados = codigos.filter(c => {
    const matchCat = catAtiva === "todos" || (c.cats && c.cats.includes(catAtiva));
    const matchBusca = busca === "" || c.nome?.toLowerCase().includes(busca.toLowerCase()) || String(c.num).includes(busca);
    return matchCat && matchBusca;
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div style={styles.root}>
      {/* BG texture */}
      <div style={styles.bgTexture} />

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoBadge}>🔐</span>
            <div>
              <div style={styles.logoTitle}>CÓDIGOS SECRETOS</div>
              <div style={styles.logoSub}>DA ATENÇÃO</div>
            </div>
          </div>
          <nav style={styles.nav}>
            {[
              { id: "boasvindas", label: "✦ Início" },
              { id: "codigos",    label: "🔐 Códigos" },
              { id: "palavras",   label: "🧩 Palavras-Chave" },
              { id: "faq",        label: "❓ Dúvidas" },
            ].map(aba => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                style={{
                  ...styles.navBtn,
                  ...(abaAtiva === aba.id ? styles.navBtnActive : {}),
                }}
              >
                {aba.label}
              </button>
            ))}
          </nav>
          <button onClick={handleLogout} style={styles.logoutBtn}>Sair</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>

        {/* ===== ABA: BOAS VINDAS ===== */}
        {abaAtiva === "boasvindas" && (
          <div style={styles.fadeIn}>
            {/* Hero */}
            <div style={styles.hero}>
              <div style={styles.heroBadge}>✦ SUA FÁBRICA DE CONTEÚDO VIRAL</div>
              <h1 style={styles.heroTitle}>
                Ganchos que <span style={styles.heroGold}>travam o scroll</span><br />
                Ideias que <span style={styles.heroGold}>geram resultado</span>
              </h1>
              <p style={styles.heroDesc}>
                61 códigos prontos para você adaptar ao seu nicho e criar conteúdo que chama atenção nos 3 primeiros segundos.
              </p>
              <button onClick={() => setAbaAtiva("codigos")} style={styles.heroCTA}>
                Acessar os Códigos →
              </button>
            </div>

            {/* Cards rápidos */}
            <div style={styles.quickGrid}>
              {[
                { emoji: "🔐", num: "61", label: "Códigos prontos" },
                { emoji: "🎯", num: "12", label: "Categorias" },
                { emoji: "⚡", num: "3s", label: "Para prender atenção" },
                { emoji: "🌍", num: "∞", label: "Nichos compatíveis" },
              ].map((item, i) => (
                <div key={i} style={styles.quickCard}>
                  <div style={styles.quickEmoji}>{item.emoji}</div>
                  <div style={styles.quickNum}>{item.num}</div>
                  <div style={styles.quickLabel}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* Antes de usar */}
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.sectionIcon}>👤</span>
                <h2 style={styles.sectionTitle}>Antes de usar os Códigos</h2>
              </div>
              <p style={styles.sectionDesc}>
                Para criar o conteúdo certo para o público certo, responda essas perguntas. Escreva pelo menos 5 pontos em cada:
              </p>
              <div style={styles.perguntasGrid}>
                {publicoPerguntas.map((p, i) => (
                  <div key={i} style={styles.perguntaItem}>
                    <span style={styles.perguntaNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={styles.perguntaText}>{p}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://docs.google.com/document/d/1zMCUgzp6NxHsADUiIUckBjaZk_G9XcOtMtIZx9BN-PA/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.promptLink}
              >
                📋 Abrir Prompt para Mapear seu Público Alvo →
              </a>
            </div>

            {/* Como funciona */}
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.sectionIcon}>⚙️</span>
                <h2 style={styles.sectionTitle}>Como usar os Códigos</h2>
              </div>
              <div style={styles.stepsGrid}>
                {[
                  { n: "01", t: "Escolha um Código", d: "Navegue pelos 61 códigos ou filtre por categoria e objetivo do seu post." },
                  { n: "02", t: "Adapte ao seu nicho", d: "Use a estrutura e os exemplos para criar sua versão personalizada." },
                  { n: "03", t: "Use o Prompt", d: "Cada código tem prompts prontos para você gerar conteúdo com IA em segundos." },
                  { n: "04", t: "Publique e repita", d: "Com 61 códigos você tem conteúdo para meses. Combine e explore infinitas variações." },
                ].map((step, i) => (
                  <div key={i} style={styles.stepCard}>
                    <div style={styles.stepNum}>{step.n}</div>
                    <h3 style={styles.stepTitle}>{step.t}</h3>
                    <p style={styles.stepDesc}>{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ABA: CÓDIGOS ===== */}
        {abaAtiva === "codigos" && (
          <div style={styles.fadeIn}>
            <div style={styles.codigosHeader}>
              <h2 style={styles.pageTitle}>🔐 Códigos Secretos da Atenção</h2>
              <input
                type="text"
                placeholder="Buscar por nome ou número..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Filtro categorias */}
            <div style={styles.filtroScroll}>
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCatAtiva(cat.id)}
                  style={{
                    ...styles.filtroBtn,
                    ...(catAtiva === cat.id ? { ...styles.filtroBtnActive, borderColor: cat.cor, color: cat.cor, background: cat.cor + "18" } : {}),
                  }}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>

            {/* Contador */}
            <div style={styles.contador}>
              {loading ? "Carregando..." : `${codigosFiltrados.length} código${codigosFiltrados.length !== 1 ? "s" : ""} encontrado${codigosFiltrados.length !== 1 ? "s" : ""}`}
            </div>

            {/* Grid de códigos */}
            {loading ? (
              <div style={styles.loadingBox}>
                <div style={styles.loadingSpinner} />
                <p style={{ color: "#888", marginTop: 16 }}>Carregando códigos...</p>
              </div>
            ) : (
              <div style={styles.codigosGrid}>
                {codigosFiltrados.map(c => {
                  const cats = c.cats || [];
                  const catInfo = categorias.find(cat => cats.includes(cat.id)) || categorias[0];
                  return (
                    <div
                      key={c.num}
                      onClick={() => setCodigoAberto(c)}
                      style={styles.codigoCard}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = catInfo.cor;
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = `0 8px 32px ${catInfo.cor}22`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "#2a2a2a";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={styles.codigoNum}>{c.num}</div>
                      <div style={styles.codigoEmoji}>{c.emoji || "✦"}</div>
                      <h3 style={styles.codigoNome}>{c.nome}</h3>
                      <div style={styles.codigoCats}>
                        {cats.slice(0, 2).map(catId => {
                          const ci = categorias.find(x => x.id === catId);
                          return ci ? (
                            <span key={catId} style={{ ...styles.codigoCatTag, background: ci.cor + "22", color: ci.cor, border: `1px solid ${ci.cor}44` }}>
                              {ci.emoji} {ci.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <p style={styles.codigoGatilho}>{c.gatilho?.slice(0, 80)}...</p>
                      <div style={styles.codigoVerMais}>Ver código completo →</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===== ABA: PALAVRAS-CHAVE ===== */}
        {abaAtiva === "palavras" && (
          <div style={styles.fadeIn}>
            <h2 style={styles.pageTitle}>🧩 Palavras-Chave</h2>
            <p style={styles.pageDesc}>Use essas palavras para potencializar seus Códigos e criar ganchos ainda mais poderosos.</p>

            <div style={styles.palavrasGrid}>
              {[
                { titulo: "🟢 Para iniciar os ganchos", cor: "#15803D", items: palavrasChave.iniciar },
                { titulo: "🟢 Verbos", cor: "#15803D", items: palavrasChave.verbos },
                { titulo: "🟢 Termos", cor: "#15803D", items: palavrasChave.termos },
                { titulo: "🔵 Frase de Interligação", cor: "#0369A1", items: palavrasChave.interligacao },
                { titulo: "🩷 Frase Final", cor: "#DB2777", items: palavrasChave.final },
              ].map((grupo, i) => (
                <div key={i} style={{ ...styles.palavrasCard, borderTop: `3px solid ${grupo.cor}` }}>
                  <h3 style={{ ...styles.palavrasCardTitle, color: grupo.cor }}>{grupo.titulo}</h3>
                  <ul style={styles.palavrasList}>
                    {grupo.items.map((p, j) => (
                      <li key={j} style={styles.palavrasItem}>
                        <span style={{ ...styles.palavrasNum, color: grupo.cor }}>{String(j + 1).padStart(2, "0")}</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ABA: FAQ ===== */}
        {abaAtiva === "faq" && (
          <div style={styles.fadeIn}>
            <h2 style={styles.pageTitle}>❓ Perguntas Frequentes</h2>
            <p style={styles.pageDesc}>Tire suas dúvidas sobre os Códigos Secretos da Atenção.</p>
            <div style={styles.faqList}>
              {faq.map((item, i) => (
                <div
                  key={i}
                  style={{ ...styles.faqItem, ...(faqAberto === i ? styles.faqItemOpen : {}) }}
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                >
                  <div style={styles.faqPergunta}>
                    <span>{item.q}</span>
                    <span style={{ ...styles.faqIcon, ...(faqAberto === i ? { transform: "rotate(45deg)" } : {}) }}>+</span>
                  </div>
                  {faqAberto === i && (
                    <div style={styles.faqResposta}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL CÓDIGO */}
      {codigoAberto && (
        <div style={styles.modalOverlay} onClick={e => { if (e.target === e.currentTarget) setCodigoAberto(null); }}>
          <div style={styles.modal} ref={modalRef}>
            <button onClick={() => setCodigoAberto(null)} style={styles.modalClose}>✕</button>
            <div style={styles.modalNum}>Código {codigoAberto.num}</div>
            <h2 style={styles.modalTitle}>{codigoAberto.emoji} {codigoAberto.nome}</h2>

            {codigoAberto.gatilho && (
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>🎯 Gatilho</div>
                <p style={styles.modalText}>{codigoAberto.gatilho}</p>
              </div>
            )}
            {codigoAberto.estrutura && codigoAberto.estrutura.length > 0 && (
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>📐 Estrutura</div>
                <ul style={styles.modalList}>
                  {codigoAberto.estrutura.map((e, i) => <li key={i} style={styles.modalListItem}>{e}</li>)}
                </ul>
              </div>
            )}
            {codigoAberto.fraseBase && (
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>💬 Frase Base</div>
                <p style={{ ...styles.modalText, ...styles.modalDestaque }}>{codigoAberto.fraseBase}</p>
              </div>
            )}
            {codigoAberto.porqueFunciona && (
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>🧠 Por que funciona</div>
                <p style={styles.modalText}>{codigoAberto.porqueFunciona}</p>
              </div>
            )}
            {codigoAberto.exemplo && codigoAberto.exemplo.length > 0 && (
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>✍️ Exemplo</div>
                {codigoAberto.exemplo.map((ex, i) => (
                  <p key={i} style={{ ...styles.modalText, marginBottom: 4 }}>{ex}</p>
                ))}
              </div>
            )}
            {codigoAberto.prompt && codigoAberto.prompt.length > 0 && (
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>🤖 Prompt para IA</div>
                <div style={styles.modalPromptBox}>
                  {codigoAberto.prompt.map((p, i) => (
                    <p key={i} style={{ margin: "0 0 8px 0", fontSize: 13, color: "#d4d4d4" }}>{p}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        Direção Estratégica | Lorena Lotério © 2026 · Todos os direitos reservados
      </footer>
    </div>
  );
}

const styles = {
  root: { minHeight: "100vh", background: "#080808", color: "#e8e8e8", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", position: "relative", overflowX: "hidden" },
  bgTexture: { position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle at 20% 20%, #C8973A08 0%, transparent 50%), radial-gradient(circle at 80% 80%, #C8973A05 0%, transparent 50%)", pointerEvents: "none", zIndex: 0 },

  header: { position: "sticky", top: 0, zIndex: 100, background: "#0a0a0aee", backdropFilter: "blur(20px)", borderBottom: "1px solid #1e1e1e" },
  headerInner: { maxWidth: 1200, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" },
  logo: { display: "flex", alignItems: "center", gap: 10, marginRight: "auto" },
  logoBadge: { fontSize: 24 },
  logoTitle: { fontSize: 14, fontWeight: 700, letterSpacing: 3, color: "#C8973A" },
  logoSub: { fontSize: 10, letterSpacing: 4, color: "#666", marginTop: -2 },

  nav: { display: "flex", gap: 4, flexWrap: "wrap" },
  navBtn: { background: "transparent", border: "none", color: "#888", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all .2s", letterSpacing: .3 },
  navBtnActive: { background: "#C8973A18", color: "#C8973A", border: "1px solid #C8973A33" },

  logoutBtn: { background: "transparent", border: "1px solid #2a2a2a", color: "#666", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, transition: "all .2s" },

  main: { maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px", position: "relative", zIndex: 1 },
  fadeIn: { animation: "fadeIn .4s ease" },

  // HERO
  hero: { textAlign: "center", padding: "60px 20px 80px", maxWidth: 700, margin: "0 auto" },
  heroBadge: { display: "inline-block", background: "#C8973A18", border: "1px solid #C8973A33", color: "#C8973A", padding: "6px 16px", borderRadius: 100, fontSize: 11, letterSpacing: 3, marginBottom: 24, fontWeight: 600 },
  heroTitle: { fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, color: "#fff" },
  heroGold: { color: "#C8973A" },
  heroDesc: { fontSize: 16, color: "#999", lineHeight: 1.7, marginBottom: 36 },
  heroCTA: { background: "#C8973A", color: "#000", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: .5, transition: "all .2s" },

  quickGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 60 },
  quickCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "24px 16px", textAlign: "center" },
  quickEmoji: { fontSize: 28, marginBottom: 8 },
  quickNum: { fontSize: 32, fontWeight: 800, color: "#C8973A", letterSpacing: -1 },
  quickLabel: { fontSize: 12, color: "#666", marginTop: 4 },

  section: { background: "#0e0e0e", border: "1px solid #1e1e1e", borderRadius: 20, padding: "36px", marginBottom: 32 },
  sectionHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  sectionIcon: { fontSize: 24 },
  sectionTitle: { fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 },
  sectionDesc: { color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 24 },

  perguntasGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, marginBottom: 24 },
  perguntaItem: { display: "flex", alignItems: "flex-start", gap: 10, background: "#161616", borderRadius: 10, padding: "12px 14px" },
  perguntaNum: { color: "#C8973A", fontWeight: 700, fontSize: 12, minWidth: 24, letterSpacing: 1 },
  perguntaText: { color: "#ccc", fontSize: 13, lineHeight: 1.5 },

  promptLink: { display: "inline-flex", alignItems: "center", gap: 8, color: "#C8973A", fontSize: 13, fontWeight: 600, textDecoration: "none", background: "#C8973A10", border: "1px solid #C8973A30", padding: "10px 20px", borderRadius: 10 },

  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
  stepCard: { background: "#161616", borderRadius: 14, padding: "24px" },
  stepNum: { fontSize: 32, fontWeight: 800, color: "#C8973A20", letterSpacing: -2, marginBottom: 8 },
  stepTitle: { fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 8px" },
  stepDesc: { fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 },

  // CÓDIGOS
  codigosHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" },
  pageTitle: { fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 8px", flex: 1 },
  pageDesc: { color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 32 },
  searchInput: { background: "#111", border: "1px solid #2a2a2a", color: "#fff", padding: "10px 16px", borderRadius: 10, fontSize: 14, outline: "none", minWidth: 220 },
  filtroScroll: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20, flexWrap: "wrap" },
  filtroBtn: { background: "#111", border: "1px solid #2a2a2a", color: "#777", padding: "7px 14px", borderRadius: 100, cursor: "pointer", fontSize: 12, whiteSpace: "nowrap", transition: "all .2s", fontWeight: 500 },
  filtroBtnActive: { fontWeight: 700 },
  contador: { color: "#555", fontSize: 12, marginBottom: 20, letterSpacing: 1 },

  codigosGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  codigoCard: { background: "#0e0e0e", border: "1px solid #2a2a2a", borderRadius: 16, padding: "24px", cursor: "pointer", transition: "all .25s", position: "relative" },
  codigoNum: { position: "absolute", top: 16, right: 16, fontSize: 11, color: "#444", fontWeight: 700, letterSpacing: 1 },
  codigoEmoji: { fontSize: 28, marginBottom: 10 },
  codigoNome: { fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 12px", lineHeight: 1.4, paddingRight: 32 },
  codigoCats: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 },
  codigoCatTag: { fontSize: 10, padding: "3px 8px", borderRadius: 100, fontWeight: 600, letterSpacing: .3 },
  codigoGatilho: { fontSize: 12, color: "#666", lineHeight: 1.6, margin: "0 0 12px" },
  codigoVerMais: { fontSize: 12, color: "#C8973A", fontWeight: 600 },

  loadingBox: { textAlign: "center", padding: "80px 20px" },
  loadingSpinner: { width: 32, height: 32, border: "2px solid #1e1e1e", borderTop: "2px solid #C8973A", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" },

  // PALAVRAS
  palavrasGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 },
  palavrasCard: { background: "#0e0e0e", borderRadius: 16, padding: "24px" },
  palavrasCardTitle: { fontSize: 14, fontWeight: 700, marginBottom: 16, letterSpacing: .5 },
  palavrasList: { listStyle: "none", padding: 0, margin: 0 },
  palavrasItem: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #161616", fontSize: 13, color: "#ccc" },
  palavrasNum: { fontSize: 11, fontWeight: 700, minWidth: 22, letterSpacing: 1 },

  // FAQ
  faqList: { maxWidth: 700, margin: "0 auto" },
  faqItem: { background: "#0e0e0e", border: "1px solid #1e1e1e", borderRadius: 14, marginBottom: 12, overflow: "hidden", cursor: "pointer", transition: "all .2s" },
  faqItemOpen: { borderColor: "#C8973A33" },
  faqPergunta: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", gap: 16, fontWeight: 600, fontSize: 14, color: "#e0e0e0" },
  faqIcon: { color: "#C8973A", fontSize: 22, fontWeight: 300, transition: "transform .3s", flexShrink: 0 },
  faqResposta: { padding: "0 24px 20px", color: "#888", fontSize: 13, lineHeight: 1.8, borderTop: "1px solid #1a1a1a" },

  // MODAL
  modalOverlay: { position: "fixed", inset: 0, background: "#000000cc", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
  modal: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, padding: "36px", maxWidth: 640, width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative" },
  modalClose: { position: "absolute", top: 16, right: 16, background: "#1e1e1e", border: "none", color: "#888", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" },
  modalNum: { color: "#C8973A", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 },
  modalTitle: { fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 24px", lineHeight: 1.3 },
  modalSection: { marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #1a1a1a" },
  modalLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#C8973A", marginBottom: 10 },
  modalText: { fontSize: 14, color: "#bbb", lineHeight: 1.7, margin: 0 },
  modalDestaque: { background: "#C8973A10", border: "1px solid #C8973A20", borderRadius: 10, padding: "12px 16px", color: "#C8973A" },
  modalList: { paddingLeft: 0, listStyle: "none", margin: 0 },
  modalListItem: { fontSize: 13, color: "#bbb", padding: "6px 0", paddingLeft: 16, position: "relative", lineHeight: 1.6, borderLeft: "2px solid #C8973A33", marginBottom: 6 },
  modalPromptBox: { background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 10, padding: "16px" },

  footer: { textAlign: "center", padding: "32px 24px", color: "#333", fontSize: 11, letterSpacing: 2, borderTop: "1px solid #141414" },
};
