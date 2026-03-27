# 🍽️ Meu Cardápio

Editor visual de cardápios para restaurantes, feito com **React**. Crie, personalize e exporte cardápios profissionais direto do navegador — sem backend necessário.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AtauanLima/meu_cardapio)

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---|---|
| **Editor lateral** | Painel para editar nome do restaurante, subtítulo/slogan e gerenciar categorias e pratos |
| **Pré-visualização ao vivo** | Visualização em tempo real do cardápio no formato folha A4 |
| **3 temas visuais** | `Clássico` (elegante, serif), `Moderno` (minimalista) e `Rústico` (cores quentes) |
| **Categorias expansíveis** | Crie, renomeie, expanda/recolha e remova categorias livremente |
| **Gestão de pratos** | Adicione pratos com nome, descrição e preço (R$) em cada categoria |
| **Exportar / Imprimir** | Botão "Exportar" que abre o diálogo de impressão do navegador — salve como PDF ou imprima |

---

## 🚀 Deploy na Vercel (Recomendado)

1. Faça push deste repositório no GitHub
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Importe o repositório `meucardapio`
4. A Vercel detecta automaticamente o Vite — clique em **Deploy**
5. Pronto! Seu cardápio estará online em segundos 🎉

> Não precisa configurar nada — o `package.json` já tem os scripts `build` e `dev` que a Vercel usa automaticamente.

---

## 💻 Rodando Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/AtauanLima/meu_cardapio.git
cd meu_cardapio

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador. 🎉

### Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build de produção |

---

## 📖 Como Funciona

### Estrutura do Projeto

```
meucardapio/
├── index.html              ← Entrada HTML (Vite)
├── meu_cardapio.jsx        ← Componente principal do editor
├── package.json            ← Dependências e scripts
├── vite.config.js          ← Configuração do Vite
├── tailwind.config.js      ← Configuração do Tailwind CSS
├── postcss.config.js       ← PostCSS (processamento do Tailwind)
└── src/
    ├── main.jsx            ← Ponto de entrada React
    └── index.css           ← Importação do Tailwind
```

### Layout

```
┌──────────────────┬─────────────────────────────────┐
│                  │                                 │
│  EDITOR          │  PRÉ-VISUALIZAÇÃO               │
│  (Painel lateral)│  (Simulação folha A4)            │
│                  │                                 │
│  • Nome          │  ┌───────────────────────────┐  │
│  • Subtítulo     │  │  A Cantina do Chef        │  │
│  • Tema          │  │  Sabores autênticos...    │  │
│  • Categorias    │  │                           │  │
│    └ Pratos      │  │  ENTRADAS                 │  │
│                  │  │  Bruschetta......R$ 5.50  │  │
│  [Exportar]      │  │  Tábua de Queijos..R$12   │  │
│                  │  │                           │  │
│                  │  └───────────────────────────┘  │
└──────────────────┴─────────────────────────────────┘
```

### Temas Disponíveis

| Tema | Fonte | Estilo |
|---|---|---|
| **Clássico** | Serif | Elegante, linhas pontilhadas entre nome e preço |
| **Moderno** | Sans-serif | Minimalista, layout em grid de 2 colunas |
| **Rústico** | Serif | Cores quentes marrons, borda decorativa |

### Dados de Exemplo

O app já vem com dados de demonstração (editáveis):

- **Entradas**: Bruschetta de Tomate (R$ 5.50), Tábua de Queijos (R$ 12.00)
- **Pratos Principais**: Bacalhau à Brás (R$ 14.50), Bife da Casa (R$ 18.00)
- **Sobremesas**: Mousse de Chocolate (R$ 4.00)

---

## 🛠️ Tecnologias

- **React 18** — Componentes e gerenciamento de estado
- **Vite** — Build tool ultra-rápido
- **Tailwind CSS 3** — Estilização via classes utilitárias
- **Lucide React** — Ícones vetoriais

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
