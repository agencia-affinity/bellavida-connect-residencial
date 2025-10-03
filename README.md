# Template Gulp em PHP

Projeto em PHP estruturado com Gulp para compilação de SASS e minificação de arquivos CSS e JS, com configuração de SEO
dinâmica para múltiplas páginas.

## Estrutura de pastas

```bash
GULP-PHP/
├── assets/                     # Arquivos estáticos do projeto
│   ├── css/                    # CSS compilado a partir do SCSS
│   ├── fonts/                  # Fontes customizadas e webfonts
│   ├── images/                 # Imagens (JPG, PNG, SVG, WEBP)
│   ├── js/                     # Scripts JS
│   └── scss/                   # Estrutura SCSS (7-1 pattern)
│       ├── abstracts/          # Variáveis, mixins, funções (sem CSS gerado)
│       ├── base/               # Reset, tipografia, elementos básicos
│       ├── components/         # Componentes pequenos (botões, cards, etc)
│       ├── layout/             # Estruturas de layout (header, footer, grid)
│       ├── sections/           # Estilos de seções específicas
│       ├── themes/             # Temas, skins ou variações de estilo
│       ├── vendors/            # Estilos de bibliotecas de terceiros
│       └── main.scss           # Arquivo principal que importa todos os outros
│
├── inc/                        # Includes PHP (funções, configs, etc)
├── node_modules/               # Dependências do Node.js
├── .gitignore                  # Arquivos/dirs ignorados pelo Git
├── favicon.ico                 # Ícone do site
├── footer.php                  # Rodapé do site
├── gulpfile.js                 # Configuração das tasks do Gulp
├── header.php                  # Cabeçalho com meta tags e CSS
├── index.php                   # Página inicial
├── LICENSE                     # Licença do projeto
├── og-share.png                # Imagem para compartilhamento em redes sociais
├── package.json                # Dependências do Node.js
├── README.md                   # Documentação do projeto
└── yarn.lock                   # Lockfile do Yarn
```

## Rodando o projeto

1. Certifique-se de ter o **Node.js**, **Yarn** (ou npm).

2. Instale as dependências do Node.js:

   ```bash
   yarn install
   ```

   Ou, se preferir npm:

   ```bash
   npm install
   ```

3. Rode o Gulp para compilar e iniciar o servidor:

   ```bash
   npx gulp
   ```

O processo agora está completo e pronto para começar o desenvolvimento.

O Gulp abre o navegador automaticamente na porta 8000 (configuração do servidor PHP embutido) e também na porta 3000 (
padrão do browser sync).

Todas as alterações em arquivos SCSS, JS e PHP são observadas automaticamente e o navegador é atualizado.

## Estilos (CSS/SASS)

Todos os arquivos SASS estão dentro da pasta `assets/scss/`.

## 📂 Estrutura de Pastas 7-1 Pattern

```
assets/
├── scss/ # Estrutura 7-1
│ ├── abstracts/ # Variáveis, funções e mixins
│ │ ├── _variables.scss
│ │ ├── _mixins.scss
│ │ └── _index.scss
│ ├── base/ # Reset, tipografia, grid, etc.
│ │ ├── _reset.scss
│ │ ├── _typograph.scss
│ │ ├── _grid.scss
│ │ ├── _fonts.scss
│ │ ├── _patterns.scss
│ │ ├── _animations.scss
│ │ ├── _sr-only.scss
│ │ └── _index.scss
│ ├── layout/ # Estrutura de layout (header, footer, etc.)
│ ├── components/ # Botões, cards, etc.
│ ├── sections/ # Seções específicas da página
│ ├── themes/ # Temas (ex: dark/light)
│ ├── vendors/ # CSS de terceiros adaptado
│ └── main.scss # Arquivo principal
```

O arquivo `main.scss` importa todos os outros arquivos:

```scss
// Global
// ==========================================================================
// MAIN.SCSS – Estrutura 7-1 Pattern
// ==========================================================================
// Camada de abstrações
@use 'abstracts';

// Estilos base
@use 'base';

// Layout global
@use 'layout';

// Componentes reutilizáveis
@use 'components';

// Seções da página
@use 'sections';

// Temas
@use 'themes';

// Vendors
@use 'vendors';
```

Para adicionar novos estilos estruturais ou por página:

- Cada pasta contém um **`_index.scss`** que **reexporta** (`@forward`) seus arquivos internos.
- O `main.scss` importa apenas as **camadas principais** usando `@use`.

### Exemplo: `scss/base/_index.scss`

```scss
@forward "reset";
@forward "typograph";
@forward "grid";
@forward "fonts";
@forward "patterns";
@forward "animations";
@forward "sr-only";
```

Exemplo: `scss/main.scss`

```
// Camada de abstrações
@use 'abstracts';

// Estilos base
@use 'base';

// Layout global
@use 'layout';

// Componentes reutilizáveis
@use 'components';

// Seções da página
@use 'sections';

// Temas
@use 'themes';

// Vendors
@use 'vendors';
```

Bibliotecas externas de CSS devem ser colocadas na pasta `css/lib/`. Elas serão concatenadas e minificadas
automaticamente em plugins.css.

## Scripts (JS)

Scripts customizados devem ser colocados em `assets/js/scripts/`.

Bibliotecas externas devem ficar em `assets/js/lib/`.

O Gulp concatena e minifica:

1. `all.js` → todos os scripts customizados

2. `plugins.js` → todas as bibliotecas externas

O BrowserSync atualiza automaticamente o navegador quando os arquivos são alterados.

## Observações

- Todos os recursos de mídia e estáticos, como imagens, ícones e vídeos, devem ser armazenados na pasta `assets`. Essa
  prática mantém o projeto organizado e centraliza todos os arquivos de mídia em um só lugar.
- Sempre adicione bibliotecas externas em suas respectivas pastas (`assets/css/lib` e `assets/js/lib`) para que o Gulp
  as compile
  corretamente.
