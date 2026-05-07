/* ============================================ */
/* AUTENTICAÇÃO COM SUPABASE
/* ============================================ */

import { supabase } from "./supabase.js";

// Elementos do DOM
const modalAuth = document.getElementById("modal-auth");
const btnLoginHeader = document.getElementById("btn-login-header");
const btnFecharAuth = document.getElementById("btn-fechar-auth");
const tabLogin = document.getElementById("tab-login");
const tabCadastro = document.getElementById("tab-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");
const btnLogin = document.getElementById("btn-login");
const btnCadastro = document.getElementById("btn-cadastro");

let usuarioLogado = null;
let menuLogout = null;

// Abrir modal
if (btnLoginHeader) {
  btnLoginHeader.addEventListener("click", (e) => {
    // Se já estiver logado, abre o menu
    if (usuarioLogado) {
      e.stopPropagation();
      mostrarMenuLogout(e);
    } else {
      if (modalAuth) modalAuth.style.display = "flex";
    }
  });
}

// Fechar modal
if (btnFecharAuth) {
  btnFecharAuth.addEventListener("click", () => {
    if (modalAuth) modalAuth.style.display = "none";
  });
}

// Alternar abas
if (tabLogin && tabCadastro) {
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("ativo");
    tabCadastro.classList.remove("ativo");
    if (formLogin) formLogin.style.display = "flex";
    if (formCadastro) formCadastro.style.display = "none";
  });

  tabCadastro.addEventListener("click", () => {
    tabCadastro.classList.add("ativo");
    tabLogin.classList.remove("ativo");
    if (formLogin) formLogin.style.display = "none";
    if (formCadastro) formCadastro.style.display = "flex";
  });
}

// Função de login
async function fazerLogin() {
  const email = document.getElementById("login-email")?.value;
  const senha = document.getElementById("login-senha")?.value;
  const mensagem = document.getElementById("login-mensagem");

  if (!email || !senha) {
    if (mensagem) mensagem.textContent = "Preencha todos os campos";
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });

  if (error) {
    if (mensagem) mensagem.textContent = error.message;
  } else {
    if (mensagem) mensagem.textContent = "✅ Login realizado!";
    usuarioLogado = data.user;
    if (modalAuth) modalAuth.style.display = "none";
    atualizarBotaoLogin(data.user.email);
    mostrarSidebar(true);
    carregarPastas();
  }
}

// Função de cadastro
async function fazerCadastro() {
  const email = document.getElementById("cadastro-email")?.value;
  const senha = document.getElementById("cadastro-senha")?.value;
  const mensagem = document.getElementById("cadastro-mensagem");

  if (!email || !senha) {
    if (mensagem) mensagem.textContent = "Preencha todos os campos";
    return;
  }

  if (senha.length < 6) {
    if (mensagem)
      mensagem.textContent = "A senha deve ter pelo menos 6 caracteres";
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: senha,
  });

  if (error) {
    if (mensagem) mensagem.textContent = error.message;
  } else {
    if (mensagem)
      mensagem.textContent = "✅ Conta criada! Verifique seu email.";
    setTimeout(() => {
      if (tabLogin) tabLogin.click();
    }, 2000);
  }
}

if (btnLogin) btnLogin.addEventListener("click", fazerLogin);
if (btnCadastro) btnCadastro.addEventListener("click", fazerCadastro);

// Atualizar botão de login com o email
function atualizarBotaoLogin(email) {
  if (btnLoginHeader) {
    btnLoginHeader.innerHTML = `
      <svg class="icone-usuario" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="8" r="4" stroke="currentColor" fill="none"/>
        <path d="M5 20v-2a7 7 0 0 1 14 0v2" stroke="currentColor" fill="none"/>
      </svg>
      ${email.split("@")[0]}
      <svg class="icone-seta" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none"/>
      </svg>
    `;
  }
}

// Mostrar menu de logout
function mostrarMenuLogout(event) {
  // Remove menu existente se houver
  if (menuLogout) {
    menuLogout.remove();
    menuLogout = null;
  }

  menuLogout = document.createElement("div");
  menuLogout.className = "menu-logout";
  menuLogout.innerHTML = `
    <button id="btn-logout" class="menu-logout-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" fill="none"/>
        <polyline points="16 17 21 12 16 7" stroke="currentColor" fill="none"/>
        <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor"/>
      </svg>
      Sair
    </button>
  `;

  document.body.appendChild(menuLogout);

  // Posicionar o menu abaixo do botão
  const rect = event.target.getBoundingClientRect();
  menuLogout.style.position = "fixed";
  menuLogout.style.top = `${rect.bottom + 5}px`;
  menuLogout.style.left = `${rect.left}px`;
  menuLogout.style.zIndex = "1001";

  // Fechar menu ao clicar fora
  setTimeout(() => {
    document.addEventListener("click", fecharMenuLogout);
  }, 100);

  // Botão de logout
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.stopPropagation();
      fazerLogout();
    });
  }
}

function fecharMenuLogout() {
  if (menuLogout) {
    menuLogout.remove();
    menuLogout = null;
  }
  document.removeEventListener("click", fecharMenuLogout);
}

async function fazerLogout() {
  await supabase.auth.signOut();
  usuarioLogado = null;

  // Restaurar botão original
  if (btnLoginHeader) {
    btnLoginHeader.innerHTML = `
      <svg class="icone-cadeado" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="5" y="11" width="14" height="11" rx="2" ry="2" stroke="currentColor" fill="none"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none"/>
        <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
      </svg>
      Entrar
    `;
  }

  // Esconder sidebar
  mostrarSidebar(false);

  // Fechar menu se estiver aberto
  fecharMenuLogout();

  // Recarregar página para limpar estado
  location.reload();
}

// Verificar se já está logado
async function verificarSessao() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    usuarioLogado = data.session.user;
    atualizarBotaoLogin(data.session.user.email);
    carregarPastas();
  }
}

async function carregarPastas() {
  console.log("Carregando pastas do usuário...", usuarioLogado);
}

/* ============================================ */
/* SISTEMA DE PASTAS
/* ============================================ */

const sidebar = document.getElementById('sidebar');
const listaPastas = document.getElementById('lista-pastas');
const btnNovaPasta = document.getElementById('btn-nova-pasta');

// Mostrar/ocultar sidebar baseado no login
function mostrarSidebar(mostrar) {
  if (sidebar) {
    sidebar.style.display = mostrar ? 'block' : 'none';
  }
  if (mostrar) {
    document.body.classList.add('sidebar-visible');
    carregarPastas();
  } else {
    document.body.classList.remove('sidebar-visible');
  }
}

// Carregar pastas do usuário
async function carregarPastas() {
  if (!usuarioLogado) return;
  
  const { data, error } = await supabase
    .from('pastas')
    .select('*')
    .eq('usuario_id', usuarioLogado.id)
    .order('criado_em', { ascending: true });
  
  if (error) {
    console.error('Erro ao carregar pastas:', error);
    return;
  }
  
  renderizarPastas(data);
}

// Renderizar lista de pastas
function renderizarPastas(pastas) {
  if (!listaPastas) return;
  
  if (!pastas || pastas.length === 0) {
    listaPastas.innerHTML = '<p class="sem-pastas">Nenhuma pasta criada ainda.</p>';
    return;
  }
  
  listaPastas.innerHTML = '';
  pastas.forEach(pasta => {
    const pastaDiv = document.createElement('div');
    pastaDiv.className = 'pasta-item';
    pastaDiv.dataset.id = pasta.id;
    pastaDiv.innerHTML = `
      <div class="pasta-nome">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" fill="none"/>
        </svg>
        <span>${escapeHTML(pasta.nome)}</span>
      </div>
      <div class="pasta-acoes">
        <button class="btn-editar-pasta" data-id="${pasta.id}" data-nome="${escapeHTML(pasta.nome)}" title="Editar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 3l4 4-7 7H10v-4l7-7z" stroke="currentColor" fill="none"/>
          </svg>
        </button>
        <button class="btn-excluir-pasta" data-id="${pasta.id}" title="Excluir">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" stroke="currentColor" fill="none"/>
          </svg>
        </button>
      </div>
    `;
    
    listaPastas.appendChild(pastaDiv);
  });
  
  // Adicionar eventos nos botões
  document.querySelectorAll('.btn-editar-pasta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const nome = btn.dataset.nome;
      editarPasta(id, nome);
    });
  });
  
  document.querySelectorAll('.btn-excluir-pasta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      excluirPasta(id);
    });
  });
}

// Criar nova pasta
async function criarPasta() {
  const nome = prompt('Digite o nome da nova pasta:');
  if (!nome || nome.trim() === '') return;
  
  const { error } = await supabase
    .from('pastas')
    .insert([{ nome: nome.trim(), usuario_id: usuarioLogado.id }]);
  
  if (error) {
    alert('Erro ao criar pasta: ' + error.message);
  } else {
    carregarPastas();
  }
}

// Editar pasta
async function editarPasta(id, nomeAtual) {
  const novoNome = prompt('Editar nome da pasta:', nomeAtual);
  if (!novoNome || novoNome.trim() === '') return;
  
  const { error } = await supabase
    .from('pastas')
    .update({ nome: novoNome.trim() })
    .eq('id', id);
  
  if (error) {
    alert('Erro ao editar pasta: ' + error.message);
  } else {
    carregarPastas();
  }
}

// Excluir pasta
async function excluirPasta(id) {
  if (!confirm('Tem certeza que deseja excluir esta pasta? Todos os códigos dentro dela também serão excluídos.')) return;
  
  const { error } = await supabase
    .from('pastas')
    .delete()
    .eq('id', id);
  
  if (error) {
    alert('Erro ao excluir pasta: ' + error.message);
  } else {
    carregarPastas();
  }
}

// Evento do botão nova pasta
if (btnNovaPasta) {
  btnNovaPasta.addEventListener('click', criarPasta);
}

// Atualizar a função que mostra o sidebar após o login
// Modifique a função atualizarBotaoLogin e o local onde chama mostrarSidebar

// Atualizar a função fazerLogin para chamar mostrarSidebar(true)
// dentro do if (data.session) após atualizarBotaoLogin

// E na função fazerLogout, chamar mostrarSidebar(false)

// Inicializar
verificarSessao();
