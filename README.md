# 🚀 NEXTSTAGE - Gerador de CSS com IA

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-blue?logo=express)
![Groq](https://img.shields.io/badge/Groq-API-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-blue?logo=render)

Gerador de código CSS utilizando inteligência artificial. Descreva o que você quer em texto e a IA gera o código HTML/CSS completo com preview ao vivo.

---

## 🖼️ Demonstração

![Demonstração do NEXTSTAGE](/frontend/assets/images/demo2.gif)

---

## ✨ Funcionalidades

- 🤖 **Geração por IA** - Usa Groq (Llama 3.3) para transformar descrições em código
- 🎨 **Preview ao vivo** - Visualize o resultado instantaneamente
- 📱 **Design responsivo** - Funciona em desktop, tablet e mobile
- 🔒 **Segurança** - Chave da API protegida no backend
- ⚡ **Feedback visual** - Loading, mensagens de erro e sucesso
- ⌨️ **Acessibilidade** - Suporte a teclado (Ctrl+Enter para enviar)
- 📋 **Copiar código** - Botão para copiar o código gerado com feedback visual
- 🗑️ **Limpar tudo** - Limpa textarea, código e preview com um clique
- 🌓 **Tema Light/Dark** - Alterna entre tema escuro (padrão) e claro
- 🎨 **Design Glassmorphism** - Interface moderna com efeito vidro

## 🛠️ Tecnologias

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-API-6a0dad)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)

### Deploy

![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-blue?logo=render)

## 📁 Estrutura do Projeto

```Text
nextstage-css-generator/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example (exemplo do .env)
│   └── .env (não commitar)
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   ├── auth.js
│   │   └── supabase.js
│   └── assets/
│       ├── images/
│       │   ├── demo2.gif
│       │   └── favicon.ico
│       └── fonts/
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── .prettierrc
├── LICENSE
└── README.md
```

## 🚀 Deploy

O projeto está disponível online:

### Serviço URL Função

- Frontend (Vercel) - nextstage-css-generator.vercel.app Interface do usuário
- Backend (Render) - nextstage-css-generator.onrender.com API com Groq

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

Crie um arquivo _.env dentro da pasta backend/_ com:

```bash
GROQ_API_KEY=sua_chave_aqui
PORT=3000
```

### Passo 4: Inicie o servidor

```bash
node server.js
```

Você verá:

```Text
🚀 Servidor rodando na porta 3000
📝 Teste GET: http://localhost:3000/teste
✨ Gerar código POST: http://localhost:3000/gerar-codigo
```

### Passo 5: Abra o frontend

Abra o arquivo frontend/index.html no navegador

Ou use a extensão Live Server do VS Code

## 📝 Exemplo de Uso

Digite no campo de texto:

Crie um botão roxo com sombra e bordas arredondadas
A IA vai gerar algo como:

```html
<style>
  button {
    background: purple;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    padding: 10px 20px;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>
<button>Clique aqui</button>
```

## 🔒 Segurança

- Chave da API armazenada no .env (nunca é commitada)

- Validação de inputs no frontend e backend

- Sanitização do código gerado antes de exibir

- CORS configurado corretamente

## 📅 Changelog

### v1.1.0 (Abril 2026)

- Design com orbs animadas

- Adicionado botão Copiar código com feedback visual "Copiado!"

- Adicionado botão Limpar tudo para resetar a interface

- Adicionado Tema Light/Dark com persistência

- Melhorada a paleta de cores do tema claro

- Adicionado padrão de pontos no fundo do tema claro

- Design Glassmorphism aprimorado

- Corrigido CORS para deploy no Render

- Deploy realizado: Frontend na Vercel, Backend no Render

### v1.0.0 (Abril 2026)

- Lançamento inicial do NEXTSTAGE

- Integração com API Groq (Llama 3.3)

- Design simples

- Única funcinalidade de criar o código desejado

- Rodava apenas localmente

## 🧪 Testando a API

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

## 📈 Próximas Melhorias

- Sistema de Login - Cadastro, login, recuperação de senha e logout (Supabase Auth)

- Criar pastas - Usuário pode criar pastas com nomes personalizados (ex: "Botões", "Cards", "Animações")

- Editar pastas - Renomear pastas existentes

- Excluir pastas - Remover pasta e todos os códigos dentro

- Salvar código - Após gerar, salvar o código em uma pasta com nome personalizado

- Listar códigos - Ver todos os códigos salvos dentro de cada pasta

- Carregar código salvo - Clicar em um código salvo para carregar no preview

- Editar código salvo - Modificar o código salvo e atualizar

- Excluir código - Remover código da pasta

- Duplicar código - Copiar código para outra pasta

- Contador de códigos - Mostrar quantos códigos existem em cada pasta

- Avatar do usuário - Foto do perfil (Gravatar ou upload)

- Estatísticas pessoais - Quantos códigos gerou no total

- Exportar dados - Baixar todos os códigos como arquivo JSON

- Importar dados - Restaurar códigos de um arquivo JSON

- Backup automático - Salvar códigos localmente quando offline

- Sincronização - Sincronizar dados entre dispositivos

- Compartilhar código - Gerar link único para compartilhar código com outras pessoas

- Favoritar códigos - Marcar códigos como favoritos para acesso rápido

- Buscar códigos - Pesquisar códigos por nome ou conteúdo

- Ordenar pastas - Arrastar e soltar para reorganizar pastas

- Tags nos códigos - Adicionar tags para melhor organização

- Tema personalizado - Salvar preferência de tema escuro/claro por usuário

- Modo offline - Funcionar sem internet (usando códigos salvos localmente)

## 👨‍💻 Autor

<img src="https://github.com/Herbertfss.png" width="100" height="100" style="border-radius: 50%">

**Herbert Freire dos Santos Sousa**

[![GitHub](https://img.shields.io/badge/GitHub-Herbertfss-181717?logo=github)](https://github.com/Herbertfss)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Adicionar-blue?logo=linkedin)](https://www.linkedin.com/in/herbert-freire/)

**GitHub:** [@Herbertfss](https://github.com/Herbertfss)  
**Projeto:** [NEXTSTAGE - Gerador de CSS com IA](https://github.com/Herbertfss/nextstage-css-generator)

📄 Licença
MIT - Livre para usar, modificar e distribuir.

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!
