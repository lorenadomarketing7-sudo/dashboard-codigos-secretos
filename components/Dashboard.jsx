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
  { num:"128", nome:"O Custo Invisível", emoji:"💀", vol:1, cats:["urgencia","identificacao"], gatilho:"Revela uma consequência que o público nunca parou para calcular. O preço invisível que já está sendo pago cria consciência poderosa.", estrutura:["🟥 [AÇÃO/HÁBITO/ESCOLHA] — Ação comum ou hábito frequente","🟦 [CONSEQUÊNCIA NEGATIVA] — Consequência real e relevante"], fraseBase:"O custo oculto de [AÇÃO/HÁBITO] é [CONSEQUÊNCIA NEGATIVA].", porqueFunciona:"Ninguém gosta de descobrir que está pagando por algo sem perceber. A revelação do custo invisível gera ação imediata.", exemplo:["O custo oculto de postar sem estratégia é ficar preso na estagnação por meses sem entender por quê.","","Não é falta de conteúdo bom. É que cada post sem estratégia","educa o algoritmo de forma errada.","","O Instagram usa dados de engajamento dos últimos posts","para decidir para quem distribuir os próximos.","","Se seus últimos posts tiveram baixa retenção,","o algoritmo vai distribuir os próximos para menos pessoas.","","O custo não é só tempo perdido. É credibilidade com o algoritmo","que leva semanas para recuperar.","","Quer o mapa de recuperação de perfil estagnado? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 128' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Ação ou hábito comum que tem custo oculto real","- O custo oculto (nunca calculado pelo público)","- Por que é invisível","","CONTEÚDO:","1. 'O custo oculto de [AÇÃO] é [CONSEQUÊNCIA]'","2. Como esse custo se acumula (mecanismo)","3. Como reverter ou evitar + CTA"] },
  { num:"129", nome:"A Pergunta que Abre Olhos", emoji:"❓", vol:1, cats:["curiosidade","engajamento"], gatilho:"Uma pergunta que o público não sabe responder com certeza ativa curiosidade imediata. O cérebro precisa da resposta e obriga o consumo.", estrutura:["🟥 [SITUAÇÃO OU PROBLEMA RECORRENTE] — Algo que acontece repetidamente","🟦 [AÇÃO OU ESFORÇO DO PÚBLICO] — O que a pessoa já faz tentando resolver"], fraseBase:"Você sabe por que [PROBLEMA] mesmo quando [ESFORÇO QUE DEVERIA RESOLVER]?", porqueFunciona:"Quando a ação que deveria resolver não resolve, a pergunta cria um paradoxo que o cérebro precisa resolver — a curiosidade se torna involuntária.", exemplo:["Você sabe por que seus vídeos não engajam mesmo quando você cria um conteúdo que considera muito bom?","","A resposta provavelmente não está no conteúdo em si. Está no gancho.","","Você pode ter o melhor conteúdo do mundo, mas se o primeiro frame não parar o scroll,","ninguém vai saber que era bom.","","A maioria dos criadores investe 90% do tempo no conteúdo e 10% no gancho.","O resultado que precisava ser era o inverso.","","O gancho é o ingresso. Sem ingresso, ninguém entra.","","Quer os 7 modelos de gancho que mais uso? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 129' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Problema recorrente que vivem","- O esforço que não resolve","- A causa real que não é óbvia","","CONTEÚDO:","1. 'Você sabe por que [PROBLEMA] mesmo quando [ESFORÇO]?'","2. 'A resposta não está onde você pensa...'","3. Revele a causa real + solução + CTA"] },
  { num:"130", nome:"Se Eu Fosse Você", emoji:"🔁", vol:1, cats:["autoridade","desejo","vendas"], gatilho:"Posiciona você como especialista que já sabe o caminho. A pessoa não precisa descobrir — você já descobriu. Gera confiança e desejo de replicar.", estrutura:["🟥 [DESEJO/RESULTADO/SONHO] — O que o público quer alcançar","🟦 [AÇÃO/PASSO A PASSO] — O que você faria se estivesse no lugar deles"], fraseBase:"Se eu quisesse [RESULTADO], eu faria exatamente isso: [AÇÃO/PASSO A PASSO].", porqueFunciona:"O avatar não precisa descobrir o caminho — você já descobriu e está compartilhando. Isso acelera a confiança e o desejo de replicar.", exemplo:["Se eu fosse dentista e quisesse atrair 10 mil seguidores qualificados,","faria esses 3 tipos de conteúdo toda semana.","","Tipo 1: Reel de desmistificação — gera compartilhamento.","'3 mitos sobre clareamento que todo mundo acredita.'","","Tipo 2: Antes e depois com processo — gera salvamento.","Mostre o caso, o procedimento, o resultado.","","Tipo 3: Perguntas frequentes — gera comentários.","'O que acontece se você não tirar o siso?'","","Esses 3 formatos cobrem os 3 comportamentos que o algoritmo prioriza.","Quer o calendário de posts semanal para saúde? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 130' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil específico com um desejo claro","- O passo a passo real que você seguiria","- A lógica ou evidência de cada passo","","CONTEÚDO:","1. 'Se eu fosse [PERFIL] e quisesse [RESULTADO], faria exatamente isso'","2. De 3 a 5 passos com lógica de cada um","3. Resultado esperado + CTA"] },

  // ── VOL 2 ──────────────────────────────────────────────────────────────────
  { num:"131", nome:"A Rota Errada", emoji:"🚫", vol:2, cats:["identificacao","objecao"], gatilho:"Aponta a rota errada e oferece a alternativa correta — frustração se transforma em esperança quando você mostra o jeito certo.", estrutura:["Erro específico que o avatar comete","Por que é um erro (mecanismo real)","O jeito certo com lógica explicada","Resultado possível ao mudar de rota"], fraseBase:"Você está fazendo [AÇÃO] do jeito errado → [ERRO] → [POR QUÊ É ERRADO] → [JEITO CERTO] → CTA.", porqueFunciona:"A aversão à perda é o gatilho mais poderoso do cérebro. Quando você nomeia o erro com precisão e oferece o caminho correto, você entrega esperança junto com urgência.", exemplo:["Você está investindo do jeito errado.","","A maioria dos iniciantes coloca dinheiro em empresas famosas porque","acha que nome grande = investimento seguro.","","O erro está em confundir popularidade com fundamentos.","Uma empresa conhecida pode ter dívidas altas e lucros em queda.","","O jeito certo: antes de qualquer aporte, analise 3 indicadores:","P/L, ROE e dívida líquida sobre EBITDA.","","Quem aprende a ler esses 3 números toma decisões de investidor, não de torcedor.","","Quer a planilha para analisar qualquer ação em 5 minutos?","Comenta PLANILHA aqui."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 131 — A Rota Errada' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil detalhado: [ex: investidores iniciantes de 25 a 40 anos]","- Erro específico que cometem: [o que fazem achando que é certo]","- Consequência real do erro","- O jeito certo (sua solução) com lógica explicada","- Tom: [educativo, empático, sem condescendência]","","CONTEÚDO:","1. 'Você está fazendo [AÇÃO] do jeito errado'","2. O erro específico com contexto real","3. POR QUÊ é um erro (mecanismo real)","4. O jeito certo com lógica","5. Resultado possível ao mudar + CTA"] },
  { num:"132", nome:"Provando que É Possível", emoji:"✨", vol:2, cats:["desejo","conexao","seguidores"], gatilho:"Prova social + aspiração. Mostrar que você já vive o resultado quebra a crença de impossibilidade.", estrutura:["Cena visual que representa o resultado desejado","Contexto que permite isso","Quebra da crença de impossível","Caminho acessível em marcos concretos"], fraseBase:"[CENA DO RESULTADO] → 'Eu sei que parece distante...' → [COMO CHEGUEI LÁ] → CTA.", porqueFunciona:"Quando o avatar vê uma pessoa comum vivendo o resultado que deseja, a crença de 'isso é só para os outros' desmorona. O caminho se torna imaginável.", exemplo:["[Foto em cafeteria às 10h de terça] Essa é minha segunda reunião da semana.","Às 16h busco meu filho na escola.","","Não tenho chefe. Não bato ponto. Não peço permissão.","","Eu também achava que isso era 'para os outros' até 3 anos atrás.","","O que mudou foi entender que trabalhar de forma independente","não exige ser famoso, não exige capital e não exige abandonar tudo de uma vez.","","Comecei prestando serviço 4 horas por dia fora do emprego.","No sexto mês, minha renda extra igualava meu salário.","No décimo segundo, pedi demissão.","","Se você quer entender como eu estruturei isso,","clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 132 — Provando que É Possível' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [ex: profissionais CLT que sonham com independência]","- Crença limitante central: [o que acham que os impede]","- O resultado que você vive: [visual e específico]","- Como chegou lá (caminho acessível): [honesto, sem glamour]","","CONTEÚDO:","1. Cena visual do resultado desejado","2. 'Eu sei que parece distante...' + quebra da crença","3. O caminho em 2 a 3 marcos concretos","4. CTA"] },
  { num:"133", nome:"O Conto que Vende", emoji:"📖", vol:2, cats:["conexao","engajamento"], gatilho:"Histórias liberam ocitocina e criam conexão real. Uma boa narrativa derruba defesas sem parecer conteúdo de venda.", estrutura:["Personagem famoso ou situação intrigante","Narrativa com começo, conflito e virada","Ponte: 'E é exatamente isso que acontece quando...'","Lição aplicada ao nicho"], fraseBase:"[HISTÓRIA REAL] → Ponte: 'E é exatamente isso que acontece com [SITUAÇÃO DO AVATAR].' → Lição → CTA.", porqueFunciona:"O cérebro processa histórias de forma diferente de informações diretas. Narrativas ativam as mesmas regiões que vivenciar a experiência de verdade.", exemplo:["O dia em que Michael Jordan foi cortado do time da escola —","e o que isso tem a ver com você que ainda não começou.","","Aos 15 anos, Jordan foi cortado. O técnico escolheu um colega mais alto.","Jordan foi para casa e chorou.","","No dia seguinte, ele voltou à quadra.","Não para provar para o técnico. Para provar para si mesmo.","","Um ano depois, era o melhor do estado.","","E é exatamente isso que separa quem constrói algo","de quem continua esperando o momento certo.","","O momento certo não existe. Existe o momento em que você decide aparecer.","","Clique no link da bio para os primeiros 30 dias."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 133 — O Conto que Vende' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [ex: empreendedores que desistem fácil diante de obstáculos]","- O valor que a história deve transmitir: [persistência, método, coragem]","- Tipo de história: [famosa verificável / pessoal / de cliente]","","CONTEÚDO:","1. Título com personagem ou situação intrigante","2. Narrativa em 4 a 6 parágrafos curtos com ritmo e suspense","3. Ponte: 'E é exatamente isso que acontece quando...'","4. Lição aplicada + CTA"] },
  { num:"134", nome:"O Herói de Verdade", emoji:"🦸", vol:2, cats:["conexao","seguidores"], gatilho:"Humaniza o criador com valores reais além do resultado. Gera lealdade de longo prazo e diferenciação no mercado.", estrutura:["Resultado tangível que o avatar considera importante","'Mas isso não é o que realmente importa...'","O valor humano real (específico e visual)","Virada em 2 a 3 frases (antes vs agora)"], fraseBase:"[RESULTADO] → 'Mas esse número não é o que me move' → [VALOR HUMANO REAL] → Virada → CTA.", porqueFunciona:"Quando você mostra o que realmente importa além do dinheiro e status, sua audiência sente que você é real. Isso cria um vínculo emocional que nenhum concorrente pode copiar.", exemplo:["[Print de faturamento] Esse é o resultado dos últimos 30 dias.","","Mas esse número não é o que me tira da cama toda manhã.","","[Foto com filho no parque] Essa foto é.","","Há 5 anos, saía antes do meu filho acordar e chegava depois que ele dormia.","Ganhava bem. E perdia tudo que não tem preço.","","Hoje levo ele na escola. Busco ele. Estou presente quando ele precisa.","","Dinheiro sem liberdade não é sucesso. É uma prisão mais cara.","","Se você também quer construir algo que te dê resultado E presença,","me manda uma mensagem."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 134 — O Herói de Verdade' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Valor central que move esse público: [família, liberdade, propósito]","- O resultado tangível que você mostra: [número, conquista]","- O valor humano que supera o resultado: [específico e visual]","- Tom: [genuíno, vulnerável, sem performance]","","CONTEÚDO:","1. Resultado tangível","2. 'Mas esse número não é o que me move...'","3. Valor humano real com cena específica","4. Virada antes vs agora","5. Frase de conclusão poderosa + CTA"] },
  { num:"135", nome:"Dentro da Sua Cabeça — Dor", emoji:"🔮", vol:2, cats:["identificacao","leads"], gatilho:"Leitura mental precisa — quando você acerta a dor com precisão cirúrgica, a pessoa sente que você entende como ninguém.", estrutura:["'Deixa eu adivinhar...'","Cena específica e emocional do cotidiano","Comportamentos já tentados sem sucesso","Razão real e profunda do porquê acontece"], fraseBase:"'Deixa eu adivinhar...' → [CENA DA DOR] → [JÁ TENTARAM ISSO] → [RAZÃO REAL] → CTA.", porqueFunciona:"Especificidade extrema na descrição da dor cria a sensação 'isso foi escrito para mim'. Isso é o gatilho do reconhecimento no seu estado mais poderoso.", exemplo:["Deixa eu adivinhar...","","Você acorda cansada mesmo depois de 8 horas de sono.","Toma café, funciona por 2 horas, depois vem aquela névoa mental.","","Já tomou magnésio. Já fez dieta sem glúten. Já cortou o açúcar.","Nada funcionou.","","E fica aquela sensação de que o problema é você.","","Mas não é.","","Isso acontece porque você está dormindo, mas não está recuperando.","O sono profundo é destruído por cortisol elevado, luz artificial","e alimentação errada nas últimas 3 horas.","","Você dorme horas. Mas não entra nas fases que regeneram de verdade.","","Gravei uma aula com o protocolo de 3 horas antes de dormir.","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 135 — Dentro da Sua Cabeça (Dor)' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil detalhado: [ex: mulheres de 30 a 50 anos cronicamente esgotadas]","- A cena exata do momento de dor: [cinematográfico e específico]","- O que já tentaram: [ao menos 3 tentativas reais]","- A razão real: [o mecanismo que explica o problema]","- Tom: [empático, como quem esteve lá]","","CONTEÚDO:","1. 'Deixa eu adivinhar...' + cena específica","2. Comportamentos já tentados","3. 'Mas não é culpa sua. Isso acontece porque...' + razão real","4. CTA"] },
  { num:"136", nome:"Diagnóstico + Solução Imediata", emoji:"💡", vol:2, cats:["autoridade","leads","objecao"], gatilho:"Entrega valor real e imediato + lacuna que a oferta preenche de forma natural.", estrutura:["'Deixa eu adivinhar...' + dor","'Então você precisa fazer isso imediatamente:'","3 a 5 passos acionáveis com lógica","'Porém, sem [próximo nível]...'"], fraseBase:"'Deixa eu adivinhar...' → [DOR] → 'Então faça isso:' → [PASSOS] → 'Porém...' → CTA.", porqueFunciona:"O 'porém' após a solução cria a lacuna que a oferta preenche. Você entrega tanto valor que a pessoa confia — e a lacuna faz ela querer mais.", exemplo:["Deixa eu adivinhar...","Você tenta poupar mas no fim do mês não sobra nada.","","Então aplique esse método agora:","","Passo 1: No dia que receber, transfira 10% para conta separada.","Não é 'o que sobrar'. É antes de qualquer gasto.","","Passo 2: Identifique seus 3 maiores gastos fixos e questione cada um.","Um corte de R$150/mês = R$1.800/ano investidos.","","Passo 3: Defina um teto semanal para gastos variáveis.","Se gastou tudo na quarta, para até segunda.","","Porém, sem saber para onde direcionar o que sobra, você perde rentabilidade.","Tenho uma aula mostrando os 3 destinos certos para o seu dinheiro.","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 136 — Diagnóstico + Solução Imediata' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [sobrecarregados que precisam de resultado rápido]","- Dor que aparece no dia a dia","- Os 3 a 5 passos que realmente funcionam (acionáveis, com lógica)","- A lacuna que abre a oferta","","CONTEÚDO:","1. 'Deixa eu adivinhar...' + dor específica","2. 'Então faça isso imediatamente:'","3. Passos com lógica real","4. 'Porém, sem [próximo nível]...'","5. CTA"] },
  { num:"137", nome:"O Mapa Incompleto", emoji:"🗺️", vol:2, cats:["desejo","vendas","leads"], gatilho:"Valor real + lacuna estratégica. A estrutura mais usada em copywriting de alta conversão.", estrutura:["Título: 'Como [resultado] mesmo [objeção]'","Método com 3 a 5 passos com valor real","'Porém, existe um ponto crítico que a maioria ignora...'","Consequência de ignorar"], fraseBase:"'Como [RESULTADO] mesmo [OBJEÇÃO]' → [PASSOS] → 'Porém...' → CTA.", porqueFunciona:"Você entrega valor suficiente para gerar autoridade, mas deixa uma lacuna estratégica. O avatar recebe, usa — e quando bate no limite, quer a oferta.", exemplo:["Como começar a fazer Reels do zero mesmo sem aparecer na câmera.","","Passo 1: Comece com vídeos de mãos, objetos ou processos.","Passo 2: Use texto na tela como substituto da fala.","Passo 3: Escolha 1 formato fixo e repita por 30 dias.","Passo 4: Grave no modo paisagem e recorte para vertical.","","Esses 4 passos já colocam você à frente de quem ainda não começou.","","Porém, sem entender qual formato gera mais alcance para o seu nicho,","você vai demorar meses para descobrir o que já está mapeado.","","Tenho uma aula com os 3 formatos de maior alcance por nicho.","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 137 — O Mapa Incompleto' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [iniciantes que não sabem por onde começar]","- Objeção principal que os trava","- Os passos reais (3 a 5) com lógica explicada","- A lacuna que abre a oferta","","CONTEÚDO:","1. 'Como [RESULTADO] mesmo [OBJEÇÃO]'","2. Passos com lógica real","3. 'Porém, existe um ponto crítico...' + consequência","4. CTA"] },
  { num:"138", nome:"Antes e Depois", emoji:"❌✅", vol:2, cats:["autoridade","engajamento","seguidores"], gatilho:"Comparação lado a lado — a pessoa identifica o jeito errado (que pratica) e quer o certo na hora.", estrutura:["Jeito errado + resultado negativo (empático)","'Agora veja o jeito certo:'","Passo a passo do método correto","Comparação de resultados"], fraseBase:"[JEITO ERRADO] → Por que não funciona → '✅ O jeito que funciona:' → [MÉTODO] → Comparação → CTA.", porqueFunciona:"O reconhecimento do erro próprio seguido da solução imediata cria um ciclo poderoso: culpa → alívio → ação. Gera muito salvamento.", exemplo:["A maioria aborda clientes pelo WhatsApp assim:","❌ 'Oi, tudo bem? Vim te apresentar nossos serviços...'","","A pessoa deixa no visto ou responde com 'pode mandar' que nunca evolui.","","Isso acontece porque a abordagem começa em você — não no problema do cliente.","","✅ O jeito que funciona:","'Oi [nome], vi que você [contexto]. Tenho ajudado pessoas nessa situação","a [resultado]. Faz sentido conversar 15 minutos sobre isso?'","","Taxa de resposta com esse modelo: 3x a 5x maior.","","Quer o script completo? Comenta SCRIPT aqui."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 138 — Antes e Depois' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [quem faz algo errado sem saber que está errado]","- O jeito errado mais comum + por que não funciona","- O jeito certo com passo a passo específico","- Diferença de resultado em dados ou porcentagem","","CONTEÚDO:","1. 'A maioria faz assim:' + exemplo do jeito errado","2. Por que não funciona","3. '✅ O jeito que funciona:' + passo a passo","4. Comparação de resultados + CTA"] },
  { num:"139", nome:"Passo a Passo Revelado", emoji:"📋", vol:2, cats:["autoridade","leads","seguidores"], gatilho:"Tutoriais geram alto salvamento. Quem explica o POR QUÊ se diferencia de quem só diz o quê.", estrutura:["Título: 'Como [resultado] mesmo [objeção]'","Passo 1 com nome + POR QUÊ funciona","Passo 2 com nome + POR QUÊ","Passo 3+ com nome + POR QUÊ"], fraseBase:"'Como [RESULTADO] mesmo [OBJEÇÃO]' → Passo 1: [nome] + [POR QUÊ] → ... → CTA.", porqueFunciona:"A explicação do mecanismo (o POR QUÊ) cria percepção de especialista. Quem só diz 'faça isso' é um dador de dicas. Quem explica por que funciona é referência.", exemplo:["Como aprender inglês em 6 meses estudando só 30 minutos por dia.","","Passo 1 — Abandone a gramática no começo.","Por quê: o cérebro aprende por exposição, não por regras.","Gramática no começo trava.","","Passo 2 — Input compreensível todo dia.","Por quê: 30 minutos de série com legenda em inglês ativa o mapa mental do idioma.","","Passo 3 — Fale em voz alta desde o dia 1.","Por quê: esperar estar 'pronto' nunca chega. Grave áudios do seu dia.","","Passo 4 — Flashcards de vocabulário contextual.","Por quê: palavras em frases reais ficam na memória. Listas isoladas, não.","","Quer o plano semana a semana? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 139 — Passo a Passo Revelado' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [iniciantes com pouco tempo que querem resultado real]","- Objeção principal que os trava","- Os passos (3 a 5) com nome + POR QUÊ cada um funciona","","CONTEÚDO:","1. 'Como [RESULTADO] mesmo [OBJEÇÃO]'","2. Para cada passo: nome + o que fazer + POR QUÊ funciona","3. Resultado acumulado ao seguir todos + CTA"] },
  { num:"140", nome:"Conteúdo de Identidade", emoji:"🏷️", vol:2, cats:["identificacao","seguidores","engajamento"], gatilho:"Identidade específica no título funciona como ímã para o avatar certo e filtro para os demais.", estrutura:["'[N] coisas que [IDENTIDADE ESPECÍFICA] deve [fazer/saber/evitar]'","Para cada item: lógica específica para ESSA identidade","Consequência de ignorar"], fraseBase:"'[N] coisas que [IDENTIDADE] deve [fazer/saber/evitar]' → Item 1 + lógica → ... → CTA.", porqueFunciona:"Quando alguém sente que o conteúdo foi feito exclusivamente para ela, o engajamento e o compartilhamento disparam. Identidade = pertencimento.", exemplo:["4 coisas que todo médico que quer crescer no Instagram precisa parar de fazer.","","1 — Parar de postar só casos clínicos.","Para o público leigo, isso não gera identificação — gera distância.","","2 — Parar de ter medo de ter opinião.","Médico sem posicionamento é só mais um perfil no feed.","","3 — Parar de achar que precisa de produção profissional para começar.","Smartphone + consistência bate câmera + falta de estratégia.","","4 — Parar de postar só para colegas.","Se a linguagem é técnica demais, você está crescendo no lugar errado.","","Com qual você mais se identificou? Comenta aqui."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 140 — Conteúdo de Identidade' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Identidade específica: [quanto mais específico, melhor]","- O que os define como grupo: [desafios únicos dessa posição]","- Situação urgente do momento","","CONTEÚDO:","1. '[N] coisas que [IDENTIDADE] deve [fazer/parar/saber]'","2. Para cada item (3 a 5): lógica específica para essa identidade","3. Pergunta de engajamento nos comentários + CTA"] },
  { num:"141", nome:"A Virada Contraintuitiva", emoji:"🔥", vol:2, cats:["curiosidade","autoridade","seguidores"], gatilho:"Vai contra o senso comum. Títulos controversos têm taxa de abertura muito mais alta do que títulos convencionais.", estrutura:["Título que desafia crença popular do nicho","'Eu sei que parece contraditório, mas...'","Lógica real + evidência","Solução alternativa"], fraseBase:"'Por que [COISA CONTRA-INTUITIVA]?' → 'Eu sei que parece loucura...' → [LÓGICA] → [ALTERNATIVA] → CTA.", porqueFunciona:"O cérebro é programado para questionar o que desafia suas crenças estabelecidas. O desconforto de uma ideia oposta obriga a leitura até o fim.", exemplo:["Por que responder clientes rápido demais está afastando vendas.","","Eu sei que vai contra tudo que você já ouviu.","Mas existe um fenômeno chamado 'disponibilidade excessiva'.","","Quando você responde em segundos a qualquer hora,","você sinaliza que não tem demanda.","E quem não tem demanda não é percebido como autoridade.","","Prestadores com janelas de atendimento definidas cobram em média 40% mais.","","A solução: protocolo de resposta em até 4 horas","+ mensagem automática profissional no intervalo.","","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 141 — A Virada Contraintuitiva' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Crença popular que vai desafiar","- Por que essa crença é limitante","- Evidência ou dado que sustenta sua visão (real e verificável)","","CONTEÚDO:","1. Título que desafia a crença mais comum","2. 'Eu sei que vai contra tudo...' + fenômeno ou mecanismo","3. Evidência (dado, estudo, experiência)","4. Solução alternativa + CTA"] },
  { num:"142", nome:"A Janela que Fechou", emoji:"📊", vol:2, cats:["urgencia","desejo"], gatilho:"Prova social histórica + urgência. Ativa o arrependimento positivo de não perder a próxima onda.", estrutura:["Resultado impressionante de oportunidade passada (real)","'Mas aquela janela fechou...'","Nova oportunidade com mesmo potencial","Por que agora é o momento"], fraseBase:"[RESULTADO PASSADO] → 'Aquela janela fechou' → [NOVA OPORTUNIDADE] → 'Agora é o momento porque...' → CTA.", porqueFunciona:"Mostrar que outros ganharam antes cria FOMO + esperança. 'Não cometa o mesmo erro de não aproveitar' é uma das motivações mais poderosas.", exemplo:["Em 2020, quem abriu uma loja no Shopee sem concorrência","vendia 200 pedidos por mês com R$5/dia de anúncio.","","Hoje a plataforma tem 10x mais vendedores. Aquela janela fechou.","","Mas existe uma nova: o TikTok Shop.","Ainda tem pouquíssimos vendedores brasileiros.","O alcance orgânico ainda entrega para lojas novas.","O custo de anúncio é 60% mais barato que no Meta.","","Quem aproveitou a Shopee no começo construiu negócio.","Quem aproveitar o TikTok Shop agora vai colher o mesmo.","","Essa janela não vai ficar aberta para sempre.","Aula de como abrir loja do zero no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 142 — A Janela que Fechou' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Empreendedores que perderam oportunidades antes","- Oportunidade passada verificável (com dados reais)","- Nova oportunidade com mesmo potencial (real — não invente)","- Por que agora é o momento (dados e comparação)","","CONTEÚDO:","1. Resultado impressionante de oportunidade passada","2. 'Mas aquela janela fechou...'","3. 'Existe uma nova oportunidade...' + comparação","4. Urgência real + CTA"] },
  { num:"143", nome:"O Desafio Invertido", emoji:"⚡", vol:2, cats:["engajamento","conexao","seguidores"], gatilho:"Provoca o instinto de prova. A provocação prende a atenção e rapidamente se transforma em algo empático.", estrutura:["'Desista! Você não é capaz de [resultado]...'","'...enquanto continuar fazendo [comportamento errado]'","'Eu também era assim...' + virada pessoal","O método correto em 2 a 3 pontos"], fraseBase:"'Desista! Você não é capaz de [RESULTADO]...' → '...enquanto [ERRO]' → 'Eu também era assim' → [VIRADA] → CTA.", porqueFunciona:"Quando alguém diz que você não é capaz, a reação natural é querer provar o contrário. O formato usa esse impulso para capturar atenção e entregar uma mensagem empática.", exemplo:["Desista. Você não é capaz de viver de freelancer.","","...enquanto continuar cobrando por hora em vez de por entrega.","","Eu também era assim. Cobrava R$50/hora, ficava 8 horas num projeto,","recebia R$400 e sentia que ganhei R$15/hora depois dos custos.","","Quando entendi que o cliente compra resultado — não tempo —","troquei para precificação por projeto.","","O mesmo trabalho que pagava R$400 passei a cobrar R$1.800.","O cliente não reclamou. O resultado valia muito mais.","","Se você quer aprender a precificar seus serviços por valor,","clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 143 — O Desafio Invertido' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [quem trabalha muito e ganha pouco]","- Comportamento que os trava (o real obstáculo)","- A virada pessoal real e específica","- O método correto em 2 a 3 pontos","- Tom: [provocador no início, empático no desenvolvimento]","","CONTEÚDO:","1. 'Desista! Você não é capaz de [resultado]...'","2. '...enquanto continuar [comportamento errado]'","3. 'Eu também era assim...' + virada real","4. Método correto + CTA"] },
  { num:"144", nome:"O Objeto Secreto", emoji:"👀", vol:2, cats:["curiosidade","engajamento"], gatilho:"Objeto comum como chave para resultado cria loop de tensão que obriga o consumo até o final.", estrutura:["Apresentação visual do objeto inesperado","'Isso é a chave para [resultado]?'","Suspense + conexão surpreendente com lógica real","Como aplicar na prática"], fraseBase:"'Tá vendo esse [OBJETO]?' → 'É a chave para [RESULTADO]' → 'Eu sei que parece impossível...' → [LÓGICA] → CTA.", porqueFunciona:"O paradoxo de um objeto comum gerando um resultado importante cria curiosidade que o cérebro precisa resolver. O consumo até o final se torna involuntário.", exemplo:["Tá vendo esse post-it amarelo na minha mesa?","","Ele é o motivo pelo qual entrego mais em 4 horas do que a maioria em 8.","","Todo dia, antes de abrir o e-mail, escrevo nele UMA coisa.","A tarefa que, se eu fizer, faz o dia valer a pena.","","Isso se chama MIT — Most Important Task.","O cérebro toma as melhores decisões nas primeiras 2 horas após acordar.","Usar esse tempo na tarefa mais importante muda tudo.","","Quer meu sistema completo de 3 rituais matinais?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 144 — O Objeto Secreto' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- O objeto cotidiano inesperado (simples e acessível)","- O resultado que ele 'desbloqueia' (concreto e desejado)","- O mecanismo real (ciência, psicologia, lógica)","","CONTEÚDO:","1. 'Tá vendo esse [OBJETO]?' — apresentação visual","2. 'É a chave para [RESULTADO]'","3. 'Eu sei que parece impossível...' + suspense","4. Conexão com mecanismo real + como aplicar + CTA"] },
  { num:"145", nome:"O Caminho Mais Simples", emoji:"🚀", vol:2, cats:["objecao","desejo","vendas"], gatilho:"Elimina as objeções antes que sejam formuladas. Quando a barreira some, a ação vem.", estrutura:["Resultado concreto e visual","'Para ter isso, você NÃO precisa de...' (3 a 5 objeções reais)","'Na verdade, existe um jeito mais simples:'","Caminho alternativo com detalhes"], fraseBase:"'Tá vendo [RESULTADO]? Para ter isso, você NÃO precisa de...' → 'Existe um jeito mais simples:' → [CAMINHO] → CTA.", porqueFunciona:"As objeções são barreiras invisíveis que impedem a ação. Quando você as nomeia e destrói antes que apareçam, o caminho fica livre.", exemplo:["Tá vendo essa decoração? Parece de revista. Gastei R$320.","","Para chegar aqui, eu NÃO precisei de:","❌ Arquiteto ou designer","❌ Reforma","❌ Móveis novos","","O que usei foram 3 princípios básicos de design:","1 — Âncora visual: um ponto focal em cada ambiente. (R$90 numa feira)","2 — Regra dos ímpares: objetos em 3 ou 5, nunca 2 ou 4.","3 — Planta viva + luz natural. (R$35 + zero)","","Quer os 12 princípios completos? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 145 — O Caminho Mais Simples' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- As 3 a 5 objeções reais que os impedem","- O resultado que mostrar (concreto e visual)","- O caminho simplificado (princípios ou passos)","","CONTEÚDO:","1. Resultado visual concreto","2. 'Para ter isso, você NÃO precisa de:' + lista de objeções","3. 'Existe um jeito mais simples:' + detalhes","4. CTA"] },
  { num:"146", nome:"Você Já Tem o Suficiente", emoji:"🎯", vol:2, cats:["objecao","leads"], gatilho:"A pessoa já possui o necessário. Quando percebe isso, a resistência desaparece e a ação se torna possível imediatamente.", estrutura:["'Você tem [recurso simples]?'","'Então você já pode ter [resultado]'","Como funciona na prática (passo a passo real)","Exemplo numérico concreto"], fraseBase:"'Você tem [RECURSO]?' → 'Então você já tem tudo para [RESULTADO]' → [COMO FUNCIONA] → CTA.", porqueFunciona:"A crença 'falta alguma coisa para começar' é a maior barreira para a ação. Quando você prova que o recurso necessário já está na mão da pessoa, essa barreira desmorona.", exemplo:["Você tem um celular com câmera, acesso à internet","e 2 horas livres por semana?","","Então você já tem tudo para criar um negócio de consultoria online","e cobrar R$200 por sessão.","","Você escolhe 1 problema que sabe resolver melhor do que a maioria.","Cria um perfil no Instagram focado nesse problema.","Posta 3 vezes por semana mostrando que sabe do que está falando.","","Em 30 dias, as primeiras mensagens chegam.","Você agenda uma sessão de R$200. Entrega valor. Pede indicação.","","O ciclo começa com o que você já tem.","","Quer o guia de como estruturar sua primeira oferta?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 146 — Você Já Tem o Suficiente' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Crença limitante central: [o que acham que precisam ter antes de agir]","- Os recursos simples que já têm: [acessíveis e concretos]","- Como esses recursos geram o resultado: [passo a passo real]","- Exemplo numérico específico","","CONTEÚDO:","1. 'Você tem [RECURSO]?'","2. 'Então você já tem tudo para [RESULTADO]'","3. Como funciona na prática","4. 'O ciclo começa com o que você já tem' + CTA"] },
  { num:"147", nome:"A Ideia que Surgiu", emoji:"💡", vol:2, cats:["conexao","engajamento","seguidores"], gatilho:"Descoberta ao vivo. A audiência sente que participa do experimento em tempo real.", estrutura:["Objeto ou situação cotidiana que gerou a ideia","'Foi então que tive uma ideia!'","Bastidores com detalhes específicos (o quê, como, quanto)","Resultado com dados concretos"], fraseBase:"[SITUAÇÃO COTIDIANA] → 'Foi então que tive uma ideia!' → [BASTIDORES DETALHADOS] → [RESULTADO] → CTA.", porqueFunciona:"O formato espontâneo e narrativo cria uma sensação de cumplicidade. A audiência não consome — ela acompanha. Isso gera identificação forte e desejo de replicar.", exemplo:["Estava passando por uma loja de tecidos e vi um retalho sendo descartado no lixo.","","Foi então que tive uma ideia.","E se eu pedisse esses retalhos e fizesse capas para vasos?","","Pedi os retalhos — era descarte, me deram de graça.","Assisti 2 tutoriais no YouTube. Fiz as primeiras 5 capas em 3 horas.","Postei com o seguinte texto: 'Feito à mão, cada peça é única.'","Coloquei R$35 cada e o link do WhatsApp.","","Em 48 horas: 11 pedidos. R$385 em vendas. Material que estava no lixo.","","Hoje tenho lista de espera de 3 semanas.","","Se você tem uma habilidade parada, ela pode ser o próximo negócio.","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 147 — A Ideia que Surgiu' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Pessoas criativas que querem monetizar habilidades","- A situação ou objeto de partida: [simples e acessível]","- Bastidores com detalhes reais (custo, tempo, ações)","- Resultado com dados concretos","","CONTEÚDO:","1. Situação cotidiana simples","2. 'Foi então que tive uma ideia!'","3. Bastidores específicos","4. Resultado com dados + CTA"] },
  { num:"148", nome:"A Diferença que Ninguém Conta", emoji:"🔍", vol:2, cats:["autoridade","curiosidade"], gatilho:"Revela que a diferença entre dois conceitos não é o que pensam. Demonstra profundidade e gera salvamento.", estrutura:["'A real diferença entre X e Y não é o que você está pensando'","'A maioria acha que é...' + a resposta óbvia","'Mas a diferença real é...' + revelação com lógica","Implicação prática + exemplo concreto"], fraseBase:"'A real diferença entre [A] e [B] não é o que você está pensando' → [REVELAÇÃO] → [IMPLICAÇÃO] → CTA.", porqueFunciona:"Quando a resposta óbvia está errada, o cérebro entra em estado de alerta cognitivo. A revelação da verdade gera 'aha!' — e o 'aha!' gera compartilhamento.", exemplo:["A real diferença entre salário e renda não é o que você está pensando.","","A maioria acha que é só o nome: salário para empregado, renda para autônomo.","","Mas a diferença real é de mecanismo.","Salário exige sua presença. Se você para, ele para.","Renda funciona com ou sem você presente.","","Um médico que atende 10 pacientes por dia tem salário disfarçado de autônomo.","Um médico com curso online tem renda — mesmo dormindo.","","A questão não é quem paga. É se o dinheiro depende da sua presença.","","Quer criar sua primeira fonte de renda que não depende de você estar lá?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 148 — A Diferença que Ninguém Conta' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Os dois conceitos que confundem (confusão real e comum)","- A diferença óbvia que acham que é a resposta","- A diferença real e surpreendente","- Implicação prática para o avatar","","CONTEÚDO:","1. 'A real diferença entre [A] e [B] não é o que você está pensando'","2. 'A maioria acha que é...' + resposta óbvia","3. 'Mas a diferença real é...' + revelação com lógica","4. Exemplo concreto + implicação + CTA"] },
  { num:"149", nome:"O Teste Revelador", emoji:"📝", vol:2, cats:["engajamento","leads"], gatilho:"Pessoas adoram descobrir coisas sobre si mesmas. Gera comentários e segmenta a audiência naturalmente.", estrutura:["'Teste rápido: você está pronto para [resultado]?'","De 3 a 5 perguntas específicas (sim/não)","Resultado para 3 SIM / 1-2 SIM / 0 SIM","CTA diferente para cada resultado"], fraseBase:"'Teste: você está pronto para [RESULTADO]?' → [PERGUNTAS] → [RESULTADOS POR CENÁRIO] → CTA.", porqueFunciona:"O teste cria envolvimento ativo — a pessoa não lê, ela participa. Isso gera 3x mais comentários do que posts informativos e segmenta audiência por nível.", exemplo:["Teste rápido: seu negócio está pronto para escalar?","","1 — Você tem um processo de vendas documentado que qualquer pessoa seguiria?","2 — Você sabe de onde vêm 80% dos seus clientes?","3 — Você tem pelo menos 1 mês de caixa de reserva operacional?","","Se respondeu SIM para as 3: você está pronto. Me manda uma mensagem.","","Se respondeu SIM para 1 ou 2: você está quase lá.","O que falta é o que separa crescimento de estagnação.","","Se respondeu NÃO para as 3: escalar agora seria um erro.","Comenta NÃO aqui que te explico por onde começar."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 149 — O Teste Revelador' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [pessoas em momento de decisão ou transição]","- As 3 perguntas específicas e reveladoras (não óbvias)","- Resultado para cada cenário (3 possíveis)","- CTA diferente para cada resultado","","CONTEÚDO:","1. 'Teste rápido: você está pronto para [resultado]?'","2. De 3 a 5 perguntas com sim/não","3. Resultado por cenário com CTA personalizado"] },
  { num:"150", nome:"Troque Isso por Aquilo", emoji:"↗️", vol:2, cats:["objecao","autoridade"], gatilho:"Atalho concreto para quem tentou o convencional. Específico e imediatamente acionável.", estrutura:["'Se você está [problema] e quer [resultado]...'","'Ao invés de [convencional]...'","'Faça isso:' + alternativa específica","Mecanismo real + exemplo de resultado"], fraseBase:"'Se você está [PROBLEMA]... ao invés de [CONVENCIONAL]... Faça isso:' → [ALTERNATIVA] → [MECANISMO] → CTA.", porqueFunciona:"O contraste 'ao invés de' valida o esforço da pessoa (ela já tentou) e apresenta a alternativa como descoberta — não como crítica.", exemplo:["Se você está tentando crescer no Instagram e quer mais vendas...","","Ao invés de ficar postando mais e esperando o algoritmo te recompensar...","","Faça isso: escolha 1 post por semana para impulsionar com R$5 a R$15","para público que ainda não te conhece.","","O mecanismo: o algoritmo entrega orgânico principalmente para quem já te segue.","Para alcançar novos públicos de forma consistente, tráfego pago","é o caminho mais previsível — mesmo com pouco investimento.","","R$5/dia × 7 dias = R$35. Com segmentação certa: 2.000 a 8.000 pessoas novas.","","Quer a configuração exata de campanha para R$5/dia?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 150 — Troque Isso por Aquilo' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- O problema que vivem","- O conselho convencional que seguem (e não funciona para eles)","- A alternativa contraintuitiva que funciona","- O mecanismo real por trás","","CONTEÚDO:","1. 'Se você está [problema] e quer [resultado]...'","2. 'Ao invés de [convencional]...'","3. 'Faça isso:' + alternativa","4. Mecanismo real + dado concreto + CTA"] },
  { num:"151", nome:"Na Voz de Quem Chegou Lá", emoji:"👑", vol:2, cats:["autoridade","desejo"], gatilho:"Credibilidade emprestada de referência reconhecida. O cérebro aceita mais o que vem de especialistas.", estrutura:["'[Autoridade] faz [comportamento específico e verificável]'","Lógica por trás + evidência","'Você não precisa ser [autoridade] para aplicar isso'","Versão adaptada e acessível"], fraseBase:"'[AUTORIDADE] faz [COMPORTAMENTO]' → [LÓGICA + EVIDÊNCIA] → 'A versão adaptada para você é...' → CTA.", porqueFunciona:"Associar sua mensagem à maior referência do nicho aumenta a credibilidade imediata. Você se posiciona como curador — alguém que sabe filtrar o que funciona.", exemplo:["Warren Buffet lê entre 500 e 1.000 páginas por dia.","","Quando perguntado sobre o segredo do sucesso, ele aponta para um livro imaginário:","'conhecimento se acumula — como juros compostos.'","","Cada livro que você lê hoje adiciona contexto a tudo que lerá amanhã.","Esse efeito composto de conhecimento é o que ele chama de moat —","a vantagem que ninguém pode copiar rápido.","","Você não precisa ler 1.000 páginas por dia.","Mas 20 minutos diários em não-ficção aplicada ao seu nicho","= 12 livros por ano. Em 5 anos: 60 livros.","","Quer a lista dos 12 livros que recomendo por nicho?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 151 — Na Voz de Quem Chegou Lá' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Figura de autoridade: [verificável — não invente hábitos]","- O comportamento específico e pouco conhecido (real)","- A lógica e o mecanismo por trás","- A versão acessível para o público","","CONTEÚDO:","1. '[Autoridade] faz [comportamento verificável]'","2. Lógica + evidência","3. 'Você não precisa ser [autoridade] para aplicar isso'","4. Versão adaptada + CTA"] },
  { num:"152", nome:"A Máquina do Tempo", emoji:"🌟", vol:2, cats:["urgencia","desejo","seguidores"], gatilho:"Visualização ativa arrependimento positivo — motivação de não repetir o erro de esperar.", estrutura:["'O que teria acontecido se você tivesse [ação] em [data]'","Progressão de resultados etapa por etapa","'Quem fez isso está hoje com...'","'Ainda dá tempo. Mas...'"], fraseBase:"'O que teria acontecido se você tivesse [AÇÃO] há [PERÍODO]?' → [PROGRESSÃO] → 'Ainda dá tempo' → CTA.", porqueFunciona:"A visualização do que poderia ter sido ativa tanto o arrependimento quanto a esperança. O 'ainda dá tempo' transforma o arrependimento em motivação.", exemplo:["O que teria acontecido se você tivesse começado a fazer musculação há 1 ano.","","Mês 1–2: Aprendendo os movimentos. Nenhuma mudança visível. Maioria desiste aqui.","Mês 3–4: Primeiros resultados na força. Roupas caindo diferente.","Mês 5–6: Mudança visível. Pessoas perguntando o que você está fazendo.","Mês 7–9: Novo patamar de energia e metabolismo.","Mês 10–12: Corpo diferente, hábito consolidado, autoconfiança que vai além da academia.","","Quem começou há 1 ano está nesse ponto agora.","Quem começar hoje estará lá em 1 ano.","Quem esperar mais vai olhar para trás com o mesmo arrependimento.","","Clique no link da bio. Tenho um guia para as primeiras 4 semanas."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 152 — A Máquina do Tempo' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Pessoas que sabem o que deveriam fazer mas adiam","- A ação que estão adiando (com resultados acumuláveis)","- Progressão etapa por etapa com dados realistas","- Tom: [motivador, sem julgamento, urgente]","","CONTEÚDO:","1. 'O que teria acontecido se você tivesse [AÇÃO] há [PERÍODO]'","2. Progressão etapa por etapa","3. 'Quem começou está nesse ponto. Quem começa agora chegará lá em [período]'","4. CTA"] },
  { num:"153", nome:"A Lista Completa do Resultado", emoji:"✅", vol:2, cats:["autoridade","conexao","leads"], gatilho:"Transparência extrema gera confiança máxima. Tudo revelado, nada escondido.", estrutura:["'Isso é tudo que faço para [resultado]'","Cada item com: o que é + por que escolheu + resultado que gera","Princípio unificador de todos os itens"], fraseBase:"'Isso é tudo que [faço/uso/como] para [RESULTADO]' → [LISTA COM LÓGICA] → [PRINCÍPIO] → CTA.", porqueFunciona:"Quando você revela tudo sem guardar segredo, a audiência percebe que o resultado é replicável — não fruto de sorte ou vantagem especial.", exemplo:["Isso é tudo que faço na primeira hora do dia","que me dá clareza e energia sem distração.","","☀️ 6h — Acordo sem alarme. Quarto com blackout e 18°C.","Alarme forçado = cortisol alto = pior rendimento matinal.","","💧 6h05 — 500ml de água antes de qualquer coisa.","Reidratação melhora a cognição em 15% nos primeiros 30 minutos.","","📝 6h15 — 3 minutos: escrevo 1 prioridade do dia. Só 1.","Elimina a paralisia de decisão.","","🚶 6h20 — 20 minutos de caminhada sem celular.","Cérebro em modo padrão = onde acontecem as melhores ideias.","","O que une tudo: proteger as primeiras horas de qualquer input externo.","","Quer a rotina completa com as referências científicas?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 153 — A Lista Completa do Resultado' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Pessoas que querem ver como você realmente opera","- Cada item da lista: [horário/item + por que escolheu + resultado]","- Nível de especificidade: [marcas, horários, quantidades — não seja vago]","","CONTEÚDO:","1. 'Isso é tudo que [faço/uso] para [RESULTADO]'","2. De 4 a 7 itens com lógica de cada um","3. 'O que une tudo isso é [PRINCÍPIO]'","4. CTA"] },
  { num:"154", nome:"O Plano que Funcionou", emoji:"📌", vol:2, cats:["conexao","autoridade","vendas"], gatilho:"Vulnerabilidade + competência. O resultado não foi sorte — foi sequência replicável de decisões.", estrutura:["Situação desafiadora com contexto real (data, prazo, consequência)","'Respirei fundo e decidi fazer um plano'","Cada etapa com detalhes reais (o quê, como, por quê assim)","Resultado com dado concreto"], fraseBase:"[SITUAÇÃO DIFÍCIL] → 'Decidi agir' → [ETAPAS DETALHADAS] → [RESULTADO] → CTA.", porqueFunciona:"O avatar se identifica com a situação difícil e admira como você agiu com método. Isso inspira porque mostra que resultado = decisões replicáveis, não talento especial.", exemplo:["Me dei conta numa segunda que tinha 60 dias para","entregar meu TCC — e ainda não tinha começado.","","Respirei fundo. Decidi parar de entrar em pânico e fazer um plano.","","Semana 1: Escolhi o tema mais próximo do que já sabia. Não o mais interessante — o mais viável.","Semana 2–3: Escrevi 300 palavras por dia. Só 300. Rascunho completo em 15 dias.","Semana 4: Mostrei para 1 pessoa para feedback brutal. Não para elogios.","Semana 5–6: Revisão e formatação. Uma seção por dia.","Semana 7–8: Preparei a apresentação oral. Apresentei 3 vezes para amigos antes da banca.","","Resultado: aprovada com nota 9,2.","","O plano não foi brilhante. Foi consistente. Consistência vence pânico.","","Se você está num prazo apertado, me manda uma mensagem."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 154 — O Plano que Funcionou' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [pessoas sob pressão de prazo]","- A situação desafiadora (específica com data/prazo)","- Cada etapa com detalhe real","- Resultado com dado concreto","- A mensagem central: [não foi brilhante, foi consistente]","","CONTEÚDO:","1. Situação desafiadora com contexto","2. 'Respirei fundo e decidi fazer um plano'","3. Etapas com detalhes reais","4. Resultado + mensagem central + CTA"] },
  { num:"155", nome:"Qual Você Escolheria?", emoji:"⚖️", vol:2, cats:["curiosidade","engajamento","autoridade"], gatilho:"A pessoa não lê — participa. Revelação contraintuitiva gera compartilhamento imediato.", estrutura:["'Qual desses você escolheria para [resultado]?'","Opção A (aparentemente óbvia) + Opção B","'Se você escolheu [A], eu entendo...'","Revelação com mecanismo real","Pergunta de engajamento nos comentários"], fraseBase:"'Qual você escolheria para [RESULTADO]?' → [A vs B] → Revelação + mecanismo → Pergunta de engajamento → CTA.", porqueFunciona:"Comparações ativam o cérebro para decisão ativa — a pessoa envolvida lembra mais e compartilha mais. O 'você estava no time A ou B?' gera onda de comentários.", exemplo:["Qual desses você escolheria para emagrecer mais rápido?","","Opção A — 45 minutos de esteira por dia","Opção B — 25 minutos de musculação por dia","","Se você escolheu a esteira, eu entendo. Faz sentido intuitivo.","","Mas: a esteira queima caloria durante o exercício.","A musculação queima durante E por até 36 horas depois — o EPOC.","","Quem combina musculação + déficit calórico tem resultados mais rápidos","e mais duradouros do que quem passa horas na esteira.","","Você era do time A ou B antes de ler isso? Comenta aqui."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 155 — Qual Você Escolheria?' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- A comparação contraintuitiva (a óbvia deve perder com lógica real)","- Por que a maioria escolhe errado","- O mecanismo real (científico, financeiro, prático)","- Pergunta de engajamento no final","","CONTEÚDO:","1. 'Qual você escolheria para [resultado]?'","2. Opção A vs B","3. 'Se você escolheu [A], eu entendo...' + revelação","4. Pergunta de engajamento + CTA"] },
  { num:"156", nome:"Resolva Se Conseguir", emoji:"🧩", vol:2, cats:["engajamento","autoridade"], gatilho:"Desafio intelectual gera engajamento massivo. Mais comentários do que posts informativos.", estrutura:["'Quero ver se você manja de [área]...'","Situação real com contexto e restrições","Opções A, B, C, D","'Comenta sua resposta. Na [dia] revelo...'","Recompensa para quem acertar"], fraseBase:"'Quero ver se você manja de [ÁREA]...' → [SITUAÇÃO REAL] → [OPÇÕES] → 'Na [dia] revelo a resposta' → [RECOMPENSA] → CTA.", porqueFunciona:"Quando você desafia a audiência a resolver um problema real, ela se envolve ativamente e volta para ver a resposta. Dois momentos de engajamento por post.", exemplo:["Quero ver se você manja de negociação salarial...","","Situação: entrevista de emprego. O recrutador pergunta:","'Qual é a sua expectativa salarial?'","Você sabe que a faixa é R$8k a R$12k. Você ganha R$7k.","","A) Fala o salário atual: R$7k","B) Diz o teto da faixa: R$12k","C) Pede para o recrutador informar a faixa primeiro","D) Diz 'estou aberto a ouvir a oferta'","","Comenta sua resposta + motivo.","Na sexta posto a análise de cada opção.","Quem acertar a lógica recebe meu guia de negociação de presente."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 156 — Resolva Se Conseguir' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Perfil: [com algum conhecimento do nicho — não iniciantes]","- A situação desafiadora (real, com contexto e restrições)","- As opções A, B, C, D (cada uma plausível)","- A recompensa para quem acertar (material real e relevante)","","CONTEÚDO:","1. 'Quero ver se você manja de [área]...'","2. Situação com contexto e restrições","3. Opções A, B, C, D","4. 'Comenta + motivo. Na [dia] revelo a resposta'","5. Recompensa específica para quem acertar"] },
  { num:"157", nome:"Testei por Você", emoji:"🔬", vol:2, cats:["autoridade","seguidores","curiosidade"], gatilho:"Surf de tendência com autoridade. Você testa e reporta com honestidade — isso aumenta alcance e credibilidade ao mesmo tempo.", estrutura:["'Tá todo mundo falando sobre [tendência] — resolvi testar por [período]'","Contexto do teste","De 3 a 5 percepções (positivas e negativas)","Veredicto honesto com condições"], fraseBase:"'Todo mundo fala sobre [TENDÊNCIA] — testei por [PERÍODO]' → [CONTEXTO] → [PERCEPÇÕES] → [VEREDICTO] → CTA.", porqueFunciona:"A honestidade aumenta credibilidade mais do que elogiar tudo. Quando você diz 'funciona, mas com condições', a audiência confia que você não está vendendo algo.", exemplo:["Tá todo mundo falando sobre usar IA para criar roteiros de vídeo.","Resolvi testar por 30 dias — aqui está minha avaliação honesta.","","1 — Para ganchos e títulos: excelente. Gera 10 variações em 30 segundos.","Economizou 40% do meu tempo nessa etapa.","","2 — Para o corpo do roteiro: mediano.","O conteúdo fica correto mas genérico. Precisa de muito ajuste.","","3 — Para personalidade e experiências pessoais: inútil.","Nenhuma IA substitui histórias reais e nuances de nicho.","","Veredicto: use IA para estrutura e velocidade — não para voz e diferenciação.","","Quer meu fluxo exato de uso da IA para conteúdo?","Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 157 — Testei por Você' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- A tendência testada (real e atual no nicho)","- Contexto do teste (situação de partida, ferramentas, período)","- De 3 a 5 percepções (positivas E negativas — seja honesto)","- Veredicto: funciona? Com quais condições?","","CONTEÚDO:","1. 'Todo mundo fala sobre [TENDÊNCIA] — testei por [PERÍODO]'","2. Contexto do teste","3. Percepções numeradas","4. Veredicto claro com condições + CTA"] },
  { num:"158", nome:"Mas Isso É Real?", emoji:"🎯", vol:2, cats:["objecao","vendas","leads"], gatilho:"Quebra a barreira do cético. Honestidade sobre condições aumenta credibilidade e conversão.", estrutura:["'É possível [resultado que parece improvável]?'","'Resposta honesta: depende. Mas sim:'","As condições reais","O mecanismo por trás","Estudo de caso real com detalhes"], fraseBase:"'É possível [RESULTADO]?' → 'Depende. Mas sim:' → [CONDIÇÕES] → [MECANISMO] → [CASO REAL] → CTA.", porqueFunciona:"Em vez de prometer resultados absolutos, você apresenta condições reais. Isso desativa a defesa do cético — que já foi enganado por promessas antes.", exemplo:["É possível aprender a programar do zero e conseguir o primeiro emprego em menos de 1 ano?","","Resposta honesta: depende. Mas para muitas pessoas, sim.","","Depende do quanto você se dedica. 2h por dia = sim. 20min por semana = não.","Depende do caminho. Lógica → 1 linguagem → portfólio real.","Depende de onde busca. Startups aceitam sem diploma muito mais.","","O Rodrigo, aluno meu de 34 anos, era motorista de aplicativo.","Em 11 meses (2h por dia), conseguiu vaga júnior de R$3.200 numa startup.","","Não é mágica. É método + consistência + caminho certo.","","Quer o roteiro que o Rodrigo seguiu? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 158 — Mas Isso É Real?' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Céticos que já foram enganados por promessas","- O resultado que parece improvável (real mas que soa bom demais)","- As condições honestas (o que determina se funciona)","- Estudo de caso real com nome e detalhes","","CONTEÚDO:","1. 'É possível [RESULTADO]?'","2. 'Resposta honesta: depende. Mas sim:'","3. Condições reais","4. Mecanismo por trás","5. Caso real com detalhes + CTA"] },
  { num:"159", nome:"Um Dia com Você", emoji:"🎬", vol:2, cats:["conexao","seguidores","autoridade"], gatilho:"Bastidores temáticos geram conexão humana profunda. A audiência sente que te conhece pessoalmente.", estrutura:["'Galera, vamos para um dia de [tema do nicho] comigo!'","O que vou mostrar (expectativa)","Cada etapa com horário + decisão por trás + aprendizado","Resultado do dia com dado concreto"], fraseBase:"'Vamos para um dia de [TEMA] comigo!' → [ETAPAS COM APRENDIZADO] → [RESULTADO] → CTA.", porqueFunciona:"Quando a audiência acompanha um dia temático, ela sente que participa da sua rotina. Quanto mais específico o tema, mais educativo e mais salvo o conteúdo.", exemplo:["Galera, vamos para um dia de lançamento de produto comigo!","","7h — Conferência do checklist pré-lançamento.","Uma falha aqui em dia de abertura custa horas de venda.","","9h — Call com a equipe para alinhar o dia.","Lançamento solo gera caos. Com protocolo, não.","","12h — 3 disparos de aquecimento para a lista.","Não é anúncio de venda. É conteúdo de valor com CTA suave.","","19h — Live de lançamento. 1h de conteúdo + 30min de pitch.","Pitch antes de conteúdo = abandono. Conteúdo antes de pitch = confiança.","","21h — Resultado do dia: R$47.200 em vendas.","","Esse modelo usa 1 live, não 4. Por isso chamo de Lançamento Sniper.","","Quer o protocolo completo? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 159 — Um Dia com Você' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Pessoas que querem ver a rotina real do nicho","- O tema do dia (específico — não 'um dia normal')","- Cada etapa com horário + decisão + aprendizado","- Resultado com dado concreto","","CONTEÚDO:","1. 'Vamos para um dia de [TEMA] comigo!'","2. O que a audiência vai ver","3. Etapas com horário + lógica + aprendizado","4. Resultado + nome do método/diferencial + CTA"] },
  { num:"160", nome:"O Legado da Referência", emoji:"🏆", vol:2, cats:["autoridade","desejo"], gatilho:"Credibilidade da maior referência do nicho emprestada ao seu método.", estrutura:["'[Autoridade máxima] fazia [comportamento específico]'","Contexto e resultado dessa figura","O princípio universal por trás","'Para o [perfil do público], isso significa...' + versão acessível"], fraseBase:"'[AUTORIDADE] fazia [COMPORTAMENTO]' → [CONTEXTO + PRINCÍPIO] → 'Para você, isso se traduz em...' → CTA.", porqueFunciona:"Quando você explica o que a maior referência fazia e conecta ao seu método, você se posiciona no mesmo patamar de conhecimento com credibilidade emprestada.", exemplo:["Warren Buffet passou mais de 5 anos analisando empresas sem comprar uma ação.","","Não era hesitação. Era paciência estratégica.","","Ele tem uma regra chamada 'Círculo de Competência':","só investe no que entende profundamente. Nada fora desse círculo.","","É por isso que ficou de fora da bolha das pontocom nos anos 90","enquanto outros perdiam fortunas.","","O princípio: o maior risco não é perder uma oportunidade.","É entrar em algo que você não entende.","","Para o investidor iniciante, isso se traduz:","domine 2 ou 3 tipos de ativo antes de diversificar.","Tesouro, FIIs e ações de dividendos. Esse triângulo constrói patrimônio.","","Quer o guia de como montar esse triângulo do zero? Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 160 — O Legado da Referência' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- A autoridade máxima do nicho (verificável — não invente)","- O comportamento específico e pouco conhecido (real)","- A lógica e o princípio universal","- A versão acessível para o público","","CONTEÚDO:","1. '[Autoridade] fazia [comportamento verificável]'","2. Contexto + princípio universal","3. 'Para o [perfil], isso significa...' + versão acessível","4. CTA"] },
  { num:"161", nome:"A Lista de Erros Fatais", emoji:"⚠️", vol:2, cats:["urgencia","leads","vendas"], gatilho:"O formato mais salvo da internet. Quem vai agir busca exatamente esse conteúdo antes de começar.", estrutura:["'Não faça isso em [situação importante]'","Erro 1 + motivo + consequência + como evitar","Erro 2 + motivo + consequência","Erro 3+ (de 3 a 6 erros)"], fraseBase:"'Não faça isso em [SITUAÇÃO]' → Erro + motivo + consequência → ... → CTA com o caminho correto.", porqueFunciona:"Alta intenção de ação nas pessoas que engajam. Quem está prestes a tomar uma decisão vai buscar 'o que não fazer' antes de agir — é o momento perfeito para a oferta.", exemplo:["Não faça isso antes de lançar seu primeiro produto digital.","","Erro 1: Lançar sem validar.","Criar o produto completo sem saber se alguém vai pagar é o erro mais caro.","A solução: pré-venda. Colete pagamento, depois entregue.","","Erro 2: Precificar pelo esforço.","O preço não é sobre seu trabalho. É sobre o resultado que o cliente percebe.","","Erro 3: Lançar para todo mundo.","Quanto mais específico o avatar, mais alta a conversão.","'Emagrecimento para mulheres acima dos 40 com metabolismo lento' vende mais","do que 'emagrecimento'.","","Erro 4: Ignorar a página de vendas.","Produto incrível + página fraca = venda perdida.","","Tenho um checklist completo de pré-lançamento. Clique no link da bio."], prompt:["Você é especialista em copywriting para redes sociais.","Crie um post 'Código 161 — A Lista de Erros Fatais' para o nicho de [NICHO].","","PÚBLICO-ALVO:","- Pessoas prestes a tomar uma ação importante (primeira vez)","- Os erros reais mais comuns (pesquise em comentários e DMs)","- Para cada erro: o que fazem + por que é erro + consequência + como evitar","","CONTEÚDO:","1. 'Não faça isso [em situação específica]'","2. Para cada erro (3 a 6): nome + por que é erro + consequência + como evitar","3. 'Para evitar tudo isso, tenho [material]' + CTA"] },
];

// ── MODAL ────────────────────────────────────────────────────────────────────
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
        {/* HEADER MODAL */}
        <div style={{ ...M.mHeader, borderBottom: `3px solid ${cat?.cor || "#0F766E"}` }}>
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
          {/* CATEGORIAS */}
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

          {/* POR QUE FUNCIONA */}
          <div style={M.section}>
            <div style={M.sectionTitle}>⚡ POR QUE FUNCIONA</div>
            <div style={{ ...M.box, backgroundColor: "#1C1400", borderLeft: `3px solid #B45309` }}>
              <p style={{ margin: 0, color: "#FDE68A", fontSize: 14, lineHeight: 1.7 }}>{codigo.gatilho}</p>
            </div>
          </div>

          {/* ESTRUTURA GUIADA */}
          <div style={M.section}>
            <div style={M.sectionTitle}>📐 ESTRUTURA GUIADA</div>
            <div style={{ ...M.box, backgroundColor: "#0D1F2D", borderLeft: `3px solid #0369A1` }}>
              {codigo.estrutura.map((l, i) => (
                <div key={i} style={{ marginBottom: 6, color: "#BAE6FD", fontSize: 14, lineHeight: 1.6 }}>
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* FRASE BASE */}
          <div style={M.section}>
            <div style={M.sectionTitle}>✏️ FRASE BASE</div>
            <div style={{ ...M.box, backgroundColor: "#0A1628", borderLeft: `3px solid ${cat?.cor}` }}>
              <p style={{ margin: 0, color: "#E2E8F0", fontSize: 14, lineHeight: 1.7, fontFamily: "monospace" }}>
                {codigo.fraseBase}
              </p>
            </div>
          </div>

          {/* EXEMPLO COMPLETO */}
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

          {/* PROMPT */}
          <div style={M.section}>
            <div style={M.sectionTitle}>🤖 PROMPT PRONTO PARA IA</div>
            <div style={{ ...M.box, backgroundColor: "#0A0A1A" }}>
              {codigo.prompt.map((l, i) => (
                <div key={i} style={{ color: l.startsWith("-") ? "#94A3B8" : l === "" ? "transparent" : l.endsWith(":") ? "#00D4AA" : "#E2E8F0", fontSize: 12, lineHeight: 1.7, marginBottom: l === "" ? 4 : 1, fontFamily: "monospace" }}>
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

// ── DASHBOARD PRINCIPAL ───────────────────────────────────────────────────────
export default function Dashboard() {
  const [catAtiva, setCatAtiva]   = useState("todos");
  const [busca, setBusca]         = useState("");
  const [volFiltro, setVolFiltro] = useState("todos");
  const [modalCodigo, setModalCodigo] = useState(null);
  const [animando, setAnimando]   = useState(false);

  const filtrados = codigos.filter(c => {
    const matchCat  = catAtiva === "todos" || c.cats.includes(catAtiva);
    const matchVol  = volFiltro === "todos" || String(c.vol) === volFiltro;
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

  return (
    <div style={D.root}>
      {modalCodigo && <Modal codigo={modalCodigo} onClose={() => setModalCodigo(null)} />}

      {/* HEADER */}
      <div style={D.header}>
        <div style={D.headerInner}>
          <span style={{ fontSize: 28 }}>🔐</span>
          <div>
            <h1 style={D.titulo}>Códigos Secretos da Atenção</h1>
            <p style={D.subtitulo}>61 estruturas · 2 volumes · organizadas por objetivo</p>
          </div>
          <div style={D.badge}>
            <span style={D.badgeNum}>{filtrados.length}</span>
            <span style={D.badgeLabel}>códigos</span>
          </div>
        </div>
      </div>

      <div style={D.body}>
        {/* SIDEBAR */}
        <aside style={D.sidebar}>
          <div style={D.sidebarTitle}>OBJETIVO DO CONTEÚDO</div>
          {categorias.map(cat => {
            const ativa = catAtiva === cat.id;
            return (
              <button key={cat.id} onClick={() => mudarCat(cat.id)} style={{
                ...D.catBtn,
                backgroundColor: ativa ? cat.cor + "22" : "transparent",
                borderLeft: `3px solid ${ativa ? cat.cor : "transparent"}`,
                color: ativa ? "#f1f5f9" : "#94a3b8",
                fontWeight: ativa ? 700 : 400,
              }}>
                <span>{cat.emoji}</span>
                <span style={{ flex: 1, fontSize: 13 }}>{cat.label}</span>
                <span style={{ ...D.catCount, backgroundColor: ativa ? cat.cor + "33" : "#1e293b", color: ativa ? "#fff" : "#64748b" }}>
                  {contagemPorCat(cat.id)}
                </span>
              </button>
            );
          })}

          <div style={{ marginTop: 24 }}>
            <div style={D.sidebarTitle}>VOLUME</div>
            {[["todos", "Todos"], ["1", "Vol. 1 · 101–130"], ["2", "Vol. 2 · 131–161"]].map(([v, label]) => (
              <button key={v} onClick={() => setVolFiltro(v)} style={{
                ...D.volBtn,
                backgroundColor: volFiltro === v ? "#1e293b" : "transparent",
                color: volFiltro === v ? "#e2e8f0" : "#64748b",
                borderColor: volFiltro === v ? "#334155" : "transparent",
              }}>{label}</button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main style={D.main}>
          <div style={D.topBar}>
            <div style={D.buscaWrap}>
              <span style={{ color: "#475569", fontSize: 18 }}>⌕</span>
              <input style={D.buscaInput} placeholder="Buscar por nome, número ou gatilho..." value={busca} onChange={e => setBusca(e.target.value)} />
              {busca && <button style={D.buscaClear} onClick={() => setBusca("")}>×</button>}
            </div>
            <div style={D.infoTag}>
              <span style={{ color: catAtual?.cor || "#64748b" }}>{catAtual?.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>{catAtual?.label}</span>
              <span style={{ fontSize: 12, color: "#64748b", backgroundColor: "#1e293b", borderRadius: 20, padding: "1px 8px" }}>
                {filtrados.length} código{filtrados.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div style={{ ...D.grid, opacity: animando ? 0 : 1, transform: animando ? "translateY(8px)" : "translateY(0)", transition: "opacity .15s, transform .15s" }}>
            {filtrados.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 40px", color: "#475569" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div>Nenhum código encontrado</div>
              </div>
            ) : filtrados.map(c => {
              return (
                <div key={c.num} style={D.card} onClick={() => setModalCodigo(c)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 18 }}>{c.emoji}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#5eead4", fontFamily: "monospace" }}>{c.num}</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", backgroundColor: "#1e293b", borderRadius: 4, padding: "2px 6px" }}>
                      Vol. {c.vol}
                    </span>
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
                  <div style={{ fontSize: 11, color: "#5eead4", textAlign: "right", borderTop: "1px solid #1e293b", paddingTop: 8, marginTop: "auto" }}>
                    Clique para abrir o roteiro completo →
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <div style={D.footer}>
        <span>Códigos Secretos da Atenção · Lorena do Marketing</span>
        <span style={{ color: "#334155" }}>Vol. 1: 101–130 · Vol. 2: 131–161</span>
      </div>
    </div>
  );
}

// ── ESTILOS ──────────────────────────────────────────────────────────────────
const D = {
  root:        { minHeight:"100vh", backgroundColor:"#060C18", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#e2e8f0", display:"flex", flexDirection:"column" },
  header:      { backgroundColor:"#0A1120", borderBottom:"1px solid #1e293b", padding:"18px 24px", position:"sticky", top:0, zIndex:40 },
  headerInner: { maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"center", gap:14 },
  titulo:      { margin:0, fontSize:21, fontWeight:800, letterSpacing:"-0.5px", color:"#f1f5f9" },
  subtitulo:   { margin:"2px 0 0", fontSize:12, color:"#64748b" },
  badge:       { marginLeft:"auto", display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"#1e293b", borderRadius:10, padding:"6px 14px", border:"1px solid #334155" },
  badgeNum:    { fontSize:22, fontWeight:800, color:"#5eead4", lineHeight:1.1 },
  badgeLabel:  { fontSize:10, color:"#64748b", textTransform:"uppercase", letterSpacing:1 },
  body:        { flex:1, display:"flex", maxWidth:1400, margin:"0 auto", width:"100%", paddingBottom:40 },
  sidebar:     { width:220, flexShrink:0, padding:"20px 14px", borderRight:"1px solid #1e293b", position:"sticky", top:60, alignSelf:"flex-start", maxHeight:"calc(100vh - 60px)", overflowY:"auto" },
  sidebarTitle:{ fontSize:10, fontWeight:700, letterSpacing:1.5, color:"#475569", marginBottom:8, paddingLeft:6 },
  catBtn:      { display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 8px", border:"none", borderRadius:7, cursor:"pointer", marginBottom:2, transition:"all 0.15s", textAlign:"left" },
  catCount:    { fontSize:11, borderRadius:20, padding:"1px 7px", fontWeight:700, flexShrink:0 },
  volBtn:      { display:"block", width:"100%", padding:"7px 8px", border:"1px solid", borderRadius:7, cursor:"pointer", marginBottom:4, fontSize:12, textAlign:"left", transition:"all .15s" },
  main:        { flex:1, padding:"20px 24px", minWidth:0 },
  topBar:      { display:"flex", alignItems:"center", gap:10, marginBottom:18, flexWrap:"wrap" },
  buscaWrap:   { flex:1, minWidth:200, display:"flex", alignItems:"center", backgroundColor:"#0A1120", border:"1px solid #1e293b", borderRadius:9, padding:"0 12px", gap:8 },
  buscaInput:  { flex:1, background:"none", border:"none", outline:"none", color:"#e2e8f0", fontSize:14, padding:"10px 0" },
  buscaClear:  { background:"none", border:"none", color:"#64748b", cursor:"pointer", fontSize:18, padding:"0 4px" },
  infoTag:     { display:"flex", alignItems:"center", gap:8, backgroundColor:"#0A1120", border:"1px solid #1e293b", borderRadius:9, padding:"8px 14px", flexShrink:0 },
  grid:        { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px, 1fr))", gap:12 },
  card:        { backgroundColor:"#0A1120", border:"1px solid #1e293b", borderRadius:12, padding:"16px", cursor:"pointer", transition:"border-color 0.15s, transform 0.15s", display:"flex", flexDirection:"column" },
  footer:      { borderTop:"1px solid #1e293b", padding:"12px 24px", display:"flex", justifyContent:"space-between", fontSize:12, color:"#475569" },
};

const M = {
  overlay: { position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.8)", zIndex:100, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"24px 16px", overflowY:"auto" },
  modal:   { backgroundColor:"#0D1627", border:"1px solid #1e293b", borderRadius:16, width:"100%", maxWidth:720, boxShadow:"0 24px 80px rgba(0,0,0,0.6)" },
  mHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px 16px" },
  mHeaderLeft: { display:"flex", alignItems:"center", gap:12 },
  mEmoji:  { fontSize:32 },
  mNum:    { fontSize:11, fontWeight:700, letterSpacing:1, color:"#5eead4", marginBottom:2 },
  mNome:   { fontSize:20, fontWeight:800, color:"#f1f5f9" },
  closeBtn:{ background:"none", border:"1px solid #334155", borderRadius:8, color:"#94a3b8", cursor:"pointer", fontSize:16, padding:"6px 10px", flexShrink:0 },
  mBody:   { padding:"0 24px 28px" },
  tagRow:  { display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 },
  tag:     { fontSize:11, fontWeight:600, borderRadius:5, padding:"3px 9px", border:"1px solid" },
  section: { marginBottom:18 },
  sectionTitle: { fontSize:11, fontWeight:700, letterSpacing:1.2, color:"#475569", marginBottom:8 },
  box:     { borderRadius:8, padding:"12px 16px" },
};
