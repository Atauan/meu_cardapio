# 🍽️ Meu Cardápio

Editor visual de cardápios para restaurantes, feito com **React**. Crie, personalize e exporte cardápios profissionais direto do navegador — sem backend necessário.

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

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- npm (vem com o Node.js)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/meucardapio.git
cd meucardapio
```

### 2. Crie o projeto React (primeira vez)

O arquivo `meu_cardapio.jsx` é um componente React completo. Para rodá-lo, inicialize um projeto Vite:

```bash
npx -y create-vite@latest ./ -- --template react
```

> Se perguntar se deseja sobrescrever, confirme. O arquivo `meu_cardapio.jsx` será mantido.

### 3. Instale as dependências

```bash
npm install
npm install lucide-react
```

### 4. Configure o ponto de entrada

Substitua o conteúdo de `src/App.jsx` para importar o componente:

```jsx
export { default } from '../meu_cardapio.jsx';
```

Ou simplesmente copie o conteúdo de `meu_cardapio.jsx` para `src/App.jsx`.

### 5. Rode o projeto

```bash
npm run dev
```

Acesse **http://localhost:5173** no navegador. 🎉

---

## 📖 Como Funciona

### Estrutura do Componente

O app é um **único componente React** (`App`) dividido visualmente em duas áreas:

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

### Fluxo de Dados

1. Todo o estado do cardápio fica em um único `useState` (`menuData`)
2. O editor modifica o estado via funções (`updateInfo`, `addCategory`, `addItem`, etc.)
3. A pré-visualização **reage automaticamente** a qualquer mudança no estado
4. Ao clicar em "Exportar", o `window.print()` é chamado — o CSS `@media print` oculta o editor e formata a folha

### Temas Disponíveis

| Tema | Fonte | Estilo |
|---|---|---|
| **Clássico** | Serif | Elegante, linhas pontilhadas entre nome e preço |
| **Moderno** | Sans-serif | Minimalista, layout em grid de 2 colunas, sem pontilhado |
| **Rústico** | Serif | Cores quentes marrons, borda decorativa, visual aconchegante |

### Dados de Exemplo

O app já vem com dados de demonstração (editáveis):

- **Entradas**: Bruschetta de Tomate (R$ 5.50), Tábua de Queijos (R$ 12.00)
- **Pratos Principais**: Bacalhau à Brás (R$ 14.50), Bife da Casa (R$ 18.00)
- **Sobremesas**: Mousse de Chocolate (R$ 4.00)

---

## 🛠️ Tecnologias

- **React** — Componentes e gerenciamento de estado
- **Tailwind CSS** — Estilização via classes utilitárias
- **Lucide React** — Ícones (Plus, Trash2, Printer, Settings, etc.)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
