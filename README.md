# Pokedex Vanilla JS

Esta é uma aplicação Pokedex performática construída com **Vanilla JavaScript** (sem frameworks), seguindo a arquitetura MVC (Model-View-Controller) simplificada e padrões modernos de desenvolvimento web.

## 🚀 Funcionalidades

*   **Listagem de Pokémon:** Exibição em grid responsivo.
*   **Busca em Tempo Real:** Filtre por nome instantaneamente.
*   **Filtro por Tipo:** Selecione tipos específicos (Fogo, Água, Planta, etc.) e combine com a busca por nome.
*   **Paginação:** Navegação fluida entre os resultados filtrados.
*   **Visualização Detalhada:** Cards com imagem, ID e todos os tipos do Pokémon.
*   **Feedback Visual:** Indicadores de carregamento para melhor experiência do usuário.

## 🛠️ Como Rodar

1.  **Opção 1 (VS Code / Cursor):**
    *   Instale a extensão "Live Server".
    *   Clique com o botão direito no arquivo `index.html`.
    *   Selecione "Open with Live Server".

2.  **Opção 2 (Simples):**
    *   Basta abrir o arquivo `index.html` no seu navegador (algumas funcionalidades podem ser limitadas dependendo das configurações de segurança do navegador para arquivos locais devido ao uso de ES Modules).

## 📂 Estrutura do Projeto

*   `index.html`: Estrutura principal da página.
*   `css/style.css`: Estilização responsiva, variáveis CSS e design system.
*   `js/`
    *   `environment.js`: Centralização de configurações (URL da API, paginação).
    *   `api.js`: Camada de serviço para comunicação com a PokeAPI e cache de dados.
    *   `ui.js`: Camada de visualização responsável por criar elementos do DOM e renderizar componentes.
    *   `app.js`: Controlador principal que gerencia o estado, eventos e lógica de negócios.

## 🧠 Decisões Técnicas

*   **Performance & Cache:**
    *   A lista de nomes é carregada inicialmente para permitir busca instantânea.
    *   Listas de tipos são cacheadas em memória para evitar requisições repetidas ao alternar filtros.
    *   Apenas os detalhes (imagens/stats) dos itens visíveis na página atual são requisitados.
*   **Filtragem Combinada:** O sistema permite filtrar por Tipo E Nome simultaneamente (ex: buscar "Char" dentro da categoria "Fogo").
*   **Environment:** Utilização do padrão `environment.js` para simular variáveis de ambiente em um contexto Vanilla, facilitando a manutenção de URLs e constantes globais.
*   **Arquitetura:** Código modularizado com ES Modules (`import`/`export`) para separação de responsabilidades.
