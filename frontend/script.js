// ============================================
// CONFIGURAÇÃO
// ============================================

// Endereço do nosso backend (rodando localmente na porta 3000)
// Se mudar a porta do servidor, atualizar aqui também
const API_URL = "http://localhost:3000/gerar-codigo";

// ============================================
// DOM ELEMENTS (referências para manipular a página)
// ============================================

const botao = document.querySelector(".btn-codigo");
const textarea = document.querySelector("textarea");
const codigoDescricao = document.querySelector(".codigo-descricao");
const codigoAcao = document.querySelector(".codigo-acao");

// ============================================
// EVENT LISTENERS (o que acontece quando o usuário interage)
// ============================================

// Clique no botão principal
botao.addEventListener("click", gerarCodigo);

// Atalho de teclado: Ctrl + Enter no textarea também dispara a geração
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey) {
    gerarCodigo();
  }
});

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

/**
 * Faz a requisição para o backend e atualiza a tela com o resultado
 * É async porque precisa esperar a resposta da API
 */
async function gerarCodigo() {
  // Remove espaços desnecessários do início e fim
  const textoUsuario = textarea.value.trim();

  // --- Validações simples (evita requisições desnecessárias) ---
  if (!textoUsuario) {
    mostrarErro("Digite algo para gerar o código");
    textarea.focus(); // devolve o foco pro usuário corrigir
    return;
  }

  if (textoUsuario.length < 5) {
    mostrarErro("Digite pelo menos 5 caracteres");
    return;
  }

  // --- Feedback visual de loading ---
  // Desabilita o botão para evitar cliques duplicados
  botao.disabled = true;
  botao.textContent = "⏳ Gerando...";

  // Mostra mensagem animada na área de código
  codigoDescricao.innerHTML =
    '<p style="color: #888;">✨ Gerando código com IA... ✨</p>';

  // Preview fica em estado de carregamento
  codigoAcao.srcdoc =
    "<html><body style='display:flex;align-items:center;justify-content:center;height:100vh;color:#888;'>⏳ Carregando preview...</body></html>";

  try {
    // --- Chamada para o nosso backend (não mais para a Groq direto) ---
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: textoUsuario }),
    });

    // Se o backend respondeu com status 400, 500, etc. 
    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.erro || "Erro na requisição");
    }

    const dados = await resposta.json();

    // Verifica se veio o campo esperado
    if (dados.sucesso && dados.codigo) {
      // Escapa caracteres especiais para mostrar o código como texto (não executar)
      const codigoEscapado = escaparHTML(dados.codigo);

      // Exibe o código na área esquerda
      codigoDescricao.innerHTML = `
        <pre style="background:#141419; color:#5f009f; padding:20px; border-radius:10px; overflow:auto; font-family:monospace; margin:0; text-align:left; white-space:pre-wrap; word-break:break-word;">${codigoEscapado}</pre>
      `;

      // Atualiza o iframe com o preview do código gerado
      codigoAcao.srcdoc = dados.codigo;
    } else {
      throw new Error("Resposta inválida do servidor");
    }
  } catch (erro) {
    // Qualquer erro (rede, backend fora do ar, etc.) cai aqui
    console.error("Erro:", erro);
    mostrarErro(
      erro.message ||
        "Erro ao gerar código. Verifique se o servidor está rodando.",
    );
    codigoDescricao.innerHTML = `<p style="color: #ff6b6b;">❌ ${
      erro.message || "Erro desconhecido"
    }</p>`;
  } finally {
    // Restaura o botão independente de sucesso ou erro
    botao.disabled = false;
    botao.textContent = "Gerar Código";
  }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Converte caracteres especiais em entidades HTML
 * Ex: < vira &lt; - assim o navegador mostra como texto, não interpreta como tag
 * Isso previne XSS (Cross-Site Scripting)
 */
function escaparHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Exibe uma mensagem temporária no canto inferior direito
 * O elemento some sozinho após 3 segundos
 */
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

  // Remove o elemento após 3 segundos (tempo suficiente para ler)
  setTimeout(() => {
    erroDiv.remove();
  }, 3000);
}

// Adiciona a animação de fadeIn dinamicamente 
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
