const COLORS = {
  strategy: "#c8d0e4",
  secretary: "#9b7b5e",
  marketing: "#f4c842",
  commercial: "#e84c3d",
  clients: "#48bb78",
  projects: "#4b9ef0",
  ops: "#ff7043",
  process: "#a855f7",
  innovation: "#22d3ee",
  people: "#fb7185",
  opt: "#60a5fa",
  inbox: "#f97316"
};

const workspace = [
  {
    id: "estrategia",
    name: "Estrategia Empresarial",
    color: COLORS.strategy,
    layer: "Direcao",
    status: "preencher",
    lists: [
      {
        id: "empresa",
        name: "Descricao da Empresa",
        entity: "Documento institucional",
        goal: "Formalizar missao, visao, valores, posicionamento, proposta de valor e limites de atuacao.",
        fields: ["Missao", "Visao", "Valores", "ICP principal", "Oferta central", "Dono", "Ultima revisao"],
        relationships: ["OKRs", "Planos setoriais", "Branding", "Produtos e Servicos"],
        statusFlow: ["Rascunho", "Em revisao", "Aprovado", "Em revisao estrategica"],
        automations: ["Revisao trimestral cria tarefa para atualizar identidade se OKRs mudarem."]
      },
      {
        id: "okrs",
        name: "OKRs por Ciclo",
        entity: "Objetivo estrategico",
        goal: "Traduzir direcao em objetivos trimestrais com resultados-chave mensuraveis.",
        fields: ["Ciclo", "Objetivo", "KR", "Baseline", "Meta", "Score", "Setor responsavel"],
        relationships: ["KPIs", "Projetos de Otimizacao Interna", "Dashboards"],
        statusFlow: ["Planejado", "Ativo", "Em risco", "Concluido", "Arquivado"],
        automations: ["KR em risco aciona revisao mensal e sugere iniciativa de melhoria."]
      },
      {
        id: "planos-setoriais",
        name: "Planos Setoriais",
        entity: "Plano de setor",
        goal: "Desdobrar estrategia para Produto, Marketing, Comercial, Operacional, Pessoas e Tecnologia.",
        fields: ["Setor", "Objetivo do setor", "Capacidades", "Gaps", "Iniciativas", "Prioridade"],
        relationships: ["OKRs", "Processos", "Projetos internos"],
        statusFlow: ["Backlog", "Em desenho", "Aprovado", "Em execucao", "Revisado"],
        automations: ["Plano aprovado cria iniciativas vinculadas ao setor."]
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    color: COLORS.marketing,
    layer: "Aquisicao",
    status: "raso",
    lists: [
      {
        id: "branding",
        name: "Branding",
        entity: "Ativo de marca",
        goal: "Centralizar linguagem, identidade, posicionamento, provas e diretrizes da comunicacao.",
        fields: ["Tipo de ativo", "Canal", "Status de aprovacao", "Responsavel", "Uso permitido"],
        relationships: ["Descricao da Empresa", "Campanhas", "Materiais Comerciais"],
        statusFlow: ["Ideia", "Produzindo", "Revisao", "Aprovado", "Publicado"],
        automations: ["Ativo aprovado notifica Hermes e atualiza materiais reutilizaveis."]
      },
      {
        id: "campanhas",
        name: "Campanhas e Conteudo",
        entity: "Campanha",
        goal: "Organizar aquisicao, conteudo, experimentos e ativos que geram leads para o Comercial.",
        fields: ["Canal", "ICP", "Oferta", "CTA", "Budget", "Leads gerados", "CAC"],
        relationships: ["Leads", "Branding", "KPIs de Marketing"],
        statusFlow: ["Briefing", "Producao", "Ativa", "Pausada", "Encerrada"],
        automations: ["Lead novo com origem campanha cria relacionamento com funil comercial."]
      }
    ]
  },
  {
    id: "comercial",
    name: "Comercial",
    color: COLORS.commercial,
    layer: "Receita",
    status: "ativo",
    lists: [
      {
        id: "leads",
        name: "Processos de Vendas / Leads",
        entity: "Instancia do Processo Comercial",
        goal: "Acompanhar cada lead do primeiro sinal ate fechamento, perda, pausa ou manutencao.",
        fields: ["Empresa", "Contato-chave", "Origem", "ICP Fit", "Valor estimado", "Fase SpinFlow", "Proxima acao"],
        relationships: ["Campanhas", "Reunioes", "Atividades Comerciais", "Clientes", "Contratos"],
        statusFlow: ["Oportunidade", "Qualificacao", "Agendar reuniao", "Reuniao agendada", "Negocio fechado", "Perdido"],
        automations: ["Lead ganho cria Cliente, Contrato e Handoff para Operacional."]
      },
      {
        id: "reunioes-comerciais",
        name: "Reunioes Comerciais",
        entity: "Compromisso comercial",
        goal: "Registrar reunioes, diagnosticos, apresentacoes e decisoes com contexto ligado ao lead.",
        fields: ["Lead", "Tipo", "Data", "Participantes", "Resultado", "Follow-up"],
        relationships: ["Leads", "Agenda", "Atividades Comerciais"],
        statusFlow: ["Agendada", "Realizada", "Follow-up", "Concluida", "Cancelada"],
        automations: ["Reuniao realizada cria follow-up se houver proxima acao."]
      },
      {
        id: "atividades-comerciais",
        name: "Atividades Comerciais",
        entity: "Tarefa comercial",
        goal: "Capturar ligacoes, DMs, e-mails, visitas, follow-ups e tentativas com historico limpo.",
        fields: ["Lead", "Canal", "Tentativa", "Desfecho", "Data", "Responsavel"],
        relationships: ["Leads", "Reunioes Comerciais"],
        statusFlow: ["A fazer", "Em execucao", "Concluida com sucesso", "Concluida sem sucesso", "Cancelada"],
        automations: ["Tarefa sem sucesso cria proxima tentativa dentro do loop da Atividade."]
      }
    ]
  },
  {
    id: "clientes",
    name: "Clientes",
    color: COLORS.clients,
    layer: "Relacionamento",
    status: "estruturado",
    lists: [
      {
        id: "crm",
        name: "CRM de Clientes",
        entity: "Conta cliente",
        goal: "Manter visao consolidada de clientes, saude, pacote, historico, oportunidades e risco.",
        fields: ["Pacote", "MRR", "Health Score", "Responsavel", "Data de inicio", "Risco", "Proxima revisao"],
        relationships: ["Contratos", "Financeiro", "Projetos de Clientes", "Comercial"],
        statusFlow: ["Novo", "Ativo", "Atencao", "Expansao", "Churn", "Arquivado"],
        automations: ["Health Score baixo cria tarefa de acompanhamento estrategico."]
      },
      {
        id: "contratos",
        name: "Contratos",
        entity: "Contrato",
        goal: "Controlar ciclo contratual, vigencia, renovacao, escopo e documentos assinados.",
        fields: ["Cliente", "Valor", "Vigencia", "Escopo", "Assinatura", "Renovacao", "Arquivo"],
        relationships: ["CRM", "Financeiro", "Projetos"],
        statusFlow: ["Rascunho", "Enviado", "Assinado", "Ativo", "Renovacao", "Encerrado"],
        automations: ["Contrato assinado cria gatilho de onboarding e cobranca inicial."]
      }
    ]
  },
  {
    id: "projetos",
    name: "Gestao de Projetos",
    color: COLORS.projects,
    layer: "Entrega",
    status: "ativo",
    lists: [
      {
        id: "projetos-clientes",
        name: "Projetos de Clientes",
        entity: "Projeto de entrega",
        goal: "Gerenciar entregas finitas para clientes sem confundir projeto com processo recorrente.",
        fields: ["Cliente", "Pacote", "Escopo", "Fase", "Prazo", "Risco", "Definition of Done"],
        relationships: ["CRM", "Contratos", "Operacional", "Entregaveis"],
        statusFlow: ["Preparacao", "Iniciacao", "Execucao", "Finalizacao", "Manutencao"],
        automations: ["Fase finalizada atualiza status do cliente e cria handoff de manutencao."]
      },
      {
        id: "otimizacao",
        name: "Projetos de Otimizacao Interna",
        entity: "Iniciativa interna",
        goal: "Transformar gaps estrategicos, melhorias de processo e novas tecnologias em projetos executaveis.",
        fields: ["OKR ligado", "Setor", "Impacto", "Esforco", "Dono", "Risco", "Metrica de sucesso"],
        relationships: ["OKRs", "KPIs", "Processos", "Inovacao"],
        statusFlow: ["Diagnostico", "Planejamento", "Execucao", "Validacao", "Incorporacao"],
        automations: ["Iniciativa validada cria atualizacao no Modelo de Referencia ou SOP."]
      }
    ]
  },
  {
    id: "operacional",
    name: "Operacional",
    color: COLORS.ops,
    layer: "Producao",
    status: "estruturado",
    lists: [
      {
        id: "entregaveis",
        name: "Catalogo de Entregaveis",
        entity: "SOP / entregavel",
        goal: "Padronizar Google Meu Negocio, WhatsApp Business, Instagram, site, landing page e agenda.",
        fields: ["Tipo", "Pacote", "SLA", "Checklist", "Criterio de aceite", "Template"],
        relationships: ["Projetos de Clientes", "Processo Operacional", "Base de Conhecimento"],
        statusFlow: ["Template", "Em uso", "Em revisao", "Validado", "Descontinuado"],
        automations: ["Novo projeto cria tarefas conforme entregaveis do pacote vendido."]
      },
      {
        id: "processo-operacional",
        name: "Processo Operacional",
        entity: "Instancia de prestacao de servico",
        goal: "Receber handoff comercial e executar onboarding, quick win, entregas, encerramento e manutencao.",
        fields: ["Cliente", "Pacote", "Fase SpinFlow", "Responsavel", "Bloqueios", "Output esperado"],
        relationships: ["Comercial", "Projetos", "Entregaveis", "Clientes"],
        statusFlow: ["Preparacao", "Iniciacao", "Execucao", "Finalizacao", "Manutencao"],
        automations: ["Handoff aprovado cria fase de preparacao operacional."]
      }
    ]
  },
  {
    id: "processos",
    name: "Processos",
    color: COLORS.process,
    layer: "Metodo",
    status: "ativo",
    lists: [
      {
        id: "mapeamento",
        name: "Mapeamento de Processos",
        entity: "Modelo de Referencia",
        goal: "Documentar processos recorrentes em Empresa, Setor, Processo, Fase, Etapa, Atividade e Tarefa.",
        fields: ["Setor", "Versao", "Dono", "Definition of Operation", "Fase", "Validacao em campo"],
        relationships: ["Projetos de Otimizacao", "Agents", "SOPs", "ClickUp"],
        statusFlow: ["Identificado", "Mapeando", "Em validacao", "Operacional", "Em revisao"],
        automations: ["Mudanca validada abre tarefa de atualizar AGENTS, MOC e templates."]
      }
    ]
  },
  {
    id: "agents",
    name: "Spin Agents",
    color: COLORS.innovation,
    layer: "Automacao",
    status: "planejado",
    lists: [
      {
        id: "mapa-agents",
        name: "Mapa Agent x Processo",
        entity: "Responsabilidade de agent",
        goal: "Definir que agents operam quais fases, etapas, atividades e decisoes.",
        fields: ["Agent", "Setor", "Processo", "Atividade", "Permissao", "Skill requerida"],
        relationships: ["Processos", "Skills", "Automacoes", "ClickUp"],
        statusFlow: ["Proposto", "Em desenho", "Testando", "Ativo", "Revisar"],
        automations: ["Nova atividade mapeada sugere skill ou prompt operacional."]
      }
    ]
  },
  {
    id: "mesa",
    name: "Mesa de Trabalho",
    color: COLORS.inbox,
    layer: "Inbox",
    status: "ativo",
    lists: [
      {
        id: "inbox",
        name: "Inbox / Lista Livre",
        entity: "Item capturado",
        goal: "Receber tarefas e ideias ainda sem contexto, para triagem e classificacao semanal.",
        fields: ["Origem", "Tipo", "Urgencia", "Destino sugerido", "Responsavel"],
        relationships: ["Todas as listas apos triagem"],
        statusFlow: ["Inbox", "A fazer", "Em andamento", "Concluida", "Descartada"],
        automations: ["Item parado por 7 dias cria lembrete de triagem."]
      }
    ]
  }
];

const statusColors = ["#a0a8c0", "#f59e0b", "#4b9ef0", "#48bb78", "#e84c3d", "#a855f7"];

function qs(selector) {
  return document.querySelector(selector);
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderMap(filter = "") {
  const container = qs("#treemap");
  container.innerHTML = "";
  const normalized = filter.trim().toLowerCase();

  workspace.forEach((folder, index) => {
    const matchingLists = folder.lists.filter((item) => {
      const haystack = [folder.name, item.name, item.entity, item.goal, ...item.fields, ...item.relationships].join(" ").toLowerCase();
      return !normalized || haystack.includes(normalized);
    });
    if (normalized && matchingLists.length === 0) return;

    const card = el("section", "folder-card open");
    card.style.setProperty("--folder-color", folder.color);

    const button = el("button", "folder-button", `
      <span class="dot" style="background:${folder.color}"></span>
      <span>${folder.name}</span>
      <span class="folder-meta">${matchingLists.length} listas</span>
    `);
    button.addEventListener("click", () => card.classList.toggle("open"));

    const listGrid = el("div", "list-grid");
    matchingLists.forEach((item) => {
      const listButton = el("button", "list-button", `
        <span class="dot" style="background:${folder.color}"></span>
        <span>${item.name}</span>
      `);
      listButton.addEventListener("click", () => selectList(folder, item, listButton));
      listGrid.appendChild(listButton);
    });

    card.appendChild(button);
    card.appendChild(listGrid);
    container.appendChild(card);

    if (!filter && index === 0 && matchingLists[0]) {
      setTimeout(() => {
        const firstButton = container.querySelector(".list-button");
        selectList(folder, matchingLists[0], firstButton);
      }, 0);
    }
  });
}

function selectList(folder, item, button) {
  document.querySelectorAll(".list-button").forEach((node) => node.classList.remove("active"));
  if (button) button.classList.add("active");

  const detail = qs("#detail");
  detail.innerHTML = `
    <div class="detail-title">
      <div>
        <div class="eyebrow" style="color:${folder.color}">${folder.name} / ${folder.layer}</div>
        <h2>${item.name}</h2>
        <p class="lead">${item.goal}</p>
      </div>
      <span class="chip" style="border-color:${folder.color};color:${folder.color}">${item.entity}</span>
    </div>
    <div class="detail-body">
      ${block("Tipo de tarefa / entidade", `<div class="pill-list">${[item.entity, ...item.fields.slice(0, 4)].map((tag) => pill(tag, folder.color)).join("")}</div>`)}
      ${block("Fluxo de status recomendado", `<div class="status-flow">${item.statusFlow.map((name, i) => `${statusPill(name, statusColors[i % statusColors.length])}${i < item.statusFlow.length - 1 ? '<span class="arrow">-></span>' : ""}`).join("")}</div>`)}
      ${block("Custom fields principais", `<div class="pill-list">${item.fields.map((field) => pill(field, "#9aa3bd")).join("")}</div>`)}
      ${block("Relacionamentos", `<ul class="mini-list">${item.relationships.map((rel) => `<li>${rel}</li>`).join("")}</ul>`)}
      ${block("Automacoes sugeridas", `<ul class="mini-list">${item.automations.map((auto) => `<li>${auto}</li>`).join("")}</ul>`)}
    </div>
  `;
}

function block(label, body) {
  return `<section class="info-block"><div class="info-label">${label}</div>${body}</section>`;
}

function pill(text, color) {
  return `<span class="tag" style="border-color:${color}66;color:${color}">${text}</span>`;
}

function statusPill(text, color) {
  return `<span class="status-pill" style="color:${color}">${text}</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderMap();
  qs("#search")?.addEventListener("input", (event) => renderMap(event.target.value));
  qs("#expandAll")?.addEventListener("click", () => document.querySelectorAll(".folder-card").forEach((node) => node.classList.add("open")));
  qs("#collapseAll")?.addEventListener("click", () => document.querySelectorAll(".folder-card").forEach((node) => node.classList.remove("open")));
});
