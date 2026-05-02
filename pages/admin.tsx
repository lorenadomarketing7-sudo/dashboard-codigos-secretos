import { useState, useEffect } from 'react'

const SENHA = 'RoLf29/02'

const campoVazio = {
  num: '', nome: '', emoji: '', vol: 1,
  cats: '', gatilho: '', estrutura: '',
  frase_base: '', por_que_funciona: '',
  exemplo: '', prompt: ''
}

const catVazia = { slug: '', label: '', emoji: '', cor: '#C8973A', ordem: 0 }

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false)
  const [senha, setSenha] = useState('')
  const [erroSenha, setErroSenha] = useState(false)
  const [aba, setAba] = useState<'codigos'|'categorias'>('codigos')

  // Códigos
  const [codigos, setCodigos] = useState<any[]>([])
  const [form, setForm] = useState(campoVazio)
  const [editandoId, setEditandoId] = useState<number|null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [busca, setBusca] = useState('')
  const [msg, setMsg] = useState('')

  // Categorias
  const [categorias, setCategorias] = useState<any[]>([])
  const [formCat, setFormCat] = useState(catVazia)
  const [editandoCatId, setEditandoCatId] = useState<number|null>(null)
  const [modalCatAberto, setModalCatAberto] = useState(false)

  const serviceKey = typeof window !== 'undefined'
    ? document.cookie.split('; ').find(r => r.startsWith('sk='))?.split('=')[1] || ''
    : ''

  useEffect(() => {
    const ok = sessionStorage.getItem('adm')
    if (ok === '1') setAutenticado(true)
  }, [])

  useEffect(() => {
    if (autenticado) { fetchCodigos(); fetchCategorias() }
  }, [autenticado])

  async function fetchCodigos() {
    const r = await fetch('/api/codigos')
    const d = await r.json()
    setCodigos(Array.isArray(d) ? d : [])
  }

  async function fetchCategorias() {
    const r = await fetch('/api/categorias')
    const d = await r.json()
    setCategorias(Array.isArray(d) ? d : [])
  }

  function login() {
    if (senha === SENHA) {
      sessionStorage.setItem('adm', '1')
      setAutenticado(true)
    } else {
      setErroSenha(true)
    }
  }

  function flash(t: string) {
    setMsg(t)
    setTimeout(() => setMsg(''), 3000)
  }

  function abrirNovo() {
    setForm(campoVazio)
    setEditandoId(null)
    setModalAberto(true)
  }

  function abrirEditar(c: any) {
    setForm({
      num: c.num, nome: c.nome, emoji: c.emoji || '', vol: c.vol,
      cats: (c.cats || []).join(', '),
      gatilho: c.gatilho || '',
      estrutura: (c.estrutura || []).join('\n'),
      frase_base: c.frase_base || '',
      por_que_funciona: c.por_que_funciona || '',
      exemplo: (c.exemplo || []).join('\n'),
      prompt: (c.prompt || []).join('\n'),
    })
    setEditandoId(c.id)
    setModalAberto(true)
  }

  function formParaPayload() {
    return {
      num: form.num.trim(),
      nome: form.nome.trim(),
      emoji: form.emoji.trim(),
      vol: Number(form.vol),
      cats: form.cats.split(',').map(s => s.trim()).filter(Boolean),
      gatilho: form.gatilho.trim(),
      estrutura: form.estrutura.split('\n').map(s => s.trim()).filter(Boolean),
      frase_base: form.frase_base.trim(),
      por_que_funciona: form.por_que_funciona.trim(),
      exemplo: form.exemplo.split('\n').map(s => s),
      prompt: form.prompt.split('\n').map(s => s),
    }
  }

  async function salvarCodigo() {
    const payload = formParaPayload()
    const method = editandoId ? 'PUT' : 'POST'
    const body = editandoId ? { id: editandoId, ...payload } : payload
    const r = await fetch('/api/codigos', {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_TOKEN || SENHA },
      body: JSON.stringify(body)
    })
    if (r.ok) {
      setModalAberto(false)
      fetchCodigos()
      flash(editandoId ? '✅ Código atualizado!' : '✅ Código criado!')
    } else {
      const e = await r.json()
      flash('❌ Erro: ' + e.error)
    }
  }

  async function deletarCodigo(id: number) {
    if (!confirm('Deletar este código?')) return
    const r = await fetch('/api/codigos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': SENHA },
      body: JSON.stringify({ id })
    })
    if (r.ok) { fetchCodigos(); flash('🗑️ Código deletado') }
  }

  function abrirNovaCat() {
    setFormCat(catVazia)
    setEditandoCatId(null)
    setModalCatAberto(true)
  }

  function abrirEditarCat(c: any) {
    setFormCat({ slug: c.slug, label: c.label, emoji: c.emoji || '', cor: c.cor || '#C8973A', ordem: c.ordem || 0 })
    setEditandoCatId(c.id)
    setModalCatAberto(true)
  }

  async function salvarCategoria() {
    const method = editandoCatId ? 'PUT' : 'POST'
    const body = editandoCatId ? { id: editandoCatId, ...formCat } : formCat
    const r = await fetch('/api/categorias', {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-key': SENHA },
      body: JSON.stringify(body)
    })
    if (r.ok) {
      setModalCatAberto(false)
      fetchCategorias()
      flash(editandoCatId ? '✅ Categoria atualizada!' : '✅ Categoria criada!')
    } else {
      const e = await r.json()
      flash('❌ Erro: ' + e.error)
    }
  }

  async function deletarCategoria(id: number) {
    if (!confirm('Deletar esta categoria?')) return
    const r = await fetch('/api/categorias', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': SENHA },
      body: JSON.stringify({ id })
    })
    if (r.ok) { fetchCategorias(); flash('🗑️ Categoria deletada') }
  }

  const codigosFiltrados = codigos.filter(c =>
    c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    c.num?.includes(busca)
  )

  if (!autenticado) return (
    <div style={{ minHeight:'100vh', background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'DM Sans, sans-serif' }}>
      <div style={{ background:'#0f0f0f', border:'1px solid #222', borderTop:'2px solid #C8973A', borderRadius:8, padding:'2.5rem', width:360 }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🔑</div>
          <h1 style={{ color:'#fff', fontSize:20, fontWeight:700, margin:0 }}>Painel ADM</h1>
          <p style={{ color:'#666', fontSize:13, marginTop:6 }}>Códigos Secretos da Atenção</p>
        </div>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => { setSenha(e.target.value); setErroSenha(false) }}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width:'100%', background:'#1a1a1a', border:`1px solid ${erroSenha ? '#e53e3e' : '#333'}`, borderRadius:6, padding:'12px 14px', fontSize:14, color:'#fff', outline:'none', boxSizing:'border-box', marginBottom:8 }}
        />
        {erroSenha && <p style={{ color:'#e53e3e', fontSize:12, margin:'0 0 8px' }}>Senha incorreta</p>}
        <button onClick={login} style={{ width:'100%', background:'#C8973A', color:'#000', fontWeight:700, fontSize:14, padding:'12px', borderRadius:6, border:'none', cursor:'pointer', marginTop:8 }}>
          Entrar
        </button>
      </div>
    </div>
  )

  const inp = (placeholder: string, val: string, key: string, textarea = false) => {
    const style: any = { width:'100%', background:'#111', border:'1px solid #2a2a2a', borderRadius:6, padding:'10px 12px', fontSize:13, color:'#e0e0e0', outline:'none', boxSizing:'border-box', fontFamily:'inherit' }
    if (textarea) return <textarea placeholder={placeholder} value={val} onChange={e => setForm(f => ({...f, [key]: e.target.value}))} rows={4} style={{...style, resize:'vertical'}} />
    return <input placeholder={placeholder} value={val} onChange={e => setForm(f => ({...f, [key]: e.target.value}))} style={style} />
  }

  const inpCat = (placeholder: string, val: string, key: string) => (
    <input placeholder={placeholder} value={val} onChange={e => setFormCat(f => ({...f, [key]: e.target.value}))}
      style={{ width:'100%', background:'#111', border:'1px solid #2a2a2a', borderRadius:6, padding:'10px 12px', fontSize:13, color:'#e0e0e0', outline:'none', boxSizing:'border-box' }} />
  )

  const label = (t: string) => <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#555', letterSpacing:1, marginBottom:5, marginTop:14 }}>{t}</label>

  return (
    <div style={{ minHeight:'100vh', background:'#080808', fontFamily:'DM Sans, sans-serif', color:'#e0e0e0' }}>

      <div style={{ background:'#0a0a0a', borderBottom:'1px solid #1e1e1e', padding:'16px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:2, color:'#C8973A' }}>PAINEL ADM</span>
          <span style={{ fontSize:11, color:'#444', marginLeft:12 }}>Códigos Secretos da Atenção</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {(['codigos','categorias'] as const).map(a => (
            <button key={a} onClick={() => setAba(a)}
              style={{ background: aba === a ? '#C8973A18' : 'transparent', border: aba === a ? '1px solid #C8973A44' : '1px solid #222', color: aba === a ? '#C8973A' : '#555', padding:'8px 18px', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer', textTransform:'capitalize' }}>
              {a === 'codigos' ? '📄 Códigos' : '🏷️ Categorias'}
            </button>
          ))}
          <button onClick={() => { sessionStorage.removeItem('adm'); setAutenticado(false) }}
            style={{ background:'transparent', border:'1px solid #333', color:'#555', padding:'8px 14px', borderRadius:6, fontSize:12, cursor:'pointer' }}>
            Sair
          </button>
        </div>
      </div>

      {msg && (
        <div style={{ background:'#0f0f0f', borderBottom:'1px solid #1e1e1e', padding:'10px 32px', fontSize:13, color:'#C8973A' }}>{msg}</div>
      )}

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 24px' }}>

        {aba === 'codigos' && (
          <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
              <div>
                <h2 style={{ margin:0, fontSize:22, fontWeight:800, color:'#fff' }}>Códigos</h2>
                <p style={{ margin:'4px 0 0', fontSize:13, color:'#555' }}>{codigos.length} códigos cadastrados</p>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <input placeholder="Buscar por número ou nome..." value={busca} onChange={e => setBusca(e.target.value)}
                  style={{ background:'#111', border:'1px solid #222', borderRadius:6, padding:'10px 14px', fontSize:13, color:'#e0e0e0', outline:'none', width:260 }} />
                <button onClick={abrirNovo}
                  style={{ background:'#C8973A', color:'#000', fontWeight:700, fontSize:13, padding:'10px 20px', borderRadius:6, border:'none', cursor:'pointer' }}>
                  + Novo Código
                </button>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:12 }}>
              {codigosFiltrados.map(c => (
                <div key={c.id} style={{ background:'#0e0e0e', border:'1px solid #1e1e1e', borderRadius:10, padding:'16px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                    <div>
                      <span style={{ fontSize:11, fontWeight:700, color:'#C8973A', letterSpacing:1 }}>#{c.num} · VOL {c.vol}</span>
                      <div style={{ fontSize:15, fontWeight:700, color:'#fff', marginTop:4 }}>{c.emoji} {c.nome}</div>
                    </div>
                    <div style={{ display:'flex', gap:6 }}>
                      <button onClick={() => abrirEditar(c)}
                        style={{ background:'#1a1a1a', border:'1px solid #2a2a2a', color:'#aaa', padding:'5px 10px', borderRadius:5, fontSize:12, cursor:'pointer' }}>
                        Editar
                      </button>
                      <button onClick={() => deletarCodigo(c.id)}
                        style={{ background:'#1a0000', border:'1px solid #3a0000', color:'#e53e3e', padding:'5px 10px', borderRadius:5, fontSize:12, cursor:'pointer' }}>
                        ✕
                      </button>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {(c.cats || []).map((cat: string) => (
                      <span key={cat} style={{ background:'#161616', border:'1px solid #2a2a2a', borderRadius:4, padding:'2px 8px', fontSize:11, color:'#888' }}>{cat}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {aba === 'categorias' && (
          <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
              <div>
                <h2 style={{ margin:0, fontSize:22, fontWeight:800, color:'#fff' }}>Categorias</h2>
                <p style={{ margin:'4px 0 0', fontSize:13, color:'#555' }}>{categorias.length} categorias cadastradas</p>
              </div>
              <button onClick={abrirNovaCat}
                style={{ background:'#C8973A', color:'#000', fontWeight:700, fontSize:13, padding:'10px 20px', borderRadius:6, border:'none', cursor:'pointer' }}>
                + Nova Categoria
              </button>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:12 }}>
              {categorias.map(c => (
                <div key={c.id} style={{ background:'#0e0e0e', borderLeft:`3px solid ${c.cor}`, border:`1px solid #1e1e1e`, borderRadius:10, padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:22, marginBottom:6 }}>{c.emoji}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{c.label}</div>
                    <div style={{ fontSize:11, color:'#555', marginTop:2 }}>slug: {c.slug} · ordem: {c.ordem}</div>
                  </div>
                  <div style={{ display:'flex', gap:6 }}>
                    <button onClick={() => abrirEditarCat(c)}
                      style={{ background:'#1a1a1a', border:'1px solid #2a2a2a', color:'#aaa', padding:'5px 10px', borderRadius:5, fontSize:12, cursor:'pointer' }}>
                      Editar
                    </button>
                    <button onClick={() => deletarCategoria(c.id)}
                      style={{ background:'#1a0000', border:'1px solid #3a0000', color:'#e53e3e', padding:'5px 10px', borderRadius:5, fontSize:12, cursor:'pointer' }}>
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {modalAberto && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:200, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'24px 16px', overflowY:'auto' }}>
          <div style={{ background:'#0d0d0d', border:'1px solid #222', borderRadius:12, width:'100%', maxWidth:700, padding:'32px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:'#fff' }}>
                {editandoId ? 'Editar Código' : 'Novo Código'}
              </h3>
              <button onClick={() => setModalAberto(false)} style={{ background:'none', border:'1px solid #333', color:'#888', padding:'6px 10px', borderRadius:6, cursor:'pointer' }}>✕</button>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
              <div>{label('NÚMERO')}{inp('101', form.num, 'num')}</div>
              <div>{label('EMOJI')}{inp('🔍', form.emoji, 'emoji')}</div>
              <div>{label('VOLUME')}<select value={form.vol} onChange={e => setForm(f => ({...f, vol: Number(e.target.value)}))}
                style={{ width:'100%', background:'#111', border:'1px solid #2a2a2a', borderRadius:6, padding:'10px 12px', fontSize:13, color:'#e0e0e0', outline:'none' }}>
                <option value={1}>Vol 1</option><option value={2}>Vol 2</option>
              </select></div>
            </div>

            {label('NOME DO CÓDIGO')}{inp('Nome', form.nome, 'nome')}
            {label('CATEGORIAS (separadas por vírgula)')}{inp('identificacao, curiosidade', form.cats, 'cats')}
            {label('GATILHO')}{inp('Gatilho psicológico...', form.gatilho, 'gatilho', true)}
            {label('ESTRUTURA (uma linha por item)')}{inp('🟥 Linha 1\n🟧 Linha 2', form.estrutura, 'estrutura', true)}
            {label('FRASE BASE')}{inp('Frase base...', form.frase_base, 'frase_base')}
            {label('POR QUE FUNCIONA')}{inp('Explicação...', form.por_que_funciona, 'por_que_funciona', true)}
            {label('EXEMPLO (uma linha por parágrafo)')}{inp('Linha 1\nLinha 2', form.exemplo, 'exemplo', true)}
            {label('PROMPT (uma linha por item)')}{inp('Linha 1\nLinha 2', form.prompt, 'prompt', true)}

            <div style={{ display:'flex', gap:10, marginTop:24, justifyContent:'flex-end' }}>
              <button onClick={() => setModalAberto(false)}
                style={{ background:'transparent', border:'1px solid #333', color:'#888', padding:'10px 20px', borderRadius:6, fontSize:13, cursor:'pointer' }}>
                Cancelar
              </button>
              <button onClick={salvarCodigo}
                style={{ background:'#C8973A', color:'#000', fontWeight:700, fontSize:13, padding:'10px 24px', borderRadius:6, border:'none', cursor:'pointer' }}>
                {editandoId ? 'Salvar Alterações' : 'Criar Código'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalCatAberto && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 16px' }}>
          <div style={{ background:'#0d0d0d', border:'1px solid #222', borderRadius:12, width:'100%', maxWidth:480, padding:'32px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:'#fff' }}>
                {editandoCatId ? 'Editar Categoria' : 'Nova Categoria'}
              </h3>
              <button onClick={() => setModalCatAberto(false)} style={{ background:'none', border:'1px solid #333', color:'#888', padding:'6px 10px', borderRadius:6, cursor:'pointer' }}>✕</button>
            </div>

            {label('SLUG (ex: identificacao)')}{inpCat('identificacao', formCat.slug, 'slug')}
            {label('LABEL (nome exibido)')}{inpCat('Identificação', formCat.label, 'label')}
            {label('EMOJI')}{inpCat('🪞', formCat.emoji, 'emoji')}
            {label('COR (hex)')}<input type="color" value={formCat.cor} onChange={e => setFormCat(f => ({...f, cor: e.target.value}))}
              style={{ width:'100%', height:42, background:'#111', border:'1px solid #2a2a2a', borderRadius:6, cursor:'pointer', padding:4 }} />
            {label('ORDEM (número para ordenação)')}{inpCat('0', String(formCat.ordem), 'ordem')}

            <div style={{ display:'flex', gap:10, marginTop:24, justifyContent:'flex-end' }}>
              <button onClick={() => setModalCatAberto(false)}
                style={{ background:'transparent', border:'1px solid #333', color:'#888', padding:'10px 20px', borderRadius:6, fontSize:13, cursor:'pointer' }}>
                Cancelar
              </button>
              <button onClick={salvarCategoria}
                style={{ background:'#C8973A', color:'#000', fontWeight:700, fontSize:13, padding:'10px 24px', borderRadius:6, border:'none', cursor:'pointer' }}>
                {editandoCatId ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
