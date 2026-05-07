import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Carrega as variáveis do .env (onde fica a chave da API)
dotenv.config({ path: "./backend/.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa o cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

// Middlewares essenciais:
// - cors: libera o frontend a falar com o backend (qualquer origem para deploy)
// - express.json: converte o body da requisição de JSON para objeto JS
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

/**
 * Rota de teste - só pra verificar se o servidor está no ar
 * Uso: GET http://localhost:3000/teste
 * Resposta: { "mensagem": "Servidor funcionando!" }
 */
app.get("/teste", (req, res) => {
  res.json({ mensagem: "Servidor funcionando!" });
});

/**
 * Rota principal - recebe o prompt do usuário e devolve o código gerado pela IA
 * Uso: POST http://localhost:3000/gerar-codigo
 * Body esperado: { "prompt": "crie um botão roxo" }
 * Resposta sucesso: { "sucesso": true, "codigo": "<style>...</style>" }
 * Resposta erro: { "erro": "mensagem explicativa" }
 */
app.post("/gerar-codigo", async (req, res) => {
  const prompt = req.body.prompt;

  // --- Validações do lado do servidor ---
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({
      erro: "Digite algo para gerar o código",
    });
  }

  if (prompt.length < 5) {
    return res.status(400).json({
      erro: "Digite pelo menos 5 caracteres",
    });
  }

  try {
    console.log(`📝 Gerando código para: ${prompt}`);

    // Chamada para a API da Groq
    // A chave está no .env
    const respostaGroq = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `Você é um gerador de código HTML/CSS. Regras OBRIGATÓRIAS:

1. Responda SOMENTE com código puro, sem explicações.
2. O código deve ser COMPLETO e FUNCIONAL.NÃO use \`\`\`html, \`\`\`css ou qualquer marcação de código.
3. Use indentação de 2 espaços para organizar o código.
4. Cada tag deve ficar em uma nova linha.
5. Mantenha o código LIMPO e LEGÍVEL.
6. Sempre inclua <!DOCTYPE html>, <html>, <head>, <body>.

Exemplo de formatação correta:
<!DOCTYPE html>
<html>
  <head>
    <style>
      button {
        background: purple;
      }
    </style>
  </head>
  <body>
    <button>Clique</button>
  </body>
</html>`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    // Se a Groq devolveu algum status de erro (401, 429, 500...)
    if (!respostaGroq.ok) {
      throw new Error(`API Groq respondeu com erro: ${respostaGroq.status}`);
    }

    const dados = await respostaGroq.json();
    const codigoGerado = dados.choices[0].message.content;

    console.log(`✅ Código gerado com sucesso!`);

    // Tudo certo - devolve o código pro frontend
    res.json({
      sucesso: true,
      codigo: codigoGerado,
    });
  } catch (erro) {
    // Qualquer erro (rede, API, timeout, etc.) cai aqui
    console.error("❌ Erro:", erro.message);
    res.status(500).json({
      erro: "Erro ao gerar código. Tente novamente.",
    });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Teste GET: http://localhost:${PORT}/teste`);
  console.log(`✨ Gerar código POST: http://localhost:${PORT}/gerar-codigo`);
});
