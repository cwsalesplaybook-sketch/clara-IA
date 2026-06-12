/* ============================================================
   ClarIA — Base de Conhecimento
   Fonte: Documentos internos Cardápio Web (Jun/2026)
   ============================================================ */

const CLARIA_KB = {

  /* ----------------------------------------------------------
     ENTRADAS BUILT-IN
     type: "A" = produto/preço/processo
           "B" = contorno de objeção
           "C" = direcionamento / o que fazer
  ---------------------------------------------------------- */
  entries: [

    // ========================================================
    // TIPO A — PRODUTO, PREÇOS E PROCESSOS
    // ========================================================

    {
      id: "a_planos_geral",
      type: "A",
      tags: ["plano", "planos", "preço", "preços", "valor", "valores", "quanto", "custa", "custo", "tabela", "mensalidade"],
      question: "quais são os planos e preços?",
      answer: `💰 PLANOS CARDÁPIO WEB

Plano Mesas — R$ 169,99/mês
→ Anual: R$ 139,99/mês (economiza R$ 360/ano)

Plano Delivery — R$ 209,99/mês
→ Anual: R$ 179,99/mês (economiza R$ 360/ano)

Plano Premium — R$ 269,99/mês
→ Anual: R$ 239,99/mês (economiza R$ 360/ano)

🗓 O plano anual é cobrado mensalmente — só que com desconto. Não é pagar tudo de uma vez.`
    },

    {
      id: "a_plano_mesas",
      type: "A",
      tags: ["plano mesas", "mesas", "mesa", "cardápio mesa", "qr code mesa"],
      question: "o que tem no plano mesas?",
      answer: `📋 PLANO MESAS — R$ 169,99/mês

O que inclui:
• Cardápio digital com QR Code + link próprio
• Pedidos ilimitados pela mesa
• Painel administrativo completo
• Relatórios de vendas
• Suporte humano

⚠️ NÃO inclui:
• ChatBot WhatsApp
• Programa de fidelidade
• Pagamento online (Pix/cartão)
• Extensão WhatsApp Web
• Disparador de mensagens em massa

Para delivery e mais recursos → Plano Delivery ou Premium.`
    },

    {
      id: "a_plano_delivery",
      type: "A",
      tags: ["plano delivery", "delivery", "entrega", "whatsapp", "pedido online"],
      question: "o que tem no plano delivery?",
      answer: `🛵 PLANO DELIVERY — R$ 209,99/mês

Tudo do Mesas, MAIS:
• Cardápio digital para delivery
• ChatBot WhatsApp (pedidos automatizados)
• Pagamento online (Pix + cartão na entrega + link)
• Programa de fidelidade (cashback e pontos)
• Extensão WhatsApp Web
• Disparador de mensagens em massa

Ideal para quem faz delivery ou quer atender pelo WhatsApp com pedidos automatizados.`
    },

    {
      id: "a_plano_premium",
      type: "A",
      tags: ["plano premium", "premium", "completo", "tudo", "melhor plano"],
      question: "o que tem no plano premium?",
      answer: `👑 PLANO PREMIUM — R$ 269,99/mês

Tudo do Delivery, MAIS:
• Totem de autoatendimento (módulo incluso)
• Gestão financeira avançada (DRE + fluxo de caixa)
• Estoque avançado
• Roteirização de entregas
• KDS (Kitchen Display System)
• Controle remoto para garçons

É o plano mais completo para quem quer escalar a operação.`
    },

    {
      id: "a_plano_anual",
      type: "A",
      tags: ["anual", "plano anual", "parcelado", "parcelar", "12 meses", "mensal anual", "forma pagamento"],
      question: "como funciona o plano anual?",
      answer: `📅 PLANO ANUAL — Como funciona

O plano anual NÃO é pago de uma vez.

É cobrado mensalmente, mas com desconto fixo:
• Mesas: R$ 139,99/mês (vs R$ 169,99 mensal)
• Delivery: R$ 179,99/mês (vs R$ 209,99 mensal)
• Premium: R$ 239,99/mês (vs R$ 269,99 mensal)

Economia anual: ~R$ 360 em qualquer plano.

O compromisso é de 12 meses com desconto garantido.`
    },

    {
      id: "a_totem",
      type: "A",
      tags: ["totem", "autoatendimento", "terminal", "kiosk", "self service", "totem autoatendimento"],
      question: "temos totem de autoatendimento?",
      answer: `🖥️ TOTEM DE AUTOATENDIMENTO

Sim! A Cardápio Web tem módulo de totem.

O totem permite que o cliente faça o pedido sozinho, sem precisar de atendente. Reduz fila, diminui erros e aumenta ticket médio.

Disponível como:
• Módulo adicional nos planos Mesas e Delivery
• Incluso no Plano Premium

Funciona em tablets ou totens touchscreen. O restaurante mantém controle total pelo painel.`
    },

    {
      id: "a_chatbot",
      type: "A",
      tags: ["chatbot", "chat bot", "whatsapp bot", "bot whatsapp", "pedido whatsapp", "automatico", "automático"],
      question: "como funciona o chatbot do whatsapp?",
      answer: `💬 CHATBOT WHATSAPP

O ChatBot da CW automatiza o recebimento de pedidos pelo WhatsApp.

O cliente envia uma mensagem → o bot apresenta o cardápio → cliente escolhe → pedido vai direto para o painel.

Benefícios:
• Recebe pedidos 24h sem precisar de atendente
• Zero pedido perdido
• Integrado com pagamento online (Pix, cartão)
• Histórico completo de pedidos

Disponível nos planos Delivery e Premium.`
    },

    {
      id: "a_disparador",
      type: "A",
      tags: ["disparador", "disparo", "mensagem massa", "marketing whatsapp", "campanha", "promoção whatsapp"],
      question: "como funciona o disparador de mensagens?",
      answer: `📣 DISPARADOR DE MENSAGENS EM MASSA

Permite enviar mensagens personalizadas para toda a base de clientes via WhatsApp.

Casos de uso:
• Promoções e campanhas
• Reativação de clientes inativos
• Avisos de cardápio novo
• Black Friday / datas especiais

O restaurante escolhe o público (todos, só quem pediu nos últimos 30 dias, etc.) e dispara em segundos.

Disponível nos planos Delivery e Premium.`
    },

    {
      id: "a_fidelidade",
      type: "A",
      tags: ["fidelidade", "programa fidelidade", "cashback", "pontos", "desconto cliente", "fidelizar"],
      question: "como funciona o programa de fidelidade?",
      answer: `🎁 PROGRAMA DE FIDELIDADE

O módulo de fidelidade permite criar um programa de pontos ou cashback para os clientes.

Como funciona:
• Cliente acumula pontos/cashback a cada pedido
• O restaurante define as regras (ex: R$1 = 1 ponto)
• Cliente resgata por desconto ou produto grátis
• Tudo automático, sem trabalho manual

Impacto: aumenta recorrência de compra e ticket médio.

Disponível nos planos Delivery e Premium.`
    },

    {
      id: "a_pagamento_online",
      type: "A",
      tags: ["pagamento online", "pix", "cartão", "pagamento", "link pagamento", "cobrar online"],
      question: "tem pagamento online?",
      answer: `💳 PAGAMENTO ONLINE

Sim! A CW tem integração nativa de pagamento:

• Pix (com QR Code gerado automaticamente)
• Link de pagamento
• Cartão na entrega (registrado no sistema)

O cliente paga antes de o pedido ser aceito → zero calote, zero troco.

O valor cai diretamente na conta do restaurante (sem intermediário da CW).

Disponível nos planos Delivery e Premium.`
    },

    {
      id: "a_modulo_fiscal",
      type: "A",
      tags: ["módulo fiscal", "nota fiscal", "nfe", "nfce", "cupom fiscal", "fiscal", "imposto", "nota"],
      question: "tem módulo fiscal / nota fiscal?",
      answer: `🧾 MÓDULO FISCAL

Sim, a CW tem módulo fiscal integrado.

Funcionalidade:
• Emissão de NF-e e NFC-e
• Integrado direto ao pedido
• Configuração por tipo de produto/tributação

É um módulo adicional (não incluso nos planos base).
Valor: consultar com o closer.

Ideal para quem precisa emitir nota em cada venda.`
    },

    {
      id: "a_gestao_financeira",
      type: "A",
      tags: ["financeiro", "financeira", "dre", "fluxo caixa", "relatório financeiro", "gestão financeira"],
      question: "tem gestão financeira?",
      answer: `📊 GESTÃO FINANCEIRA

Sim! A CW tem módulo de gestão financeira.

Inclui:
• DRE (Demonstrativo de Resultados)
• Fluxo de caixa
• Contas a pagar/receber
• Relatórios por período

Incluso no Plano Premium.
Disponível como módulo adicional nos demais planos.`
    },

    {
      id: "a_estoque",
      type: "A",
      tags: ["estoque", "inventário", "controle estoque", "insumo", "produto", "gestão estoque"],
      question: "tem controle de estoque?",
      answer: `📦 GESTÃO DE ESTOQUE

Sim, a CW tem módulo de estoque avançado.

Funcionalidades:
• Controle de insumos por produto
• Baixa automática a cada pedido
• Alertas de estoque mínimo
• Relatórios de consumo

Incluso no Plano Premium.
Disponível como módulo adicional nos demais planos.`
    },

    {
      id: "a_kds",
      type: "A",
      tags: ["kds", "kitchen display", "tela cozinha", "monitor cozinha", "comanda digital"],
      question: "tem KDS / tela da cozinha?",
      answer: `👨‍🍳 KDS — KITCHEN DISPLAY SYSTEM

Sim! A CW tem KDS integrado.

O KDS substitui o papel/comanda impressa. Os pedidos aparecem em tempo real na tela da cozinha assim que são feitos.

Benefícios:
• Zero pedido perdido
• Controle de tempo de preparo
• Priorização de pedidos
• Integrado com o fluxo de entrega

Disponível como módulo adicional ou incluso no Plano Premium.`
    },

    {
      id: "a_garantia",
      type: "A",
      tags: ["garantia", "reembolso", "devolver", "dinheiro de volta", "cancelar", "risco", "segurança"],
      question: "tem garantia? posso cancelar e receber de volta?",
      answer: `🛡️ GARANTIA DE 30 DIAS

Sim! A Cardápio Web oferece 30 dias de garantia incondicional.

Se em 30 dias o restaurante não estiver satisfeito, devolvemos 100% do valor pago. Sem burocracia, sem justificativa obrigatória.

Isso significa: o risco de testar a plataforma é zero para o cliente.

Use esse argumento quando o lead quiser "testar antes de comprar" — a garantia é o nosso teste grátis.`
    },

    {
      id: "a_sem_trial",
      type: "A",
      tags: ["trial", "teste grátis", "período teste", "testar grátis", "demo", "grátis"],
      question: "tem teste grátis / trial?",
      answer: `❌ TRIAL

A CW não tem período de teste gratuito.

O que temos em vez disso: 30 dias de GARANTIA TOTAL.

O lead contrata, usa por 30 dias. Se não gostar, devolve 100% do dinheiro. Sem risco.

Isso é melhor que um trial porque:
1. O cardápio fica no ar de verdade (clientes reais)
2. O suporte está ativo desde o dia 1
3. Não tem versão "limitada" — é o produto completo`
    },

    {
      id: "a_prazo_cardapio",
      type: "A",
      tags: ["prazo", "quando fica no ar", "quanto tempo", "ativar", "configurar", "setup"],
      question: "em quanto tempo o cardápio fica no ar?",
      answer: `⚡ PRAZO PARA CARDÁPIO NO AR

O cardápio digital pode ficar no ar no mesmo dia da contratação.

Processo:
1. Cliente contrata
2. Acessa o painel
3. Cadastra produtos (ou importa do iFood)
4. Publica o QR Code / link

Em menos de 24h o restaurante já recebe pedidos.

Tem suporte dedicado na configuração inicial.`
    },

    {
      id: "a_sede",
      type: "A",
      tags: ["sede", "fortaleza", "ceará", "onde fica", "empresa", "de onde", "localização"],
      question: "de onde é a cardápio web?",
      answer: `🏠 CARDÁPIO WEB

A Cardápio Web foi fundada em 2020 e tem sede em Fortaleza, Ceará.

É uma empresa 100% brasileira, focada no mercado de food service nacional.

Atende restaurantes em todo o Brasil com suporte em português.

CEO: Glauton Santos.
Missão: construir um mercado de food melhor para todos.
Visão: ser o e-commerce dos restaurantes do mundo até 2040.`
    },

    {
      id: "a_suporte",
      type: "A",
      tags: ["suporte", "atendimento", "ajuda", "problema", "contato", "horário suporte"],
      question: "como funciona o suporte?",
      answer: `🎧 SUPORTE

A CW tem suporte humano, não apenas bot.

Canais:
• Chat dentro da plataforma
• WhatsApp
• Central de ajuda com tutoriais

O suporte acompanha a configuração inicial do restaurante para garantir que o cardápio suba corretamente.

É um diferencial forte frente a plataformas que só têm FAQ ou suporte lento.`
    },

    {
      id: "a_agendamento",
      type: "A",
      tags: ["agendamento", "meetime", "google agenda", "agendar", "reunião", "video chamada", "link"],
      question: "como funciona o processo de agendamento?",
      answer: `📅 PROCESSO DE AGENDAMENTO

Fluxo padrão CW:
1. SDR prospecta e qualifica o lead
2. SDR agenda video chamada (Meetime ou Google Agenda)
3. Closer faz a demo + apresentação dos planos
4. Closer fecha o contrato

Como agendar:
• Use o link do Meetime ou Google Agenda
• Confirme via WhatsApp 30 min antes
• Passe as informações do lead para o closer pelo sistema`
    },

    {
      id: "a_bastao",
      type: "A",
      tags: ["passagem bastão", "bastão", "closer", "passagem", "reunião marcada", "o que passar", "informações closer"],
      question: "o que passar para o closer na passagem de bastão?",
      answer: `🤝 PASSAGEM DE BASTÃO PARA O CLOSER

Informações obrigatórias:
• Nome completo do lead
• WhatsApp (com DDD)
• Tipo de estabelecimento (restaurante, hamburgueria, pizzaria...)
• Tem delivery? Faz quantos pedidos/mês aprox?
• Usa algum sistema hoje? Qual?
• Dor principal mencionada
• Objeções já levantadas
• Nível de interesse (quente / morno / frio)

Registre tudo no CRM antes de passar. O closer chega na reunião preparado.`
    },

    {
      id: "a_integracao_ifood",
      type: "A",
      tags: ["ifood", "integração ifood", "marketplace", "rappi", "uber eats", "integra"],
      question: "integra com iFood?",
      answer: `🔗 INTEGRAÇÃO COM iFood / MARKETPLACES

A CW tem integração com iFood para importação de cardápio.

O restaurante pode importar os produtos do iFood para a CW com poucos cliques, acelerando a configuração.

Importante: a CW não é um gestor de pedidos de marketplace. Ela é o canal de vendas PRÓPRIO do restaurante (sem comissão por pedido).

O objetivo é que o restaurante deixe de depender do iFood e tenha seu próprio canal lucrativo.`
    },

    {
      id: "a_extensao_whatsapp",
      type: "A",
      tags: ["extensão whatsapp", "extensão wpp", "whatsapp web", "ver pedidos whatsapp"],
      question: "tem extensão do whatsapp web?",
      answer: `📱 EXTENSÃO WHATSAPP WEB

Sim! A CW tem uma extensão para Chrome que funciona dentro do WhatsApp Web.

Com ela, o atendente visualiza os pedidos diretamente na conversa do WhatsApp, sem precisar alternar entre telas.

Disponível nos planos Delivery e Premium.`
    },

    {
      id: "a_desconto",
      type: "A",
      tags: ["desconto", "negociar", "negociação", "promoção", "melhor preço", "reduzir valor"],
      question: "posso dar desconto ou negociar?",
      answer: `💡 NEGOCIAÇÃO E DESCONTOS

A tabela de preços é padrão para todos os clientes.

O que você pode oferecer:
• Plano anual (desconto já embutido de ~R$30/mês)
• Combinação de plano que faça mais sentido pro negócio

Descontos fora da tabela ou condições especiais precisam de aprovação. Não prometa algo que não está na tabela sem confirmar antes.

O argumento mais forte não é o preço — é o valor entregue vs. o custo do iFood.`
    },


    // ========================================================
    // TIPO B — CONTORNO DE OBJEÇÕES
    // ========================================================

    // --- OBJEÇÕES DE VALOR / PREÇO (Tipo A) ---

    {
      id: "b_a1_so_preco",
      type: "B",
      subtype: "valor",
      tags: ["só preço", "me passa o preço", "qual o valor", "antes da reunião", "preço primeiro", "fala o preço logo"],
      question: "lead quer só saber o preço antes de marcar reunião",
      situation: "A1 — Lead quer o preço antes da apresentação",
      answer: `"Entendo que você quer saber o valor — e eu quero te dar isso. Mas o preço certo depende do que faz sentido pro seu negócio.

Me responde 3 perguntas rápidas: você faz delivery? Tem quantas mesas? Já usa algum sistema hoje?

Com isso eu já te digo o plano exato e o valor. Pode ser?"`
    },

    {
      id: "b_a2_achou_caro",
      type: "B",
      subtype: "valor",
      tags: ["caro", "achei caro", "muito caro", "preço alto", "tá caro", "ficou caro", "achou caro", "está caro"],
      question: "lead achou caro após apresentação",
      situation: "A2 — Lead achou caro após a apresentação",
      answer: `"Entendi, faz sentido questionar. Me deixa te perguntar uma coisa: caro em relação a quê?

[Aguarda resposta]

Nosso plano Delivery custa R$209,99/mês — menos de R$7 por dia. Se o seu cardápio próprio trouxer apenas 3 pedidos extras por semana, você já paga a plataforma. O resto é lucro 100% seu, sem comissão de marketplace.

Você paga quanto de comissão no iFood hoje? [Aguarda] Com a CW você não paga nada por pedido — o canal é seu.

Faz sentido a gente dar o próximo passo e você ver como funciona na prática?"`
    },

    {
      id: "b_a3_mais_barato",
      type: "B",
      subtype: "valor",
      tags: ["mais barato", "tem mais barato", "plataforma barata", "concorrente barato", "encontrei mais barato"],
      question: "lead diz que tem plataforma mais barata no mercado",
      situation: "A3 — Lead diz que tem sistema mais barato no mercado",
      answer: `"Faz todo sentido você comparar — qualquer empresário inteligente faz isso.

Me conta: essa plataforma que você mencionou, ela tem ChatBot pra pedido pelo WhatsApp? Programa de fidelidade? Pagamento online integrado?

[Aguarda]

Preço mais baixo normalmente significa menos recurso ou suporte ruim. E quando você precisar de ajuda às 20h num sábado, o que acontece?

A Cardápio Web tem suporte humano incluído. Sem custo extra. Isso tem valor pro seu dia a dia?"`
    },

    {
      id: "b_a4_pequeno_comecando",
      type: "B",
      subtype: "valor",
      tags: ["começando agora", "negócio pequeno", "pouco dinheiro", "pequeno demais", "pequena", "acabei de abrir", "novo negócio", "começando"],
      question: "lead está começando agora ou é negócio pequeno",
      situation: "A4 — Lead está começando ou tem negócio pequeno",
      answer: `"Entendo, e é exatamente por isso que faz sentido você entrar agora.

Quem começa com cardápio digital próprio desde o início educa o cliente a pedir no canal certo — e não fica dependente do iFood depois.

Começar pequeno na CW é mais fácil que migrar depois com centenas de clientes acostumados a pedir no marketplace.

E o plano Mesas começa em R$169,99/mês — menos de R$6 por dia. Vale marcar 20 minutinhos pra você ver como fica pro seu negócio específico?"`
    },

    {
      id: "b_a5_valor_diferente",
      type: "B",
      subtype: "valor",
      tags: ["outro vendedor", "me passaram outro valor", "valor diferente", "mais barato antes", "preço diferente", "me falaram outro preço"],
      question: "outro vendedor passou valor menor",
      situation: "A5 — Lead afirma que outro vendedor passou valor diferente/menor",
      answer: `"Entendo. Pode ter sido um plano diferente, um período promocional ou um módulo específico.

Me conta: o que te foi apresentado na época? Qual plano? O que estava incluso?

[Aguarda]

Posso te mostrar exatamente o que está incluído em cada plano e comparar. Quero garantir que você está tomando a decisão com informação correta, não com um número solto.

Que tal a gente reservar 20 minutos para eu apresentar direito?"`
    },

    {
      id: "b_a6_pagar_tudo",
      type: "B",
      subtype: "valor",
      tags: ["pagar tudo", "pagar de uma vez", "12 meses", "anual a vista", "de uma vez", "não quero parcelar"],
      question: "quer plano anual mas não quer parcelar mensalmente",
      situation: "A6 — Lead quer anual mas quer pagar tudo de uma vez",
      answer: `"Entendi — você prefere pagar o anual de uma só vez em vez de mensalmente.

O parcelamento mensal existe para facilitar o fluxo de caixa do restaurante, mas entendo que pode ser diferente pra você.

Para condições de pagamento específicas como essa, preciso alinhar com o time. Me deixa verificar e já te retorno?

[Se viável] Posso confirmar com o responsável e te falo em breve. O que acha de marcar a reunião enquanto isso e você já vê o sistema?"`
    },

    {
      id: "b_a7_amigo_paga_menos",
      type: "B",
      subtype: "valor",
      tags: ["amigo", "conhecido", "paga menos", "paga mais barato", "fulano paga", "outro cliente paga"],
      question: "amigo / conhecido paga valor menor",
      situation: "A7 — Lead diz que conhece alguém que paga menos",
      answer: `"Entendo. Provavelmente o plano do seu amigo é diferente do que você precisa, ou ele entrou em um período promocional específico.

Me conta: você sabe o que está incluso no plano dele? Faz delivery também? Usa o chatbot?

[Aguarda]

Às vezes o 'mais barato' fica caro quando o sistema não entrega o que o negócio precisa. O que importa é o retorno que você tem com o investimento.

Vamos marcar 20 minutos para eu te mostrar exatamente o que você teria?"`
    },

    {
      id: "b_a8_gestor_trafego",
      type: "B",
      subtype: "valor",
      tags: ["gestor de tráfego", "gestor trafego", "parceiro", "sócio", "consultor", "acha caro demais", "profissional disse"],
      question: "gestor de tráfego / parceiro acha a plataforma cara",
      situation: "A8 — Gestor de tráfego ou parceiro do lead acha caro",
      answer: `"Entendo. Mas deixa eu te perguntar uma coisa: quem decide o investimento em infraestrutura do negócio é você, o dono.

O gestor de tráfego traz visitas. A pergunta é: para onde vai esse tráfego?

Se for pro iFood, você paga comissão em cima de cada pedido que ele trouxe — para sempre. Se for pro seu cardápio próprio, você paga zero por pedido.

A CW é o destino do tráfego. E o retorno é seu, não do marketplace.

Quer marcar 20 minutos para ver isso funcionando na prática?"`
    },

    // --- OBJEÇÕES DE CONCORRENTE (Tipo B) ---

    {
      id: "b_b1_concorrente_generico",
      type: "B",
      subtype: "concorrente",
      tags: ["já usa sistema", "tem sistema", "usa outro", "usa concorrente", "já tem plataforma", "tenho sistema"],
      question: "lead já usa um concorrente (genérico)",
      situation: "B1 — Lead já usa um sistema concorrente",
      answer: `"Que ótimo que você já valoriza tecnologia — isso já coloca você à frente da maioria.

Me conta: o que você mais gosta no sistema que usa? E o que poderia ser melhor?

[Aguarda]

Entendo. A Cardápio Web foi construída especificamente para [ponto fraco mencionado]. Posso te mostrar em 20 minutos como fica diferente?

Não estou pedindo pra você trocar agora — só pra você ver e comparar com o que você tem hoje."`
    },

    {
      id: "b_b1_anota_ai",
      type: "B",
      subtype: "concorrente",
      tags: ["anota ai", "anota aí", "anotaai", "anota"],
      question: "lead usa anota aí",
      situation: "B1 — Lead usa Anota Aí",
      answer: `"Conheço bem o Anota Aí. É um sistema que existe há um tempo.

Alguns pontos que costumam aparecer quando a gente compara:
• Anota Aí não tem gestão financeira integrada (DRE, fluxo de caixa)
• O programa de fidelidade é mais limitado
• Sem integração com F360 (gestão fiscal)
• O suporte costuma ser mais lento

A CW foi construída pra quem quer escalar — não só ter um cardápio no ar.

O que mais incomoda no que você usa hoje? Posso te mostrar como a CW resolve isso em 20 minutos."`
    },

    {
      id: "b_b1_goomer",
      type: "B",
      subtype: "concorrente",
      tags: ["goomer", "gumer"],
      question: "lead usa goomer",
      situation: "B1 — Lead usa Goomer",
      answer: `"Conheço o Goomer. É uma opção mais focada em autoatendimento e mesa.

O que a gente costuma ver quando comparamos:
• Goomer tem foco em mesas/totem, mas é mais limitado em delivery digital
• Sem ChatBot WhatsApp nativo robusto
• Programa de fidelidade mais básico
• Recursos de gestão financeira e estoque mais limitados

A CW foi construída para funcionar tanto em mesa quanto em delivery — num único sistema.

Me conta: você também faz delivery ou só mesa? Posso mostrar como a CW atende os dois."`
    },

    {
      id: "b_b1_brendi",
      type: "B",
      subtype: "concorrente",
      tags: ["brendi", "brendi app"],
      question: "lead usa brendi",
      situation: "B1 — Lead usa Brendi",
      answer: `"Conheço o Brendi. Tem uma proposta mais focada em cardápio digital simples.

Comparando:
• Brendi não tem módulo fiscal integrado (emissão de NF)
• Sem gestão de estoque avançada
• KDS não disponível
• Recursos de relatório mais limitados

Para quem está crescendo, essas funcionalidades fazem muita diferença no dia a dia.

O que você mais precisa melhorar na sua operação hoje? Posso te mostrar como a CW resolve em 20 minutos."`
    },

    {
      id: "b_b1_instadelivery",
      type: "B",
      subtype: "concorrente",
      tags: ["instadelivery", "insta delivery"],
      question: "lead usa instadelivery",
      situation: "B1 — Lead usa Instadelivery",
      answer: `"Conheço o Instadelivery. É focado em delivery.

Comparando com a CW:
• Instadelivery não tem funcionalidade de atendimento em mesa
• Programa de fidelidade mais limitado
• Sem gestão financeira integrada
• Suporte mais restrito

Se você faz delivery e também atende em mesa, a CW tem os dois no mesmo painel — sem precisar de dois sistemas.

Me conta: você atende em mesa também? Posso mostrar como fica em 20 minutos."`
    },

    {
      id: "b_b1_consumer_menudino",
      type: "B",
      subtype: "concorrente",
      tags: ["consumer", "menu dino", "menudino", "consumer app"],
      question: "lead usa consumer / menu dino",
      situation: "B1 — Lead usa Consumer ou Menu Dino",
      answer: `"Conheço o Consumer/Menu Dino. São plataformas mais antigas no mercado.

Um ponto importante: o Consumer geralmente é mais caro que a CW no plano equivalente, e tem menos funcionalidades modernas.

O que a CW entrega a mais:
• ChatBot WhatsApp nativo
• Programa de fidelidade mais completo
• Disparador de mensagens em massa
• Suporte mais acessível

Quer comparar os dois lado a lado em 20 minutos? Fica mais fácil do que eu descrever por texto."`
    },

    {
      id: "b_b1_whatsmenu",
      type: "B",
      subtype: "concorrente",
      tags: ["whatsmenu", "whats menu", "wm"],
      question: "lead usa whatsmenu",
      situation: "B1 — Lead usa WhatsMenu",
      answer: `"Conheço o WhatsMenu. É uma opção mais básica de cardápio digital.

Comparando:
• WhatsMenu não tem gestão financeira/relatórios avançados
• Sem programa de fidelidade
• Suporte muito limitado
• Recursos de pagamento online mais básicos

Para quem quer profissionalizar a operação e ter dados reais para tomar decisão, a CW é uma evolução natural.

O que está faltando no que você usa hoje?"`
    },

    {
      id: "b_b1_saipos",
      type: "B",
      subtype: "concorrente",
      tags: ["saipos", "sapos"],
      question: "lead usa saipos",
      situation: "B1 — Lead usa Saipos",
      answer: `"Conheço o Saipos. É mais focado em PDV (ponto de venda físico).

Aqui a comparação é diferente — são propósitos complementares:
• Saipos: PDV, caixa, comanda presencial
• CW: cardápio digital, delivery online, pedidos pelo WhatsApp

Se você já usa o Saipos pro caixa físico e quer adicionar um canal de delivery digital próprio (sem pagar comissão pro iFood), a CW pode funcionar junto, não contra.

Me conta: você faz delivery hoje? Por qual canal?"`
    },

    {
      id: "b_b2_analisando",
      type: "B",
      subtype: "concorrente",
      tags: ["analisando outros", "pesquisando", "avaliando plataformas", "comparando", "vendo opções", "não decidi"],
      question: "lead está analisando outras plataformas",
      situation: "B2 — Lead analisando várias plataformas ao mesmo tempo",
      answer: `"Perfeito — você está sendo estratégico, isso é ótimo.

Me conta: quais plataformas você está avaliando?

[Aguarda]

E quais são os critérios mais importantes pra você? Preço? Funcionalidades? Suporte?

[Aguarda]

Posso te ajudar a comparar de forma honesta. Em 20 minutos eu te mostro a CW ao vivo e você mesmo vê como se posiciona nas suas prioridades. Que dia da semana fica melhor?"`
    },

    {
      id: "b_b3_concorrente_promocao",
      type: "B",
      subtype: "concorrente",
      tags: ["promoção concorrente", "concorrente promoção", "oferta concorrente", "desconto concorrente", "metade do preço"],
      question: "concorrente está em promoção ou com preço mais baixo",
      situation: "B3 — Concorrente ofereceu preço promocional",
      answer: `"Promoção é sempre boa de aproveitar — totalmente entendo.

Mas me pergunta: quando a promoção acabar, qual é o preço normal deles? É comum plataforma entrar barato e aumentar depois.

Além disso: o que vem na promoção? É o plano completo ou uma versão limitada?

A CW não precisa de promoção porque entrega valor consistente. O preço que você vê hoje é o preço que você vai pagar — sem surpresa depois.

Quer ver os dois lado a lado antes de decidir? 20 minutos e você tem clareza total."`
    },

    // --- OBJEÇÕES DE DISPENSA / TIMING (Tipo C) ---

    {
      id: "b_c1_manda_whatsapp",
      type: "B",
      subtype: "dispensa",
      tags: ["manda no whatsapp", "manda por whatsapp", "envia por wpp", "prefiro por mensagem", "me manda wpp", "não quero reunião"],
      question: "lead quer receber info pelo whatsapp em vez de fazer reunião",
      situation: "C1 — Lead pede para mandar informações pelo WhatsApp",
      answer: `"Posso te mandar sim!

Mas quero ser transparente: material por texto não consegue te mostrar o sistema da forma que você merece ver. É difícil entender o impacto real só lendo.

Em 20 minutinhos numa video chamada você vê ao vivo, tira dúvidas em tempo real e já sai com clareza total pra decidir.

Qual dia essa semana fica melhor pra você — hoje mais tarde ou amanhã?"`
    },

    {
      id: "b_c2_horario_ruim",
      type: "B",
      subtype: "dispensa",
      tags: ["depois das 18", "depois do expediente", "sem horário", "fora do horário", "final do dia", "noite", "ocupado"],
      question: "lead só pode falar depois das 18h / sem horário disponível agora",
      situation: "C2 — Lead sem disponibilidade no horário comercial",
      answer: `"Sem problema! A gente se adapta ao seu horário.

Você prefere hoje depois das 18h ou amanhã num horário que ficou melhor?

[Aguarda confirmação]

Ótimo! Vou bloquear [horário] pra você. Você recebe um lembrete antes. Pode contar comigo."`
    },

    {
      id: "b_c3_esperar",
      type: "B",
      subtype: "dispensa",
      tags: ["esperar", "vou esperar", "não é o momento", "depois", "futuro", "mês que vem", "abrindo nova unidade", "aguardando"],
      question: "lead quer esperar para contratar",
      situation: "C3 — Lead quer esperar / não é o momento",
      answer: `"Entendo. Me conta: o que precisa acontecer para fazer sentido pra você entrar agora?

[Aguarda]

Vejo muito restaurante esperando o 'momento certo' e perdendo meses de pedidos sem comissão.

Cada mês sem cardápio próprio é mais dinheiro pro iFood e menos pro dono.

Mas quero entender: o que especificamente você está esperando? Aí consigo te ajudar a ver se faz sentido agora ou não."`
    },

    {
      id: "b_c4_direto_valores",
      type: "B",
      subtype: "dispensa",
      tags: ["direto ao ponto", "vai direto", "sem rodeios", "me passa o preço logo", "pular reunião", "não precisa reunião"],
      question: "lead quer ir direto para os valores sem apresentação",
      situation: "C4 — Lead quer pular a apresentação e ir direto para preços",
      answer: `"Sem problema — te passo agora mesmo.

Os planos vão de R$169,99/mês (Mesas) a R$269,99/mês (Premium). No anual, fica entre R$139,99 e R$239,99/mês.

Mas pra te dizer qual faz sentido pro seu negócio, preciso de 3 informações rápidas: você faz delivery? Tem mesas? Já usa algum sistema?

Com isso te digo o plano exato. Pode ser?"`
    },

    // --- OBJEÇÕES DE PROCESSO (Tipo D) ---

    {
      id: "b_d1_video_chamada",
      type: "B",
      subtype: "processo",
      tags: ["video chamada", "videochamada", "para que reunião", "por que reunião", "precisa de video", "não quero video"],
      question: "lead pergunta para que serve a video chamada",
      situation: "D1 — Lead questiona a necessidade da video chamada",
      answer: `"Boa pergunta.

A video chamada serve pra você VER o sistema funcionando de verdade — não só ler texto ou receber PDF.

Em 20 minutos você:
• Vê o cardápio ao vivo como vai ficar no seu restaurante
• Tira dúvidas em tempo real
• Entende exatamente o que cada plano entrega

É muito mais rápido e completo que qualquer material escrito.

Garanto que não vai desperdiçar o seu tempo. Qual dia da semana fica melhor?"`
    },

    {
      id: "b_d2_socio",
      type: "B",
      subtype: "processo",
      tags: ["sócio", "socio", "parceiro", "outro dono", "tenho sócio", "preciso consultar"],
      question: "lead tem sócio que precisa participar da decisão",
      situation: "D2 — Lead tem sócio mas afirma que pode decidir sozinho",
      answer: `"Faz todo sentido incluir seu sócio na conversa — afinal é um investimento do negócio de vocês.

O que acha de a gente agendar a video chamada num horário que os dois possam participar?

Assim eu apresento uma vez pra vocês dois, vocês tiram as dúvidas juntos e tomam a decisão com mais segurança.

Qual horário funciona pro seu sócio também?"`
    },

    {
      id: "b_d3_material_planos",
      type: "B",
      subtype: "processo",
      tags: ["material", "manda material", "enviar material", "me manda os planos", "pdf", "apresentação", "proposta"],
      question: "lead pede para mandar material / proposta por escrito",
      situation: "D3 — Lead pede material/planos por escrito antes da reunião",
      answer: `"Com prazer, te mando!

Mas quero ser honesto: um PDF não vai conseguir te mostrar o sistema da forma que você precisa ver pra tomar uma boa decisão.

Em 20 minutinhos de video chamada você vê tudo ao vivo, faz perguntas em tempo real e sai com clareza total.

Vale muito mais que qualquer material. O que acha de marcar ainda hoje ou amanhã?"`
    },

    // --- OBJEÇÕES DE CETICISMO / CONFIANÇA (Tipo E) ---

    {
      id: "b_e1_teste_gratis",
      type: "B",
      subtype: "ceticismo",
      tags: ["teste grátis", "queria testar", "testar antes", "experimentar", "não sei se funciona", "trial grátis"],
      question: "lead quer período de teste grátis",
      situation: "E1 — Lead pede trial / teste gratuito",
      answer: `"Entendo sua preocupação — você quer ter certeza antes de investir. Faz todo sentido.

A CW não tem trial, mas tem algo ainda melhor: 30 dias de garantia total.

Você contrata, usa o sistema com tudo funcionando, clientes reais pedindo. Se em 30 dias não estiver satisfeito, devolvemos 100% do valor. Sem burocracia.

A diferença do trial: você tem o produto completo, não uma versão limitada. E o suporte está ativo desde o dia 1.

Qual o risco pra você testar com essa garantia?"`
    },

    {
      id: "b_e2_vendas_fracas",
      type: "B",
      subtype: "ceticismo",
      tags: ["vendas fracas", "movimento fraco", "vendo pouco", "poucos pedidos", "não compensa", "baixo movimento"],
      question: "lead diz que as vendas estão fracas / não vai compensar",
      situation: "E2 — Lead com vendas fracas, acha que não vai compensar",
      answer: `"Entendo — e é exatamente por isso que faz sentido conversar agora.

O sistema de fidelidade e o disparador de mensagens foram feitos pra isso: trazer o cliente de volta e aumentar recorrência.

Clientes CW que ativaram o programa de fidelidade + disparador viram aumento médio de 20-30% no faturamento nos primeiros meses.

O cardápio próprio também elimina a comissão do iFood — em baixo volume isso faz diferença proporcional ainda maior.

Quer entender como ficaria pro seu negócio especificamente?"`
    },

    {
      id: "b_e3_clientes_ligam",
      type: "B",
      subtype: "ceticismo",
      tags: ["clientes ligam", "cliente prefere ligar", "telefone", "não usam qr code", "público não usa", "clientes antigos"],
      question: "lead diz que seus clientes preferem ligar / não usam QR Code",
      situation: "E3 — Lead acha que seus clientes não vão usar o cardápio digital",
      answer: `"Faz sentido — cada restaurante tem seu perfil de cliente.

Mas o cardápio digital não substitui a ligação: ele complementa.

Quem quer ligar, continua ligando. Mas os clientes novos, os mais jovens e os que pedem pelo WhatsApp vão passar a pedir pelo seu canal próprio — sem comissão.

Você não está perdendo quem liga. Está ganhando quem não ligaria.

Me conta: você atende pelo WhatsApp hoje? Como você recebe esses pedidos?"`
    },

    {
      id: "b_e4_de_onde",
      type: "B",
      subtype: "ceticismo",
      tags: ["de onde", "empresa de onde", "nunca ouvi falar", "não conheço", "desconfiança", "empresa confiável", "idônea"],
      question: "lead pergunta de onde é a empresa / desconfia",
      situation: "E4 — Lead não conhece a CW ou desconfia por ser de outro estado",
      answer: `"Boa pergunta! Somos de Fortaleza, Ceará. Fundados em 2020.

A Cardápio Web atende restaurantes em todo o Brasil — de food trucks a redes regionais.

100% brasileira, suporte humano em português, time que entende o mercado de foodservice do Brasil.

Se quiser, posso te mostrar cases de restaurantes da sua região usando a CW. Mas o melhor é você ver funcionando — 20 minutinhos e você mesmo julga."`
    },

    {
      id: "b_e5_integracao_sistema",
      type: "B",
      subtype: "ceticismo",
      tags: ["integra com meu sistema", "tenho um sistema", "PDV", "frente de caixa", "integração sistema"],
      question: "lead pergunta se integra com o sistema que já usa",
      situation: "E5 — Lead pergunta sobre integração com sistema atual",
      answer: `"Depende do sistema. Qual você usa hoje?

[Aguarda]

A CW tem integração com alguns ERPs e sistemas de caixa. Mas mesmo que não integre direto, ela funciona de forma independente para o cardápio digital e delivery.

Na prática, é como ter dois sistemas: um pro caixa físico e um pro canal online — sem conflito.

Quer me falar o que você usa pra eu verificar?"`
    },

    {
      id: "b_e6_visita_presencial",
      type: "B",
      subtype: "ceticismo",
      tags: ["visita presencial", "quero ver presencialmente", "vir aqui", "reunião presencial", "in loco"],
      question: "lead quer visita presencial",
      situation: "E6 — Lead pede que o vendedor vá presencialmente",
      answer: `"Entendo que você prefere ver presencialmente — é muito legítimo.

Infelizmente não fazemos visitas presenciais no momento, já que atendemos restaurantes em todo o Brasil.

Mas o que fazemos é uma video chamada super completa onde você vê o sistema funcionando ao vivo, pode fazer perguntas em tempo real, e eu simulo como ficaria o cardápio do SEU restaurante.

É 20 minutos muito bem aproveitados. Posso garantir que você sai com clareza total.

Que dia da semana fica bom pra você?"`
    },

    {
      id: "b_f_deal_breaker",
      type: "B",
      subtype: "deal_breaker",
      tags: ["deal breaker", "sem solução", "não tem como", "impossível", "inviável", "condição impossível"],
      question: "situação sem solução / deal breaker",
      situation: "F — Deal Breaker (situação incontornável)",
      answer: `Situação incontornável. Alternativas:

1. Registre o lead no CRM com o motivo
2. Marque para follow-up futuro (se houver possibilidade de mudança)
3. Seja honesto: "No momento não consigo atender essa necessidade específica"
4. Se a situação puder mudar, diga: "Se isso mudar, me chama — vou guardar seu contato"

Não force fechamento em deal breaker. Mantenha a relação para o futuro.`
    },


    // ========================================================
    // TIPO C — DIRECIONAMENTO / O QUE FAZER
    // ========================================================

    {
      id: "c_propor_reuniao",
      type: "C",
      tags: ["como propor reunião", "lead interessado", "propor reunião", "como agendar", "convidar reunião"],
      question: "lead interessado, como propor a reunião?",
      answer: `📅 COMO PROPOR A REUNIÃO

Abordagem direta e sem cerimônia:

"Que tal a gente reservar 20 minutinhos essa semana? Eu te mostro o sistema ao vivo e você já vê como funciona pro seu negócio. Qual dia fica melhor — hoje mais tarde ou amanhã?"

Se ele aceitar:
→ Mande o link do Meetime/Google Agenda pelo WhatsApp imediatamente
→ Confirme pelo WhatsApp 30 min antes da reunião
→ Passe as informações pro closer com antecedência

Se ele hesitar:
→ Use o argumento dos 20 min: "É rápido, você decide com informação completa"`
    },

    {
      id: "c_retomar_lead_frio",
      type: "C",
      tags: ["lead frio", "retomar", "follow up", "sumiu", "sem resposta", "não atende", "como retomar"],
      question: "como retomar um lead frio / que sumiu?",
      answer: `🔄 RETOMANDO LEAD FRIO

1ª tentativa (dia 3 após último contato):
"Oi [nome]! Passando pra ver se surgiu alguma dúvida sobre o que conversamos. Quando fica bom pra gente retomar?"

2ª tentativa (dia 7):
"[Nome], sei que você está ocupado. Se não for o momento, tudo bem — só me avisa. Se ainda tiver interesse, posso reservar 20 min essa semana."

3ª tentativa (dia 14):
"Última mensagem da minha parte por enquanto. Se em algum momento fizer sentido ver a Cardápio Web, pode me chamar. Boa sorte com o restaurante!"

Não insista mais de 3x. Marque no CRM como "frio" e retome em 60 dias.`
    },

    {
      id: "c_incluir_socio",
      type: "C",
      tags: ["incluir sócio", "sócio na reunião", "como lidar sócio", "dois donos"],
      question: "como incluir o sócio no processo?",
      answer: `👥 INCLUINDO O SÓCIO

Nunca avance sem o sócio se ele participa da decisão.

Como propor:
"Faz todo sentido incluir seu sócio. O que acha de a gente marcar num horário que os dois possam estar? Assim eu apresento uma vez e vocês já decidem juntos."

Se o lead disser "ele deixa eu decidir":
"Entendo, mas é um investimento do negócio de vocês. Se o sócio precisar de contexto depois, pode virar objeção no fechamento. Melhor incluir — é só 20 minutos a mais de reunião."`
    },

    {
      id: "c_passagem_bastao_processo",
      type: "C",
      tags: ["passagem bastão", "como passar", "reunião agendada", "o que fazer agora", "próximo passo reunião marcada"],
      question: "consegui marcar reunião, qual o próximo passo?",
      answer: `✅ PRÓXIMOS PASSOS APÓS AGENDAR

1. Envie o link de confirmação (Meetime ou Google Agenda) pelo WhatsApp imediatamente
2. Registre no CRM com TODAS as informações:
   • Nome, WhatsApp, tipo de estabelecimento
   • Faz delivery? Quantos pedidos/mês?
   • Sistema atual (se houver)
   • Dor principal / objeções levantadas
   • Nível de interesse
3. Passe o lead pro closer com antecedência
4. 30 min antes da reunião: confirme pelo WhatsApp

Quanto melhor a passagem de bastão, maior a chance de fechamento.`
    },

    {
      id: "c_lead_quer_fechar_sem_reuniao",
      type: "C",
      tags: ["quer fechar", "fechar sem reunião", "posso fechar agora", "quero contratar", "vou fechar"],
      question: "lead quer fechar mas sem fazer a reunião com o closer",
      answer: `💡 LEAD QUER FECHAR SEM REUNIÃO

Ótimo sinal! Mas siga o processo:

1. Não feche você mesmo — passe pro closer
2. Diga: "Que ótimo! Deixa eu te conectar com quem cuida dos contratos pra finalizar tudo direitinho."
3. Faça a passagem de bastão urgente com a tag "QUENTE — quer fechar"
4. O closer contata em menos de 2h

Não pule o closer mesmo que o lead "só queira o link de pagamento". A reunião existe pra garantir fit e reduzir churn.`
    },

    {
      id: "c_abordagem_inicial",
      type: "C",
      tags: ["abordagem", "como abordar", "primeiro contato", "iniciar conversa", "começar", "abertura"],
      question: "como iniciar a abordagem com um lead novo?",
      answer: `📞 ABORDAGEM INICIAL

Objetivo: qualificar + propor a reunião. Não vender.

Script de abertura:
"Oi [nome]! Sou o [seu nome], da Cardápio Web. Você [referência: preencheu um formulário / foi indicado por X / vi seu restaurante no Instagram]. Tenho uma solução de cardápio digital que pode aumentar seus pedidos sem pagar comissão pro iFood. Tenho 20 minutinhos do seu tempo essa semana?"

Perguntas de qualificação:
1. Você faz delivery hoje?
2. Por qual canal recebe os pedidos?
3. Usa algum sistema de cardápio digital?

Com essas respostas você já sabe qual plano indicar.`
    },

    {
      id: "c_gestor_trafego_situacao",
      type: "C",
      tags: ["gestor tráfego envolvido", "parceiro no negócio", "como lidar gestor", "consultor influenciando"],
      question: "lead tem gestor de tráfego que está influenciando a decisão",
      answer: `🎯 COMO LIDAR COM GESTOR DE TRÁFEGO NA NEGOCIAÇÃO

Estratégia:
1. Inclua o gestor na conversa, não ignore ele
2. Argumento principal: "O gestor traz tráfego. A CW é o destino do tráfego. São aliados, não concorrentes."
3. Se possível, proponha reunião com os dois: "O que acha de incluir seu gestor? Posso mostrar como a CW potencializa o trabalho dele."

O gestor precisa entender que a CW aumenta o ROI do tráfego pago — porque o pedido vai pro canal próprio (sem comissão) e não pro iFood.`
    }

  ],

  /* ----------------------------------------------------------
     ENGINE DE BUSCA
  ---------------------------------------------------------- */

  normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  tokenize(text) {
    const stopWords = new Set(['que', 'com', 'para', 'por', 'uma', 'mas', 'não', 'tem', 'ser', 'foi', 'são', 'ele', 'ela', 'eles', 'elas', 'meu', 'minha', 'seu', 'sua', 'nos', 'nas']);
    return this.normalize(text)
      .split(' ')
      .filter(t => t.length > 2 && !stopWords.has(t));
  },

  classify(input) {
    const lower = input.toLowerCase();

    const typeBSignals = [
      'lead disse', 'lead falou', 'lead achou', 'lead quer', 'lead pergunt',
      'lead ta', 'lead está', 'cliente disse', 'cliente falou',
      'ele disse', 'ela disse', 'ele falou', 'ela falou',
      'achou caro', 'ficou caro', 'ta achando caro', 'acha caro',
      'não quer reunião', 'não quer marcar', 'quer pensar', 'vai retornar',
      'me manda no whatsapp', 'me manda material', 'manda por wpp',
      'usa concorrente', 'usa o anota', 'usa o goomer', 'usa o brendi',
      'usa instadelivery', 'usa consumer', 'usa whatsmenu', 'usa o saipos',
      'já tem um sistema', 'analisando outras', 'pesquisando outras',
      'objec', 'objeção', 'resistência', 'só quer saber preço',
      'quer saber o valor', 'tem um concorrente', 'tem sistema',
      'não está no momento', 'esperar contratar', 'sócio', 'visita presencial'
    ];

    const typeCSignals = [
      'o que faço', 'o que eu faço', 'como faço', 'como vou',
      'próximo passo', 'como avanço', 'como retomo',
      'como abordo', 'o que falo', 'o que eu falo',
      'como eu retomo', 'como procedo', 'o que fazer',
      'consegui marcar', 'agendei a reunião', 'como passar',
      'posso fechar', 'como propor', 'como incluir',
      'como lidar', 'como iniciar', 'lead frio', 'follow up'
    ];

    if (typeBSignals.some(s => lower.includes(s))) return 'B';
    if (typeCSignals.some(s => lower.includes(s))) return 'C';
    return 'A';
  },

  score(queryTokens, entry) {
    const entryText = this.normalize([
      entry.question || '',
      (entry.tags || []).join(' '),
      entry.situation || '',
      entry.subtype || ''
    ].join(' '));

    let pts = 0;

    for (const token of queryTokens) {
      if (entryText.includes(token)) {
        const inTags = (entry.tags || []).some(t => this.normalize(t).includes(token));
        const inQuestion = this.normalize(entry.question || '').includes(token);
        pts += inTags ? 4 : inQuestion ? 2 : 1;
      }
    }

    return pts;
  },

  search(query, customEntries = []) {
    const type = this.classify(query);
    const tokens = this.tokenize(query);

    if (tokens.length === 0) return null;

    const pool = [...this.entries, ...customEntries];

    // First pass: same type only
    let results = pool
      .filter(e => e.type === type)
      .map(e => ({ entry: e, pts: this.score(tokens, e) }))
      .filter(r => r.pts > 0)
      .sort((a, b) => b.pts - a.pts);

    // Fallback: all types
    if (results.length === 0) {
      results = pool
        .map(e => ({ entry: e, pts: this.score(tokens, e) }))
        .filter(r => r.pts > 0)
        .sort((a, b) => b.pts - a.pts);
    }

    return results.length > 0 ? results[0].entry : null;
  }
};
