import { useState } from 'react';

const TABS = [
  { id: 'boas-vindas', emoji: '🏠', label: 'Boas Vindas' },
  { id: 'duvidas', emoji: '❓', label: 'Tirando as Dúvidas' },
  { id: 'publico', emoji: '👤', label: 'Mapeamento do Público' },
  { id: 'categorias', emoji: '🎯', label: 'Códigos por Categoria' },
  { id: 'palavras', emoji: '🧩', label: 'Palavras-Chave' },
];

const CONTENT = {
  'boas-vindas': () => (
    <div>
      <h2 style={{fontFamily:'serif',fontSize:22,fontWeight:700,marginBottom:16,color:'#fff'}}>🔐 Bem-vindos aos Códigos Secretos da Atenção!</h2>
      <p style={{color:'#a0a0b0',lineHeight:1.8,marginBottom:16}}>Sua fábrica completa de Ganchos e Ideias virais de conteúdo, para você destravar o seu engajamento.</p>
      {[{q:'Como funciona?',a:'Para cada Código existe uma estrutura simples e replicável de como você pode adaptar para o seu nicho e ter infinitas ideias de conteúdos virais. Eles foram desenvolvidos para chamar atenção nos 3 primeiros segundos do seu conteúdo.'},{q:'Como acessar os Códigos?',a:'No dashboard você vai encontrar os Códigos organizados por objetivo e volume. Clique no nome de cada código para abrir o roteiro completo com o passo a passo de como usar.'},{q:'Serve para qualquer nicho?',a:'Sim, para qualquer nicho! Médicos, advogados, especialistas, social medias, professores...'}].map(({q,a})=>(
      <div key={q} style={{background:'#1a1a2e',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:20,marginBottom:12}}>
        <h3 style={{fontSize:15,fontWeight:600,marginBottom:8,color:'#fff'}}>{q}</h3>
        <p style={{color:'#a0a0b0',lineHeight:1.75,fontSize:14}}>{a}</p>
      </div>))}
    </div>
  ),
  'duvidas': () => (
    <div>
      <h2 style={{fontFamily:'serif',fontSize:22,fontWeight:700,marginBottom:20,color:'#fff'}}>❓ Perguntas Frequentes</h2>
      {[{q:'Como funciona os Códigos Secretos Da Atenção?',a:'Para cada Código existe uma estrutura simples e replicável de como você pode adaptar para o seu nicho e ter infinitas ideias de conteúdos virais.'},{q:'Como acessar os Códigos?',a:'No dashboard você vai encontrar os Códigos organizados por objetivo e volume. Você vai clicar no nome e vai abrir uma página explicando o passo a passo de como usar cada código.'},{q:'Serve para qualquer nicho?',a:'Sim para qualquer nicho. Médicos, advogados, especialistas, social medias, professores…'},{q:'Vou aprender criar Roteiros?',a:'Nesse produto você não vai aprender a estrutura completa de roteiros, mas com o CSA você vai ter praticamente o roteiro central do seu conteúdo.'}].map(({q,a})=>(
      <div key={q} style={{background:'#1a1a2e',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:20,marginBottom:12}}>
        <h3 style={{fontSize:14,fontWeight:700,marginBottom:10,color:'#E8513A'}}>{q}</h3>
        <p style={{color:'#a0a0b0',lineHeight:1.75,fontSize:14}}>{a}</p>
      </div>))}
    </div>
  ),
  'publico': () => (
    <div>
      <h2 style={{fontFamily:'serif',fontSize:22,fontWeight:700,marginBottom:8,color:'#fff'}}>👤 Antes de Usar os Códigos</h2>
      <p style={{color:'#a0a0b0',lineHeight:1.8,marginBottom:16,fontSize:14}}>📝 Responda essas perguntas sobre o seu público:</p>
      {['Quem é o seu Público Alvo?','Quais são as principais dores deles?','Quais são as maiores dificuldades que eles passam no dia a dia?','Quais são os maiores desejos?','Quais erros eles têm cometido?','Quais são os medos?','Quais são os maiores sonhos?','Como o seu produto ou serviço pode ajudá-los?','Quais bons ou ruins hábitos?','Quais problemas eles têm passado?','Quais suas necessidades?','Quais conquistas eles possuem?','Quais suas paixões?'].map((item,i)=>(
      <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,background:'#1a1a2e',border:'1px solid rgba(255,255,255,0.06)',borderRadius:6,padding:'12px 16px',marginBottom:8}}>
        <span style={{color:'#E8513A',fontWeight:700,fontSize:13,flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
        <span style={{color:'#a0a0b0',fontSize:13,lineHeight:1.5}}>{item}</span>
      </div>))}
      <div style={{background:'rgba(232,81,58,0.08)',border:'1px solid rgba(232,81,58,0.3)',borderRadius:8,padding:16,marginTop:8}}>
        <p style={{color:'#E8513A',fontSize:13,lineHeight:1.7,marginBottom:12}}>💡 Tenha clareza desses pontos sobre o seu público. Escreva cada um com 5 pontos.</p>
        <a href="https://docs.google.com/document/d/1zMCUgzp6NxHsADUiIUckBjaZk_G9XcOtMtIZx9BN-PA/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',background:'#E8513A',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'10px 20px',borderRadius:4,textDecoration:'none'}}>👉 Abrir Prompt para Mapear seu Público</a>
      </div>
    </div>
  ),
  'categorias': () => (
    <div>
      <h2 style={{fontFamily:'serif',fontSize:22,fontWeight:700,marginBottom:8,color:'#fff'}}>🎯 Códigos por Categoria</h2>
      <p style={{color:'#a0a0b0',lineHeight:1.8,marginBottom:16,fontSize:14}}>Use o filtro de <strong style={{color:'#fff'}}>Objetivo do Conteúdo</strong> no dashboard para encontrar os códigos certos.</p>
      {[{cat:'🪞 Identificação',count:10,desc:'Faça o público se ver na sua situação imediatamente.'},{cat:'🔍 Curiosidade',count:13,desc:'Crie um loop de tensão que o cérebro precisa resolver.'},{cat:'❤️ Conexão',count:14,desc:'Gere proximidade e confiança com a audiência.'},{cat:'👑 Autoridade',count:22,desc:'Posicione-se como referência no seu nicho.'},{cat:'🔥 Despertar Desejo',count:15,desc:'Conecte o avatar à ação com clareza e intenção.'},{cat:'⏰ Urgência / FOMO',count:9,desc:'Ative o medo de ficar de fora ou perder algo.'},{cat:'🎯 Captar Leads',count:15,desc:'Estruturas para atrair e capturar contatos.'},{cat:'📈 Atrair Seguidores',count:15,desc:'Conteúdos que geram novos seguidores.'},{cat:'💬 Engajamento',count:15,desc:'Provoque comentários, salvamentos e compartilhamentos.'},{cat:'💰 Vendas',count:10,desc:'Ganchos direcionados para converter.'},{cat:'🛡️ Quebra de Objeção',count:9,desc:'Elimine barreiras mentais do público.'}].map(({cat,count,desc})=>(
      <div key={cat} style={{display:'flex',alignItems:'center',gap:12,background:'#1a1a2e',border:'1px solid rgba(255,255,255,0.06)',borderRadius:6,padding:'12px 16px',marginBottom:8}}>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600,color:'#fff',marginBottom:2}}>{cat}</div>
          <div style={{fontSize:12,color:'#a0a0b0'}}>{desc}</div>
        </div>
        <span style={{background:'rgba(232,81,58,0.15)',color:'#E8513A',fontSize:12,fontWeight:700,padding:'4px 10px',borderRadius:20,flexShrink:0}}>{count}</span>
      </div>))}
    </div>
  ),
  'palavras': () => (
    <div>
      <h2 style={{fontFamily:'serif',fontSize:22,fontWeight:700,marginBottom:8,color:'#fff'}}>🧩 Palavras-Chave</h2>
      <p style={{color:'#a0a0b0',lineHeight:1.8,marginBottom:16,fontSize:14}}>Palavras-chave para potencializar os Códigos.</p>
      {[{title:'Palavras para iniciar os ganchos',color:'#27c93f',items:['Se você quer','Se você deseja','Se você almeja','Se você sonha','Se você precisa','Pare agora de','O que eu faria se','O que você precisa','O que você deve','Quando você']},{title:'Verbos',color:'#27c93f',items:['Ser','Fazer','Conquistar','Aprender','Vender','Ganhar','Realizar','Montar','Evitar','Errar','Perder']},{title:'Termos',color:'#27c93f',items:['Como','Onde','O que','Por que','Para que','Quando','Agora']},{title:'Frases de Interligação',color:'#58a6ff',items:['Aplique','Faça','Pratique','Siga','Corrija','Mude','Melhore']},{title:'Frases Finais',color:'#f778ba',items:['Ensinar','Explicar','Mostrar','Falar']}].map(({title,color,items})=>(
      <div key={title} style={{background:'#1a1a2e',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,padding:16,marginBottom:12}}>
        <h3 style={{fontSize:13,fontWeight:700,color,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>{title}</h3>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {items.map(item=>(<span key={item} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:4,padding:'4px 12px',fontSize:13,color:'#a0a0b0'}}>{item}</span>))}
        </div>
      </div>))}
    </div>
  ),
};

export default function InfoPanel({ onClose }) {
  const [active, setActive] = useState('boas-vindas');
  const Content = CONTENT[active];

  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',background:'#0d0d1a',overflow:'hidden'}}>
      <style>{`
        .ip-tabs {
          display: flex;
          background: #0d0d1a;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          overflow-x: auto;
          overflow-y: hidden;
          flex-shrink: 0;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .ip-tabs::-webkit-scrollbar { display: none; }
        .ip-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          white-space: nowrap;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          color: #a0a0b0;
          font-size: 13px;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .ip-tab.active {
          color: #fff;
          border-bottom-color: #E8513A;
          background: rgba(232,81,58,0.08);
        }
        .ip-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          -webkit-overflow-scrolling: touch;
        }
        .ip-back {
          margin: 16px 20px 0;
          padding: 10px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          color: #a0a0b0;
          font-size: 13px;
          cursor: pointer;
          flex-shrink: 0;
        }
      `}</style>

      {/* Abas horizontais */}
      <div className="ip-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`ip-tab${active === tab.id ? ' active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="ip-content">
        <Content />
        <button className="ip-back" onClick={onClose}>← Voltar aos Códigos</button>
      </div>
    </div>
  );
}
