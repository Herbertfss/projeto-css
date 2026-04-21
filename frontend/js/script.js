/* ============================================ */
/* CONFIGURAÇÃO DO BACKEND
/* ============================================ */

// Endereço do backend (ajuste se o backend estiver em outro lugar)
const API_URL = "https://nextstage-css-generator.onrender.com/gerar-codigo";

/* ============================================ */
/* ELEMENTOS DA PÁGINA (DOM)
/* ============================================ */

const botao = document.querySelector(".btn-codigo");
const textarea = document.querySelector("textarea");
const codigoDescricao = document.querySelector(".codigo-descricao");
const codigoAcao = document.querySelector(".codigo-acao");
const btnCopiar = document.getElementById("btn-copiar");
const btnLimpar = document.getElementById("btn-limpar");

/* ============================================ */
/* EVENTOS (o que acontece quando o usuário interage)
/* ============================================ */

// Clique no botão "Gerar código"
botao.addEventListener("click", gerarCodigo);

// Atalho Ctrl + Enter no textarea
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey) {
    gerarCodigo();
  }
});

/* ============================================ */
/* FUNÇÃO PRINCIPAL - CHAMA O BACKEND E MOSTRA O RESULTADO
/* ============================================ */

async function gerarCodigo() {
  // Esconde o botão copiar no início de cada nova geração
  btnCopiar.style.display = "none";

  // pega o texto que o usuário digitou e remove espaços extras
  const textoUsuario = textarea.value.trim();

  // validação 1: campo vazio
  if (!textoUsuario) {
    mostrarErro("Digite algo para gerar o código");
    textarea.focus();
    return;
  }

  // validação 2: texto muito curto (menos de 5 caracteres)
  if (textoUsuario.length < 5) {
    mostrarErro("Digite pelo menos 5 caracteres");
    return;
  }

  // ========== ESTADO DE CARREGAMENTO ==========

  // desabilita o botão para evitar cliques duplicados
  botao.disabled = true;
  botao.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: girar 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="30 8"/>
    </svg>
    <span>Processando...</span>
  `;

  // mostra loading na área do código
  codigoDescricao.innerHTML = `
  <div class="loading-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px 20px;">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" style="animation: girar 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke="#a78bfa" stroke-width="2" fill="none" stroke-dasharray="30 8"/>
    </svg>
    <p style="color: #a78bfa; font-family: monospace; font-size: 13px;">Gerando código com IA...</p>
  </div>
`;

  // mostra loading no preview
  codigoAcao.srcdoc = `
    <html>
      <head>
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: #0a0a0f;
            font-family: monospace;
          }
          svg {
            animation: girar 1s linear infinite;
          }
          @keyframes girar {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          p {
            color: #a78bfa;
            margin-top: 16px;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke="#a78bfa" stroke-width="2" fill="none" stroke-dasharray="30 8"/>
        </svg>
        <p>Carregando preview...</p>
      </body>
    </html>
  `;

  // ========== CHAMADA PARA O BACKEND ==========

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: textoUsuario }),
    });

    // se o backend respondeu com erro (400, 500, etc.)
    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.erro || "Erro na requisição");
    }

    const dados = await resposta.json();

    // verifica se veio o código esperado
    if (dados.sucesso && dados.codigo) {
      // escapa caracteres especiais para não executar HTML
      const codigoEscapado = escaparHTML(dados.codigo);

      // mostra o código na área esquerda
      codigoDescricao.innerHTML = `<pre>${codigoEscapado}</pre>`;

      // mostra o preview na área direita
      codigoAcao.srcdoc = dados.codigo;

      // Mostra o botão copiar
      btnCopiar.style.display = "flex";
      btnCopiar.onclick = async () => {
        await navigator.clipboard.writeText(dados.codigo);

        // Salva o texto original do botão
        const textoOriginal = btnCopiar.innerHTML;

        // Muda para "Copiado!" temporariamente
        btnCopiar.innerHTML = `Copiado! ✅`;

        // Volta ao normal após 2 segundos
        setTimeout(() => {
          btnCopiar.innerHTML = textoOriginal;
        }, 2000);
      };
      // rola a página suavemente até a área de resultados
      const resultados = document.querySelector(".resultados");
      if (resultados) {
        resultados.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      throw new Error("Resposta inválida do servidor");
    }
  } catch (erro) {
    // qualquer erro cai aqui (rede, servidor fora, etc.)
    mostrarErro(
      erro.message ||
        "Erro ao gerar código. Verifique se o servidor está rodando."
    );
    codigoDescricao.innerHTML = `<p style="color: #ff6b6b;">❌ ${erro.message || "Erro desconhecido"}</p>`;
  } finally {
    // restaura o botão (sempre, mesmo se der erro)
    botao.disabled = false;
    botao.innerHTML = `<span>Gerar código</span>`;
  }
}

/* ============================================ */
/* FUNÇÕES AUXILIARES
/* ============================================ */

// escapa caracteres especiais para evitar XSS (Cross-Site Scripting)
function escaparHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// mostra uma mensagem temporária no canto inferior direito
function mostrarErro(mensagem) {
  const erroDiv = document.createElement("div");
  erroDiv.textContent = mensagem;
  erroDiv.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff4444;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  `;
  document.body.appendChild(erroDiv);

  // remove a mensagem após 3 segundos
  setTimeout(() => {
    erroDiv.remove();
  }, 3000);
}

// adiciona a animação de fadeIn para as mensagens de erro
if (!document.querySelector("#animacao-erro")) {
  const style = document.createElement("style");
  style.id = "animacao-erro";
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// BOTÃO LIMPAR TUDO
// ============================================

if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    // Limpa o textarea
    textarea.value = "";
    textarea.focus();

    // Limpa a área de código
    codigoDescricao.innerHTML = "";

    // Limpa o preview
    codigoAcao.srcdoc = "";

    // Esconde o botão copiar
    if (btnCopiar) {
      btnCopiar.style.display = "none";
    }
  });
}
