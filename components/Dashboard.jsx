import { useState, useEffect, useRef } from "react";

const categorias = [
  { id: "todos",          label: "Todos",              emoji: "🔐", cor: "#C8973A" },
  { id: "identificacao",  label: "Identificação",      emoji: "🪞", cor: "#7C3AED" },
  { id: "curiosidade",    label: "Curiosidade",        emoji: "🔍", cor: "#0369A1" },
  { id: "conexao",        label: "Conexão",            emoji: "❤️", cor: "#DB2777" },
  { id: "autoridade",     label: "Autoridade",         emoji: "👑", cor: "#B45309" },
  { id: "desejo",         label: "Despertar Desejo",   emoji: "🔥", cor: "#DC2626" },
  { id: "urgencia",       label: "Urgência / FOMO",    emoji: "⏰", cor: "#EA580C" },
  { id: "leads",          label: "Captar Leads",       emoji: "🎯", cor: "#0F766E" },
  { id: "seguidores",     label: "Atrair Seguidores",  emoji: "📈", cor: "#15803D" },
  { id: "engajamento",    label: "Engajamento",        emoji: "💬", cor: "#92400E" },
  { id: "vendas",         label: "Vendas",             emoji: "💰", cor: "#1D4ED8" },
  { id: "objecao",        label: "Quebra de Objeção",  emoji: "🛡️", cor: "#6D28D9" },
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
  { q: "Como acessar os Códigos?", a: "Clique na aba 'Códigos' no menu acima. Você pode filtrar por categoria ou volume. Ao clicar em qualquer código, abrirá todos os detalhes, estrutura, exemplos e prompts prontos." },
  { q: "Serve para qualquer nicho?", a: "Sim para qualquer nicho. Médicos, advogados, especialistas, social medias, professores… Os códigos são adaptáveis para qualquer área de atuação." },
  { q: "Vou aprender criar Roteiros?", a: "Nesse produto você não vai aprender a estrutura completa de roteiros, mas com os Códigos Secretos você vai ter praticamente o roteiro central do seu conteúdo pronto." },
];

const publicoPerguntas = [
  "Quem é o seu Público Alvo?","Quais são as principais dores deles?","Quais são as maiores dificuldades que eles passam no dia a dia?","Quais são os maiores desejos?","Quais erros eles têm cometido?","Quais são os medos?","Quais são os maiores sonhos?","Como o seu produto ou serviço pode ajudá-los?","Quais bons ou ruins hábitos?","Quais problemas eles têm passado?","Quais suas necessidades?","Quais conquistas eles possuem?","Quais são os seus medos?","Quais suas paixões?"
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
  { q: "Como acessar os Códigos?", a: "Clique na aba 'Códigos' no menu acima. Você pode filtrar por categoria ou volume. Ao clicar em qualquer código, abrirá todos os detalhes, estrutura, exemplos e prompts prontos." },
  { q: "Serve para qualquer nicho?", a: "Sim para qualquer nicho. Médicos, advogados, especialistas, social medias, professores… Os códigos são adaptáveis para qualquer área de atuação." },
  { q: "Vou aprender criar Roteiros?", a: "Nesse produto você não vai aprender a estrutura completa de roteiros, mas com os Códigos Secretos você vai ter praticamente o roteiro central do seu conteúdo pronto." },
];

const publicoPerguntas = [
  "Quem é o seu Público Alvo?","Quais são as principais dores deles?","Quais são as maiores dificuldades que eles passam no dia a dia?","Quais são os maiores desejos?","Quais erros eles têm cometido?","Quais são os medos?","Quais são os maiores sonhos?","Como o seu produto ou serviço pode ajudá-los?","Quais bons ou ruins hábitos?","Quais problemas eles têm passado?","Quais suas necessidades?","Quais conquistas eles possuem?","Quais são os seus medos?","Quais suas paixões?"
];

import { useState, useEffect, useRef } from "react";

const categorias = [
  { id: "todos",        label: "Todos",              emoji: "🔐", cor: "#64748b" },
  { id: "identificacao",label: "Identificação",      emoji: "🪞", cor: "#7C3AED" },
  { id: "curiosidade",  label: "Curiosidade",        emoji: "🔍", cor: "#0369A1" },
  { id: "conexao",      label: "Conexão",            emoji: "❤️", cor: "#DB2777" },
  { id: "autoridade",   label: "Autoridade",         emoji: "👑", cor: "#B45309" },
  { id: "desejo",       label: "Despertar Desejo",   emoji: "🔥", cor: "#DC2626" },
  { id: "urgencia",     label: "Urgência / FOMO",    emoji: "⏰", cor: "#EA580C" },
  { id: "leads",        label: "Captar Leads",       emoji: "🎯", cor: "#0F766E" },
  { id: "seguidores",   label: "Atrair Seguidores",  emoji: "📈", cor: "#15803D" },
  { id: "engajamento",  label: "Engajamento",        emoji: "💬", cor: "#92400E" },
  { id: "vendas",       label: "Vendas",             emoji: "💰", cor: "#1D4ED8" },
  { id: "objecao",      label: "Quebra de Objeção",  emoji: "🛡️", cor: "#6D28D9" },
];

const codigos = [
  // ── VOL 1 ──────────────────────────────────────────────────────────────────
  {
    num:"101", nome:"A Causa da Dor", emoji:"🔍", vol:1,
    cats:["identificacao","curiosidade"],
    gatilho:"Citar a dor nos 3 primeiros segundos e mostrar que ela não acontece por acaso ativa atenção imediata.",
    estrutura:[
      "🟥 [DOR/PROBLEMA PRINCIPAL] — Cite a situação que seu público está passando",
      "🟧 [AÇÃO/HÁBITO] — O que ele tem feito que gera o problema",
      "🟨 [CONSEQUÊNCIA] — O que piora por causa disso",
    ],
    fraseBase:"Você está passando por [DOR] porque está [AÇÃO/HÁBITO] — e o último é o que [CONSEQUÊNCIA].",
    porqueFunciona:"O cérebro para tudo quando sente que está no caminho errado. Ao nomear a dor com precisão e mostrar que ela tem uma causa específica (não é azar), você gera identificação imediata e posiciona autoridade.",
    exemplo:[
      "Você está com pouco alcance no Instagram porque está postando",
      "sem essas 3 coisas que todo conteúdo viral tem — e o último é o",
      "que faz suas visualizações travarem nos 300 views.",
      "",
      "O primeiro elemento é o gancho: sem parar o scroll nos 3 primeiros",
      "segundos, o algoritmo não distribui para novas pessoas.",
      "",
      "O segundo é a retenção: se as pessoas saem antes de 50% do vídeo,",
      "o Instagram entende que o conteúdo não é bom e para de mostrar.",
      "",
      "E o terceiro — o mais ignorado — é o CTA. Sem pedir uma ação,",
      "ninguém salva, comenta nem compartilha.",
      "",
      "Quer os 3 elementos completos com exemplos prontos?",
      "Comenta QUERO aqui.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post no formato 'Código 101 — A Causa da Dor' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: mulheres de 28 a 45 anos que postam mas não crescem]",
      "- Dor principal: [o problema que mais as frustra]",
      "- Comportamento que gera o problema: [o que fazem achando que ajuda]",
      "- Consequência que mais dói: [o que piora por causa disso]",
      "- Tom: [empático, sem julgamento]",
      "",
      "CONTEÚDO:",
      "1. 'Você está passando por [DOR] porque está [AÇÃO] e o último é o que [CONSEQUÊNCIA]'",
      "2. Explique cada elemento (3 a 5) com a lógica real por trás",
      "3. CTA pedindo palavra nos comentários para receber [MATERIAL]",
    ],
  },
  {
    num:"102", nome:"A Consequência Positiva", emoji:"✅", vol:1,
    cats:["desejo","engajamento"],
    gatilho:"Entrega o conselho logo no início e atrela a uma recompensa clara. O suspense no 'e a última...' força o consumo até o fim.",
    estrutura:[
      "🟦 [AÇÃO OU CONSELHO PRÁTICO] — Ação simples e aplicável",
      "🟪 [NÚMERO] — Pequeno (3 a 5)",
      "🟥 [RESULTADO OU DESEJO] — O benefício direto",
    ],
    fraseBase:"Se você [AÇÃO], essas [N] coisas vão acontecer com [RESULTADO] — e a última...",
    porqueFunciona:"O cérebro responde imediatamente a promessas de transformação encadeadas. O suspense no final ('e a última...') cria um loop que obriga a pessoa a consumir o conteúdo inteiro.",
    exemplo:[
      "Se você usar gancho nos primeiros 3 segundos dos seus Reels,",
      "essas 3 coisas vão acontecer com o seu alcance — e a última vai te surpreender.",
      "",
      "Primeira: o algoritmo vai distribuir para pessoas que não te seguem.",
      "",
      "Segunda: sua retenção vai subir — quem para no início tende a assistir até o final.",
      "",
      "E a terceira — a que mais me surpreendeu: seus seguidores antigos",
      "voltam a ver seu conteúdo. O algoritmo re-distribui para quem parou de ver.",
      "",
      "Quer os 7 modelos de gancho que mais funcionam? Clique no link da bio.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 102 — A Consequência Positiva' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: empreendedores de 25 a 40 anos que querem vender mais]",
      "- Ação simples que o público pode começar hoje: [algo prático e acessível]",
      "- Resultado que mais desejam: [o benefício principal]",
      "- Número de consequências: [3 a 5 — seja específico e real]",
      "- A consequência 'surpresa': [a última deve ser a mais inesperada]",
      "",
      "CONTEÚDO:",
      "1. 'Se você [AÇÃO], essas [N] coisas vão acontecer com [RESULTADO] — e a última...'",
      "2. Descreva cada consequência com lógica real",
      "3. CTA natural no final",
    ],
  },
  {
    num:"103", nome:"O Erro Invisível", emoji:"❌", vol:1,
    cats:["identificacao","objecao"],
    gatilho:"Mostra que o problema não é falta de esforço, mas de consciência. Libera o público de culpa e cria esperança imediata.",
    estrutura:[
      "🟥 [RESULTADO DESEJADO] — O que o público quer e não consegue",
      "🟧 [NÚMERO] — Quantidade de erros (3 a 5)",
      "🟨 [CONTEXTO/SITUAÇÃO] — Onde esses erros acontecem",
    ],
    fraseBase:"Você não consegue [RESULTADO] porque está cometendo esses [N] erros [CONTEXTO].",
    porqueFunciona:"Quando alguém já tentou várias vezes sem sucesso, a culpa é o sentimento dominante. Mostrar que o problema é falta de informação (não de capacidade) derruba essa barreira e abre espaço para a solução.",
    exemplo:[
      "Você não consegue prender atenção no início dos seus vídeos porque",
      "está cometendo esses 3 erros na hora de gravar seus Reels.",
      "",
      "Erro 1: Você começa se apresentando. Ninguém quer saber quem você",
      "é nos primeiros 3 segundos — quer saber o que vai ganhar.",
      "",
      "Erro 2: Introdução longa antes de chegar no ponto.",
      "O público abandona antes de 5 segundos sem valor imediato.",
      "",
      "Erro 3: Sem tensão ou curiosidade no início.",
      "O gancho precisa criar uma pergunta que só é respondida no final.",
      "",
      "Clique no link da bio para os 5 formatos de gancho que mais convertem.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 103 — O Erro Invisível' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: criadores de 22 a 38 anos que não conseguem crescer]",
      "- O resultado que buscam e não conseguem: [seja específico]",
      "- Erros reais que cometem sem perceber: [pesquise em comentários e DMs]",
      "- Onde esses erros acontecem: [contexto claro]",
      "- Emoção que carregam: [frustração, sensação de incompetência]",
      "",
      "CONTEÚDO:",
      "1. 'Você não consegue [RESULTADO] porque comete esses [N] erros [CONTEXTO]'",
      "2. Para cada erro: descrição + por que é um erro + consequência real",
      "3. CTA com material que resolve os erros",
    ],
  },
  {
    num:"104", nome:"Os Sinais Ocultos", emoji:"🚨", vol:1,
    cats:["curiosidade","identificacao"],
    gatilho:"Gera identificação e curiosidade ao mesmo tempo. O 'e o último é o mais preocupante' cria tensão que obriga o consumo até o final.",
    estrutura:[
      "🟧 [NÚMERO] — Quantidade de sinais (3 a 5)",
      "🟥 [PROBLEMA OU SITUAÇÃO] — Situação real que o público pode estar vivendo",
    ],
    fraseBase:"Esses [N] sinais mostram que [PROBLEMA/SITUAÇÃO] — e o último é o mais preocupante.",
    porqueFunciona:"A pessoa para e pensa 'será que isso está acontecendo comigo?' Isso ativa curiosidade imediata e autoconsciência. O progressivo 'o último é o mais preocupante' garante retenção até o final.",
    exemplo:[
      "3 sinais que o seu perfil está flopado — e o último é o mais preocupante.",
      "",
      "Sinal 1: Seus Reels chegam a 300 views e param.",
      "O algoritmo tentou distribuir, mas a retenção foi baixa. Ele parou.",
      "",
      "Sinal 2: Seus seguidores não interagem mesmo quando você pede.",
      "Sinal de audiência não qualificada ou conteúdo sem identificação suficiente.",
      "",
      "Sinal 3 — o mais preocupante: você cresce em seguidores mas",
      "diminui em alcance. Você atraiu o público errado, e o algoritmo penaliza.",
      "",
      "Se você reconheceu 2 ou mais sinais, me manda uma mensagem.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 104 — Os Sinais Ocultos' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: pessoas de 30 a 50 anos preocupadas mas sem diagnóstico]",
      "- Situação que podem estar vivendo sem perceber: [problema silencioso e real]",
      "- Número de sinais: [3 a 5 — do mais óbvio ao mais surpreendente]",
      "- O sinal final: [deve ser o mais impactante e menos esperado]",
      "",
      "CONTEÚDO:",
      "1. 'Esses [N] sinais mostram que [SITUAÇÃO] — e o último é o mais preocupante'",
      "2. Para cada sinal: descrição específica + o que ele indica",
      "3. CTA com próximo passo claro",
    ],
  },
  {
    num:"105", nome:"A Ação com Resultado", emoji:"🎬", vol:1,
    cats:["desejo","engajamento"],
    gatilho:"Cria um experimento mental — a pessoa se imagina fazendo a ação e querendo ver o resultado. Funciona para positivos e negativos.",
    estrutura:[
      "🟦 [AÇÃO ESPECÍFICA] — Ação clara, simples e prática",
      "🟥 [CONSEQUÊNCIA/RESULTADO] — O resultado direto (positivo ou negativo)",
    ],
    fraseBase:"Faça [AÇÃO ESPECÍFICA] e veja [CONSEQUÊNCIA/RESULTADO] acontecer com você.",
    porqueFunciona:"O suspense sobre o que vai acontecer prende a atenção até o final. Adicionar 'e o terceiro me surpreendeu' cria curiosidade progressiva.",
    exemplo:[
      "Faça esses 3 exercícios ao acordar e veja o que vai acontecer",
      "com sua disposição — o terceiro me surpreendeu.",
      "",
      "Exercício 1: 5 minutos de alongamento da coluna.",
      "Ativa a circulação e sinaliza para o cérebro que é hora de funcionar.",
      "",
      "Exercício 2: 10 agachamentos.",
      "Ativa os maiores grupos musculares e libera endorfina em 2 minutos.",
      "",
      "Exercício 3: 2 minutos de respiração 4-7-8.",
      "Regula o cortisol matinal — motivo pelo qual atletas usam antes de competir.",
      "",
      "Faço isso há 60 dias e nunca mais precisei de café pela manhã.",
      "Quer a rotina completa de 10 minutos? Clique no link da bio.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 105 — A Ação com Resultado' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: homens de 30 a 50 anos que querem mais energia]",
      "- Ação simples que o público pode fazer: [algo concreto, não abstrato]",
      "- Resultado que vão ver: [real e específico]",
      "- Elemento surpresa: [o terceiro item deve ser o mais inesperado]",
      "",
      "CONTEÚDO:",
      "1. 'Faça [AÇÃO] e veja [RESULTADO] acontecer com você'",
      "2. Para cada item: o que fazer + por que funciona (mecanismo real)",
      "3. Resultado pessoal como prova + CTA",
    ],
  },
  {
    num:"106", nome:"A Lista Útil", emoji:"📋", vol:1,
    cats:["autoridade","seguidores","leads"],
    gatilho:"Entrega algo útil, prático e aplicável imediatamente. Gera alto salvamento — as pessoas guardam para usar depois.",
    estrutura:[
      "🟦 [AÇÃO PRÁTICA OU DICA] — Ação simples, prática e objetiva",
      "🟥 [BENEFÍCIO OU RESULTADO] — Benefício direto e fácil de entender",
    ],
    fraseBase:"[N] [dicas/passos/ferramentas] para [BENEFÍCIO CLARO].",
    porqueFunciona:"Conteúdo de utilidade gera alto salvamento — as pessoas guardam para usar depois. Quanto mais específica a dica, maior a percepção de valor e autoridade.",
    exemplo:[
      "3 perguntas para fazer antes de qualquer venda — e parar de",
      "perder clientes na hora do fechamento.",
      "",
      "Pergunta 1: 'O que te levou a buscar uma solução para isso agora?'",
      "Revela a urgência real. Quem está em dor compra. Quem explora, não.",
      "",
      "Pergunta 2: 'O que acontece se você não resolver isso nos próximos 3 meses?'",
      "Ativa o gatilho da perda pela própria pessoa — muito mais poderoso.",
      "",
      "Pergunta 3: 'O que você já tentou e não funcionou?'",
      "Revela objeções antes que apareçam e te diferencia das soluções anteriores.",
      "",
      "Essas 3 perguntas aumentaram minha taxa de fechamento em 40%.",
      "Quer o roteiro completo? Clique no link da bio.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 106 — A Lista Útil' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: mães de 28 a 45 anos que buscam soluções práticas]",
      "- O que buscam: [praticidade imediata — querem usar hoje]",
      "- A lista que resolve: [algo que você realmente usa e que funciona]",
      "- Benefício claro: [o resultado que conseguem ao aplicar]",
      "",
      "CONTEÚDO:",
      "1. '[N] [dicas/passos] para [BENEFÍCIO CLARO]'",
      "2. Para cada item: a dica + por que funciona",
      "3. Resultado pessoal que valida + CTA",
    ],
  },
  {
    num:"107", nome:"Minha Opinião, Minha Marca", emoji:"🔥", vol:1,
    cats:["conexao","seguidores"],
    gatilho:"Defender posição própria cria identificação com quem concorda e afasta quem não é seu público. Segmentação natural da audiência ideal.",
    estrutura:[
      "Afirme algo do seu nicho que você acredita — mesmo contra o senso comum",
      "Variações: Crença | Hábito | Verdade do nicho | Quebra de objeção | Mentalidade | Valores",
    ],
    fraseBase:"[AFIRMAÇÃO CONTRA O SENSO COMUM DO NICHO] — e tenho [N] razões para isso.",
    porqueFunciona:"Quem tem posicionamento próprio cria audiência fiel. Conteúdo que polariza (mas com embasamento) tem alta taxa de compartilhamento de quem concorda e alto engajamento de quem discorda.",
    exemplo:[
      "Postar todos os dias não faz perfil crescer.",
      "Eu sei que vai contra tudo que você já ouviu — mas me ouve.",
      "",
      "Postar todos os dias sem estratégia ensina o algoritmo que você é",
      "um criador de baixo engajamento.",
      "",
      "O que faz um perfil crescer é a taxa de engajamento por post.",
      "Um perfil que posta 3x por semana com alta interação cresce mais",
      "do que um que posta 7x com posts que ninguém toca.",
      "",
      "Consistência sim. Quantidade cega não.",
      "",
      "Quer entender qual é a frequência certa para o seu nicho?",
      "Clique no link da bio.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 107 — Minha Opinião, Minha Marca' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: profissionais de 25 a 40 anos que seguem regras convencionais]",
      "- Crença popular que vai desafiar: [algo que o mercado repete como verdade]",
      "- Por que essa crença é limitante: [a lógica real por trás da sua visão]",
      "- Tom: [direto, confiante, embasado — não agressivo]",
      "",
      "CONTEÚDO:",
      "1. Afirmação controversa como abertura",
      "2. 'Eu sei que vai contra tudo que você já ouviu, mas...'",
      "3. Argumento com lógica real (dado, mecanismo ou experiência)",
      "4. Conclusão que reposiciona a crença + CTA",
    ],
  },
  {
    num:"108", nome:"O Próximo Passo Claro", emoji:"👣", vol:1,
    cats:["desejo","leads"],
    gatilho:"Elimina a confusão e deixa o caminho claro. Quem entrega clareza se torna referência imediata no nicho.",
    estrutura:[
      "🟥 [RESULTADO/SONHO/META DESEJADO] — O destino claro do avatar",
    ],
    fraseBase:"O passo a passo que você precisa para [RESULTADO/META DESEJADO].",
    porqueFunciona:"Quando alguém não sabe por onde começar, mostrar um caminho claro já é valor imediato. A clareza é o gatilho mais subestimado em copywriting.",
    exemplo:[
      "O passo a passo para gravar seus primeiros Reels sem travar",
      "na câmera — mesmo que odeie aparecer.",
      "",
      "Passo 1: Grave sem comprometer.",
      "Durante 7 dias, grave 1 vídeo por dia sem publicar nenhum.",
      "O objetivo é só se acostumar. Perfeccionismo trava.",
      "",
      "Passo 2: Comece com vídeos de costas ou de mãos.",
      "Você não precisa do rosto para criar conteúdo de valor.",
      "",
      "Passo 3: Use um roteiro de 3 linhas.",
      "Gancho, desenvolvimento, CTA. Quem trava geralmente não sabe o que vai falar.",
      "",
      "Passo 4: Grave mais do que precisa e corte depois.",
      "Muito mais fácil do que tentar acertar na primeira tentativa.",
      "",
      "Quer o roteiro de 3 linhas que uso? Clique no link da bio.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 108 — O Próximo Passo Claro' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: iniciantes de 22 a 38 anos que querem começar mas não sabem por onde]",
      "- Meta ou resultado que desejam: [o destino claro]",
      "- Principal obstáculo para começar: [o que os trava]",
      "- Nível atual: [iniciante total / já tentou e parou]",
      "",
      "CONTEÚDO:",
      "1. 'O passo a passo para [RESULTADO] mesmo que [OBSTÁCULO]'",
      "2. De 3 a 5 passos com nome + explicação do por que funciona",
      "3. Resultado esperado ao seguir os passos + CTA",
    ],
  },
  {
    num:"109", nome:"O Detalhe que Ninguém Vê", emoji:"🔬", vol:1,
    cats:["curiosidade","autoridade"],
    gatilho:"Informação incompleta de propósito cria um loop de tensão que o cérebro precisa resolver. O consumo até o final se torna compulsório.",
    estrutura:[
      "🟦 [TEMA OU SITUAÇÃO] — Algo comum ao público, curioso ou pouco falado",
    ],
    fraseBase:"Existe um detalhe que quase ninguém percebe sobre [TEMA OU SITUAÇÃO].",
    porqueFunciona:"O cérebro humano abomina lacunas de informação. Quando você abre uma sem fechar imediatamente, o consumo do conteúdo se torna quase involuntário.",
    exemplo:[
      "Existe um detalhe que quase ninguém percebe nos Reels que viralizam —",
      "e não é o gancho, não é a edição e não é a trilha sonora.",
      "",
      "É o ritmo da fala.",
      "",
      "Reels virais têm uma cadência específica: frases curtas, pausas estratégicas",
      "e variação de velocidade que mantém o cérebro alerta.",
      "",
      "Quando você fala no mesmo ritmo do início ao fim, o cérebro entra",
      "em modo automático e dispersa. A retenção cai.",
      "",
      "Isso é chamado de padrão de interrupção — ensinado em cursos de oratória de alto nível.",
      "",
      "Quer os 3 padrões de ritmo que uso nos meus Reels? Clique no link da bio.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 109 — O Detalhe que Ninguém Vê' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: criadores de 25 a 40 anos que já sabem o básico mas não crescem]",
      "- Tema relevante e recorrente: [algo do dia a dia do nicho]",
      "- O detalhe pouco falado: [informação real, surpreendente e baseada em evidência]",
      "",
      "CONTEÚDO:",
      "1. 'Existe um detalhe que quase ninguém percebe sobre [TEMA]'",
      "2. Revelação com suspense antes de revelar",
      "3. Explicação do mecanismo real por trás",
      "4. Consequência de ignorar vs aplicar + CTA",
    ],
  },
  {
    num:"110", nome:"A Causa Revelada", emoji:"💡", vol:1,
    cats:["conexao","autoridade","leads"],
    gatilho:"Usa história + suspense. A pessoa pensa: 'Essa pessoa sabe algo que eu não sei.' Ativa curiosidade e credibilidade ao mesmo tempo.",
    estrutura:[
      "🟥 [AÇÃO/DECISÃO/AJUSTE] — Ação, hábito ou ajuste específico",
      "🟦 [PESSOA] — Você, cliente, aluno ou paciente",
      "🟩 [RESULTADO OU TRANSFORMAÇÃO] — Resultado claro e desejável",
    ],
    fraseBase:"Foi por causa disso que [PESSOA] conseguiu [RESULTADO] — e talvez seja isso que está faltando pra você.",
    porqueFunciona:"Mostrar que um resultado específico teve uma causa específica ativa a esperança de que é replicável. A frase 'talvez seja o que falta pra você' cria ponte direta com o avatar.",
    exemplo:[
      "É por causa disso que minha aluna saiu de 500 para 42 mil seguidores",
      "em 4 meses — e pode ser o que está faltando pra você.",
      "",
      "Ela já postava todo dia, já usava hashtags, já fazia Reels. Nada funcionava.",
      "",
      "O problema não era quantidade. Era que ela não tinha posicionamento claro.",
      "Ela falava para todo mundo — e por isso ninguém se sentia representado.",
      "",
      "O que mudou: definir uma dor ultra-específica para um avatar ultra-específico.",
      "Quando começou a falar só para mães que trabalham em casa com filhos pequenos,",
      "o engajamento explodiu.",
      "",
      "Se você quer entender qual é o seu posicionamento ideal,",
      "abri 5 vagas para diagnóstico gratuito. Link na bio.",
    ],
    prompt:[
      "Você é especialista em copywriting para redes sociais.",
      "Crie um post 'Código 110 — A Causa Revelada' para o nicho de [NICHO].",
      "",
      "PÚBLICO-ALVO:",
      "- Perfil: [ex: mulheres de 35 a 50 anos que tentam emagrecer há anos]",
      "- Resultado que desejam: [o objetivo principal]",
      "- O que já tentaram: [soluções convencionais que falharam]",
      "- A causa real: [o insight que realmente muda]",
      "",
      "CONTEÚDO:",
      "1. 'É por causa disso que [pessoa/aluno] conseguiu [resultado]'",
      "2. Contexto: o que a pessoa já tentava sem sucesso",
      "3. O que mudou — a causa real revelada",
      "4. 'E talvez seja isso que está faltando pra você' + CTA",
    ],
  },
  // ── Códigos 111–130 (resumidos para manter tamanho razoável) ────────────────
  { num:"111", nome:"O Segredo que Ninguém Conta", emoji:"🤫", vol:1, cats:["curiosidade","seguidores"], gatilho:"Ativa o gatilho da exclusividade — a ideia de informação privilegiada que ninguém está mostrando aumenta o valor percebido imediatamente.", estrutura:["🟦 Assunto real e verificável que poucos no seu nicho abordam","Variações: afirmação direta OU pergunta retórica"], fraseBase:"Por que ninguém está falando sobre [ASSUNTO]? / [AFIRMAÇÃO] e eu não vejo ninguém falar sobre isso.", porqueFunciona:"O sentimento de exclusividade e de 'finalmente alguém falou' gera urgência para consumir e compartilhar o conteúdo.", exemplo:["Tem muita gente postando conteúdo bom e não tendo resultado —","e eu não sei por que ninguém está explicando o motivo principal.","","O problema não é a qualidade do conteúdo. É a distribuição.","","O Instagram mostra seu conteúdo primeiro para uma pequena amostra","dos seus seguidores. Se essa amostra não interage nas primeiras","2 horas, o algoritmo para de distribuir.","","A solução: entre na plataforma nos primeiros 30 minutos após postar","e interaja com os comentários que chegarem.","","Quer o protocolo de lançamento de post que uso? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 111' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [ex: empreendedores de 25 a 40 anos que buscam vantagem competitiva]","- Assunto que ninguém fala mas deveria: [algo real e verificável]","- Por que esse assunto é subestimado: [a lógica por trás]","","CONTEÚDO:","1. 'Por que ninguém está falando sobre [ASSUNTO]?'","2. Revelar o assunto com lógica e mecanismo real","3. Por que impacta diretamente o público + CTA"] },
  { num:"112", nome:"A Fórmula do Desejo", emoji:"🎯", vol:1, cats:["desejo","vendas"], gatilho:"Vai direto ao ponto conectando desejo do avatar à ação necessária. Clareza é um dos gatilhos mais poderosos em copywriting.", estrutura:["🟥 [DESEJO/RESULTADO/META] — Algo específico do dia a dia do público","🟦 [AÇÃO ESPECÍFICA] — O que o público precisa fazer para ter o resultado"], fraseBase:"Se você quer [DESEJO ESPECÍFICO], você precisa fazer [AÇÃO ESPECÍFICA].", porqueFunciona:"O avatar que está buscando um resultado específico para imediatamente ao ver que alguém sabe exatamente o que ela precisa fazer.", exemplo:["Se você quer ver seu perfil destravando e crescendo de forma consistente,","você precisa postar nesses 3 melhores horários para o seu nicho.","","Para nichos de nutrição e fitness: entre 6h e 8h da manhã.","Para negócios e marketing: 12h–13h e 19h–21h.","Para lifestyle e entretenimento: 20h–22h.","","Mas o mais importante: poste e volte 30 minutos depois","para interagir nos comentários. Isso aquece o post e amplia o alcance.","","Clique no link da bio para o mapa de horários por nicho."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 112' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [ex: jovens de 20 a 35 anos com metas claras mas sem método]","- Desejo principal: [ultra-específico]","- Ação que realmente leva ao resultado: [o que você recomendaria a um amigo]","","CONTEÚDO:","1. 'Se você quer [DESEJO], você precisa [AÇÃO]'","2. Detalhe com lógica e exemplos concretos","3. Resultado esperado + CTA"] },
  { num:"113", nome:"O Poder da Referência", emoji:"⭐", vol:1, cats:["autoridade","seguidores","conexao"], gatilho:"Associar ao conteúdo a uma referência conhecida aumenta credibilidade e amplia alcance — pessoas buscam pelo nome e encontram você.", estrutura:["Figura pública reconhecida pelo público (autoridade, ator, influencer, lugar)","Ação ou comportamento específico e verificável dessa figura","Lição aplicável ao nicho"], fraseBase:"[FIGURA PÚBLICA] fazia/faz isso — e o resultado foi [RESULTADO]. Veja o que isso tem a ver com [NICHO].", porqueFunciona:"O efeito de similaridade faz o público querer replicar o comportamento da referência. Além disso, atrai pessoas que buscam por aquele nome.", exemplo:["Atletas como Messi e Cristiano Ronaldo só performam dessa forma","porque respeitam algo que quem quer crescer não respeita: o descanso.","","Ronaldo dorme 5 sestas de 90 minutos por dia além da noite toda.","Messi tem um protocolo de recuperação que a maioria das equipes considera excessivo.","","A lógica: o treino quebra. O descanso reconstrói. Sem descanso, você se destrói.","","Isso vale para atletas. E vale para empreendedores.","O melhor trabalho não acontece quando você está esgotado.","","Quer estruturar sua rotina para render mais sem trabalhar mais?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 113' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Figura pública que o público reconhece e admira: [verificável]","- Comportamento específico e real que essa pessoa faz/fazia: [não invente]","- Lição que o público pode extrair e aplicar: [prático e acessível]","","CONTEÚDO:","1. Apresente a figura e o comportamento específico","2. Explique a lógica por trás","3. 'E isso vale para...' + conexão com o nicho","4. Versão adaptada para o público + CTA"] },
  { num:"114", nome:"Todo Mundo Está Fazendo", emoji:"🌊", vol:1, cats:["urgencia","desejo"], gatilho:"Ativa FOMO — quem tem o resultado que o avatar quer já está fazendo o que você vai ensinar.", estrutura:["🟥 [RESULTADO DESEJADO] — Positivo ou negativo","🟦 [AÇÃO OU COMPORTAMENTO] — O que o público precisa fazer"], fraseBase:"Todo mundo que [RESULTADO] deveria estar fazendo [AÇÃO].", porqueFunciona:"A sensação de que 'todo mundo' já está fazendo o que você não faz cria pressão para agir imediatamente.", exemplo:["Todo mundo que quer viralizar seus Reels deveria estar fazendo","esse tipo de conteúdo — e você provavelmente não está.","","São os Reels de valor + transformação: mostra um problema,","apresenta a transformação, explica como chegou lá. Sem enrolação.","","Esse formato tem 3 elementos que o algoritmo prioriza:","alta retenção, alto salvamento e alto compartilhamento.","","Quer os 5 formatos de Reel de alta performance? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 114' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [pessoas que veem outros crescendo e não sabem por quê]","- A ação que realmente diferencia quem tem resultado: [prática e verificável]","","CONTEÚDO:","1. 'Todo mundo que quer [RESULTADO] deveria estar fazendo [AÇÃO]'","2. Explicar o que é a ação com detalhes práticos","3. Por que essa ação gera o resultado + CTA"] },
  { num:"115", nome:"A Solução com Prazo", emoji:"⏱️", vol:1, cats:["desejo","vendas","objecao"], gatilho:"A promessa com prazo torna o resultado tangível e imaginável. O cérebro responde muito bem a transformações com tempo definido.", estrutura:["🟥 [SOLUÇÃO OU AÇÃO] — Solução clara","🟦 [TRANSFORMAÇÃO DESEJADA] — Resultado","🟩 [TEMPO OU CONTEXTO REALISTA] — Prazo honesto"], fraseBase:"Com [SOLUÇÃO], você consegue [TRANSFORMAÇÃO] em [PRAZO].", porqueFunciona:"A especificidade do prazo aumenta a credibilidade. Resultado vago não converte. Resultado com data e condições claras, sim.", exemplo:["Com esses 3 formatos de conteúdo você vai sair do 0","e alcançar seus primeiros 1.000 seguidores em 30 dias.","","Formato 1: Reel de erro comum do nicho — gera salvamento.","Formato 2: Antes e depois com processo — gera compartilhamento.","Formato 3: Depoimento de cliente em 15 segundos — gera confiança.","","Quem aplica os 3 formatos em 30 dias de forma consistente","quase sempre passa dos 1.000 seguidores.","","Quer o calendário de posts com os 3 formatos intercalados?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 115' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [pessoas que querem resultado rápido mas realista]","- A solução específica: [algo concreto que você usa]","- A transformação desejada: [o que muda]","- O prazo realista: [não prometa milagre]","","CONTEÚDO:","1. 'Com [SOLUÇÃO], você consegue [TRANSFORMAÇÃO] em [PRAZO]'","2. Para cada elemento: o que é + por que funciona","3. Validação com resultado real + CTA"] },
  { num:"116", nome:"Fala Direta com a Dor", emoji:"🎯", vol:1, cats:["identificacao","leads"], gatilho:"Fala diretamente com quem está sofrendo agora. A especificidade da dor cria identificação imediata e baixa resistência.", estrutura:["🟥 [DOR OU PROBLEMA ATUAL] — Dor clara e específica","🟦 [AÇÃO OU SOLUÇÃO] — Ação direta","🟩 [ALÍVIO OU RESULTADO] — Benefício"], fraseBase:"Se você está [DOR ATUAL], faça [AÇÃO] para conseguir [RESULTADO].", porqueFunciona:"'Isso é exatamente comigo' — quando a pessoa sente isso, a resistência cai e ela está aberta para a solução.", exemplo:["Se você não consegue fazer as pessoas pararem para assistir","seus vídeos até o final, esses 3 ajustes no roteiro vão mudar isso.","","Ajuste 1: Troque a apresentação pelo problema nos primeiros 3 segundos.","Ajuste 2: Use a técnica do gancho duplo — anuncie o que vai revelar no meio.","Ajuste 3: Termine com uma pergunta, não com 'é isso!'","","Quer o roteiro completo com os 3 ajustes aplicados? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 116' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [quem está sofrendo agora com esse problema específico]","- Dor atual e específica: [não genérica]","- Solução direta: [o que recomendaria para essa dor]","","CONTEÚDO:","1. 'Se você está [DOR], faça [AÇÃO] para [RESULTADO]'","2. Para cada solução: o que fazer + por que alivia","3. CTA"] },
  { num:"117", nome:"Verdade que Dói", emoji:"⚡", vol:1, cats:["identificacao","urgencia"], gatilho:"Ser direto e específico sem suavizar a consequência gera impacto. A pessoa pensa 'eu faço isso' e busca a solução.", estrutura:["🟥 [AÇÃO ERRADA OU COMUM] — Comportamento específico do público","🟦 [CONSEQUÊNCIA REAL] — Concreta","🟩 [RESULTADO QUE SE PERDE] — O que deixam de ter"], fraseBase:"Quando você faz [AÇÃO], você acaba com [CONSEQUÊNCIA] e se afasta de [RESULTADO].", porqueFunciona:"A aversão à perda em estado puro. Quando a pessoa percebe o custo de um comportamento atual, a motivação para mudar aparece.", exemplo:["Quando você responde seus clientes de forma genérica no WhatsApp,","essas 3 coisas acontecem com seu negócio — e a terceira é fatal.","","Primeira: o cliente sente que é só mais um número.","Quando sente isso, compara preço — e vai para o concorrente mais barato.","","Segunda: você perde a chance de identificar o problema real.","","E a terceira — a mais fatal: você não gera indicações.","Clientes que se sentem especiais indicam. Os demais, não voltam nem recomendam.","","A solução é um script de atendimento com 3 perguntas. Quer o script? Clique no link."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 117' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Ação comum que o público faz achando que está certo","- Consequências reais (da menos grave à mais grave)","- Tom: [direto, sério — mas empático, não acusatório]","","CONTEÚDO:","1. 'Quando você faz [AÇÃO], essas coisas podem acontecer'","2. Da 1ª à última, em ordem crescente de gravidade","3. A última como 'a mais fatal' + solução + CTA"] },
  { num:"118", nome:"A Culpa Está no Lugar Errado", emoji:"🔄", vol:1, cats:["objecao","conexao"], gatilho:"Quebra uma crença limitante e gera esperança imediata. Ao tirar o peso das costas do avatar, você libera emocionalmente a pessoa para agir.", estrutura:["🟥 [CULPA OU CRENÇA LIMITANTE] — Crença comum","🟦 [O QUE ESTÁ FALTANDO] — Falta de conhecimento ou ajuste","🟩 [RESULTADO] — O que elas podem ter com a coisa certa"], fraseBase:"Não é [CRENÇA LIMITANTE], é [O QUE FALTA] que impede você de [RESULTADO].", porqueFunciona:"Quando a pessoa acredita que o problema é ela mesma, nenhuma solução funciona. Reposicionar a causa como externa abre o canal para a oferta.", exemplo:["Não é você que não sabe aparecer na câmera.","É a falta de um aquecimento pré-gravação que faz você travar.","","Locutores e apresentadores têm uma coisa em comum: se preparam antes.","Não para decorar — para soltar o corpo.","","Existem 3 exercícios de 5 minutos que eliminam o travamento em 80% dos casos.","","Você não tem problema com câmera.","Você ainda não teve acesso ao protocolo certo.","","Me manda CÂMERA no direct que te envio os exercícios."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 118' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [pessoas que se culpam por não ter resultado mesmo se esforçando]","- Crença limitante mais comum: [o que acreditam ser o problema delas]","- O que realmente falta: [informação, método ou ajuste específico]","","CONTEÚDO:","1. 'Não é [CRENÇA]. É a falta de [O QUE FALTA]'","2. Valide a dificuldade (não minimize)","3. Com a coisa certa, o resultado vem + CTA"] },
  { num:"119", nome:"O Efeito Boomerang", emoji:"🪃", vol:1, cats:["curiosidade","engajamento"], gatilho:"Revela que uma ação que ajuda gera o efeito oposto. Isso cria um momento 'eureka' que gera compartilhamento imediato.", estrutura:["🟥 [AÇÃO COMUM] — Hábito que o público pratica e que gera efeito oposto","🟦 [CONSEQUÊNCIA NEGATIVA] — O que pode acontecer","🟩 [RESULTADO DESEJADO] — O quanto afasta dos objetivos"], fraseBase:"Toda vez que você faz [AÇÃO], você acaba com [CONSEQUÊNCIA] e se afasta de [RESULTADO].", porqueFunciona:"O choque de perceber que algo que 'ajuda' na verdade atrapalha gera urgência de compartilhar — 'você precisa saber disso!'", exemplo:["Toda vez que você lava o rosto com o sabonete de banho,","você acaba ficando com a pele mais ressecada","e se afasta de ter uma pele bem hidratada.","","O pH do sabonete de banho é para o corpo — pele mais espessa.","O rosto tem pH mais delicado. Sabonete errado quebra a barreira natural","e faz as glândulas produzir mais óleo para compensar.","","Sabonete facial existe por isso. Não é marketing — é química.","","Quer a ordem certa dos produtos para uma skincare que funciona?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 119' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Ação que cometem achando que ajuda","- Consequência oposta que gera (o efeito boomerang)","- Mecanismo real por trás (ciência, lógica)","","CONTEÚDO:","1. 'Toda vez que você [AÇÃO], você acaba com [CONSEQUÊNCIA]'","2. Explique o mecanismo real","3. A solução ou alternativa correta + CTA"] },
  { num:"120", nome:"A Decisão ou a Consequência", emoji:"⚖️", vol:1, cats:["urgencia","vendas"], gatilho:"Cria um ponto de tensão e induz decisão clara. O avatar percebe que continuar como está tem um custo real.", estrutura:["🟥 [RESULTADO] — O que quer alcançar ou evitar","🟦 [AÇÃO NECESSÁRIA] — O que precisa fazer agora","🟩 [CONSEQUÊNCIA NEGATIVA] — O custo de não agir"], fraseBase:"Se você quer [RESULTADO], precisa [AÇÃO], caso contrário [CONSEQUÊNCIA].", porqueFunciona:"A estrutura 'caso contrário' é um gatilho de urgência que acelera a tomada de decisão — agir ou continuar pagando o custo.", exemplo:["Se você não quer ver seu negócio perdendo alcance em 2025,","vai precisar começar a usar essa sequência de conteúdo,","caso contrário pode dizer adeus ao engajamento orgânico.","","O algoritmo mudou. Prioriza agora: envio por DM, salvamento e comentário.","","Quem cria conteúdo que ativa esses 3 comportamentos está crescendo.","Quem não sabe está sendo penalizado silenciosamente.","","Gravei uma aula mostrando como criar conteúdo que ativa os 3 em 60 segundos.","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 120' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [pessoas que adiam decisões importantes]","- Resultado que desejam ou querem evitar","- Ação necessária agora","- Consequência de não agir (real e específica)","","CONTEÚDO:","1. 'Se você quer/não quer [RESULTADO], vai precisar [AÇÃO], caso contrário [CONSEQUÊNCIA]'","2. Contexto que justifica a urgência","3. O que muda para quem age agora + CTA"] },
  { num:"121", nome:"A Proibição Estratégica", emoji:"🚫", vol:1, cats:["curiosidade","engajamento"], gatilho:"Efeito psicológico da proibição. Quando você diz 'não faça', o cérebro automaticamente pensa naquilo e quer saber por quê.", estrutura:["🟥 [AÇÃO COMUM] — Algo normalizado que o público faz","🟦 [RESULTADO QUE QUER ALCANÇAR] — O objetivo do avatar"], fraseBase:"Não faça [AÇÃO] se você não quer [CONSEQUÊNCIA] / se você quer [RESULTADO].", porqueFunciona:"A proibição cria desejo e curiosidade. A pessoa lê porque quer saber o que não deve fazer — e por quê.", exemplo:["Não poste seus Reels sem essas 3 coisas","se você não quer ver ele travado nos 300 views.","","Coisa 1: Gancho nos primeiros 2 segundos.","Coisa 2: Legenda com a palavra-chave do conteúdo.","Coisa 3: CTA antes do final do vídeo.","","A maioria das pessoas não chega ao último segundo.","O CTA precisa aparecer quando você ainda tem a atenção.","","Quer o checklist completo de pré-postagem? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 121' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Ação comum que cometem","- Resultado que perdem por causa disso","- Tom: [urgente, direto, educativo]","","CONTEÚDO:","1. 'Não faça [AÇÃO] se você não quer [CONSEQUÊNCIA]'","2. Para cada elemento (3): o que é + por que é problema + como corrigir","3. Resultado ao evitar os erros + CTA"] },
  { num:"122", nome:"O Aviso Antes de Agir", emoji:"⚠️", vol:1, cats:["urgencia","leads"], gatilho:"Cria uma barreira psicológica — a pessoa não deve agir antes de ver o conteúdo. Funciona muito bem com públicos prestes a tomar uma decisão importante.", estrutura:["🟥 [AÇÃO RELEVANTE] — Ação que o avatar está prestes a tomar","🟦 [INFORMAÇÃO/AJUSTE ESSENCIAL] — O que ele precisa saber antes"], fraseBase:"Não [AÇÃO IMPORTANTE] sem antes [VER/SABER/AJUSTAR ALGO].", porqueFunciona:"O medo de errar é um gatilho poderoso. Quando você cria a sensação de que agir sem o conteúdo é arriscado, o consumo se torna urgente.", exemplo:["Não faça seu próximo Reel sem antes saber desse detalhe","que pode viralizar nas primeiras horas.","","É o fator 'janela de ouro': o Instagram analisa seu Reel nas primeiras 2 horas.","Se a retenção for alta e houver interações, o alcance amplia.","Se não — enterra.","","O que funciona: postar no horário de pico da sua audiência","e ficar ativo nos comentários pelos próximos 30 minutos.","","Quer o protocolo de lançamento com timing e checklist? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 122' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Pessoas prestes a tomar uma ação importante","- Informação que não podem ignorar antes","- Consequência de não saber","","CONTEÚDO:","1. 'Não [AÇÃO] sem antes saber [INFORMAÇÃO]'","2. Apresente a informação crítica com lógica","3. O que acontece com quem ignora vs aplica + CTA"] },
  { num:"123", nome:"1 Problema, 1 Solução", emoji:"💊", vol:1, cats:["autoridade","engajamento","leads"], gatilho:"Direto e aplicável. Cada combo é um salvamento potencial — as pessoas guardam para usar quando o problema aparecer.", estrutura:["🟥 [PROBLEMA ESPECÍFICO] — Problema do avatar","🟦 [SOLUÇÃO DIRETA] — Ação simples e objetiva","→ Repita de 3 a 5 vezes no mesmo tema"], fraseBase:"[PROBLEMA] × [SOLUÇÃO DIRETA].", porqueFunciona:"Conteúdo de problema + solução é o mais salvo da internet. Funciona como referência prática — as pessoas usam como manual.", exemplo:["3 problemas de quem quer crescer no Instagram com as soluções reais.","","Reels travados nos 300 views × Poste Reels de 7 segundos por 10 dias.","Conteúdo curto tem maior retenção completa — o algoritmo prioriza.","","Engajamento que some × Varie os formatos.","Alterne Reel de dica + história + antes/depois.","","Seguidores que não compram × Crie 3 posts de valor para cada 1 de oferta.","Audiência aquecida compra. Fria ignora.","","Quer a lista com os 10 problemas mais comuns e soluções?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 123' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Os 3 a 5 problemas mais comuns (pesquise em comentários e DMs)","- A solução real para cada um (prática, aplicável hoje)","","CONTEÚDO:","1. 'X problemas de [PERFIL] com as soluções reais de cada um'","2. Para cada combo: Problema × Solução + breve explicação","3. CTA para material mais completo"] },
  { num:"124", nome:"Antes e Depois Real", emoji:"🔀", vol:1, cats:["conexao","desejo","vendas"], gatilho:"Contraste visual de transformação — o avatar se vê no ponto de partida e quer o destino. A esperança de que é possível é o gatilho central.", estrutura:["Antes de [AÇÃO/MUDANÇA], [PESSOA] estava assim: [SITUAÇÃO DIFÍCIL]","Depois de [AÇÃO/MUDANÇA], [RESULTADO ESPECÍFICO]"], fraseBase:"Antes de [MUDANÇA], eu/meu aluno estava assim. Depois de [MUDANÇA], [RESULTADO].", porqueFunciona:"Mostrar uma transformação real cria imagem mental imediata. O avatar se visualiza no mesmo processo — especialmente quando o ponto de partida é familiar.", exemplo:["Antes da minha aluna usar ganchos, seus vídeos tinham em média 280 views.","Depois que aplicou os 3 modelos que ensinei, chegou a 47.000 views no mesmo mês.","","O que mudou entre os dois momentos não foi a qualidade do conteúdo.","O conteúdo dela sempre foi bom.","","Um gancho não melhora o conteúdo. Ele garante que as pessoas","pausem o scroll o tempo suficiente para o conteúdo ser visto.","","É a diferença entre produto incrível em vitrine escura vs holofote apontado.","","Quer os 7 modelos de gancho? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 124' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [pessoas que tentam há muito sem ver resultado]","- O ponto de partida (antes): [situação com que o público se identifica]","- A mudança que gerou a transformação: [específica]","- O resultado depois: [dados ou descrição concreta]","","CONTEÚDO:","1. 'Antes de [AÇÃO], [PESSOA] estava assim: [situação]'","2. 'Depois de [AÇÃO], o resultado foi: [resultado específico]'","3. O que mudou (o mecanismo) + CTA"] },
  { num:"125", nome:"O Erro que Custa Caro", emoji:"💸", vol:1, cats:["urgencia","identificacao"], gatilho:"O custo de continuar errando é maior do que mudar agora. A ideia de perda invisível que já acontece ativa aversão à perda de forma poderosa.", estrutura:["[CONSEQUÊNCIA] — Tempo, dinheiro, seguidores, oportunidades — seja específico","O erro silencioso que a pessoa comete sem perceber"], fraseBase:"O erro que está te custando [CONSEQUÊNCIA] sem você perceber.", porqueFunciona:"A ideia de que algo já está acontecendo (custo acumulado) gera urgência maior do que uma ameaça futura.", exemplo:["O erro que está te custando seguidores todos os dias sem você perceber.","","É o erro do perfil genérico.","","Quando alguém nova chega no seu perfil, tem menos de 3 segundos para decidir se segue.","Nesse tempo, ela olha: foto de perfil, nome e bio.","","Se sua bio não deixa claro quem você ajuda e com o quê,","a pessoa vai embora. E você perdeu um seguidor que poderia virar cliente.","","Isso acontece centenas de vezes por mês em perfis com bom conteúdo mas bio fraca.","","Uma bio otimizada pode dobrar sua taxa de conversão sem mudar o conteúdo.","","Quer que eu revise sua bio? Me manda BIO no direct."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 125' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- O erro silencioso que cometem","- O custo real (tempo, dinheiro, seguidores...)","- Por que é invisível","","CONTEÚDO:","1. 'O erro que está te custando [CUSTO] sem você perceber'","2. Revele o erro com detalhes específicos","3. Por que o custo é real e como se acumula","4. A solução + CTA"] },
  { num:"126", nome:"O Divisor de Águas", emoji:"🌊", vol:1, cats:["conexao","autoridade"], gatilho:"Não foi quantidade — foi clareza que gerou a mudança. Isso gera identificação profunda com quem trabalha muito sem resultado.", estrutura:["🟥 [AJUSTE/DECISÃO/PERCEPÇÃO] — Algo específico feito por você ou cliente que causou a virada","(pode ser mentalidade, estratégia, hábito, erro corrigido)"], fraseBase:"Tudo mudou quando eu [AJUSTE/DECISÃO/PERCEPÇÃO ESPECÍFICA].", porqueFunciona:"A simplicidade do insight gera esperança. Se foi uma coisa que mudou tudo, então é replicável. E o avatar quer saber qual é essa coisa.", exemplo:["Tudo mudou quando eu parei de focar em quantidade de posts","e comecei a focar em retenção de cada post.","","Postava todos os dias. Crescia devagar. Não entendia por quê.","","Até analisar os dados: meus posts com maior alcance não eram os mais frequentes.","Eram os que as pessoas assistiam até o final.","","O algoritmo não distribui quem posta mais. Distribui quem retém mais.","","Passei a criar cada post como se fosse o único do mês.","Resultado: alcance 3x maior com metade das postagens.","","Quer entender como analisar a retenção do seu perfil? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 126' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Pessoas que trabalham muito mas não veem crescimento","- O insight ou ajuste que mudou tudo (específico, não genérico)","- O resultado depois da mudança (concreto)","","CONTEÚDO:","1. 'Tudo mudou quando eu [AJUSTE ESPECÍFICO]'","2. Contexto de como era antes (identificação)","3. O que gerou o insight","4. O que mudou na prática + CTA"] },
  { num:"127", nome:"O Que Ninguém te Avisou", emoji:"📢", vol:1, cats:["curiosidade","autoridade"], gatilho:"Ativa o gatilho da exclusividade. A pessoa sente que está acessando informação privilegiada que deveria ter recebido antes.", estrutura:["🟥 [TEMA/SITUAÇÃO] — Tema relevante para o público","🟦 [VERDADE IMPACTANTE] — Algo contraintuitivo, real e verificável"], fraseBase:"O que ninguém te avisou sobre [TEMA] é que [VERDADE IMPACTANTE].", porqueFunciona:"O ressentimento positivo ('por que ninguém me disse isso antes?') gera compartilhamento automático — a pessoa quer que os outros saibam.", exemplo:["O que ninguém te avisou sobre crescer no Instagram","é que viralizar não garante vendas.","","Muita gente já teve um vídeo com 500 mil views e vendeu zero.","","É porque viralização sem posicionamento traz curiosos — não compradores.","Quando um vídeo viraliza, ele atinge muito além do seu público ideal.","A maioria que assiste viu pelo algoritmo, curtiu, foi embora — e nunca vai comprar.","","Um vídeo com 10 mil views para o avatar certo vende mais","do que um viral com 1 milhão para o público errado.","","Quer entender como criar conteúdo que alcança e vende? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 127' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Tema relevante e comum","- Verdade impactante que poucos revelam (contraintuitiva e verificável)","- Por que nunca é dita (contra o discurso popular)","","CONTEÚDO:","1. 'O que ninguém te avisou sobre [TEMA] é que [VERDADE]'","2. Contexto: por que a maioria não percebe","3. Explique com lógica e evidência","4. Implicação prática + CTA"] },


function Modal({ codigo, onClose }) {
  const ref = useRef(null);
  const cat = categorias.find(c => c.id === codigo.cats[0]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={M.overlay}>
      <div ref={ref} style={M.modal}>
        <div style={{ ...M.mHeader, borderBottom: `3px solid ${cat?.cor || "#C8973A"}` }}>
          <div style={M.mHeaderLeft}>
            <span style={M.mEmoji}>{codigo.emoji}</span>
            <div>
              <div style={M.mNum}>CÓDIGO {codigo.num} · VOL. {codigo.vol}</div>
              <div style={M.mNome}>{codigo.nome}</div>
            </div>
          </div>
          <button style={M.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={M.mBody}>
          <div style={M.tagRow}>
            {codigo.cats.map(catId => {
              const c = categorias.find(x => x.id === catId);
              return (
                <span key={catId} style={{ ...M.tag, backgroundColor: c?.cor + "22", color: c?.cor, borderColor: c?.cor + "55" }}>
                  {c?.emoji} {c?.label}
                </span>
              );
            })}
          </div>
          <div style={M.section}>
            <div style={M.sectionTitle}>⚡ POR QUE FUNCIONA</div>
            <div style={{ ...M.box, backgroundColor: "#1C1400", borderLeft: `3px solid #B45309` }}>
              <p style={{ margin: 0, color: "#FDE68A", fontSize: 14, lineHeight: 1.7 }}>{codigo.gatilho}</p>
            </div>
          </div>
          <div style={M.section}>
            <div style={M.sectionTitle}>📐 ESTRUTURA GUIADA</div>
            <div style={{ ...M.box, backgroundColor: "#0D1F2D", borderLeft: `3px solid #0369A1` }}>
              {codigo.estrutura.map((l, i) => (
                <div key={i} style={{ marginBottom: 6, color: "#BAE6FD", fontSize: 14, lineHeight: 1.6 }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={M.section}>
            <div style={M.sectionTitle}>✏️ FRASE BASE</div>
            <div style={{ ...M.box, backgroundColor: "#0A1628", borderLeft: `3px solid ${cat?.cor || "#C8973A"}` }}>
              <p style={{ margin: 0, color: "#E2E8F0", fontSize: 14, lineHeight: 1.7, fontFamily: "monospace" }}>{codigo.fraseBase}</p>
            </div>
          </div>
          <div style={M.section}>
            <div style={M.sectionTitle}>🌍 EXEMPLO COMPLETO</div>
            <div style={{ ...M.box, backgroundColor: "#0A1F12", borderLeft: `3px solid #15803D` }}>
              {codigo.exemplo.map((l, i) => (
                <div key={i} style={{ color: l === "" ? "transparent" : "#BBF7D0", fontSize: 13, lineHeight: 1.7, marginBottom: l === "" ? 6 : 2 }}>
                  {l === "" ? "​" : l}
                </div>
              ))}
            </div>
          </div>
          <div style={M.section}>
            <div style={M.sectionTitle}>🤖 PROMPT PRONTO PARA IA</div>
            <div style={{ ...M.box, backgroundColor: "#0A0A1A" }}>
              {codigo.prompt.map((l, i) => (
                <div key={i} style={{ color: l.startsWith("-") ? "#94A3B8" : l === "" ? "transparent" : l.endsWith(":") ? "#C8973A" : "#E2E8F0", fontSize: 12, lineHeight: 1.7, marginBottom: l === "" ? 4 : 1, fontFamily: "monospace" }}>
                  {l === "" ? "​" : l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState("boasvindas");
  const [catAtiva, setCatAtiva] = useState("todos");
  const [busca, setBusca] = useState("");
  const [volFiltro, setVolFiltro] = useState("todos");
  const [modalCodigo, setModalCodigo] = useState(null);
  const [animando, setAnimando] = useState(false);
  const [faqAberto, setFaqAberto] = useState(null);

  const filtrados = codigos.filter(c => {
    const matchCat = catAtiva === "todos" || c.cats.includes(catAtiva);
    const matchVol = volFiltro === "todos" || String(c.vol) === volFiltro;
    const matchBusca = busca === "" ||
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.num.includes(busca) ||
      c.gatilho.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchVol && matchBusca;
  });

  const catAtual = categorias.find(c => c.id === catAtiva);

  const mudarCat = (id) => {
    setAnimando(true);
    setTimeout(() => { setCatAtiva(id); setAnimando(false); }, 150);
  };

  const contagemPorCat = (catId) =>
    catId === "todos" ? codigos.length : codigos.filter(c => c.cats.includes(catId)).length;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setModalCodigo(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={D.root}>
      {modalCodigo && <Modal codigo={modalCodigo} onClose={() => setModalCodigo(null)} />}

      {/* HEADER */}
      <header style={D.header}>
        <div style={D.headerInner}>
          <div style={D.logo}>
            <span style={{ fontSize: 26 }}>🔐</span>
            <div>
              <div style={D.logoTitle}>CÓDIGOS SECRETOS DA ATENÇÃO</div>
              <div style={D.logoSub}>61 estruturas · 2 volumes · organizadas por objetivo</div>
            </div>
          </div>
          <nav style={D.nav}>
            {[
              { id: "boasvindas", label: "✦ Início" },
              { id: "codigos",    label: "🔐 Códigos" },
              { id: "palavras",   label: "🧩 Palavras-Chave" },
              { id: "faq",        label: "❓ Dúvidas" },
            ].map(aba => (
              <button key={aba.id} onClick={() => setAbaAtiva(aba.id)} style={{
                ...D.navBtn,
                ...(abaAtiva === aba.id ? D.navBtnActive : {}),
              }}>{aba.label}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main style={D.main}>

        {/* ===== BOAS VINDAS ===== */}
        {abaAtiva === "boasvindas" && (
          <div>
            <div style={D.hero}>
              <div style={D.heroBadge}>✦ SUA FÁBRICA DE CONTEÚDO VIRAL</div>
              <h1 style={D.heroTitle}>
                Ganchos que <span style={{ color: "#C8973A" }}>travam o scroll.</span><br />
                Ideias que <span style={{ color: "#C8973A" }}>geram resultado.</span>
              </h1>
              <p style={D.heroDesc}>
                61 códigos prontos para você adaptar ao seu nicho e criar conteúdo que chama atenção nos 3 primeiros segundos.
              </p>
              <button onClick={() => setAbaAtiva("codigos")} style={D.heroCTA}>
                Acessar os Códigos →
              </button>
            </div>

            <div style={D.quickGrid}>
              {[
                { emoji: "🔐", num: "61", label: "Códigos prontos" },
                { emoji: "🎯", num: "12", label: "Categorias" },
                { emoji: "⚡", num: "3s", label: "Para prender atenção" },
                { emoji: "🌍", num: "∞", label: "Nichos compatíveis" },
              ].map((item, i) => (
                <div key={i} style={D.quickCard}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#C8973A", letterSpacing: -1 }}>{item.num}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div style={D.section}>
              <h2 style={D.sectionTitle}>👤 Antes de usar os Códigos</h2>
              <p style={D.sectionDesc}>Para criar o conteúdo certo para o público certo, responda essas perguntas. Escreva pelo menos 5 pontos em cada:</p>
              <div style={D.perguntasGrid}>
                {publicoPerguntas.map((p, i) => (
                  <div key={i} style={D.perguntaItem}>
                    <span style={{ color: "#C8973A", fontWeight: 700, fontSize: 12, minWidth: 24 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ color: "#ccc", fontSize: 13, lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
              <a href="https://docs.google.com/document/d/1zMCUgzp6NxHsADUiIUckBjaZk_G9XcOtMtIZx9BN-PA/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={D.promptLink}>
                📋 Abrir Prompt para Mapear seu Público Alvo →
              </a>
            </div>

            <div style={D.section}>
              <h2 style={D.sectionTitle}>⚙️ Como usar os Códigos</h2>
              <div style={D.stepsGrid}>
                {[
                  { n: "01", t: "Escolha um Código", d: "Navegue pelos 61 códigos ou filtre por categoria e objetivo do seu post." },
                  { n: "02", t: "Adapte ao seu nicho", d: "Use a estrutura e os exemplos para criar sua versão personalizada." },
                  { n: "03", t: "Use o Prompt", d: "Cada código tem prompts prontos para você gerar conteúdo com IA em segundos." },
                  { n: "04", t: "Publique e repita", d: "Com 61 códigos você tem conteúdo para meses. Combine e explore infinitas variações." },
                ].map((step, i) => (
                  <div key={i} style={D.stepCard}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "#C8973A20", letterSpacing: -2, marginBottom: 8 }}>{step.n}</div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{step.t}</h3>
                    <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== CÓDIGOS ===== */}
        {abaAtiva === "codigos" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: 0, flex: 1 }}>🔐 Códigos Secretos</h2>
              <input type="text" placeholder="Buscar por nome, número ou gatilho..." value={busca} onChange={e => setBusca(e.target.value)}
                style={{ background: "#111", border: "1px solid #2a2a2a", color: "#fff", padding: "10px 16px", borderRadius: 10, fontSize: 14, outline: "none", minWidth: 240 }} />
            </div>

            {/* Filtros */}
            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              {categorias.map(cat => {
                const ativa = catAtiva === cat.id;
                return (
                  <button key={cat.id} onClick={() => mudarCat(cat.id)} style={{
                    background: ativa ? cat.cor + "18" : "#111",
                    border: `1px solid ${ativa ? cat.cor + "55" : "#2a2a2a"}`,
                    color: ativa ? cat.cor : "#666",
                    padding: "6px 12px", borderRadius: 100, cursor: "pointer", fontSize: 12,
                    fontWeight: ativa ? 700 : 500, transition: "all .2s", whiteSpace: "nowrap",
                  }}>
                    {cat.emoji} {cat.label}
                    <span style={{ marginLeft: 6, fontSize: 10, opacity: .7 }}>{contagemPorCat(cat.id)}</span>
                  </button>
                );
              })}
            </div>

            {/* Vol filtro */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[["todos","Todos os volumes"],["1","Vol. 1 · 101–130"],["2","Vol. 2 · 131–161"]].map(([v, label]) => (
                <button key={v} onClick={() => setVolFiltro(v)} style={{
                  background: volFiltro === v ? "#C8973A18" : "transparent",
                  border: `1px solid ${volFiltro === v ? "#C8973A44" : "#2a2a2a"}`,
                  color: volFiltro === v ? "#C8973A" : "#555",
                  padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, transition: "all .2s",
                }}>{label}</button>
              ))}
            </div>

            <div style={{ color: "#444", fontSize: 12, marginBottom: 20, letterSpacing: 1 }}>
              {filtrados.length} código{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}
            </div>

            <div style={{ ...D.grid, opacity: animando ? 0 : 1, transition: "opacity .15s" }}>
              {filtrados.length === 0 ? (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 40px", color: "#475569" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <div>Nenhum código encontrado</div>
                </div>
              ) : filtrados.map(c => {
                const catInfo = categorias.find(x => x.id === c.cats[0]);
                return (
                  <div key={c.num} style={D.card} onClick={() => setModalCodigo(c)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = catInfo?.cor || "#C8973A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 18 }}>{c.emoji}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#C8973A", fontFamily: "monospace" }}>{c.num}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", backgroundColor: "#1e293b", borderRadius: 4, padding: "2px 6px" }}>Vol. {c.vol}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 10, lineHeight: 1.3 }}>{c.nome}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                      {c.cats.map(catId => {
                        const cat = categorias.find(x => x.id === catId);
                        return (
                          <span key={catId} style={{ fontSize: 10, fontWeight: 600, borderRadius: 4, padding: "2px 7px", border: "1px solid", backgroundColor: cat?.cor + "22", color: cat?.cor, borderColor: cat?.cor + "44" }}>
                            {cat?.emoji} {cat?.label}
                          </span>
                        );
                      })}
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, marginBottom: 12 }}>
                      {c.gatilho.length > 100 ? c.gatilho.slice(0, 100) + "..." : c.gatilho}
                    </div>
                    <div style={{ fontSize: 11, color: "#C8973A", textAlign: "right", borderTop: "1px solid #1e293b", paddingTop: 8, marginTop: "auto" }}>
                      Clique para abrir o roteiro completo →
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== PALAVRAS-CHAVE ===== */}
        {abaAtiva === "palavras" && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>🧩 Palavras-Chave</h2>
            <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>Use essas palavras para potencializar seus Códigos e criar ganchos ainda mais poderosos.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {[
                { titulo: "🟢 Para iniciar os ganchos", cor: "#15803D", items: palavrasChave.iniciar },
                { titulo: "🟢 Verbos", cor: "#15803D", items: palavrasChave.verbos },
                { titulo: "🟢 Termos", cor: "#15803D", items: palavrasChave.termos },
                { titulo: "🔵 Frase de Interligação", cor: "#0369A1", items: palavrasChave.interligacao },
                { titulo: "🩷 Frase Final", cor: "#DB2777", items: palavrasChave.final },
              ].map((grupo, i) => (
                <div key={i} style={{ background: "#0e0e0e", borderRadius: 16, padding: "24px", borderTop: `3px solid ${grupo.cor}` }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: grupo.cor, letterSpacing: .5 }}>{grupo.titulo}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {grupo.items.map((p, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #161616", fontSize: 13, color: "#ccc" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, minWidth: 22, color: grupo.cor, letterSpacing: 1 }}>{String(j + 1).padStart(2, "0")}</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== FAQ ===== */}
        {abaAtiva === "faq" && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>❓ Perguntas Frequentes</h2>
            <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>Tire suas dúvidas sobre os Códigos Secretos da Atenção.</p>
            <div style={{ maxWidth: 700 }}>
              {faq.map((item, i) => (
                <div key={i} onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                  style={{ background: "#0e0e0e", border: `1px solid ${faqAberto === i ? "#C8973A33" : "#1e293b"}`, borderRadius: 14, marginBottom: 12, cursor: "pointer", overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", gap: 16, fontWeight: 600, fontSize: 14, color: "#e0e0e0" }}>
                    <span>{item.q}</span>
                    <span style={{ color: "#C8973A", fontSize: 22, fontWeight: 300, transition: "transform .3s", transform: faqAberto === i ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
                  </div>
                  {faqAberto === i && (
                    <div style={{ padding: "0 24px 20px", color: "#888", fontSize: 13, lineHeight: 1.8, borderTop: "1px solid #1a1a1a" }}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer style={D.footer}>
        Direção Estratégica | Lorena Lotério © 2026 · Todos os direitos reservados
      </footer>
    </div>
  );
}

const D = {
  root: { minHeight: "100vh", background: "#080808", color: "#e8e8e8", fontFamily: "'DM Sans','Segoe UI',sans-serif" },
  header: { position: "sticky", top: 0, zIndex: 100, background: "#0a0a0aee", backdropFilter: "blur(20px)", borderBottom: "1px solid #1e1e1e" },
  headerInner: { maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" },
  logo: { display: "flex", alignItems: "center", gap: 12, marginRight: "auto" },
  logoTitle: { fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#C8973A" },
  logoSub: { fontSize: 10, letterSpacing: 2, color: "#555", marginTop: 2 },
  nav: { display: "flex", gap: 4, flexWrap: "wrap" },
  navBtn: { background: "transparent", border: "1px solid transparent", color: "#777", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all .2s" },
  navBtnActive: { background: "#C8973A18", color: "#C8973A", borderColor: "#C8973A33" },
  main: { maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" },
  hero: { textAlign: "center", padding: "60px 20px 80px", maxWidth: 700, margin: "0 auto" },
  heroBadge: { display: "inline-block", background: "#C8973A18", border: "1px solid #C8973A33", color: "#C8973A", padding: "6px 16px", borderRadius: 100, fontSize: 11, letterSpacing: 3, marginBottom: 24, fontWeight: 600 },
  heroTitle: { fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20, color: "#fff" },
  heroDesc: { fontSize: 16, color: "#999", lineHeight: 1.7, marginBottom: 36 },
  heroCTA: { background: "#C8973A", color: "#000", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: .5 },
  quickGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 60 },
  quickCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "24px 16px", textAlign: "center" },
  section: { background: "#0e0e0e", border: "1px solid #1e1e1e", borderRadius: 20, padding: "36px", marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 12px" },
  sectionDesc: { color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 24 },
  perguntasGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, marginBottom: 24 },
  perguntaItem: { display: "flex", alignItems: "flex-start", gap: 10, background: "#161616", borderRadius: 10, padding: "12px 14px" },
  promptLink: { display: "inline-flex", alignItems: "center", gap: 8, color: "#C8973A", fontSize: 13, fontWeight: 600, textDecoration: "none", background: "#C8973A10", border: "1px solid #C8973A30", padding: "10px 20px", borderRadius: 10 },
  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
  stepCard: { background: "#161616", borderRadius: 14, padding: "24px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 12 },
  card: { backgroundColor: "#0A1120", border: "1px solid #1e293b", borderRadius: 12, padding: "16px", cursor: "pointer", transition: "border-color 0.15s, transform 0.15s", display: "flex", flexDirection: "column" },
  footer: { borderTop: "1px solid #141414", padding: "24px", textAlign: "center", color: "#333", fontSize: 11, letterSpacing: 2 },
};

const M = {
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 16px", overflowY: "auto" },
  modal: { backgroundColor: "#0D1627", border: "1px solid #1e293b", borderRadius: 16, width: "100%", maxWidth: 720, boxShadow: "0 24px 80px rgba(0,0,0,0.6)" },
  mHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px" },
  mHeaderLeft: { display: "flex", alignItems: "center", gap: 12 },
  mEmoji: { fontSize: 32 },
  mNum: { fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#C8973A", marginBottom: 2 },
  mNome: { fontSize: 20, fontWeight: 800, color: "#f1f5f9" },
  closeBtn: { background: "none", border: "1px solid #334155", borderRadius: 8, color: "#94a3b8", cursor: "pointer", fontSize: 16, padding: "6px 10px", flexShrink: 0 },
  mBody: { padding: "0 24px 28px" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 },
  tag: { fontSize: 11, fontWeight: 600, borderRadius: 5, padding: "3px 9px", border: "1px solid" },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: "#475569", marginBottom: 8 },
  box: { borderRadius: 8, padding: "12px 16px" },
};
