/* ============================================================
   ClarIA — Script Principal (Content Script)
   ============================================================ */

(function () {
  'use strict';

  console.log('[ClarIA] script iniciado');

  if (document.getElementById('claria-root')) {
    console.log('[ClarIA] já inicializado, saindo');
    return;
  }

  // ============================================================
  // DOM
  // ============================================================

  const root = document.createElement('div');
  root.id = 'claria-root';
  document.body.appendChild(root);

  // Botão flutuante
  const toggle = document.createElement('button');
  toggle.id = 'claria-toggle';
  toggle.title = 'ClarIA';
  toggle.textContent = 'IA';
  root.appendChild(toggle);

  // Toast
  const toast = document.createElement('div');
  toast.id = 'claria-toast';
  root.appendChild(toast);

  // Sidebar
  const sidebar = document.createElement('div');
  sidebar.id = 'claria-sidebar';
  sidebar.innerHTML = `
    <div id="claria-header">
      <div id="claria-avatar">✨</div>
      <div id="claria-header-info">
        <div id="claria-name">ClarIA</div>
        <div id="claria-status">Assistente Comercial CW</div>
      </div>
      <div id="claria-header-actions">
        <button class="claria-header-btn" id="claria-settings-btn" title="Treinar ClarIA">&#9881;&#65039;</button>
        <button class="claria-header-btn" id="claria-close">&#x2715;</button>
      </div>
    </div>

    <div id="claria-chat-view">
      <div id="claria-messages"></div>

      <div id="claria-suggestions">
        <button class="claria-suggestion" data-q="quais são os planos e preços?">&#128176; Planos</button>
        <button class="claria-suggestion" data-q="lead achou caro após apresentação">&#129354; Achou caro</button>
        <button class="claria-suggestion" data-q="lead usa concorrente anota aí">&#127942; Concorrentes</button>
        <button class="claria-suggestion" data-q="como funciona a garantia?">&#128737; Garantia</button>
        <button class="claria-suggestion" data-q="temos totem de autoatendimento?">&#128187; Totem</button>
        <button class="claria-suggestion" data-q="lead pede pra mandar material pelo WhatsApp">&#128233; Me manda WPP</button>
      </div>

      <div id="claria-input-area">
        <textarea id="claria-input" placeholder="Dúvida, objeção ou situação..." rows="1"></textarea>
        <button id="claria-send">&#10148;</button>
      </div>
    </div>

    <div id="claria-settings-view">
      <div class="claria-settings-body">
        <div class="claria-settings-section">
          <h3>&#10133; Adicionar Conhecimento</h3>
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
            <input id="claria-new-q" type="text" placeholder="Ex: como funciona o totem?">
          </div>
          <div class="claria-field">
            <label>Resposta / Script</label>
            <textarea id="claria-new-a" placeholder="Escreva a resposta ou script completo..."></textarea>
          </div>
          <div class="claria-field">
            <label>Palavras-chave (separadas por vírgula)</label>
            <input id="claria-new-tags" type="text" placeholder="Ex: totem, autoatendimento">
          </div>
          <button class="claria-btn-primary" id="claria-save-entry">Salvar Entrada</button>
        </div>
        <div class="claria-settings-section">
          <h3>&#128218; Entradas Personalizadas</h3>
          <div class="claria-custom-list" id="claria-custom-list">
            <div class="claria-empty-state">Nenhuma entrada personalizada ainda.</div>
          </div>
        </div>
      </div>
    </div>
  `;
  root.appendChild(sidebar);

  // Ícone: tenta carregar a foto, senão mantém o texto "IA"
  try {
    const iconUrl = chrome.runtime.getURL('icons/icon128.png');
    const img = new Image();
    img.onload = function () {
      toggle.textContent = '';
      toggle.style.backgroundImage = 'url(' + iconUrl + ')';
      toggle.style.backgroundSize = 'cover';
      toggle.style.backgroundPosition = 'center';
    };
    img.src = iconUrl;

    const avatarUrl = chrome.runtime.getURL('icons/icon48.png');
    const av = document.getElementById('claria-avatar');
    if (av) {
      const avImg = new Image();
      avImg.onload = function () {
        av.textContent = '';
        av.style.backgroundImage = 'url(' + avatarUrl + ')';
        av.style.backgroundSize = 'cover';
        av.style.backgroundPosition = 'center';
      };
      avImg.src = avatarUrl;
    }
  } catch (e) { /* sem ícone, tudo bem */ }

  // ============================================================
  // ESTADO
  // ============================================================

  var isOpen = false;
  var inSettings = false;
  var customEntries = [];

  // ============================================================
  // STORAGE
  // ============================================================

  function loadCustomEntries(callback) {
    try {
      chrome.storage.local.get(['claria_custom'], function (result) {
        customEntries = (result && result.claria_custom) || [];
        if (callback) callback();
      });
    } catch (e) {
      customEntries = [];
      if (callback) callback();
    }
  }

  function saveCustomEntries(entries) {
    try {
      chrome.storage.local.set({ claria_custom: entries });
    } catch (e) {}
  }

  // ============================================================
  // UI HELPERS
  // ============================================================

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  function scrollBottom() {
    var m = document.getElementById('claria-messages');
    if (m) m.scrollTop = m.scrollHeight;
  }

  function addMessage(text, sender, type) {
    var m = document.getElementById('claria-messages');
    if (!m) return;

    var wrap = document.createElement('div');
    wrap.className = 'claria-msg ' + sender;

    var bubble = document.createElement('div');
    bubble.className = 'claria-msg-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);

    if (sender === 'bot') {
      var meta = document.createElement('div');
      meta.className = 'claria-msg-meta';

      if (type) {
        var labels = { A: 'Produto', B: 'Objeção', C: 'Direção' };
        var tag = document.createElement('span');
        tag.className = 'claria-type-tag ' + type;
        tag.textContent = labels[type] || type;
        meta.appendChild(tag);
      }

      var copyBtn = document.createElement('button');
      copyBtn.className = 'claria-copy-btn';
      copyBtn.textContent = 'Copiar';
      copyBtn.addEventListener('click', function () {
        var t = text;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(t).then(function () {
            copyBtn.textContent = 'Copiado!';
            setTimeout(function () { copyBtn.textContent = 'Copiar'; }, 2000);
          }).catch(function () { fallbackCopy(t, copyBtn); });
        } else {
          fallbackCopy(t, copyBtn);
        }
      });
      meta.appendChild(copyBtn);
      wrap.appendChild(meta);
    }

    m.appendChild(wrap);
    scrollBottom();
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); btn.textContent = 'Copiado!'; setTimeout(function () { btn.textContent = 'Copiar'; }, 2000); } catch (e) {}
    document.body.removeChild(ta);
  }

  function showTyping() {
    var m = document.getElementById('claria-messages');
    if (!m) return;
    var wrap = document.createElement('div');
    wrap.id = 'claria-typing';
    wrap.className = 'claria-msg bot claria-typing-wrap';
    wrap.innerHTML = '<div class="claria-typing"><span></span><span></span><span></span></div>';
    m.appendChild(wrap);
    scrollBottom();
  }

  function hideTyping() {
    var t = document.getElementById('claria-typing');
    if (t) t.remove();
  }

  // ============================================================
  // BUSCA E MENSAGEM
  // ============================================================

  function processMessage(text) {
    if (typeof CLARIA_KB === 'undefined') {
      return { text: 'Erro: base de conhecimento não carregada.', type: null };
    }
    var result = CLARIA_KB.search(text, customEntries);
    if (!result) {
      return { text: 'Não encontrei resposta específica. Tente reformular ou use os atalhos abaixo.\n\nDica: use "lead disse que..." para objeções.', type: null };
    }
    return { text: result.answer, type: result.type };
  }

  function sendMessage(text) {
    text = text.trim();
    if (!text) return;

    addMessage(text, 'user');

    var inp = document.getElementById('claria-input');
    if (inp) { inp.value = ''; inp.style.height = 'auto'; }

    showTyping();
    setTimeout(function () {
      hideTyping();
      var result = processMessage(text);
      addMessage(result.text, 'bot', result.type);
    }, 500);
  }

  // ============================================================
  // SETTINGS
  // ============================================================

  function renderCustomList() {
    var list = document.getElementById('claria-custom-list');
    if (!list) return;
    list.innerHTML = '';
    if (customEntries.length === 0) {
      list.innerHTML = '<div class="claria-empty-state">Nenhuma entrada personalizada ainda.</div>';
      return;
    }
    customEntries.forEach(function (entry, idx) {
      var item = document.createElement('div');
      item.className = 'claria-custom-item';
      item.innerHTML = '<div class="claria-custom-item-text"><div class="claria-custom-item-q">' +
        entry.question + '</div><div class="claria-custom-item-a">' +
        entry.answer.substring(0, 80) + '...</div></div>' +
        '<button class="claria-delete-btn" data-idx="' + idx + '">&#128465;</button>';
      list.appendChild(item);
    });
  }

  function switchToSettings() {
    inSettings = true;
    var cv = document.getElementById('claria-chat-view');
    var sv = document.getElementById('claria-settings-view');
    var sb = document.getElementById('claria-settings-btn');
    var st = document.getElementById('claria-status');
    if (cv) cv.classList.add('hidden');
    if (sv) sv.classList.add('active');
    if (sb) { sb.textContent = '💬'; sb.title = 'Voltar ao chat'; }
    if (st) st.textContent = 'Treinar ClarIA';
    renderCustomList();
  }

  function switchToChat() {
    inSettings = false;
    var cv = document.getElementById('claria-chat-view');
    var sv = document.getElementById('claria-settings-view');
    var sb = document.getElementById('claria-settings-btn');
    var st = document.getElementById('claria-status');
    if (cv) cv.classList.remove('hidden');
    if (sv) sv.classList.remove('active');
    if (sb) { sb.innerHTML = '&#9881;&#65039;'; sb.title = 'Treinar ClarIA'; }
    if (st) st.textContent = 'Assistente Comercial CW';
  }

  function showWelcome() {
    var m = document.getElementById('claria-messages');
    if (!m || m.children.length > 0) return;
    setTimeout(function () {
      addMessage('Oi! Sou a ClarIA, assistente comercial da Cardápio Web.\n\nPosso te ajudar com:\n• Planos, preços e funcionalidades\n• Scripts para contornar objeções\n• O que fazer em cada situação\n\nComo posso te ajudar?', 'bot');
    }, 180);
  }

  // ============================================================
  // EVENTOS
  // ============================================================

  toggle.addEventListener('click', function () {
    isOpen = !isOpen;
    if (isOpen) {
      sidebar.classList.add('open');
      loadCustomEntries(showWelcome);
    } else {
      sidebar.classList.remove('open');
    }
  });

  sidebar.addEventListener('click', function (e) {
    var target = e.target;

    if (target.id === 'claria-close' || (target.closest && target.closest('#claria-close'))) {
      isOpen = false;
      sidebar.classList.remove('open');
      return;
    }

    if (target.id === 'claria-settings-btn' || (target.closest && target.closest('#claria-settings-btn'))) {
      if (inSettings) switchToChat(); else switchToSettings();
      return;
    }

    if (target.classList && target.classList.contains('claria-suggestion')) {
      var q = target.getAttribute('data-q');
      if (q) sendMessage(q);
      return;
    }

    if (target.classList && target.classList.contains('claria-delete-btn')) {
      var idx = parseInt(target.getAttribute('data-idx'));
      customEntries.splice(idx, 1);
      saveCustomEntries(customEntries);
      renderCustomList();
      showToast('Entrada removida.');
      return;
    }

    if (target.id === 'claria-save-entry') {
      var qEl = document.getElementById('claria-new-q');
      var aEl = document.getElementById('claria-new-a');
      var tEl = document.getElementById('claria-new-type');
      var tagsEl = document.getElementById('claria-new-tags');
      var qv = qEl ? qEl.value.trim() : '';
      var av = aEl ? aEl.value.trim() : '';
      if (!qv || !av) { showToast('Preencha a pergunta e a resposta.'); return; }
      var tags = tagsEl ? tagsEl.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];
      customEntries.push({ id: 'custom_' + Date.now(), type: tEl ? tEl.value : 'A', tags: tags, question: qv, answer: av, custom: true });
      saveCustomEntries(customEntries);
      if (qEl) qEl.value = '';
      if (aEl) aEl.value = '';
      if (tagsEl) tagsEl.value = '';
      renderCustomList();
      showToast('Entrada salva!');
      return;
    }
  });

  var sendBtn = document.getElementById('claria-send');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var inp = document.getElementById('claria-input');
      if (inp) sendMessage(inp.value);
    });
  }

  var inputEl = document.getElementById('claria-input');
  if (inputEl) {
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(e.target.value);
      }
    });
    inputEl.addEventListener('input', function (e) {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
    });
  }

  // ============================================================
  // INIT
  // ============================================================

  // Abre automaticamente ao ser injetado pelo toolbar
  isOpen = true;
  sidebar.classList.add('open');
  loadCustomEntries(showWelcome);

  // Toggle via clique no ícone da toolbar
  chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.action === 'claria_toggle') {
      isOpen = !isOpen;
      if (isOpen) {
        sidebar.classList.add('open');
        loadCustomEntries(showWelcome);
      } else {
        sidebar.classList.remove('open');
      }
    }
  });

})();
