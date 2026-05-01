# 🕊️ Jubileu Franciscano 2026 — Instruções de Publicação

## Estrutura de arquivos do projeto

```
peregrinacao-2026/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── index.css
└── INSTRUCOES.md
```

---

## PASSO 1 — Criar o repositório no GitHub

1. Acesse **github.com** e faça login
2. Clique no botão verde **"New"** (canto superior esquerdo)
3. Em **Repository name**, coloque: `peregrinacao-2026`
4. Deixe como **Public**
5. Clique em **"Create repository"**

---

## PASSO 2 — Criar os arquivos no GitHub

Após criar o repositório, clique em **"creating a new file"** e crie cada arquivo abaixo.

> ⚠️ Atenção ao caminho: arquivos dentro de `src/` precisam ter o caminho `src/nome-do-arquivo` no campo de nome.

### Arquivos a criar (na ordem):

| Caminho no GitHub        | Arquivo local            |
|--------------------------|--------------------------|
| `package.json`           | package.json             |
| `vite.config.js`         | vite.config.js           |
| `index.html`             | index.html               |
| `.gitignore`             | .gitignore               |
| `src/main.jsx`           | src/main.jsx             |
| `src/index.css`          | src/index.css            |
| `src/App.jsx`            | src/App.jsx              |

**Para criar cada arquivo:**
1. Clique em **"Add file" → "Create new file"**
2. No campo de nome, digite o caminho (ex: `src/App.jsx`)
3. Cole o conteúdo do arquivo correspondente
4. Clique em **"Commit changes"** → **"Commit directly to main"**

---

## PASSO 3 — Publicar no Vercel (gratuito)

1. Acesse **vercel.com** e clique em **"Sign Up"**
2. Escolha **"Continue with GitHub"** e autorize
3. Na tela inicial clique em **"Add New Project"**
4. Localize o repositório `peregrinacao-2026` e clique em **"Import"**
5. Na tela de configuração:
   - **Framework Preset:** Vite *(o Vercel detecta automaticamente)*
   - Não precisa alterar mais nada
6. Clique em **"Deploy"**
7. Aguarde ~1 minuto. Pronto! 🎉

Você receberá uma URL no formato:
```
https://peregrinacao-2026.vercel.app
```

Essa URL é gratuita e permanente. Toda vez que você editar um arquivo no GitHub, o Vercel atualiza o site automaticamente.

---

## PASSO 4 — Compartilhar com sua mãe e padrasto

Envie a URL pelo WhatsApp. No celular deles, eles podem:
- Abrir no navegador normalmente
- Salvar na tela inicial como um atalho (funciona como app)

**No Android:** Menu do navegador → "Adicionar à tela inicial"
**No iPhone:** Botão compartilhar → "Adicionar à tela de início"

---

## Como atualizar informações no futuro

Se precisar corrigir algum texto do roteiro, previsão, contato, etc.:

1. Acesse o repositório no GitHub
2. Clique no arquivo `src/App.jsx`
3. Clique no ícone de lápis ✏️ (editar)
4. Faça a alteração
5. Clique em **"Commit changes"**

O site é atualizado automaticamente em ~1 minuto pelo Vercel.

---

## Sobre a previsão do tempo

- Usa o serviço **Open-Meteo** — 100% gratuito, sem cadastro, sem chave de API
- A previsão aparece automaticamente quando faltar **16 dias ou menos** para cada data
- Cobre todas as cidades: Goiânia, Lisboa, Fátima, Roma, Assis e La Verna

---

## Sobre a tela "Hoje"

O site detecta automaticamente a data do dia e exibe:

| Situação               | O que aparece                              |
|------------------------|--------------------------------------------|
| Antes de 30/Out/2026   | Contagem regressiva + destinos + checklist |
| Durante a viagem       | Programação do dia atual + clima           |
| Após 12/Nov/2026       | Mensagem de encerramento da peregrinação   |

---

*Paz e Bem! 🕊️*
