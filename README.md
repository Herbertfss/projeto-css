# 🚀 NEXTSTAGE - Gerador de CSS com IA

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-blue?logo=express)
![Groq](https://img.shields.io/badge/Groq-API-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

Gerador de código CSS utilizando inteligência artificial. Descreva o que você quer em texto e a IA gera o código HTML/CSS completo com preview ao vivo.

---

## 🖼️ Demonstração

![Demonstração do NEXTSTAGE](/img/demo.gif)

> *Substitua a imagem acima por um print da tela do seu projeto*

---

## ✨ Funcionalidades

- 🤖 **Geração por IA** - Usa Groq (Llama 3.3) para transformar descrições em código
- 🎨 **Preview ao vivo** - Visualize o resultado instantaneamente
- 📱 **Design responsivo** - Funciona em desktop, tablet e mobile
- 🔒 **Segurança** - Chave da API protegida no backend
- ⚡ **Feedback visual** - Loading, mensagens de erro e sucesso
- ⌨️ **Acessibilidade** - Suporte a teclado (Ctrl+Enter para enviar)

## 🛠️ Tecnologias

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-API-6a0dad)

## 📁 Estrutura do Projeto

nextstage-css-generator/
├── backend/
│   ├── server.js          # Servidor Express
│   ├── package.json       # Dependências
│   └── .env               # Chave da API (não commitar)
├── frontend/
│   ├── index.html         # Interface
│   ├── style.css          # Estilos
│   └── script.js          # Lógica
└── README.md
## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js instalado (versão 18+)
- Conta na [Groq](https://console.groq.com) para obter uma chave de API

### Passo 1: Clone o repositório
```bash
git clone https://github.com/Herbertfss/nextstage-css-generator.git
cd nextstage-css-generator
```
### Passo 2: Configure o backend
```bash
cd backend
npm install
```
### Passo 3: Configure a chave da API
Crie um arquivo *.env dentro da pasta backend/* com:

GROQ_API_KEY=sua_chave_aqui
PORT=3000

### Passo 4: Inicie o servidor
```bash
node server.js
```
Você verá:

🚀 Servidor rodando na porta 3000
📝 Teste GET: http://localhost:3000/teste
✨ Gerar código POST: http://localhost:3000/gerar-codigo

### Passo 5: Abra o frontend
Abra o arquivo frontend/index.html no navegador

Ou use a extensão Live Server do VS Code

### 📝 Exemplo de Uso
Digite no campo de texto:

Crie um botão roxo com sombra e bordas arredondadas
A IA vai gerar algo como:

```html
<style>
  button {
    background: purple;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    padding: 10px 20px;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>
<button>Clique aqui</button>
```
**🔒 Segurança**
- Chave da API armazenada no .env (nunca é commitada)

- Validação de inputs no frontend e backend

- Sanitização do código gerado antes de exibir

- CORS configurado corretamente

### 🧪 Testando a API
Rota de teste (GET)
```bash
curl http://localhost:3000/teste
```
Gerar código (POST)
```bash
curl -X POST http://localhost:3000/gerar-codigo \
  -H "Content-Type: application/json" \
  -d '{"prompt": "botão azul com fonte grande"}'
  ```

### 📈 Próximas Melhorias

- Histórico de códigos gerados (localStorage)

- Botão para copiar código

- Tema dark/light alternável

- Deploy na nuvem (Render + Vercel)

- Suporte a mais modelos de IA

## 👨‍💻 Autor

<img src="https://github.com/Herbertfss.png" width="100" height="100" style="border-radius: 50%;">

**Herbert Freire dos Santos Sousa**

https://img.shields.io/badge/GitHub-Herbertfss-181717?logo=github
https://img.shields.io/badge/LinkedIn-Adicionar-blue?logo=linkedin

GitHub: @Herbertfss

Projeto: [NEXTSTAGE - Gerador de CSS com IA](https://github.com/Herbertfss/nextstage-css-generator)

📄 Licença
MIT - Livre para usar, modificar e distribuir.

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!