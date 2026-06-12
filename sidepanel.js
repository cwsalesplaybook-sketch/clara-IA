/* ============================================================
   Clara IA — Lógica do Side Panel
   (extraído do inline do sidepanel.html — MV3 bloqueia script inline)
   ============================================================ */
let customEntries = [];
let inSettings = false;

const messagesEl   = document.getElementById('messages');
const inputEl      = document.getElementById('input');
const statusEl     = document.getElementById('header-status');
const toast        = document.getElementById('toast');
const chatView     = document.getElementById('chat-view');
const settingsView = document.getElementById('settings-view');
const settingsBtn  = document.getElementById('settings-btn');

/* storage */
function load(cb) {
  chrome.storage.local.get(['claria_custom'], r => {
    customEntries = (r && r.claria_custom) || [];
    if (cb) cb();
  });
}
function persist() { chrome.storage.local.set({ claria_custom: customEntries }); }

/* toast */
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

/* messages */
function scrollBottom() { messagesEl.scrollTop = messagesEl.scrollHeight; }

function addMsg(text, sender, type) {
  const wrap   = document.createElement('div');
  wrap.className = 'msg ' + sender;
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;
  wrap.appendChild(bubble);

  if (sender === 'bot') {
    const meta = document.createElement('div');
    meta.className = 'msg-meta';
    if (type) {
      const labels = { A: 'Produto', B: 'Objeção', C: 'Direção' };
      const tag = document.createElement('span');
      tag.className = 'type-tag ' + type;
      tag.textContent = labels[type] || type;
      meta.appendChild(tag);
    }
    const copy = document.createElement('button');
    copy.className = 'copy-btn';
    copy.textContent = 'Copiar';
    copy.onclick = () => {
      navigator.clipboard.writeText(text).then(() => {
        copy.textContent = 'Copiado!';
        setTimeout(() => copy.textContent = 'Copiar', 2000);
      }).catch(() => {});
    };
    meta.appendChild(copy);
    wrap.appendChild(meta);
  }
  messagesEl.appendChild(wrap);
  scrollBottom();
}

function showTyping() {
  const d = document.createElement('div');
  d.id = 'typing'; d.className = 'msg bot';
  d.innerHTML = '<div class="typing-bubble"><span></span><span></span><span></span></div>';
  messagesEl.appendChild(d);
  scrollBottom();
}
function hideTyping() { const t = document.getElementById('typing'); if (t) t.remove(); }

/* search */
function answer(text) {
  if (typeof CLARIA_KB === 'undefined')
    return { text: 'Base de conhecimento não carregada.', type: null };
  const r = CLARIA_KB.search(text, customEntries);
  if (!r) return {
    text: 'Não encontrei resposta específica. Tente reformular ou use os atalhos.\n\nDica: descreva a situação com "lead disse que..."',
    type: null
  };
  return { text: r.answer, type: r.type };
}

/* send */
function sendMsg(text) {
  text = text.trim();
  if (!text) return;
  addMsg(text, 'user');
  inputEl.value = '';
  inputEl.style.height = 'auto';
  showTyping();
  setTimeout(() => {
    hideTyping();
    const r = answer(text);
    addMsg(r.text, 'bot', r.type);
  }, 480);
}

/* settings */
function renderList() {
  const list = document.getElementById('custom-list');
  list.innerHTML = '';
  if (!customEntries.length) {
    list.innerHTML = '<div class="empty-state">Nenhuma entrada ainda.</div>';
    return;
  }
  customEntries.forEach((e, i) => {
    const item = document.createElement('div');
    item.className = 'custom-item';
    const safe = s => s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    item.innerHTML = `
      <div>
        <div class="custom-q">${safe(e.question)}</div>
        <div class="custom-a">${safe(e.answer.substring(0,60))}…</div>
      </div>
      <button class="del-btn" data-i="${i}">🗑</button>`;
    list.appendChild(item);
  });
}

function toSettings() {
  inSettings = true;
  chatView.classList.add('hidden');
  settingsView.classList.add('active');
  settingsBtn.textContent = '💬';
  statusEl.textContent = 'Treinar Clara IA';
  renderList();
}
function toChat() {
  inSettings = false;
  chatView.classList.remove('hidden');
  settingsView.classList.remove('active');
  settingsBtn.textContent = '⚙️';
  statusEl.textContent = 'Assistente Comercial CW';
}

/* welcome */
function welcome() {
  if (messagesEl.children.length > 0) return;
  setTimeout(() => addMsg('Olá, como posso ajudar hoje? 👋', 'bot'), 120);
}

/* avatar fallback (substitui o onerror inline, bloqueado pelo MV3) */
const avatarImg = document.querySelector('#avatar img');
if (avatarImg) {
  avatarImg.addEventListener('error', () => {
    if (avatarImg.parentElement) avatarImg.parentElement.textContent = '✨';
  });
}

/* events */
settingsBtn.addEventListener('click', () => { if (inSettings) toChat(); else toSettings(); });

document.getElementById('send').addEventListener('click', () => sendMsg(inputEl.value));

inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(e.target.value); }
});
inputEl.addEventListener('input', e => {
  e.target.style.height = 'auto';
  e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
});

document.getElementById('suggestions').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (chip) sendMsg(chip.dataset.q);
});

document.getElementById('custom-list').addEventListener('click', e => {
  const btn = e.target.closest('.del-btn');
  if (btn) {
    customEntries.splice(parseInt(btn.dataset.i), 1);
    persist(); renderList();
    showToast('Entrada removida.');
  }
});

document.getElementById('save-btn').addEventListener('click', () => {
  const q = document.getElementById('new-q').value.trim();
  const a = document.getElementById('new-a').value.trim();
  if (!q || !a) { showToast('Preencha pergunta e resposta.'); return; }
  const tags = document.getElementById('new-tags').value.split(',').map(s => s.trim()).filter(Boolean);
  customEntries.push({
    id: 'c_' + Date.now(),
    type: document.getElementById('new-type').value,
    tags, question: q, answer: a, custom: true
  });
  persist();
  document.getElementById('new-q').value = '';
  document.getElementById('new-a').value = '';
  document.getElementById('new-tags').value = '';
  renderList();
  showToast('Entrada salva!');
});

/* init */
load(welcome);
