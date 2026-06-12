/* ============================================================
   ClarIA — Script Principal (Content Script)
   Injeta a sidebar na página do Sales Playbook
   ============================================================ */

(function () {
  'use strict';

  if (document.getElementById('claria-root')) return;

  // ============================================================
  // CONSTRUÇÃO DO DOM
  // ============================================================

  const root = document.createElement('div');
  root.id = 'claria-root';
  document.body.appendChild(root);

  // --- Botão flutuante ---
  const toggle = document.createElement('button');
  toggle.id = 'claria-toggle';
  toggle.title = 'ClarIA — Assistente Comercial';
  toggle.innerHTML = `
    <img src="${chrome.runtime.getURL('icons/icon128.png')}" alt="ClarIA" style="width:52px;height:52px;border-radius:50%;object-fit:cover;display:block;">
    <div id="claria-badge"></div>
  `;
  root.appendChild(toggle);

  // --- Toast ---
  const toast = document.createElement('div');
  toast.id = 'claria-toast';
  root.appendChild(toast);

  // --- Sidebar ---
  const sidebar = document.createElement('div');
  sidebar.id = 'claria-sidebar';
  sidebar.innerHTML = `
    <div id="claria-header">
      <div id="claria-avatar"><img src="${chrome.runtime.getURL('icons/icon48.png')}" alt="ClarIA" style="width:38px;height:38px;border-radius:50%;object-fit:cover;display:block;"></div>
      <div id="claria-header-info">
        <div id="claria-name">ClarIA</div>
        <div id="claria-status">Assistente Comercial CW</div>
      </div>
      <div id="claria-header-actions">
        <button class="claria-header-btn" id="claria-settings-btn" title="Treinar ClarIA">⚙️</button>
        <button class="claria-header-btn" id="claria-close" title="Fechar">✕</button>
      </div>
    </div>

    <!-- VIEW: CHAT -->
    <div id="claria-chat-view">
      <div id="claria-messages"></div>

      <div id="claria-suggestions">
        <button class="claria-suggestion" data-q="quais são os planos e preços?">💰 Planos</button>
        <button class="claria-suggestion" data-q="lead achou caro após apresentação">🥊 Achou caro</button>
        <button class="claria-suggestion" data-q="lead usa concorrente anota aí">🏆 Concorrentes</button>
        <button class="claria-suggestion" data-q="como funciona a garantia?">🛡️ Garantia</button>
        <button class="claria-suggestion" data-q="temos totem de autoatendimento?">🖥️ Totem</button>
        <button class="claria-suggestion" data-q="lead pede pra mandar material pelo WhatsApp">📩 Me manda WPP</button>
      </div>

      <div id="claria-input-area">
        <textarea id="claria-input" placeholder="Dúvida, objeção ou situação..." rows="1"></textarea>
        <button id="claria-send" title="Enviar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- VIEW: SETTINGS -->
    <div id="claria-settings-view">
      <div class="claria-settings-body">
        <div class="claria-settings-section">
          <h3>➕ Adicionar Conhecimento</h3>
          <div class="claria-field">
            <label>Tipo</label>
            <select id="claria-new-type">
              <option value="A">A — Produto / Preço / Processo</option>
              <option value="B">B — Contorno de Objeção</option>
              <option value="C">C — Direcionamento</option>
            </select>
          </div>
          <div class="claria-field">
            <label>Pergunta / Situação</label>
            <input id="claria-new-q" type="text" placeholder="Ex: lead pergunta sobre integração com Ifood...">
          </div>
          <div class="claria-field">
            <label>Resposta / Script</label>
            <textarea id="claria-new-a" placeholder="Escreva a resposta ou script completo..."></textarea>
          </div>
          <div class="claria-field">
            <label>Palavras-chave (separadas por vírgula)</label>
            <input id="claria-new-tags" type="text" placeholder="Ex: ifood, integração, marketplace">
          </div>
          <button class="claria-btn-primary" id="claria-save-entry">Salvar Entrada</button>
        </div>

        <div class="claria-settings-section">
          <h3>📚 Entradas Personalizadas</h3>
          <div class="claria-custom-list" id="claria-custom-list">
            <div class="claria-empty-state">Nenhuma entrada personalizada ainda.</div>
          </div>
        </div>
      </div>
    </div>
  `;
  root.appendChild(sidebar);

  // ============================================================
  // ESTADO
  // ============================================================

  let isOpen = false;
  let inSettings = false;
  let customEntries = [];

  // ============================================================
  // CHROME STORAGE — carregar entradas personalizadas
  // ============================================================

  function loadCustomEntries(callback) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['claria_custom'], (result) => {
        customEntries = result.claria_custom || [];
        if (callback) callback();
      });
    } else {
      customEntries = [];
      if (callback) callback();
    }
  }

  function saveCustomEntries(entries) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ claria_custom: entries });
    }
  }

  // ============================================================
  // UTILITÁRIOS DE UI
  // ============================================================

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function scrollToBottom() {
    const m = document.getElementById('claria-messages');
    if (m) m.scrollTop = m.scrollHeight;
  }

  function addMessage(text, sender, type) {
    const m = document.getElementById('claria-messages');
    const wrap = document.createElement('div');
    wrap.className = `claria-msg ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'claria-msg-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);

    if (sender === 'bot') {
      const meta = document.createElement('div');
      meta.className = 'claria-msg-meta';

      if (type) {
        const labels = { A: '📦 Produto', B: '🎯 Objeção', C: '🧭 Direção' };
        const tag = document.createElement('span');
        tag.className = `claria-type-tag ${type}`;
        tag.textContent = labels[type] || type;
        meta.appendChild(tag);
      }

      const copyBtn = document.createElement('button');
      copyBtn.className = 'claria-copy-btn';
      copyBtn.textContent = '📋 Copiar';
      copyBtn.addEventListener('click', () => {
        const copyText = text;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(copyText).then(() => {
            copyBtn.textContent = '✅ Copiado!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
              copyBtn.textContent = '📋 Copiar';
              copyBtn.classList.remove('copied');
            }, 2000);
          }).catch(() => fallbackCopy(copyText, copyBtn));
        } else {
          fallbackCopy(copyText, copyBtn);
        }
      });
      meta.appendChild(copyBtn);
      wrap.appendChild(meta);
    }

    m.appendChild(wrap);
    scrollToBottom();
    return wrap;
  }

  function fallbackCopy(text, btn) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      btn.textContent = '✅ Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 Copiar';
        btn.classList.remove('copied');
      }, 2000);
    } catch (_) {
      showToast('Não foi possível copiar automaticamente.');
    }
    document.body.removeChild(ta);
  }

  function showTyping() {
    const m = document.getElementById('claria-messages');
    const wrap = document.createElement('div');
    wrap.className = 'claria-msg bot claria-typing-wrap';
    wrap.id = 'claria-typing';
    wrap.innerHTML = `<div class="claria-typing"><span></span><span></span><span></span></div>`;
    m.appendChild(wrap);
    scrollToBottom();
  }

  function hideTyping() {
    const t = document.getElementById('claria-typing');
    if (t) t.remove();
  }

  // ============================================================
  // PROCESSAMENTO DE MENSAGEM
  // ============================================================

  function processMessage(text) {
    const result = CLARIA_KB.search(text, customEntries);

    if (!result) {
      return {
        text: 'Não encontrei uma resposta específica. Tente reformular com mais detalhes, ou use um dos atalhos rápidos abaixo.\n\nDica: comece com "lead disse que..." para objeções, ou pergunte diretamente sobre o produto.',
        type: null
      };
    }

    return { text: result.answer, type: result.type };
  }

  function sendMessage(text) {
    text = text.trim();
    if (!text) return;

    addMessage(text, 'user');

    const inp = document.getElementById('claria-input');
    if (inp) {
      inp.value = '';
      inp.style.height = 'auto';
    }

    showTyping();
    setTimeout(() => {
      hideTyping();
      const result = processMessage(text);
      addMessage(result.text, 'bot', result.type);
    }, 550);
  }

  // ============================================================
  // SETTINGS: gerenciar entradas personalizadas
  // ============================================================

  function renderCustomList() {
    const list = document.getElementById('claria-custom-list');
    if (!list) return;
    list.innerHTML = '';

    if (customEntries.length === 0) {
      list.innerHTML = '<div class="claria-empty-state">Nenhuma entrada personalizada ainda.</div>';
      return;
    }

    customEntries.forEach((entry, idx) => {
      const item = document.createElement('div');
      item.className = 'claria-custom-item';
      item.innerHTML = `
        <div class="claria-custom-item-text">
          <div class="claria-custom-item-q">${entry.question}</div>
          <div class="claria-custom-item-a">${entry.answer.substring(0, 80)}...</div>
        </div>
        <button class="claria-delete-btn" data-idx="${idx}" title="Remover">🗑️</button>
      `;
      list.appendChild(item);
    });
  }

  function switchToSettings() {
    inSettings = true;
    document.getElementById('claria-chat-view').classList.add('hidden');
    document.getElementById('claria-settings-view').classList.add('active');
    document.getElementById('claria-settings-btn').textContent = '💬';
    document.getElementById('claria-settings-btn').title = 'Voltar ao chat';
    document.getElementById('claria-status').textContent = 'Treinar ClarIA';
    renderCustomList();
  }

  function switchToChat() {
    inSettings = false;
    document.getElementById('claria-chat-view').classList.remove('hidden');
    document.getElementById('claria-settings-view').classList.remove('active');
    document.getElementById('claria-settings-btn').textContent = '⚙️';
    document.getElementById('claria-settings-btn').title = 'Treinar ClarIA';
    document.getElementById('claria-status').textContent = 'Assistente Comercial CW';
  }

  // ============================================================
  // MENSAGEM DE BOAS-VINDAS
  // ============================================================

  function showWelcome() {
    const m = document.getElementById('claria-messages');
    if (!m || m.children.length > 0) return;

    setTimeout(() => {
      addMessage(
        'Oi! Sou a ClarIA, sua assistente comercial da Cardápio Web. 🚀\n\nPosso te ajudar com:\n• Planos, preços e funcionalidades\n• Scripts para contornar qualquer objeção\n• O que fazer em cada situação\n\nComo posso te ajudar agora?',
        'bot'
      );
    }, 180);
  }

  // ============================================================
  // EVENT LISTENERS
  // ============================================================

  // Abrir/fechar sidebar
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    sidebar.classList.toggle('open', isOpen);
    if (isOpen) {
      loadCustomEntries(showWelcome);
      document.getElementById('claria-badge').classList.remove('visible');
    }
  });

  sidebar.addEventListener('click', (e) => {
    // Fechar
    if (e.target.closest('#claria-close')) {
      isOpen = false;
      sidebar.classList.remove('open');
      return;
    }

    // Settings toggle
    if (e.target.closest('#claria-settings-btn')) {
      if (inSettings) switchToChat();
      else switchToSettings();
      return;
    }

    // Sugestões rápidas
    if (e.target.matches('.claria-suggestion')) {
      const q = e.target.dataset.q;
      if (q) sendMessage(q);
      return;
    }

    // Deletar entrada personalizada
    if (e.target.matches('.claria-delete-btn')) {
      const idx = parseInt(e.target.dataset.idx);
      customEntries.splice(idx, 1);
      saveCustomEntries(customEntries);
      renderCustomList();
      showToast('Entrada removida.');
      return;
    }

    // Salvar nova entrada
    if (e.target.matches('#claria-save-entry')) {
      const q = document.getElementById('claria-new-q').value.trim();
      const a = document.getElementById('claria-new-a').value.trim();
      const t = document.getElementById('claria-new-type').value;
      const tagsRaw = document.getElementById('claria-new-tags').value;

      if (!q || !a) {
        showToast('Preencha a pergunta e a resposta.');
        return;
      }

      const tags = tagsRaw.split(',').map(s => s.trim()).filter(Boolean);

      const newEntry = {
        id: `custom_${Date.now()}`,
        type: t,
        tags,
        question: q,
        answer: a,
        custom: true
      };

      customEntries.push(newEntry);
      saveCustomEntries(customEntries);

      document.getElementById('claria-new-q').value = '';
      document.getElementById('claria-new-a').value = '';
      document.getElementById('claria-new-tags').value = '';

      renderCustomList();
      showToast('✅ Entrada salva com sucesso!');
      return;
    }
  });

  // Enviar com botão
  document.getElementById('claria-send').addEventListener('click', () => {
    const inp = document.getElementById('claria-input');
    sendMessage(inp.value);
  });

  // Enviar com Enter (Shift+Enter = quebra de linha)
  document.getElementById('claria-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e.target.value);
    }
  });

  // Auto-resize do textarea
  document.getElementById('claria-input').addEventListener('input', (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
  });

  // ============================================================
  // INICIALIZAÇÃO
  // ============================================================

  loadCustomEntries();

  // Badge de notificação inicial (chama atenção quando a extensão carrega)
  setTimeout(() => {
    if (!isOpen) {
      document.getElementById('claria-badge').classList.add('visible');
    }
  }, 1500);

})();
