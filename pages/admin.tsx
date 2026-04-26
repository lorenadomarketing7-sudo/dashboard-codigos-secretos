import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
const SENHA_ADMIN = "lorena2024";
const STORAGE_KEY = "dashboard_codigos";

const CATEGORIAS = [
  { id: "todos", label: "Todos", emoji: "📋", cor: "#64748b" },
  { id: "gancho", label: "Gancho", emoji: "🪝", cor: "#7C3AED" },
  { id: "educativo", label: "Educativo", emoji: "📚", cor: "#0369A1" },
  { id: "bastidor", label: "Bastidor", emoji: "🎬", cor: "#DB2777" },
  { id: "autoridade", label: "Autoridade", emoji: "🏆", cor: "#B45309" },
  { id: "dor", label: "Dor", emoji: "😤", cor: "#DC2626" },
  { id: "transformacao", label: "Transformação", emoji: "✨", cor: "#EA580C" },
  { id: "prova", label: "Prova Social", emoji: "⭐", cor: "#0F766E" },
  { id: "cta", label: "CTA", emoji: "📣", cor: "#15803D" },
  { id: "storytelling", label: "Storytelling", emoji: "📖", cor: "#92400E" },
  { id: "tendencia", label: "Tendência", emoji: "🔥", cor: "#1D4ED8" },
  { id: "viral", label: "Viral", emoji: "🚀", cor: "#6D28D9" },
];
interface Codigo {
  num: string;
  nome: string;
  emoji: string;
  vol: number;
  cats: string[];
  gatilho: string;
  estrutura: string[];
  fraseBase: string;
  porqueFunciona: string;
  exemplo: string[];
  prompt: string[];
  referencias: string[];
}

const emptyForm: Codigo = {
  num: "", nome: "", emoji: "✨", vol: 1, cats: [],
  gatilho: "", estrutura: [], fraseBase: "",
  porqueFunciona: "", exemplo: [], prompt: [], referencias: [],
};

// ── ESTILOS ──────────────────────────────────────────────────────────────────
const A: Record<string, React.CSSProperties> = {
  root:        { minHeight: "100vh", backgroundColor: "#060C18", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "#e2e8f0" },
  header:      { backgroundColor: "#0A1120", borderBottom: "1px solid #1e293b", padding: "14px 24px", position: "sticky", top: 0, zIndex: 40 },
  headerInner: { maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 },
  titulo:      { margin: 0, fontSize: 18, fontWeight: 800, color: "#f1f5f9" },
  badge:       { fontSize: 12, backgroundColor: "#1e293b", borderRadius: 6, padding: "3px 9px", color: "#64748b", border: "1px solid #334155" },
  body:        { maxWidth: 1400, margin: "0 auto", display: "flex", gap: 0, alignItems: "flex-start" },
  // List (sidebar)
  listSide:    { width: 340, flexShrink: 0, borderRight: "1px solid #1e293b", minHeight: "calc(100vh - 57px)", display: "flex", flexDirection: "column" },
  listHeader:  { padding: "16px 16px 8px", borderBottom: "1px solid #1e293b" },
  listTitle:   { margin: "0 0 10px", fontSize: 12, fontWeight: 700, letterSpacing: 1.2, color: "#475569", textTransform: "uppercase" },
  listSearch:  { width: "100%", backgroundColor: "#0A1120", border: "1px solid #1e293b", borderRadius: 8, padding: "8px 12px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" as const },
  listScroll:  { flex: 1, overflowY: "auto" as const, padding: "8px" },
  listItem:    { display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", borderRadius: 8, border: "1px solid transparent", marginBottom: 3, cursor: "pointer", transition: "all .12s" },
  listItemActive: { backgroundColor: "#1e293b", borderColor: "#334155" },
  listItemNum: { fontSize: 11, fontWeight: 700, color: "#5eead4", fontFamily: "monospace", flexShrink: 0 },
  listItemNome:{ fontSize: 13, color: "#cbd5e1", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const },
  listActions: { display: "flex", gap: 4, flexShrink: 0 },
  btnEdit:     { padding: "3px 8px", backgroundColor: "#1e3a5f", border: "1px solid #1d4ed8", borderRadius: 5, color: "#93c5fd", fontSize: 11, cursor: "pointer", fontWeight: 600 },
  btnDel:      { padding: "3px 8px", backgroundColor: "#3b0f0f", border: "1px solid #dc2626", borderRadius: 5, color: "#fca5a5", fontSize: 11, cursor: "pointer", fontWeight: 600 },
  // Form
  formMain:    { flex: 1, padding: "20px 28px", minWidth: 0 },
  formTitle:   { margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#f1f5f9" },
  formGrid:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  formFull:    { gridColumn: "1 / -1" },
  label:       { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#475569", marginBottom: 5, textTransform: "uppercase" as const },
  input:       { width: "100%", backgroundColor: "#0A1120", border: "1px solid #1e293b", borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit" },
  textarea:    { width: "100%", backgroundColor: "#0A1120", border: "1px solid #1e293b", borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" as const, resize: "vertical" as const, fontFamily: "inherit", lineHeight: 1.6 },
  select:      { width: "100%", backgroundColor: "#0A1120", border: "1px solid #1e293b", borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" as const },
  catsGrid:    { display: "flex", flexWrap: "wrap" as const, gap: 6 },
  catChip:     { padding: "5px 10px", borderRadius: 6, border: "1px solid", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all .1s", userSelect: "none" as const },
  hint:        { fontSize: 11, color: "#475569", marginTop: 4 },
  formActions: { display: "flex", gap: 10, marginTop: 20, paddingTop: 20, borderTop: "1px solid #1e293b" },
  btnPrimary:  { padding: "10px 22px", backgroundColor: "#0F766E", border: "1px solid #0d9488", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  btnSecondary:{ padding: "10px 18px", backgroundColor: "transparent", border: "1px solid #334155", borderRadius: 8, color: "#94a3b8", fontSize: 13, cursor: "pointer" },
  btnDanger:   { padding: "10px 18px", backgroundColor: "#3b0f0f", border: "1px solid #7f1d1d", borderRadius: 8, color: "#fca5a5", fontSize: 13, cursor: "pointer", marginLeft: "auto" },
  // Header buttons
  btnNav:      { padding: "7px 14px", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#94a3b8", fontSize: 12, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 },
  btnLogout:   { padding: "7px 14px", backgroundColor: "transparent", border: "1px solid #7f1d1d", borderRadius: 8, color: "#fca5a5", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  // Alerts
  success:     { backgroundColor: "#052e16", border: "1px solid #16a34a", borderRadius: 8, padding: "10px 14px", color: "#86efac", fontSize: 13, marginBottom: 14 },
  error:       { backgroundColor: "#3b0f0f", border: "1px solid #dc2626", borderRadius: 8, padding: "10px 14px", color: "#fca5a5", fontSize: 13, marginBottom: 14 },
  // Password gate
  gate:        { minHeight: "100vh", backgroundColor: "#060C18", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Segoe UI',sans-serif" },
  gateBox:     { backgroundColor: "#0A1120", border: "1px solid #1e293b", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 380, textAlign: "center" as const },
  gateTitle:   { margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#f1f5f9" },
  gateSub:     { margin: "0 0 28px", fontSize: 13, color: "#64748b" },
  gateInput:   { width: "100%", backgroundColor: "#060C18", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 16px", color: "#e2e8f0", fontSize: 15, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, textAlign: "center" as const },
  gateBtn:     { width: "100%", padding: "12px", backgroundColor: "#0F766E", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" },
  gateError:   { color: "#fca5a5", fontSize: 13, marginTop: 10 },
  divider:     { borderTop: "1px solid #1e293b", margin: "14px 0" },
  resetBtn:    { padding: "8px 14px", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#64748b", fontSize: 12, cursor: "pointer" },
};

// ── PASSWORD GATE ─────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  const tentar = (e: FormEvent) => {
    e.preventDefault();
    if (senha === SENHA_ADMIN) {
      sessionStorage.setItem("admin_auth", "1");
      onAuth();
    } else {
      setErro(true);
      setSenha("");
    }
  };

  return (
    <div style={A.gate}>
      <div style={A.gateBox}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔐</div>
        <h1 style={A.gateTitle}>Painel Admin</h1>
        <p style={A.gateSub}>Códigos Secretos da Atenção</p>
        <form onSubmit={tentar}>
          <input
            style={A.gateInput}
            type="password"
            placeholder="Senha de acesso"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErro(false); }}
            autoFocus
          />
          <button type="submit" style={A.gateBtn}>Entrar</button>
          {erro && <p style={A.gateError}>Senha incorreta. Tente novamente.</p>}
        </form>
        <div style={A.divider} />
        <Link href="/" style={{ color: "#475569", fontSize: 12, textDecoration: "none" }}>
          ← Voltar ao dashboard
        </Link>
      </div>
    </div>
  );
}

// ── MAIN ADMIN PANEL ──────────────────────────────────────────────────────────
export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [pronto, setPronto] = useState(false);

  const [codigos, setCodigos] = useState<Codigo[]>([]);
  const [busca, setBusca] = useState("");

  const [form, setForm] = useState<Codigo>(emptyForm);
  const [editandoNum, setEditandoNum] = useState<string | null>(null);

  // Textarea text for array fields
  const [estruturaText, setEstruturaText] = useState("");
  const [exemploText, setExemploText] = useState("");
  const [promptText, setPromptText] = useState("");
  const [referenciasText, setReferenciasText] = useState("");

  const [sucesso, setSucesso] = useState("");
  const [erro, setErro] = useState("");
  const [itemAtivo, setItemAtivo] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "1") setAutenticado(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    setCodigos(saved ? JSON.parse(saved) : ([] as Codigo[]));
    setPronto(true);
  }, []);

  const persistir = (nova: Codigo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nova));
    window.dispatchEvent(new Event("codigos-updated"));
    setCodigos(nova);
  };

  const mostrarSucesso = (msg: string) => {
    setSucesso(msg); setErro("");
    setTimeout(() => setSucesso(""), 3500);
  };

  const limparForm = () => {
    setForm(emptyForm);
    setEditandoNum(null);
    setEstruturaText("");
    setExemploText("");
    setPromptText("");
    setReferenciasText("");
    setErro("");
    setItemAtivo(null);
  };

  const editarCodigo = (c: Codigo) => {
    setForm(c);
    setEditandoNum(c.num);
    setEstruturaText(c.estrutura.join("\n"));
    setExemploText(c.exemplo.join("\n"));
    setPromptText(c.prompt.join("\n"));
    setReferenciasText((c.referencias || []).join("\n"));
    setErro("");
    setItemAtivo(c.num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deletarCodigo = (num: string) => {
    if (!confirm(`Tem certeza que quer deletar o Código ${num}? Esta ação não pode ser desfeita.`)) return;
    persistir(codigos.filter(c => c.num !== num));
    mostrarSucesso(`Código ${num} deletado com sucesso.`);
    if (editandoNum === num) limparForm();
  };

  const restaurarPadroes = () => {
    if (!confirm("Isso vai restaurar todos os 61 códigos originais e apagar qualquer alteração. Tem certeza?")) return;
    persistir([] as Codigo[]);
    limparForm();
    mostrarSucesso("Dados restaurados para o padrão original.");
  };

  const toggleCat = (catId: string) => {
    setForm(f => ({
      ...f,
      cats: f.cats.includes(catId)
        ? f.cats.filter(c => c !== catId)
        : [...f.cats, catId],
    }));
  };

  const campo = (field: keyof Codigo) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = field === "vol" ? Number(e.target.value) : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
  };

  const handleSalvar = (e: FormEvent) => {
    e.preventDefault();
    if (!form.num.trim()) return setErro("Número do código é obrigatório.");
    if (!form.nome.trim()) return setErro("Nome do código é obrigatório.");
    if (form.cats.length === 0) return setErro("Selecione pelo menos uma categoria.");

    const final: Codigo = {
      ...form,
      num: form.num.trim(),
      nome: form.nome.trim(),
      emoji: form.emoji.trim() || "✨",
      estrutura: estruturaText.split("\n").filter(l => l.trim() !== ""),
      exemplo: exemploText.split("\n"),
      prompt: promptText.split("\n"),
      referencias: referenciasText.split("\n").filter(l => l.trim() !== ""),
    };

    if (editandoNum) {
      if (final.num !== editandoNum && codigos.some(c => c.num === final.num)) {
        return setErro(`Código ${final.num} já existe.`);
      }
      persistir(codigos.map(c => c.num === editandoNum ? final : c));
      mostrarSucesso(`Código ${final.num} — "${final.nome}" atualizado com sucesso!`);
    } else {
      if (codigos.some(c => c.num === final.num)) {
        return setErro(`Código ${final.num} já existe.`);
      }
      persistir([...codigos, final]);
      mostrarSucesso(`Código ${final.num} — "${final.nome}" adicionado com sucesso!`);
    }
    limparForm();
  };

  const codigosFiltrados = codigos.filter(c =>
    busca === "" ||
    c.num.includes(busca) ||
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.cats.some(cat => cat.includes(busca.toLowerCase()))
  );

  if (!pronto) return null;
  if (!autenticado) return <PasswordGate onAuth={() => setAutenticado(true)} />;

  return (
    <div style={A.root}>
      {/* HEADER */}
      <header style={A.header}>
        <div style={A.headerInner}>
          <span style={{ fontSize: 20 }}>⚙️</span>
          <h1 style={A.titulo}>Painel Admin</h1>
          <span style={A.badge}>{codigos.length} códigos</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={restaurarPadroes} style={A.resetBtn} title="Restaurar dados originais">
              ↺ Restaurar padrões
            </button>
            <Link href="/" style={A.btnNav}>← Dashboard</Link>
            <button onClick={() => { sessionStorage.removeItem("admin_auth"); setAutenticado(false); }} style={A.btnLogout}>
              Sair
            </button>
          </div>
        </div>
      </header>

      <div style={A.body}>
        {/* ── LISTA (SIDEBAR) ───────────────────────────────────────────────── */}
        <aside style={A.listSide}>
          <div style={A.listHeader}>
            <p style={A.listTitle}>📋 Códigos ({codigosFiltrados.length})</p>
            <input
              style={A.listSearch}
              placeholder="Buscar por número ou nome..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
          <div style={A.listScroll}>
            {codigosFiltrados.map(c => (
              <div
                key={c.num}
                style={{
                  ...A.listItem,
                  ...(itemAtivo === c.num ? A.listItemActive : {}),
                }}
                onMouseEnter={e => { if (itemAtivo !== c.num) (e.currentTarget as HTMLDivElement).style.backgroundColor = "#0f172a"; }}
                onMouseLeave={e => { if (itemAtivo !== c.num) (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
              >
                <span style={{ fontSize: 14 }}>{c.emoji}</span>
                <span style={A.listItemNum}>{c.num}</span>
                <span style={A.listItemNome}>{c.nome}</span>
                <div style={A.listActions}>
                  <button
                    style={A.btnEdit}
                    onClick={() => editarCodigo(c)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    style={A.btnDel}
                    onClick={() => deletarCodigo(c.num)}
                    title="Deletar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
            {codigosFiltrados.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 16px", color: "#475569", fontSize: 13 }}>
                Nenhum código encontrado
              </div>
            )}
          </div>
        </aside>

        {/* ── FORMULÁRIO (MAIN) ─────────────────────────────────────────────── */}
        <main style={A.formMain}>
          <h2 style={A.formTitle}>
            {editandoNum
              ? `✏️ Editando: ${form.emoji} ${form.num} — ${form.nome}`
              : "➕ Adicionar Novo Código"}
          </h2>

          {sucesso && <div style={A.success}>✅ {sucesso}</div>}
          {erro && <div style={A.error}>❌ {erro}</div>}

          <form onSubmit={handleSalvar}>
            <div style={A.formGrid}>

              {/* NÚMERO */}
              <div>
                <label style={A.label}>Número (num) *</label>
                <input
                  style={A.input}
                  placeholder="ex: 162"
                  value={form.num}
                  onChange={campo("num")}
                />
              </div>

              {/* NOME */}
              <div>
                <label style={A.label}>Nome (nome) *</label>
                <input
                  style={A.input}
                  placeholder="ex: A Grande Virada"
                  value={form.nome}
                  onChange={campo("nome")}
                />
              </div>

              {/* EMOJI */}
              <div>
                <label style={A.label}>Emoji</label>
                <input
                  style={A.input}
                  placeholder="ex: 🔥"
                  value={form.emoji}
                  onChange={campo("emoji")}
                />
              </div>

              {/* VOLUME */}
              <div>
                <label style={A.label}>Volume (vol)</label>
                <select style={A.select} value={form.vol} onChange={campo("vol")}>
                  <option value={1}>Vol. 1 (101–130)</option>
                  <option value={2}>Vol. 2 (131–161)</option>
                </select>
              </div>

              {/* CATEGORIAS */}
              <div style={A.formFull}>
                <label style={A.label}>Categorias (cats) *</label>
                <div style={A.catsGrid}>
                  {CATEGORIAS.filter(c => c.id !== "todos").map(cat => {
                    const ativa = form.cats.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCat(cat.id)}
                        style={{
                          ...A.catChip,
                          backgroundColor: ativa ? cat.cor + "30" : "transparent",
                          borderColor: ativa ? cat.cor : "#334155",
                          color: ativa ? cat.cor : "#64748b",
                        }}
                      >
                        {cat.emoji} {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GATILHO */}
              <div style={A.formFull}>
                <label style={A.label}>Gatilho (gatilho)</label>
                <textarea
                  style={{ ...A.textarea, minHeight: 80 }}
                  placeholder="Por que esse código captura atenção? Descreva o mecanismo psicológico..."
                  value={form.gatilho}
                  onChange={campo("gatilho")}
                />
              </div>

              {/* FRASE BASE */}
              <div style={A.formFull}>
                <label style={A.label}>Frase Base (fraseBase)</label>
                <input
                  style={A.input}
                  placeholder="ex: Se você [AÇÃO], essas [N] coisas vão acontecer..."
                  value={form.fraseBase}
                  onChange={campo("fraseBase")}
                />
              </div>

              {/* POR QUE FUNCIONA */}
              <div style={A.formFull}>
                <label style={A.label}>Por Que Funciona (porqueFunciona)</label>
                <textarea
                  style={{ ...A.textarea, minHeight: 80 }}
                  placeholder="Explicação detalhada do mecanismo psicológico..."
                  value={form.porqueFunciona}
                  onChange={campo("porqueFunciona")}
                />
              </div>

              {/* ESTRUTURA */}
              <div style={A.formFull}>
                <label style={A.label}>Estrutura Guiada (estrutura)</label>
                <textarea
                  style={{ ...A.textarea, minHeight: 100, fontFamily: "monospace" }}
                  placeholder={"🟥 [ELEMENTO 1] — Descrição\n🟧 [ELEMENTO 2] — Descrição\n🟨 [ELEMENTO 3] — Descrição"}
                  value={estruturaText}
                  onChange={e => setEstruturaText(e.target.value)}
                />
                <p style={A.hint}>Uma linha por item da estrutura</p>
              </div>

              {/* EXEMPLO */}
              <div style={A.formFull}>
                <label style={A.label}>Exemplo Completo (exemplo)</label>
                <textarea
                  style={{ ...A.textarea, minHeight: 160, fontFamily: "monospace", fontSize: 12 }}
                  placeholder={"Primeira linha do exemplo...\n\nSegundo parágrafo...\n\nCTA final..."}
                  value={exemploText}
                  onChange={e => setExemploText(e.target.value)}
                />
                <p style={A.hint}>Uma linha por parágrafo. Linhas em branco criam espaço no exemplo.</p>
              </div>

              {/* PROMPT */}
              <div style={A.formFull}>
                <label style={A.label}>Prompt para IA (prompt)</label>
                <textarea
                  style={{ ...A.textarea, minHeight: 200, fontFamily: "monospace", fontSize: 12 }}
                  placeholder={"Você é especialista em copywriting para redes sociais.\nCrie um post 'Código XXX' para o nicho de [NICHO].\n\nPÚBLICO-ALVO:\n- Perfil: [...]"}
                  value={promptText}
                  onChange={e => setPromptText(e.target.value)}
                />
                <p style={A.hint}>Uma linha por linha do prompt. Linhas em branco criam espaço.</p>
              </div>

              {/* REFERÊNCIAS */}
              <div style={A.formFull}>
                <label style={A.label}>Links de Referência (um por linha)</label>
                <textarea
                  style={{ ...A.textarea, minHeight: 100, fontFamily: "monospace", fontSize: 12 }}
                  placeholder={"https://www.youtube.com/watch?v=...\nhttps://www.instagram.com/reel/...\nhttps://www.tiktok.com/@..."}
                  value={referenciasText}
                  onChange={e => setReferenciasText(e.target.value)}
                />
                <p style={A.hint}>YouTube (thumbnail automático), Instagram e TikTok são suportados. Um link por linha.</p>
              </div>

            </div>

            {/* AÇÕES */}
            <div style={A.formActions}>
              <button type="submit" style={A.btnPrimary}>
                {editandoNum ? "💾 Salvar Alterações" : "➕ Adicionar Código"}
              </button>
              {editandoNum && (
                <button type="button" style={A.btnSecondary} onClick={limparForm}>
                  Cancelar Edição
                </button>
              )}
              {!editandoNum && (
                <button type="button" style={A.btnSecondary} onClick={limparForm}>
                  Limpar Formulário
                </button>
              )}
              {editandoNum && (
                <button
                  type="button"
                  style={A.btnDanger}
                  onClick={() => deletarCodigo(editandoNum)}
                >
                  🗑️ Deletar Este Código
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
